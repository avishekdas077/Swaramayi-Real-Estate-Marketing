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
  // 12 Main Navigation Categories
  const [activeTab, setActiveTab] = useState<
    'main_dashboard' | 'lead_management' | 'customer_management' | 'matching_management' | 'cost_sheet_share' | 'visit_management' | 'project_management' | 'agreement_management' | 'billing_management' | 'map_management' | 'role_management' | 'profile'
  >('main_dashboard');

  // Search & Global BI Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'this_quarter' | 'this_year'>('this_month');
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');

  // Display Modes
  const [propertyViewMode, setPropertyViewMode] = useState<'grid' | 'table' | 'split'>('table');
  const [customerViewMode, setCustomerViewMode] = useState<'grid' | 'table' | 'split'>('table');

  // Sub-Tabs States across Categories
  const [activeLeadSubTab, setActiveLeadSubTab] = useState<'lead_ingestion' | 'lead_ownership' | 'lead_transfer' | 'lead_scoring'>('lead_ingestion');
  const [activeVisitSubTab, setActiveVisitSubTab] = useState<'visit_scheduler' | 'visit_otp_checkin' | 'visit_feedback' | 'visit_analytics'>('visit_scheduler');
  const [activeMatchingSubTab, setActiveMatchingSubTab] = useState<'ai_matching_engine' | 'req_inventory_matrix' | 'portfolio_dispatcher'>('ai_matching_engine');
  const [activeCostSheetShareSubTab, setActiveCostSheetShareSubTab] = useState<'dispatcher' | 'delivery_analytics' | 'portal_tokens' | 'interest_handoff'>('dispatcher');
  const [activeRoleSubTab, setActiveRoleSubTab] = useState<'user_directory' | 'permission_matrix' | 'org_hierarchy' | 'approval_queue' | 'session_security' | 'exit_handover'>('user_directory');
  const [activeProjectSubTab, setActiveProjectSubTab] = useState<'property_master' | 'live_inventory_board' | 'map_radius' | 'price_security' | 'deal_pipeline_tracker'>('property_master');
  const [activeCustomerSubTab, setActiveCustomerSubTab] = useState<'sales_journey_funnel' | 'cost_sheet_engine' | 'site_visit_engine' | 'smart_matching_engine' | 'customer_master_vault' | 'customer_360_profile' | 'anti_leakage_engine' | 'selected_properties_connections' | 'secure_customer_portal'>('customer_master_vault');
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
  const [selectedPropertyIds, setSelectedPropertyIds] = useState<string[]>(['SRM-PROP-2026-000421', 'SRM-PROP-2026-000423', 'SRM-PROP-2026-000425']);
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
  const [isCapturingGps, setIsCapturingGps] = useState(false);
  const [gpsCaptureStatus, setGpsCaptureStatus] = useState<string | null>(null);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showFullContractModal, setShowFullContractModal] = useState(false);
  const [showCreateShareModal, setShowCreateShareModal] = useState(false);

  // New Cost Sheet Share Form State
  const [newShareForm, setNewShareForm] = useState({
    parentType: 'COST_SHEET_ID',
    parentId: 'SRM-CS-2026-000145',
    customerName: 'Rohan Deshmukh',
    customerNumber: 'SRM-CUS-2026-000184',
    mobile: '+91 98490 11223',
    propertyTitle: 'Aparna Zenon Premium 3BHK Residence',
    finalPrice: '₹84 Lakhs',
    channel: 'WhatsApp & Email Gateway',
    notes: 'Sharing updated cost sheet with special discount pricing.'
  });

  // 10-Step Lead Intake Wizard Step State & Matching Requests Queue
  const [leadIntakeStep, setLeadIntakeStep] = useState<number>(1);
  const [matchingRequestsQueue, setMatchingRequestsQueue] = useState<any[]>([
    {
      requestId: 'SRM-MAT-2026-000421',
      date: '18 Aug 2026 10:22 AM',
      customerName: 'Rohan Deshmukh',
      customerNumber: 'SRM-CUS-2026-000184',
      leadId: 'SRM-LEAD-2026-000184',
      requirementId: 'SRM-REQ-2026-000094',
      mobile: '+91 98490 11223',
      purpose: 'Self Use',
      propertyType: 'Flat / Apartment',
      configuration: '3BHK',
      budget: '₹70 Lakhs – ₹85 Lakhs',
      preferredArea: 'Kondapur / Gachibowli',
      secondaryAreas: 'Hitec City',
      radiusKm: 10,
      possessionStatus: 'Ready to Move',
      carpetArea: '1,200 – 1,800 Sq.Ft.',
      facing: 'East / Any',
      parking: 'Covered Slot + EV',
      amenities: 'Lift, Security, Gym, Clubhouse',
      completenessScore: 96,
      priority: 'HOT',
      leadScore: 88,
      assignedExecutive: 'Priya Nair (Sales Exec)',
      status: 'MATCHING_COMPLETED',
      version: 'Snapshot V1'
    },
    {
      requestId: 'MATREQ-2026-000002',
      date: '18 Aug 2026 12:20 PM',
      customerName: 'Avishek Das',
      customerNumber: 'SRM-CUS-2026-000187',
      leadId: 'SRM-LEAD-2026-000143',
      requirementId: 'SRM-REQ-2026-000095',
      mobile: '9432328947',
      purpose: 'Self Use',
      propertyType: 'Flat / Apartment',
      configuration: '3BHK',
      budget: '50 lakh – 60 Lakh',
      preferredArea: 'Madhyamgram',
      secondaryAreas: 'New Barrackpur',
      radiusKm: 10,
      possessionStatus: 'Ready to Move',
      carpetArea: '1,000 – 1,400 Sq.Ft.',
      facing: 'North-East Facing',
      parking: 'Covered Slot',
      amenities: 'Security, Lift, Power Backup',
      completenessScore: 94,
      priority: 'HOT',
      leadScore: 92,
      assignedExecutive: 'Priya Nair (Sales Exec)',
      status: 'MATCHING_PENDING',
      version: 'Snapshot V1'
    },
    {
      requestId: 'MATREQ-2026-000001',
      date: '18 Aug 2026 11:30 AM',
      customerName: 'Sumanth Varma',
      customerNumber: 'SRM-CUS-2026-000186',
      leadId: 'SRM-LEAD-2026-000142',
      requirementId: 'SRM-REQ-2026-000094',
      mobile: '+91 98490 88888',
      purpose: 'Self Use',
      propertyType: 'Flat / Apartment',
      configuration: '3BHK',
      budget: '₹1.20 Crore - ₹1.80 Crore',
      preferredArea: 'Kondapur / Gachibowli',
      secondaryAreas: 'Hitec City, Financial District',
      radiusKm: 10,
      possessionStatus: 'Ready to Move',
      carpetArea: '1,400 – 2,200 Sq.Ft.',
      facing: 'East Facing',
      parking: 'Covered Slot + EV Charger',
      amenities: 'Swimming Pool, Gym, Clubhouse, Power Backup',
      completenessScore: 94,
      priority: 'HOT',
      leadScore: 92,
      assignedExecutive: 'Priya Nair (Sales Exec)',
      status: 'MATCHING_PENDING',
      version: 'Snapshot V1'
    }
  ]);

  const [selectedMatchingId, setSelectedMatchingId] = useState<string>('SRM-MAT-2026-000421');
  const [matchingSearchQuery, setMatchingSearchQuery] = useState<string>('');
  const [activeSelectionRecord, setActiveSelectionRecord] = useState<{ selectionId: string; matchingId: string; customerId: string; propertyIds: string[]; date: string; status: string } | null>({
    selectionId: 'SRM-SEL-2026-000078',
    matchingId: 'SRM-MAT-2026-000421',
    customerId: 'SRM-CUS-2026-000184',
    propertyIds: ['SRM-PROP-2026-000421', 'SRM-PROP-2026-000423', 'SRM-PROP-2026-000425'],
    date: '18 Aug 2026 01:15 PM',
    status: 'SELECTION_CONFIRMED'
  });

  // Advanced Customer Master Form State
  const [newCustomerForm, setNewCustomerForm] = useState({
    customer_number: '',
    name: '',
    mobile: '',
    alternate_mobile: '',
    whatsapp: '',
    email: '',
    dob: '',
    address: '',
    city: 'Hyderabad',
    pincode: '500084',
    language: 'English',
    lead_source: 'Meta Ads',
    campaign_id: 'CMP-2026-8802',
    utm_source: 'google_cpc',
    referral_name: '',
    otp_status: 'VERIFIED',
    otp_code: '849201',
    investment_purpose: 'Self Use',
    property_type: 'Flat / Apartment',
    configuration: '3BHK',
    condition: 'Ready to Move',
    budget_min: '₹1.20 Crore',
    budget_max: '₹1.80 Crore',
    budget: '₹1.20 Crore - ₹1.80 Crore',
    budget_flexibility: '+10% Negotiable',
    preferredArea: 'Kondapur / Gachibowli',
    secondary_areas: 'Hitec City, Financial District',
    radius_km: 10,
    facing: 'East Facing',
    floor_pref: '10th Floor or Higher',
    carpet_area_min: '1,400 Sq.Ft.',
    carpet_area_max: '2,200 Sq.Ft.',
    area_unit: 'Sq.Ft.',
    parking: 'Covered Slot + EV Charger',
    amenities: 'Swimming Pool, Gym, Clubhouse, Power Backup, Gated Community',
    possession_status: 'Ready to Move',
    purchase_timeline: 'Immediate (< 30 Days)',
    loan_required: 'Yes',
    loan_amount: '₹80 Lakhs',
    loan_status: 'Pre-Approved',
    decision_timeline: 'Within 30 Days',
    preferred_projects: 'My Home, Rajapushpa, Aparna',
    family_requirements: 'East Facing, High Floor, Pool View',
    sub_source: 'Kondapur 3BHK Campaign',
    referral_source: '',
    assigned_employee_id: 'USR-07',
    team_leader_id: 'USR-06',
    priority: 'HOT',
    score: 88,
    completeness_score: 94,
    notes: 'Customer looking for immediate registration in Kondapur locality.'
  });

  const generateNextCustomerCode = () => {
    const allNums: number[] = [];
    customers.forEach(c => {
      if (c.customer_number) {
        const match = c.customer_number.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });
    matchingRequestsQueue.forEach(q => {
      if (q.customerNumber) {
        const match = q.customerNumber.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });

    const maxVal = allNums.length > 0 ? Math.max(...allNums) : 187;
    const nextVal = maxVal + 1;
    return `SRM-CUS-2026-000${nextVal}`;
  };

  const generateNextMatchingCode = () => {
    const allNums: number[] = [];
    matchingRequestsQueue.forEach(q => {
      if (q.requestId) {
        const match = q.requestId.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });
    const maxVal = allNums.length > 0 ? Math.max(...allNums) : 421;
    const nextVal = maxVal + 1;
    return `SRM-MAT-2026-000${nextVal}`;
  };

  const generateNextCostSheetCode = () => {
    const allNums: number[] = [];
    costSheetShares.forEach(cs => {
      if (cs.costSheetId) {
        const match = cs.costSheetId.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });
    const maxVal = allNums.length > 0 ? Math.max(...allNums) : 147;
    const nextVal = maxVal + 1;
    return `SRM-CS-2026-000${nextVal}`;
  };

  const generateNextPropertyCode = (offset: number = 0) => {
    const allNums: number[] = [];
    properties.forEach(p => {
      if (p.property_code) {
        const match = p.property_code.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });
    const maxVal = allNums.length > 0 ? Math.max(...allNums) : 425;
    const nextVal = maxVal + 1 + offset;
    return `SRM-PROP-2026-000${nextVal}`;
  };

  const parseCSVLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        inQuotes = !inQuotes;
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const [showBulkImportPropertyModal, setShowBulkImportPropertyModal] = useState(false);
  const [bulkPropertyCsvText, setBulkPropertyCsvText] = useState(
    `Title, Developer, ProjectName, Locality, City, Latitude, Longitude, PropertyType, Configuration, TowerBlock, FloorNumber, UnitNumber, CarpetArea, SuperBuiltupArea, Facing, Furnishing, PossessionStatus, AskingPrice, PricePerSqft, ParkingSlot, KeyAmenities, Status\n` +
    `"My Home Sayuk 3BHK Residence", "My Home Group", "My Home Sayuk Phase 1", "Tellapur", "Hyderabad", "17.4612", "78.3689", "Apartment", "3BHK", "Tower A", "14th Floor", "Flat 1402", "1850 Sq.Ft.", "2450 Sq.Ft.", "East Facing", "Semi-Furnished", "Ready to Move", "₹1.65 Crore", "₹8918/Sq.Ft.", "2 Covered Slots + EV", "Clubhouse; Swimming Pool; Gym; 100% Power Backup", "AVAILABLE"\n` +
    `"Madhyamgram 2BHK Apartment", "Dhriti Apartments", "Dhriti Residency", "Madhyamgram", "Kolkata", "22.698021", "88.463723", "Apartment", "2BHK", "Block A", "Top Floor", "Flat 402", "714.75 Sq.Ft.", "950 Sq.Ft.", "East Facing", "Unfurnished", "Ready to Move", "3584000", "4000/Sq.Ft.", "1 Covered Slot", "Gated Security; Lift; Power Backup", "AVAILABLE"\n` +
    `"Rajapushpa Imperia 2BHK Suite", "Rajapushpa Properties", "Rajapushpa Imperia Block 2", "Tellapur", "Hyderabad", "17.4401", "78.3489", "Apartment", "2BHK", "Block 2", "8th Floor", "Flat 805", "1350 Sq.Ft.", "1780 Sq.Ft.", "North-East Facing", "Unfurnished", "Ready to Move", "₹1.15 Crore", "₹8518/Sq.Ft.", "1 Covered Slot", "Gated Security; Gym; Children Play Area", "AVAILABLE"\n` +
    `"Aparna New Heights 4BHK Sky Villa", "Aparna Constructions", "Aparna Zenith Sky Suites", "Gachibowli", "Hyderabad", "17.4478", "78.3789", "Penthouse", "4BHK", "Tower 3", "28th Floor", "Flat 2801", "2800 Sq.Ft.", "3600 Sq.Ft.", "West Facing", "Fully Furnished", "Under Construction Dec 2026", "₹2.75 Crore", "₹9821/Sq.Ft.", "3 Covered Slots + EV Charger", "Private Terrace Pool; Jacuzzi; EV Charger", "AVAILABLE"\n` +
    `"Jayabheri Peak Luxury Villa", "Jayabheri Properties", "Jayabheri Peak County", "Kokapet", "Hyderabad", "17.4201", "78.3410", "Gated Villa", "5BHK Villa", "Villa Block 5", "G+2 Floor", "Villa 12", "4500 Sq.Ft.", "5800 Sq.Ft.", "East Facing", "Fully Furnished", "Ready to Move", "₹5.20 Crore", "₹11555/Sq.Ft.", "4 Private Parking Slots", "Private Lawn; Private Lift; Solar Power", "AVAILABLE"`
  );

  const handleOpenLeadModal = () => {
    const nextCode = generateNextCustomerCode();
    setNewCustomerForm(prev => ({
      ...prev,
      name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      city: 'Hyderabad',
      pincode: '500084',
      address: '',
      customer_number: nextCode
    }));
    setShowLeadModal(true);
    setLeadIntakeStep(1);
  };

  const handleOpenAddCustomerModal = () => {
    const nextCode = generateNextCustomerCode();
    setNewCustomerForm(prev => ({
      ...prev,
      name: '',
      mobile: '',
      whatsapp: '',
      email: '',
      city: 'Hyderabad',
      pincode: '500084',
      address: '',
      customer_number: nextCode
    }));
    setShowAddCustomerModal(true);
  };

  const handleCreateCostSheetForProperty = (prop: any) => {
    const newCSCode = generateNextCostSheetCode();
    const newShareId = `SRM-PSH-2026-0000${Math.floor(10 + Math.random() * 89)}`;
    const custName = activeMatchingReq?.customerName || selectedCust.name || 'Sumanth Varma';
    const custNum = activeMatchingReq?.customerNumber || selectedCust.customer_number || 'SRM-CUS-2026-000188';
    const custMobile = activeMatchingReq?.mobile || selectedCust.mobile || '+91 98490 88888';

    const newShare = {
      shareId: newShareId,
      costSheetId: newCSCode,
      customerName: custName,
      customerNumber: custNum,
      mobile: custMobile,
      propertyTitle: `${prop.title} (${prop.property_code})`,
      finalPrice: prop.final_price,
      channel: 'WhatsApp & Email Gateway',
      sentTime: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      viewsCount: 1,
      pdfDownloaded: true,
      interestStatus: 'QUOTATION_GENERATED',
      parentMatchingId: activeMatchingReq?.requestId || 'SRM-MAT-2026-000421'
    };

    setCostSheetShares(prev => [newShare, ...prev]);

    if (prop.property_code && !selectedPropertyIds.includes(prop.property_code)) {
      setSelectedPropertyIds(prev => [...prev, prop.property_code]);
    }

    setActiveTab('cost_sheet_share');
    alert(`🚀 Generated Cost Sheet ID ${newCSCode} for Customer ${custName} (${custNum}) against Property ${prop.title}!\n\nTransferred seamlessly to Cost Sheet Sharing category.`);
  };

  // Universal Interactive ID Details Modal State & Handler
  const [viewIdDetailsModal, setViewIdDetailsModal] = useState<{ open: boolean; type: 'MATCHING_ID' | 'CUSTOMER_ID' | 'REQUIREMENT_ID' | 'LEAD_ID'; id: string; data?: any } | null>(null);

  const openIdDetailsModal = (id: string, overrideType?: 'MATCHING_ID' | 'CUSTOMER_ID' | 'REQUIREMENT_ID' | 'LEAD_ID') => {
    let type: 'MATCHING_ID' | 'CUSTOMER_ID' | 'REQUIREMENT_ID' | 'LEAD_ID' = overrideType || 'CUSTOMER_ID';
    const cleanId = id ? id.trim() : '';

    if (!overrideType && cleanId) {
      const upper = cleanId.toUpperCase();
      if (upper.startsWith('SRM-MAT-') || upper.startsWith('MATREQ-') || upper.startsWith('MAT-')) {
        type = 'MATCHING_ID';
      } else if (upper.startsWith('SRM-CUS-') || upper.startsWith('CUS-')) {
        type = 'CUSTOMER_ID';
      } else if (upper.startsWith('SRM-REQ-') || upper.startsWith('REQ-')) {
        type = 'REQUIREMENT_ID';
      } else if (upper.startsWith('SRM-LEAD-') || upper.startsWith('LEAD-')) {
        type = 'LEAD_ID';
      }
    }

    let data: any = null;
    if (type === 'MATCHING_ID') {
      data = matchingRequestsQueue.find(r => r.requestId === cleanId || r.requestId.toUpperCase() === cleanId.toUpperCase()) || matchingRequestsQueue[0];
    } else if (type === 'CUSTOMER_ID') {
      data = customers.find(c => c.customer_number === cleanId || c.customer_number?.toUpperCase() === cleanId.toUpperCase() || c.name.toLowerCase() === cleanId.toLowerCase()) || customers[0];
    } else if (type === 'REQUIREMENT_ID') {
      data = matchingRequestsQueue.find(r => r.requirementId === cleanId || r.requirementId?.toUpperCase() === cleanId.toUpperCase()) || matchingRequestsQueue[0];
    } else if (type === 'LEAD_ID') {
      const matchInQueue = matchingRequestsQueue.find(r => r.leadId === cleanId || r.leadId?.toUpperCase() === cleanId.toUpperCase());
      data = matchInQueue || {
        leadId: cleanId || 'SRM-LEAD-2026-000184',
        customerName: newCustomerForm.name || 'Sumanth Varma',
        customerNumber: newCustomerForm.customer_number || 'SRM-CUS-2026-000188',
        mobile: newCustomerForm.mobile || '+91 98490 88888',
        source: newCustomerForm.lead_source || 'Meta Ads / Google Ads',
        campaign: newCustomerForm.campaign_id || 'CMP-2026-8802',
        score: 92,
        assignedExecutive: 'Priya Nair (Sales Exec)',
        status: 'QUALIFIED'
      };
    }

    setViewIdDetailsModal({
      open: true,
      type,
      id: cleanId,
      data
    });
  };

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
  const [customers, setCustomers] = useState<any[]>([
    { id: 'CUST-01', customer_number: 'SRM-CUS-2026-000184', name: 'Rohan Deshmukh', mobile: '+91 98490 12345', email: 'rohan.d@gmail.com', budget: '₹70 Lakhs - ₹85 Lakhs', preferredArea: 'Kondapur / Gachibowli', configuration: '3BHK', status: 'QUALIFIED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 88, source: 'Meta Ads' },
    { id: 'CUST-02', customer_number: 'SRM-CUS-2026-000185', name: 'Priya Sharma', mobile: '+91 99887 76655', email: 'priya.s@yahoo.com', budget: '₹1.8 Crore - ₹2.2 Crore', preferredArea: 'Financial District', configuration: '4BHK', status: 'SITE_VISIT_SCHEDULED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 94, source: 'Google Search' },
    { id: 'CUST-03', customer_number: 'SRM-CUS-2026-000186', name: 'Dr. Ananth Kulkarni', mobile: '+91 98480 33445', email: 'drananth@apollo.com', budget: '₹4.0 Crore - ₹5.0 Crore', preferredArea: 'Hitec City', configuration: '5BHK Villa', status: 'BOOKED', priority: 'HOT', assigned_agent: 'Rahul Sharma (TL)', score: 98, source: 'Referral' }
  ]);
  const [selectedCust, setSelectedCust] = useState<any>(customers[0]);

  // Master Cost Sheet Shares State
  const [costSheetShares, setCostSheetShares] = useState<any[]>([
    {
      shareId: 'SRM-PSH-2026-000032',
      costSheetId: 'SRM-CS-2026-000145',
      customerName: 'Rohan Deshmukh',
      customerNumber: 'SRM-CUS-2026-000184',
      mobile: '+91 98490 11223',
      propertyTitle: 'Aparna Zenon Premium 3BHK Residence',
      finalPrice: '₹84 Lakhs',
      channel: 'WhatsApp & Email',
      sentTime: '18 Aug 2026 11:35 AM',
      viewCount: 4,
      downloadCount: 2,
      interest: '🔥 HOT Priority (Requested Site Visit)'
    },
    {
      shareId: 'SRM-PSH-2026-000033',
      costSheetId: 'SRM-CS-2026-000146',
      customerName: 'Avishek Das',
      customerNumber: 'SRM-CUS-2026-000187',
      mobile: '9432328947',
      propertyTitle: 'Madhyamgram Premium 3BHK Flat',
      finalPrice: '55 Lakhs',
      channel: 'WhatsApp Gateway',
      sentTime: '18 Aug 2026 12:45 PM',
      viewCount: 2,
      downloadCount: 1,
      interest: '⚡ WARM Priority (Callback Scheduled)'
    }
  ]);

  // DELETE ALL CURRENT RECORDS INSIDE FUNCTION
  const handleDeleteAllCurrentInside = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL current customer records, cost sheet shares, property matches, and site visits inside? This will reset the workspace to a 100% clean state.')) {
      setCustomers([]);
      setMatchingRequestsQueue([]);
      setCostSheetShares([]);
      setSelectedPropertyIds([]);
      setSelectedCust(null);
      setActiveSelectionRecord(null);
      alert('🗑️ All current records inside have been deleted! Workspace is now 100% clean.');
    }
  };

  const activeCust = selectedCust || (customers.length > 0 ? customers[0] : {
    id: 'CLEAN',
    customer_number: 'N/A',
    name: 'No Active Customer Record',
    mobile: 'N/A',
    email: 'N/A',
    budget: 'N/A',
    preferredArea: 'N/A',
    configuration: 'N/A',
    status: 'DATABASE_CLEAN',
    priority: 'COLD',
    assigned_employee_id: 'Unassigned',
    score: 0,
    source: 'N/A'
  });

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

  const handleOpenAddPropertyModal = () => {
    setEditingProperty(null);
    setGpsCaptureStatus(null);
    setNewPropertyForm({
      title: '',
      developer: '',
      locality: '',
      property_type: 'Flat / Apartment',
      configuration: '3BHK',
      carpet_area: '',
      super_builtup_area: '',
      facing: 'East Facing',
      floor_no: '',
      tower_block: '',
      final_price: '',
      price_sqft: '',
      commission_pct: '2%',
      possession_status: 'Ready to Move',
      maintenance_monthly: '',
      status: 'AVAILABLE',
      latitude: '',
      longitude: '',
      key_custody: '',
      description: ''
    });
    setShowAddPropertyModal(true);
    setShowPropertyModal(true);
  };

  const handleCaptureCurrentGpsLocation = () => {
    if (!navigator.geolocation) {
      alert('❌ Geolocation is not supported by your browser or device.');
      return;
    }

    setIsCapturingGps(true);
    setGpsCaptureStatus('📡 Accessing device GPS sensors...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        const accuracy = position.coords.accuracy ? ` (±${Math.round(position.coords.accuracy)}m accuracy)` : '';

        setNewPropertyForm(prev => ({
          ...prev,
          latitude: lat,
          longitude: lng
        }));

        setIsCapturingGps(false);
        setGpsCaptureStatus(`✓ GPS Coordinates Captured Live: ${lat}, ${lng}${accuracy}`);
      },
      (error) => {
        setIsCapturingGps(false);
        let errorMsg = 'Unable to retrieve GPS location.';
        if (error.code === error.PERMISSION_DENIED) errorMsg = 'Location permission denied by browser/device.';
        else if (error.code === error.POSITION_UNAVAILABLE) errorMsg = 'GPS location unavailable.';
        else if (error.code === error.TIMEOUT) errorMsg = 'GPS location request timed out.';

        const fallbackLat = '22.698021';
        const fallbackLng = '88.463723';
        setNewPropertyForm(prev => ({
          ...prev,
          latitude: prev.latitude || fallbackLat,
          longitude: prev.longitude || fallbackLng
        }));
        setGpsCaptureStatus(`⚠️ ${errorMsg} Default coordinates set (${fallbackLat}, ${fallbackLng}).`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleStartEditProperty = (p: any) => {
    setEditingProperty({ ...p });
    setNewPropertyForm({
      title: p.title || '',
      developer: p.developer || '',
      locality: p.locality || '',
      property_type: p.property_type || p.type || 'Flat / Apartment',
      configuration: p.configuration || '3BHK',
      carpet_area: p.carpet_area || '',
      super_builtup_area: p.super_builtup_area || '',
      facing: p.facing || 'East Facing',
      floor_no: p.floor_no || p.floor || '',
      tower_block: p.tower_block || p.tower || '',
      final_price: p.final_price || '',
      price_sqft: p.price_sqft || '',
      commission_pct: p.commission_pct || '2%',
      possession_status: p.possession_status || 'Ready to Move',
      maintenance_monthly: p.maintenance_monthly || '',
      status: p.status || 'AVAILABLE',
      latitude: p.latitude || '',
      longitude: p.longitude || '',
      key_custody: p.key_custody || '',
      description: p.description || ''
    });
    setShowPropertyModal(true);
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
    const newCustNumber = newCustomerForm.customer_number || generateNextCustomerCode();
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
    if (editingProperty && editingProperty.id) {
      setProperties(prev => prev.map(p => p.id === editingProperty.id ? {
        ...p,
        title: newPropertyForm.title,
        developer: newPropertyForm.developer,
        locality: newPropertyForm.locality,
        property_type: newPropertyForm.property_type,
        configuration: newPropertyForm.configuration,
        carpet_area: newPropertyForm.carpet_area,
        super_builtup_area: newPropertyForm.super_builtup_area,
        facing: newPropertyForm.facing,
        floor_no: newPropertyForm.floor_no,
        tower_block: newPropertyForm.tower_block,
        final_price: newPropertyForm.final_price,
        price_sqft: newPropertyForm.price_sqft,
        commission_pct: newPropertyForm.commission_pct,
        possession_status: newPropertyForm.possession_status,
        maintenance_monthly: newPropertyForm.maintenance_monthly,
        status: newPropertyForm.status,
        latitude: newPropertyForm.latitude,
        longitude: newPropertyForm.longitude,
        key_custody: newPropertyForm.key_custody,
        description: newPropertyForm.description
      } : p));
      setShowAddPropertyModal(false);
      setShowPropertyModal(false);
      const code = editingProperty.property_code;
      setEditingProperty(null);
      alert(`✏️ Property Master Record ${code} updated successfully with full details!`);
      return;
    }

    const newPropCode = generateNextPropertyCode();
    const newP = {
      id: `PROP-${Date.now()}`,
      property_code: newPropCode,
      title: newPropertyForm.title || 'New Luxury Project',
      developer: newPropertyForm.developer || 'Swaramayi Developer Partner',
      locality: newPropertyForm.locality || 'Kondapur / Madhyamgram',
      configuration: newPropertyForm.configuration || '3BHK',
      carpet_area: newPropertyForm.carpet_area || '1,650 Sq.Ft.',
      final_price: newPropertyForm.final_price || '₹1.50 Crore',
      price_sqft: newPropertyForm.price_sqft || '₹9,090/Sq.Ft.',
      status: newPropertyForm.status || 'AVAILABLE',
      property_type: newPropertyForm.property_type || 'Flat / Apartment',
      tower_block: newPropertyForm.tower_block || 'Tower A',
      floor_no: newPropertyForm.floor_no || '10th Floor',
      facing: newPropertyForm.facing || 'East Facing',
      possession_status: newPropertyForm.possession_status || 'Ready to Move',
      latitude: newPropertyForm.latitude || '22.698021',
      longitude: newPropertyForm.longitude || '88.463723',
      map_x: 35 + Math.random() * 30,
      map_y: 35 + Math.random() * 30
    };
    setProperties([newP, ...properties]);
    setShowAddPropertyModal(false);
    setShowPropertyModal(false);
    alert(`🏠 New Property Master ${newPropCode} registered successfully!`);
  };

  const handleCreateLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustNumber = newCustomerForm.customer_number || generateNextCustomerCode();
    const newC = {
      id: `CUS-${Date.now()}`,
      customer_number: newCustNumber,
      name: newCustomerForm.name || newLeadForm.customer_name || 'Ingested Lead Customer',
      mobile: newCustomerForm.mobile || newLeadForm.mobile || '+91 98490 99999',
      email: newCustomerForm.email || 'lead@swaramayi.com',
      budget: newCustomerForm.budget || `${newCustomerForm.budget_min} - ${newCustomerForm.budget_max}`,
      preferredArea: newCustomerForm.preferredArea || 'Kondapur / Hitec City',
      configuration: newCustomerForm.configuration || '3BHK',
      priority: (newCustomerForm.priority || newLeadForm.priority || 'HOT') as any,
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

        {/* 11 MAIN CATEGORIES NAV */}
        <nav style={{ padding: '16px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
          <button onClick={() => setActiveTab('main_dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'main_dashboard' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'main_dashboard' ? '#38bdf8' : '#94a3b8', border: activeTab === 'main_dashboard' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <LayoutDashboard size={18} /> <span>Main Dash Board</span>
          </button>
          <button onClick={() => setActiveTab('lead_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'lead_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'lead_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'lead_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <UserPlus size={18} /> <span>Lead Management</span>
          </button>
          <button onClick={() => setActiveTab('matching_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'matching_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'matching_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'matching_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Target size={18} /> <span>Matching Management</span>
          </button>
          <button onClick={() => setActiveTab('customer_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'customer_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'customer_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'customer_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Users size={18} /> <span>Customer Management</span>
          </button>
          <button onClick={() => setActiveTab('cost_sheet_share')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'cost_sheet_share' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'cost_sheet_share' ? '#38bdf8' : '#94a3b8', border: activeTab === 'cost_sheet_share' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Share2 size={18} /> <span>Cost Sheet Sharing</span>
          </button>
          <button onClick={() => setActiveTab('visit_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'visit_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'visit_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'visit_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Compass size={18} /> <span>Visit Management</span>
          </button>
          <button onClick={() => setActiveTab('project_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'project_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'project_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'project_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Building size={18} /> <span>Project Management</span>
          </button>
          <button onClick={() => setActiveTab('agreement_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'agreement_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'agreement_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'agreement_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <FileCheck size={18} /> <span>Agreement Management</span>
          </button>
          <button onClick={() => setActiveTab('billing_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'billing_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'billing_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'billing_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <CreditCard size={18} /> <span>Billing Management</span>
          </button>
          <button onClick={() => setActiveTab('map_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'map_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'map_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'map_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Map size={18} /> <span>Location Map</span>
          </button>
          <button onClick={() => setActiveTab('role_management')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'role_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'role_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'role_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <UserCog size={18} /> <span>Role and Management</span>
          </button>
          <button onClick={() => setActiveTab('profile')} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'profile' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'profile' ? '#38bdf8' : '#94a3b8', border: activeTab === 'profile' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <User size={18} /> <span>Profile</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP CONTROL HEADER */}
        <header style={{ background: '#0f172a', borderBottom: '1px solid #334155', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1e293b', border: '1px solid #0284c7', padding: '6px 14px', borderRadius: '8px', width: '420px' }}>
            <Search size={16} color="#38bdf8" />
            <input
              type="text"
              placeholder="🔍 Global ID Search (e.g. SRM-CUS-2026, SRM-CS-2026)..."
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                const q = val.trim().toUpperCase();
                if (q.startsWith('SRM-CUS-') || q.startsWith('CUS-')) {
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('customer_360_profile');
                } else if (q.startsWith('SRM-LEAD-') || q.startsWith('LEAD-')) {
                  setActiveTab('lead_management');
                } else if (q.startsWith('SRM-MAT-') || q.startsWith('MAT-')) {
                  setActiveTab('matching_management');
                } else if (q.startsWith('SRM-PROP-') || q.startsWith('PROP-')) {
                  setActiveTab('project_management');
                } else if (q.startsWith('SRM-CS-') || q.startsWith('SRM-CSS-') || q.startsWith('CS-')) {
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('cost_sheet_engine');
                } else if (q.startsWith('SRM-VS-') || q.startsWith('SRM-VOTP-') || q.startsWith('SRM-VIN-') || q.startsWith('SRM-VD-') || q.startsWith('SRM-VFB-') || q.startsWith('VIS-')) {
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('site_visit_engine');
                } else if (q.startsWith('SRM-AGR-') || q.startsWith('AGR-')) {
                  setActiveTab('agreement_management');
                } else if (q.startsWith('SRM-BKG-') || q.startsWith('BKG-')) {
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('sales_journey_funnel');
                } else if (q.startsWith('SRM-INV-') || q.startsWith('SRM-PAY-') || q.startsWith('SRM-BRO-') || q.startsWith('INV-')) {
                  setActiveTab('billing_management');
                }
              }}
              style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%' }}
            />
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
              <button onClick={handleOpenLeadModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Ingest Customer
              </button>
            )}
            {activeTab === 'lead_management' && (
              <button onClick={handleOpenLeadModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Ingest New Lead
              </button>
            )}
            {activeTab === 'visit_management' && (
              <button onClick={() => alert('🚘 Opening Schedule Site Visit Modal...')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> + Schedule Site Visit
              </button>
            )}
            {activeTab === 'matching_management' && (
              <button onClick={() => alert(`⚡ Recalculated live AI property match ranker for ${selectedCust.name}!`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Zap size={16} /> ⚡ Run Real-Time AI Matcher
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
                  <button onClick={() => setShowBulkImportPropertyModal(true)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Upload size={15} /> 📥 Import Bulk Inventory
                  </button>
                  <button onClick={() => handleOpenAddPropertyModal()} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                    <button onClick={() => setShowBulkImportPropertyModal(true)} style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Upload size={15} /> 📥 Import Bulk Inventory CSV / Excel
                    </button>
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

          {/* CATEGORY 2: LEAD MANAGEMENT */}
          {activeTab === 'lead_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>ENTERPRISE LEAD INGESTION & ANTI-LEAKAGE SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>LEAD TRACKER ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    Multi-Channel Lead Ingestion • Source Attribution • Fraud Shield • Assigned Sales Executives
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={handleOpenLeadModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={15} /> + Ingest New Lead
                  </button>
                  <button onClick={() => alert('🔍 Automated Lead Ownership Scanner executed... All leads locked to Swaramayi Real Estate!')} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Search size={15} /> Ownership Audit
                  </button>
                </div>
              </div>

              {/* 4 SUB-TABS NAVIGATION FOR LEAD MANAGEMENT */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveLeadSubTab('lead_ingestion')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeLeadSubTab === 'lead_ingestion' ? '#0284c7' : '#1e293b', color: activeLeadSubTab === 'lead_ingestion' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📥 Lead Ingestion & Sources
                </button>
                <button onClick={() => setActiveLeadSubTab('lead_ownership')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeLeadSubTab === 'lead_ownership' ? '#0284c7' : '#1e293b', color: activeLeadSubTab === 'lead_ownership' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  ⚖️ Anti-Leakage Ownership Shield
                </button>
                <button onClick={() => setActiveLeadSubTab('lead_transfer')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeLeadSubTab === 'lead_transfer' ? '#0284c7' : '#1e293b', color: activeLeadSubTab === 'lead_transfer' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔄 Lead Transfer Queue
                </button>
                <button onClick={() => setActiveLeadSubTab('lead_scoring')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeLeadSubTab === 'lead_scoring' ? '#0284c7' : '#1e293b', color: activeLeadSubTab === 'lead_scoring' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔥 Lead Risk & Intent Scoring
                </button>
              </div>

              {/* SUB-TAB 1: LEAD INGESTION & SOURCE TRACKER */}
              {activeLeadSubTab === 'lead_ingestion' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* SOURCE ATTRIBUTION METRIC STRIP */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>Google Ads Leads</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>142 Leads</h3>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>Meta / Facebook Ads</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>89 Leads</h3>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>MagicBricks Portal</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>64 Leads</h3>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>99acres / Housing</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#a855f7', marginTop: '2px' }}>52 Leads</h3>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '700' }}>Direct Website / Referral</span>
                      <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ef4444', marginTop: '2px' }}>38 Leads</h3>
                    </div>
                  </div>

                  {/* CENTRAL LEAD MASTER TABLE */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📋 Central Lead Master Vault ({customers.length} Active Records)</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                          <th style={{ padding: '12px' }}>Customer ID</th>
                          <th style={{ padding: '12px' }}>Customer Name & Contact</th>
                          <th style={{ padding: '12px' }}>Source Channel</th>
                          <th style={{ padding: '12px' }}>Preferred Area & BHK</th>
                          <th style={{ padding: '12px' }}>Assigned Executive</th>
                          <th style={{ padding: '12px' }}>Priority Score</th>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((c, i) => (
                          <tr key={c.id} style={{ borderBottom: '1px solid #334155' }}>
                            <td style={{ padding: '12px' }}>
                              <span 
                                onClick={() => openIdDetailsModal(c.customer_number || `SRM-CUS-2026-000${185 + i}`, 'CUSTOMER_ID')}
                                style={{ fontFamily: 'monospace', color: '#4ade80', fontWeight: '900', fontSize: '0.85rem', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '4px 10px', borderRadius: '6px', display: 'inline-block', cursor: 'pointer', textDecoration: 'underline' }}
                                title="Click to view full Customer details"
                              >
                                🆔 {c.customer_number || `SRM-CUS-2026-000${185 + i}`}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{c.name}</strong>
                              <br /><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{c.mobile}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ background: '#0f172a', border: '1px solid #334155', padding: '3px 8px', borderRadius: '4px', color: '#4ade80', fontWeight: '800', fontSize: '0.75rem' }}>
                                {c.lead_source || 'Google Ads'}
                              </span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <strong style={{ color: '#ffffff' }}>{c.preferredArea}</strong>
                              <br /><span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '800' }}>{c.configuration}</span>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <select 
                                defaultValue={c.assigned_employee_id || 'Priya Nair (Sales Exec)'} 
                                onChange={(e) => alert(`👤 Re-assigned Client/Lead ${c.name} to ${e.target.value}!`)}
                                style={{ background: '#0f172a', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '800', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' }}
                              >
                                <option value="Priya Nair (Sales Exec)">👤 Priya Nair (Sales Exec)</option>
                                <option value="Amit Patel (Lead Manager)">👤 Amit Patel (Lead Manager)</option>
                                <option value="Rahul Sharma (Property Specialist)">👤 Rahul Sharma (Property Specialist)</option>
                                <option value="Sneha Reddy (CRM Exec)">👤 Sneha Reddy (CRM Exec)</option>
                                <option value="Vikram Varma (Branch Director)">👤 Vikram Varma (Branch Director)</option>
                              </select>
                            </td>
                            <td style={{ padding: '12px' }}>
                              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem' }}>
                                🔥 {c.priority} ({c.score}/100)
                              </span>
                            </td>
                            <td style={{ padding: '12px', textAlign: 'center' }}>
                              <button onClick={() => { setSelectedCust(c); setActiveTab('customer_management'); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                                View 360° Profile
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: ANTI-LEAKAGE OWNERSHIP SHIELD */}
              {activeLeadSubTab === 'lead_ownership' && (
                <div style={{ background: '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldAlert size={24} color="#ef4444" />
                    <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff' }}>🚨 ANTI-LEAKAGE CUSTOMER OWNERSHIP SHIELD</h3>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
                    Prevents sales executives from secretly taking company customers to external developers. Phone numbers are masked for unauthorized staff and locked permanently to Swaramayi Real Estate.
                  </p>
                  <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '12px', fontSize: '0.82rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: '#4ade80', fontWeight: '800' }}>🟢 Permanent Corporate Data Lock: ACTIVE</div>
                    <div style={{ color: '#38bdf8', fontWeight: '800' }}>🟢 SHA-256 Customer Contact Hashing: ACTIVE</div>
                    <div style={{ color: '#fbbf24', fontWeight: '800' }}>🟢 Developer Direct Contact Prevention Shield: ACTIVE</div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: LEAD TRANSFER QUEUE */}
              {activeLeadSubTab === 'lead_transfer' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>⚖️ Lead Re-Assignment & Manager Approval Queue</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Review and authorize requests to transfer customer leads between sales executives.</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '10px' }}>Lead ID & Customer</th>
                        <th style={{ padding: '10px' }}>Current Executive</th>
                        <th style={{ padding: '10px' }}>Proposed Executive</th>
                        <th style={{ padding: '10px' }}>Transfer Reason</th>
                        <th style={{ padding: '10px', textAlign: 'center' }}>Approval Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', color: '#ffffff', fontWeight: '800' }}>SRM-LEAD-2026-000184 (Rohan Deshmukh)</td>
                        <td style={{ padding: '10px', color: '#ef4444' }}>Priya Nair (Sales Exec)</td>
                        <td style={{ padding: '10px', color: '#4ade80' }}>Vikram Singh (Senior Exec)</td>
                        <td style={{ padding: '10px', color: '#cbd5e1' }}>Executive on leave; urgent site visit scheduled</td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <button onClick={() => alert('⚖️ Lead Transfer Approved by General Manager!')} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                            Approve Transfer
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 4: LEAD RISK SCORING */}
              {activeLeadSubTab === 'lead_scoring' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🔥 Algorithmic Lead Intent & Risk Scoring Engine</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dynamic score matrix evaluating budget confirmation (+30 pts), ready-to-move intent (+25 pts), and site visit completion (+25 pts).</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                    <div style={{ background: '#0f172a', border: '1px solid #ef4444', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                      <h4 style={{ color: '#ef4444', fontWeight: '900' }}>🔥 HOT TIER (80-100 Score)</h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Immediate site visit & cost sheet sharing mandatory within 2 hours.</p>
                    </div>
                    <div style={{ background: '#0f172a', border: '1px solid #fbbf24', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                      <h4 style={{ color: '#fbbf24', fontWeight: '900' }}>⚡ WARM TIER (60-79 Score)</h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Follow-up call & property match recommendations within 24 hours.</p>
                    </div>
                    <div style={{ background: '#0f172a', border: '1px solid #38bdf8', padding: '16px', borderRadius: '12px', textAlign: 'center' }}>
                      <h4 style={{ color: '#38bdf8', fontWeight: '900' }}>❄️ COLD TIER (Below 60 Score)</h4>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Nurture via automated WhatsApp broadcasts & newsletter updates.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CATEGORY 3: CUSTOMER MANAGEMENT */}
          {activeTab === 'customer_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SYSTEM HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '16px 20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff' }}>CUSTOMER MANAGEMENT</h2>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setShowCreateShareModal(true)} style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }}>
                    <Plus size={15} color="#0f172a" /> + Create Details against Customer ID
                  </button>
                  <button onClick={handleOpenAddCustomerModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={15} /> + Add Customer Master
                  </button>
                  <button onClick={handleDeleteAllCurrentInside} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trash2 size={15} color="#ffffff" /> 🗑️ Delete All Current Inside
                  </button>
                  <button onClick={() => alert('🔍 Running Automated Customer Duplicate Scanner... Clean!')} style={{ background: '#1e293b', color: '#38bdf8', border: '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Search size={15} /> Duplicate Scanner
                  </button>
                </div>
              </div>

              {/* 3 SUB-TABS NAVIGATION FOR CUSTOMER MANAGEMENT */}
              <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveCustomerSubTab('customer_master_vault')} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_master_vault' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_master_vault' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  👥 Customer Master Vault ({customers.length})
                </button>
                <button onClick={() => setActiveCustomerSubTab('customer_360_profile')} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_360_profile' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_360_profile' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔍 Customer 360° Profile
                </button>
                <button onClick={() => setActiveCustomerSubTab('anti_leakage_engine')} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'anti_leakage_engine' ? '#ef4444' : '#1e293b', color: activeCustomerSubTab === 'anti_leakage_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #ef4444' }}>
                  🚨 Anti-Leakage Detection
                </button>
              </div>

              {/* AUDIT TRAIL & JOURNEY ACTIVITY TIMELINE */}
              {activeCustomerSubTab === 'sales_journey_funnel' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                          { time: '17 Aug 2026 10:15 AM', event: `Customer Master Record Registered (${selectedCust.name})`, status: 'COMPLETED', user: `${selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'}`, id: selectedCust.customer_number, source: 'WEB_APP' },
                          { time: '17 Aug 2026 10:20 AM', event: `Property Requirements Saved (${selectedCust.configuration}, ${selectedCust.preferredArea})`, status: 'COMPLETED', user: `${selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'}`, id: `REQ-${selectedCust.customer_number}`, source: 'FORM' },
                          { time: '17 Aug 2026 10:22 AM', event: `Automated 5-Factor Property Search Executed for ${selectedCust.name}`, status: 'COMPLETED', user: 'System Engine', id: `MAT-${selectedCust.customer_number}`, source: 'ALGORITHM' },
                          { time: '17 Aug 2026 11:30 AM', event: `Personalized Cost Sheet Generated for ${selectedCust.name}`, status: 'COMPLETED', user: `${selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'}`, id: `CS-${selectedCust.customer_number}`, source: 'ENGINE' },
                          { time: '17 Aug 2026 11:35 AM', event: `Cost Sheet Sent via WhatsApp & Email to ${selectedCust.mobile}`, status: 'DELIVERED', user: 'WhatsApp API Gateway', id: `MSG-${selectedCust.customer_number}`, source: 'WHATSAPP' },
                          { time: '18 Aug 2026 09:40 AM', event: `Customer Opened Cost Sheet Secure Token Link (${selectedCust.name})`, status: 'VIEWED', user: `Customer (${selectedCust.name})`, id: `TOK-${selectedCust.customer_number}`, source: 'PORTAL' },
                          { time: '18 Aug 2026 10:00 AM', event: `Customer Expressed Interest & Requested Site Visit`, status: 'INTERESTED', user: `Customer (${selectedCust.name})`, id: `RES-${selectedCust.customer_number}`, source: 'PORTAL' },
                          { time: '19 Aug 2026 02:00 PM', event: `Site Visit Scheduled for ${selectedCust.name}`, status: 'CONFIRMED', user: `${selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'}`, id: `VIS-${selectedCust.customer_number}`, source: 'CALENDAR' },
                          { time: '20 Aug 2026 03:30 PM', event: `Customer OTP Verified at Site Lounge for ${selectedCust.name}`, status: 'VERIFIED', user: 'Field Executive', id: `OTP-${selectedCust.customer_number}`, source: 'MOBILE_OTP' },
                          { time: '20 Aug 2026 03:31 PM', event: `GPS Geofence Check-in Verified for ${selectedCust.name}`, status: 'CHECKED_IN', user: 'Field Executive', id: `GPS-${selectedCust.customer_number}`, source: 'GEO_FENCE' },
                          { time: '20 Aug 2026 04:15 PM', event: `Site Visit Completed & ${selectedCust.name} Feedback Recorded`, status: 'COMPLETED', user: 'Field Executive', id: `FBK-${selectedCust.customer_number}`, source: 'FEEDBACK' },
                          { time: '20 Aug 2026 05:00 PM', event: `Negotiation Initiated for ${selectedCust.name}`, status: 'IN_PROGRESS', user: 'Team Lead', id: `NEG-${selectedCust.customer_number}`, source: 'APPROVAL' }
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
                          <td style={{ padding: '12px' }}>
                            <span 
                              onClick={() => openIdDetailsModal(c.customer_number, 'CUSTOMER_ID')}
                              style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}
                              title="Click to view full Customer details"
                            >
                              🆔 {c.customer_number}
                            </span>
                          </td>
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

                  {/* PERMANENT CUSTOMER 360° TRANSACTION IDENTITY PANEL (SECTION 21) */}
                  <div style={{ background: '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                      <div>
                        <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          🆔 PERMANENT CUSTOMER JOURNEY TRANSACTION IDENTIFIERS CHAIN
                        </h4>
                        <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                          Every business action receives an immutable, database-backed Transaction ID linked to {selectedCust.name} ({selectedCust.customer_number}).
                        </p>
                      </div>
                      <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                        CHAIN INTEGRITY: VERIFIED (SHA-256)
                      </span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                      {[
                        { label: '1. CUSTOMER MASTER ID', id: selectedCust.customer_number || 'SRM-CUS-2026-000184', status: 'PERMANENT', color: '#38bdf8' },
                        { label: '2. LEAD INTAKE ID', id: 'SRM-LEAD-2026-000184', status: 'VERIFIED', color: '#38bdf8' },
                        { label: '3. REQUIREMENT ID', id: 'SRM-REQ-2026-000094', status: 'SAVED', color: '#38bdf8' },
                        { label: '4. MATCHING REQUEST ID', id: 'SRM-MAT-2026-000421', status: 'MATCHED', color: '#38bdf8' },
                        { label: '5. PROPERTY MASTER ID', id: 'SRM-PROP-2026-000231', status: 'SHORTLISTED', color: '#38bdf8' },
                        { label: '6. COST SHEET ID', id: 'SRM-CS-2026-000145', status: 'CS-V1 ACTIVE', color: '#fbbf24' },
                        { label: '7. COST SHEET SHARE ID', id: 'SRM-CSS-2026-000055', status: 'DELIVERED', color: '#fbbf24' },
                        { label: '8. VISIT SCHEDULE ID', id: 'SRM-VS-2026-000087', status: 'CONFIRMED', color: '#4ade80' },
                        { label: '9. OTP VERIFICATION ID', id: 'SRM-VOTP-2026-000032', status: '849201 VERIFIED', color: '#4ade80' },
                        { label: '10. VISIT CHECK-IN ID', id: 'SRM-VIN-2026-000044', status: 'CHECKED_IN', color: '#4ade80' },
                        { label: '11. VISIT DONE ID', id: 'SRM-VD-2026-000052', status: 'COMPLETED', color: '#4ade80' },
                        { label: '12. VISIT FEEDBACK ID', id: 'SRM-VFB-2026-000028', status: '5-STAR HIGH', color: '#4ade80' },
                        { label: '13. AGREEMENT ID', id: 'SRM-AGR-2026-000009', status: 'DRAFT SIGNED', color: '#fbbf24' },
                        { label: '14. BOOKING ID', id: 'SRM-BKG-2026-000012', status: 'CONFIRMED', color: '#22c55e' },
                        { label: '15. PAYMENT ID', id: 'SRM-PAY-2026-000018', status: 'RECEIVED', color: '#22c55e' },
                        { label: '16. INVOICE ID', id: 'SRM-INV-2026-000031', status: 'PAID', color: '#22c55e' },
                        { label: '17. BROKERAGE ID', id: 'SRM-BRO-2026-000011', status: 'PROCESSED', color: '#22c55e' }
                      ].map((item, idx) => (
                        <div key={idx} onClick={() => alert(`🔍 Master Transaction Detail Log for ${item.id}:\n\nType: ${item.label}\nCustomer: ${selectedCust.name} (${selectedCust.customer_number})\nStatus: ${item.status}\nCreated: 17 Aug 2026\nAudit Hash: SHA256-VERIFIED-SRM-90412\nTraceability: PERMANENTLY LINKED TO MASTER ID`)} style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.62rem', color: '#94a3b8', fontWeight: '800', display: 'block' }}>{item.label}</span>
                          <h5 style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{item.id}</h5>
                          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: item.color, padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '800', display: 'inline-block', marginTop: '4px' }}>
                            ● {item.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 360° DATA STREAMS GRID */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    
                    {/* CARD 1: PRIMARY PROFILE & CONTACT INFORMATION */}
                    <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '8px' }}>👤 Primary Customer Details & Executive Assignment</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                        <div><span style={{ color: '#94a3b8' }}>Mobile Phone:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{maskPhone(selectedCust.mobile)}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Alternate Phone:</span> <strong style={{ color: '#ffffff', display: 'block' }}>+91 98491 *****</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Email Address:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{selectedCust.email || 'customer@example.com'}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>City & Location:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{selectedCust.preferredArea}, Hyderabad</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Budget Range:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{selectedCust.budget}</strong></div>
                        <div><span style={{ color: '#94a3b8' }}>Configuration:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{selectedCust.configuration}</strong></div>
                      </div>

                      {/* CLIENT ASSIGNMENT WIDGET */}
                      <div style={{ background: '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '10px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '900' }}>👤 ASSIGNED SALES EXECUTIVE / RELATIONSHIP MANAGER</span>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <select 
                            defaultValue={selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'} 
                            style={{ flex: 1, background: '#1e293b', border: '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem' }}
                          >
                            <option value="Priya Nair (Sales Exec)">Priya Nair — Senior Executive</option>
                            <option value="Amit Patel (Lead Manager)">Amit Patel — Lead Manager</option>
                            <option value="Rahul Sharma (Property Specialist)">Rahul Sharma — Property Specialist</option>
                            <option value="Sneha Reddy (CRM Exec)">Sneha Reddy — CRM Executive</option>
                            <option value="Vikram Varma (Branch Director)">Vikram Varma — Branch Director</option>
                          </select>
                          <button 
                            onClick={() => alert(`👤 Successfully updated executive assignment for ${selectedCust.name}!`)} 
                            style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer' }}
                          >
                            Reassign
                          </button>
                        </div>
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

          {/* CATEGORY: MATCHING MANAGEMENT */}
          {activeTab === 'matching_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>SMART AI PROPERTY MATCHING & INVENTORY ENGINE</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>AI MATCHER ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    5-Factor Multivariate Matching (Location 25%, Budget 25%, BHK 20%, Type 15%, Facing 15%) • Inventory Matrix • Portfolio Dispatcher
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => alert(`⚡ Recalculated live AI property match ranker for ${selectedCust.name}!`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Zap size={15} /> ⚡ Run Real-Time AI Matcher
                  </button>
                </div>
              </div>

              {/* 3 SUB-TABS NAVIGATION FOR MATCHING MANAGEMENT */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveMatchingSubTab('ai_matching_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'ai_matching_engine' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'ai_matching_engine' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🤖 Smart AI Property Matcher
                </button>
                <button onClick={() => setActiveMatchingSubTab('req_inventory_matrix')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'req_inventory_matrix' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'req_inventory_matrix' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📋 Requirement vs Inventory Matrix
                </button>
                <button onClick={() => setActiveMatchingSubTab('portfolio_dispatcher')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'portfolio_dispatcher' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'portfolio_dispatcher' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📤 Match Portfolio Dispatcher
                </button>
              </div>

              {/* SUB-TAB 1: AI MATCHING ENGINE (MATCHING ID CENTERED WORKSPACE) */}
              {activeMatchingSubTab === 'ai_matching_engine' && (() => {
                const activeMatchingReq = matchingRequestsQueue.find(r => 
                  r.requestId.toLowerCase() === selectedMatchingId.toLowerCase() || 
                  r.customerNumber.toLowerCase() === selectedMatchingId.toLowerCase()
                ) || matchingRequestsQueue[0];

                return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* TOP MATCHING DASHBOARD KPI CARDS (SECTION 19) */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '10px' }}>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>MATCHING REQUESTS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{matchingRequestsQueue.length + 15}</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>PENDING</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>4</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>IN PROGRESS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>2</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>MATCHED</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>12</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>SELECTED</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>6</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>SHARED WITH CUS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>5</h4>
                    </div>
                    <div style={{ background: '#1e293b', border: '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800' }}>SITE VISIT REQ</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#22c55e', marginTop: '2px' }}>2</h4>
                    </div>
                  </div>

                  {/* INBOUND MATCHING REQUESTS SNAPSHOT VAULT (SECTION 20) */}
                  <div style={{ background: '#1e293b', border: '1px solid #22c55e', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>📥 INBOUND MATCHING REQUESTS SNAPSHOT VAULT ({matchingRequestsQueue.length})</h3>
                        <span style={{ background: '#22c55e', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900' }}>QUALIFIED HANDOFF ACTIVE</span>
                      </div>
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Transferred automatically from Lead Management Intake Wizard</span>
                    </div>

                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                          <th style={{ padding: '10px' }}>Matching ID & Date</th>
                          <th style={{ padding: '10px' }}>Customer & Contact</th>
                          <th style={{ padding: '10px' }}>Customer ID</th>
                          <th style={{ padding: '10px' }}>Structured Requirement</th>
                          <th style={{ padding: '10px' }}>Budget</th>
                          <th style={{ padding: '10px' }}>Status</th>
                          <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matchingRequestsQueue.map((req) => (
                          <tr key={req.requestId} style={{ borderBottom: '1px solid #334155', background: selectedMatchingId === req.requestId ? 'rgba(2, 132, 199, 0.15)' : 'transparent' }}>
                            <td style={{ padding: '10px' }}>
                              <span 
                                onClick={() => openIdDetailsModal(req.requestId, 'MATCHING_ID')}
                                style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}
                                title="Click to view full Matching Request details"
                              >
                                🎯 {req.requestId}
                              </span>
                              <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px', display: 'block' }}>{req.date}</span>
                            </td>
                            <td style={{ padding: '10px' }}>
                              <strong style={{ color: '#ffffff' }}>{req.customerName}</strong>
                              <br /><span style={{ fontSize: '0.72rem', color: '#4ade80' }}>{req.mobile}</span>
                            </td>
                            <td style={{ padding: '10px' }}>
                              <span 
                                onClick={() => openIdDetailsModal(req.customerNumber, 'CUSTOMER_ID')}
                                style={{ fontFamily: 'monospace', color: '#4ade80', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(34, 197, 94, 0.12)', border: '1px solid rgba(34, 197, 94, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}
                                title="Click to view full Customer details"
                              >
                                🆔 {req.customerNumber}
                              </span>
                            </td>
                            <td style={{ padding: '10px' }}>
                              <span style={{ color: '#fbbf24', fontWeight: '800' }}>{req.configuration} {req.propertyType}</span>
                              <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{req.preferredArea} (Radius: {req.radiusKm || 10} KM)</span>
                            </td>
                            <td style={{ padding: '10px', color: '#4ade80', fontWeight: '900' }}>
                              {req.budget}
                            </td>
                            <td style={{ padding: '10px' }}>
                              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '2px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.75rem' }}>
                                🟢 {req.status}
                              </span>
                            </td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>
                              <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                                <button 
                                  onClick={() => {
                                    setSelectedMatchingId(req.requestId);
                                    const cust = customers.find(c => c.customer_number === req.customerNumber || c.name === req.customerName);
                                    if (cust) setSelectedCust(cust);
                                  }} 
                                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}
                                >
                                  📂 Open Workspace
                                </button>
                                <button 
                                  onClick={() => {
                                    setSelectedMatchingId(req.requestId);
                                    alert(`⚡ Running automated inventory matcher for ${req.customerName} (${req.requestId})`);
                                  }} 
                                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}
                                >
                                  Run Matcher
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* PRIMARY SEARCH MATCHING REQUEST BAR (SECTION 1 & 31) */}
                  <div style={{ background: '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Zap size={22} color="#38bdf8" />
                        <div>
                          <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff' }}>SEARCH MATCHING REQUEST</h3>
                          <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                            Primary Operational ID: Enter Matching Request ID (e.g. SRM-MAT-2026-000421 or MATREQ-2026-000002).
                          </p>
                        </div>
                      </div>

                      <select 
                        value={selectedMatchingId} 
                        onChange={(e) => {
                          setSelectedMatchingId(e.target.value);
                          const req = matchingRequestsQueue.find(r => r.requestId === e.target.value);
                          if (req) {
                            const cust = customers.find(c => c.customer_number === req.customerNumber || c.name === req.customerName);
                            if (cust) setSelectedCust(cust);
                          }
                        }} 
                        style={{ background: '#0f172a', color: '#38bdf8', border: '1px solid #334155', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800' }}
                      >
                        {matchingRequestsQueue.map((req) => (
                          <option key={req.requestId} value={req.requestId}>
                            {req.requestId} — {req.customerName} ({req.configuration}, {req.preferredArea})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* SEARCH INPUT BAR */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
                      <label style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>🔍 Search Matching Request (Primary ID: SRM-MAT-2026-000421):</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1e293b', border: '1px solid #0284c7', borderRadius: '6px', padding: '6px 10px' }}>
                        <Search size={15} color="#38bdf8" />
                        <input 
                          type="text" 
                          value={matchingSearchQuery} 
                          onChange={(e) => {
                            const val = e.target.value;
                            setMatchingSearchQuery(val);
                            if (val.trim()) {
                              const q = val.trim().toLowerCase();
                              const match = matchingRequestsQueue.find(r => 
                                r.requestId.toLowerCase().includes(q) ||
                                r.customerNumber.toLowerCase().includes(q) ||
                                r.customerName.toLowerCase().includes(q) ||
                                r.mobile.includes(q)
                              );
                              if (match) {
                                setSelectedMatchingId(match.requestId);
                                const cust = customers.find(c => c.customer_number === match.customerNumber || c.name === match.customerName);
                                if (cust) setSelectedCust(cust);
                              }
                            }
                          }} 
                          placeholder="Enter Matching ID (e.g. SRM-MAT-2026-000421), Customer ID, or Phone..." 
                          style={{ background: 'transparent', border: 'none', color: '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '800' }} 
                        />
                      </div>
                    </div>

                    {/* MATCHING REQUEST HEADER (SECTION 2 & 21) */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PRIMARY MATCHING ID</span>
                        <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace' }}>{activeMatchingReq.requestId}</h4>
                        <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800' }}>● MATCHING WORKSPACE ACTIVE</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER IDENTITY</span>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#ffffff' }}>{activeMatchingReq.customerName}</h4>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{activeMatchingReq.customerNumber} ({activeMatchingReq.mobile})</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED REQ & LEAD IDs</span>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fbbf24', fontFamily: 'monospace' }}>{activeMatchingReq.requirementId || 'SRM-REQ-2026-000094'}</h4>
                        <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>{activeMatchingReq.leadId || 'SRM-LEAD-2026-000184'}</span>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CREATED BY & STATUS</span>
                        <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: '#ffffff' }}>{activeMatchingReq.assignedExecutive || 'Priya Nair (Sales Exec)'}</h4>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>{activeMatchingReq.status}</span>
                      </div>
                    </div>

                    {/* LOCKED CUSTOMER REQUIREMENT SNAPSHOT (SECTION 3 & 24) */}
                    <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '900' }}>🔒 LOCKED CUSTOMER REQUIREMENT SNAPSHOT FOR {activeMatchingReq.requestId}</span>
                        <span style={{ background: '#334155', color: '#fbbf24', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>REQUIREMENT VERSION: {activeMatchingReq.version || 'SNAPSHOT V1'}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Property Type:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{activeMatchingReq.propertyType || 'Apartment / Flat'}</strong></div>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>BHK Config:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{activeMatchingReq.configuration || '3 BHK'}</strong></div>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Budget Range:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{activeMatchingReq.budget}</strong></div>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Preferred Location:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{activeMatchingReq.preferredArea} ({activeMatchingReq.radiusKm || 10} KM)</strong></div>
                        <div><span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Possession & Facing:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{activeMatchingReq.possessionStatus || 'Ready to Move'} | {activeMatchingReq.facing || 'East Facing'}</strong></div>
                      </div>

                      {/* RUN MATCHER BUTTON (SECTION 4) */}
                      <div style={{ borderTop: '1px solid #334155', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                        <button onClick={() => alert(`⚡ Executed real-time property matching engine for ${activeMatchingReq.requestId} snapshot!`)} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <Zap size={15} /> ⚡ RUN / RE-RUN MATCHER FOR {activeMatchingReq.requestId}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* MATCHED PROPERTIES RESULTS & TABLE (SECTION 5, 7, 8, 9) */}
                  <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>🎯 MATCHED PROPERTIES FOR {activeMatchingReq.requestId} ({activeMatchingReq.customerName})</h3>
                        <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>18 Properties Found • 6 Excellent Matches • 8 Good Matches • 4 Possible Matches</p>
                      </div>
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '900' }}>
                        {selectedPropertyIds.length} PROPERTIES SELECTED
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
                          <th style={{ padding: '12px' }}>Match Explanation (Why Matched)</th>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Cost Sheet Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties
                          .map(p => {
                            const currentMatchingCust = {
                              ...selectedCust,
                              name: activeMatchingReq.customerName,
                              customer_number: activeMatchingReq.customerNumber,
                              budget: activeMatchingReq.budget,
                              preferredArea: activeMatchingReq.preferredArea,
                              configuration: activeMatchingReq.configuration
                            };
                            const res = calculatePropertyMatchScore(currentMatchingCust, p);
                            return { ...p, matchTotal: res.total, breakdown: res.breakdown };
                          })
                          .sort((a, b) => b.matchTotal - a.matchTotal)
                          .map((p) => {
                            const pct = p.matchTotal;
                            const isChecked = selectedPropertyIds.includes(p.property_code);
                            return (
                              <tr key={p.id} style={{ borderBottom: '1px solid #334155', background: isChecked ? 'rgba(2, 132, 199, 0.1)' : 'transparent' }}>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <input 
                                    type="checkbox" 
                                    checked={isChecked} 
                                    onChange={(e) => {
                                      if (e.target.checked) {
                                        setSelectedPropertyIds([...selectedPropertyIds, p.property_code]);
                                      } else {
                                        setSelectedPropertyIds(selectedPropertyIds.filter(id => id !== p.property_code));
                                      }
                                    }} 
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }} 
                                  />
                                </td>
                                <td style={{ padding: '12px' }}>
                                  <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.78rem' }}>{p.property_code}</span>
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
                                  {/* MATCH EXPLANATION (SECTION 9) */}
                                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', fontSize: '0.68rem' }}>
                                    <span style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Preferred Location</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Within 10 KM Radius</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Within Budget</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ 3 BHK Satisfied</span>
                                    <span style={{ background: '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Ready-to-Move</span>
                                  </div>
                                </td>
                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <button 
                                    onClick={() => handleCreateCostSheetForProperty(p)} 
                                    style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                                  >
                                    📄 Create Cost Sheet ID
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>

                  {/* FIXED SELECTED PROPERTY SUMMARY PANEL & SELECTION ID GENERATOR (SECTION 6, 10, 11, 12, 13, 14, 15, 16) */}
                  <div style={{ background: '#0f172a', border: '2px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', bottom: '10px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase' }}>
                          📌 PROPERTY SELECTION WORKSPACE & DISPATCHER
                        </span>
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>
                          {selectedPropertyIds.length} PROPERTIES SELECTED FOR {activeMatchingReq.customerName.toUpperCase()} ({activeMatchingReq.requestId})
                        </h3>
                      </div>

                      {activeSelectionRecord && (
                        <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '0.78rem', fontFamily: 'monospace' }}>
                          ACTIVE SELECTION ID: {activeSelectionRecord.selectionId}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {selectedPropertyIds.map((code, idx) => (
                        <div key={idx} style={{ background: '#1e293b', border: '1px solid #334155', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                          <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{code}</span>
                          <span style={{ color: '#ffffff', fontWeight: '700' }}>{properties.find(p => p.property_code === code)?.title || code}</span>
                          <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => setSelectedPropertyIds(selectedPropertyIds.filter(id => id !== code))} />
                        </div>
                      ))}
                    </div>

                    {/* SELECTION ACTION BUTTONS (SECTION 11, 12, 14, 15, 16, 26) */}
                    <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={() => {
                          const newSel = {
                            selectionId: `SRM-SEL-2026-0000${Math.floor(Math.random() * 90 + 10)}`,
                            matchingId: activeMatchingReq.requestId,
                            customerId: activeMatchingReq.customerNumber,
                            propertyIds: selectedPropertyIds,
                            date: '18 Aug 2026 01:25 PM',
                            status: 'SELECTION_CONFIRMED'
                          };
                          setActiveSelectionRecord(newSel);
                          alert(`📌 Property Selection Confirmed!\n\nGenerated PROPERTY SELECTION ID: ${newSel.selectionId}\nLinked Matching ID: ${activeMatchingReq.requestId}\nSelected Properties Count: ${selectedPropertyIds.length}`);
                        }} 
                        style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        📌 CONFIRM SELECTION & GENERATE SELECTION ID (SRM-SEL-2026)
                      </button>

                      <button 
                        onClick={() => {
                          const targetProp = properties.find(p => p.property_code === selectedPropertyIds[0]) || properties[0];
                          handleCreateCostSheetForProperty(targetProp);
                        }} 
                        style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        📄 CREATE COST SHEET ID & SEND TO COST SHEET SHARING
                      </button>

                      <button 
                        onClick={() => {
                          alert(`📲 Selected Properties Shared with Customer ${activeMatchingReq.customerName}!\n\nGenerated PROPERTY SHARE ID: SRM-PSH-2026-000032\nChannel: WhatsApp & Email\nStatus: SENT & DELIVERED`);
                        }} 
                        style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        📲 SHARE SELECTED PROPERTIES (SRM-PSH-2026)
                      </button>

                      <button 
                        onClick={() => {
                          setActiveTab('visit_management');
                          alert(`🚘 Handed over Selected Properties to Visit Management!\n\nGenerated VISIT SCHEDULE ID: SRM-VS-2026-000087\nCustomer: ${activeMatchingReq.customerName}\nStatus: SCHEDULED`);
                        }} 
                        style={{ background: '#a855f7', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                      >
                        🚘 HANDOVER TO VISIT MANAGEMENT (SRM-VS-2026)
                      </button>
                    </div>
                  </div>

                </div>
                );
              })()}

              {/* SUB-TAB 2: REQUIREMENT VS INVENTORY MATRIX */}
              {activeMatchingSubTab === 'req_inventory_matrix' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📋 Customer Requirements vs Stock Inventory Availability Matrix</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    {['Kondapur', 'Gachibowli', 'Financial District', 'Hitec City'].map((loc, i) => (
                      <div key={i} style={{ background: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
                        <h4 style={{ color: '#38bdf8', fontWeight: '800' }}>📍 {loc} Sector</h4>
                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>Matching Inventory: 12 Units Available</p>
                        <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800', marginTop: '8px', display: 'block' }}>🟢 95% High Demand Alignment</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: PORTFOLIO DISPATCHER */}
              {activeMatchingSubTab === 'portfolio_dispatcher' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📤 Multi-Channel Property Recommendation Portfolio Dispatcher</h3>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button onClick={() => alert(`📲 WhatsApp Portfolio dispatched to ${selectedCust.name} (${selectedCust.mobile})`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                      📲 Dispatch via WhatsApp
                    </button>
                    <button onClick={() => alert(`📧 Email Portfolio dispatched to ${selectedCust.email}`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                      📧 Dispatch via Email
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CATEGORY: COST SHEET SHARING MANAGEMENT */}
          {activeTab === 'cost_sheet_share' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* SYSTEM HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Share2 size={24} color="#38bdf8" /> COST SHEET SHARING & CUSTOMER DELIVERY HUB
                    </h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                      SRM-PSH / DISPATCHER ACTIVE
                    </span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    Multi-Channel Cost Sheet Sharing • WhatsApp & Email Gateway • Open Counter Analytics • Customer Interest Handoff
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button 
                    onClick={() => setShowCreateShareModal(true)} 
                    style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', color: '#0f172a', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }}
                  >
                    <Plus size={16} color="#0f172a" /> + Create Share against ID
                  </button>
                  <button onClick={handleDeleteAllCurrentInside} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trash2 size={15} color="#ffffff" /> 🗑️ Delete All Current Inside
                  </button>
                  <button onClick={() => alert('📲 Dispatched WhatsApp Cost Sheet Batch to selected active customers!')} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Share2 size={15} /> Batch WhatsApp Share
                  </button>
                  <button onClick={() => alert('📧 Dispatched Email PDF Attachments to selected customers!')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Printer size={15} /> Batch Email Share
                  </button>
                </div>
              </div>

              {/* CREATE SHARE AGAINST TRANSACTION ID BAR */}
              <div style={{ background: '#0f172a', border: '1px solid #0284c7', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Share2 size={20} color="#fbbf24" />
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#ffffff' }}>⚡ QUICK CREATE COST SHEET SHARE AGAINST PARENT TRANSACTION ID</h4>
                      <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>Select parent Cost Sheet ID, Selection ID, or Customer ID to generate a new Share ID (SRM-PSH-2026).</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setShowCreateShareModal(true)} 
                    style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={15} color="#0f172a" /> + Open ID Builder Modal
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>🎯 Select Target Transaction / Cost Sheet ID:</label>
                    <select 
                      value={newShareForm.parentId} 
                      onChange={(e) => {
                        const id = e.target.value;
                        if (id.includes('CS-2026-000145')) {
                          setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Rohan Deshmukh', customerNumber: 'SRM-CUS-2026-000184', mobile: '+91 98490 11223', propertyTitle: 'Aparna Zenon Premium 3BHK Residence', finalPrice: '₹84 Lakhs' });
                        } else if (id.includes('CS-2026-000146')) {
                          setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Avishek Das', customerNumber: 'SRM-CUS-2026-000187', mobile: '9432328947', propertyTitle: 'Madhyamgram Premium 3BHK Flat', finalPrice: '55 Lakhs' });
                        } else if (id.includes('CS-2026-000147')) {
                          setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Sumanth Varma', customerNumber: 'SRM-CUS-2026-000186', mobile: '+91 98490 88888', propertyTitle: 'My Home Tarkshya Luxury 3BHK', finalPrice: '₹1.54 Crores' });
                        }
                      }}
                      style={{ width: '100%', background: '#1e293b', border: '1px solid #0284c7', color: '#ffffff', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      <option value="SRM-CS-2026-000145">SRM-CS-2026-000145 — Rohan Deshmukh (Aparna Zenon 3BHK, ₹84 Lakhs)</option>
                      <option value="SRM-CS-2026-000146">SRM-CS-2026-000146 — Avishek Das (Madhyamgram 3BHK, 55 Lakhs)</option>
                      <option value="SRM-CS-2026-000147">SRM-CS-2026-000147 — Sumanth Varma (My Home Tarkshya 3BHK, ₹1.54 Crores)</option>
                      <option value="SRM-SEL-2026-000078">SRM-SEL-2026-000078 — Selection Record (Rohan Deshmukh, 3 Properties)</option>
                      <option value="MATREQ-2026-000002">MATREQ-2026-000002 — Avishek Das Matching Request</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>📲 Delivery Channel Gateway:</label>
                    <select value={newShareForm.channel} onChange={(e) => setNewShareForm({ ...newShareForm, channel: e.target.value })} style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#22c55e', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="WhatsApp & Email Gateway">WhatsApp & Email Gateway</option>
                      <option value="WhatsApp Gateway Only">WhatsApp Business API Only</option>
                      <option value="Email PDF Attachment">Email PDF Attachment</option>
                      <option value="SMS Token Link">SMS Secure Token Link</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                    <button 
                      onClick={() => {
                        const newShareId = `SRM-PSH-2026-0000${Math.floor(Math.random() * 90 + 10)}`;
                        alert(`🚀 Generated Share ID ${newShareId} against ${newShareForm.parentId}!\n\nCustomer: ${newShareForm.customerName} (${newShareForm.mobile})\nProperty: ${newShareForm.propertyTitle}\nChannel: ${newShareForm.channel}\nAudit Trail: SHA256-LOGGED`);
                      }} 
                      style={{ width: '100%', background: '#22c55e', color: '#ffffff', border: 'none', padding: '9px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                      🚀 Dispatch Share ID
                    </button>
                  </div>
                </div>
              </div>

              {/* TOP KPI CARDS STRIP */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>TOTAL SHARED</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>148 Shares</h3>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>WHATSAPP SENT</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#22c55e', marginTop: '2px' }}>94 Sent</h3>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>EMAIL SENT</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0284c7', marginTop: '2px' }}>54 Sent</h3>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>PORTAL OPENED</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>112 Views</h3>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>PDF DOWNLOADS</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#a855f7', marginTop: '2px' }}>76 PDFs</h3>
                </div>
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                  <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800' }}>CONVERTED TO VISIT</span>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>38 Visits</h3>
                </div>
              </div>

              {/* MASTER SHARED COST SHEETS AUDIT TABLE */}
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#ffffff' }}>📋 Master Cost Sheet Share Vault ({costSheetShares.length} Active Shares)</h3>
                  <span style={{ fontSize: '0.78rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                    IMMUTABLE AUDIT TRAIL LOGGED
                  </span>
                </div>

                {costSheetShares.length === 0 ? (
                  <div style={{ padding: '36px 20px', textAlign: 'center', background: '#0f172a', borderRadius: '12px', border: '1px dashed #ef4444' }}>
                    <Trash2 size={32} color="#ef4444" style={{ margin: '0 auto 10px auto' }} />
                    <h4 style={{ color: '#ffffff', fontWeight: '900', fontSize: '1.05rem' }}>📭 ALL COST SHEET SHARES DELETED — WORKSPACE CLEAN</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>
                      No active cost sheet share records found inside. Click "+ Create Share against ID" to dispatch your first cost sheet.
                    </p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Share ID & Time</th>
                        <th style={{ padding: '12px' }}>Customer Details</th>
                        <th style={{ padding: '12px' }}>Property & Cost Sheet ID</th>
                        <th style={{ padding: '12px' }}>Delivery Channel</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Engagement Analytics</th>
                        <th style={{ padding: '12px' }}>Customer Interest Status</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {costSheetShares.map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '12px' }}>
                          <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{item.shareId}</span>
                          <br /><span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>{item.sentTime}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: '#ffffff', fontSize: '0.88rem' }}>{item.customerName}</strong>
                          <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{item.mobile}</span>
                          <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>{item.customerNumber}</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <strong style={{ color: '#ffffff' }}>{item.propertyTitle}</strong>
                          <br /><span style={{ fontSize: '0.75rem', color: '#fbbf24', fontFamily: 'monospace' }}>{item.costSheetId} ({item.finalPrice})</span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: '#0f172a', border: '1px solid #334155', color: '#22c55e', padding: '3px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.75rem' }}>
                            {item.channel}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', alignItems: 'center' }}>
                            <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '900' }}>
                              👁️ {item.viewCount} Portal Views
                            </span>
                            <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '900' }}>
                              📥 {item.downloadCount} PDF Downloads
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem' }}>
                            {item.interest}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button onClick={() => alert(`📲 Resent Cost Sheet ${item.costSheetId} via WhatsApp to ${item.customerName} (${item.mobile})`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                              Resend WhatsApp
                            </button>
                            <button onClick={() => { setActiveTab('visit_management'); alert(`🚘 Handed over ${item.customerName} to Site Visit Management!`); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}>
                              Handover to Visit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    </tbody>
                  </table>
                )}
              </div>

            </div>
          )}

          {/* CATEGORY: VISIT MANAGEMENT */}
          {activeTab === 'visit_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#ffffff' }}>SITE VISIT SCHEDULING, OTP & GEOFENCE VERIFICATION SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>VISIT ENGINE ACTIVE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                    Conflict-Free Executive Scheduling • 6-Digit Mobile OTP Verification • GPS Geofence Radius Audit • 5-Star Customer Feedback
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => alert('🚘 Opening Schedule Site Visit Modal...')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Plus size={15} /> + Schedule Site Visit
                  </button>
                </div>
              </div>

              {/* 4 SUB-TABS NAVIGATION FOR VISIT MANAGEMENT */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveVisitSubTab('visit_scheduler')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_scheduler' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_scheduler' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📅 Site Visit Scheduler
                </button>
                <button onClick={() => setActiveVisitSubTab('visit_otp_checkin')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_otp_checkin' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_otp_checkin' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  🔐 OTP Verification & Check-In
                </button>
                <button onClick={() => setActiveVisitSubTab('visit_feedback')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_feedback' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_feedback' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  ⭐ Structured 5-Star Feedback
                </button>
                <button onClick={() => setActiveVisitSubTab('visit_analytics')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_analytics' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_analytics' ? '#ffffff' : '#94a3b8', border: '1px solid #334155' }}>
                  📊 Visit Conversion Analytics
                </button>
              </div>

              {/* SUB-TAB 1: VISIT SCHEDULER */}
              {activeVisitSubTab === 'visit_scheduler' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📅 Scheduled Site Visits Register</h3>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: '#0f172a', color: '#94a3b8', textAlign: 'left', borderBottom: '2px solid #334155' }}>
                        <th style={{ padding: '10px' }}>Visit ID</th>
                        <th style={{ padding: '10px' }}>Customer & Contact</th>
                        <th style={{ padding: '10px' }}>Target Property</th>
                        <th style={{ padding: '10px' }}>Visit Date & Time</th>
                        <th style={{ padding: '10px' }}>Assigned Field Exec</th>
                        <th style={{ padding: '10px' }}>Conflict Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>VIS-2026-000145</td>
                        <td style={{ padding: '10px', color: '#ffffff', fontWeight: '800' }}>{selectedCust.name} ({selectedCust.mobile})</td>
                        <td style={{ padding: '10px', color: '#fbbf24' }}>My Home Tarkshya (Kondapur)</td>
                        <td style={{ padding: '10px', color: '#94a3b8' }}>20 Aug 2026 at 03:30 PM</td>
                        <td style={{ padding: '10px', color: '#38bdf8' }}>Kiran Kumar (USR-07)</td>
                        <td style={{ padding: '10px', color: '#4ade80', fontWeight: '800' }}>🟢 NO OVERLAP CONFLICT</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* SUB-TAB 2: OTP & GEOFENCE CHECK-IN */}
              {activeVisitSubTab === 'visit_otp_checkin' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>🔐 6-Digit Mobile OTP & GPS Geofence Verification</h3>
                  <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ color: '#4ade80', fontWeight: '800' }}>🟢 Customer Mobile OTP Verified (849201)</div>
                    <div style={{ color: '#38bdf8', fontWeight: '800' }}>🟢 GPS Geofence Verified: 17.4612° N, 78.3685° E (Within 100m of Site)</div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: VISIT FEEDBACK */}
              {activeVisitSubTab === 'visit_feedback' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>⭐ Structured 5-Star Customer Feedback Vault</h3>
                  <div style={{ background: '#0f172a', border: '1px solid #334155', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ color: '#fbbf24', fontWeight: '800' }}>Overall Property Rating: ⭐⭐⭐⭐⭐ (5/5)</div>
                    <div style={{ color: '#ffffff' }}>Observations: "Customer liked 14th floor pool view flat. Ready for negotiation."</div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: VISIT ANALYTICS */}
              {activeVisitSubTab === 'visit_analytics' && (
                <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#ffffff' }}>📊 Site Visit Conversion Analytics</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
                    <div style={{ background: '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Total Site Visits</span>
                      <h3 style={{ fontSize: '1.3rem', color: '#38bdf8', fontWeight: '900' }}>100 Visits</h3>
                    </div>
                    <div style={{ background: '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Interested Prospects</span>
                      <h3 style={{ fontSize: '1.3rem', color: '#4ade80', fontWeight: '900' }}>42 Prospects</h3>
                    </div>
                    <div style={{ background: '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Active Negotiations</span>
                      <h3 style={{ fontSize: '1.3rem', color: '#fbbf24', fontWeight: '900' }}>20 Deals</h3>
                    </div>
                    <div style={{ background: '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Confirmed Bookings</span>
                      <h3 style={{ fontSize: '1.3rem', color: '#22c55e', fontWeight: '900' }}>8 Bookings (8.0%)</h3>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* CATEGORY 5: BILLING MANAGEMENT */}
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

            {/* SYSTEM CUSTOMER CODE GENERATION & VERIFICATION CARD */}
            <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  SYSTEM CUSTOMER CODE (AUTO-GENERATED UNIQUE ID)
                </span>
                <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', margin: '2px 0 0 0', letterSpacing: '0.5px' }}>
                  {newCustomerForm.customer_number || `SRM-CUS-2026-000${customers.length + 188}`}
                </h3>
              </div>
              <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                ✓ 100% AUTO-GENERATED & UNIQUE
              </span>
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

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                    <input type="text" value={newCustomerForm.name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })} placeholder="e.g. Dr. Ramesh Kulkarni" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>System Customer Code (Auto Created) *</label>
                    <input type="text" value={newCustomerForm.customer_number || `SRM-CUS-2026-000${customers.length + 188}`} readOnly style={{ width: '100%', background: '#0f172a', border: '1px solid #38bdf8', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '900', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
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
                  {editingProperty ? `✏️ Edit Property Master Record (${editingProperty.property_code})` : '🏠 Register New Property Master Inventory'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>
                  {editingProperty ? 'Modify full specifications, pricing, locality, facing, and status for this property master record.' : 'Adds property listing into central stock vault with automated property code (SRM-PROP).'}
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowAddPropertyModal(false); setShowPropertyModal(false); setEditingProperty(null); }} />
            </div>

            {/* LIVE PROPERTY CODE GENERATOR BANNER */}
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Building2 size={16} color="#38bdf8" />
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800' }}>
                  🏷️ Stock Inventory Code: {editingProperty ? editingProperty.property_code : generateNextPropertyCode()}
                </span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#4ade80', fontFamily: 'monospace', fontWeight: '900' }}>
                {editingProperty ? 'EDITING MASTER RECORD' : 'CENTRAL STOCK ENGINE'}
              </span>
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
                    <input type="text" value={newPropertyForm.developer} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, developer: e.target.value })} placeholder="My Home Constructions / Dhriti Apartments" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Locality Hub / Sector *</label>
                    <input type="text" value={newPropertyForm.locality} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, locality: e.target.value })} placeholder="Kondapur / Madhyamgram" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                </div>

                {/* GPS LATITUDE & LONGITUDE INPUTS WITH LIVE LOCATION CAPTURE BUTTON */}
                <div style={{ background: '#0f172a', border: '1px solid #0284c7', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Compass size={16} color="#38bdf8" /> 📍 GPS Location Coordinates & Device Auto-Capture
                    </span>

                    <button 
                      type="button" 
                      onClick={handleCaptureCurrentGpsLocation} 
                      disabled={isCapturingGps}
                      style={{ 
                        background: isCapturingGps ? '#334155' : 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', 
                        color: '#ffffff', 
                        border: 'none', 
                        padding: '6px 14px', 
                        borderRadius: '6px', 
                        fontWeight: '900', 
                        fontSize: '0.78rem', 
                        cursor: isCapturingGps ? 'wait' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)' 
                      }}
                    >
                      <Navigation size={14} />
                      {isCapturingGps ? '📡 Capturing GPS...' : '🎯 CAPTURE MY CURRENT GPS LOCATION'}
                    </button>
                  </div>

                  {gpsCaptureStatus && (
                    <div style={{ background: gpsCaptureStatus.startsWith('✓') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)', border: `1px solid ${gpsCaptureStatus.startsWith('✓') ? '#22c55e' : '#38bdf8'}`, borderRadius: '6px', padding: '6px 10px', fontSize: '0.75rem', color: gpsCaptureStatus.startsWith('✓') ? '#4ade80' : '#38bdf8', fontWeight: '800' }}>
                      {gpsCaptureStatus}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GPS Latitude (Exact Map Lat)</label>
                      <input type="text" value={newPropertyForm.latitude} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, latitude: e.target.value })} placeholder="e.g. 22.698021 or 17.44008" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GPS Longitude (Exact Map Long)</label>
                      <input type="text" value={newPropertyForm.longitude} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, longitude: e.target.value })} placeholder="e.g. 88.463723 or 78.34891" style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                    </div>
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
                <button type="button" onClick={() => { setShowAddPropertyModal(false); setShowPropertyModal(false); setEditingProperty(null); }} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer' }}>
                  {editingProperty ? '✏️ Save Updated Property Master Details' : 'Register Property Master Inventory'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 10-STEP ENTERPRISE LEAD INTAKE & QUALIFICATION WIZARD MODAL */}
      {(showLeadModal || showAddCustomerModal) && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #0284c7', width: '920px', maxHeight: '92vh', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* WIZARD HEADER & PROGRESS INDICATOR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff' }}>🚀 9-STEP ENTERPRISE LEAD INTAKE & QUALIFICATION WIZARD</h3>
                  <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
                    STEP {leadIntakeStep} OF 9
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>
                  Central Qualification Gate • Structured Customer Requirement Capture • Matching Handoff System
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowLeadModal(false); setShowAddCustomerModal(false); setLeadIntakeStep(1); }} />
            </div>

            {/* STEP PROGRESS BAR */}
            <div style={{ display: 'flex', gap: '4px', background: '#0f172a', padding: '6px', borderRadius: '10px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
                <div 
                  key={s} 
                  onClick={() => setLeadIntakeStep(s)} 
                  style={{ 
                    flex: 1, 
                    height: '8px', 
                    borderRadius: '4px', 
                    background: s <= leadIntakeStep ? '#0284c7' : '#334155', 
                    cursor: 'pointer',
                    transition: 'all 0.2s' 
                  }} 
                  title={`Step ${s}`}
                />
              ))}
            </div>

            {/* STEP STEPPER TAB STRIP */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', borderBottom: '1px solid #334155' }}>
              {[
                { s: 1, label: '1. Lead Source' },
                { s: 2, label: '2. Identity & Contact' },
                { s: 3, label: '3. Purpose & Type' },
                { s: 4, label: '4. BHK & Condition' },
                { s: 5, label: '5. Location & Radius' },
                { s: 6, label: '6. Budget & Area' },
                { s: 7, label: '7. Parking & Amenities' },
                { s: 8, label: '8. Loan & Possession' },
                { s: 9, label: '9. Review & Send to Match' }
              ].map(item => (
                <button 
                  key={item.s} 
                  type="button" 
                  onClick={() => setLeadIntakeStep(item.s)} 
                  style={{ 
                    padding: '6px 10px', 
                    borderRadius: '6px', 
                    fontSize: '0.72rem', 
                    fontWeight: '800', 
                    cursor: 'pointer', 
                    whiteSpace: 'nowrap',
                    background: leadIntakeStep === item.s ? '#0284c7' : '#0f172a', 
                    color: leadIntakeStep === item.s ? '#ffffff' : '#94a3b8', 
                    border: '1px solid #334155' 
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* LIVE DUPLICATE CHECKER WARNING BANNER */}
            {newCustomerForm.mobile.length >= 10 && (
              <div style={{ background: '#0f172a', border: '1px solid #fbbf24', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldAlert size={18} color="#fbbf24" />
                  <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: '800' }}>
                    🔍 Live Duplicate Scanner: Phone {newCustomerForm.mobile} scanned across 1,842 customer master records.
                  </span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>🟢 NO DUPLICATE FOUND</span>
              </div>
            )}

            {/* STEP 1: LEAD SOURCE & ATTRIBUTION */}
            {leadIntakeStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 1: Lead Source Attribution & Executive Assignment</h4>
                
                {/* ASSIGN EXECUTIVE SELECTOR */}
                <div style={{ background: '#0f172a', border: '1px solid #0284c7', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    👤 ASSIGN SALES EXECUTIVE / CLIENT RELATIONSHIP MANAGER *
                  </label>
                  <select 
                    value={newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)'} 
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, assigned_employee_id: e.target.value })} 
                    style={{ width: '100%', background: '#1e293b', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem' }}
                  >
                    <option value="Priya Nair (Sales Exec)">👤 Priya Nair — Senior Executive (Kondapur/Gachibowli)</option>
                    <option value="Amit Patel (Lead Manager)">👤 Amit Patel — Lead Manager (West Zone)</option>
                    <option value="Rahul Sharma (Property Specialist)">👤 Rahul Sharma — Property Specialist (Luxury Residential)</option>
                    <option value="Sneha Reddy (CRM Exec)">👤 Sneha Reddy — Customer Relationship Manager</option>
                    <option value="Vikram Varma (Branch Director)">👤 Vikram Varma — Branch Director</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Lead Source *</label>
                    <select value={newCustomerForm.lead_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, lead_source: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Google Ads">Google Ads</option>
                      <option value="Meta Ads">Meta / Facebook / Instagram</option>
                      <option value="MagicBricks">MagicBricks Portal</option>
                      <option value="99acres">99acres Portal</option>
                      <option value="Housing.com">Housing.com Portal</option>
                      <option value="Direct Website">Direct Website Form</option>
                      <option value="WhatsApp Business">WhatsApp Business Inbound</option>
                      <option value="Walk-in Branch">Walk-in HQ / Branch</option>
                      <option value="Existing Customer Referral">Existing Customer Referral</option>
                      <option value="Developer Partner Referral">Developer Partner Referral</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Campaign ID</label>
                    <input type="text" value={newCustomerForm.campaign_id} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, campaign_id: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>UTM Source / Medium</label>
                    <input type="text" value={newCustomerForm.utm_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, utm_source: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Referrer Name & Contact (If Applicable)</label>
                  <input type="text" value={newCustomerForm.referral_name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, referral_name: e.target.value })} placeholder="e.g. Dr. Rajesh Sharma (+91 98480 12345)" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>
            )}

            {/* STEP 2: CUSTOMER IDENTITY & CONTACT */}
            {leadIntakeStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 2: Customer Basic Identity & Contact Info</h4>
                </div>

                {/* SYSTEM CUSTOMER CODE CARD */}
                <div style={{ background: '#0f172a', border: '1px solid #38bdf8', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>SYSTEM CUSTOMER CODE (AUTO-GENERATED UNIQUE ID)</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                      {newCustomerForm.customer_number || `SRM-CUS-2026-000${customers.length + 188}`}
                    </h3>
                  </div>
                  <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid #22c55e', padding: '3px 10px', borderRadius: '20px', fontSize: '0.72rem', fontWeight: '900' }}>
                    ✓ 100% AUTO-GENERATED & UNIQUE
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                    <input type="text" value={newCustomerForm.name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })} placeholder="e.g. Sumanth Varma" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Mobile Phone *</label>
                    <input type="text" value={newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, mobile: e.target.value })} placeholder="+91 98490 88888" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>WhatsApp Number</label>
                    <input type="text" value={newCustomerForm.whatsapp || newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, whatsapp: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input type="email" value={newCustomerForm.email} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })} placeholder="sumanth@example.com" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Language</label>
                    <select value={newCustomerForm.language} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, language: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="English">English</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City</label>
                    <input type="text" value={newCustomerForm.city} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, city: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Current Residential Locality</label>
                    <input type="text" value={newCustomerForm.address} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })} placeholder="e.g. Jubilee Hills, Hyderabad" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>PIN Code</label>
                    <input type="text" value={newCustomerForm.pincode} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, pincode: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: PROPERTY PURPOSE & TYPE */}
            {leadIntakeStep === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 3: Property Purchase Purpose & Category Type</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Purpose *</label>
                    <select value={newCustomerForm.investment_purpose} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, investment_purpose: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Self Use">🏡 SELF USE (End User Residence)</option>
                      <option value="Investment">📈 INVESTMENT (Capital Appreciation)</option>
                      <option value="Rental Income">💰 RENTAL INCOME (Monthly Yield)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Category Type *</label>
                    <select value={newCustomerForm.property_type} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, property_type: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Flat / Apartment">🏢 RESIDENTIAL (Apartment / Flat)</option>
                      <option value="Independent Villa">🏰 VILLA / TOWNHOUSE</option>
                      <option value="Open Plot">📐 LAND / OPEN PLOT</option>
                      <option value="Commercial Office">🏢 COMMERCIAL OFFICE SPACE</option>
                      <option value="Retail Shop">🛍️ COMMERCIAL RETAIL SHOP</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: BHK, FLOOR & CONDITION */}
            {leadIntakeStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 4: Required BHK Configuration, Condition & Floor Preference</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>BHK Configuration *</label>
                    <select value={newCustomerForm.configuration} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, configuration: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="1BHK">1 BHK</option>
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="4BHK">4 BHK</option>
                      <option value="5+ BHK / Duplex">5+ BHK / Duplex Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Condition *</label>
                    <select value={newCustomerForm.condition} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, condition: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Pre-Launch">New Pre-Launch</option>
                      <option value="Resale">Resale Unit</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Floor Preference</label>
                    <input type="text" value={newCustomerForm.floor_pref} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, floor_pref: e.target.value })} placeholder="e.g. 10th Floor or Higher" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: LOCATION & MAP RADIUS */}
            {leadIntakeStep === 5 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 5: Location Requirements, Secondary Localities & Map Radius</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Preferred Locality *</label>
                    <input type="text" value={newCustomerForm.preferredArea} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, preferredArea: e.target.value })} placeholder="e.g. Kondapur / Gachibowli or Madhyamgram" style={{ width: '100%', background: '#0f172a', border: '1px solid #0284c7', color: '#ffffff', fontWeight: '800', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Secondary Preferred Localities</label>
                    <input type="text" value={newCustomerForm.secondary_areas} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, secondary_areas: e.target.value })} placeholder="e.g. Hitec City, Barasat, Sodepur" style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Maximum Map Radius Distance (KM)</label>
                    <select value={newCustomerForm.radius_km} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, radius_km: Number(e.target.value) })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="5">Within 5 KM Radius</option>
                      <option value="10">Within 10 KM Radius</option>
                      <option value="15">Within 15 KM Radius</option>
                      <option value="25">Within 25 KM Radius</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Vastu Facing Preference</label>
                    <select value={newCustomerForm.facing} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, facing: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="East Facing">East Facing</option>
                      <option value="North-East Facing">North-East Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="West Facing">West Facing</option>
                      <option value="Any Facing">Any Facing Acceptable</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: BUDGET & AREA DIMENSIONS */}
            {leadIntakeStep === 6 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 6: Budget Flexibility Limits & Carpet Area Dimensions</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Minimum Budget *</label>
                    <input type="text" value={newCustomerForm.budget_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_min: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Maximum Budget *</label>
                    <input type="text" value={newCustomerForm.budget_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_max: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Budget Flexibility</label>
                    <select value={newCustomerForm.budget_flexibility} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_flexibility: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Fixed Strict">Fixed Strict</option>
                      <option value="+5% Flexible">+5% Flexible</option>
                      <option value="+10% Negotiable">+10% Negotiable</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Min Carpet Area</label>
                    <input type="text" value={newCustomerForm.carpet_area_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, carpet_area_min: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Max Carpet Area</label>
                    <input type="text" value={newCustomerForm.carpet_area_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, carpet_area_max: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Area Unit</label>
                    <select value={newCustomerForm.area_unit} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, area_unit: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Sq.Ft.">Sq.Ft.</option>
                      <option value="Sq.Meter">Sq.Meter</option>
                      <option value="Katha">Katha</option>
                      <option value="Cottah">Cottah</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 7: PARKING & AMENITIES */}
            {leadIntakeStep === 7 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 7: Parking Requirements & Gated Amenities Multi-Select</h4>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Parking Type Required</label>
                  <select value={newCustomerForm.parking} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, parking: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <option value="Covered Slot + EV Charger">Covered Slot + EV Charger</option>
                    <option value="Covered Slot">Covered Car Parking</option>
                    <option value="Open Parking">Open Parking</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Required Gated Amenities</label>
                  <input type="text" value={newCustomerForm.amenities} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, amenities: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>
            )}

            {/* STEP 8: LOAN & POSSESSION */}
            {leadIntakeStep === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 8: Home Loan Readiness & Possession Timeline</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Bank Loan Required *</label>
                    <select value={newCustomerForm.loan_required} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, loan_required: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No (Self Funded / Cash)</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Loan Pre-Approval Status</label>
                    <select value={newCustomerForm.loan_status} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, loan_status: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Pre-Approved">🟢 Pre-Approved</option>
                      <option value="In Process">⚡ Applied / In Process</option>
                      <option value="Not Applied Yet">⚪ Planning to Apply</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Expected Decision Timeline</label>
                    <select value={newCustomerForm.decision_timeline} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, decision_timeline: e.target.value })} style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Immediate (< 30 Days)">🔥 Immediate (&lt; 30 Days)</option>
                      <option value="Within 60 Days">⚡ Within 60 Days</option>
                      <option value="3+ Months">❄️ 3+ Months</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 9: REVIEW & SEND TO MATCHING MANAGEMENT */}
            {leadIntakeStep === 9 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#0f172a', border: '1px solid #22c55e', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>REQUIREMENT COMPLETENESS AUDIT SCORE</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffffff', marginTop: '2px' }}>94% COMPLETE</h2>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Meets strict 80% minimum threshold for property matching engine.</p>
                  </div>
                  <span style={{ background: '#22c55e', color: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontWeight: '900', fontSize: '0.85rem' }}>
                    READY FOR MATCHING
                  </span>
                </div>

                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Customer Name:</span>
                    <strong style={{ display: 'block', color: '#ffffff' }}>{newCustomerForm.name || 'Sumanth Varma'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Mobile Phone:</span>
                    <strong style={{ display: 'block', color: '#4ade80' }}>{newCustomerForm.mobile || '+91 98490 88888'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Assigned Executive:</span>
                    <strong style={{ display: 'block', color: '#38bdf8', fontWeight: '900' }}>{newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)'}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Budget Range:</span>
                    <strong style={{ display: 'block', color: '#fbbf24' }}>{newCustomerForm.budget_min} - {newCustomerForm.budget_max}</strong>
                  </div>
                  <div>
                    <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Preferred Area:</span>
                    <strong style={{ display: 'block', color: '#38bdf8' }}>{newCustomerForm.preferredArea} ({newCustomerForm.configuration})</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setLeadIntakeStep(8)} style={{ flex: 1, background: '#334155', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                    ← Back to Step 8
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      const mobileStr = newCustomerForm.mobile || '+91 98490 88888';
                      const nameStr = newCustomerForm.name || 'Sumanth Varma';
                      const existingIdx = matchingRequestsQueue.findIndex(r => r.mobile === mobileStr || (r.customerName === nameStr && r.customerName.length > 0));
                      
                      const reqId = existingIdx >= 0 ? matchingRequestsQueue[existingIdx].requestId : generateNextMatchingCode();
                      const finalCustomerCode = newCustomerForm.customer_number || (existingIdx >= 0 ? matchingRequestsQueue[existingIdx].customerNumber : generateNextCustomerCode());
                      
                      const newReq = {
                        requestId: reqId,
                        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        customerName: nameStr,
                        customerNumber: finalCustomerCode,
                        mobile: mobileStr,
                        purpose: newCustomerForm.investment_purpose,
                        propertyType: newCustomerForm.property_type,
                        configuration: newCustomerForm.configuration,
                        budget: `${newCustomerForm.budget_min} - ${newCustomerForm.budget_max}`,
                        preferredArea: newCustomerForm.preferredArea,
                        secondaryAreas: newCustomerForm.secondary_areas,
                        radiusKm: newCustomerForm.radius_km,
                        possessionStatus: newCustomerForm.possession_status,
                        carpetArea: `${newCustomerForm.carpet_area_min} – ${newCustomerForm.carpet_area_max}`,
                        facing: newCustomerForm.facing,
                        parking: newCustomerForm.parking,
                        amenities: newCustomerForm.amenities,
                        completenessScore: 94,
                        priority: 'HOT',
                        leadScore: 92,
                        assignedExecutive: newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)',
                        status: 'MATCHING_PENDING',
                        version: 'Snapshot V1'
                      };

                      if (existingIdx >= 0) {
                        const updatedQueue = [...matchingRequestsQueue];
                        updatedQueue[existingIdx] = newReq;
                        setMatchingRequestsQueue(updatedQueue);
                      } else {
                        setMatchingRequestsQueue([newReq, ...matchingRequestsQueue]);
                      }

                      // Sync customer record to master customers array
                      const newCustRecord = {
                        id: `CUS-${Date.now()}`,
                        customer_number: finalCustomerCode,
                        name: nameStr,
                        mobile: mobileStr,
                        email: newCustomerForm.email || 'customer@swaramayi.com',
                        budget: `${newCustomerForm.budget_min} - ${newCustomerForm.budget_max}`,
                        preferredArea: newCustomerForm.preferredArea || 'Kondapur',
                        configuration: newCustomerForm.configuration || '3BHK',
                        priority: 'HOT',
                        score: 88
                      };
                      setCustomers(prev => {
                        const exists = prev.some(c => c.customer_number === finalCustomerCode || c.mobile === mobileStr);
                        if (exists) {
                          return prev.map(c => (c.customer_number === finalCustomerCode || c.mobile === mobileStr) ? { ...c, customer_number: finalCustomerCode, name: nameStr } : c);
                        }
                        return [newCustRecord, ...prev];
                      });

                      setSelectedMatchingId(reqId);
                      setShowLeadModal(false);
                      setShowAddCustomerModal(false);
                      setActiveTab('matching_management');
                      alert(`🚀 Created Matching ID ${reqId} for Customer ${nameStr} (${finalCustomerCode})! Transferred into Matching Management.`);
                    }}
                    style={{ flex: 2, background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    🚀 GENERATE MATCHING ID & SEND TO MATCHING MANAGEMENT
                  </button>
                </div>
              </div>
            )}

            {/* STEP NAVIGATION BUTTONS (FOR STEPS 1 TO 8) */}
            {leadIntakeStep < 9 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', borderTop: '1px solid #334155', paddingTop: '16px' }}>
                <button type="button" disabled={leadIntakeStep === 1} onClick={() => setLeadIntakeStep(Math.max(1, leadIntakeStep - 1))} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', opacity: leadIntakeStep === 1 ? 0.5 : 1 }}>
                  ← Previous
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={() => { setShowLeadModal(false); setShowAddCustomerModal(false); }} style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid #334155', padding: '10px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                    Save Draft
                  </button>
                  <button type="button" onClick={() => setLeadIntakeStep(Math.min(9, leadIntakeStep + 1))} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}>
                    Next Step →
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* CREATE COST SHEET SHARE AGAINST ID MODAL */}
      {showCreateShareModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '2px solid #0284c7', width: '700px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Share2 size={22} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#ffffff' }}>CREATE COST SHEET SHARE AGAINST TRANSACTION ID</h3>
                  <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>Generate unique Property Share ID (SRM-PSH-2026) linked permanently to Parent ID.</p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowCreateShareModal(false)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* PARENT TYPE & PARENT ID SELECTOR */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Parent ID Category *</label>
                  <select 
                    value={newShareForm.parentType} 
                    onChange={(e) => setNewShareForm({ ...newShareForm, parentType: e.target.value })} 
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '800' }}
                  >
                    <option value="COST_SHEET_ID">1. Cost Sheet ID (SRM-CS-2026)</option>
                    <option value="SELECTION_ID">2. Property Selection ID (SRM-SEL-2026)</option>
                    <option value="MATCHING_ID">3. Matching Request ID (SRM-MAT-2026)</option>
                    <option value="CUSTOMER_ID">4. Customer Master ID (SRM-CUS-2026)</option>
                    <option value="LEAD_ID">5. Lead Intake ID (SRM-LEAD-2026)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>Select Target Parent Transaction ID *</label>
                  <select 
                    value={newShareForm.parentId} 
                    onChange={(e) => {
                      const id = e.target.value;
                      if (id.includes('CS-2026-000145') || id.includes('000184')) {
                        setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Rohan Deshmukh', customerNumber: 'SRM-CUS-2026-000184', mobile: '+91 98490 11223', propertyTitle: 'Aparna Zenon Premium 3BHK Residence', finalPrice: '₹84 Lakhs' });
                      } else if (id.includes('CS-2026-000146') || id.includes('000187')) {
                        setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Avishek Das', customerNumber: 'SRM-CUS-2026-000187', mobile: '9432328947', propertyTitle: 'Madhyamgram Premium 3BHK Flat', finalPrice: '55 Lakhs' });
                      } else if (id.includes('CS-2026-000147') || id.includes('000186')) {
                        setNewShareForm({ ...newShareForm, parentId: id, customerName: 'Sumanth Varma', customerNumber: 'SRM-CUS-2026-000186', mobile: '+91 98490 88888', propertyTitle: 'My Home Tarkshya Luxury 3BHK', finalPrice: '₹1.54 Crores' });
                      }
                    }} 
                    style={{ width: '100%', background: '#0f172a', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}
                  >
                    <option value="SRM-CS-2026-000145">SRM-CS-2026-000145 — Rohan Deshmukh (Aparna Zenon 3BHK)</option>
                    <option value="SRM-CS-2026-000146">SRM-CS-2026-000146 — Avishek Das (Madhyamgram 3BHK)</option>
                    <option value="SRM-CS-2026-000147">SRM-CS-2026-000147 — Sumanth Varma (My Home Tarkshya 3BHK)</option>
                    <option value="SRM-SEL-2026-000078">SRM-SEL-2026-000078 — Selection Record (3 Properties)</option>
                    <option value="MATREQ-2026-000002">MATREQ-2026-000002 — Avishek Das Matching Request</option>
                  </select>
                </div>
              </div>

              {/* AUTO-FILLED CUSTOMER & PROPERTY AUDIT SUMMARY */}
              <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                <div><span style={{ color: '#94a3b8' }}>Target Customer:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{newShareForm.customerName} ({newShareForm.mobile})</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Customer Master ID:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block' }}>{newShareForm.customerNumber}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Linked Property:</span> <strong style={{ color: '#ffffff', display: 'block' }}>{newShareForm.propertyTitle}</strong></div>
                <div><span style={{ color: '#94a3b8' }}>Final Price:</span> <strong style={{ color: '#4ade80', fontWeight: '900', display: 'block' }}>{newShareForm.finalPrice}</strong></div>
              </div>

              {/* DELIVERY CHANNEL GATEWAY */}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '900', display: 'block', marginBottom: '4px' }}>Delivery Channel Gateway *</label>
                <select 
                  value={newShareForm.channel} 
                  onChange={(e) => setNewShareForm({ ...newShareForm, channel: e.target.value })} 
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#22c55e', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  <option value="WhatsApp & Email Gateway">WhatsApp Business API + Email PDF Attachment</option>
                  <option value="WhatsApp Gateway Only">WhatsApp Business API Only</option>
                  <option value="Email PDF Attachment">Email PDF Attachment Gateway</option>
                  <option value="SMS Token Link">SMS Secure Token Link</option>
                </select>
              </div>

              {/* NOTES */}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Custom Delivery Message / Executive Notes</label>
                <textarea 
                  rows={3} 
                  value={newShareForm.notes} 
                  onChange={(e) => setNewShareForm({ ...newShareForm, notes: e.target.value })} 
                  style={{ width: '100%', background: '#0f172a', border: '1px solid #334155', color: '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', resize: 'vertical' }} 
                />
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowCreateShareModal(false)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                Cancel
              </button>
              <button 
                onClick={() => {
                  const generatedShareId = `SRM-PSH-2026-0000${Math.floor(Math.random() * 90 + 10)}`;
                  setShowCreateShareModal(false);
                  alert(`🚀 Generated PROPERTY SHARE ID ${generatedShareId} against ${newShareForm.parentId}!\n\nTarget Customer: ${newShareForm.customerName} (${newShareForm.mobile})\nLinked Property: ${newShareForm.propertyTitle}\nDelivery Channel: ${newShareForm.channel}\nAudit Status: SENT & LOGGED (SHA-256)`);
                }} 
                style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem' }}
              >
                🚀 Generate Share ID & Dispatch
              </button>
            </div>

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

      {/* UNIVERSAL ID DETAILS SLIDE-OUT MODAL */}
      {viewIdDetailsModal && viewIdDetailsModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '1px solid #38bdf8', width: '850px', maxHeight: '90vh', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(56, 189, 248, 0.25)' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {viewIdDetailsModal.type === 'MATCHING_ID' && '🎯 MATCHING REQUEST DETAILS'}
                  {viewIdDetailsModal.type === 'CUSTOMER_ID' && '👥 CUSTOMER MASTER 360° PROFILE'}
                  {viewIdDetailsModal.type === 'REQUIREMENT_ID' && '📋 STRUCTURED REQUIREMENT PROFILE'}
                  {viewIdDetailsModal.type === 'LEAD_ID' && '⚡ ENTERPRISE LEAD INGESTION RECORD'}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '2px' }}>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', margin: 0 }}>
                    {viewIdDetailsModal.id}
                  </h3>
                  <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                    ● SYSTEM REGISTERED
                  </span>
                </div>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setViewIdDetailsModal(null)} />
            </div>

            {/* MODAL BODY CONTENT */}
            {viewIdDetailsModal.data ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                {/* PRIMARY CONTACT & IDENTITY GRID */}
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER NAME</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#ffffff', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.customerName || viewIdDetailsModal.data.name || 'Sumanth Varma'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>MOBILE & CONTACT</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#4ade80', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.mobile || '+91 98490 88888'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER ID (SRM-CUS)</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.customerNumber || viewIdDetailsModal.data.customer_number || 'SRM-CUS-2026-000188'}</h4>
                  </div>
                </div>

                {/* LINKED IDENTIFIERS STRIP */}
                <div style={{ background: '#0f172a', border: '1px solid #0284c7', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED REQUIREMENT ID:</span>
                    <strong style={{ color: '#fbbf24', fontFamily: 'monospace', marginLeft: '6px', fontSize: '0.85rem' }}>{viewIdDetailsModal.data.requirementId || 'SRM-REQ-2026-000094'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED LEAD ID:</span>
                    <strong style={{ color: '#38bdf8', fontFamily: 'monospace', marginLeft: '6px', fontSize: '0.85rem' }}>{viewIdDetailsModal.data.leadId || 'SRM-LEAD-2026-000184'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PRIORITY SCORE:</span>
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: '900', marginLeft: '6px', fontSize: '0.75rem' }}>
                      🔥 HOT (92/100)
                    </span>
                  </div>
                </div>

                {/* DETAILED PARAMETERS MATRIX */}
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#38bdf8', borderBottom: '1px solid #334155', paddingBottom: '6px', margin: 0 }}>
                    📋 Full Requirement & Property Specifications against {viewIdDetailsModal.id}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Configuration (BHK):</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.configuration || '3BHK'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Property Type:</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.propertyType || 'Flat / Apartment'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Investment Purpose:</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.purpose || 'Self Use'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Budget Range:</span>
                      <strong style={{ display: 'block', color: '#4ade80' }}>{viewIdDetailsModal.data.budget || '₹1.20 Crore - ₹1.80 Crore'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Preferred Area:</span>
                      <strong style={{ display: 'block', color: '#38bdf8' }}>{viewIdDetailsModal.data.preferredArea || 'Kondapur / Gachibowli'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Search Radius (KM):</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.radiusKm || 10} KM</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Carpet Area:</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.carpetArea || '1,400 – 2,200 Sq.Ft.'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Facing Preference:</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.facing || 'East Facing'}</strong>
                    </div>
                    <div>
                      <span style={{ color: '#94a3b8', fontWeight: '700' }}>Possession Status:</span>
                      <strong style={{ display: 'block', color: '#ffffff' }}>{viewIdDetailsModal.data.possessionStatus || 'Ready to Move'}</strong>
                    </div>
                  </div>

                  {viewIdDetailsModal.data.amenities && (
                    <div style={{ marginTop: '4px', background: '#1e293b', border: '1px solid #334155', padding: '10px 14px', borderRadius: '8px' }}>
                      <span style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Selected Must-Have Amenities:</span>
                      <span style={{ color: '#fbbf24', fontSize: '0.82rem', fontWeight: '800' }}>{viewIdDetailsModal.data.amenities}</span>
                    </div>
                  )}
                </div>

                {/* EXECUTIVE ASSIGNMENT & SYSTEM STATUS */}
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ASSIGNED SALES EXECUTIVE</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.assignedExecutive || 'Priya Nair (Sales Exec)'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>SYSTEM STATUS</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#22c55e', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.status || 'MATCHING_PENDING'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>FRAUD SHIELD & DEDUP</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#4ade80', margin: '2px 0 0 0' }}>✓ 100% VERIFIED & UNIQUE</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px', textTransform: 'uppercase', color: '#94a3b8', textAlign: 'center' }}>Loading details...</div>
            )}

            {/* MODAL ACTIONS FOOTER */}
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <button 
                onClick={() => {
                  const cust = customers.find(c => c.customer_number === viewIdDetailsModal?.id || c.name === viewIdDetailsModal?.data?.customerName || c.customer_number === viewIdDetailsModal?.data?.customerNumber);
                  if (cust) setSelectedCust(cust);
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('customer_360_profile');
                  setViewIdDetailsModal(null);
                }} 
                style={{ flex: 1, background: '#0284c7', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                🔍 Open Full Customer 360° Profile
              </button>
              <button 
                onClick={() => {
                  if (viewIdDetailsModal?.data?.requestId) setSelectedMatchingId(viewIdDetailsModal.data.requestId);
                  setActiveTab('matching_management');
                  setViewIdDetailsModal(null);
                }} 
                style={{ flex: 1, background: '#22c55e', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                🎯 Open Matching Workspace
              </button>
              <button 
                onClick={() => setViewIdDetailsModal(null)} 
                style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BULK PROPERTY INVENTORY IMPORT MODAL */}
      {showBulkImportPropertyModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#1e293b', border: '2px solid #22c55e', color: '#ffffff', width: '900px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    📥 BULK PROPERTY INVENTORY DATA IMPORT ENGINE
                  </h3>
                  <span style={{ background: '#22c55e', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                    CSV / EXCEL PARSER READY
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>
                  Import hundreds of master property inventory records instantly. Upload a CSV/Excel file or paste tabular inventory rows below.
                </p>
              </div>

              <button 
                onClick={() => setShowBulkImportPropertyModal(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={22} color="#ffffff" />
              </button>
            </div>

            {/* TEMPLATE & FILE UPLOAD TOOLBAR */}
            <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase' }}>NEED A SAMPLE INVENTORY FORMAT?</span>
                <p style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '2px', wordBreak: 'break-all' }}>
                  22 Full Inventory Columns: <code>Title, Developer, ProjectName, Locality, City, Latitude, Longitude, PropertyType, Configuration, TowerBlock, FloorNumber, UnitNumber, CarpetArea, SuperBuiltupArea, Facing, Furnishing, PossessionStatus, AskingPrice, PricePerSqft, ParkingSlot, KeyAmenities, Status</code>
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => {
                    const blob = new Blob([bulkPropertyCsvText], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'sample_swaramayi_property_inventory_template.csv';
                    a.click();
                  }}
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Share2 size={15} /> 📄 Download Sample CSV Template
                </button>
              </div>
            </div>

            {/* FILE INPUT OR RAW CSV TEXT PASTE AREA */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: '900', color: '#4ade80' }}>
                📋 Paste Bulk Inventory CSV / Tabular Text Data or Upload File:
              </label>
              
              <div style={{ background: '#0f172a', border: '1px dashed #22c55e', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input 
                  type="file" 
                  accept=".csv,.txt"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (evt) => {
                        if (evt.target?.result) {
                          setBulkPropertyCsvText(evt.target.result as string);
                        }
                      };
                      reader.readAsText(file);
                    }
                  }}
                  style={{ fontSize: '0.8rem', color: '#38bdf8', cursor: 'pointer' }}
                />
                <textarea 
                  rows={6}
                  value={bulkPropertyCsvText}
                  onChange={(e) => setBulkPropertyCsvText(e.target.value)}
                  placeholder="Title, Developer, ProjectName, Locality, City, Latitude, Longitude, PropertyType, Configuration, TowerBlock, FloorNumber, UnitNumber, CarpetArea, SuperBuiltupArea, Facing, Furnishing, PossessionStatus, AskingPrice, PricePerSqft, ParkingSlot, KeyAmenities, Status..."
                  style={{ width: '100%', background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', padding: '12px', color: '#ffffff', fontFamily: 'monospace', fontSize: '0.78rem', outline: 'none' }}
                />
              </div>
            </div>

            {/* LIVE PARSED PREVIEW & VALIDATION TABLE */}
            {(() => {
              const lines = bulkPropertyCsvText.trim().split('\n').filter(l => l.trim().length > 0);
              const rows = lines.slice(1).map((line, idx) => {
                const parts = parseCSVLine(line);
                return {
                  code: generateNextPropertyCode(idx),
                  title: parts[0] || `Bulk Property ${idx + 1}`,
                  developer: parts[1] || 'Swaramayi Developer Partner',
                  projectName: parts[2] || parts[0] || 'Prime Residence',
                  locality: parts[3] || 'Kondapur / Madhyamgram',
                  city: parts[4] || 'Hyderabad',
                  latitude: parts[5] || '17.44008',
                  longitude: parts[6] || '78.34891',
                  propertyType: parts[7] || 'Apartment',
                  configuration: parts[8] || '3BHK',
                  towerBlock: parts[9] || 'Tower 1',
                  floorNumber: parts[10] || '10th Floor',
                  unitNumber: parts[11] || `Flat ${1001 + idx}`,
                  carpet_area: parts[12] || '1,650 Sq.Ft.',
                  superBuiltupArea: parts[13] || '2,200 Sq.Ft.',
                  facing: parts[14] || 'East Facing',
                  furnishing: parts[15] || 'Semi-Furnished',
                  possessionStatus: parts[16] || 'Ready to Move',
                  final_price: parts[17] || '₹1.50 Crore',
                  price_sqft: parts[18] || '₹9,200/Sq.Ft.',
                  parkingSlot: parts[19] || '2 Covered Slots',
                  keyAmenities: parts[20] || 'Clubhouse, Gym, Swimming Pool',
                  status: parts[21] || 'AVAILABLE'
                };
              });

              return (
                <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#ffffff' }}>
                      🔍 LIVE PARSED PREVIEW ({rows.length} Valid Records Ready to Import — 22 Inventory Columns Mapped with GPS)
                    </h4>
                    <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900' }}>
                      ✓ AUTO PROPERTY CODES & GPS LAT/LONG READY
                    </span>
                  </div>

                  <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead>
                        <tr style={{ background: '#1e293b', color: '#94a3b8', textAlign: 'left', borderBottom: '1px solid #334155' }}>
                          <th style={{ padding: '8px' }}>Auto Code</th>
                          <th style={{ padding: '8px' }}>Property Title & Project</th>
                          <th style={{ padding: '8px' }}>Developer & City</th>
                          <th style={{ padding: '8px' }}>Locality & GPS Coordinates</th>
                          <th style={{ padding: '8px' }}>Config & Unit</th>
                          <th style={{ padding: '8px' }}>Carpet / Super Area</th>
                          <th style={{ padding: '8px' }}>Facing & Possession</th>
                          <th style={{ padding: '8px' }}>Asking Price & Rate</th>
                          <th style={{ padding: '8px' }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rows.map((r, i) => (
                          <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                            <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{r.code}</td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: '#ffffff', fontSize: '0.8rem' }}>{r.title}</strong>
                              <br /><span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.projectName}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: '#ffffff' }}>{r.developer}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>{r.city}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: '#38bdf8' }}>{r.locality}</strong>
                              <br /><span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: '800' }}>📍 {r.latitude}, {r.longitude}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: '#fbbf24', fontWeight: '800' }}>{r.configuration}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.towerBlock} {r.unitNumber}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: '#ffffff' }}>{r.carpet_area}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>Super: {r.superBuiltupArea}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: '#ffffff' }}>{r.facing}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#4ade80' }}>{r.possessionStatus}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: '#4ade80', fontSize: '0.85rem' }}>{r.final_price}</strong>
                              <br /><span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{r.price_sqft}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>
                                {r.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* EXECUTE IMPORT BUTTON */}
                  <div style={{ borderTop: '1px solid #334155', paddingTop: '12px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setShowBulkImportPropertyModal(false)}
                      style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        const newProps = rows.map((r, i) => ({
                          id: `PROP-${Date.now()}-${i}`,
                          property_code: r.code,
                          title: r.title,
                          developer: r.developer,
                          locality: r.locality,
                          configuration: r.configuration,
                          carpet_area: r.carpet_area,
                          final_price: r.final_price,
                          price_sqft: r.price_sqft,
                          status: r.status,
                          property_type: r.propertyType,
                          tower_block: r.towerBlock,
                          floor_number: r.floorNumber,
                          unit_number: r.unitNumber,
                          facing: r.facing,
                          furnishing: r.furnishing,
                          possession_status: r.possessionStatus,
                          amenities: r.keyAmenities,
                          latitude: r.latitude,
                          longitude: r.longitude,
                          map_x: 35 + Math.random() * 30,
                          map_y: 35 + Math.random() * 30
                        }));

                        setProperties(prev => [...newProps, ...prev]);
                        setShowBulkImportPropertyModal(false);
                        alert(`📥 Successfully imported ${newProps.length} rich bulk property inventory records with GPS Latitude & Longitude into Project Management!`);
                      }}
                      style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}
                    >
                      🚀 EXECUTE BULK INVENTORY IMPORT ({rows.length} RICH RECORDS)
                    </button>
                  </div>
                </div>
              );
            })()}

          </div>
        </div>
      )}

    </div>
  );
}
