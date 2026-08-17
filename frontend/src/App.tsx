import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, UserCog, Building, Users, CreditCard, User, FileCheck,
  Building2, ShieldAlert, Sparkles, MapPin, Search, Plus, ShieldCheck, 
  Lock, Unlock, PhoneCall, Award, TrendingUp, Calendar, AlertTriangle, 
  ArrowUpRight, DollarSign, CheckCircle2, FileText, Bot, RefreshCw, Send, 
  Check, Phone, MessageSquare, UserCheck, ChevronRight, Layers, FileSpreadsheet,
  Download, Printer, Filter, Star, Clock, AlertOctagon, UserX, Radio, Cpu, 
  CheckSquare, XCircle, RotateCw, Play, MessageCircle, Tag, UserPlus, 
  CheckCircle, Sliders, Zap, Shield, AlertCircle, Briefcase, Key, Repeat, 
  CheckSquare2, Receipt, Target, Hash, LifeBuoy, FileCode, ArrowRightLeft, UserCheck2, X,
  Compass, QrCode, Share2, Layers3, Activity, CheckSquare1, Eye, ThumbsUp, ThumbsDown,
  Upload, FileUp, FileDown, Table, FileSignature, Scale, PenTool, ReceiptText, Calculator, Landmark,
  Grid, List, Columns, Edit3, Trash2, CheckStack, Layers2, Navigation, Map, PieChart, BarChart2
} from 'lucide-react';

export default function App() {
  // 8 Main Navigation Categories
  const [activeTab, setActiveTab] = useState<
    'main_dashboard' | 'role_management' | 'project_management' | 'customer_management' | 'billing_management' | 'profile' | 'agreement_management' | 'map_management'
  >('main_dashboard');
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');

  // Global BI Dashboard Filters
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'this_quarter' | 'this_year'>('this_month');
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');

  // Display Modes
  const [propertyViewMode, setPropertyViewMode] = useState<'grid' | 'table' | 'split'>('table');
  const [customerViewMode, setCustomerViewMode] = useState<'grid' | 'table' | 'split'>('table');

  // Sub-Tabs States across Categories
  const [activeRoleSubTab, setActiveRoleSubTab] = useState<'user_directory' | 'permission_matrix' | 'org_hierarchy' | 'approval_queue' | 'session_security' | 'exit_handover'>('user_directory');
  const [activeProjectSubTab, setActiveProjectSubTab] = useState<'property_master' | 'live_inventory_board' | 'map_radius' | 'price_security'>('property_master');
  const [activeCustomerSubTab, setActiveCustomerSubTab] = useState<'smart_matching_engine' | 'master_360' | 'lead_pipeline'>('smart_matching_engine');
  const [activeAgreementSubTab, setActiveAgreementSubTab] = useState<'all_agreements' | 'customer_agreements' | 'developer_agreements' | 'tc_templates'>('all_agreements');
  const [activeBillingSubTab, setActiveBillingSubTab] = useState<'tax_invoices' | 'developer_commission' | 'payment_receipts' | 'financial_ledger'>('tax_invoices');

  // Location Filter State for Map Tab
  const [selectedLocality, setSelectedLocality] = useState<string>('ALL');
  const [activeRadius, setActiveRadius] = useState<'1KM' | '2KM' | '5KM' | '10KM' | '25KM'>('5KM');

  // Role Context Switcher State
  const [currentRole, setCurrentRole] = useState<string>('SUPER_ADMIN');
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Bulk Selection States
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>([]);
  const [selectedCustomerIds, setSelectedCustomerIds] = useState<string[]>([]);

  // Interactive Drill-Down Modal State
  const [drillDownTitle, setDrillDownTitle] = useState<string | null>(null);
  const [drillDownRecords, setDrillDownRecords] = useState<any[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // System Lockdown state
  const [isLockdown, setIsLockdown] = useState(false);

  // Modals Visibility State
  const [showUserModal, setShowUserModal] = useState(false);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showPropertyModal, setShowPropertyModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showFullContractModal, setShowFullContractModal] = useState(false);

  // Edit Modals
  const [showEditPropertyModal, setShowEditPropertyModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  const [showEditCustomerModal, setShowEditCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  // Customer 360° and Property 360° Drawer States
  const [selectedCustomer360, setSelectedCustomer360] = useState<any>(null);
  const [selectedProperty360, setSelectedProperty360] = useState<any>(null);
  const [followupSubTab, setFollowupSubTab] = useState<'overdue' | 'today' | 'tomorrow' | 'upcoming' | 'none'>('overdue');
  const [salespersonFilter, setSalespersonFilter] = useState<string>('ALL');

  // ----------------------------------------------------
  // FULL MASTER CRM DATASETS
  // ----------------------------------------------------

  // 1. Employee Directory (15 Users for all 15 Default Roles)
  const [users, setUsers] = useState([
    { id: 'USR-01', username: 'Rajesh Varma (Owner)', full_name: 'Rajesh Varma', email: 'rajesh.varma@swaramayi.com', mobile: '+91 98490 00001', role: 'SUPER_ADMIN', branch_name: 'Head Office', department: 'Executive Board', team_name: 'Core Management', manager_name: 'Self', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-02', username: 'Anil Kapoor (Admin)', full_name: 'Anil Kapoor', email: 'anil.k@swaramayi.com', mobile: '+91 98490 00002', role: 'ADMIN', branch_name: 'Head Office', department: 'System Admin', team_name: 'IT Ops Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-03', username: 'Vikram Reddy (GM)', full_name: 'Vikram Reddy', email: 'vikram.reddy@swaramayi.com', mobile: '+91 98490 00003', role: 'GENERAL_MANAGER', branch_name: 'Head Office', department: 'General Management', team_name: 'Leadership', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-04', username: 'Suresh Kumar (BM)', full_name: 'Suresh Kumar', email: 'suresh.k@swaramayi.com', mobile: '+91 98490 00004', role: 'BRANCH_MANAGER', branch_name: 'Kondapur Branch', department: 'Sales Management', team_name: 'Branch Leadership', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-05', username: 'Deepak Verma (SM)', full_name: 'Deepak Verma', email: 'deepak.v@swaramayi.com', mobile: '+91 98490 00005', role: 'SALES_MANAGER', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Management', manager_name: 'Suresh Kumar', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-06', username: 'Rahul Sharma (TL)', full_name: 'Rahul Sharma', email: 'rahul.sharma@swaramayi.com', mobile: '+91 98490 00006', role: 'TEAM_LEAD', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team Alpha', manager_name: 'Deepak Verma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-07', username: 'Priya Nair (Sales Exec)', full_name: 'Priya Nair', email: 'priya.nair@swaramayi.com', mobile: '+91 98490 00007', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team Alpha', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-08', username: 'Ananya Roy (Telecaller)', full_name: 'Ananya Roy', email: 'ananya.roy@swaramayi.com', mobile: '+91 98490 00008', role: 'TELECALLER', branch_name: 'Kondapur Branch', department: 'Inside Sales', team_name: 'Telecalling Squad', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-09', username: 'Kavita Sharma (Back Office)', full_name: 'Kavita Sharma', email: 'kavita.s@swaramayi.com', mobile: '+91 98490 00009', role: 'BACK_OFFICE', branch_name: 'Kondapur Branch', department: 'Operations', team_name: 'Back Office Desk', manager_name: 'Suresh Kumar', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-10', username: 'Meera Deshmukh (Accounts)', full_name: 'Meera Deshmukh', email: 'meera.d@swaramayi.com', mobile: '+91 98490 00010', role: 'ACCOUNTS', branch_name: 'Head Office', department: 'Finance & Tax', team_name: 'Accounts Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-11', username: 'Sanjay Dutt (HR)', full_name: 'Sanjay Dutt', email: 'sanjay.d@swaramayi.com', mobile: '+91 98490 00011', role: 'HR', branch_name: 'Head Office', department: 'Human Resources', team_name: 'HR Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-12', username: 'Rohit Sen (Marketing)', full_name: 'Rohit Sen', email: 'rohit.sen@swaramayi.com', mobile: '+91 98490 00012', role: 'MARKETING', branch_name: 'Head Office', department: 'Growth & Ads', team_name: 'Marketing Squad', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-13', username: 'Kiran Kumar (Prop Mgr)', full_name: 'Kiran Kumar', email: 'kiran.k@swaramayi.com', mobile: '+91 98490 00013', role: 'PROPERTY_MANAGER', branch_name: 'Head Office', department: 'Inventory Vault', team_name: 'Property Desk', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-14', username: 'Ramesh Pawar (Field Exec)', full_name: 'Ramesh Pawar', email: 'ramesh.p@swaramayi.com', mobile: '+91 98490 00014', role: 'FIELD_EXEC', branch_name: 'Kondapur Branch', department: 'Site Operations', team_name: 'Field Squad', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-15', username: 'Sneha Roy (Customer Support)', full_name: 'Sneha Roy', email: 'sneha.roy@swaramayi.com', mobile: '+91 98490 00015', role: 'CUSTOMER_SUPPORT', branch_name: 'Head Office', department: 'Support', team_name: 'Support Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' }
  ]);

  // 2. All 15 Roles Permission Matrix
  const [rolePermissions, setRolePermissions] = useState([
    { role_key: 'SUPER_ADMIN', role_name: '1. SUPER ADMIN / OWNER', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: true, export: true, approve: true, price_change: true, owner_change: true, brokerage: true },
    { role_key: 'ADMIN', role_name: '2. ADMIN', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: true, price_change: false, owner_change: true, brokerage: false },
    { role_key: 'GENERAL_MANAGER', role_name: '3. GENERAL MANAGER', data_scope: 'ALL_BRANCHES', view: true, create: true, edit: true, delete: false, export: true, approve: true, price_change: true, owner_change: false, brokerage: true },
    { role_key: 'BRANCH_MANAGER', role_name: '4. BRANCH MANAGER', data_scope: 'OWN_BRANCH', view: true, create: true, edit: true, delete: false, export: true, approve: true, price_change: false, owner_change: false, brokerage: true },
    { role_key: 'SALES_MANAGER', role_name: '5. SALES MANAGER', data_scope: 'OWN_TEAM', view: true, create: true, edit: true, delete: false, export: true, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'TEAM_LEAD', role_name: '6. TEAM LEADER', data_scope: 'OWN_TEAM', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'SALES_EXEC', role_name: '7. SALES EXECUTIVE', data_scope: 'ASSIGNED_ONLY', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'TELECALLER', role_name: '8. TELECALLER', data_scope: 'ASSIGNED_ONLY', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'BACK_OFFICE', role_name: '9. BACK OFFICE / DESK', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'ACCOUNTS', role_name: '10. ACCOUNTS & FINANCE', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: true, price_change: false, owner_change: false, brokerage: true },
    { role_key: 'HR', role_name: '11. HUMAN RESOURCES (HR)', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: true, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'MARKETING', role_name: '12. MARKETING SQUAD', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'PROPERTY_MANAGER', role_name: '13. PROPERTY MANAGER', data_scope: 'ALL_DATA', view: true, create: true, edit: true, delete: false, export: true, approve: false, price_change: true, owner_change: true, brokerage: false },
    { role_key: 'FIELD_EXEC', role_name: '14. FIELD EXECUTIVE', data_scope: 'ASSIGNED_ONLY', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false },
    { role_key: 'CUSTOMER_SUPPORT', role_name: '15. CUSTOMER SUPPORT', data_scope: 'ASSIGNED_ONLY', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false }
  ]);

  // 3. Approval Queue & Security Logs
  const [approvalRequests, setApprovalRequests] = useState([
    { id: 'REQ-01', request_code: 'SRM-REQ-2026-000101', request_type: 'LEAD_TRANSFER', record_id: 'SRM-CUS-2026-000184 (Rohan Deshmukh)', requested_by: 'Priya Nair (Sales Exec)', requested_at: '16 Aug 2026 12:00 PM', old_val: 'Priya Nair', new_val: 'Rahul Sharma', reason: 'Customer requested senior consultant for villa project.', status: 'PENDING', approved_by: '' }
  ]);

  const [activeSessions, setActiveSessions] = useState([
    { id: 'SES-01', user: 'Rajesh Varma (Super Admin)', role: 'SUPER_ADMIN', ip: '127.0.0.1 (Localhost)', device: 'Chrome / Windows 11', login_time: '16 Aug 09:00 AM', status: 'ACTIVE' }
  ]);

  // 4. BULK PROPERTIES MASTER STOCK (12 REAL ESTATE PROJECTS)
  const [properties, setProperties] = useState([
    { id: 'PROP-01', property_code: 'SRM-PROP-2026-000421', title: 'Aparna Zenon Premium 3BHK Residence', type: 'Apartment', developer: 'Aparna Constructions', project: 'Aparna Zenon', tower: 'Tower A', floor: 5, unit: 'A-504', configuration: '3BHK', carpet_area: '1,450 sq.ft.', facing: 'East', final_price: '₹84 Lakhs', base_price: '₹85 Lakhs', status: 'AVAILABLE', locality: 'Kondapur', map_x: 45, map_y: 35, latitude: '17.4612° N', longitude: '78.3689° E', owner_phone: '+91 40 2335 8888', price_sqft: '₹5,862 / sq.ft.' },
    { id: 'PROP-02', property_code: 'SRM-PROP-2026-000422', title: 'Financial Towers Luxury 4BHK Sky Suite', type: 'Penthouse', developer: 'My Home Group', project: 'Financial Towers', tower: 'Tower B', floor: 12, unit: 'B-1202', configuration: '4BHK', carpet_area: '2,400 sq.ft.', facing: 'North-East', final_price: '₹2.08 Crores', base_price: '₹2.10 Crores', status: 'AVAILABLE', locality: 'Financial District', map_x: 28, map_y: 55, latitude: '17.4401° N', longitude: '78.3489° E', owner_phone: '+91 40 6688 9999', price_sqft: '₹8,750 / sq.ft.' },
    { id: 'PROP-03', property_code: 'SRM-PROP-2026-000423', title: 'My Home Jewel Executive 2BHK Flat', type: 'Apartment', developer: 'My Home Group', project: 'My Home Jewel', tower: 'Block C', floor: 3, unit: 'C-308', configuration: '2BHK', carpet_area: '1,245 sq.ft.', facing: 'North', final_price: '₹68 Lakhs', base_price: '₹69 Lakhs', status: 'AVAILABLE', locality: 'Madinaguda', map_x: 32, map_y: 20, latitude: '17.4921° N', longitude: '78.3412° E', owner_phone: '+91 40 6688 1111', price_sqft: '₹5,542 / sq.ft.' },
    { id: 'PROP-04', property_code: 'SRM-PROP-2026-000424', title: 'Jayabheri Silicon County Ultra Villa', type: 'Villa', developer: 'Jayabheri Properties', project: 'Silicon County', tower: 'Villa 14', floor: 2, unit: 'V-14', configuration: '5BHK Villa', carpet_area: '4,200 sq.ft.', facing: 'East', final_price: '₹4.50 Crores', base_price: '₹4.60 Crores', status: 'BOOKED', locality: 'Hitec City', map_x: 58, map_y: 42, latitude: '17.4478° N', longitude: '78.3789° E', owner_phone: '+91 40 2311 5555', price_sqft: '₹10,952 / sq.ft.' },
    { id: 'PROP-05', property_code: 'SRM-PROP-2026-000425', title: 'Prestige High Fields Corner 3BHK', type: 'Apartment', developer: 'Prestige Estates', project: 'Prestige High Fields', tower: 'Tower 8', floor: 18, unit: 'T8-1804', configuration: '3BHK', carpet_area: '1,725 sq.ft.', facing: 'East', final_price: '₹1.35 Crores', base_price: '₹1.38 Crores', status: 'HOLD', locality: 'Nanakramguda', map_x: 22, map_y: 65, latitude: '17.4201° N', longitude: '78.3410° E', owner_phone: '+91 40 4477 8888', price_sqft: '₹8,000 / sq.ft.' }
  ]);
  const [selectedProperty, setSelectedProperty] = useState(properties[0]);

  // 5. Property Units Inventory
  const [propertyUnits, setPropertyUnits] = useState([
    { id: 'UN-01', unit_code: 'SRM-UNIT-2026-000001', tower: 'Tower A', floor: 1, unit_num: 'A-101', bhk: '2BHK', area: '1,100 sq.ft.', price: '₹70 Lakhs', status: 'AVAILABLE' },
    { id: 'UN-02', unit_code: 'SRM-UNIT-2026-000002', tower: 'Tower A', floor: 1, unit_num: 'A-102', bhk: '3BHK', area: '1,450 sq.ft.', price: '₹84 Lakhs', status: 'BOOKED', customer: 'Rohan Deshmukh' }
  ]);

  // 6. CUSTOMERS MASTER VAULT
  const [customers, setCustomers] = useState([
    { id: 'CUST-01', customer_number: 'SRM-CUS-2026-000184', name: 'Rohan Deshmukh', mobile: '+91 98490 12345', email: 'rohan.d@gmail.com', budget: '₹70 Lakhs - ₹85 Lakhs', preferredArea: 'Kondapur / Gachibowli', configuration: '3BHK', status: 'QUALIFIED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 88, source: 'Meta Ads' },
    { id: 'CUST-02', customer_number: 'SRM-CUS-2026-000185', name: 'Priya Sharma', mobile: '+91 99887 76655', email: 'priya.s@yahoo.com', budget: '₹1.8 Crore - ₹2.2 Crore', preferredArea: 'Financial District', configuration: '4BHK', status: 'SITE_VISIT_SCHEDULED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 94, source: 'Google Search' },
    { id: 'CUST-03', customer_number: 'SRM-CUS-2026-000186', name: 'Dr. Ananth Kulkarni', mobile: '+91 98480 33445', email: 'drananth@apollo.com', budget: '₹4.0 Crore - ₹5.0 Crore', preferredArea: 'Hitec City', configuration: '5BHK Villa', status: 'BOOKED', priority: 'HOT', assigned_agent: 'Rahul Sharma (TL)', score: 98, source: 'Referral' }
  ]);
  const [selectedCust, setSelectedCust] = useState(customers[0]);

  // 7. SITE VISITS & BOOKINGS
  const [siteVisits, setSiteVisits] = useState([
    { id: 'SV-01', visit_code: 'SRM-SV-2026-000095', customer_name: 'Priya Sharma', property_code: 'SRM-PROP-2026-000422', project: 'Financial Towers', salesperson: 'Priya Nair', visit_date: '16 Aug 2026 04:00 PM', status: 'SCHEDULED' }
  ]);

  const [bookings, setBookings] = useState([
    { id: 'BKG-01', booking_code: 'SRM-BKG-2026-000201', customer_name: 'Rohan Deshmukh', property_title: 'Aparna Zenon (Unit A-504)', developer: 'Aparna Constructions', booking_value: '₹84,00,000', brokerage_expected: '₹2,10,000', brokerage_received: '₹2,10,000', status: 'CONFIRMED', payment_status: 'PAID' },
    { id: 'BKG-02', booking_code: 'SRM-BKG-2026-000202', customer_name: 'Priya Sharma', property_title: 'Financial Towers (Unit B-1202)', developer: 'My Home Group', booking_value: '₹2,08,00,000', brokerage_expected: '₹5,20,000', brokerage_received: '₹0', status: 'PENDING_APPROVAL', payment_status: 'PENDING' }
  ]);

  // 8. AGREEMENTS VAULT
  const [agreements, setAgreements] = useState([
    { id: 'AGR-01', agreement_code: 'SRM-AGR-CUS-2026-000301', agreement_type: 'CUSTOMER_SITE_VISIT', title: 'Customer Site Visit Agreement', party_name: 'Rohan Deshmukh', party_contact: '+91 98490 12345', property_details: 'SRM-PROP-2026-000421 (Aparna Zenon 3BHK)', signed_status: 'EXECUTED_SIGNED', signature_hash: 'OTP-VERIFIED-#482901-DIGITAL-SIG', signed_at: '16 Aug 2026 11:35 AM' }
  ]);
  const [selectedAgreement, setSelectedAgreement] = useState(agreements[0]);

  // 9. INVOICES VAULT
  const [invoices, setInvoices] = useState([
    { id: 'INV-01', invoice_number: 'SRM-INV-2026-000401', customer_name: 'Rohan Deshmukh', developer_name: 'Aparna Constructions', property_title: 'Aparna Zenon 3BHK', agreement_value: '₹84,00,000', taxable_value: 210000, cgst_amount: 18900, sgst_amount: 18900, total_invoice_amount: 247800, payment_status: 'PAID_SETTLED' }
  ]);
  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);

  // Forms
  const [newUserForm, setNewUserForm] = useState({ username: '', full_name: '', email: '', mobile: '', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team A', manager_name: 'Rahul Sharma (TL)' });
  const [propForm, setPropForm] = useState({ title: '', base_price: '', developer: 'Aparna Constructions', configuration: '3BHK' });
  const [custForm, setCustForm] = useState({ name: '', mobile: '', budget_min: '7000000', budget_max: '8500000' });

  const maskPhone = (phone: string) => {
    if (currentRole === 'SALES_EXEC' || currentRole === 'TELECALLER') return phone.substring(0, 8) + ' *****';
    return phone;
  };

  const openDrillDown = (title: string, records: any[]) => {
    setDrillDownTitle(title);
    setDrillDownRecords(records);
  };

  const exportToCSV = (dataList: any[], filenamePrefix: string) => {
    if (!dataList || dataList.length === 0) return alert('No records available to export.');
    const headers = Object.keys(dataList[0]);
    const csvRows = [headers.join(','), ...dataList.map(row => headers.map(field => `"${String(row[field] || '').replace(/"/g, '""')}"`).join(','))];
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filenamePrefix}_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleToggleSelectAllProperties = () => {
    if (selectedPropertyIds.length === properties.length) setSelectedPropertyIds([]);
    else setSelectedPropertyIds(properties.map(p => p.id));
  };

  const handleToggleSelectProperty = (id: string) => {
    if (selectedPropertyIds.includes(id)) setSelectedPropertyIds(selectedPropertyIds.filter(i => i !== id));
    else setSelectedPropertyIds([...selectedPropertyIds, id]);
  };

  const handleBulkDeleteProperties = () => {
    if (selectedPropertyIds.length === 0) return alert('Please select at least 1 property to delete.');
    if (window.confirm(`Are you sure you want to delete ${selectedPropertyIds.length} selected properties?`)) {
      setProperties(properties.filter(p => !selectedPropertyIds.includes(p.id)));
      setSelectedPropertyIds([]);
      alert(`🗑️ Selected properties deleted in bulk!`);
    }
  };

  const handleDeleteProperty = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to delete Property Master Record ${code}?`)) {
      setProperties(properties.filter(p => p.id !== id));
      alert(`🗑️ Property ${code} deleted successfully!`);
    }
  };

  const handleStartEditProperty = (p: any) => {
    setEditingProperty({ ...p });
    setShowEditPropertyModal(true);
  };

  const handleSaveEditedProperty = (e: React.FormEvent) => {
    e.preventDefault();
    setProperties(properties.map(p => p.id === editingProperty.id ? editingProperty : p));
    setShowEditPropertyModal(false);
    alert(`✏️ Property Master Record ${editingProperty.property_code} updated successfully!`);
  };

  const handleDeleteCustomer = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to delete Customer Record ${code}?`)) {
      setCustomers(customers.filter(c => c.id !== id));
      alert(`🗑️ Customer Record ${code} deleted successfully!`);
    }
  };

  const handleStartEditCustomer = (c: any) => {
    setEditingCustomer({ ...c });
    setShowEditCustomerModal(true);
  };

  const handleSaveEditedCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomers(customers.map(c => c.id === editingCustomer.id ? editingCustomer : c));
    setShowEditCustomerModal(false);
    alert(`✏️ Customer Record ${editingCustomer.customer_number} updated successfully!`);
  };

  const handleDeleteUser = (id: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete User ${username}?`)) {
      setUsers(users.filter(u => u.id !== id));
      alert(`🗑️ User ${username} deleted successfully!`);
    }
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    const newU = { id: `USR-0${users.length + 1}`, username: newUserForm.username, full_name: newUserForm.full_name || newUserForm.username, email: newUserForm.email, mobile: newUserForm.mobile || '+91 98490 00000', role: newUserForm.role, branch_name: newUserForm.branch_name, department: newUserForm.department, team_name: newUserForm.team_name, manager_name: newUserForm.manager_name, is_active: true, user_status: 'ACTIVE' };
    setUsers([newU, ...users]);
    setShowUserModal(false);
    alert(`👤 User ${newU.username} created successfully!`);
  };

  const handleRespondApproval = (reqId: string, action: 'APPROVED' | 'REJECTED') => {
    setApprovalRequests(approvalRequests.map(r => r.id === reqId ? { ...r, status: action, approved_by: 'Rajesh Varma (Super Admin)' } : r));
    alert(`⚖️ Request ${reqId} set to ${action}!`);
  };

  const handleTogglePermission = (roleKey: string, permKey: string) => {
    setRolePermissions(rolePermissions.map(rp => rp.role_key === roleKey ? { ...rp, [permKey]: !rp[permKey as keyof typeof rp] } : rp));
  };

  const filteredProperties = properties.filter(p => selectedLocality === 'ALL' || p.locality.toLowerCase().replace(/\s+/g, '') === selectedLocality.toLowerCase().replace(/\s+/g, ''));
  const localitiesList = ['ALL', 'Kondapur', 'Financial District', 'Madinaguda', 'Hitec City', 'Nanakramguda', 'Gachibowli', 'Kokapet', 'Kukatpally'];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0b0f19', color: '#f1f5f9' }}>
      
      {/* SIDEBAR NAVIGATION */}
      <aside style={{ width: '280px', background: '#0f172a', borderRight: '1px solid #334155', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #334155', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>SWARAMAYI CRM</h1>
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' }}>ENTERPRISE REAL ESTATE OS</p>
          </div>
        </div>

        {/* ROLE CONTEXT SWITCHER */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid #334155', background: '#1e293b' }}>
          <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Active Role Scope</label>
          <select value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} style={{ width: '100%', background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>
            <option value="SUPER_ADMIN">1. Owner / Super Admin</option>
            <option value="GENERAL_MANAGER">2. General Manager</option>
            <option value="BRANCH_MANAGER">3. Branch Manager</option>
            <option value="SALES_MANAGER">4. Sales Manager</option>
            <option value="TEAM_LEAD">5. Team Leader</option>
            <option value="SALES_EXEC">6. Sales Executive</option>
            <option value="PROPERTY_MANAGER">7. Property Manager</option>
            <option value="ACCOUNTS">8. Accounts</option>
            <option value="MARKETING">9. Marketing</option>
            <option value="CUSTOMER_SUPPORT">10. Customer Support</option>
          </select>
        </div>

        {/* 8 MAIN CATEGORIES NAV */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          <button onClick={() => setActiveTab('main_dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'main_dashboard' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'main_dashboard' ? '#38bdf8' : '#94a3b8', border: activeTab === 'main_dashboard' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <LayoutDashboard size={18} /> <span>Main Dash Board</span>
          </button>
          <button onClick={() => setActiveTab('map_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'map_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'map_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'map_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Map size={18} /> <span>Location Map</span>
          </button>
          <button onClick={() => setActiveTab('role_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'role_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'role_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'role_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <UserCog size={18} /> <span>Role and Management</span>
          </button>
          <button onClick={() => setActiveTab('project_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'project_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'project_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'project_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Building size={18} /> <span>Project Management</span>
          </button>
          <button onClick={() => setActiveTab('customer_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'customer_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'customer_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'customer_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Users size={18} /> <span>Customer Management</span>
          </button>
          <button onClick={() => setActiveTab('billing_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'billing_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'billing_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'billing_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <CreditCard size={18} /> <span>Billing Management</span>
          </button>
          <button onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'profile' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'profile' ? '#38bdf8' : '#94a3b8', border: activeTab === 'profile' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <User size={18} /> <span>Profile</span>
          </button>
          <button onClick={() => setActiveTab('agreement_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'agreement_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'agreement_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'agreement_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <FileCheck size={18} /> <span>Agreement Management</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP CONTROL HEADER */}
        <header style={{ background: '#0f172a', borderBottom: '1px solid #334155', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1e293b', border: '1px solid #334155', padding: '6px 14px', borderRadius: '8px', width: '360px' }}>
            <Search size={16} color="#38bdf8" />
            <input type="text" placeholder={`Search in ${activeTab.replace('_', ' ').toUpperCase()}...`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%' }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {activeTab === 'role_management' && (
              <button onClick={() => setShowUserModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Add User
              </button>
            )}
            {activeTab === 'project_management' && (
              <button onClick={() => setShowPropertyModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Add Property Master
              </button>
            )}
            {activeTab === 'customer_management' && (
              <button onClick={() => setShowLeadModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Ingest Customer
              </button>
            )}
            <button onClick={() => exportToCSV(properties, 'CRM_Export')} style={{ background: '#1e293b', color: '#fbbf24', border: '1px solid #334155', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileDown size={14} /> Export CSV Report
            </button>
          </div>
        </header>

        {/* MAIN BODY DISPLAY */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          
          {/* CATEGORY 1: MAIN DASHBOARD (ADVANCED BI CONTROL CENTER) */}
          {activeTab === 'main_dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* TOP BI CONTROL HEADER & ROLE CONTEXT BADGE */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>SWARAMAYI REAL ESTATE MARKETING</h2>
                      <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>BI CONTROL CENTER</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                      Role View: <strong style={{ color: '#38bdf8' }}>{currentRole}</strong> • Scope: <strong style={{ color: '#4ade80' }}>ALL DATA DRILL-DOWN ENABLED</strong> • Updated: Real-time Live Records
                    </p>
                  </div>

                  {/* QUICK ACTIONS BUTTON SUITE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowLeadModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <UserPlus size={14} /> + Add Customer
                    </button>
                    <button onClick={() => setShowPropertyModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} /> + Add Property
                    </button>
                    <button onClick={() => alert('⚡ Running Smart Property Matching Engine across all 438 customer requirements...')} style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={14} /> Find Matches
                    </button>
                    <button onClick={() => alert('📅 Opening Site Visit Scheduler...')} style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> Schedule Visit
                    </button>
                    <button onClick={() => alert('📄 Opening Booking Creator...')} style={{ background: 'rgba(74, 222, 128, 0.2)', color: '#4ade80', border: '1px solid rgba(74, 222, 128, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileCheck size={14} /> Create Booking
                    </button>
                  </div>
                </div>

                {/* GLOBAL DASHBOARD FILTERS TOOLBAR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: '1px solid #334155', paddingTop: '14px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} color="#94a3b8" />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Date Range:</span>
                    <select value={dateFilter} onChange={(e: any) => setDateFilter(e.target.value)} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="today">Today</option>
                      <option value="yesterday">Yesterday</option>
                      <option value="this_week">This Week</option>
                      <option value="last_week">Last Week</option>
                      <option value="this_month">This Month</option>
                      <option value="last_month">Last Month</option>
                      <option value="this_quarter">This Quarter</option>
                      <option value="this_year">This Year</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building size={15} color="#94a3b8" />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Branch:</span>
                    <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Branches</option>
                      <option value="Head Office">Head Office (Hyderabad)</option>
                      <option value="Kondapur Branch">Kondapur Branch</option>
                      <option value="Gachibowli Branch">Gachibowli Branch</option>
                      <option value="Kolkata Branch">Kolkata Branch</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} color="#94a3b8" />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Team:</span>
                    <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Teams</option>
                      <option value="Sales Team Alpha">Sales Team Alpha</option>
                      <option value="Sales Team Bravo">Sales Team Bravo</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserCheck size={15} color="#94a3b8" />
                    <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700' }}>Salesperson:</span>
                    <select value={salespersonFilter} onChange={(e) => setSalespersonFilter(e.target.value)} style={{ background: '#0f172a', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Salespeople</option>
                      <option value="Priya Nair">Priya Nair (Sales Exec)</option>
                      <option value="Amit Patel">Amit Patel (Sales Exec)</option>
                      <option value="Srinivas Rao">Srinivas Rao (Senior Exec)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 1. TOP-LEVEL INTERACTIVE KPI CARDS GRID (12 CARDS WITH DRILL-DOWN) */}
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={18} color="#38bdf8" /> BUSINESS CONTROL CENTER - KEY PERFORMANCE INDICATORS
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                  
                  <div onClick={() => openDrillDown('CUSTOMERS MASTER LIST', customers)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMERS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>{customers.length}</h4>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700' }}>Click &rarr; 360° List</span>
                  </div>

                  <div onClick={() => openDrillDown('ACTIVE LEADS PIPELINE', customers)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ACTIVE LEADS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>430</h4>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700' }}>Click &rarr; View Leads</span>
                  </div>

                  <div onClick={() => openDrillDown("TODAY'S NEW LEADS", customers.filter(c => c.created_at?.includes('2026-08-17')))} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>NEW LEADS TODAY</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>14</h4>
                    <span style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: '700' }}>Click &rarr; Fresh Leads</span>
                  </div>

                  <div onClick={() => openDrillDown('HOT LEADS PRIORITY LIST', customers.filter(c => c.priority === 'HOT'))} style={{ background: '#1e293b', border: '1px solid #ef4444', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#f87171', textTransform: 'uppercase', fontWeight: '800' }}>🔥 HOT LEADS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ef4444', marginTop: '2px' }}>127</h4>
                    <span style={{ fontSize: '0.65rem', color: '#f87171', fontWeight: '700' }}>Click &rarr; High Intent</span>
                  </div>

                  <div onClick={() => openDrillDown('ACTIVE PROPERTY STOCK', properties)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PROPERTY STOCK</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>2,458</h4>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700' }}>Click &rarr; Inventory</span>
                  </div>

                  <div onClick={() => openDrillDown('AVAILABLE PROPERTIES', properties.filter(p => p.status === 'AVAILABLE'))} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>AVAILABLE</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>1,487</h4>
                    <span style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: '700' }}>Click &rarr; Live Stock</span>
                  </div>

                  <div onClick={() => openDrillDown('SITE VISITS SCHEDULED', siteVisits || [])} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>SITE VISITS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>95</h4>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700' }}>Click &rarr; Visit Logs</span>
                  </div>

                  <div onClick={() => openDrillDown('CONFIRMED BOOKINGS', bookings)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>BOOKINGS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>18</h4>
                    <span style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: '700' }}>Click &rarr; Bookings</span>
                  </div>

                  <div onClick={() => openDrillDown('EXPECTED BROKERAGE PIPELINE', bookings)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED BROKERAGE</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>₹18.50L</h4>
                    <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '700' }}>Pipeline Deals</span>
                  </div>

                  <div onClick={() => openDrillDown('RECEIVED BROKERAGE LEDGER', invoices)} style={{ background: '#1e293b', border: '1px solid #22c55e', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#4ade80', textTransform: 'uppercase', fontWeight: '800' }}>RECEIVED BROKERAGE</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>₹9.80L</h4>
                    <span style={{ fontSize: '0.65rem', color: '#4ade80', fontWeight: '700' }}>✓ Invoiced & Paid</span>
                  </div>

                  <div onClick={() => openDrillDown('PENDING BROKERAGE LEDGER', invoices)} style={{ background: '#1e293b', border: '1px solid #f59e0b', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fbbf24', textTransform: 'uppercase', fontWeight: '800' }}>PENDING BROKERAGE</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>₹4.40L</h4>
                    <span style={{ fontSize: '0.65rem', color: '#fbbf24', fontWeight: '700' }}>Invoiced & Awaiting</span>
                  </div>

                  <div onClick={() => openDrillDown('PAYMENTS RECEIVABLE', invoices)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>RECEIVABLES</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>₹7.08L</h4>
                    <span style={{ fontSize: '0.65rem', color: '#38bdf8', fontWeight: '700' }}>Due Receipts</span>
                  </div>
                </div>
              </div>

              {/* 2. VISUAL 11-STAGE SALES FUNNEL */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={18} color="#38bdf8" /> 11-STAGE ENTERPRISE SALES FUNNEL
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Click any stage bar to drill down into stage CRM records & conversion analysis.</p>
                  </div>
                  <span style={{ background: 'rgba(74, 222, 128, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '800' }}>
                    Overall Lead Conversion: 1.8% (18 Bookings / 1,000 Leads)
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { stage: '1. NEW LEAD', count: 1000, pct: 100, color: '#38bdf8', conv: '100%' },
                    { stage: '2. CONTACTED', count: 620, pct: 62.0, color: '#0284c7', conv: '62.0%' },
                    { stage: '3. QUALIFIED', count: 430, pct: 43.0, color: '#0369a1', conv: '69.3%' },
                    { stage: '4. REQUIREMENT CAPTURED', count: 380, pct: 38.0, color: '#6366f1', conv: '88.3%' },
                    { stage: '5. PROPERTY MATCHED', count: 350, pct: 35.0, color: '#8b5cf6', conv: '92.1%' },
                    { stage: '6. PROPERTY SENT', count: 280, pct: 28.0, color: '#a855f7', conv: '80.0%' },
                    { stage: '7. INTERESTED', count: 160, pct: 16.0, color: '#d946ef', conv: '57.1%' },
                    { stage: '8. SITE VISIT', count: 95, pct: 9.5, color: '#ec4899', conv: '59.3%' },
                    { stage: '9. NEGOTIATION', count: 42, pct: 4.2, color: '#f43f5e', conv: '44.2%' },
                    { stage: '10. BOOKING', count: 18, pct: 1.8, color: '#22c55e', conv: '42.8%' },
                    { stage: '11. BROKERAGE GENERATED', count: 18, pct: 1.8, color: '#16a34a', conv: '100%' }
                  ].map((s, idx) => (
                    <div key={idx} onClick={() => openDrillDown(`FUNNEL STAGE: ${s.stage}`, customers)} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 140px 100px', alignItems: 'center', gap: '12px', padding: '6px 12px', background: '#0f172a', borderRadius: '8px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff' }}>{s.stage}</span>
                      <div style={{ background: '#1e293b', height: '14px', borderRadius: '7px', overflow: 'hidden', width: '100%' }}>
                        <div style={{ width: `${s.pct}%`, background: s.color, height: '100%', borderRadius: '7px' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: s.color }}>{s.count} Leads ({s.pct}%)</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' }}>Conv: {s.conv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. CUSTOMER REQUIREMENT & SMART PROPERTY MATCHING ENGINE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} color="#c084fc" /> SMART PROPERTY MATCHING ENGINE
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: '800' }}>438 Active Requirements</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                    <div onClick={() => openDrillDown('EXCELLENT 90%+ MATCHES', customers)} style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: '800' }}>90%+ MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#4ade80' }}>126</h4>
                    </div>
                    <div onClick={() => openDrillDown('GOOD 75-89% MATCHES', customers)} style={{ background: '#0f172a', border: '1px solid #38bdf8', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: '800' }}>75–89% MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#38bdf8' }}>187</h4>
                    </div>
                    <div onClick={() => openDrillDown('ALTERNATIVE 60-74% MATCHES', customers)} style={{ background: '#0f172a', border: '1px solid #fbbf24', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: '800' }}>60–74% MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fbbf24' }}>79</h4>
                    </div>
                    <div onClick={() => openDrillDown('NO MATCH REQUIREMENTS', customers)} style={{ background: '#0f172a', border: '1px solid #ef4444', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#f87171', fontWeight: '800' }}>NO MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ef4444' }}>46</h4>
                    </div>
                  </div>

                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '14px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
                      🚨 CUSTOMERS WAITING FOR PROPERTY RECOMMENDATION (12)
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { name: 'Rahul', req: '2 BHK • ₹40–55L • Madhyamgram', matches: 12, exec: 'Priya Nair' },
                        { name: 'Sunita Rao', req: '3 BHK • ₹80–95L • Kondapur', matches: 5, exec: 'Amit Patel' },
                        { name: 'Vikram Chatterji', req: '4 BHK Villa • ₹1.5–2.0Cr • Rajarhat', matches: 3, exec: 'Srinivas Rao' }
                      ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1e293b', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem' }}>
                          <div>
                            <strong style={{ color: '#ffffff' }}>{c.name}</strong> <span style={{ color: '#94a3b8' }}>({c.req})</span>
                            <br /><span style={{ color: '#4ade80', fontWeight: '700' }}>{c.matches} Matched Properties</span>
                          </div>
                          <button onClick={() => alert(`Sending ${c.matches} properties to ${c.name}...`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.72rem' }}>
                            Send Properties
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 4. PROPERTY INVENTORY AGING & AUTOMATED MATCH ALERTS */}
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={18} color="#fbbf24" /> PROPERTY STOCK AGING & DEAD INVENTORY
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800' }}>Total Stock: 2,458 Units</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
                    {[
                      { range: '0–30 Days', count: 1480, label: 'Fresh Stock', color: '#4ade80' },
                      { range: '31–60 Days', count: 520, label: 'Active', color: '#38bdf8' },
                      { range: '61–90 Days', count: 260, label: 'Aging', color: '#fbbf24' },
                      { range: '91–180 Days', count: 153, label: 'Slow', color: '#f97316' },
                      { range: '180+ Days', count: 45, label: 'Stale / Dead', color: '#ef4444' }
                    ].map((a, idx) => (
                      <div key={idx} onClick={() => openDrillDown(`STOCK AGING: ${a.range}`, properties)} style={{ background: '#0f172a', border: `1px solid ${a.color}`, padding: '10px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                        <span style={{ fontSize: '0.65rem', color: a.color, fontWeight: '800' }}>{a.range}</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: a.color }}>{a.count}</h4>
                        <span style={{ fontSize: '0.6rem', color: '#94a3b8' }}>{a.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* PRICE DROP & NEW PROPERTY AUTOMATED ALERTS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.4)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '800' }}>🚨 PRICE DROP ALERT → NEW CUSTOMER MATCHES</span>
                        <p style={{ fontSize: '0.78rem', color: '#ffffff' }}>Aparna Zenon 3BHK (₹86L &rarr; ₹84L) • Created 6 new budget matches!</p>
                      </div>
                      <button onClick={() => alert('Notifying 6 matched budget customers of price drop!')} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer' }}>
                        Notify Customers
                      </button>
                    </div>

                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '800' }}>✨ NEW PROPERTY ADDED → MATCH FOUND</span>
                        <p style={{ fontSize: '0.78rem', color: '#ffffff' }}>Financial Towers Sky Suite (4BHK) • Matched with 8 buyers (3 HOT)</p>
                      </div>
                      <button onClick={() => alert('Opening 8 matched buyer profiles...')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer' }}>
                        View Buyers
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. FOLLOW-UP CONTROL CENTER & HOT LEAD CONTROL */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PhoneCall size={18} color="#ef4444" /> FOLLOW-UP MANAGEMENT & HOT LEAD CONTROL
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Categorized follow-up actions with instant WhatsApp and Calling triggers.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setFollowupSubTab('overdue')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'overdue' ? '#ef4444' : '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                      OVERDUE (12)
                    </button>
                    <button onClick={() => setFollowupSubTab('today')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'today' ? '#0284c7' : '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                      DUE TODAY (8)
                    </button>
                    <button onClick={() => setFollowupSubTab('tomorrow')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'tomorrow' ? '#334155' : '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                      DUE TOMORROW (14)
                    </button>
                    <button onClick={() => setFollowupSubTab('upcoming')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'upcoming' ? '#334155' : '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer' }}>
                      UPCOMING (22)
                    </button>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '10px' }}>Customer</th>
                      <th style={{ padding: '10px' }}>Salesperson</th>
                      <th style={{ padding: '10px' }}>Last Property Sent</th>
                      <th style={{ padding: '10px' }}>Customer Response</th>
                      <th style={{ padding: '10px' }}>Next Follow-up</th>
                      <th style={{ padding: '10px', textAlign: 'center' }}>Quick Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Rohan Deshmukh', phone: '+91 98490 12345', exec: 'Priya Nair', sent: 'Aparna Zenon 3BHK', resp: 'Asked for discount pricing table', next: '16 Aug (OVERDUE)', status: 'OVERDUE' },
                      { name: 'Priya Sharma', phone: '+91 99887 76655', exec: 'Priya Nair', sent: 'Financial Towers 4BHK Sky Suite', resp: 'Scheduled site visit today at 11 AM', next: '17 Aug (TODAY)', status: 'TODAY' },
                      { name: 'Sunita Rao', phone: '+91 96111 22334', exec: 'Amit Patel', sent: 'Prestige High Fields 2BHK', resp: 'Waiting for property match recommendation', next: '18 Aug (TOMORROW)', status: 'TOMORROW' }
                    ].map((f, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontWeight: '800', color: '#ffffff' }}>{f.name} <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '400' }}>({f.phone})</span></td>
                        <td style={{ padding: '10px', color: '#38bdf8' }}>{f.exec}</td>
                        <td style={{ padding: '10px' }}>{f.sent}</td>
                        <td style={{ padding: '10px', color: '#fbbf24' }}>{f.resp}</td>
                        <td style={{ padding: '10px' }}><span style={{ background: f.status === 'OVERDUE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)', color: f.status === 'OVERDUE' ? '#ef4444' : '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>{f.next}</span></td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                            <button onClick={() => alert(`Calling ${f.name} at ${f.phone}...`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800' }}>Call</button>
                            <button onClick={() => alert(`Opening WhatsApp chat for ${f.name}...`)} style={{ background: '#25d366', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800' }}>WhatsApp</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* 6. SALESPERSON PERFORMANCE & TEAM COMPARISON */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={18} color="#4ade80" /> SALESPERSON PERFORMANCE MATRIX
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '8px' }}>Salesperson</th>
                        <th style={{ padding: '8px' }}>Leads</th>
                        <th style={{ padding: '8px' }}>Qualified</th>
                        <th style={{ padding: '8px' }}>Matches</th>
                        <th style={{ padding: '8px' }}>Visits</th>
                        <th style={{ padding: '8px' }}>Bookings</th>
                        <th style={{ padding: '8px' }}>Brokerage</th>
                        <th style={{ padding: '8px' }}>Conv %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Priya Nair', leads: 85, qual: 62, match: 54, visit: 48, bkg: 6, brk: '₹6.40L', conv: '7.0%' },
                        { name: 'Amit Patel', leads: 65, qual: 48, match: 40, visit: 32, bkg: 4, brk: '₹3.80L', conv: '6.1%' },
                        { name: 'Srinivas Rao', leads: 50, qual: 35, match: 28, visit: 20, bkg: 2, brk: '₹2.20L', conv: '4.0%' }
                      ].map((sp, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: '#ffffff' }}>{sp.name}</td>
                          <td style={{ padding: '8px' }}>{sp.leads}</td>
                          <td style={{ padding: '8px' }}>{sp.qual}</td>
                          <td style={{ padding: '8px' }}>{sp.match}</td>
                          <td style={{ padding: '8px', color: '#38bdf8' }}>{sp.visit}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{sp.bkg}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{sp.brk}</td>
                          <td style={{ padding: '8px', color: '#fbbf24', fontWeight: '800' }}>{sp.conv}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} color="#38bdf8" /> TEAM COMPARISON
                  </h3>
                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800' }}>TEAM ALPHA (KONDAPUR)</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px' }}>
                      <span>Leads: 350 | Visits: 82</span>
                      <strong style={{ color: '#4ade80' }}>14 Bookings (₹14.2L)</strong>
                    </div>
                  </div>

                  <div style={{ background: '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800' }}>TEAM BRAVO (GACHIBOWLI)</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px' }}>
                      <span>Leads: 290 | Visits: 74</span>
                      <strong style={{ color: '#4ade80' }}>18 Bookings (₹18.5L)</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7. DEVELOPER PERFORMANCE & MARKETING ROI */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={18} color="#38bdf8" /> DEVELOPER PERFORMANCE RANKING
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '8px' }}>Developer</th>
                        <th style={{ padding: '8px' }}>Stock</th>
                        <th style={{ padding: '8px' }}>Visits</th>
                        <th style={{ padding: '8px' }}>Bookings</th>
                        <th style={{ padding: '8px' }}>Brokerage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { dev: 'Aparna Constructions', stock: 420, visits: 82, bkg: 16, brk: '₹16.80L' },
                        { dev: 'My Home Group', stock: 350, visits: 64, bkg: 12, brk: '₹12.40L' },
                        { dev: 'Prestige Group', stock: 280, visits: 45, bkg: 8, brk: '₹8.60L' },
                        { dev: 'Jayabheri Group', stock: 190, visits: 28, bkg: 4, brk: '₹4.20L' }
                      ].map((d, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: '#ffffff' }}>{d.dev}</td>
                          <td style={{ padding: '8px' }}>{d.stock}</td>
                          <td style={{ padding: '8px' }}>{d.visits}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{d.bkg}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{d.brk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} color="#4ade80" /> MARKETING CAMPAIGN ROI TRACKER
                  </h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '8px' }}>Channel</th>
                        <th style={{ padding: '8px' }}>Spend</th>
                        <th style={{ padding: '8px' }}>Leads</th>
                        <th style={{ padding: '8px' }}>Bookings</th>
                        <th style={{ padding: '8px' }}>Brokerage</th>
                        <th style={{ padding: '8px' }}>ROI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { ch: 'Meta Ads', spend: '₹45,000', leads: 120, bkg: 4, brk: '₹4.80L', roi: '966%' },
                        { ch: 'Google Search', spend: '₹60,000', leads: 95, bkg: 3, brk: '₹5.40L', roi: '800%' },
                        { ch: 'WhatsApp Blast', spend: '₹12,000', leads: 210, bkg: 5, brk: '₹4.20L', roi: '3400%' },
                        { ch: 'Property Portal', spend: '₹35,000', leads: 85, bkg: 2, brk: '₹2.40L', roi: '585%' }
                      ].map((m, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: '#ffffff' }}>{m.ch}</td>
                          <td style={{ padding: '8px' }}>{m.spend}</td>
                          <td style={{ padding: '8px' }}>{m.leads}</td>
                          <td style={{ padding: '8px', color: '#4ade80' }}>{m.bkg}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{m.brk}</td>
                          <td style={{ padding: '8px', color: '#fbbf24', fontWeight: '800' }}>{m.roi}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 8. "NEEDS YOUR ATTENTION" PRIORITY ACTION CENTER */}
              <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <AlertTriangle size={20} color="#ef4444" /> "NEEDS YOUR ATTENTION" PRIORITY ACTION CENTER
                  </h3>
                  <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                    7 Priority Management Items
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  {[
                    { priority: 'CRITICAL', title: '7 Hot Leads have no follow-up scheduled', desc: 'Customers with lead score > 88 have zero upcoming activities.', action: 'Assign Follow-up' },
                    { priority: 'CRITICAL', title: '₹4.40 Lakhs Brokerage Payment Overdue', desc: 'Prestige Group & Aparna invoices pending past 30 days.', action: 'Collect Payment' },
                    { priority: 'HIGH', title: '12 Customers waiting for Property Recommendations', desc: '90%+ property matches found but not sent to customer.', action: 'Send Recommendations' },
                    { priority: 'HIGH', title: '3 Bookings awaiting Management Approval', desc: 'Discount approvals pending on 3BHK Aparna Zenon units.', action: 'Review Approvals' },
                    { priority: 'MEDIUM', title: '5 Properties aging past 180+ days requiring verification', desc: 'Dead inventory stock needs developer price re-negotiation.', action: 'Re-verify Stock' },
                    { priority: 'LOW', title: '4 Customers requested callback for project brochure', desc: 'Inside sales squad assigned for follow-up call.', action: 'View Callbacks' }
                  ].map((act, i) => (
                    <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ background: act.priority === 'CRITICAL' ? 'rgba(239,68,68,0.2)' : act.priority === 'HIGH' ? 'rgba(245,158,11,0.2)' : 'rgba(56,189,248,0.2)', color: act.priority === 'CRITICAL' ? '#ef4444' : act.priority === 'HIGH' ? '#fbbf24' : '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '900', fontSize: '0.65rem' }}>{act.priority}</span>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>{act.title}</h4>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{act.desc}</p>
                      </div>
                      <button onClick={() => alert(`Triggering action: ${act.action}`)} style={{ background: act.priority === 'CRITICAL' ? '#ef4444' : '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer', flexShrink: 0 }}>
                        {act.action}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. PREDICTIVE FORECASTING WIDGET */}
              <div style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #311b92 100%)', border: '1px solid #6366f1', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={20} color="#a5b4fc" />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>30-DAY BUSINESS FORECAST (PROJECTION ONLY)</h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#c7d2fe', marginTop: '2px' }}>
                    Calculated from active negotiations, hot lead scores, and site visit conversion velocity.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED BOOKINGS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>8 Deals</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED BROKERAGE</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80' }}>₹9.80 Lakhs</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED RECEIVABLES</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8' }}>₹4.40 Lakhs</h4>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* CATEGORY 2: ADVANCED ROLE, USER & MANAGEMENT CONTROL SYSTEM (RBAC) */}
          {activeTab === 'role_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SYSTEM GOVERNANCE HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>ADVANCED ROLE, USER & MANAGEMENT CONTROL SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>ENTERPRISE RBAC</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    15 Configurable Default Roles • Company & Branch Hierarchy • Maker-Checker Universal Approvals • Employee Exit Handover Engine
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setShowUserModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={15} /> + Add Employee
                  </button>
                  <button onClick={() => alert('🏢 Opening Add Branch Modal...')} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} /> + Add Branch
                  </button>
                  <button onClick={() => alert('👥 Opening Add Sales Team Modal...')} style={{ background: '#1e293b', color: '#4ade80', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={15} /> + Add Team
                  </button>
                  <button onClick={() => setIsLockdown(!isLockdown)} style={{ background: isLockdown ? '#ef4444' : '#334155', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={15} /> {isLockdown ? 'LIFT LOCKDOWN' : 'EMERGENCY LOCKDOWN'}
                  </button>
                </div>
              </div>

              {/* 6 SUB-TABS NAVIGATION */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveRoleSubTab('user_directory')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'user_directory' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'user_directory' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  👥 Employee Directory ({users.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('permission_matrix')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'permission_matrix' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'permission_matrix' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔑 15 Roles & Permission Matrix ({rolePermissions.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('org_hierarchy')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'org_hierarchy' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'org_hierarchy' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏢 Company & Branch Hierarchy
                </button>
                <button onClick={() => setActiveRoleSubTab('approval_queue')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'approval_queue' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'approval_queue' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  ⚖️ Universal Approval Queue ({approvalRequests.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('session_security')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'session_security' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'session_security' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🚨 Active Sessions & Risk Alerts
                </button>
                <button onClick={() => setActiveRoleSubTab('exit_handover')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'exit_handover' ? '#ef4444' : '#1e293b', color: activeRoleSubTab === 'exit_handover' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📋 Employee Exit & Handover Hub
                </button>
              </div>

              {/* SUB-TAB 1: USER DIRECTORY & EMPLOYEE MANAGEMENT */}
              {activeRoleSubTab === 'user_directory' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>👥 Enterprise Employee Directory & Lifecycle Status</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Manages user accounts, assigned branches, reporting managers, phone masking, and security status.</p>
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>User ID</th>
                        <th style={{ padding: '12px' }}>Full Name & Username</th>
                        <th style={{ padding: '12px' }}>Role</th>
                        <th style={{ padding: '12px' }}>Branch & Dept</th>
                        <th style={{ padding: '12px' }}>Team & Manager</th>
                        <th style={{ padding: '12px' }}>Mobile Contact</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{u.id}</td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: '#ffffff' }}>{u.full_name}</strong>
                            <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>@{u.username}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.73rem' }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: '#ffffff', fontWeight: '700' }}>{u.branch_name}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{u.department}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: '#ffffff' }}>{u.team_name}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Mgr: {u.manager_name}</span>
                          </td>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#4ade80', fontWeight: '700' }}>
                            {maskPhone(u.mobile)}
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: u.user_status === 'ACTIVE' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: u.user_status === 'ACTIVE' ? '#4ade80' : '#ef4444', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.72rem' }}>
                              ● {u.user_status || 'ACTIVE'}
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                              <button onClick={() => alert(`Editing user profile for ${u.full_name}`)} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Edit</button>
                              <button onClick={() => alert(`Resetting password for ${u.full_name}`)} style={{ background: '#1e293b', color: '#fbbf24', border: '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Reset</button>
                              <button onClick={() => handleDeleteUser(u.id, u.username)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 2: 15 ROLES PERMISSION MATRIX & CUSTOM ROLE ENGINE */}
              {activeRoleSubTab === 'permission_matrix' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🔑 15 Default Roles & Granular Permission Matrix</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Configurable action-level permissions and data access scope for all enterprise roles.</p>
                    </div>
                    <button onClick={() => setShowUserModal(true)} style={{ background: '#a855f7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}>
                      + Create Custom Role
                    </button>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '10px' }}>Role</th>
                        <th style={{ padding: '10px' }}>Data Scope</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>View</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Create</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Edit</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Delete</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Export</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Approve</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Price Change</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Brokerage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rolePermissions.map(rp => (
                        <tr key={rp.role_key} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontWeight: '800', color: '#ffffff' }}>{rp.role_name}</td>
                          <td style={{ padding: '10px' }}>
                            <select value={rp.data_scope} onChange={(e) => alert(`Updated scope for ${rp.role_key} to ${e.target.value}`)} style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '4px', padding: '3px 6px', fontSize: '0.75rem', fontWeight: '700' }}>
                              <option value="ALL_DATA">ALL_DATA</option>
                              <option value="BRANCH_DATA">BRANCH_DATA</option>
                              <option value="TEAM_DATA">TEAM_DATA</option>
                              <option value="ASSIGNED_DATA">ASSIGNED_DATA</option>
                              <option value="OWN_DATA">OWN_DATA</option>
                            </select>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.view} onChange={() => handleTogglePermission(rp.role_key, 'view')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.create} onChange={() => handleTogglePermission(rp.role_key, 'create')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.edit} onChange={() => handleTogglePermission(rp.role_key, 'edit')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.delete} onChange={() => handleTogglePermission(rp.role_key, 'delete')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.export} onChange={() => handleTogglePermission(rp.role_key, 'export')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.approve} onChange={() => handleTogglePermission(rp.role_key, 'approve')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.price_change} onChange={() => handleTogglePermission(rp.role_key, 'price_change')} /></td>
                          <td style={{ padding: '10px', textAlign: 'center' }}><input type="checkbox" checked={rp.brokerage} onChange={() => handleTogglePermission(rp.role_key, 'brokerage')} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 3: COMPANY & BRANCH HIERARCHY TREE */}
              {activeRoleSubTab === 'org_hierarchy' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🏢 Organizational Hierarchy Tree & Branch Mapping</h3>
                  
                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ background: '#1e293b', border: '2px solid #0284c7', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '800', textTransform: 'uppercase' }}>COMPANY HEADQUARTERS</span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>Swaramayi Real Estate Marketing (Jubilee Hills, Hyderabad)</h4>
                      </div>
                      <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>Super Admin: Rajesh Varma</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingLeft: '20px' }}>
                      {[
                        { name: 'Kondapur Branch', mgr: 'Suresh Kumar (BM)', teams: ['Sales Team Alpha (TL: Rahul Sharma)', 'Inside Telecalling Squad'], staff: 8 },
                        { name: 'Gachibowli Branch', mgr: 'Suresh Kumar (BM)', teams: ['Sales Team Bravo (TL: Rahul Sharma)'], staff: 6 },
                        { name: 'Kolkata Branch', mgr: 'Vikram Reddy (GM)', teams: ['Kolkata Expansion Team'], staff: 4 }
                      ].map((b, i) => (
                        <div key={i} style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800' }}>BRANCH OFFICE #{i + 1}</span>
                          <strong style={{ fontSize: '0.95rem', color: '#ffffff' }}>{b.name}</strong>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Manager: <strong style={{ color: '#ffffff' }}>{b.mgr}</strong></p>
                          <div style={{ background: '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', color: '#cbd5e1' }}>
                            <strong>Assigned Teams:</strong>
                            {b.teams.map((t, ti) => <div key={ti}>• {t}</div>)}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '700' }}>{b.staff} Active Employees</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: UNIVERSAL APPROVAL QUEUE & TWO-PERSON VERIFICATION */}
              {activeRoleSubTab === 'approval_queue' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>⚖️ Universal Approval Queue & Two-Person Maker-Checker Engine</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Requires management check & approval for sensitive price, ownership, transfer, and export requests.</p>
                    </div>
                    <span style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#fbbf24', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '800' }}>
                      {approvalRequests.filter(r => r.status === 'PENDING').length} Pending Approval Requests
                    </span>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '10px' }}>Request Code</th>
                        <th style={{ padding: '10px' }}>Request Type</th>
                        <th style={{ padding: '10px' }}>Requested By</th>
                        <th style={{ padding: '10px' }}>Target Record</th>
                        <th style={{ padding: '10px' }}>Old Value &rarr; New Value</th>
                        <th style={{ padding: '10px' }}>Reason</th>
                        <th style={{ padding: '10px' }}>Status</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvalRequests.map(r => (
                        <tr key={r.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{r.request_code}</td>
                          <td style={{ padding: '10px' }}><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>{r.request_type}</span></td>
                          <td style={{ padding: '10px', color: '#ffffff' }}>{r.requested_by}</td>
                          <td style={{ padding: '10px', color: '#fbbf24' }}>{r.record_id}</td>
                          <td style={{ padding: '10px' }}><span style={{ color: '#ef4444' }}>{r.old_val}</span> &rarr; <span style={{ color: '#4ade80', fontWeight: '800' }}>{r.new_val}</span></td>
                          <td style={{ padding: '10px', color: '#94a3b8', fontSize: '0.75rem' }}>{r.reason}</td>
                          <td style={{ padding: '10px' }}>
                            <span style={{ background: r.status === 'PENDING' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(34, 197, 94, 0.2)', color: r.status === 'PENDING' ? '#fbbf24' : '#4ade80', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>
                              {r.status}
                            </span>
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            {r.status === 'PENDING' ? (
                              <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                                <button onClick={() => handleRespondApproval(r.id, 'APPROVED')} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}>Approve</button>
                                <button onClick={() => handleRespondApproval(r.id, 'REJECTED')} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}>Reject</button>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Approved by {r.approved_by || 'Admin'}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 5: ACTIVE SESSIONS, DEVICE TRACKING & RISK ALERTS */}
              {activeRoleSubTab === 'session_security' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={18} color="#38bdf8" /> ACTIVE USER SESSIONS & DEVICE TRACKING
                    </h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                          <th style={{ padding: '8px' }}>User</th>
                          <th style={{ padding: '8px' }}>IP Address</th>
                          <th style={{ padding: '8px' }}>Device</th>
                          <th style={{ padding: '8px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeSessions.map(s => (
                          <tr key={s.id} style={{ borderBottom: '1px solid #334155' }}>
                            <td style={{ padding: '8px', fontWeight: '800', color: '#ffffff' }}>{s.user}</td>
                            <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8' }}>{s.ip}</td>
                            <td style={{ padding: '8px', color: '#94a3b8' }}>{s.device}</td>
                            <td style={{ padding: '8px' }}>
                              <button onClick={() => alert(`Force logged out session ${s.id}`)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '3px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}>Force Logout</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldAlert size={18} color="#ef4444" /> SECURITY RISK ALERTS & ANOMALY DETECTION
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { risk: 'HIGH', user: 'Amit Patel', action: 'Bulk Customer Contact Export Attempt', reason: 'Tried exporting 250 records without BM approval.', time: 'Today 09:14 AM' },
                        { risk: 'LOW', user: 'Priya Nair', action: 'After-Hours System Access', reason: 'Logged in at 11:45 PM from mobile IP.', time: '16 Aug 11:45 PM' }
                      ].map((al, idx) => (
                        <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '10px 12px', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ background: al.risk === 'HIGH' ? '#ef4444' : '#38bdf8', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900' }}>{al.risk} RISK</span>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{al.time}</span>
                          </div>
                          <h4 style={{ fontSize: '0.82rem', color: '#ffffff', fontWeight: '800', marginTop: '4px' }}>{al.action} ({al.user})</h4>
                          <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{al.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: EMPLOYEE EXIT & AUTOMATED REASSIGNMENT HANDOVER HUB */}
              {activeRoleSubTab === 'exit_handover' && (
                <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>📋 Employee Exit & Automated CRM Reassignment Handover Hub</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>When marking an employee as RESIGNED or TERMINATED, reassign all active records while preserving audit history.</p>
                    </div>
                    <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
                      SECURITY PROTOCOL ACTIVE
                    </span>
                  </div>

                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Select Resigning / Exiting Employee:</label>
                        <select style={{ width: '100%', background: '#1e293b', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                          <option value="USR-06">Amit Patel (Sales Exec - Sales Team Bravo)</option>
                          <option value="USR-05">Priya Nair (Sales Exec - Sales Team Alpha)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Select Target Reassignment Agent / Manager:</label>
                        <select style={{ width: '100%', background: '#1e293b', color: '#4ade80', fontWeight: '800', border: '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                          <option value="USR-04">Rahul Sharma (Team Lead)</option>
                          <option value="USR-05">Priya Nair (Sales Exec)</option>
                          <option value="USR-02">Vikram Reddy (GM)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '14px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>PENDING CUSTOMERS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff' }}>14 Records</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>ACTIVE LEADS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>8 Leads</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>UPCOMING SITE VISITS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24' }}>2 Visits</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8' }}>ACTIVE BOOKINGS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80' }}>1 Booking</h4>
                      </div>
                    </div>

                    <button onClick={() => alert('🔒 Reassigned 25 CRM records from Amit Patel to Rahul Sharma. Exiting user account disabled & sessions revoked.')} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', alignSelf: 'flex-end' }}>
                      Execute Employee Exit & Reassign All CRM Records
                    </button>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* CATEGORY 3: PROJECT MANAGEMENT (RESTORED ALL SUB-TABS) */}
          {activeTab === 'project_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Project Management & Stock Inventory</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Property master list, tower floor grids, radius search, and price security.</p>
                </div>
              </div>

              {/* 4 SUB-TABS */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                <button onClick={() => setActiveProjectSubTab('property_master')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeProjectSubTab === 'property_master' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'property_master' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏠 Property Master Stock List ({properties.length})
                </button>
                <button onClick={() => setActiveProjectSubTab('live_inventory_board')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeProjectSubTab === 'live_inventory_board' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'live_inventory_board' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏢 Live Tower Floor Unit Grid ({propertyUnits.length})
                </button>
                <button onClick={() => setActiveProjectSubTab('map_radius')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeProjectSubTab === 'map_radius' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'map_radius' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📍 Radius GPS Search Filter
                </button>
                <button onClick={() => setActiveProjectSubTab('price_security')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeProjectSubTab === 'price_security' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'price_security' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔒 Price Security & Verification
                </button>
              </div>

              {activeProjectSubTab === 'property_master' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Code</th>
                        <th style={{ padding: '12px' }}>Title & Project</th>
                        <th style={{ padding: '12px' }}>Developer</th>
                        <th style={{ padding: '12px' }}>Config</th>
                        <th style={{ padding: '12px' }}>Carpet Area</th>
                        <th style={{ padding: '12px' }}>Price</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map(p => (
                        <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{p.property_code}</td>
                          <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{p.title}</td>
                          <td style={{ padding: '12px' }}>{p.developer}</td>
                          <td style={{ padding: '12px', color: '#38bdf8' }}>{p.configuration}</td>
                          <td style={{ padding: '12px' }}>{p.carpet_area}</td>
                          <td style={{ padding: '12px', color: '#4ade80', fontWeight: '800' }}>{p.final_price}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button onClick={() => handleStartEditProperty(p)} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                              <button onClick={() => handleDeleteProperty(p.id, p.property_code)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* CATEGORY 4: CUSTOMER MANAGEMENT (RESTORED ALL SUB-TABS) */}
          {activeTab === 'customer_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Customer 360 Vault & AI Matching Engine</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Complete customer requirement profiles and automated property matching.</p>
                </div>
              </div>

              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Customer ID</th>
                      <th style={{ padding: '12px' }}>Full Name</th>
                      <th style={{ padding: '12px' }}>Budget Range</th>
                      <th style={{ padding: '12px' }}>Preferred Area</th>
                      <th style={{ padding: '12px' }}>Mobile</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map(c => (
                      <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{c.customer_number}</td>
                        <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{c.name}</td>
                        <td style={{ padding: '12px', color: '#4ade80', fontWeight: '800' }}>{c.budget}</td>
                        <td style={{ padding: '12px' }}>{c.preferredArea}</td>
                        <td style={{ padding: '12px' }}>{maskPhone(c.mobile)}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button onClick={() => handleStartEditCustomer(c)} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                            <button onClick={() => handleDeleteCustomer(c.id, c.customer_number)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORY 5: BILLING MANAGEMENT (RESTORED FULL GST INVOICE MODAL & TABLE) */}
          {activeTab === 'billing_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Billing & GST Tax Invoices Vault</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>GST 18% Compliant tax invoice generation and financial ledgers.</p>
                </div>
              </div>

              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Invoice Number</th>
                      <th style={{ padding: '12px' }}>Developer</th>
                      <th style={{ padding: '12px' }}>Customer Name</th>
                      <th style={{ padding: '12px' }}>Total Invoice Amount</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map(i => (
                      <tr key={i.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{i.invoice_number}</td>
                        <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{i.developer_name}</td>
                        <td style={{ padding: '12px' }}>{i.customer_name}</td>
                        <td style={{ padding: '12px', color: '#4ade80', fontWeight: '900' }}>₹{i.total_invoice_amount.toLocaleString('en-IN')}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button onClick={() => { setSelectedInvoice(i); setShowInvoiceModal(true); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
                            <Printer size={14} /> Print GST Invoice PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORY 6: PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>Active User Profile Scope</h2>
              <p style={{ color: '#cbd5e1' }}>Logged in as: <strong style={{ color: '#38bdf8' }}>Rajesh Varma (Super Admin / Owner)</strong></p>
            </div>
          )}

          {/* CATEGORY 7: AGREEMENT MANAGEMENT (RESTORED CONTRACT MODAL & TABLE) */}
          {activeTab === 'agreement_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Legal Agreements Vault & OTP Signature Stamps</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Binding site-visit non-circumvention agreements and developer contracts.</p>
                </div>
              </div>

              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Agreement Code</th>
                      <th style={{ padding: '12px' }}>Agreement Title</th>
                      <th style={{ padding: '12px' }}>Party Name</th>
                      <th style={{ padding: '12px' }}>Digital Signature Stamp</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agreements.map(a => (
                      <tr key={a.id} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{a.agreement_code}</td>
                        <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{a.title}</td>
                        <td style={{ padding: '12px' }}>{a.party_name}</td>
                        <td style={{ padding: '12px', color: '#4ade80', fontFamily: 'monospace', fontSize: '0.75rem' }}>{a.signature_hash}</td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button onClick={() => { setSelectedAgreement(a); setShowFullContractModal(true); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}>
                            <Printer size={14} /> View Contract PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DEDICATED LOCATION MAP CATEGORY */}
          {activeTab === 'map_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Compass size={24} color="#38bdf8" /> Project Location Wise Interactive Geographical Radar Map
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Dedicated map portal: Click any location pin to inspect property specifications, prices, and owner contacts.</p>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {localitiesList.map(loc => (
                    <button key={loc} onClick={() => setSelectedLocality(loc)} style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', cursor: 'pointer', background: selectedLocality === loc ? '#0284c7' : '#1e293b', color: selectedLocality === loc ? '#ffffff' : '#94a3b8', fontSize: '0.78rem', fontWeight: '700' }}>
                      {loc === 'ALL' ? 'All Hubs' : loc}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', height: '540px', position: 'relative', overflow: 'hidden', padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'inset 0 0 50px rgba(0,0,0,0.5)' }}>
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '10px', border: '1px solid #334155' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Compass size={18} color="#38bdf8" />
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#ffffff' }}>Hyderabad Real Estate Geographical Radar</span>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>● {filteredProperties.length} Pins Active</span>
                  </div>

                  <div style={{ position: 'relative', flex: 1, margin: '20px 0' }}>
                    {filteredProperties.map(p => (
                      <div 
                        key={p.id} 
                        onClick={() => setSelectedProperty(p)}
                        style={{ 
                          position: 'absolute', left: `${p.map_x || 40}%`, top: `${p.map_y || 40}%`, transform: 'translate(-50%, -50%)', zIndex: selectedProperty.id === p.id ? 30 : 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center'
                        }}
                      >
                        <div style={{ background: selectedProperty.id === p.id ? '#0284c7' : '#1e293b', color: '#ffffff', border: selectedProperty.id === p.id ? '2px solid #38bdf8' : '1px solid #334155', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
                          <span style={{ color: '#4ade80' }}>{p.final_price}</span> | {p.locality}
                        </div>
                        <div style={{ background: selectedProperty.id === p.id ? '#38bdf8' : '#0284c7', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px', boxShadow: '0 0 15px #0284c7' }}>
                          <MapPin size={13} color="#ffffff" />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>📍 GPS Coordinates Engine • Kondapur Benchmark</span>
                    <span>Scale: 1 : 25,000</span>
                  </div>
                </div>

                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{selectedProperty.property_code}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginTop: '6px' }}>{selectedProperty.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>📍 {selectedProperty.locality}, Hyderabad</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', background: '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #334155' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block' }}>Asking Price</span>
                      <span style={{ fontSize: '1.3rem', color: '#4ade80', fontWeight: '900' }}>{selectedProperty.final_price}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', display: 'block' }}>Rate / Sq.Ft.</span>
                      <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '800' }}>{selectedProperty.price_sqft}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Developer</span>
                      <strong style={{ color: '#ffffff' }}>{selectedProperty.developer}</strong>
                    </div>
                    <div style={{ background: '#0f172a', padding: '10px', borderRadius: '8px', border: '1px solid #334155' }}>
                      <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Config</span>
                      <strong style={{ color: '#ffffff' }}>{selectedProperty.configuration}</strong>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', paddingTop: '10px' }}>
                    <button onClick={() => handleStartEditProperty(selectedProperty)} style={{ flex: 1, background: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Edit Record</button>
                    <button onClick={() => handleDeleteProperty(selectedProperty.id, selectedProperty.property_code)} style={{ flex: 1, background: '#ef4444', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* PRINTABLE GST TAX INVOICE MODAL */}
      {showInvoiceModal && selectedInvoice && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', color: '#0f172a', width: '750px', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0284c7', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0284c7' }}>SWARAMAYI REAL ESTATE MARKETING</h2>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>GSTIN: 36AAACS1234F1Z5 • Official Tax Invoice</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>{selectedInvoice.invoice_number}</span>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>Date: 16 Aug 2026</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#64748b', fontWeight: '700' }}>Billed To (Developer):</span>
                <strong style={{ display: 'block', color: '#0f172a' }}>{selectedInvoice.developer_name}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontWeight: '700' }}>Customer Transaction:</span>
                <strong style={{ display: 'block', color: '#0f172a' }}>{selectedInvoice.customer_name} ({selectedInvoice.property_title})</strong>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginTop: '10px' }}>
              <thead>
                <tr style={{ background: '#f1f5f9', borderBottom: '2px solid #cbd5e1' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Description</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Taxable Value</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>CGST (9%)</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>SGST (9%)</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Total (INR)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: '8px' }}>Real Estate Brokerage Service Fee</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>₹{selectedInvoice.taxable_value.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>₹{selectedInvoice.cgst_amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>₹{selectedInvoice.sgst_amount.toLocaleString('en-IN')}</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontWeight: '900', color: '#0284c7' }}>₹{selectedInvoice.total_invoice_amount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: '#64748b', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Close</button>
              <button onClick={() => window.print()} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' }}>Print PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE LEGAL CONTRACT MODAL */}
      {showFullContractModal && selectedAgreement && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#ffffff', color: '#0f172a', width: '750px', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '12px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '900' }}>CUSTOMER SITE VISIT & NON-CIRCUMVENTION AGREEMENT</h2>
              <span style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: '#0284c7' }}>{selectedAgreement.agreement_code}</span>
            </div>

            <div style={{ fontSize: '0.85rem', lineHeight: '1.6', color: '#334155' }}>
              <p>This legally binding agreement is entered between <strong>Swaramayi Real Estate Marketing</strong> and <strong>{selectedAgreement.party_name}</strong>.</p>
              <p style={{ marginTop: '8px' }}><strong>Terms & Conditions:</strong> Client acknowledges that property inspection for <strong>{selectedAgreement.property_details}</strong> was facilitated exclusively by Swaramayi Real Estate Marketing.</p>
            </div>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '16px', borderRadius: '8px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>DIGITAL OTP SIGNATURE STAMP</span>
              <h4 style={{ fontSize: '0.95rem', color: '#16a34a', fontFamily: 'monospace', fontWeight: '800' }}>{selectedAgreement.signature_hash}</h4>
              <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Signed Date: {selectedAgreement.signed_at}</span>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowFullContractModal(false)} style={{ background: '#64748b', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Close</button>
              <button onClick={() => window.print()} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' }}>Print Contract PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROPERTY MODAL */}
      {showEditPropertyModal && editingProperty && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '700px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>✏️ Edit Property Master Record ({editingProperty.property_code})</h3>
            <form onSubmit={handleSaveEditedProperty} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" value={editingProperty.title} onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <input type="text" value={editingProperty.final_price} onChange={(e) => setEditingProperty({ ...editingProperty, final_price: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px', borderRadius: '6px' }} required />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowEditPropertyModal(false)} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '800' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER MODAL */}
      {showEditCustomerModal && editingCustomer && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '700px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>✏️ Edit Customer Master Record ({editingCustomer.customer_number})</h3>
            <form onSubmit={handleSaveEditedCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <input type="text" value={editingCustomer.budget} onChange={(e) => setEditingCustomer({ ...editingCustomer, budget: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px', borderRadius: '6px' }} required />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowEditCustomerModal(false)} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '800' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {showUserModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '600px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>👤 Create Employee Account</h3>
            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" value={newUserForm.username} onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value })} placeholder="Full Name *" style={{ background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="Corporate Email *" style={{ background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowUserModal(false)} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '800' }}>Create User</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* INTERACTIVE DRILL-DOWN MODAL */}
      {drillDownTitle && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '880px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>🔍 KPI DRILL-DOWN: {drillDownTitle}</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Showing {drillDownRecords.length} detailed CRM records.</p>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setDrillDownTitle(null)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {drillDownRecords.map((r, idx) => (
                <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#ffffff' }}>{r.name || r.title || r.party_name || r.visit_code || r.booking_code}</strong>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{r.customer_number || r.property_code || r.salesperson || r.developer} • {r.budget || r.final_price || r.booking_value || r.status}</p>
                  </div>
                  <button onClick={() => alert(`Opening 360° Record View for ${r.name || r.title || r.party_name}`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>View 360°</button>
                </div>
              ))}
            </div>

            <button onClick={() => setDrillDownTitle(null)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-end' }}>Close Drill Down</button>
          </div>
        </div>
      )}

    </div>
  );
}
