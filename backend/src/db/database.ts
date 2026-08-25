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
export interface BranchRecord {
  id: string;
  branch_code: string;
  branch_name: string;
  city: string;
  address: string;
  branch_manager_id?: string;
  branch_manager_name?: string;
  created_at: string;
}

export interface TeamRecord {
  id: string;
  team_name: string;
  branch_id: string;
  branch_name: string;
  team_lead_id?: string;
  team_lead_name?: string;
  members_count: number;
}

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
  can_mask_mobile?: boolean;
}

export interface RolePermissionRecord {
  id: string;
  role_key: string;
  role_name: string;
  data_scope: 'ALL_DATA' | 'BRANCH_DATA' | 'TEAM_DATA' | 'ASSIGNED_DATA' | 'OWN_DATA' | string;
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
  branches: BranchRecord[];
  teams: TeamRecord[];
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
  payments: any[];
  marketing_campaigns: any[];
  employee_activities: any[];
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
  branches: [
    { id: 'BR-HYD-HO', branch_code: 'SRM-BR-01', branch_name: 'Head Office (Hyderabad)', city: 'Hyderabad', address: 'Jubilee Hills, Hyderabad', branch_manager_id: 'USR-01', branch_manager_name: 'Rajesh Varma', created_at: '2026-01-01' },
    { id: 'BR-HYD-KON', branch_code: 'SRM-BR-02', branch_name: 'Kondapur Branch', city: 'Hyderabad', address: 'Kondapur Main Rd, Hyderabad', branch_manager_id: 'USR-03', branch_manager_name: 'Suresh Kumar', created_at: '2026-01-15' },
    { id: 'BR-HYD-GAC', branch_code: 'SRM-BR-03', branch_name: 'Gachibowli Branch', city: 'Hyderabad', address: 'Financial District, Hyderabad', branch_manager_id: 'USR-03', branch_manager_name: 'Suresh Kumar', created_at: '2026-02-01' },
    { id: 'BR-KOL-HO', branch_code: 'SRM-BR-04', branch_name: 'Kolkata Branch', city: 'Kolkata', address: 'Salt Lake Sector V, Kolkata', branch_manager_id: 'USR-02', branch_manager_name: 'Vikram Reddy', created_at: '2026-03-01' }
  ],
  teams: [
    { id: 'TEAM-A', team_name: 'Sales Team Alpha', branch_id: 'BR-HYD-KON', branch_name: 'Kondapur Branch', team_lead_id: 'USR-04', team_lead_name: 'Rahul Sharma', members_count: 4 },
    { id: 'TEAM-B', team_name: 'Sales Team Bravo', branch_id: 'BR-HYD-GAC', branch_name: 'Gachibowli Branch', team_lead_id: 'USR-04', team_lead_name: 'Rahul Sharma', members_count: 3 }
  ],
  users: [
    { id: 'USR-01', username: 'Rajesh Varma (Owner)', full_name: 'Rajesh Varma', email: 'rajesh.varma@swaramayi.com', mobile: '+91 98490 00001', role: 'SUPER_ADMIN', branch_name: 'Head Office', department: 'Executive Board', team_name: 'Core Management', manager_name: 'Self', is_active: true, user_status: 'ACTIVE', created_at: '2026-01-01' },
    { id: 'USR-02', username: 'Anil Kapoor (Admin)', full_name: 'Anil Kapoor', email: 'anil.k@swaramayi.com', mobile: '+91 98490 00002', role: 'ADMIN', branch_name: 'Head Office', department: 'System Admin', team_name: 'IT Ops Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE', created_at: '2026-01-05' },
    { id: 'USR-03', username: 'Vikram Reddy (GM)', full_name: 'Vikram Reddy', email: 'vikram.reddy@swaramayi.com', mobile: '+91 98490 00003', role: 'GENERAL_MANAGER', branch_name: 'Head Office', department: 'General Management', team_name: 'Leadership', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE', created_at: '2026-01-10' },
    { id: 'USR-04', username: 'Suresh Kumar (BM)', full_name: 'Suresh Kumar', email: 'suresh.k@swaramayi.com', mobile: '+91 98490 00004', role: 'BRANCH_MANAGER', branch_name: 'Kondapur Branch', department: 'Sales Management', team_name: 'Branch Leadership', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE', created_at: '2026-01-15' },
    { id: 'USR-05', username: 'Deepak Verma (SM)', full_name: 'Deepak Verma', email: 'deepak.v@swaramayi.com', mobile: '+91 98490 00005', role: 'SALES_MANAGER', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Management', manager_name: 'Suresh Kumar', is_active: true, user_status: 'ACTIVE', created_at: '2026-01-20' },
    { id: 'USR-06', username: 'Rahul Sharma (TL)', full_name: 'Rahul Sharma', email: 'rahul.sharma@swaramayi.com', mobile: '+91 98490 00006', role: 'TEAM_LEAD', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team Alpha', manager_name: 'Deepak Verma', is_active: true, user_status: 'ACTIVE', created_at: '2026-02-01' },
    { id: 'USR-07', username: 'Priya Nair (Sales Exec)', full_name: 'Priya Nair', email: 'priya.nair@swaramayi.com', mobile: '+91 98490 00007', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team Alpha', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE', created_at: '2026-02-15' },
    { id: 'USR-08', username: 'Ananya Roy (Telecaller)', full_name: 'Ananya Roy', email: 'ananya.roy@swaramayi.com', mobile: '+91 98490 00008', role: 'TELECALLER', branch_name: 'Kondapur Branch', department: 'Inside Sales', team_name: 'Telecalling Squad', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE', created_at: '2026-02-20' },
    { id: 'USR-09', username: 'Kavita Sharma (Back Office)', full_name: 'Kavita Sharma', email: 'kavita.s@swaramayi.com', mobile: '+91 98490 00009', role: 'BACK_OFFICE', branch_name: 'Kondapur Branch', department: 'Operations', team_name: 'Back Office Desk', manager_name: 'Suresh Kumar', is_active: true, user_status: 'ACTIVE', created_at: '2026-03-01' },
    { id: 'USR-10', username: 'Meera Deshmukh (Accounts)', full_name: 'Meera Deshmukh', email: 'meera.d@swaramayi.com', mobile: '+91 98490 00010', role: 'ACCOUNTS', branch_name: 'Head Office', department: 'Finance & Tax', team_name: 'Accounts Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE', created_at: '2026-03-05' },
    { id: 'USR-11', username: 'Sanjay Dutt (HR)', full_name: 'Sanjay Dutt', email: 'sanjay.d@swaramayi.com', mobile: '+91 98490 00011', role: 'HR', branch_name: 'Head Office', department: 'Human Resources', team_name: 'HR Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE', created_at: '2026-03-10' },
    { id: 'USR-12', username: 'Rohit Sen (Marketing)', full_name: 'Rohit Sen', email: 'rohit.sen@swaramayi.com', mobile: '+91 98490 00012', role: 'MARKETING', branch_name: 'Head Office', department: 'Growth & Ads', team_name: 'Marketing Squad', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE', created_at: '2026-03-15' },
    { id: 'USR-13', username: 'Kiran Kumar (Prop Mgr)', full_name: 'Kiran Kumar', email: 'kiran.k@swaramayi.com', mobile: '+91 98490 00013', role: 'PROPERTY_MANAGER', branch_name: 'Head Office', department: 'Inventory Vault', team_name: 'Property Desk', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE', created_at: '2026-03-20' },
    { id: 'USR-14', username: 'Ramesh Pawar (Field Exec)', full_name: 'Ramesh Pawar', email: 'ramesh.p@swaramayi.com', mobile: '+91 98490 00014', role: 'FIELD_EXEC', branch_name: 'Kondapur Branch', department: 'Site Operations', team_name: 'Field Squad', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE', created_at: '2026-04-01' },
    { id: 'USR-15', username: 'Sneha Roy (Customer Support)', full_name: 'Sneha Roy', email: 'sneha.roy@swaramayi.com', mobile: '+91 98490 00015', role: 'CUSTOMER_SUPPORT', branch_name: 'Head Office', department: 'Support', team_name: 'Support Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE', created_at: '2026-04-05' }
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
    { id: 'RP-01', role_key: 'SUPER_ADMIN', role_name: 'SUPER ADMIN / OWNER', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-02', role_key: 'ADMIN', role_name: 'ADMIN', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-03', role_key: 'GENERAL_MANAGER', role_name: 'GENERAL MANAGER', data_scope: 'ALL_BRANCHES', permissions: [] },
    { id: 'RP-04', role_key: 'BRANCH_MANAGER', role_name: 'BRANCH MANAGER', data_scope: 'OWN_BRANCH', permissions: [] },
    { id: 'RP-05', role_key: 'SALES_MANAGER', role_name: 'SALES MANAGER', data_scope: 'OWN_TEAM', permissions: [] },
    { id: 'RP-06', role_key: 'TEAM_LEAD', role_name: 'TEAM LEADER', data_scope: 'OWN_TEAM', permissions: [] },
    { id: 'RP-07', role_key: 'SALES_EXEC', role_name: 'SALES EXECUTIVE', data_scope: 'ASSIGNED_DATA', permissions: [] },
    { id: 'RP-08', role_key: 'TELECALLER', role_name: 'TELECALLER', data_scope: 'ASSIGNED_DATA', permissions: [] },
    { id: 'RP-09', role_key: 'BACK_OFFICE', role_name: 'BACK OFFICE', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-10', role_key: 'ACCOUNTS', role_name: 'ACCOUNTS & FINANCE', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-11', role_key: 'HR', role_name: 'HUMAN RESOURCES (HR)', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-12', role_key: 'MARKETING', role_name: 'MARKETING SQUAD', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-13', role_key: 'PROPERTY_MANAGER', role_name: 'PROPERTY MANAGER', data_scope: 'ALL_DATA', permissions: [] },
    { id: 'RP-14', role_key: 'FIELD_EXEC', role_name: 'FIELD EXECUTIVE', data_scope: 'ASSIGNED_DATA', permissions: [] },
    { id: 'RP-15', role_key: 'CUSTOMER_SUPPORT', role_name: 'CUSTOMER SUPPORT', data_scope: 'ASSIGNED_DATA', permissions: [] }
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
  payments: [],
  marketing_campaigns: [],
  employee_activities: [],
  leads: [
    {
      id: 'LEAD-000001',
      lead_number: 'SRM-LEAD-2026-000001',
      customer_id: 'SRM-CUS-2026-000184',
      customer_number: 'SRM-CUS-2026-000184',
      customer_name: 'Rohan Deshmukh',
      mobile: '+91 98490 11223',
      alternate_mobile: '+91 98490 11224',
      whatsapp_number: '+91 98490 11223',
      email: 'rohan.d@gmail.com',
      source: 'Facebook',
      campaign: 'High-end Villa Ads',
      preferred_location: 'Kondapur / Gachibowli',
      preferred_project: 'Aparna Zenon',
      property_type: 'Flat / Apartment',
      bhk: '3BHK',
      budget_min: 7000000,
      budget_max: 8500000,
      purpose: 'Self Use',
      possession_preference: 'Immediate (< 30 Days)',
      loan_required: true,
      occupation: 'IT Manager (Microsoft)',
      priority: 'HOT',
      lead_status: 'INTERESTED',
      call_disposition: 'CONNECTED_INTERESTED',
      next_action: 'Send Cost Sheet',
      next_followup: '2026-08-25T17:00:00.000Z',
      assigned_employee_id: 'USR-07',
      assigned_employee_name: 'Priya Nair (Sales Exec)',
      created_by: 'USR-01',
      quality_score: 88,
      created_at: '2026-08-24T10:30:00.000Z',
      updated_at: '2026-08-24T11:20:00.000Z'
    },
    {
      id: 'LEAD-000002',
      lead_number: 'SRM-LEAD-2026-000002',
      customer_id: 'SRM-CUS-2026-000185',
      customer_number: 'SRM-CUS-2026-000185',
      customer_name: 'Vikramaditya Roy',
      mobile: '+91 98490 55443',
      whatsapp_number: '+91 98490 55443',
      email: 'vikram.roy@techmail.com',
      source: 'Google Ads',
      campaign: 'Hyderabad Luxury Living',
      preferred_location: 'Financial District',
      preferred_project: 'My Home Bhooja',
      property_type: 'Flat / Apartment',
      bhk: '4BHK',
      budget_min: 15000000,
      budget_max: 22000000,
      purpose: 'Investment',
      possession_preference: 'Under Construction (6-12 Months)',
      loan_required: false,
      occupation: 'Business Owner',
      priority: 'HOT',
      lead_status: 'CALL_BACK_LATER',
      call_disposition: 'CUSTOMER_BUSY',
      next_action: 'Call Again',
      next_followup: '2026-08-22T10:00:00.000Z', // Overdue for testing
      assigned_employee_id: 'USR-07',
      assigned_employee_name: 'Priya Nair (Sales Exec)',
      created_by: 'USR-01',
      quality_score: 94,
      created_at: '2026-08-20T09:15:00.000Z',
      updated_at: '2026-08-22T10:00:00.000Z'
    },
    {
      id: 'LEAD-000003',
      lead_number: 'SRM-LEAD-2026-000003',
      customer_id: 'SRM-CUS-2026-000186',
      customer_number: 'SRM-CUS-2026-000186',
      customer_name: 'Sumanth Varma',
      mobile: '+91 98490 88888',
      whatsapp_number: '+91 98490 88888',
      email: 'sumanth.varma@gmail.com',
      source: 'Walk-in',
      preferred_location: 'Kondapur',
      preferred_project: 'Incor PBEL City',
      property_type: 'Flat / Apartment',
      bhk: '3BHK',
      budget_min: 12000000,
      budget_max: 18000000,
      purpose: 'Self Use',
      possession_preference: 'Immediate',
      loan_required: true,
      occupation: 'Senior Software Engineer',
      priority: 'WARM',
      lead_status: 'MATCHING_PENDING',
      call_disposition: 'Connected',
      next_action: 'Create Matching',
      next_followup: '2026-08-24T18:00:00.000Z',
      assigned_employee_id: 'USR-14',
      assigned_employee_name: 'Ramesh Pawar (Field Exec)',
      created_by: 'USR-04',
      quality_score: 82,
      created_at: '2026-08-22T14:00:00.000Z',
      updated_at: '2026-08-24T14:00:00.000Z'
    },
    {
      id: 'LEAD-000004',
      lead_number: 'SRM-LEAD-2026-000004',
      customer_id: 'SRM-CUS-2026-000187',
      customer_number: 'SRM-CUS-2026-000187',
      customer_name: 'Avishek Das',
      mobile: '9432328947',
      whatsapp_number: '9432328947',
      email: 'avishek@gmail.com',
      source: 'Referral',
      preferred_location: 'Madhyamgram',
      property_type: 'Flat / Apartment',
      bhk: '3BHK',
      budget_min: 5000000,
      budget_max: 6000000,
      purpose: 'Self Use',
      possession_preference: 'Ready to Move',
      loan_required: true,
      occupation: 'Consultant',
      priority: 'HOT',
      lead_status: 'MATCHING_PENDING',
      call_disposition: 'Interested',
      next_action: 'Send Property Details',
      next_followup: '2026-08-25T11:00:00.000Z',
      assigned_employee_id: 'USR-07',
      assigned_employee_name: 'Priya Nair (Sales Exec)',
      created_by: 'USR-01',
      quality_score: 90,
      created_at: '2026-08-24T08:00:00.000Z',
      updated_at: '2026-08-24T08:00:00.000Z'
    },
    {
      id: 'LEAD-000005',
      lead_number: 'SRM-LEAD-2026-000005',
      customer_id: 'SRM-CUS-2026-000188',
      customer_number: 'SRM-CUS-2026-000188',
      customer_name: 'Ananya Deshpande',
      mobile: '+91 98490 77665',
      whatsapp_number: '+91 98490 77665',
      email: 'ananya.d@yahoo.com',
      source: 'Website',
      preferred_location: 'Hitec City',
      property_type: 'Flat / Apartment',
      bhk: '2BHK',
      budget_min: 6000000,
      budget_max: 7500000,
      purpose: 'Self Use',
      possession_preference: 'Under Construction',
      loan_required: true,
      occupation: 'Bank Officer',
      priority: 'COLD',
      lead_status: 'NURTURE',
      call_disposition: 'PROPERTY_SEARCH_LATER',
      next_action: 'Follow Up Later',
      next_followup: '2027-02-01T10:00:00.000Z',
      assigned_employee_id: 'USR-08',
      assigned_employee_name: 'Ananya Roy (Telecaller)',
      created_by: 'USR-02',
      quality_score: 55,
      created_at: '2026-08-15T10:00:00.000Z',
      updated_at: '2026-08-18T10:00:00.000Z'
    }
  ],
  projects: [],
  builders: [],
  units: [],
  commissions: [],
  fraud_alerts: [],
  system_settings: { is_lockdown_active: false },
  lead_transfers: [],
  followups: [
    {
      id: 'FLP-001',
      followup_code: 'SRM-FLP-2026-000001',
      lead_id: 'SRM-LEAD-2026-000001',
      customer_name: 'Rohan Deshmukh',
      mobile: '+91 98490 11223',
      assigned_to: 'USR-07',
      due_date: '2026-08-25',
      due_time: '5:00 PM',
      reason: 'Discuss revised cost sheet with floor rise discount',
      status: 'PENDING',
      created_at: '2026-08-24T11:20:00.000Z'
    },
    {
      id: 'FLP-002',
      followup_code: 'SRM-FLP-2026-000002',
      lead_id: 'SRM-LEAD-2026-000002',
      customer_name: 'Vikramaditya Roy',
      mobile: '+91 98490 55443',
      assigned_to: 'USR-07',
      due_date: '2026-08-22',
      due_time: '10:00 AM',
      reason: 'Overdue Callback requested by customer during meeting',
      status: 'OVERDUE',
      created_at: '2026-08-20T09:15:00.000Z'
    }
  ],
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

export class MongoStoreDatabase {
  public data: Schema;

  constructor() {
    this.data = initialData;
  }

  public load() {
    // Memory and MongoDB collection state store
  }

  public save() {
    // Memory and MongoDB collection state store
  }
}

export const dbStore = new MongoStoreDatabase();

export function loadData() {
  dbStore.load();
}

export function saveData() {
  dbStore.save();
}

export function generateID(type: 'SRM-CUS' | 'SRM-PROP' | 'SRM-UNIT' | 'SRM-LEAD' | 'SRM-REC' | 'SRM-SV' | 'SRM-BKG' | 'SRM-BRK' | 'SRM-AGR' | 'SRM-INV' | 'SRM-REQ' | 'SRM-FLP'): string {
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
  } else if (type === 'SRM-FLP') {
    return `SRM-FLP-${year}-${String(Date.now()).slice(-6)}`;
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
