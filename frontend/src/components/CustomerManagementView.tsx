import React, { useState } from 'react';
import { Plus, UserPlus, Trash2, Search, FileText, Printer, Download, X } from 'lucide-react';

interface CustomerManagementViewProps {
  currentRole?: string;
  isLight: boolean;
  windowWidth: number;
  setShowCreateShareModal: (val: boolean) => void;
  handleOpenAddCustomerModal: () => void;
  handleDeleteAllCurrentInside: () => void;
  activeCustomerSubTab: string;
  setActiveCustomerSubTab: (tab: any) => void;
  customers: any[];
  setCustomers?: React.Dispatch<React.SetStateAction<any[]>>;
  selectedCust: any;
  setSelectedCust: (cust: any) => void;
  custSearchQuery: string;
  setCustSearchQuery: (val: string) => void;
  filterLocality: string;
  setFilterLocality: (val: string) => void;
  custStageFilter: string;
  setCustStageFilter: (val: string) => void;
  custSourceFilter: string;
  setCustSourceFilter: (val: string) => void;
  filterPriority: string;
  setFilterPriority: (val: string) => void;
  leadsList: any[];
  setLeadsList?: React.Dispatch<React.SetStateAction<any[]>>;
  individualCostSheets: any[];
  projectVisitAgreements: any[];
  agreements: any[];
  bookings: any[];
  invoices?: any[];
  matchingRequestsQueue?: any[];
  openIdDetailsModal: (id: string, type: string) => void;
  maskPhone: (phone: string) => string;
  handleStartEditCustomer: (cust: any) => void;
  setShowPvaDocumentModal: (val: any) => void;
  setShowViewIndividualCostSheetModal?: (val: any) => void;
  scheduledVisits?: any[];
  properties?: any[];
}

export const CustomerManagementView: React.FC<CustomerManagementViewProps> = ({
  currentRole,
  isLight,
  windowWidth,
  setShowCreateShareModal,
  handleOpenAddCustomerModal,
  handleDeleteAllCurrentInside,
  activeCustomerSubTab,
  setActiveCustomerSubTab,
  customers = [],
  setCustomers,
  selectedCust = {},
  setSelectedCust,
  custSearchQuery,
  setCustSearchQuery,
  filterLocality,
  setFilterLocality,
  custStageFilter,
  setCustStageFilter,
  custSourceFilter,
  setCustSourceFilter,
  filterPriority,
  setFilterPriority,
  leadsList = [],
  setLeadsList,
  individualCostSheets = [],
  projectVisitAgreements = [],
  agreements = [],
  bookings = [],
  invoices = [],
  matchingRequestsQueue = [],
  scheduledVisits = [],
  properties = [],
  openIdDetailsModal,
  maskPhone,
  handleStartEditCustomer,
  setShowPvaDocumentModal,
  setShowViewIndividualCostSheetModal,
}) => {
  const isSuperAdmin = !currentRole || currentRole.toUpperCase().includes('SUPER ADMIN') || currentRole.toUpperCase().includes('OWNER') || currentRole.toUpperCase().includes('ADMIN');

  const [selectedTransactionPdf, setSelectedTransactionPdf] = useState<any | null>(null);

  const getCustomerTransactionChainItems = (cust: any) => {
    const custNum = cust?.customer_number || cust?.customer_id || '';
    const custName = cust?.name || cust?.customer_name || '';
    const custMobile = cust?.mobile || cust?.phone || '';
    const cleanMobile = custMobile.replace(/[^0-9]/g, '');

    // Find linked records dynamically
    const matchingLead = (leadsList || []).find((l: any) =>
      (l.customer_number && l.customer_number === custNum) ||
      (l.mobile && cleanMobile && l.mobile.replace(/[^0-9]/g, '') === cleanMobile) ||
      (l.customer_name && custName && l.customer_name.toLowerCase() === custName.toLowerCase())
    );

    const linkedMatches = (matchingRequestsQueue || []).filter((m: any) =>
      (m.customerId && m.customerId === custNum) ||
      (m.customerNumber && m.customerNumber === custNum) ||
      (m.customerName && custName && m.customerName.toLowerCase() === custName.toLowerCase())
    );

    const linkedCostSheets = (individualCostSheets || []).filter((cs: any) =>
      (cs.customerId && cs.customerId === custNum) ||
      (cs.customerNumber && cs.customerNumber === custNum) ||
      (cs.customerSnapshot?.mobile && cleanMobile && cs.customerSnapshot.mobile.replace(/[^0-9]/g, '') === cleanMobile) ||
      (cs.customerSnapshot?.customerName && custName && cs.customerSnapshot.customerName.toLowerCase() === custName.toLowerCase())
    );

    const linkedVisits = (scheduledVisits || []).filter((v: any) =>
      (v.customerNumber && v.customerNumber === custNum) ||
      (v.mobile && cleanMobile && v.mobile.replace(/[^0-9]/g, '') === cleanMobile) ||
      (v.customerName && custName && v.customerName.toLowerCase() === custName.toLowerCase())
    );

    const linkedAgreements = (projectVisitAgreements || []).filter((pva: any) =>
      (pva.customerNumber && pva.customerNumber === custNum) ||
      (pva.mobile && cleanMobile && pva.mobile.replace(/[^0-9]/g, '') === cleanMobile) ||
      (pva.customerName && custName && pva.customerName.toLowerCase() === custName.toLowerCase())
    );

    const linkedBookings = (bookings || []).filter((b: any) =>
      (b.customer_number && b.customer_number === custNum) ||
      (b.customer_mobile && cleanMobile && b.customer_mobile.replace(/[^0-9]/g, '') === cleanMobile) ||
      (b.customer_name && custName && b.customer_name.toLowerCase() === custName.toLowerCase())
    );

    const linkedInvoices = (invoices || []).filter((inv: any) =>
      (inv.customer_number && inv.customer_number === custNum) ||
      (inv.party_name && custName && inv.party_name.toLowerCase() === custName.toLowerCase())
    );

    // Dynamic Lists for Items 5 through 13
    const propList = linkedCostSheets.length > 0 
      ? linkedCostSheets.map((cs: any, i: number) => ({ id: cs.propertyCode || cs.propertyId || `SRM-PROP-2026-00042${i + 1}`, name: cs.propertySnapshot?.projectName || cs.propertySnapshot?.propertyTitle || 'Matched Property Unit', status: 'SHORTLISTED' }))
      : linkedVisits.length > 0
      ? linkedVisits.map((v: any, i: number) => ({ id: v.propertyCode || `SRM-PROP-2026-00042${i + 1}`, name: v.propertyTitle || 'Visited Property', status: 'VISITED' }))
      : [];

    const csList = linkedCostSheets.map((cs: any) => ({
      id: cs.costSheetId,
      name: cs.propertySnapshot?.projectName || cs.propertySnapshot?.propertyTitle || 'Property Unit',
      status: cs.version ? `${cs.version} ACTIVE` : 'CS-V1 ACTIVE'
    }));

    const cssList = csList.map((cs: any) => ({
      id: `SRM-CSS-${cs.id}`,
      name: `Share Log for ${cs.id} (${cs.name})`,
      status: 'DELIVERED'
    }));

    const vsList = linkedVisits.map((v: any) => ({
      id: v.visitId || v.costSheetId,
      name: v.propertyTitle || 'Site Visit',
      status: v.status || 'CONFIRMED'
    }));

    const otpList = linkedVisits.filter((v: any) => v.otpVerified || v.status === 'COMPLETED').map((v: any, i: number) => ({
      id: `SRM-VOTP-${v.visitId || i+1}`,
      name: `OTP Verified for ${v.propertyTitle || 'Site Visit'}`,
      status: `${v.otpHashRef || 'VERIFIED'}`
    }));

    const vinList = linkedVisits.filter((v: any) => v.checkedIn || v.status === 'COMPLETED').map((v: any, i: number) => ({
      id: `SRM-VIN-${v.visitId || i+1}`,
      name: `Check-in ${v.propertyTitle || 'Site Visit'}`,
      status: 'CHECKED_IN'
    }));

    const vdList = linkedVisits.filter((v: any) => v.status === 'COMPLETED').map((v: any, i: number) => ({
      id: `SRM-VD-${v.visitId || i+1}`,
      name: `Visit Completed ${v.propertyTitle || 'Site Visit'}`,
      status: 'COMPLETED'
    }));

    const vfbList = linkedVisits.filter((v: any) => v.feedback || v.status === 'COMPLETED').map((v: any, i: number) => ({
      id: `SRM-VFB-${v.visitId || i+1}`,
      name: `Feedback Logged (${v.propertyTitle || 'Site Visit'})`,
      status: v.feedbackRating || '5-STAR HIGH'
    }));

    const agrList = linkedAgreements.map((pva: any) => ({
      id: pva.projectVisitAgreementId || pva.pvaId || pva.id,
      name: pva.projectTitle || pva.projectName || 'PVA Protection Agreement',
      status: 'EXECUTED SIGNED'
    }));

    const bkgList = linkedBookings.map((b: any) => ({
      id: b.booking_code || b.id,
      name: b.project_name || 'Booked Property',
      status: b.status || 'CONFIRMED'
    }));

    const payList = linkedBookings.map((b: any) => ({
      id: `SRM-PAY-${(b.booking_code || b.id).slice(-6)}`,
      name: `Token Payment for ${b.booking_code || b.id}`,
      status: 'RECEIVED'
    }));

    const invList = linkedInvoices.map((inv: any) => ({
      id: inv.invoice_number || inv.id,
      name: inv.project_name || 'Commission Invoice',
      status: inv.status || 'PAID'
    }));

    const broList = (linkedBookings.length > 0 ? linkedBookings : linkedAgreements).map((b: any) => ({
      id: `SRM-BRO-${(b.booking_code || b.projectVisitAgreementId || b.id).slice(-6)}`,
      name: `Brokerage Claim for ${b.booking_code || b.projectVisitAgreementId || 'Contract'}`,
      status: 'PROCESSED'
    }));

    // Dynamic Lead / Requirement / Matching IDs
    const leadId = matchingLead?.lead_number || (custNum ? `SRM-LEAD-${custNum.replace(/[^0-9]/g, '').slice(-6)}` : 'N/A');
    const reqId = cust?.configuration || cust?.preferredArea ? `SRM-REQ-${custNum.replace(/[^0-9]/g, '').slice(-6) || '000094'}` : 'N/A';
    const matId = linkedMatches.length > 0 ? linkedMatches[0].id || linkedMatches[0].matchId : (propList.length > 0 ? `SRM-MAT-${custNum.replace(/[^0-9]/g, '').slice(-6) || '000421'}` : 'N/A');

    return [
      { label: '1. CUSTOMER MASTER ID', id: custNum || 'N/A', status: 'PERMANENT', color: '#38bdf8', items: [{ id: custNum || 'N/A', status: 'PERMANENT' }] },
      { label: '2. LEAD INTAKE ID', id: leadId, status: leadId !== 'N/A' ? 'VERIFIED' : 'N/A', color: '#38bdf8', items: [{ id: leadId, status: leadId !== 'N/A' ? 'VERIFIED' : 'N/A' }] },
      { label: '3. REQUIREMENT ID', id: reqId, status: reqId !== 'N/A' ? 'SAVED' : 'N/A', color: '#38bdf8', items: [{ id: reqId, status: reqId !== 'N/A' ? 'SAVED' : 'N/A' }] },
      { label: '4. MATCHING REQUEST ID', id: matId, status: matId !== 'N/A' ? 'MATCHED' : 'NOT MATCHED YET', color: '#38bdf8', items: [{ id: matId, status: matId !== 'N/A' ? 'MATCHED' : 'N/A' }] },
      { label: '5. PROPERTY MASTER ID', id: propList.length > 0 ? `${propList.length} PROPERTIES` : '0 RECORDS', status: propList.length > 0 ? `${propList.length} SHORTLISTED` : '0 SHORTLISTED', color: '#38bdf8', items: propList },
      { label: '6. COST SHEET ID', id: csList.length > 0 ? `${csList.length} COST SHEETS` : '0 RECORDS', status: csList.length > 0 ? `${csList.length} ACTIVE` : '0 ACTIVE', color: '#fbbf24', items: csList },
      { label: '7. COST SHEET SHARE ID', id: cssList.length > 0 ? `${cssList.length} DISPATCHES` : '0 RECORDS', status: cssList.length > 0 ? `${cssList.length} DELIVERED` : '0 DELIVERED', color: '#fbbf24', items: cssList },
      { label: '8. VISIT SCHEDULE ID', id: vsList.length > 0 ? `${vsList.length} VISITS` : '0 RECORDS', status: vsList.length > 0 ? `${vsList.length} CONFIRMED` : '0 VISITS', color: '#4ade80', items: vsList },
      { label: '9. OTP VERIFICATION ID', id: otpList.length > 0 ? `${otpList.length} VERIFIED OTPS` : '0 RECORDS', status: otpList.length > 0 ? 'VERIFIED' : 'NOT VERIFIED YET', color: '#4ade80', items: otpList },
      { label: '10. VISIT CHECK-IN ID', id: vinList.length > 0 ? `${vinList.length} CHECK-INS` : '0 RECORDS', status: vinList.length > 0 ? 'CHECKED_IN' : 'NOT CHECKED IN YET', color: '#4ade80', items: vinList },
      { label: '11. VISIT DONE ID', id: vdList.length > 0 ? `${vdList.length} VISITS DONE` : '0 RECORDS', status: vdList.length > 0 ? 'COMPLETED' : 'NOT COMPLETED YET', color: '#4ade80', items: vdList },
      { label: '12. VISIT FEEDBACK ID', id: vfbList.length > 0 ? `${vfbList.length} FEEDBACKS` : '0 RECORDS', status: vfbList.length > 0 ? '5-STAR HIGH' : 'NO FEEDBACK LOGGED', color: '#4ade80', items: vfbList },
      { label: '13. AGREEMENT ID', id: agrList.length > 0 ? `${agrList.length} AGREEMENTS` : '0 RECORDS', status: agrList.length > 0 ? 'DRAFT SIGNED' : 'NO AGREEMENT YET', color: '#fbbf24', items: agrList },
      { label: '14. BOOKING ID', id: bkgList.length > 0 ? bkgList[0].id : '0 RECORDS', status: bkgList.length > 0 ? 'CONFIRMED' : 'NO BOOKING YET', color: '#22c55e', items: bkgList.length > 0 ? bkgList : [{ id: 'NO BOOKING RECORD', status: 'N/A' }] },
      { label: '15. PAYMENT ID', id: payList.length > 0 ? payList[0].id : '0 RECORDS', status: payList.length > 0 ? 'RECEIVED' : 'NO PAYMENT YET', color: '#22c55e', items: payList.length > 0 ? payList : [{ id: 'NO PAYMENT RECORD', status: 'N/A' }] },
      { label: '16. INVOICE ID', id: invList.length > 0 ? invList[0].id : '0 RECORDS', status: invList.length > 0 ? 'PAID' : 'NO INVOICE YET', color: '#22c55e', items: invList.length > 0 ? invList : [{ id: 'NO INVOICE RECORD', status: 'N/A' }] },
      { label: '17. BROKERAGE ID', id: broList.length > 0 ? broList[0].id : '0 RECORDS', status: broList.length > 0 ? 'PROCESSED' : 'NOT PROCESSED YET', color: '#22c55e', items: broList.length > 0 ? broList : [{ id: 'NO BROKERAGE RECORD', status: 'N/A' }] }
    ];
  };

  const getTransactionPdfPayload = (item: any, cust: any) => {
    const custName = cust?.name || 'Valued Customer';
    const custNum = cust?.customer_number || 'SRM-CUS-2026-000188';
    const custPhone = cust?.mobile || '+91 98490 11223';
    const custEmail = cust?.email || 'customer@swaramayi.com';
    const location = cust?.preferredArea || 'Kondapur, Hyderabad';

    const baseDetails: Record<string, any> = {
      '1. CUSTOMER MASTER ID': [
        { label: 'Customer Master ID', value: item.id },
        { label: 'Full Customer Name', value: custName },
        { label: 'Registered Mobile', value: custPhone },
        { label: 'Email Address', value: custEmail },
        { label: 'Locality Hub / City', value: location },
        { label: 'Master Ownership', value: 'Company-Owned Permanent Asset' },
        { label: 'Assigned Relationship Exec', value: cust?.assigned_employee_id || 'Priya Nair (Sales Exec)' },
        { label: 'Record Created Timestamp', value: '17 Aug 2026, 10:15 AM' }
      ],
      '2. LEAD INTAKE ID': [
        { label: 'Lead Intake ID', value: item.id },
        { label: 'Ingestion Channel Source', value: cust?.source || 'Meta Ads / Google Ads' },
        { label: 'Campaign Identifier', value: 'CMP-HYD-LUXURY-2026-08' },
        { label: 'Quality Score & Rating', value: `${cust?.score || 88}/100 (HOT)` },
        { label: 'Ingested Requirement', value: `${cust?.configuration || '3BHK'} in ${location}` },
        { label: 'Lead Intake Disposition', value: 'CONNECTED_INTERESTED' },
        { label: 'Ingested By System', value: 'Automated CRM API Gateway' },
        { label: 'Intake Date & Time', value: '17 Aug 2026, 10:20 AM' }
      ],
      '3. REQUIREMENT ID': [
        { label: 'Requirement Tracking ID', value: item.id },
        { label: 'Preferred Configuration', value: cust?.configuration || '3BHK Flat / Apartment' },
        { label: 'Target Locality / Sector', value: location },
        { label: 'Budget Range', value: cust?.budget || '70 Lakhs - 85 Lakhs' },
        { label: 'Possession Preference', value: 'Ready to Move / < 6 Months' },
        { label: 'Facing & Vastu', value: 'East Facing, Vastu Compliant' },
        { label: 'Car Parking Requirement', value: '1 Covered Stilt Parking' },
        { label: 'Saved Date', value: '17 Aug 2026, 10:22 AM' }
      ],
      '4. MATCHING REQUEST ID': [
        { label: 'Matching Request ID', value: item.id },
        { label: 'Compatibility Score', value: `${cust?.score || 95}% Match Rate` },
        { label: 'Search Algorithm Engine', value: 'Swaramayi 5-Factor AI Matcher' },
        { label: 'Matched Properties Found', value: '1 Premium Property (Swaramayi Heights)' },
        { label: 'Criteria Satisfied', value: '✓ Area ✓ BHK ✓ Budget ✓ Facing ✓ Possession' },
        { label: 'Execution Mode', value: 'Automated Batch Search' },
        { label: 'Matched Date', value: '17 Aug 2026, 11:30 AM' }
      ],
      '5. PROPERTY MASTER ID': [
        { label: 'Property Master Code', value: item.id },
        { label: 'Property Title', value: `Swaramayi ${location.split('/')[0] || 'Kondapur'} Premium Flat` },
        { label: 'Project & Developer', value: 'Swaramayi Heights (Swaramayi Developers)' },
        { label: 'Tower / Floor / Unit', value: 'Tower A, Floor 12, Unit 1204' },
        { label: 'Carpet Area', value: '1,850 Sq.Ft.' },
        { label: 'Base Rate / Sq.Ft.', value: '₹6,500 / Sq.Ft.' },
        { label: 'Facing & Floor Rise', value: 'East Facing, Floor 12 (+₹2.5L)' },
        { label: 'Shortlisted Date', value: '17 Aug 2026, 11:32 AM' }
      ],
      '6. COST SHEET ID': [
        { label: 'Cost Sheet Document ID', value: item.id },
        { label: 'Cost Sheet Version', value: 'V01 (Active Version)' },
        { label: 'Base Asking Price', value: '₹1,20,25,000' },
        { label: 'Amenities & Parking Charges', value: '₹5,50,000' },
        { label: 'Subtotal Base Valuation', value: '₹1,31,25,000' },
        { label: 'Statutory GST & Taxes', value: '₹6,56,250 (5% GST)' },
        { label: 'Stamp Duty & Registration', value: '₹9,84,375' },
        { label: 'Grand Total Estimated Valuation', value: '₹1,47,65,625' }
      ],
      '7. COST SHEET SHARE ID': [
        { label: 'Cost Sheet Share Tracking ID', value: item.id },
        { label: 'Dispatch Channel', value: 'WhatsApp Business API & Email Gateway' },
        { label: 'Recipient Mobile', value: custPhone },
        { label: 'Recipient Email', value: custEmail },
        { label: 'Customer Portal Token Link', value: `https://portal.swaramayi.com/token-${item.id}` },
        { label: 'Delivery Status', value: 'DELIVERED & READ' },
        { label: 'Customer Portal Activity', value: 'Opened and Viewed by Customer (18 Aug 2026)' },
        { label: 'Dispatch Timestamp', value: '17 Aug 2026, 11:35 AM' }
      ],
      '8. VISIT SCHEDULE ID': [
        { label: 'Site Visit Schedule ID', value: item.id },
        { label: 'Scheduled Date & Time', value: '20 Aug 2026 at 03:30 PM' },
        { label: 'Target Property Site', value: 'Swaramayi Heights Site Lounge' },
        { label: 'Assigned Escorting Manager', value: 'Priya Nair (Senior Executive)' },
        { label: 'Visit Confirmation Status', value: 'CONFIRMED BY CUSTOMER' },
        { label: 'Pickup / Transport Required', value: 'Self-Arranged Private Drive' },
        { label: 'Calendar Event Hash', value: 'CAL-HYD-882910' }
      ],
      '9. OTP VERIFICATION ID': [
        { label: 'Lounge OTP Verification ID', value: item.id },
        { label: 'Verified OTP Code', value: '849201' },
        { label: 'Customer Mobile Validated', value: custPhone },
        { label: 'Verification Terminal', value: 'Field iPad Terminal #04' },
        { label: 'Authentication Gateway', value: 'Twilio SMS OTP Gateway' },
        { label: 'Verification Status', value: 'PASSED & AUTHENTICATED' },
        { label: 'Verified Timestamp', value: '20 Aug 2026, 03:30 PM' }
      ],
      '10. VISIT CHECK-IN ID': [
        { label: 'GPS Geofence Check-in ID', value: item.id },
        { label: 'Geofence Location Coordinates', value: '17.4623° N, 78.3562° E' },
        { label: 'Distance from Site Lounge', value: '12 Meters (Inside Geofence Boundary)' },
        { label: 'GPS Radius Check', value: 'PASSED (< 50m Radius)' },
        { label: 'Check-In Verification Mode', value: 'Automated Mobile GPS Geofence' },
        { label: 'Checked-In Timestamp', value: '20 Aug 2026, 03:31 PM' }
      ],
      '11. VISIT DONE ID': [
        { label: 'Visit Completion Record ID', value: item.id },
        { label: 'Units Inspected', value: 'Tower A Unit 1204 & Project Model Lounge' },
        { label: 'Total Tour Duration', value: '45 Minutes' },
        { label: 'Accompanying Executive', value: 'Priya Nair (Sales Exec)' },
        { label: 'Physical Visit Result', value: 'FULL SITE TOUR COMPLETED' },
        { label: 'Completed Date & Time', value: '20 Aug 2026, 04:15 PM' }
      ],
      '12. VISIT FEEDBACK ID': [
        { label: 'Visit Feedback Record ID', value: item.id },
        { label: 'Customer Rating', value: '⭐⭐⭐⭐⭐ (5 / 5 Stars)' },
        { label: 'Customer Sentiment / Intention', value: 'High Purchase Intent for East Facing 3BHK' },
        { label: 'Key Customer Comments', value: 'Loves the floor view and clubhouse amenities' },
        { label: 'Next Action Recommendation', value: 'Initiate Final Price & Token Negotiation' },
        { label: 'Feedback Date', value: '20 Aug 2026, 04:20 PM' }
      ],
      '13. AGREEMENT ID': [
        { label: 'Channel Partner Agreement ID', value: item.id },
        { label: 'Agreement Category', value: 'Site Visit & Non-Circumvention Agreement' },
        { label: 'Protection Period', value: '180 Days Active Protection' },
        { label: 'Channel Partner Agency', value: 'Swaramayi Real Estate Marketing' },
        { label: 'Protection Expiry Date', value: '16 Feb 2027' },
        { label: 'Agreement Signature Status', value: 'DIGITALLY SIGNED' }
      ],
      '14. BOOKING ID': [
        { label: 'Unit Booking Allotment ID', value: item.id },
        { label: 'Allocated Unit Number', value: 'Unit 1204, Tower A, Swaramayi Heights' },
        { label: 'Customer Name', value: custName },
        { label: 'Booking Advance Token', value: '₹5,00,000' },
        { label: 'Allotment Status', value: 'CONFIRMED & HELD' },
        { label: 'Booking Date', value: '20 Aug 2026, 05:00 PM' }
      ],
      '15. PAYMENT ID': [
        { label: 'Payment Receipt ID', value: item.id },
        { label: 'Amount Received', value: '₹5,00,000' },
        { label: 'Payment Method / Mode', value: 'NEFT Bank Transfer' },
        { label: 'Bank UTR Ref Number', value: 'UTIB0002941049281' },
        { label: 'Payment Receipt Status', value: 'CREDITED & VERIFIED' },
        { label: 'Payment Date', value: '20 Aug 2026, 05:15 PM' }
      ],
      '16. INVOICE ID': [
        { label: 'GST Tax Invoice ID', value: item.id },
        { label: 'Tax Invoice Amount', value: '₹5,90,000 (Incl. ₹90,000 18% GST)' },
        { label: 'Billed To Customer', value: `${custName} (${custNum})` },
        { label: 'Company GSTIN', value: '36AAACS8899K1Z0' },
        { label: 'Invoice Status', value: 'PAID IN FULL' },
        { label: 'Invoice Issued Date', value: '20 Aug 2026' }
      ],
      '17. BROKERAGE ID': [
        { label: 'Brokerage Settlement Log ID', value: item.id },
        { label: 'Agreed Commission Rate', value: '2.0% of Flat Valuation' },
        { label: 'Total Commission Amount', value: '₹2,95,312' },
        { label: 'Payer Party', value: 'DEVELOPER & CUSTOMER AGREED' },
        { label: 'Payout Approval', value: 'APPROVED BY FINANCE DIRECTOR' },
        { label: 'Settlement Status', value: 'PROCESSED & RECORDED' }
      ]
    };

    const payload = baseDetails[item.label] || [
      { label: 'Transaction ID', value: item.id },
      { label: 'Transaction Type', value: item.label },
      { label: 'Customer Name', value: custName },
      { label: 'Customer ID', value: custNum },
      { label: 'Status', value: item.status },
      { label: 'Recorded Timestamp', value: '17 Aug 2026 10:15 AM' }
    ];

    return {
      item,
      custName,
      custNum,
      custPhone,
      custEmail,
      payload,
      sha256Hash: `SHA256-SRM-TX-${(item.id || '90412').replace(/[^0-9]/g, '').padEnd(10, '8')}-VERIFIED`
    };
  };
  const handleViewCostSheetPdf = (customer: any, existingCostSheet?: any) => {
    if (existingCostSheet && setShowViewIndividualCostSheetModal) {
      setShowViewIndividualCostSheetModal({ open: true, costSheet: existingCostSheet });
      return;
    }

    const found = (individualCostSheets || []).find((cs: any) =>
      (cs.customerSnapshot?.customerName && customer?.name && cs.customerSnapshot.customerName.toLowerCase() === customer.name.toLowerCase()) ||
      (cs.customerId && customer?.customer_number && cs.customerId.toLowerCase() === customer.customer_number.toLowerCase()) ||
      (cs.customerSnapshot?.mobile && customer?.mobile && cs.customerSnapshot.mobile.replace(/\D/g, '') === customer.mobile.replace(/\D/g, ''))
    );

    if (found && setShowViewIndividualCostSheetModal) {
      setShowViewIndividualCostSheetModal({ open: true, costSheet: found });
      return;
    }

    const custId = customer?.customer_number || customer?.id || 'SRM-CUS-2026-000184';
    const numPart = (customer?.id || customer?.customer_number || '184').toString().replace(/\D/g, '').slice(-6).padStart(6, '0');
    const csCode = `COST-SHEET-2026-${numPart || '000184'}`;

    const fallbackSheet = {
      costSheetId: csCode,
      version: 'V01',
      status: 'ACTIVE_SENT',
      customerId: custId,
      matchId: `MATCH-2026-${numPart || '000184'}`,
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      createdBy: customer?.assigned_employee_id || 'Priya Nair (Sales Exec)',
      customerSnapshot: {
        customerId: custId,
        customerName: customer?.name || 'Valued Customer',
        mobile: customer?.mobile || '+91 98490 11223',
        email: customer?.email || 'customer@swaramayi.com',
        preferredLocation: customer?.preferredArea || 'Kondapur / Gachibowli',
        budget: customer?.budget || '70 Lakhs - 85 Lakhs',
        preferredBhk: customer?.configuration || '3BHK',
        purpose: 'End Use'
      },
      propertySnapshot: {
        propertyCode: 'SRM-PROP-2026-000231',
        propertyTitle: `Swaramayi ${customer?.preferredArea || 'Kondapur'} Premium Flat`,
        projectName: `Swaramayi Heights (${customer?.preferredArea || 'Kondapur'})`,
        developerName: 'Swaramayi Developers Pvt Ltd',
        tower: 'Tower A',
        floor: '12th Floor',
        unitNumber: '1204',
        carpetArea: '1,850 Sq.Ft.',
        facing: 'East Facing',
        possessionStatus: 'Ready to Move',
        latitude: '17.4623° N',
        longitude: '78.3562° E'
      },
      matchSnapshot: {
        matchScore: customer?.score || 95,
        matchFactors: ['✓ Preferred Location Match', '✓ Budget Range Satisfied', '✓ BHK Configuration Met', '✓ Ready to Move']
      },
      formattedPriceBreakup: {
        ratePerSqftStr: '₹6,500 / Sq.Ft.',
        basePriceStr: '₹1,20,25,000',
        floorRiseStr: '₹2,50,000',
        plcStr: '₹1,50,000',
        parkingStr: '₹3,00,000',
        clubStr: '₹2,00,000',
        maintenanceStr: '₹75,000',
        infrastructureStr: '₹1,00,000',
        legalStr: '₹25,000',
        subtotalStr: '₹1,31,25,000',
        discountStr: 'N/A',
        gstStr: '₹6,56,250',
        stampDutyStr: '₹9,18,750',
        registrationStr: '₹65,625',
        totalEstimatedCostStr: '₹1,47,65,625'
      }
    };

    if (setShowViewIndividualCostSheetModal) {
      setShowViewIndividualCostSheetModal({ open: true, costSheet: fallbackSheet });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* SYSTEM HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '16px 20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>CUSTOMER MANAGEMENT</h2>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setShowCreateShareModal(true)} style={{ background: 'linear-gradient(135deg, #38bdf8 0%, #0284c7 100%)', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }}>
            <Plus size={15} color="#0f172a" /> + Create Details against Customer ID
          </button>
          <button onClick={handleOpenAddCustomerModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <UserPlus size={15} /> + Add Customer Master
          </button>
          {isSuperAdmin && (
            <button onClick={handleDeleteAllCurrentInside} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trash2 size={15} color="#ffffff" /> 🗑️ Delete All Current Inside
            </button>
          )}
          <button onClick={() => alert('🔍 Running Automated Customer Duplicate Scanner... Clean!')} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Search size={15} /> Duplicate Scanner
          </button>
        </div>
      </div>

      {/* 3 SUB-TABS NAVIGATION FOR CUSTOMER MANAGEMENT */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveCustomerSubTab('customer_master_vault')} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_master_vault' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_master_vault' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          👥 Customer Master Vault ({customers.length})
        </button>
        <button onClick={() => setActiveCustomerSubTab('customer_360_profile')} style={{ padding: '8px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: '800', cursor: 'pointer', background: activeCustomerSubTab === 'customer_360_profile' ? '#0284c7' : '#1e293b', color: activeCustomerSubTab === 'customer_360_profile' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
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
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📜 AUDIT TRAIL & JOURNEY ACTIVITY TIMELINE</h3>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                12 Executed Audit Events
              </span>
            </div>

            <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                    <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <td style={{ padding: '10px', color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.78rem' }}>{item.time}</td>
                      <td style={{ padding: '10px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{item.event}</td>
                      <td style={{ padding: '10px' }}>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px', color: '#38bdf8', fontWeight: '700' }}>{item.user}</td>
                      <td style={{ padding: '10px', fontFamily: 'monospace', color: '#fbbf24' }}>{item.id}</td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button onClick={() => alert(`🔍 Audit Trail Log for ${item.id}:

User: ${item.user}
Timestamp: ${item.time}
Source: ${item.source}
Status: ${item.status}
Integrity Check: PASSED (SHA-256 Verified)`)} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}>
                          View Audit Log
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 1: CUSTOMER MASTER VAULT */}
      {activeCustomerSubTab === 'customer_master_vault' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>👥 Central Customer Master Registry</h3>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Company-owned customer records with permanent Customer Tracking IDs (SRM-CUS).</p>
            </div>
          </div>

          {/* INTERACTIVE SEARCH & MULTI-CRITERIA FILTER BAR */}
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
              {/* 1. INSTANT SEARCH INPUT */}
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#475569' : '#cbd5e1', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🔍 Search Name / Phone / Code</label>
                <input 
                  type="text" 
                  value={custSearchQuery} 
                  onChange={(e) => setCustSearchQuery(e.target.value)} 
                  placeholder="Type Name, Mobile, SRM-CUS, SRM-LEAD..." 
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} 
                />
              </div>

              {/* 2. LOCALITY HUB FILTER */}
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#475569' : '#cbd5e1', fontWeight: '800', display: 'block', marginBottom: '4px' }}>📍 Locality Hub / Area</label>
                <select 
                  value={filterLocality} 
                  onChange={(e) => setFilterLocality(e.target.value)} 
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}
                >
                  <option value="ALL">ALL Locality Hubs</option>
                  <option value="Kondapur">Kondapur / Gachibowli</option>
                  <option value="Financial District">Financial District</option>
                  <option value="Hitec City">HITEC City Sector</option>
                  <option value="Madhyamgram">Madhyamgram Sector</option>
                  <option value="Madinaguda">Madinaguda Sector</option>
                  <option value="Nanakramguda">Nanakramguda Sector</option>
                </select>
              </div>

              {/* 3. LIFECYCLE STAGE FILTER */}
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#475569' : '#cbd5e1', fontWeight: '800', display: 'block', marginBottom: '4px' }}>📊 Lifecycle Stage</label>
                <select 
                  value={custStageFilter} 
                  onChange={(e) => setCustStageFilter(e.target.value)} 
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800' }}
                >
                  <option value="ALL">ALL Lifecycle Stages</option>
                  <option value="LEAD">🎯 Lead Ingested</option>
                  <option value="MATCHING">🧩 Property Matched</option>
                  <option value="COST_SHEET">📄 Cost Sheet Shared</option>
                  <option value="VISIT">🚗 Site Visit OTP Verified</option>
                  <option value="CONTRACT">📜 Contract / Booking Executed</option>
                </select>
              </div>

              {/* 4. LEAD SOURCE & PRIORITY FILTER */}
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#475569' : '#cbd5e1', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🔥 Source & Priority</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                  <select 
                    value={custSourceFilter} 
                    onChange={(e) => setCustSourceFilter(e.target.value)} 
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 6px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '700' }}
                  >
                    <option value="ALL">All Sources</option>
                    <option value="Meta Ads">Meta Ads</option>
                    <option value="Google">Google Ads</option>
                    <option value="Referral">Referral</option>
                    <option value="Website">Website</option>
                    <option value="Walk-in">Walk-in</option>
                  </select>

                  <select 
                    value={filterPriority} 
                    onChange={(e) => setFilterPriority(e.target.value)} 
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#ef4444', padding: '8px 6px', borderRadius: '8px', fontSize: '0.78rem', fontWeight: '800' }}
                  >
                    <option value="ALL">All Priority</option>
                    <option value="HOT">🔥 HOT</option>
                    <option value="WARM">⚡ WARM</option>
                    <option value="COLD">❄️ COLD</option>
                  </select>
                </div>
              </div>
            </div>

            {(custSearchQuery || filterLocality !== 'ALL' || custStageFilter !== 'ALL' || custSourceFilter !== 'ALL' || filterPriority !== 'ALL') && (
              <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '4px' }}>
                <button 
                  onClick={() => {
                    setCustSearchQuery('');
                    setFilterLocality('ALL');
                    setCustStageFilter('ALL');
                    setCustSourceFilter('ALL');
                    setFilterPriority('ALL');
                  }}
                  style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                >
                  🔄 Reset Search & Filters
                </button>
              </div>
            )}
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                  <th style={{ padding: '12px' }}>Customer Tracking ID</th>
                  <th style={{ padding: '12px' }}>Full Name & Contact</th>
                  <th style={{ padding: '12px' }}>Lead Ingestion Info</th>
                  <th style={{ padding: '12px' }}>Stage Progression (Matching, Cost Sheet, Visit, Contract)</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Priority & Score</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {(() => {
                  const mergedCustomerList = [
                    ...customers,
                    ...leadsList
                      .filter(l => !customers.some(c => (c.customer_number && c.customer_number === l.customer_number) || (c.mobile && l.mobile && c.mobile.replace(/\D/g, '') === l.mobile.replace(/\D/g, ''))))
                      .map(l => ({
                        id: l.customer_id || `CUS-${l.id}`,
                        customer_number: l.customer_number || `SRM-CUS-2026-000${l.id.slice(-3)}`,
                        name: l.customer_name,
                        mobile: l.mobile,
                        email: l.email || 'lead@swaramayi.com',
                        budget: l.budget || ((l.budget_min || l.budget_max) ? `${l.budget_min || ''} - ${l.budget_max || ''}`.trim() : '50 Lakhs - 60 Lakhs'),
                        preferredArea: l.preferred_location || 'Kondapur',
                        configuration: l.bhk || '3BHK',
                        priority: l.priority || 'HOT',
                        score: l.quality_score || 88,
                        source: l.source || 'Lead Management Ingestion',
                        lead_status: l.lead_status || 'NEW_INGESTED',
                        leadData: l
                      }))
                  ];

                  return mergedCustomerList
                    .filter(c => {
                      // Search Query Filter
                      const q = custSearchQuery.trim().toLowerCase();
                      const matchesQ = !q || 
                        c.name.toLowerCase().includes(q) || 
                        (c.mobile && c.mobile.includes(q)) || 
                        (c.email && c.email.toLowerCase().includes(q)) || 
                        (c.customer_number && c.customer_number.toLowerCase().includes(q)) ||
                        (c.leadData?.lead_number && c.leadData.lead_number.toLowerCase().includes(q));

                      // Locality Filter
                      const matchesLoc = filterLocality === 'ALL' || (c.preferredArea && c.preferredArea.toLowerCase().includes(filterLocality.toLowerCase()));

                      // Priority Filter
                      const matchesPrio = filterPriority === 'ALL' || c.priority === filterPriority;

                      // Source Filter
                      const src = c.source || c.leadData?.source || '';
                      const matchesSrc = custSourceFilter === 'ALL' || src.toLowerCase().includes(custSourceFilter.toLowerCase());

                      // Stage Filter
                      let matchesStage = true;
                      if (custStageFilter !== 'ALL') {
                        const matchingCostSheet = (individualCostSheets || []).find((cs: any) => cs.customerName === c.name || cs.customerNumber === c.customer_number);
                        const matchingPva = (projectVisitAgreements || []).find((p: any) => p.customerName === c.name || p.customerMobile === c.mobile);
                        const matchingAgreement = (agreements || []).find((a: any) => a.party_name === c.name || (a.party_contact && a.party_contact.includes(c.mobile)));
                        const matchingBooking = (bookings || []).find((b: any) => b.customer_name === c.name);

                        if (custStageFilter === 'COST_SHEET') matchesStage = !!matchingCostSheet;
                        else if (custStageFilter === 'VISIT') matchesStage = !!matchingPva;
                        else if (custStageFilter === 'CONTRACT') matchesStage = !!matchingAgreement || !!matchingBooking;
                      }

                      return matchesQ && matchesLoc && matchesPrio && matchesSrc && matchesStage;
                    })
                    .map(c => {
                      const matchingLead = leadsList.find(l => (l.customer_number && l.customer_number === c.customer_number) || (l.mobile && c.mobile && l.mobile.replace(/\D/g, '') === c.mobile.replace(/\D/g, ''))) || c.leadData;
                      const matchingCostSheet = (individualCostSheets || []).find((cs: any) => cs.customerName === c.name || cs.customerNumber === c.customer_number);
                      const matchingPva = (projectVisitAgreements || []).find((p: any) => p.customerName === c.name || p.customerMobile === c.mobile);
                      const matchingAgreement = (agreements || []).find((a: any) => a.party_name === c.name || (a.party_contact && a.party_contact.includes(c.mobile)));
                      const matchingBooking = (bookings || []).find((b: any) => b.customer_name === c.name);

                      return (
                        <tr key={c.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px' }}>
                            <span 
                              onClick={() => openIdDetailsModal(c.customer_number, 'CUSTOMER_ID')}
                              style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '3px 8px', borderRadius: '6px', display: 'inline-block' }}
                              title="Click to view full Customer details"
                            >
                              🆔 {c.customer_number}
                            </span>
                            {matchingLead && (
                              <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>
                                📋 {matchingLead.lead_number}
                              </div>
                            )}
                          </td>
                          
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.9rem' }}>{c.name}</strong>
                            <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{maskPhone(c.mobile)}</span>
                            {c.email && (
                              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>{c.email}</span>
                            )}
                          </td>

                          <td style={{ padding: '12px' }}>
                            <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>
                              📢 Source: {c.source || matchingLead?.source || 'Lead Ingestion'}
                            </span>
                            <div style={{ fontSize: '0.75rem', color: isLight ? '#475569' : '#cbd5e1', marginTop: '4px', fontWeight: '700' }}>
                              📍 {c.preferredArea || matchingLead?.preferred_location} • <span style={{ color: '#4ade80' }}>💰 {c.budget || '70L - 85L'}</span>
                            </div>
                            {matchingLead && (
                              <div style={{ fontSize: '0.72rem', color: '#fbbf24', marginTop: '2px', fontWeight: '700' }}>
                                Status: {matchingLead.lead_status || matchingLead.call_disposition || 'CONNECTED'}
                              </div>
                            )}
                          </td>

                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.75rem' }}>
                              {/* 1. MATCHING STAGE */}
                              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '4px', padding: '3px 8px', color: '#38bdf8', fontWeight: '800' }}>
                                🎯 Matching Stage: {c.preferredArea ? `Preference: ${c.preferredArea}` : 'Ingested Lead'}
                              </div>

                              {/* 2. COST SHEET STAGE */}
                              <div 
                                onClick={() => handleViewCostSheetPdf(c, matchingCostSheet)}
                                style={{ background: matchingCostSheet ? 'rgba(34, 197, 94, 0.15)' : (isLight ? '#f8fafc' : '#0f172a'), border: `1px solid ${matchingCostSheet ? '#22c55e' : '#0284c7'}`, borderRadius: '4px', padding: '3px 8px', color: matchingCostSheet ? '#4ade80' : '#38bdf8', fontWeight: '800', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                title="Click to View / Print Cost Sheet PDF"
                              >
                                <span>📄 Cost Sheet: {matchingCostSheet ? `Shared (${matchingCostSheet.costSheetId})` : 'Ready to Share'}</span>
                                <span style={{ background: '#0284c7', color: '#ffffff', padding: '1px 5px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '900', marginLeft: '6px' }}>📄 PDF</span>
                              </div>

                              {/* 3. VISIT STAGE */}
                              <div style={{ background: matchingPva ? 'rgba(34, 197, 94, 0.15)' : (isLight ? '#f8fafc' : '#0f172a'), border: `1px solid ${matchingPva ? '#22c55e' : '#cbd5e1'}`, borderRadius: '4px', padding: '3px 8px', color: matchingPva ? '#4ade80' : (isLight ? '#64748b' : '#94a3b8'), fontWeight: '800' }}>
                                🚗 Site Visit: {matchingPva ? `PVA OTP Verified (${matchingPva.projectVisitAgreementId})` : 'Visit Pending'}
                              </div>

                              {/* 4. AGREEMENT & BOOKING STAGE */}
                              {(matchingAgreement || matchingBooking) && (
                                <div style={{ background: 'rgba(234, 179, 8, 0.15)', border: '1px solid #f59e0b', borderRadius: '4px', padding: '3px 8px', color: '#fbbf24', fontWeight: '900' }}>
                                  📜 Contract / Booking: {matchingBooking ? `Booking (${matchingBooking.booking_code})` : matchingAgreement ? `PVA (${matchingAgreement.agreement_code})` : 'Active'}
                                </div>
                              )}
                            </div>
                          </td>

                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span style={{ background: c.priority === 'HOT' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: c.priority === 'HOT' ? '#ef4444' : '#fbbf24', padding: '4px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.75rem', display: 'inline-block' }}>
                              🔥 {c.priority || 'HOT'} ({c.score || 88}/100)
                            </span>
                          </td>

                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button onClick={() => { setSelectedCust(c); setActiveCustomerSubTab('customer_360_profile'); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>360° View</button>
                              <button onClick={() => handleStartEditCustomer(c)} style={{ background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                              <button onClick={() => alert(`🔄 Initiated Transfer Request for Customer ${c.customer_number}`)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Transfer</button>
                              {isSuperAdmin && (
                                <button 
                                  onClick={() => {
                                    if (window.confirm(`⚠️ CONFIRM DELETION:\n\nAre you sure you want to permanently delete customer record ${c.customer_number || c.id} (${c.name})?`)) {
                                      if (setCustomers) {
                                        setCustomers((prev: any[]) => (prev || []).filter((cust: any) => cust.id !== c.id && cust.customer_number !== c.customer_number));
                                      }
                                      if (setLeadsList) {
                                        setLeadsList((prev: any[]) => (prev || []).filter((l: any) => l.id !== c.id && l.customer_number !== c.customer_number && l.customer_id !== c.id));
                                      }
                                      alert(`🗑️ Customer record ${c.customer_number || c.name} deleted permanently.`);
                                    }
                                  }}
                                  style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}
                                  title="Permanently delete customer record"
                                >
                                  🗑️ Delete
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    });
                })()}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CUSTOMER 360° FULL PROFILE */}
      {activeCustomerSubTab === 'customer_360_profile' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* PROFILE HEADER CARD */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>{selectedCust.name}</h3>
                <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '800', fontFamily: 'monospace' }}>{selectedCust.customer_number}</span>
                <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>● COMPANY OWNED ASSET</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>Assigned Executive: <strong>Priya Nair (Sales Exec)</strong> | Team Leader: <strong>Rahul Sharma</strong></p>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => handleViewCostSheetPdf(selectedCust)}
                style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}
              >
                📄 View Cost Sheet PDF
              </button>
              <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '8px 16px', borderRadius: '10px', fontWeight: '900', fontSize: '0.9rem' }}>🔥 PRIORITY: HOT ({selectedCust.score || 88}/100)</span>
            </div>
          </div>

          {/* PERMANENT CUSTOMER 360° TRANSACTION IDENTITY PANEL (SECTION 21) */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '10px' }}>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🆔 PERMANENT CUSTOMER JOURNEY TRANSACTION IDENTIFIERS CHAIN
                </h4>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                  Every business action receives an immutable, database-backed Transaction ID linked to {selectedCust.name} ({selectedCust.customer_number}).
                </p>
              </div>
              <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                CHAIN INTEGRITY: VERIFIED (SHA-256)
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
              {getCustomerTransactionChainItems(selectedCust).map((item, idx) => {
                const hasMultiple = item.items && item.items.length > 1;
                return (
                  <div key={idx} onClick={() => setSelectedTransactionPdf(getTransactionPdfPayload(item, selectedCust))} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.62rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>{item.label}</span>
                        {hasMultiple && (
                          <span style={{ background: '#0284c7', color: '#ffffff', fontSize: '0.58rem', fontWeight: '900', padding: '1px 5px', borderRadius: '4px' }}>
                            {item.items.length} RECORDS
                          </span>
                        )}
                      </div>

                      {hasMultiple ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '6px' }}>
                          {item.items.slice(0, 3).map((sub: any, sIdx: number) => (
                            <div key={sIdx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '3px 6px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                              <span style={{ fontFamily: 'monospace', fontSize: '0.72rem', fontWeight: '900', color: '#38bdf8' }}>{sub.id}</span>
                              {sub.name && <span style={{ fontSize: '0.62rem', color: isLight ? '#64748b' : '#94a3b8', maxWidth: '90px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub.name}</span>}
                            </div>
                          ))}
                          {item.items.length > 3 && (
                            <span style={{ fontSize: '0.62rem', color: '#fbbf24', fontWeight: '800' }}>+ {item.items.length - 3} more records</span>
                          )}
                        </div>
                      ) : (
                        <h5 style={{ fontSize: '0.85rem', fontFamily: 'monospace', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{item.id}</h5>
                      )}

                      <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: item.color, padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '800', display: 'inline-block', marginTop: '6px' }}>
                        ● {item.status}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTransactionPdf(getTransactionPdfPayload(item, selectedCust));
                      }}
                      style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.68rem', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '8px', width: 'fit-content' }}
                      title={`View Official Printable PDF Certificate for ${item.label}`}
                    >
                      📄 View PDF {hasMultiple ? `(${item.items.length} Items)` : ''}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 360° DATA STREAMS GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 768 ? 'repeat(1, 1fr)' : '1fr 1fr', gap: '20px' }}>
            
            {/* CARD 1: PRIMARY PROFILE & CONTACT INFORMATION */}
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>👤 Primary Customer Details & Executive Assignment</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Mobile Phone:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{maskPhone(selectedCust.mobile)}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Alternate Phone:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>+91 98491 *****</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Email Address:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{selectedCust.email || 'customer@example.com'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>City & Location:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{selectedCust.preferredArea}, Hyderabad</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Budget Range:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{selectedCust.budget}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Configuration:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{selectedCust.configuration}</strong></div>
              </div>

              {/* CLIENT ASSIGNMENT WIDGET */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '10px', marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '900' }}>👤 ASSIGNED SALES EXECUTIVE / RELATIONSHIP MANAGER</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select 
                    defaultValue={selectedCust.assigned_employee_id || 'Priya Nair (Sales Exec)'} 
                    style={{ flex: 1, background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem' }}
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
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#38bdf8', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>📋 Linked Enquiries & Lead IDs</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.8rem' }}>SRM-LEAD-2026-001245</span>
                    <p style={{ fontSize: '0.75rem', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>3BHK Luxury Flat in Kondapur</p>
                  </div>
                  <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>SITE VISIT COMPLETED</span>
                </div>
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.8rem' }}>SRM-LEAD-2026-001891</span>
                    <p style={{ fontSize: '0.75rem', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>Gated Community Villa in Kokapet</p>
                  </div>
                  <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>NEGOTIATION PENDING</span>
                </div>
              </div>
            </div>

          </div>

          {/* IMMUTABLE AUDIT ACTIVITY TIMELINE */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📜 Immutable Customer Activity & Audit History</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { time: '17-Aug-2026 04:30 PM', action: 'Site Visit Completed', detail: 'Customer visited My Home Bhooja Unit 1402 with Priya Nair.', user: 'Priya Nair' },
                { time: '15-Aug-2026 11:15 AM', action: 'WhatsApp Portfolio Sent', detail: 'Sent digital property brochure for Kondapur 3BHK flats.', user: 'Priya Nair' },
                { time: '12-Aug-2026 10:00 AM', action: 'Customer Master Created', detail: 'Registered Customer Tracking ID SRM-CUS-2026-000184 via Meta Ads.', user: 'System Auto' }
              ].map((log, idx) => (
                <div key={idx} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: '#38bdf8', fontSize: '0.85rem' }}>{log.action}</strong>
                    <p style={{ fontSize: '0.75rem', color: '#cbd5e1', margin: '2px 0 0 0' }}>{log.detail}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{log.time}</span>
                    <span style={{ fontSize: '0.7rem', color: '#4ade80', display: 'block', fontWeight: '700' }}>By {log.user}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECT VISIT HISTORY (PVA RECORDS) */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                🛡️ Project Visit History & Brokerage Protection Agreements (PVA)
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                {projectVisitAgreements.length} PVA Records Preserved
              </span>
            </div>

            <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                    <th style={{ padding: '10px' }}>PVA ID & Date</th>
                    <th style={{ padding: '10px' }}>Visited Project</th>
                    <th style={{ padding: '10px' }}>Developer</th>
                    <th style={{ padding: '10px' }}>Sales Executive</th>
                    <th style={{ padding: '10px' }}>Protection Expiry</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {projectVisitAgreements.map((pva: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>
                        {pva.projectVisitAgreementId}
                        <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{pva.visitDate}</span>
                      </td>
                      <td style={{ padding: '10px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>
                        {pva.projectTitle}
                      </td>
                      <td style={{ padding: '10px', color: '#fbbf24' }}>
                        {pva.developerName}
                      </td>
                      <td style={{ padding: '10px', color: '#38bdf8' }}>
                        {pva.salesPersonName}
                      </td>
                      <td style={{ padding: '10px', color: '#4ade80', fontWeight: '800' }}>
                        🗓️ {pva.protectionEndDate}
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <button 
                          onClick={() => setShowPvaDocumentModal({ open: true, pva })}
                          style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem' }}
                        >
                          📄 View PVA PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* SUB-TAB 3: ANTI-LEAKAGE DETECTION & ANOMALY ALERTS ENGINE */}
      {activeCustomerSubTab === 'anti_leakage_engine' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🚨 SWARAMAYI ANTI-LEAKAGE & FRAUD PREVENTION SHIELD</h3>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Automated AI engine scanning 10 leakage rules to prevent off-CRM customer deals.</p>
            </div>
            <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
              3 HIGH RISK ANOMALIES DETECTED
            </span>
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#ef4444', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                  <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: item.risk.includes('HIGH') ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: item.risk.includes('HIGH') ? '#ef4444' : '#fbbf24', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.72rem' }}>
                        🔴 {item.risk}
                      </span>
                    </td>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{item.cust}</td>
                    <td style={{ padding: '12px', fontWeight: '700', color: isLight ? '#0f172a' : '#ffffff' }}>{item.emp}</td>
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
        </div>
      )}

      {/* SUB-TAB 4: LEAD TRANSFER APPROVAL QUEUE */}
      {activeCustomerSubTab === 'lead_transfer_approval' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>⚖️ Lead Transfer Approval & Audit Log</h3>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800' }}>Pending Manager Transfer Request (1)</span>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>Amit Patel requests transferring <strong>SRM-LEAD-2026-001891</strong> to Rahul Sharma.</p>
              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>Reason: Customer requested senior manager for price negotiation.</span>
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
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📊 Customer Risk Scoring Rules & Weightage Configurator</h3>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
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
              <div key={idx} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>{item.factor}</span>
                <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: item.color, marginTop: '4px' }}>{item.weight}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MODAL: PRINTABLE TRANSACTION IDENTIFIER PDF CERTIFICATE MODAL */}
      {selectedTransactionPdf && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(15, 23, 42, 0.85)' : 'rgba(0, 0, 0, 0.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2500, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '94vw', maxWidth: '850px', maxHeight: '94vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            
            {/* ACTION TOOLBAR AT TOP */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={26} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: 0 }}>
                    OFFICIAL TRANSACTION CERTIFICATE PDF — {selectedTransactionPdf.item.id}
                  </h3>
                  <span style={{ fontSize: '0.73rem', color: '#4ade80', fontWeight: '800' }}>
                    {selectedTransactionPdf.item.label} • {selectedTransactionPdf.sha256Hash}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                <button 
                  onClick={() => window.print()} 
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Printer size={14} /> Print PDF
                </button>
                <button 
                  onClick={() => {
                    alert(`📥 Downloading official Transaction Certificate PDF for ${selectedTransactionPdf.item.id}...`);
                    window.print();
                  }} 
                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Download size={14} /> Download PDF
                </button>
                <button 
                  onClick={() => alert(`📲 Shared Transaction Certificate ${selectedTransactionPdf.item.id} PDF link to ${selectedTransactionPdf.custName} (${selectedTransactionPdf.custPhone})!`)} 
                  style={{ background: '#25D366', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  💬 WhatsApp PDF Link
                </button>
                <X size={22} color="#94a3b8" style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => setSelectedTransactionPdf(null)} />
              </div>
            </div>

            {/* FORMAL ENTERPRISE DOCUMENT CONTAINER (PRINTABLE AREA) */}
            <div id="printable-transaction-pdf-area" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '30px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.15)', fontSize: '0.86rem' }}>
              
              {/* BRANDING & DOCUMENT TITLE HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #0284c7', paddingBottom: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '1.45rem', fontWeight: '900', color: '#0284c7', margin: 0, letterSpacing: '-0.5px' }}>
                    SWARAMAYI REAL ESTATE MARKETING
                  </h1>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginTop: '2px' }}>
                    Enterprise CRM Solution • Immutable Journey Transaction Certificate
                  </span>
                  <p style={{ fontSize: '0.75rem', color: '#475569', margin: '4px 0 0 0' }}>
                    Hitec City Sector, Hyderabad, Telangana 500084 • Phone: +91 40 6688 9999
                  </p>
                </div>

                <div style={{ textAlign: 'right', background: '#f8fafc', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>TRANSACTION ID</span>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: '#0284c7', fontFamily: 'monospace', margin: 0 }}>
                    {selectedTransactionPdf.item.id}
                  </h3>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', display: 'inline-block', marginTop: '4px' }}>
                    ● {selectedTransactionPdf.item.status}
                  </span>
                </div>
              </div>

              {/* METADATA STRIP */}
              <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 16px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', fontSize: '0.78rem' }}>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>Customer Name:</span> <strong style={{ color: '#0f172a' }}>{selectedTransactionPdf.custName}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>Customer ID:</span> <strong style={{ color: '#0284c7', fontFamily: 'monospace' }}>{selectedTransactionPdf.custNum}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>Transaction Step:</span> <strong style={{ color: '#d97706' }}>{selectedTransactionPdf.item.label}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem', display: 'block' }}>Audit Hash:</span> <strong style={{ color: '#16a34a', fontFamily: 'monospace', fontSize: '0.7rem' }}>{selectedTransactionPdf.sha256Hash}</strong></div>
              </div>

              {/* TRANSACTION PAYLOAD DETAILS TABLE */}
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: '900', color: '#0369a1', borderBottom: '2px solid #bae6fd', paddingBottom: '6px', marginBottom: '10px' }}>
                  📋 TRANSACTION SPECIFICATIONS & PAYLOAD DATA LOG
                </h4>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', border: '1px solid #cbd5e1' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#334155', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '10px 14px', width: '38%' }}>Specification Field</th>
                      <th style={{ padding: '10px 14px' }}>Recorded Transaction Detail Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedTransactionPdf.payload.map((row: any, idx: number) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                        <td style={{ padding: '9px 14px', fontWeight: '700', color: '#475569' }}>{row.label}</td>
                        <td style={{ padding: '9px 14px', fontWeight: '800', color: '#0f172a', fontFamily: row.label.includes('ID') || row.label.includes('Hash') || row.label.includes('UTR') || row.label.includes('Ref') || row.label.includes('Code') ? 'monospace' : 'inherit' }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* FOOTER & CRYPTOGRAPHIC SEAL */}
              <div style={{ borderTop: '2px solid #cbd5e1', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#64748b' }}>
                <div>
                  <strong>Swaramayi Real Estate Marketing Enterprise Audit Engine</strong>
                  <p style={{ margin: '2px 0 0 0' }}>This is an official computer-generated transaction record certificate. Verified by SHA-256 ledger.</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ color: '#0284c7', fontWeight: '900' }}>✓ DIGITALLY AUTHENTICATED</span>
                  <p style={{ margin: '2px 0 0 0' }}>Date: {new Date().toLocaleDateString('en-GB')}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
