import fs from 'fs';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'src', 'db', 'db.json');

// Interface Definitions
export interface UserRecord {
  id: string;
  username: string;
  full_name?: string;
  email: string;
  mobile: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'GENERAL_MANAGER' | 'BRANCH_MANAGER' | 'SALES_MANAGER' | 'TEAM_LEAD' | 'SALES_EXEC' | 'TELECALLER' | 'BACK_OFFICE' | 'ACCOUNTS' | 'HR' | 'MARKETING' | 'PROPERTY_MANAGER' | 'FIELD_EXEC' | 'CUSTOMER_SUPPORT' | string;
  branch_id?: string;
  branch_name?: string;
  department?: string;
  team_name?: string;
  manager_name?: string;
  created_at: string;
  is_active: boolean;
  is_locked?: boolean;
  user_status?: 'ACTIVE' | 'INVITED' | 'PENDING' | 'SUSPENDED' | 'LOCKED' | 'RESIGNED' | 'TERMINATED';
  password_hash?: string;
  company_id?: string;
  is_mfa_enabled?: boolean;
}

export interface CustomerRecord {
  id: string;
  customer_number: string; // SRM-CUS-2026-000184
  full_name: string;
  mobile: string;
  alt_mobile?: string;
  alternate_mobile?: string;
  email: string;
  dob?: string;
  address?: string;
  city: string;
  budget_min?: number;
  budget_max?: number;
  preferred_location?: string;
  property_type?: string;
  configuration?: string;
  loan_required?: boolean;
  investment_purpose?: string;
  family_requirements?: string;
  preferred_projects?: string;
  purchase_timeline?: string;
  source: string;
  campaign_name?: string;
  medium?: string;
  assigned_employee_id?: string;
  assigned_employee_name?: string;
  team_lead_id?: string;
  team_leader_id?: string;
  team_lead_name?: string;
  priority: 'HOT' | 'WARM' | 'COLD' | 'MEDIUM' | any;
  status: any;
  customer_status?: string;
  quality_score: number;
  remarks?: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface PropertyRecord {
  id: string;
  property_code: string; // SRM-PROP-2026-000421
  property_title: string;
  property_type: string;
  transaction_type: string;
  developer_name: string;
  project_name: string;
  tower_name: string;
  floor: number;
  unit_number: string;
  configuration: string;
  carpet_area_sqft: number;
  built_up_area_sqft: number;
  plot_area_sqft: number;
  facing: string;
  parking_spaces: number;
  furnishing_status: string;
  possession_date: string;
  base_price: number;
  price_per_sqft: number;
  discount: number;
  final_estimated_price: number;
  property_status: 'Active' | 'Under Offer' | 'Sold' | 'Archived';
  availability_status: 'AVAILABLE' | 'HOLD' | 'BOOKED' | 'SOLD';
  location_address: string;
  city: string;
  locality: string;
  latitude: number;
  longitude: number;
  gps_accuracy_meters: number;
  verification_status: string;
  verified_by: string;
  verified_at: string;
  completeness_score: number;
  assigned_employee_id?: string;
  assigned_employee_name?: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}

export interface PropertyUnitRecord {
  id: string;
  unit_code: string; // SRM-UNIT-2026-000001
  property_id: string;
  project_name: string;
  tower_block: string;
  floor: number;
  unit_number: string;
  configuration: string;
  area_sqft: number;
  facing: string;
  base_price: number;
  final_price: number;
  status: 'AVAILABLE' | 'HOLD' | 'BOOKED' | 'SOLD';
  customer_name?: string;
}

export interface PropertyPriceHistoryRecord {
  id: string;
  property_id: string;
  previous_price: number;
  new_price: number;
  changed_by: string;
  changed_at: string;
  reason: string;
}

export interface PropertyShareRecord {
  id: string;
  property_id: string;
  customer_id: string;
  employee_id: string;
  employee_name: string;
  channel: string;
  shared_at: string;
}

// MATCHING & RECOMMENDATION SCHEMAS
export interface PropertyRecommendationShareRecord {
  id: string;
  share_code: string; // SRM-REC-2026-000101
  customer_number: string;
  customer_name: string;
  employee_name: string;
  property_codes: string[];
  channel: 'WhatsApp' | 'Email' | 'Direct Link';
  view_token: string;
  sent_at: string;
  customer_viewed: boolean;
  customer_viewed_at?: string;
  customer_response?: 'INTERESTED' | 'BOOK_VISIT' | 'REJECTED' | 'PENDING';
  customer_response_notes?: string;
}

export interface SiteVisitRecord {
  id: string;
  site_visit_code?: string; // SRM-SV-2026-000501
  customer_number?: string;
  customer_name?: string;
  property_code?: string;
  property_title?: string;
  sales_executive?: string;
  sales_exec_id?: string;
  project_id?: string;
  latitude?: number;
  longitude?: number;
  is_gps_verified?: boolean;
  customer_otp?: string;
  feedback?: string;
  visit_date?: string;
  scheduled_date?: string;
  scheduled_time?: string;
  otp_code?: string;
  is_otp_verified?: boolean;
  gps_checkin?: string;
  visit_status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED' | string;
  feedback_notes?: string;
  created_at?: string;
  lead_id?: string;
}

export interface BookingRecord {
  id: string;
  booking_code?: string; // SRM-BKG-2026-000201
  customer_number?: string;
  customer_name?: string;
  property_code?: string;
  unit_number?: string;
  agreement_value?: number;
  token_amount_paid?: number;
  payment_mode?: string;
  payment_ref?: string;
  sales_executive?: string;
  sales_exec_id?: string;
  booking_date?: string;
  status?: 'CONFIRMED' | 'CANCELLED' | 'APPROVED' | 'PENDING_APPROVAL' | string;
  booking_amount?: number;
  approved_by_user_id?: string;
  unit_id?: string;
  lead_id?: string;
  created_at?: string;
}

export interface BrokerageRecord {
  id: string;
  brokerage_code: string; // SRM-BRK-2026-000101
  booking_code: string;
  developer_name: string;
  commission_percentage: number;
  total_commission_amount: number;
  agent_payout_amount: number;
  company_share_amount: number;
  payout_status: 'PENDING' | 'APPROVED' | 'PAID';
  created_at: string;
}

// LEGAL AGREEMENTS SCHEMAS
export interface AgreementRecord {
  id: string;
  agreement_code: string; // SRM-AGR-CUS-2026-000301 or SRM-AGR-DEV-2026-000301
  agreement_type: 'CUSTOMER_SITE_VISIT' | 'DEVELOPER_MANDATE';
  party_name: string;
  party_mobile_email: string;
  property_code_or_project: string;
  terms_and_conditions: string[];
  commission_rate_pct?: number;
  validity_period_months: number;
  signed_status: 'DRAFT' | 'PENDING_SIGNATURE' | 'EXECUTED_SIGNED' | 'EXPIRED';
  digital_signature_hash?: string;
  signed_at?: string;
  created_at: string;
}

// BILLING & AUTO TAX INVOICE SCHEMAS
export interface InvoiceRecord {
  id: string;
  invoice_number: string; // SRM-INV-2026-000401
  invoice_type: 'DEVELOPER_COMMISSION_GST' | 'CUSTOMER_TOKEN_RECEIPT' | 'SERVICE_BILL';
  booking_code: string;
  customer_name: string;
  developer_name: string;
  property_title: string;
  unit_number: string;
  agreement_value: number;
  hsn_sac_code: string;
  taxable_value: number;
  cgst_amount: number;
  sgst_amount: number;
  total_invoice_amount: number;
  payment_status: 'UNPAID' | 'PARTIALLY_PAID' | 'PAID_SETTLED';
  gstin_developer: string;
  gstin_swaramayi: string;
  due_date: string;
  created_at: string;
}

// ROLE PERMISSION & SECURITY SCHEMAS
export interface ModulePermission {
  module: string;
  can_view: boolean;
  can_create: boolean;
  can_edit: boolean;
  can_delete: boolean;
  can_export: boolean;
  can_approve: boolean;
  can_change_price?: boolean;
  can_change_owner?: boolean;
  can_change_brokerage?: boolean;
}

export interface RolePermissionRecord {
  id: string;
  role_key: string;
  role_name: string;
  data_scope: 'ALL_DATA' | 'BRANCH_DATA' | 'TEAM_DATA' | 'ASSIGNED_DATA';
  permissions: ModulePermission[];
}

export interface ApprovalRequestRecord {
  id: string;
  request_code: string; // SRM-REQ-2026-000101
  request_type: 'LEAD_TRANSFER' | 'PROPERTY_PRICE_CHANGE' | 'BROKERAGE_CHANGE' | 'BOOKING_CANCELLATION' | 'DATA_EXPORT';
  record_id: string;
  requested_by_id: string;
  requested_by_name: string;
  requested_at: string;
  old_value: string;
  new_value: string;
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  approved_by_name?: string;
  approved_at?: string;
}

export interface ActiveSessionRecord {
  id: string;
  user_id: string;
  username: string;
  role: string;
  ip_address: string;
  device_info: string;
  login_time: string;
  last_active: string;
  status: 'ACTIVE' | 'REVOKED';
}

export interface SecurityAlertRecord {
  id: string;
  user_id: string;
  username: string;
  risk_level: 'HIGH' | 'MEDIUM' | 'LOW';
  action: string;
  reason: string;
  timestamp: string;
}

export interface AuditLogRecord {
  id: string;
  user_id?: string;
  action: string;
  resource: string;
  details: string;
  ip_address: string;
  timestamp: string;
}

export interface Schema {
  users: UserRecord[];
  customers: CustomerRecord[];
  properties: PropertyRecord[];
  property_units: PropertyUnitRecord[];
  property_price_history: PropertyPriceHistoryRecord[];
  property_shares: PropertyShareRecord[];
  recommendation_shares: PropertyRecommendationShareRecord[];
  site_visits: SiteVisitRecord[];
  bookings: BookingRecord[];
  brokerage_records: BrokerageRecord[];
  agreements: AgreementRecord[];
  invoices: InvoiceRecord[];
  role_permissions: RolePermissionRecord[];
  approval_requests: ApprovalRequestRecord[];
  active_sessions: ActiveSessionRecord[];
  security_alerts: SecurityAlertRecord[];
  audit_logs: AuditLogRecord[];
  leads: any[];
  projects: any[];
  builders: any[];
  units: any[];
  commissions: any[];
  fraud_alerts: any[];
  system_settings: any;
  lead_transfers: any[];
  followups: any[];
  sequences: {
    customer_seq: number;
    property_seq: number;
    unit_seq: number;
    lead_seq: number;
    recommendation_seq: number;
    site_visit_seq: number;
    booking_seq: number;
    brokerage_seq: number;
    agreement_seq: number;
    invoice_seq: number;
    approval_seq: number;
  };
}

const initialData: Schema = {
  users: [
    {
      id: 'USR-01',
      username: 'Super Admin / Owner',
      full_name: 'Rajesh Varma (Owner)',
      email: 'rajesh.varma@swaramayi.com',
      mobile: '+91 98490 00001',
      role: 'SUPER_ADMIN',
      branch_name: 'Head Office (Hyderabad)',
      department: 'Executive Board',
      team_name: 'Core Management',
      manager_name: 'Self',
      is_active: true,
      user_status: 'ACTIVE',
      created_at: '2026-01-01'
    },
    {
      id: 'USR-02',
      username: 'Branch Manager',
      full_name: 'Vikram Reddy (BM)',
      email: 'vikram.reddy@swaramayi.com',
      mobile: '+91 98490 00002',
      role: 'BRANCH_MANAGER',
      branch_name: 'Kondapur Branch',
      department: 'Sales',
      team_name: 'Branch Leadership',
      manager_name: 'Rajesh Varma',
      is_active: true,
      user_status: 'ACTIVE',
      created_at: '2026-01-15'
    },
    {
      id: 'USR-03',
      username: 'Rahul Sharma (TL)',
      full_name: 'Rahul Sharma (Team Lead)',
      email: 'rahul.sharma@swaramayi.com',
      mobile: '+91 98490 00003',
      role: 'TEAM_LEAD',
      branch_name: 'Kondapur Branch',
      department: 'Sales',
      team_name: 'Sales Team A',
      manager_name: 'Vikram Reddy',
      is_active: true,
      user_status: 'ACTIVE',
      created_at: '2026-02-01'
    },
    {
      id: 'USR-04',
      username: 'Priya Nair (Sales Exec)',
      full_name: 'Priya Nair',
      email: 'priya.nair@swaramayi.com',
      mobile: '+91 98490 00004',
      role: 'SALES_EXEC',
      branch_name: 'Kondapur Branch',
      department: 'Sales',
      team_name: 'Sales Team A',
      manager_name: 'Rahul Sharma',
      is_active: true,
      user_status: 'ACTIVE',
      created_at: '2026-02-15'
    }
  ],
  customers: [],
  properties: [],
  property_units: [],
  property_price_history: [],
  property_shares: [],
  recommendation_shares: [],
  site_visits: [],
  bookings: [],
  brokerage_records: [],
  agreements: [],
  invoices: [],
  role_permissions: [
    {
      id: 'RP-01',
      role_key: 'SUPER_ADMIN',
      role_name: 'SUPER ADMIN / OWNER',
      data_scope: 'ALL_DATA',
      permissions: [
        { module: 'CUSTOMERS', can_view: true, can_create: true, can_edit: true, can_delete: true, can_export: true, can_approve: true, can_change_owner: true },
        { module: 'PROPERTIES', can_view: true, can_create: true, can_edit: true, can_delete: true, can_export: true, can_approve: true, can_change_price: true },
        { module: 'BOOKINGS', can_view: true, can_create: true, can_edit: true, can_delete: true, can_export: true, can_approve: true },
        { module: 'BROKERAGE', can_view: true, can_create: true, can_edit: true, can_delete: true, can_export: true, can_approve: true, can_change_brokerage: true }
      ]
    },
    {
      id: 'RP-02',
      role_key: 'SALES_EXEC',
      role_name: 'SALES EXECUTIVE',
      data_scope: 'ASSIGNED_DATA',
      permissions: [
        { module: 'CUSTOMERS', can_view: true, can_create: true, can_edit: true, can_delete: false, can_export: false, can_approve: false, can_change_owner: false },
        { module: 'PROPERTIES', can_view: true, can_create: false, can_edit: false, can_delete: false, can_export: false, can_approve: false },
        { module: 'BOOKINGS', can_view: true, can_create: true, can_edit: false, can_delete: false, can_export: false, can_approve: false },
        { module: 'BROKERAGE', can_view: false, can_create: false, can_edit: false, can_delete: false, can_export: false, can_approve: false }
      ]
    }
  ],
  approval_requests: [
    {
      id: 'REQ-01',
      request_code: 'SRM-REQ-2026-000101',
      request_type: 'LEAD_TRANSFER',
      record_id: 'SRM-CUS-2026-000184',
      requested_by_id: 'USR-04',
      requested_by_name: 'Priya Nair (Sales Exec)',
      requested_at: '16 Aug 2026 12:00 PM',
      old_value: 'Priya Nair (Sales Exec)',
      new_value: 'Amit Kumar (Sales Exec)',
      reason: 'Customer requested secondary agent consultation for villa project in Gachibowli.',
      status: 'PENDING'
    }
  ],
  active_sessions: [
    {
      id: 'SES-01',
      user_id: 'USR-01',
      username: 'Rajesh Varma (Super Admin)',
      role: 'SUPER_ADMIN',
      ip_address: '127.0.0.1 (Localhost)',
      device_info: 'Chrome 127.0 / Windows 11 Enterprise',
      login_time: '16 Aug 2026 09:00 AM',
      last_active: 'Just Now',
      status: 'ACTIVE'
    }
  ],
  security_alerts: [
    {
      id: 'ALT-01',
      user_id: 'USR-04',
      username: 'Priya Nair (Sales Exec)',
      risk_level: 'LOW',
      action: 'BULK_PROPERTY_VIEW',
      reason: 'Viewed 15 properties in matching engine within 60 seconds.',
      timestamp: '16 Aug 2026 01:15 PM'
    }
  ],
  audit_logs: [],
  leads: [],
  projects: [],
  builders: [],
  units: [],
  commissions: [],
  fraud_alerts: [],
  system_settings: { is_lockdown_active: false },
  lead_transfers: [],
  followups: [],
  sequences: {
    customer_seq: 184,
    property_seq: 421,
    unit_seq: 1,
    lead_seq: 1245,
    recommendation_seq: 101,
    site_visit_seq: 501,
    booking_seq: 201,
    brokerage_seq: 101,
    agreement_seq: 302,
    invoice_seq: 401,
    approval_seq: 101
  }
};

export class JSONDatabase {
  public data: Schema;

  constructor() {
    this.data = initialData;
    this.load();
  }

  public load() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        this.data = { ...initialData, ...JSON.parse(raw) };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error reading JSON DB, initializing fallback:', err);
      this.data = initialData;
    }
  }

  public save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving JSON DB:', err);
    }
  }
}

export const dbStore = new JSONDatabase();

export function loadData() {
  dbStore.load();
}

export function saveData() {
  dbStore.save();
}

export function generateID(type: 'SRM-CUS' | 'SRM-PROP' | 'SRM-UNIT' | 'SRM-LEAD' | 'SRM-REC' | 'SRM-SV' | 'SRM-BKG' | 'SRM-BRK' | 'SRM-AGR' | 'SRM-INV' | 'SRM-REQ'): string {
  loadData();
  const year = 2026;
  let nextSeq = 1;

  if (type === 'SRM-CUS') {
    dbStore.data.sequences.customer_seq += 1;
    nextSeq = dbStore.data.sequences.customer_seq;
    saveData();
    return `SRM-CUS-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-PROP') {
    dbStore.data.sequences.property_seq += 1;
    nextSeq = dbStore.data.sequences.property_seq;
    saveData();
    return `SRM-PROP-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-UNIT') {
    dbStore.data.sequences.unit_seq += 1;
    nextSeq = dbStore.data.sequences.unit_seq;
    saveData();
    return `SRM-UNIT-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-LEAD') {
    dbStore.data.sequences.lead_seq += 1;
    nextSeq = dbStore.data.sequences.lead_seq;
    saveData();
    return `SRM-LEAD-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-REC') {
    dbStore.data.sequences.recommendation_seq += 1;
    nextSeq = dbStore.data.sequences.recommendation_seq;
    saveData();
    return `SRM-REC-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-SV') {
    dbStore.data.sequences.site_visit_seq += 1;
    nextSeq = dbStore.data.sequences.site_visit_seq;
    saveData();
    return `SRM-SV-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-BKG') {
    dbStore.data.sequences.booking_seq += 1;
    nextSeq = dbStore.data.sequences.booking_seq;
    saveData();
    return `SRM-BKG-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-BRK') {
    dbStore.data.sequences.brokerage_seq += 1;
    nextSeq = dbStore.data.sequences.brokerage_seq;
    saveData();
    return `SRM-BRK-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-AGR') {
    dbStore.data.sequences.agreement_seq += 1;
    nextSeq = dbStore.data.sequences.agreement_seq;
    saveData();
    return `SRM-AGR-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else if (type === 'SRM-INV') {
    dbStore.data.sequences.invoice_seq += 1;
    nextSeq = dbStore.data.sequences.invoice_seq;
    saveData();
    return `SRM-INV-${year}-${String(nextSeq).padStart(6, '0')}`;
  } else {
    dbStore.data.sequences.approval_seq += 1;
    nextSeq = dbStore.data.sequences.approval_seq;
    saveData();
    return `SRM-REQ-${year}-${String(nextSeq).padStart(6, '0')}`;
  }
}

export function logAudit(userId: string | null, action: string, resource: string, details: string, ip: string = '127.0.0.1') {
  loadData();
  dbStore.data.audit_logs.unshift({
    id: String(Date.now()),
    user_id: userId || undefined,
    action,
    resource,
    details,
    ip_address: ip,
    timestamp: new Date().toISOString()
  });
  saveData();
}
