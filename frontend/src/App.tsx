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
  const [activeProjectSubTab, setActiveProjectSubTab] = useState<'property_master' | 'live_inventory_board' | 'map_radius' | 'price_security' | 'deal_pipeline_tracker'>('property_master');
  const [activeCustomerSubTab, setActiveCustomerSubTab] = useState<'sales_journey_funnel' | 'cost_sheet_engine' | 'site_visit_engine' | 'smart_matching_engine' | 'customer_master_vault' | 'customer_360_profile' | 'anti_leakage_engine'>('sales_journey_funnel');
  const [activeAgreementSubTab, setActiveAgreementSubTab] = useState<'all_agreements' | 'customer_agreements' | 'developer_agreements' | 'tc_templates'>('all_agreements');
  const [activeBillingSubTab, setActiveBillingSubTab] = useState<'tax_invoices' | 'developer_commission' | 'payment_receipts' | 'financial_ledger'>('tax_invoices');

  // Advanced Customer Search & Requirement Filter States
  const [custSearchQuery, setCustSearchQuery] = useState('');
  const [filterLocality, setFilterLocality] = useState('ALL');
  const [filterBhk, setFilterBhk] = useState('ALL');
  const [filterPriority, setFilterPriority] = useState('ALL');
  const [showAdvCustFilters, setShowAdvCustFilters] = useState(true);

  // Dynamic Cost Sheet Engine State
  const [csBasePrice, setCsBasePrice] = useState<number>(14500000);
  const [csPlc, setCsPlc] = useState<number>(250000);
  const [csFloorRise, setCsFloorRise] = useState<number>(180000);
  const [csParking, setCsParking] = useState<number>(300000);
  const [csAmenities, setCsAmenities] = useState<number>(250000);
  const [csMaintenance, setCsMaintenance] = useState<number>(54000);
  const [csDiscount, setCsDiscount] = useState<number>(200000);
  const [csVersion, setCsVersion] = useState<string>('CS-2026-000145-V2');
  const [csVersionHistory, setCsVersionHistory] = useState<any[]>([
    { version: 'CS-2026-000145-V1', date: '17 Aug 2026 11:30 AM', user: 'Priya Nair (Sales Exec)', amount: '₹1,56,80,000', reason: 'Initial Auto-Generated Cost Sheet' },
    { version: 'CS-2026-000145-V2', date: '17 Aug 2026 03:15 PM', user: 'Rahul Sharma (Team Lead)', amount: '₹1,54,80,000', reason: 'Negotiated ₹2,00,000 Special Discount Applied' }
  ]);

  // Site Visit OTP & Check-In State
  const [visitOtpInput, setVisitOtpInput] = useState<string>('849201');
  const [visitOtpVerified, setVisitOtpVerified] = useState<boolean>(true);
  const [geofenceVerified, setGeofenceVerified] = useState<boolean>(true);
  const [visitFeedbackRating, setVisitFeedbackRating] = useState<number>(5);
  const [visitFeedbackIntent, setVisitFeedbackIntent] = useState<'HOT' | 'WARM' | 'COLD' | 'NOT_INTERESTED'>('HOT');

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
  const [showAddPropertyModal, setShowAddPropertyModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showFullContractModal, setShowFullContractModal] = useState(false);

  // Advanced Customer Master Form State
  const [newCustomerForm, setNewCustomerForm] = useState({
    name: '',
    mobile: '',
    alternate_mobile: '',
    email: '',
    dob: '',
    address: '',
    city: 'Hyderabad',
    property_type: 'Flat / Apartment',
    configuration: '3BHK',
    budget_min: '₹70 Lakhs',
    budget_max: '₹1.50 Crore',
    budget: '₹70 Lakhs - ₹1.50 Crore',
    preferredArea: 'Kondapur / Gachibowli',
    purchase_timeline: 'Immediate (< 30 Days)',
    loan_required: 'Yes',
    investment_purpose: 'Self / End Use',
    preferred_projects: 'My Home, Rajapushpa, Aparna',
    family_requirements: 'East Facing, High Floor, Swimming Pool View',
    lead_source: 'Meta Ads',
    sub_source: 'Kondapur 3BHK Campaign',
    referral_source: '',
    assigned_employee_id: 'USR-07',
    team_leader_id: 'USR-06',
    priority: 'HOT',
    score: 88,
    notes: 'Customer looking for immediate registration in Kondapur locality.'
  });

  // Advanced Property Master Inventory Form State
  const [newPropertyForm, setNewPropertyForm] = useState({
    title: '',
    developer: 'My Home Constructions',
    locality: 'Kondapur',
    property_type: 'Flat / Apartment',
    configuration: '3BHK',
    carpet_area: '1,850 Sq.Ft.',
    super_builtup_area: '2,350 Sq.Ft.',
    facing: 'East Facing',
    floor_no: '14th Floor out of 32',
    tower_block: 'Tower B - Sapphire',
    final_price: '₹1.50 Crore',
    price_sqft: '₹8,100/Sq.Ft.',
    commission_pct: '2.0% (₹3,00,000 Brokerage)',
    maintenance_monthly: '₹4,500/Month',
    possession_status: 'Ready to Move',
    status: 'AVAILABLE',
    key_custody: 'Builder Lounge / Company Office',
    description: 'Vastu compliant, East facing corner flat with 3 balconies and pool view.'
  });

  const [newLeadForm, setNewLeadForm] = useState({
    customer_name: '',
    mobile: '',
    property_title: 'My Home Bhooja (Kondapur)',
    budget: '₹1.2 Crore',
    priority: 'HOT'
  });

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

  const handleCreateCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustNumber = `SRM-CUS-2026-000${customers.length + 187}`;
    const newC = {
      id: `CUS-${Date.now()}`,
      customer_number: newCustNumber,
      name: newCustomerForm.name || 'New Customer Master',
      mobile: newCustomerForm.mobile || '+91 98490 12345',
      email: newCustomerForm.email || 'customer@example.com',
      budget: newCustomerForm.budget,
      preferredArea: newCustomerForm.preferredArea,
      configuration: newCustomerForm.configuration,
      priority: newCustomerForm.priority as any,
      score: newCustomerForm.priority === 'HOT' ? 88 : 72
    };
    setCustomers([newC, ...customers]);
    setShowAddCustomerModal(false);
    setShowCustomerModal(false);
    setShowLeadModal(false);
    alert(`👤 Customer Master ${newCustNumber} created successfully!`);
  };

  const handleCreatePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPropCode = `SRM-PROP-2026-000${properties.length + 106}`;
    const newP = {
      id: `PROP-${Date.now()}`,
      property_code: newPropCode,
      title: newPropertyForm.title || 'New Luxury Project',
      developer: newPropertyForm.developer,
      locality: newPropertyForm.locality,
      configuration: newPropertyForm.configuration,
      carpet_area: newPropertyForm.carpet_area,
      final_price: newPropertyForm.final_price,
      price_sqft: newPropertyForm.price_sqft,
      status: newPropertyForm.status
    };
    setProperties([newP, ...properties]);
    setShowAddPropertyModal(false);
    setShowPropertyModal(false);
    alert(`🏠 Property Master ${newPropCode} created successfully!`);
  };

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustNumber = `SRM-CUS-2026-000${customers.length + 187}`;
    const newC = {
      id: `CUS-${Date.now()}`,
      customer_number: newCustNumber,
      name: newLeadForm.customer_name || 'Ingested Lead Customer',
      mobile: newLeadForm.mobile || '+91 98490 99999',
      email: 'lead@swaramayi.com',
      budget: newLeadForm.budget,
      preferredArea: 'Kondapur / Hitec City',
      configuration: '3BHK',
      priority: newLeadForm.priority as any,
      score: 85
    };
    setCustomers([newC, ...customers]);
    setShowLeadModal(false);
    alert(`📋 New Lead & Customer Master ${newCustNumber} ingested successfully!`);
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

  const filteredCustomersForMatching = customers.filter(c => {
    const query = custSearchQuery.trim().toLowerCase();
    const matchesQuery = !query || 
      c.customer_number.toLowerCase().includes(query) || 
      c.id.toLowerCase().includes(query) ||
      c.name.toLowerCase().includes(query) ||
      c.mobile.includes(query);
    
    const matchesLocality = filterLocality === 'ALL' || c.preferredArea.toLowerCase().includes(filterLocality.toLowerCase());
    const matchesBhk = filterBhk === 'ALL' || c.configuration.toLowerCase().includes(filterBhk.toLowerCase());
    const matchesPriority = filterPriority === 'ALL' || c.priority === filterPriority;

    return matchesQuery && matchesLocality && matchesBhk && matchesPriority;
  });

  // Dynamic 5-Factor Property Matching Algorithm
  const calculatePropertyMatchScore = (customer: any, property: any) => {
    let breakdown = { loc: 5, bud: 10, bhk: 5, type: 5, facing: 15 };

    if (customer?.preferredArea && property?.locality) {
      const prefLocs = customer.preferredArea.toLowerCase().split(/[\/,]/).map((s: string) => s.trim());
      const propLoc = property.locality.toLowerCase().trim();
      if (prefLocs.some((loc: string) => propLoc.includes(loc) || loc.includes(propLoc))) {
        breakdown.loc = 25;
      } else {
        breakdown.loc = 5;
      }
    } else {
      breakdown.loc = 15;
    }

    if (customer?.configuration && property?.configuration) {
      const custBhk = customer.configuration.toUpperCase();
      const propBhk = property.configuration.toUpperCase();
      if (custBhk === propBhk || (custBhk.includes('VILLA') && propBhk.includes('VILLA'))) {
        breakdown.bhk = 25;
      } else if ((custBhk.includes('4BHK') && propBhk.includes('3BHK')) || (custBhk.includes('3BHK') && propBhk.includes('2BHK'))) {
        breakdown.bhk = 15;
      } else {
        breakdown.bhk = 5;
      }
    } else {
      breakdown.bhk = 15;
    }

    const parseAmountInLakhs = (str: string) => {
      if (!str) return 100;
      const clean = str.replace(/[^0-9.]/g, '');
      const num = parseFloat(clean) || 0;
      if (str.toLowerCase().includes('crore')) return num * 100;
      return num;
    };

    const propPriceLakhs = parseAmountInLakhs(property?.final_price || '');
    
    if (customer?.budget) {
      const budgetParts = customer.budget.split('-').map(parseAmountInLakhs);
      const minBud = budgetParts[0] || 50;
      const maxBud = budgetParts[1] || budgetParts[0] * 1.25 || 1000;

      if (propPriceLakhs >= minBud * 0.8 && propPriceLakhs <= maxBud * 1.2) {
        breakdown.bud = 25;
      } else if (propPriceLakhs < minBud * 0.8) {
        breakdown.bud = 18;
      } else {
        breakdown.bud = 5;
      }
    } else {
      breakdown.bud = 15;
    }

    if (customer?.property_type && property?.property_type) {
      if (customer.property_type.toLowerCase() === property.property_type.toLowerCase()) {
        breakdown.type = 15;
      } else {
        breakdown.type = 5;
      }
    } else {
      breakdown.type = 10;
    }

    breakdown.facing = 15;
    const total = breakdown.loc + breakdown.bud + breakdown.bhk + breakdown.type + breakdown.facing;
    return { total, breakdown };
  };

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
            <option value="ADMIN">2. Admin</option>
            <option value="GENERAL_MANAGER">3. General Manager</option>
            <option value="BRANCH_MANAGER">4. Branch Manager</option>
            <option value="SALES_MANAGER">5. Sales Manager</option>
            <option value="TEAM_LEAD">6. Team Leader</option>
            <option value="SALES_EXEC">7. Sales Executive</option>
            <option value="TELECALLER">8. Telecaller</option>
            <option value="BACK_OFFICE">9. Back Office / Desk</option>
            <option value="ACCOUNTS">10. Accounts & Finance</option>
            <option value="HR">11. Human Resources (HR)</option>
            <option value="MARKETING">12. Marketing Squad</option>
            <option value="PROPERTY_MANAGER">13. Property Manager</option>
            <option value="FIELD_EXEC">14. Field Executive</option>
            <option value="CUSTOMER_SUPPORT">15. Customer Support</option>
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

          {/* CATEGORY 3: PROJECT & PROPERTY INVENTORY MANAGEMENT */}
          {activeTab === 'project_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SYSTEM HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>PROJECT & PROPERTY INVENTORY MANAGEMENT SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>STOCK INVENTORY ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    Master Stock Inventory • Live Unit Tower Grid • GPS Radius Search • Deal Conversion Funnel
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setShowAddPropertyModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} /> + Add Property Master
                  </button>
                  <button onClick={() => alert('📄 Generating Property Stock Inventory CSV Report...')} style={{ background: '#1e293b', color: '#4ade80', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Share2 size={15} /> Export Inventory
                  </button>
                </div>
              </div>

              {/* 4 SUB-TABS NAVIGATION FOR PROJECT MANAGEMENT */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveProjectSubTab('property_master')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'property_master' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'property_master' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏠 Property Master Stock ({properties.length})
                </button>
                <button onClick={() => setActiveProjectSubTab('live_inventory_board')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'live_inventory_board' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'live_inventory_board' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏢 Live Tower Unit Grid ({propertyUnits.length})
                </button>
                <button onClick={() => setActiveProjectSubTab('map_radius')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'map_radius' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'map_radius' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📍 Radius GPS Search Filter
                </button>
                <button onClick={() => setActiveProjectSubTab('deal_pipeline_tracker')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'deal_pipeline_tracker' ? '#0284c7' : '#1e293b', color: activeProjectSubTab === 'deal_pipeline_tracker' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📈 Deal Conversion Funnel (13 Stages)
                </button>
              </div>

              {/* SUB-TAB 2: PROPERTY MASTER STOCK LIST */}
              {activeProjectSubTab === 'property_master' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🏠 Master Property Stock Inventory ({properties.length} Active Stock)</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Comprehensive inventory registry with developer pricing, configuration, and availability status.</p>
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Code</th>
                        <th style={{ padding: '12px' }}>Title & Project</th>
                        <th style={{ padding: '12px' }}>Developer</th>
                        <th style={{ padding: '12px' }}>Config</th>
                        <th style={{ padding: '12px' }}>Carpet Area</th>
                        <th style={{ padding: '12px' }}>Price</th>
                        <th style={{ padding: '12px' }}>Status</th>
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
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: p.status === 'AVAILABLE' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: p.status === 'AVAILABLE' ? '#4ade80' : '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>
                              {p.status}
                            </span>
                          </td>
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

              {/* SUB-TAB 3: LIVE TOWER FLOOR UNIT GRID */}
              {activeProjectSubTab === 'live_inventory_board' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🏢 Live Tower Floor Unit Grid Matrix</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                    {propertyUnits.map(u => (
                      <div key={u.id} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '800', fontFamily: 'monospace' }}>{u.unit_code}</span>
                        <h4 style={{ fontSize: '1.1rem', color: '#ffffff', fontWeight: '900' }}>{u.unit_num} ({u.tower})</h4>
                        <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800' }}>{u.bhk} • {u.area}</span>
                        <strong style={{ fontSize: '0.9rem', color: '#4ade80' }}>{u.price}</strong>
                        <span style={{ background: u.status === 'AVAILABLE' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: u.status === 'AVAILABLE' ? '#4ade80' : '#ef4444', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.7rem', alignSelf: 'flex-start', marginTop: '4px' }}>
                          ● {u.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: RADIUS GPS SEARCH FILTER */}
              {activeProjectSubTab === 'map_radius' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📍 Radius GPS Search Filter & Locality Map</h3>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {['1KM', '2KM', '5KM', '10KM', '25KM'].map(r => (
                      <button key={r} onClick={() => setActiveRadius(r as any)} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', background: activeRadius === r ? '#0284c7' : '#0f172a', color: '#ffffff', border: '1px solid #334155' }}>
                        Radius {r}
                      </button>
                    ))}
                  </div>
                  <div style={{ background: '#0f172a', border: '1px dashed #334155', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    🗺️ Interactive GPS Locality Map Active for Radius Filter ({activeRadius}) around Kondapur & Hitec City.
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: END-TO-END DEAL CONVERSION FUNNEL (13 STAGES) */}
              {activeProjectSubTab === 'deal_pipeline_tracker' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>📈 End-to-End Customer Requirement to Brokerage Funnel (13 Stages)</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                    {[
                      { stage: '1. CUSTOMER', count: 184, color: '#38bdf8' },
                      { stage: '2. REQUIREMENT', count: 172, color: '#38bdf8' },
                      { stage: '3. AUTO SEARCH', count: 160, color: '#38bdf8' },
                      { stage: '4. MATCH SCORE', count: 145, color: '#38bdf8' },
                      { stage: '5. SP SELECTION', count: 130, color: '#38bdf8' },
                      { stage: '6. PORTFOLIO SENT', count: 115, color: '#fbbf24' },
                      { stage: '7. VIEWED BY CUS', count: 98, color: '#fbbf24' },
                      { stage: '8. CUS RESPONSE', count: 82, color: '#fbbf24' },
                      { stage: '9. FOLLOW-UP', count: 65, color: '#fbbf24' },
                      { stage: '10. SITE VISIT', count: 48, color: '#4ade80' },
                      { stage: '11. NEGOTIATION', count: 28, color: '#4ade80' },
                      { stage: '12. BOOKING', count: 18, color: '#4ade80' },
                      { stage: '13. BROKERAGE', count: 18, color: '#22c55e' }
                    ].map((s, idx) => (
                      <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '12px 8px', borderRadius: '8px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>{s.stage}</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: s.color, marginTop: '2px' }}>{s.count}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* CATEGORY 4: CUSTOMER MANAGEMENT, 360° PROFILE & ANTI-LEAKAGE SYSTEM */}
          {activeTab === 'customer_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SYSTEM HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>CUSTOMER TRACKING, LEAD OWNERSHIP & ANTI-LEAKAGE SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>LEAKAGE SHIELD ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    Permanent Customer Tracking IDs (SRM-CUS) • Lead IDs (SRM-LEAD) • Customer 360° Vault • Fraud Prevention Shield
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setShowAddCustomerModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={15} /> + Add Customer Master
                  </button>
                  <button onClick={() => alert('🔍 Running Automated Customer Duplicate Scanner... Clean!')} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Search size={15} /> Duplicate Scanner
                  </button>
                </div>
              </div>

              {/* 7 SUB-TABS NAVIGATION FOR CUSTOMER MANAGEMENT */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveCustomerSubTab('sales_journey_funnel')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'sales_journey_funnel' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'sales_journey_funnel' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📈 19-Stage Sales Journey & Funnel
                </button>
                <button onClick={() => setActiveCustomerSubTab('cost_sheet_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'cost_sheet_engine' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'cost_sheet_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📄 Individual Cost Sheet Engine
                </button>
                <button onClick={() => setActiveCustomerSubTab('site_visit_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'site_visit_engine' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'site_visit_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🚘 Site Visit & OTP Verification
                </button>
                <button onClick={() => setActiveCustomerSubTab('smart_matching_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'smart_matching_engine' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'smart_matching_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🎯 Smart AI Property Matching
                </button>
                <button onClick={() => setActiveCustomerSubTab('customer_master_vault')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_master_vault' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_master_vault' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  👥 Customer Master Vault ({customers.length})
                </button>
                <button onClick={() => setActiveCustomerSubTab('customer_360_profile')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_360_profile' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_360_profile' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔍 Customer 360° Profile
                </button>
                <button onClick={() => setActiveCustomerSubTab('anti_leakage_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'anti_leakage_engine' ? '#ef4444' : '#1e293b', color: activeCustomerSubTab === 'anti_leakage_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #ef4444' }}>
                  🚨 Anti-Leakage Detection (3 Alerts)
                </button>
              </div>

              {/* SUB-TAB 1: 19-STAGE PROPERTY SALES JOURNEY & CONVERSION FUNNEL */}
              {activeCustomerSubTab === 'sales_journey_funnel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* CUSTOMER JOURNEY SELECTOR & SUMMARY */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          📈 PROPERTY SALES JOURNEY & CONVERSION TIMELINE
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                          Complete 19-stage lifecycle tracking from Customer Requirement to Booking, Agreement, Brokerage & Closure.
                        </p>
                      </div>

                      <select value={selectedCust.id} onChange={(e) => { const c = customers.find(x => x.id === e.target.value); if (c) setSelectedCust(c); }} style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800' }}>
                        {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.customer_number}) — {c.configuration} | {c.preferredArea}</option>)}
                      </select>
                    </div>

                    {/* 19-STAGE CONVERSION STEPPER GRID */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase' }}>
                        Active 19-Stage Sales Journey Funnel for {selectedCust.name} ({selectedCust.customer_number})
                      </span>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '6px' }}>
                        {[
                          { step: '1. REQUIREMENT', status: 'COMPLETED', color: '#4ade80' },
                          { step: '2. MATCHING', status: 'COMPLETED', color: '#4ade80' },
                          { step: '3. SELECTION', status: 'COMPLETED', color: '#4ade80' },
                          { step: '4. COST SHEET', status: 'COMPLETED', color: '#4ade80' },
                          { step: '5. SHARING', status: 'COMPLETED', color: '#4ade80' },
                          { step: '6. INTEREST', status: 'COMPLETED', color: '#4ade80' },
                          { step: '7. VISIT SCHEDULE', status: 'COMPLETED', color: '#4ade80' },
                          { step: '8. OTP VERIFY', status: 'COMPLETED', color: '#4ade80' },
                          { step: '9. CHECK-IN', status: 'COMPLETED', color: '#4ade80' },
                          { step: '10. VISIT DONE', status: 'COMPLETED', color: '#4ade80' },
                          { step: '11. FEEDBACK', status: 'COMPLETED', color: '#4ade80' },
                          { step: '12. CONVERSION', status: 'COMPLETED', color: '#4ade80' },
                          { step: '13. NEGOTIATION', status: 'IN_PROGRESS', color: '#fbbf24' },
                          { step: '14. BOOKING', status: 'PENDING', color: '#94a3b8' },
                          { step: '15. AGREEMENT', status: 'PENDING', color: '#94a3b8' },
                          { step: '16. BROKERAGE', status: 'PENDING', color: '#94a3b8' },
                          { step: '17. PAYMENT', status: 'PENDING', color: '#94a3b8' },
                          { step: '18. CLOSURE', status: 'PENDING', color: '#94a3b8' },
                          { step: '19. POST-SALE', status: 'PENDING', color: '#94a3b8' }
                        ].map((s, idx) => (
                          <div key={idx} style={{ background: '#1e293b', border: `1px solid ${s.color}`, padding: '6px 4px', borderRadius: '6px', textAlign: 'center' }}>
                            <span style={{ fontSize: '0.58rem', color: s.color, fontWeight: '900', display: 'block' }}>{s.step}</span>
                            <span style={{ fontSize: '0.62rem', color: '#ffffff', fontWeight: '800' }}>{s.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* CLICKABLE EVENT TIMELINE TABLE WITH AUDIT LOGS */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📜 AUDIT TRAIL & JOURNEY ACTIVITY TIMELINE</h3>
                      <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                        12 Executed Audit Events
                      </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                          <th style={{ padding: '10px' }}>Timestamp</th>
                          <th style={{ padding: '10px' }}>Journey Stage Event</th>
                          <th style={{ padding: '10px' }}>Status</th>
                          <th style={{ padding: '10px' }}>Responsible User</th>
                          <th style={{ padding: '10px' }}>Record ID</th>
                          <th style={{ padding: '10px', textAlign: 'center' }}>Audit Verification</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { time: '17 Aug 2026 10:15 AM', event: 'Customer Master Record Registered', status: 'COMPLETED', user: 'Priya Nair (Sales Exec)', id: 'CUS-2026-000184', source: 'WEB_APP' },
                          { time: '17 Aug 2026 10:20 AM', event: 'Property Requirements Saved (3BHK, Kondapur)', status: 'COMPLETED', user: 'Priya Nair (Sales Exec)', id: 'REQ-2026-000094', source: 'FORM' },
                          { time: '17 Aug 2026 10:22 AM', event: 'Automated 5-Factor Property Search Executed', status: 'COMPLETED', user: 'System Engine', id: 'MAT-2026-000421', source: 'ALGORITHM' },
                          { time: '17 Aug 2026 11:30 AM', event: 'Personalized Cost Sheet Generated (V1)', status: 'COMPLETED', user: 'Priya Nair (Sales Exec)', id: 'CS-2026-000145-V1', source: 'ENGINE' },
                          { time: '17 Aug 2026 11:35 AM', event: 'Cost Sheet Sent via WhatsApp & Email', status: 'DELIVERED', user: 'WhatsApp API Gateway', id: 'MSG-2026-90412', source: 'WHATSAPP' },
                          { time: '18 Aug 2026 09:40 AM', event: 'Customer Opened Cost Sheet Secure Token Link', status: 'VIEWED', user: 'Customer (Rohan Deshmukh)', id: 'TOK-2026-77812', source: 'PORTAL' },
                          { time: '18 Aug 2026 10:00 AM', event: 'Customer Expressed Interest & Requested Site Visit', status: 'INTERESTED', user: 'Customer (Rohan Deshmukh)', id: 'RES-2026-00088', source: 'PORTAL' },
                          { time: '19 Aug 2026 02:00 PM', event: 'Site Visit Scheduled for My Home Tarkshya', status: 'CONFIRMED', user: 'Priya Nair (Sales Exec)', id: 'VIS-2026-000145', source: 'CALENDAR' },
                          { time: '20 Aug 2026 03:30 PM', event: 'Customer OTP Verified at Site Lounge (849201)', status: 'VERIFIED', user: 'Kiran Kumar (Field Exec)', id: 'OTP-2026-33912', source: 'MOBILE_OTP' },
                          { time: '20 Aug 2026 03:31 PM', event: 'GPS Geofence Check-in Verified (17.4612° N, 78.3685° E)', status: 'CHECKED_IN', user: 'Kiran Kumar (Field Exec)', id: 'GPS-2026-10492', source: 'GEO_FENCE' },
                          { time: '20 Aug 2026 04:15 PM', event: 'Site Visit Completed & 5-Star Feedback Recorded', status: 'COMPLETED', user: 'Kiran Kumar (Field Exec)', id: 'FBK-2026-00054', source: 'FEEDBACK' },
                          { time: '20 Aug 2026 05:00 PM', event: 'Negotiation Initiated (₹2,00,000 Special Discount)', status: 'IN_PROGRESS', user: 'Rahul Sharma (Team Lead)', id: 'NEG-2026-00028', source: 'APPROVAL' }
                        ].map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                            <td style={{ padding: '10px', color: '#94a3b8', fontSize: '0.78rem' }}>{item.time}</td>
                            <td style={{ padding: '10px', fontWeight: '800', color: '#ffffff' }}>{item.event}</td>
                            <td style={{ padding: '10px' }}>
                              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>
                                {item.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px', color: '#38bdf8', fontWeight: '700' }}>{item.user}</td>
                            <td style={{ padding: '10px', fontFamily: 'monospace', color: '#fbbf24' }}>{item.id}</td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>
                              <button onClick={() => alert(`🔍 Audit Trail Log for ${item.id}:\n\nUser: ${item.user}\nTimestamp: ${item.time}\nSource: ${item.source}\nStatus: ${item.status}\nIntegrity Check: PASSED (SHA-256 Verified)`)} style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}>
                                View Audit Log
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}

              {/* SUB-TAB 2: INDIVIDUAL PROPERTY COST SHEET ENGINE */}
              {activeCustomerSubTab === 'cost_sheet_engine' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* COST SHEET GENERATOR PANEL */}
                  <div style={{ background: '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          📄 INDIVIDUAL PROPERTY COST SHEET CALCULATOR ENGINE
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                          Customer-specific pricing breakdown for {selectedCust.name} ({selectedCust.customer_number}) — Unit 1402, Tower B.
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem' }}>
                          ACTIVE VERSION: {csVersion}
                        </span>
                        <select value={selectedCust.id} onChange={(e) => { const c = customers.find(x => x.id === e.target.value); if (c) setSelectedCust(c); }} style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800' }}>
                          {customers.map(c => <option key={c.id} value={c.id}>{c.name} ({c.customer_number})</option>)}
                        </select>
                      </div>
                    </div>

                    {/* DYNAMIC COST SHEET BREAKDOWN FORM & SUMMARY */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }}>
                      
                      {/* CHARGES FORM */}
                      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                          1. Configurable Property Cost Components
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Base Agreement Value (INR)</label>
                            <input type="number" value={csBasePrice} onChange={(e) => setCsBasePrice(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.85rem' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>PLC (Facing Charge)</label>
                            <input type="number" value={csPlc} onChange={(e) => setCsPlc(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.85rem' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Floor Rise Charge</label>
                            <input type="number" value={csFloorRise} onChange={(e) => setCsFloorRise(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Covered Parking Slot</label>
                            <input type="number" value={csParking} onChange={(e) => setCsParking(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Clubhouse & Amenities</label>
                            <input type="number" value={csAmenities} onChange={(e) => setCsAmenities(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Advance Maintenance</label>
                            <input type="number" value={csMaintenance} onChange={(e) => setCsMaintenance(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Negotiated Discount (INR)</label>
                            <input type="number" value={csDiscount} onChange={(e) => setCsDiscount(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ef4444', fontWeight: '800', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                          </div>
                        </div>

                        <button onClick={() => {
                          const newV = `CS-2026-000145-V${csVersionHistory.length + 1}`;
                          setCsVersion(newV);
                          const netVal = csBasePrice + csPlc + csFloorRise + csParking + csAmenities + csMaintenance - csDiscount;
                          const gstVal = Math.round(netVal * 0.05);
                          const stampVal = Math.round(netVal * 0.075);
                          const totalVal = netVal + gstVal + stampVal;
                          setCsVersionHistory([{ version: newV, date: new Date().toLocaleString(), user: 'Priya Nair (Sales Exec)', amount: `₹${totalVal.toLocaleString('en-IN')}`, reason: 'Recalculated with updated component values' }, ...csVersionHistory]);
                          alert(`📄 Generated Cost Sheet Version ${newV} totaling ₹${totalVal.toLocaleString('en-IN')}!`);
                        }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '900', marginTop: '6px', cursor: 'pointer' }}>
                          ⚡ Recalculate & Save New Cost Sheet Version
                        </button>
                      </div>

                      {/* COMPUTED SUMMARY BOX */}
                      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#4ade80', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                          2. Cost Sheet Summary Statement
                        </h4>

                        {(() => {
                          const netVal = csBasePrice + csPlc + csFloorRise + csParking + csAmenities + csMaintenance - csDiscount;
                          const gstVal = Math.round(netVal * 0.05);
                          const stampVal = Math.round(netVal * 0.075);
                          const totalVal = netVal + gstVal + stampVal;

                          return (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Base Agreement Value:</span>
                                <strong style={{ color: '#ffffff' }}>₹{csBasePrice.toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>PLC + Floor Rise:</span>
                                <strong style={{ color: '#ffffff' }}>₹{(csPlc + csFloorRise).toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Parking & Amenities:</span>
                                <strong style={{ color: '#ffffff' }}>₹{(csParking + csAmenities).toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#ef4444', fontWeight: '800' }}>Less Negotiated Discount:</span>
                                <strong style={{ color: '#ef4444' }}>- ₹{csDiscount.toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '6px' }}>
                                <span style={{ color: '#ffffff', fontWeight: '800' }}>Net Consideration:</span>
                                <strong style={{ color: '#ffffff' }}>₹{netVal.toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Estimated GST (5%):</span>
                                <strong style={{ color: '#fbbf24' }}>₹{gstVal.toLocaleString('en-IN')}</strong>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ color: '#94a3b8' }}>Stamp Duty & Reg. (7.5%):</span>
                                <strong style={{ color: '#fbbf24' }}>₹{stampVal.toLocaleString('en-IN')}</strong>
                              </div>

                              <div style={{ background: '#1e293b', border: '1px solid #22c55e', padding: '12px', borderRadius: '8px', textAlign: 'center', marginTop: '6px' }}>
                                <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>TOTAL ESTIMATED ACQUISITION COST</span>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>
                                  ₹{totalVal.toLocaleString('en-IN')}
                                </h3>
                              </div>
                            </div>
                          );
                        })()}
                      </div>

                    </div>

                    {/* PDF & MULTI-CHANNEL DISPATCH TOOLBAR */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.78rem', color: '#ffffff', fontWeight: '800' }}>
                          Dispatch Cost Sheet {csVersion} to {selectedCust.name} ({selectedCust.mobile})
                        </span>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                          Send personalized branding PDF, breakdown table, and secure token link.
                        </p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button onClick={() => alert(`📲 WhatsApp Cost Sheet ${csVersion} dispatched to ${selectedCust.name} (${selectedCust.mobile})`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Share2 size={14} /> Send via WhatsApp
                        </button>
                        <button onClick={() => alert(`📧 Email PDF Cost Sheet ${csVersion} dispatched to ${selectedCust.email}`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileText size={14} /> Send via Email
                        </button>
                        <button onClick={() => alert(`📄 Downloading Official PDF Cost Sheet ${csVersion}.pdf...`)} style={{ background: '#1e293b', color: '#fbbf24', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}>
                          📄 Download PDF
                        </button>
                        <button onClick={() => alert(`🔗 Generated Secure Token Link: https://swaramayi-crm.com/cs/sec-token-${Date.now()}`)} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}>
                          🔗 Copy Secure Token Link
                        </button>
                      </div>
                    </div>

                    {/* COST SHEET VERSION CONTROL HISTORY TABLE */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#ffffff' }}>📜 Cost Sheet Version Control & Modification History</h4>
                      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                        <thead>
                          <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid #334155' }}>
                            <th style={{ padding: '8px' }}>Version ID</th>
                            <th style={{ padding: '8px' }}>Prepared Date & Time</th>
                            <th style={{ padding: '8px' }}>Prepared By</th>
                            <th style={{ padding: '8px' }}>Total Acquisition Amount</th>
                            <th style={{ padding: '8px' }}>Reason for Modification</th>
                          </tr>
                        </thead>
                        <tbody>
                          {csVersionHistory.map((vh, i) => (
                            <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                              <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{vh.version}</td>
                              <td style={{ padding: '8px', color: '#94a3b8' }}>{vh.date}</td>
                              <td style={{ padding: '8px', color: '#ffffff', fontWeight: '700' }}>{vh.user}</td>
                              <td style={{ padding: '8px', color: '#4ade80', fontWeight: '900' }}>{vh.amount}</td>
                              <td style={{ padding: '8px', color: '#cbd5e1' }}>{vh.reason}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              )}

              {/* SUB-TAB 3: SITE VISIT MANAGEMENT & OTP CHECK-IN ENGINE */}
              {activeCustomerSubTab === 'site_visit_engine' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* SITE VISIT SCHEDULER & OTP VERIFICATION BOARD */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                          🚘 SITE VISIT SCHEDULING & OTP VERIFICATION HUB
                        </h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                          OTP verification, GPS Geofencing Check-In & structured 5-star customer feedback.
                        </p>
                      </div>

                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '0.8rem' }}>
                        Visit ID: VIS-2026-000145
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px' }}>
                      
                      {/* OTP & GPS GEOFENCE CHECK-IN ENGINE */}
                      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                          1. 6-Digit Mobile OTP & GPS Geofence Verification
                        </h4>

                        <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <div><span style={{ color: '#94a3b8' }}>Scheduled Customer:</span> <strong style={{ color: '#ffffff' }}>{selectedCust.name} ({selectedCust.mobile})</strong></div>
                          <div><span style={{ color: '#94a3b8' }}>Target Property:</span> <strong style={{ color: '#fbbf24' }}>My Home Tarkshya (Kondapur)</strong></div>
                          <div><span style={{ color: '#94a3b8' }}>Field Executive:</span> <strong style={{ color: '#38bdf8' }}>Kiran Kumar (USR-07)</strong></div>
                        </div>

                        {/* OTP VERIFICATION FORM */}
                        <div>
                          <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Enter 6-Digit Customer Mobile OTP:</label>
                          <div style={{ display: 'flex', gap: '10px' }}>
                            <input type="text" value={visitOtpInput} onChange={(e) => setVisitOtpInput(e.target.value)} placeholder="849201" style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontFamily: 'monospace', fontWeight: '900', padding: '8px 12px', borderRadius: '6px', fontSize: '1.1rem', textAlign: 'center' }} />
                            <button onClick={() => {
                              if (visitOtpInput.length === 6) {
                                setVisitOtpVerified(true);
                                alert(`🟢 OTP ${visitOtpInput} Verified Successfully! Timestamp logged in audit vault.`);
                              } else {
                                alert('⚠️ Please enter 6-digit OTP!');
                              }
                            }} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer' }}>
                              Verify OTP
                            </button>
                          </div>
                        </div>

                        {/* GPS GEOFENCE STATUS BOX */}
                        <div style={{ background: geofenceVerified ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', border: geofenceVerified ? '1px solid #22c55e' : '1px solid #ef4444', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <MapPin size={18} color={geofenceVerified ? '#4ade80' : '#ef4444'} />
                            <div>
                              <span style={{ fontSize: '0.8rem', color: geofenceVerified ? '#4ade80' : '#ef4444', fontWeight: '900' }}>
                                {geofenceVerified ? '🟢 GPS GEOFENCE VERIFIED (17.4612° N, 78.3685° E)' : '⚠️ OUTSIDE SITE RADIUS (> 500m)'}
                              </span>
                              <p style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                                Executive Device Geofence Verification: Within 100 meters of My Home Tarkshya site office.
                              </p>
                            </div>
                          </div>
                        </div>

                        <button onClick={() => alert('🟢 Check-In Completed Successfully! Status set to CHECKED_IN & Visit Timer Started.')} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}>
                          🚀 Execute Official Site Check-In & Start Visit Timer
                        </button>
                      </div>

                      {/* STRUCTURED 5-STAR CUSTOMER FEEDBACK FORM */}
                      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: '#fbbf24', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>
                          2. Post-Visit Structured 5-Star Feedback & Intent
                        </h4>

                        <div>
                          <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Purchase Intent Tier:</label>
                          <select value={visitFeedbackIntent} onChange={(e) => setVisitFeedbackIntent(e.target.value as any)} style={{ width: '100%', background: '#1e293b', color: '#ef4444', fontWeight: '900', border: '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                            <option value="HOT">🔥 HOT Priority (Immediate Negotiation)</option>
                            <option value="WARM">⚡ WARM Priority (Follow-up in 3 Days)</option>
                            <option value="COLD">❄️ COLD Priority (Re-engage Later)</option>
                            <option value="NOT_INTERESTED">🔴 NOT INTERESTED (Log Lost Reason)</option>
                          </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Layout Rating (1-5):</label>
                            <select value={visitFeedbackRating} onChange={(e) => setVisitFeedbackRating(Number(e.target.value))} style={{ width: '100%', background: '#1e293b', color: '#fbbf24', fontWeight: '900', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.85rem' }}>
                              <option value="5">⭐⭐⭐⭐⭐ (5/5 Excellent)</option>
                              <option value="4">⭐⭐⭐⭐ (4/5 Very Good)</option>
                              <option value="3">⭐⭐⭐ (3/5 Average)</option>
                              <option value="2">⭐⭐ (2/5 Poor)</option>
                            </select>
                          </div>
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Location Rating (1-5):</label>
                            <select style={{ width: '100%', background: '#1e293b', color: '#fbbf24', fontWeight: '900', border: '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.85rem' }}>
                              <option value="5">⭐⭐⭐⭐⭐ (5/5 Prime)</option>
                              <option value="4">⭐⭐⭐⭐ (4/5 Good)</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Field Executive Comments & Observations:</label>
                          <textarea rows={3} defaultValue="Customer liked 14th floor pool view flat. Husband requested ₹2,00,000 discount negotiation with Team Lead." style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', resize: 'vertical' }} />
                        </div>

                        <button onClick={() => alert('📝 Feedback Recorded Successfully! Site Visit marked COMPLETED and Negotiation task created.')} style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}>
                          📝 Complete Visit & Submit Structured Feedback
                        </button>
                      </div>

                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 1: AI SMART MATCHING ENGINE & AUTOMATIC PROPERTY SEARCH */}
              {activeCustomerSubTab === 'smart_matching_engine' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* ADVANCED CUSTOMER SEARCH & REQUIREMENT FILTER PANEL */}
                  <div style={{ background: '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Users size={22} color="#38bdf8" />
                        <div>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>SELECT CUSTOMER REQUIREMENT FOR AUTOMATIC PROPERTY MATCHING</h3>
                          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>Search customers by ID, Name, Mobile or filter by Locality, BHK & Priority to run real-time matching.</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <button onClick={() => setShowAdvCustFilters(!showAdvCustFilters)} style={{ background: showAdvCustFilters ? '#0284c7' : '#0f172a', color: '#ffffff', border: '1px solid #334155', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Filter size={14} /> {showAdvCustFilters ? 'Hide Filters' : '🔍 Advanced Filters'}
                        </button>
                        <select value={selectedCust.id} onChange={(e) => { const c = customers.find(x => x.id === e.target.value); if (c) setSelectedCust(c); }} style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800' }}>
                          {filteredCustomersForMatching.map(c => <option key={c.id} value={c.id}>{c.name} ({c.customer_number}) — {c.configuration} | {c.preferredArea}</option>)}
                        </select>
                      </div>
                    </div>

                    {/* ADVANCED MULTI-PARAMETER FILTER CONTROLS */}
                    {showAdvCustFilters && (
                      <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '12px' }}>
                          
                          {/* INSTANT CUSTOMER SEARCH INPUT */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>🔍 Instant Customer Search (Name / ID / Mobile):</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e293b', border: '1px solid #0284c7', borderRadius: '6px', padding: '6px 10px' }}>
                              <Search size={15} color="#38bdf8" />
                              <input 
                                type="text" 
                                value={custSearchQuery} 
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setCustSearchQuery(val);
                                  if (val.trim()) {
                                    const q = val.trim().toLowerCase();
                                    const match = customers.find(c => 
                                      c.customer_number.toLowerCase().includes(q) || 
                                      c.id.toLowerCase().includes(q) ||
                                      c.name.toLowerCase().includes(q) ||
                                      c.mobile.includes(q)
                                    );
                                    if (match) {
                                      setSelectedCust(match);
                                    }
                                  }
                                }} 
                                placeholder="e.g. SRM-CUS-2026-000186, Ramesh or 98490" 
                                style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '800' }} 
                              />
                            </div>
                          </div>

                          {/* LOCALITY FILTER */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>📍 Locality Filter:</label>
                            <select value={filterLocality} onChange={(e) => setFilterLocality(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#ffffff', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.82rem' }}>
                              <option value="ALL">ALL Preferred Localities</option>
                              <option value="Kondapur">Kondapur / Gachibowli</option>
                              <option value="Financial District">Financial District</option>
                              <option value="Hitec City">Hitec City</option>
                              <option value="Madinaguda">Madinaguda</option>
                              <option value="Kokapet">Kokapet</option>
                            </select>
                          </div>

                          {/* BHK FILTER */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🏢 BHK Requirement:</label>
                            <select value={filterBhk} onChange={(e) => setFilterBhk(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#38bdf8', fontWeight: '800', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.82rem' }}>
                              <option value="ALL">ALL Configurations</option>
                              <option value="2BHK">2BHK Flat</option>
                              <option value="3BHK">3BHK Flat</option>
                              <option value="4BHK">4BHK Luxury Apartment</option>
                              <option value="Villa">Gated Villa</option>
                            </select>
                          </div>

                          {/* PRIORITY TIER FILTER */}
                          <div>
                            <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🔥 Customer Priority:</label>
                            <select value={filterPriority} onChange={(e) => setFilterPriority(e.target.value)} style={{ width: '100%', background: '#1e293b', color: '#ef4444', fontWeight: '800', border: '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.82rem' }}>
                              <option value="ALL">ALL Priority Tiers</option>
                              <option value="HOT">🔥 HOT Priority (80+ Score)</option>
                              <option value="WARM">⚡ WARM Priority (60+ Score)</option>
                              <option value="COLD">❄️ COLD Priority</option>
                            </select>
                          </div>

                        </div>

                        {/* MATCHING CUSTOMERS QUICK BADGES STRIP */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #334155', paddingTop: '10px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700' }}>Matching Customers ({filteredCustomersForMatching.length}):</span>
                            {filteredCustomersForMatching.map(c => (
                              <button key={c.id} onClick={() => setSelectedCust(c)} style={{ background: selectedCust.id === c.id ? '#0284c7' : '#1e293b', color: selectedCust.id === c.id ? '#ffffff' : '#38bdf8', border: selectedCust.id === c.id ? '1px solid #38bdf8' : '1px solid #334155', padding: '4px 10px', borderRadius: '16px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                                {c.name} ({c.customer_number})
                              </button>
                            ))}
                          </div>

                          <button onClick={() => alert(`⚡ Recalculated live AI property match ranker for ${selectedCust.name}!`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '900', cursor: 'pointer' }}>
                            ⚡ Run Real-Time AI Matcher
                          </button>
                        </div>
                      </div>
                    )}

                    {/* ACTIVE SELECTED CUSTOMER REQUIREMENT SUMMARY CARD */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER TRACKING ID</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#38bdf8' }}>{selectedCust.customer_number}</h4>
                        <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: '800' }}>{selectedCust.name}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>BUDGET RANGE</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#4ade80' }}>{selectedCust.budget}</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PREFERRED AREA</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#ffffff' }}>{selectedCust.preferredArea}</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>REQUIRED CONFIG</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#fbbf24' }}>{selectedCust.configuration}</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>INTENT SCORE</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem' }}>🔥 {selectedCust.priority} ({selectedCust.score}/100)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AUTOMATIC MATCH RANKING TABLE */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🎯 RANKED PROPERTY MATCHES FOR {selectedCust.name.toUpperCase()}</h3>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Evaluated against 5 factors: Location (25%), Budget (25%), BHK (20%), Type (15%), Facing (15%).</p>
                      </div>
                      <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '800' }}>
                        {properties.length} Available Properties Analyzed
                      </span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Select</th>
                          <th style={{ padding: '12px' }}>Property Code & Title</th>
                          <th style={{ padding: '12px' }}>Locality & Project</th>
                          <th style={{ padding: '12px' }}>BHK & Area</th>
                          <th style={{ padding: '12px' }}>Final Price</th>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Match Score</th>
                          <th style={{ padding: '12px' }}>5-Factor Match Breakdown</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties
                          .map(p => {
                            const res = calculatePropertyMatchScore(selectedCust, p);
                            return { ...p, matchTotal: res.total, breakdown: res.breakdown };
                          })
                          .sort((a, b) => b.matchTotal - a.matchTotal)
                          .map((p, idx) => {
                            const pct = p.matchTotal;
                            return (
                              <tr key={p.id} style={{ borderBottom: '1px solid #334155' }}>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <input type="checkbox" defaultChecked={idx < 2} style={{ width: '16px', height: '16px', cursor: 'pointer' }} />
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800', fontSize: '0.75rem' }}>{p.property_code}</span>
                                  <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>{p.title}</h4>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <strong style={{ color: '#ffffff' }}>{p.locality}</strong>
                                  <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{p.developer}</span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <span style={{ color: '#fbbf24', fontWeight: '800' }}>{p.configuration}</span>
                                  <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{p.carpet_area}</span>
                                </td>
                                <td style={{ padding: '12px', color: '#4ade80', fontWeight: '900', fontSize: '0.95rem' }}>
                                  {p.final_price}
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <span style={{ background: pct >= 85 ? 'rgba(34, 197, 94, 0.2)' : pct >= 70 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: pct >= 85 ? '#4ade80' : pct >= 70 ? '#fbbf24' : '#ef4444', padding: '4px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.8rem' }}>
                                    {pct >= 85 ? '🔥' : pct >= 70 ? '⚡' : '❄️'} {pct}% MATCH
                                  </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', fontSize: '0.68rem' }}>
                                    <span style={{ background: '#0f172a', border: '1px solid #334155', padding: '2px 6px', borderRadius: '4px', color: p.breakdown.loc >= 20 ? '#4ade80' : '#ef4444' }}>Loc: {p.breakdown.loc}/25</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #334155', padding: '2px 6px', borderRadius: '4px', color: p.breakdown.bud >= 20 ? '#4ade80' : p.breakdown.bud >= 15 ? '#fbbf24' : '#ef4444' }}>Bud: {p.breakdown.bud}/25</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #334155', padding: '2px 6px', borderRadius: '4px', color: p.breakdown.bhk >= 20 ? '#fbbf24' : '#ef4444' }}>BHK: {p.breakdown.bhk}/25</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #334155', padding: '2px 6px', borderRadius: '4px', color: p.breakdown.type >= 10 ? '#38bdf8' : '#ef4444' }}>Type: {p.breakdown.type}/15</span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    {/* DISPATCH ACTION TOOLBAR */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: '800' }}>2 Matched Properties Selected for {selectedCust.name}</span>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Send complete property brochure, pricing, floor plan, and location link directly to customer.</p>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button onClick={() => alert(`📲 Sent WhatsApp Property Recommendations to ${selectedCust.name} (${selectedCust.mobile})`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Share2 size={14} /> Send via WhatsApp
                        </button>
                        <button onClick={() => alert(`📧 Sent Email Portfolio to ${selectedCust.name} (${selectedCust.email})`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <FileText size={14} /> Send via Email
                        </button>
                        <button onClick={() => alert(`🔗 Generated Public Customer Share URL: https://swaramayi-crm.com/p/REC-2026-90412`)} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}>
                          🔗 Copy Public Share Link
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* 14-STAGE COMPLETE WORKFLOW CONVERSION FUNNEL BAR */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>📈 Complete 14-Stage Customer Match & Conversion Workflow Funnel</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                      {[
                        { stage: '1. CUSTOMER', count: 184, color: '#38bdf8' },
                        { stage: '2. REQUIREMENT', count: 172, color: '#38bdf8' },
                        { stage: '3. AUTO SEARCH', count: 160, color: '#38bdf8' },
                        { stage: '4. MATCH SCORE', count: 145, color: '#38bdf8' },
                        { stage: '5. SP REVIEWS', count: 138, color: '#38bdf8' },
                        { stage: '6. SP SELECTS', count: 130, color: '#38bdf8' },
                        { stage: '7. SENT TO CUS', count: 115, color: '#fbbf24' },
                        { stage: '8. CUS VIEWS', count: 98, color: '#fbbf24' },
                        { stage: '9. CUS RESPONSE', count: 82, color: '#fbbf24' },
                        { stage: '10. FOLLOW-UP', count: 65, color: '#fbbf24' },
                        { stage: '11. SITE VISIT', count: 48, color: '#4ade80' },
                        { stage: '12. NEGOTIATION', count: 28, color: '#4ade80' },
                        { stage: '13. BOOKING', count: 18, color: '#4ade80' },
                        { stage: '14. BROKERAGE', count: 18, color: '#22c55e' }
                      ].map((s, idx) => (
                        <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '10px 6px', borderRadius: '8px', textAlign: 'center' }}>
                          <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: '800' }}>{s.stage}</span>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: '900', color: s.color, marginTop: '2px' }}>{s.count}</h4>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 1: CUSTOMER MASTER VAULT */}
              {activeCustomerSubTab === 'customer_master_vault' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>👥 Central Customer Master Registry</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Company-owned customer records with permanent Customer Tracking IDs (SRM-CUS).</p>
                    </div>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Customer Tracking ID</th>
                        <th style={{ padding: '12px' }}>Full Name</th>
                        <th style={{ padding: '12px' }}>Budget Range</th>
                        <th style={{ padding: '12px' }}>Preferred Area</th>
                        <th style={{ padding: '12px' }}>Mobile</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Priority & Score</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers.map(c => (
                        <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{c.customer_number}</td>
                          <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{c.name}</td>
                          <td style={{ padding: '12px', color: '#4ade80', fontWeight: '800' }}>{c.budget}</td>
                          <td style={{ padding: '12px' }}>{c.preferredArea}</td>
                          <td style={{ padding: '12px' }}>{maskPhone(c.mobile)}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span style={{ background: c.priority === 'HOT' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: c.priority === 'HOT' ? '#ef4444' : '#fbbf24', padding: '3px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.75rem' }}>
                              🔥 {c.priority} ({c.score}/100)
                            </span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              <button onClick={() => { setSelectedCust(c); setActiveCustomerSubTab('customer_360_profile'); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>360° View</button>
                              <button onClick={() => handleStartEditCustomer(c)} style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                              <button onClick={() => alert(`🔄 Initiated Transfer Request for Customer ${c.customer_number}`)} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Transfer</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 2: CUSTOMER 360° FULL PROFILE */}
              {activeCustomerSubTab === 'customer_360_profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* PROFILE HEADER CARD */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff' }}>{selectedCust.name}</h3>
                        <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', fontFamily: 'monospace' }}>{selectedCust.customer_number}</span>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>● COMPANY OWNED ASSET</span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>Assigned Executive: <strong>Priya Nair (Sales Exec)</strong> | Team Leader: <strong>Rahul Sharma</strong></p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '8px 16px', borderRadius: '10px', fontWeight: '900', fontSize: '0.9rem' }}>🔥 PRIORITY: HOT ({selectedCust.score}/100)</span>
                    </div>
                  </div>

                  {/* 360° DATA STREAMS GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    
                    {/* CARD 1: PRIMARY PROFILE & CONTACT INFORMATION */}
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>👤 Primary Customer Details</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                        <div><span style={{ color: '#94a3b8' }}>Mobile Phone:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{maskPhone(selectedCust.mobile)}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Alternate Phone:</span> <strong style={{ color: '#ffffff', display: 'block' }}>+91 98491 *****</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Email Address:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{selectedCust.email || 'customer@example.com'}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>City & Location:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{selectedCust.preferredArea}, Hyderabad</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Budget Range:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{selectedCust.budget}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Configuration:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{selectedCust.configuration}</strong></div>
                      </div>
                    </div>

                    {/* CARD 2: LINKED ENQUIRIES & LEAD OPPORTUNITIES */}
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>📋 Linked Enquiries & Lead IDs</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.8rem' }}>SRM-LEAD-2026-001245</span>
                            <p style={{ fontSize: '0.75rem', color: '#ffffff', margin: '2px 0 0 0' }}>3BHK Luxury Flat in Kondapur</p>
                          </div>
                          <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>SITE VISIT COMPLETED</span>
                        </div>
                        <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.8rem' }}>SRM-LEAD-2026-001891</span>
                            <p style={{ fontSize: '0.75rem', color: '#ffffff', margin: '2px 0 0 0' }}>Gated Community Villa in Kokapet</p>
                          </div>
                          <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>NEGOTIATION PENDING</span>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* IMMUTABLE AUDIT ACTIVITY TIMELINE */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#ffffff' }}>📜 Immutable Customer Activity & Audit History</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { time: '17-Aug-2026 04:30 PM', action: 'Site Visit Completed', detail: 'Customer visited My Home Bhooja Unit 1402 with Priya Nair.', user: 'Priya Nair' },
                        { time: '15-Aug-2026 11:15 AM', action: 'WhatsApp Portfolio Sent', detail: 'Sent digital property brochure for Kondapur 3BHK flats.', user: 'Priya Nair' },
                        { time: '12-Aug-2026 10:00 AM', action: 'Customer Master Created', detail: 'Registered Customer Tracking ID SRM-CUS-2026-000184 via Meta Ads.', user: 'System Auto' }
                      ].map((log, idx) => (
                        <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <strong style={{ color: '#38bdf8', fontSize: '0.85rem' }}>{log.action}</strong>
                            <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: '2px 0 0 0' }}>{log.detail}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{log.time}</span>
                            <span style={{ fontSize: '0.7rem', color: '#4ade80', display: 'block', fontWeight: '700' }}>By {log.user}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* SUB-TAB 3: ANTI-LEAKAGE DETECTION & ANOMALY ALERTS ENGINE */}
              {activeCustomerSubTab === 'anti_leakage_engine' && (
                <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>🚨 SWARAMAYI ANTI-LEAKAGE & FRAUD PREVENTION SHIELD</h3>
                      <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Automated AI engine scanning 10 leakage rules to prevent off-CRM customer deals.</p>
                    </div>
                    <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                      3 HIGH RISK ANOMALIES DETECTED
                    </span>
                  </div>

                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ef4444', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Risk Level</th>
                        <th style={{ padding: '12px' }}>Customer Tracking ID</th>
                        <th style={{ padding: '12px' }}>Flagged Employee</th>
                        <th style={{ padding: '12px' }}>Leakage Rule Violation Description</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Management Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { risk: 'HIGH RISK', cust: 'SRM-CUS-2026-000184', emp: 'Amit Patel (Sales Exec)', rule: 'Rule 5: Booking detected with My Home Developer without recorded site visit.', action: 'Lock Record Access' },
                        { risk: 'HIGH RISK', cust: 'SRM-CUS-2026-000142', emp: 'Priya Nair (Sales Exec)', rule: 'Rule 1: Creation attempt of duplicate customer with existing phone +91 98490 11223.', action: 'Block & Audit' },
                        { risk: 'MEDIUM RISK', cust: 'SRM-CUS-2026-000098', emp: 'Kiran Kumar (Sales Exec)', rule: 'Rule 7: Attempted to edit primary mobile number of company customer record.', action: 'Review Change Log' }
                      ].map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: item.risk.includes('HIGH') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: item.risk.includes('HIGH') ? '#ef4444' : '#fbbf24', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.72rem' }}>
                              🔴 {item.risk}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{item.cust}</td>
                          <td style={{ padding: '12px', fontWeight: '700', color: '#ffffff' }}>{item.emp}</td>
                          <td style={{ padding: '12px', color: '#cbd5e1' }}>{item.rule}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button onClick={() => alert(`🔒 Management Lockdown executed for ${item.cust}. Account flagged for review.`)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}>
                              {item.action}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 4: LEAD TRANSFER APPROVAL QUEUE */}
              {activeCustomerSubTab === 'lead_transfer_approval' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>⚖️ Lead Transfer Approval & Audit Log</h3>
                  <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800' }}>Pending Manager Transfer Request (1)</span>
                      <p style={{ fontSize: '0.8rem', color: '#ffffff', margin: '2px 0 0 0' }}>Amit Patel requests transferring <strong>SRM-LEAD-2026-001891</strong> to Rahul Sharma.</p>
                      <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Reason: Customer requested senior manager for price negotiation.</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => alert('✅ Lead transfer approved by Manager.')} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>Approve</button>
                      <button onClick={() => alert('❌ Lead transfer rejected.')} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}>Reject</button>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 5: SCORING RULES CONFIG */}
              {activeCustomerSubTab === 'scoring_rules_config' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📊 Customer Risk Scoring Rules & Weightage Configurator</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {[
                      { factor: 'Budget Confirmed', weight: '+15 Points', color: '#4ade80' },
                      { factor: 'Phone Connected', weight: '+10 Points', color: '#4ade80' },
                      { factor: 'Property Selected', weight: '+15 Points', color: '#4ade80' },
                      { factor: 'Site Visit Completed', weight: '+20 Points', color: '#4ade80' },
                      { factor: 'Negotiation Started', weight: '+15 Points', color: '#4ade80' },
                      { factor: 'Timeline < 30 Days', weight: '+10 Points', color: '#4ade80' },
                      { factor: 'Follow-up Response', weight: '+10 Points', color: '#4ade80' },
                      { factor: 'Total Max Score', weight: '100 / 100', color: '#38bdf8' }
                    ].map((item, idx) => (
                      <div key={idx} style={{ background: '#0f172a', border: '1px solid #334155', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '800' }}>{item.factor}</span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: item.color, marginTop: '4px' }}>{item.weight}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

      {/* CREATE ADVANCED CUSTOMER MASTER MODAL */}
      {(showAddCustomerModal || showCustomerModal) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '850px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  👤 Register New Customer Master Record
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  Generates permanent Customer Tracking ID (SRM-CUS) & initial Lead ID (SRM-LEAD).
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowAddCustomerModal(false); setShowCustomerModal(false); }} />
            </div>

            {/* LIVE DUPLICATE SCANNER STATUS BANNER */}
            <div style={{ background: newCustomerForm.mobile.length >= 10 ? 'rgba(34, 197, 94, 0.15)' : '#0f172a', border: newCustomerForm.mobile.length >= 10 ? '1px solid #22c55e' : '1px solid #334155', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Search size={16} color={newCustomerForm.mobile.length >= 10 ? '#4ade80' : '#38bdf8'} />
                <span style={{ fontSize: '0.8rem', color: newCustomerForm.mobile.length >= 10 ? '#4ade80' : '#cbd5e1', fontWeight: '700' }}>
                  {newCustomerForm.mobile.length >= 10 ? `🟢 Live Duplicate Check: Mobile ${newCustomerForm.mobile} is Clean & Unclaimed!` : '🔍 Live Automated Duplicate Checker Active for Mobile & Email'}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>AUTO-DEDUP ENGINE</span>
            </div>

            <form onSubmit={handleCreateCustomerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SECTION 1: PRIMARY CONTACT & PERSONAL PROFILE */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  1. Primary Contact & Personal Information
                </h4>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                  <input type="text" value={newCustomerForm.name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })} placeholder="e.g. Dr. Ramesh Kulkarni" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Mobile Phone *</label>
                    <input type="text" value={newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, mobile: e.target.value })} placeholder="+91 98490 12345" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Alternate Mobile Phone</label>
                    <input type="text" value={newCustomerForm.alternate_mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, alternate_mobile: e.target.value })} placeholder="+91 98491 54321" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input type="email" value={newCustomerForm.email} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })} placeholder="ramesh@example.com" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City & State</label>
                    <select value={newCustomerForm.city} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, city: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi-NCR">Delhi-NCR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Residential Address</label>
                  <input type="text" value={newCustomerForm.address} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })} placeholder="Flat 402, Jubilee Hills, Road No. 36" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>

              {/* SECTION 2: PROPERTY REQUIREMENTS & FINANCIAL LIMITS */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#4ade80', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  2. Property Requirement & Budget Parameters
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Area / Locality *</label>
                    <input type="text" value={newCustomerForm.preferredArea} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, preferredArea: e.target.value })} placeholder="Kondapur / Gachibowli / Hitec City" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Type</label>
                    <select value={newCustomerForm.property_type} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, property_type: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Flat / Apartment">Flat / Apartment</option>
                      <option value="Gated Villa">Gated Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Open Plot">Open Plot</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Configuration</label>
                    <select value={newCustomerForm.configuration} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, configuration: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="1BHK">1BHK Studio</option>
                      <option value="2BHK">2BHK Flat</option>
                      <option value="3BHK">3BHK Flat</option>
                      <option value="4BHK">4BHK Luxury Apartment</option>
                      <option value="Villa">Gated Villa</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Min Budget (INR)</label>
                    <input type="text" value={newCustomerForm.budget_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_min: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Max Budget (INR)</label>
                    <input type="text" value={newCustomerForm.budget_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_max: e.target.value, budget: `${newCustomerForm.budget_min} - ${e.target.value}` })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Purchase Timeline</label>
                    <select value={newCustomerForm.purchase_timeline} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, purchase_timeline: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Immediate (< 30 Days)">Immediate (&lt; 30 Days)</option>
                      <option value="1-3 Months">1-3 Months</option>
                      <option value="3-6 Months">3-6 Months</option>
                      <option value="Investment / Resale">Investment / Resale</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Home Loan Required?</label>
                    <select value={newCustomerForm.loan_required} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, loan_required: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Yes">Yes (Bank Loan Pre-approved)</option>
                      <option value="No">No (Self-Funded / Cash)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Investment Purpose</label>
                    <select value={newCustomerForm.investment_purpose} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, investment_purpose: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Self / End Use">Self / End Use</option>
                      <option value="Rental Income Yield">Rental Income Yield</option>
                      <option value="Capital Resale Value">Capital Resale Value</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Projects / Builders</label>
                  <input type="text" value={newCustomerForm.preferred_projects} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, preferred_projects: e.target.value })} placeholder="My Home, Rajapushpa, Aparna" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>

              {/* SECTION 3: LEAD SOURCING & TEAM ASSIGNMENT */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fbbf24', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  3. Lead Acquisition Sourcing & Team Ownership
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Lead Source</label>
                    <select value={newCustomerForm.lead_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, lead_source: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Meta Ads">Meta Ads (FB/IG)</option>
                      <option value="Google Search">Google Search PPC</option>
                      <option value="Newspaper Print">Newspaper Print</option>
                      <option value="Channel Partner">Channel Partner (CP)</option>
                      <option value="Direct Referral">Direct Referral</option>
                      <option value="Walk-In Expo">Walk-In Expo</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Sub-Source Campaign</label>
                    <input type="text" value={newCustomerForm.sub_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, sub_source: e.target.value })} placeholder="Kondapur 3BHK Campaign" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Executive</label>
                    <select value={newCustomerForm.assigned_employee_id} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, assigned_employee_id: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      {users.map(u => <option key={u.id} value={u.id}>{u.full_name} ({u.role})</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Priority Tier</label>
                    <select value={newCustomerForm.priority} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, priority: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ef4444', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="HOT">🔥 HOT Priority (Score 88/100)</option>
                      <option value="WARM">⚡ WARM Priority (Score 72/100)</option>
                      <option value="COLD">❄️ COLD Priority (Score 45/100)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Special Family Requirements & Notes</label>
                    <input type="text" value={newCustomerForm.notes} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, notes: e.target.value })} placeholder="East facing Vastu, High floor required" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #334155', paddingTop: '16px' }}>
                <button type="button" onClick={() => { setShowAddCustomerModal(false); setShowCustomerModal(false); }} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer' }}>Register Customer Master Record</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CREATE ADVANCED PROPERTY MASTER INVENTORY MODAL */}
      {(showAddPropertyModal || showPropertyModal) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '850px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🏠 Register New Property Master Inventory
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  Adds property listing into central stock vault with automated property code (SRM-PROP).
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowAddPropertyModal(false); setShowPropertyModal(false); }} />
            </div>

            {/* LIVE PROPERTY CODE GENERATOR BANNER */}
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800' }}>
                  🏷️ Auto-Generated Stock Inventory Code: SRM-PROP-2026-000426
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>CENTRAL STOCK ENGINE</span>
            </div>

            <form onSubmit={handleCreatePropertySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SECTION 1: BASIC PROPERTY & PROJECT IDENTIFICATION */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  1. Basic Property & Project Identification
                </h4>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Title & Project Name *</label>
                  <input type="text" value={newPropertyForm.title} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, title: e.target.value })} placeholder="e.g. My Home Tarkshya Executive Suite" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Developer / Builder Name *</label>
                    <input type="text" value={newPropertyForm.developer} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, developer: e.target.value })} placeholder="My Home Constructions" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Locality Hub / Sector *</label>
                    <input type="text" value={newPropertyForm.locality} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, locality: e.target.value })} placeholder="Kondapur / Gachibowli" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Category Type</label>
                    <select value={newPropertyForm.property_type} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, property_type: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Flat / Apartment">Flat / Apartment</option>
                      <option value="Gated Villa">Gated Villa</option>
                      <option value="Independent House">Independent House</option>
                      <option value="Commercial Space">Commercial Space</option>
                      <option value="Open Plot">Open Plot</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>BHK Configuration</label>
                    <select value={newPropertyForm.configuration} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, configuration: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="1BHK">1BHK Studio</option>
                      <option value="2BHK">2BHK Flat</option>
                      <option value="3BHK">3BHK Flat</option>
                      <option value="4BHK">4BHK Luxury Apartment</option>
                      <option value="Villa">Gated Villa</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: AREA, FLOOR PLAN & TECHNICAL SPECIFICATIONS */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fbbf24', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  2. Area Dimensions & Architectural Specifications
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Carpet Area (Sq.Ft.) *</label>
                    <input type="text" value={newPropertyForm.carpet_area} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, carpet_area: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Super Built-up Area</label>
                    <input type="text" value={newPropertyForm.super_builtup_area} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, super_builtup_area: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Vastu Facing</label>
                    <select value={newPropertyForm.facing} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, facing: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="East Facing">East Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="West Facing">West Facing</option>
                      <option value="North-East Facing">North-East Facing</option>
                      <option value="South Facing">South Facing</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Floor Number & Total Floors</label>
                    <input type="text" value={newPropertyForm.floor_no} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, floor_no: e.target.value })} placeholder="14th Floor out of 32" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Tower / Block Name</label>
                    <input type="text" value={newPropertyForm.tower_block} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, tower_block: e.target.value })} placeholder="Tower B - Sapphire" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
              </div>

              {/* SECTION 3: COMMERCIALS, PRICING & BROKERAGE */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#4ade80', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  3. Pricing, Commercials & Brokerage Agreements
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Base Final Price (INR) *</label>
                    <input type="text" value={newPropertyForm.final_price} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, final_price: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Price per Sq.Ft.</label>
                    <input type="text" value={newPropertyForm.price_sqft} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, price_sqft: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Agreed Brokerage Fee %</label>
                    <input type="text" value={newPropertyForm.commission_pct} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, commission_pct: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#fbbf24', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Possession Status</label>
                    <select value={newPropertyForm.possession_status} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, possession_status: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction (Dec 2026)">Under Construction (Dec 2026)</option>
                      <option value="New Pre-Launch">New Pre-Launch</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Monthly Maintenance</label>
                    <input type="text" value={newPropertyForm.maintenance_monthly} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, maintenance_monthly: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Stock Inventory Status</label>
                    <select value={newPropertyForm.status} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, status: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="AVAILABLE">🟢 AVAILABLE IN STOCK</option>
                      <option value="HOLD">⚡ HOLD / RESERVED</option>
                      <option value="BOOKED">🔴 BOOKED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 4: KEYS CUSTODY & PROPERTY DESCRIPTION */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#a855f7', borderBottom: '1px solid #334155', paddingBottom: '6px' }}>
                  4. Keys Custody & Architectural Description
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Physical Keys / Custody Location</label>
                    <input type="text" value={newPropertyForm.key_custody} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, key_custody: e.target.value })} placeholder="Builder Lounge / Company Office" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Highlights & Notes</label>
                    <input type="text" value={newPropertyForm.description} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, description: e.target.value })} placeholder="Pool facing Vastu East, 3 balconies" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', borderTop: '1px solid #334155', paddingTop: '16px' }}>
                <button type="button" onClick={() => { setShowAddPropertyModal(false); setShowPropertyModal(false); }} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer' }}>Register Property Master Inventory</button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* INGEST LEAD MODAL */}
      {showLeadModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', width: '600px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>📋 Ingest New Lead Opportunity</h3>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowLeadModal(false)} />
            </div>

            <form onSubmit={handleCreateLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Lead / Customer Name *</label>
                <input type="text" value={newLeadForm.customer_name} onChange={(e) => setNewLeadForm({ ...newLeadForm, customer_name: e.target.value })} placeholder="e.g. Sumanth Varma" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Mobile Phone *</label>
                <input type="text" value={newLeadForm.mobile} onChange={(e) => setNewLeadForm({ ...newLeadForm, mobile: e.target.value })} placeholder="+91 98490 88888" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Budget Limit</label>
                <input type="text" value={newLeadForm.budget} onChange={(e) => setNewLeadForm({ ...newLeadForm, budget: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowLeadModal(false)} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '900' }}>Ingest Lead</button>
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
