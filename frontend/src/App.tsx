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
  const [activeRoleSubTab, setActiveRoleSubTab] = useState<'user_directory' | 'permission_matrix' | 'org_hierarchy' | 'approval_queue' | 'session_security'>('user_directory');
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

  // ----------------------------------------------------
  // FULL MASTER CRM DATASETS
  // ----------------------------------------------------

  // 1. Employee Directory (8 Users)
  const [users, setUsers] = useState([
    { id: 'USR-01', username: 'Rajesh Varma (Owner)', full_name: 'Rajesh Varma', email: 'rajesh.varma@swaramayi.com', mobile: '+91 98490 00001', role: 'SUPER_ADMIN', branch_name: 'Head Office', department: 'Executive Board', team_name: 'Core Management', manager_name: 'Self', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-02', username: 'Vikram Reddy (BM)', full_name: 'Vikram Reddy', email: 'vikram.reddy@swaramayi.com', mobile: '+91 98490 00002', role: 'BRANCH_MANAGER', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Branch Leadership', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-03', username: 'Rahul Sharma (TL)', full_name: 'Rahul Sharma', email: 'rahul.sharma@swaramayi.com', mobile: '+91 98490 00003', role: 'TEAM_LEAD', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team A', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-04', username: 'Priya Nair (Sales Exec)', full_name: 'Priya Nair', email: 'priya.nair@swaramayi.com', mobile: '+91 98490 00004', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team A', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-05', username: 'Srinivas Rao (Senior Exec)', full_name: 'Srinivas Rao', email: 'srinivas.rao@swaramayi.com', mobile: '+91 98490 00005', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team A', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-06', username: 'Ananya Roy (Telecaller)', full_name: 'Ananya Roy', email: 'ananya.roy@swaramayi.com', mobile: '+91 98490 00006', role: 'TELECALLER', branch_name: 'Kondapur Branch', department: 'Inside Sales', team_name: 'Telecalling Squad', manager_name: 'Rahul Sharma', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-07', username: 'Kiran Kumar (Property Mgr)', full_name: 'Kiran Kumar', email: 'kiran.k@swaramayi.com', mobile: '+91 98490 00007', role: 'PROPERTY_MANAGER', branch_name: 'Head Office', department: 'Inventory Vault', team_name: 'Property Desk', manager_name: 'Vikram Reddy', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-08', username: 'Meera Deshmukh (Accounts)', full_name: 'Meera Deshmukh', email: 'meera.d@swaramayi.com', mobile: '+91 98490 00008', role: 'ACCOUNTS', branch_name: 'Head Office', department: 'Finance & Tax', team_name: 'Accounts Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' }
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
    { role_key: 'TELECALLER', role_name: '8. TELECALLER', data_scope: 'ASSIGNED_ONLY', view: true, create: true, edit: true, delete: false, export: false, approve: false, price_change: false, owner_change: false, brokerage: false }
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
          
          {/* CATEGORY 1: MAIN DASHBOARD (BI CONTROL CENTER) */}
          {activeTab === 'main_dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>SWARAMAYI REAL ESTATE MARKETING</h2>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>ADVANCED MANAGEMENT & BUSINESS INTELLIGENCE CONTROL CENTER</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
                <div onClick={() => openDrillDown('CUSTOMERS MASTER VAULT', customers)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMERS</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffffff', marginTop: '4px' }}>{customers.length}</h3>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Click &rarr; Drill Down 360°</span>
                </div>
                <div onClick={() => openDrillDown('ACTIVE LEADS PIPELINE', customers)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ACTIVE LEADS</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#38bdf8', marginTop: '4px' }}>430</h3>
                  <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>✓ 96% Match Ranking</span>
                </div>
                <div onClick={() => openDrillDown('ACTIVE PROPERTY STOCK', properties)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ACTIVE PROPERTY STOCK</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#ffffff', marginTop: '4px' }}>2,458</h3>
                  <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>1,487 Available</span>
                </div>
                <div onClick={() => openDrillDown('RECEIVED BROKERAGE LEDGER', bookings)} style={{ background: '#1e293b', border: '1px solid #334155', padding: '16px', borderRadius: '12px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>RECEIVED BROKERAGE</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4ade80', marginTop: '4px' }}>₹9.80 Lakhs</h3>
                  <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>✓ Invoiced & Settled</span>
                </div>
              </div>
            </div>
          )}

          {/* CATEGORY 2: ROLE AND MANAGEMENT (RESTORED ALL SUB-TABS) */}
          {activeTab === 'role_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff' }}>Role & System Governance Control</h2>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Manage 15 RBAC permission matrices, employee directory, hierarchy, and security logs.</p>
                </div>
              </div>

              {/* 5 SUB-TABS */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
                <button onClick={() => setActiveRoleSubTab('user_directory')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeRoleSubTab === 'user_directory' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'user_directory' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  👥 User Directory ({users.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('permission_matrix')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeRoleSubTab === 'permission_matrix' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'permission_matrix' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔑 15 Roles Permission Matrix
                </button>
                <button onClick={() => setActiveRoleSubTab('org_hierarchy')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeRoleSubTab === 'org_hierarchy' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'org_hierarchy' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🏢 Company & Branch Hierarchy
                </button>
                <button onClick={() => setActiveRoleSubTab('approval_queue')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeRoleSubTab === 'approval_queue' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'approval_queue' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  ⚖️ Universal Approval Queue ({approvalRequests.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('session_security')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', background: activeRoleSubTab === 'session_security' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'session_security' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🚨 Active Sessions & Risk Alerts
                </button>
              </div>

              {activeRoleSubTab === 'user_directory' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>User ID</th>
                        <th style={{ padding: '12px' }}>Full Name</th>
                        <th style={{ padding: '12px' }}>Role</th>
                        <th style={{ padding: '12px' }}>Branch</th>
                        <th style={{ padding: '12px' }}>Mobile</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(u => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{u.id}</td>
                          <td style={{ padding: '12px', fontWeight: '800', color: '#ffffff' }}>{u.full_name}</td>
                          <td style={{ padding: '12px' }}><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.75rem' }}>{u.role}</span></td>
                          <td style={{ padding: '12px' }}>{u.branch_name}</td>
                          <td style={{ padding: '12px' }}>{maskPhone(u.mobile)}</td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button onClick={() => handleDeleteUser(u.id, u.username)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeRoleSubTab === 'permission_matrix' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff', marginBottom: '16px' }}>15 Roles RBAC Matrix</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '10px' }}>Role</th>
                        <th style={{ padding: '10px' }}>Scope</th>
                        <th style={{ padding: '10px' }}>View</th>
                        <th style={{ padding: '10px' }}>Create</th>
                        <th style={{ padding: '10px' }}>Edit</th>
                        <th style={{ padding: '10px' }}>Delete</th>
                        <th style={{ padding: '10px' }}>Approve</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rolePermissions.map(rp => (
                        <tr key={rp.role_key} style={{ borderBottom: '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontWeight: '800', color: '#ffffff' }}>{rp.role_name}</td>
                          <td style={{ padding: '10px', color: '#38bdf8' }}>{rp.data_scope}</td>
                          <td style={{ padding: '10px' }}><input type="checkbox" checked={rp.view} onChange={() => handleTogglePermission(rp.role_key, 'view')} /></td>
                          <td style={{ padding: '10px' }}><input type="checkbox" checked={rp.create} onChange={() => handleTogglePermission(rp.role_key, 'create')} /></td>
                          <td style={{ padding: '10px' }}><input type="checkbox" checked={rp.edit} onChange={() => handleTogglePermission(rp.role_key, 'edit')} /></td>
                          <td style={{ padding: '10px' }}><input type="checkbox" checked={rp.delete} onChange={() => handleTogglePermission(rp.role_key, 'delete')} /></td>
                          <td style={{ padding: '10px' }}><input type="checkbox" checked={rp.approve} onChange={() => handleTogglePermission(rp.role_key, 'approve')} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
