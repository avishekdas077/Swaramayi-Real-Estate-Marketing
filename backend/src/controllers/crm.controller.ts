import { Response } from 'express';
import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { dbStore, loadData, saveData, logAudit, generateID } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

function maskPhone(phone: string): string {
  if (!phone || phone.length <= 5) return '***';
  return phone.substring(0, 4) + '*** **' + phone.substring(phone.length - 3);
}

function maskEmail(email: string): string {
  if (!email) return '***';
  const parts = email.split('@');
  if (parts.length < 2) return '***';
  return parts[0].substring(0, 3) + '***@' + parts[1];
}

// 1. Get Customers Master List
export async function getCustomers(req: AuthRequest, res: Response) {
  loadData();
  const user = req.user!;
  let customers = dbStore.data.customers.filter(c => !c.is_deleted);

  if (user.role === 'SALES_EXECUTIVE') {
    customers = customers.filter(c => c.assigned_employee_id === user.id);
  }

  const enriched = customers.map(c => {
    const assignedUser = dbStore.data.users.find(u => u.id === c.assigned_employee_id);
    const linkedLeads = dbStore.data.leads.filter(l => l.customer_id === c.id);
    return {
      ...c,
      assigned_employee_name: assignedUser ? assignedUser.full_name : 'Unassigned',
      leads_count: linkedLeads.length,
      linked_leads: linkedLeads
    };
  });

  return res.json({
    status: 'SUCCESS',
    data: enriched
  });
}

// 2. Duplicate Detection Algorithm
export async function checkDuplicateCustomer(req: AuthRequest, res: Response) {
  const { mobile, alternate_mobile, email, full_name } = req.body;
  loadData();

  if (!mobile && !email && !full_name) {
    return res.status(400).json({ status: 'ERROR', message: 'mobile, email, or full_name is required for duplicate check.' });
  }

  const cleanMobile = mobile ? mobile.replace(/\D/g, '') : '';
  const cleanAltMobile = alternate_mobile ? alternate_mobile.replace(/\D/g, '') : '';

  let matchReason = '';
  const match = dbStore.data.customers.find(c => {
    if (cleanMobile && c.mobile && c.mobile.replace(/\D/g, '') === cleanMobile) {
      matchReason = 'MATCHING_MOBILE';
      return true;
    }
    if (cleanAltMobile && c.alternate_mobile && c.alternate_mobile.replace(/\D/g, '') === cleanAltMobile) {
      matchReason = 'MATCHING_ALTERNATE_MOBILE';
      return true;
    }
    if (email && c.email && c.email.toLowerCase() === email.toLowerCase()) {
      matchReason = 'MATCHING_EMAIL';
      return true;
    }
    if (full_name && c.full_name && c.full_name.toLowerCase() === full_name.toLowerCase()) {
      matchReason = 'SIMILAR_FULL_NAME';
      return true;
    }
    return false;
  });

  if (match) {
    const owner = dbStore.data.users.find(u => u.id === match.assigned_employee_id);
    const linkedLeads = dbStore.data.leads.filter(l => l.customer_id === match.id);

    return res.json({
      status: 'DUPLICATE_FOUND',
      warning: 'Possible Existing Customer Found',
      match_reason: matchReason,
      existing_customer: {
        customer_id: match.id,
        customer_number: match.customer_number,
        full_name: match.full_name,
        existing_owner: owner ? owner.full_name : 'Unassigned',
        customer_status: match.customer_status,
        linked_leads_count: linkedLeads.length
      }
    });
  }

  return res.json({
    status: 'NO_DUPLICATE',
    message: 'No existing duplicate customer detected.'
  });
}

// 3. Create Customer Master Record (Comprehensive Requirement Options)
export async function createCustomer(req: AuthRequest, res: Response) {
  const { 
    full_name, mobile, alternate_mobile, email, address, city, dob,
    preferred_location, property_type, configuration, budget_min, budget_max, 
    purchase_timeline, loan_required, investment_purpose, family_requirements, preferred_projects, notes,
    lead_source, sub_source, referral_source, assigned_employee_id, team_leader_id, priority: formPriority
  } = req.body;

  if (!full_name || !mobile) {
    return res.status(400).json({ status: 'ERROR', message: 'full_name and mobile are required.' });
  }

  loadData();

  const cleanMobile = mobile.replace(/\D/g, '');
  const existing = dbStore.data.customers.find(c => c.mobile && c.mobile.replace(/\D/g, '') === cleanMobile);

  if (existing) {
    logAudit(req.user?.id || null, 'DUPLICATE_CUSTOMER_BLOCKED', 'CUSTOMER', `Blocked duplicate customer creation for mobile: ${mobile}`, req.ip);

    dbStore.data.fraud_alerts.unshift({
      id: uuidv4(),
      user_id: req.user?.id || null,
      alert_type: 'DUPLICATE_CUSTOMER_SUBMISSION',
      severity: 'MEDIUM',
      description: `Attempted creation of duplicate customer for mobile ${mobile}`,
      status: 'ACTIVE',
      timestamp: new Date().toISOString()
    });
    saveData();

    return res.status(409).json({
      status: 'ERROR',
      error_code: 'DUPLICATE_CUSTOMER',
      message: `A customer record with mobile number ${mobile} already exists in Customer Master (${existing.customer_number}).`,
      existing_customer_number: existing.customer_number
    });
  }

  const customerNumber = generateID('SRM-CUS');
  const leadNumber = generateID('SRM-LEAD');

  // Customer Priority & Risk Scoring (0-100)
  let score = 50;
  if (budget_max && budget_max >= 10000000) score += 20;
  if (purchase_timeline && purchase_timeline.includes('< 30 Days')) score += 15;
  if (lead_source === 'Direct Referral' || lead_source === 'Google Search') score += 15;

  let priority: 'HOT' | 'WARM' | 'MEDIUM' | 'COLD' = formPriority || 'WARM';
  if (!formPriority) {
    if (score >= 80) priority = 'HOT';
    else if (score >= 60) priority = 'WARM';
    else if (score >= 40) priority = 'MEDIUM';
    else priority = 'COLD';
  }

  const newCustId = uuidv4();
  const newCustomer = {
    id: newCustId,
    customer_number: customerNumber, // SRM-CUS-2026-000184
    full_name,
    mobile,
    alternate_mobile: alternate_mobile || null,
    email: email || null,
    address: address || null,
    city: city || 'Hyderabad',
    dob: dob || null,
    preferred_location: preferred_location || null,
    property_type: property_type || 'Flat / Apartment',
    configuration: configuration || '3BHK',
    budget_min: budget_min || 0,
    budget_max: budget_max || 0,
    purchase_timeline: purchase_timeline || 'Immediate (< 30 Days)',
    loan_required: Boolean(loan_required),
    investment_purpose: investment_purpose || 'Self / End Use',
    family_requirements: family_requirements || null,
    preferred_projects: preferred_projects || null,
    notes: notes || null,
    lead_source: lead_source || 'Meta Ads',
    sub_source: sub_source || null,
    referral_source: referral_source || null,
    assigned_employee_id: assigned_employee_id || req.user?.id || null,
    team_leader_id: team_leader_id || null,
    customer_status: 'NEW',
    source: lead_source || 'Meta Ads',
    status: 'NEW',
    quality_score: score,
    lead_score: score,
    priority,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    created_by: req.user?.id || undefined,
    is_deleted: false
  };

  // Auto-create initial Lead record linked to Customer
  const newLead = {
    id: uuidv4(),
    lead_number: leadNumber, // SRM-LEAD-2026-001245
    customer_id: newCustId,
    source: lead_source || 'Meta Ads',
    property_requirement: `${configuration || '3BHK'} in ${preferred_location || 'Kondapur'}`,
    budget: budget_max || 0,
    assigned_employee_id: assigned_employee_id || req.user?.id || null,
    lead_status: 'New',
    lead_score: score,
    priority,
    created_at: new Date().toISOString(),
    last_activity: new Date().toISOString(),
    next_followup: new Date(Date.now() + 24 * 3600000).toISOString()
  };

  dbStore.data.customers.unshift(newCustomer);
  dbStore.data.leads.unshift(newLead);
  saveData();

  logAudit(req.user?.id || null, 'CREATE_CUSTOMER_MASTER', 'CUSTOMER', `Customer Master created: ${customerNumber} with Lead ${leadNumber}`, req.ip);

  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Customer Master record created successfully.',
    data: {
      customer_id: newCustId,
      customer_number: customerNumber,
      lead_number: leadNumber,
      full_name,
      priority,
      lead_score: score
    }
  });
}

// 4. Complete Customer 360° Profile Dataset (18 Streams)
export async function getCustomer360(req: AuthRequest, res: Response) {
  const { id } = req.params;
  loadData();

  const customer = dbStore.data.customers.find(c => c.id === id || c.customer_number === id);
  if (!customer) {
    return res.status(404).json({ status: 'ERROR', message: 'Customer not found.' });
  }

  const assignedUser = dbStore.data.users.find(u => u.id === customer.assigned_employee_id);
  const teamLead = dbStore.data.users.find(u => u.id === customer.team_leader_id);

  const linkedLeads = dbStore.data.leads.filter(l => l.customer_id === customer.id);
  const siteVisits = dbStore.data.site_visits.filter(v => v.lead_id === customer.id || linkedLeads.some(l => l.id === v.lead_id));
  const bookings = dbStore.data.bookings.filter(b => b.lead_id === customer.id || linkedLeads.some(l => l.id === b.lead_id));
  const commissions = dbStore.data.commissions.filter(c => bookings.some(b => b.id === c.booking_id));
  const followups = dbStore.data.followups.filter(f => f.customer_id === customer.id);
  const transfers = dbStore.data.lead_transfers.filter(t => t.customer_id === customer.id);

  return res.json({
    status: 'SUCCESS',
    data: {
      profile: {
        ...customer,
        assigned_employee_name: assignedUser ? assignedUser.full_name : 'Unassigned',
        team_leader_name: teamLead ? teamLead.full_name : 'N/A'
      },
      streams: {
        all_leads: linkedLeads,
        site_visits: siteVisits,
        bookings,
        commissions,
        followups,
        transfers,
        audit_history: dbStore.data.audit_logs.slice(0, 10)
      }
    }
  });
}

// 5. Submit Lead Transfer Request
export async function submitTransferRequest(req: AuthRequest, res: Response) {
  const { lead_id, requested_owner_id, reason } = req.body;
  if (!lead_id || !reason) {
    return res.status(400).json({ status: 'ERROR', message: 'lead_id and reason are required.' });
  }

  loadData();
  const lead = dbStore.data.leads.find(l => l.id === lead_id || l.lead_number === lead_id);
  if (!lead) {
    return res.status(404).json({ status: 'ERROR', message: 'Lead record not found.' });
  }

  const currentOwner = dbStore.data.users.find(u => u.id === lead.assigned_employee_id);
  const reqOwner = dbStore.data.users.find(u => u.id === requested_owner_id);

  const transfer = {
    id: uuidv4(),
    lead_id: lead.lead_number,
    customer_id: lead.customer_id,
    requested_by: req.user?.id || 'Unknown',
    current_owner: currentOwner ? currentOwner.full_name : 'Unassigned',
    requested_owner: reqOwner ? reqOwner.full_name : 'Requested Executive',
    reason,
    status: 'PENDING' as const,
    created_at: new Date().toISOString()
  };

  dbStore.data.lead_transfers.unshift(transfer);
  saveData();

  logAudit(req.user?.id || null, 'LEAD_TRANSFER_REQUEST', 'CRM', `Transfer request submitted for lead ${lead.lead_number}`, req.ip);

  return res.status(201).json({
    status: 'SUCCESS',
    message: 'Lead transfer request submitted. Pending manager approval.',
    data: transfer
  });
}

// 6. Approve or Reject Lead Transfer Request
export async function handleTransferApproval(req: AuthRequest, res: Response) {
  const { transfer_id, action } = req.body;
  if (!transfer_id || !action) {
    return res.status(400).json({ status: 'ERROR', message: 'transfer_id and action are required.' });
  }

  loadData();
  const transfer = dbStore.data.lead_transfers.find(t => t.id === transfer_id);
  if (!transfer) {
    return res.status(404).json({ status: 'ERROR', message: 'Transfer request not found.' });
  }

  if (action === 'APPROVE') {
    transfer.status = 'APPROVED';
    const lead = dbStore.data.leads.find(l => l.lead_number === transfer.lead_id);
    const reqUser = dbStore.data.users.find(u => u.full_name === transfer.requested_owner);
    if (lead && reqUser) {
      lead.assigned_employee_id = reqUser.id;
      lead.assigned_at = new Date().toISOString();
    }
  } else {
    transfer.status = 'REJECTED';
  }

  saveData();

  logAudit(req.user?.id || null, `LEAD_TRANSFER_${action}`, 'CRM', `Transfer request ${transfer_id} ${action}D`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: `Lead transfer request ${action.toLowerCase()}d successfully.`
  });
}

// 7. Global Smart Search
export async function smartSearch(req: AuthRequest, res: Response) {
  const { q } = req.query;
  if (!q || typeof q !== 'string') {
    return res.status(400).json({ status: 'ERROR', message: 'Query parameter q is required.' });
  }

  loadData();
  const queryStr = q.toLowerCase();

  const matchingCustomers = dbStore.data.customers.filter(c => 
    c.customer_number.toLowerCase().includes(queryStr) ||
    c.full_name.toLowerCase().includes(queryStr) ||
    (c.mobile && c.mobile.includes(queryStr))
  );

  const matchingLeads = dbStore.data.leads.filter(l => 
    l.lead_number.toLowerCase().includes(queryStr) ||
    l.source.toLowerCase().includes(queryStr)
  );

  return res.json({
    status: 'SUCCESS',
    query: q,
    data: {
      customers: matchingCustomers,
      leads: matchingLeads
    }
  });
}
