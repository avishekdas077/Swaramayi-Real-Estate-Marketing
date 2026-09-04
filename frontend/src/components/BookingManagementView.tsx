import React from 'react';
import { BookmarkCheck } from 'lucide-react';

interface BookingManagementViewProps {
  currentRole?: string;
  isLight: boolean;
  windowWidth: number;
  activeBookingSubTab: string;
  setActiveBookingSubTab: (tab: any) => void;
  bookings: any[];
  setBookings?: React.Dispatch<React.SetStateAction<any[]>>;
  setShowNewBookingModal: (val: boolean) => void;
  setShowAllotmentModal: (val: any) => void;
  invoices?: any[];
  setInvoices?: (invoices: any[]) => void;
  setActiveTab?: (tab: string) => void;
  setBillingInvoiceCategory?: (cat: string) => void;
  customers?: any[];
  properties?: any[];
}

export const BookingManagementView: React.FC<BookingManagementViewProps> = ({
  currentRole,
  isLight,
  windowWidth,
  activeBookingSubTab,
  setActiveBookingSubTab,
  bookings = [],
  setBookings,
  setShowNewBookingModal,
  setShowAllotmentModal,
  invoices = [],
  setInvoices,
  setActiveTab,
  setBillingInvoiceCategory,
  customers = [],
  properties = [],
}) => {
  const isSuperAdmin = !currentRole || currentRole.toUpperCase().includes('SUPER ADMIN') || currentRole.toUpperCase().includes('OWNER') || currentRole.toUpperCase().includes('ADMIN');

  const handleTransferToBilling = (b: any) => {
    const rawBookingCode = b.booking_code || 'SRM-BKG-2026-000087';
    const generatedCustomerInvoiceNumber = rawBookingCode.includes('SRM-BKG-')
      ? rawBookingCode.replace('SRM-BKG-', 'SRM-INV-')
      : `SRM-INV-2026-0000${(invoices?.length || 0) + 87}`;

    const generatedDeveloperInvoiceNumber = rawBookingCode.includes('SRM-BKG-')
      ? rawBookingCode.replace('SRM-BKG-', 'SRM-DEV-INV-')
      : `SRM-DEV-INV-2026-0000${(invoices?.length || 0) + 87}`;

    const brokerageAmt = Number(b.brokerage_amount) || 102297;
    const taxableVal = brokerageAmt;
    const cgst = Math.round(taxableVal * 0.09);
    const sgst = Math.round(taxableVal * 0.09);
    const totalAmt = taxableVal + cgst + sgst;

    // Look up real customer details from customers list
    const matchedCust = (customers || []).find((c: any) => 
      (b.customer_number && (c.customer_number === b.customer_number || c.id === b.customer_number || c.customerNumber === b.customer_number)) ||
      (b.customer_name && (c.name?.toLowerCase() === b.customer_name.toLowerCase() || c.customer_name?.toLowerCase() === b.customer_name.toLowerCase() || c.customerName?.toLowerCase() === b.customer_name.toLowerCase())) ||
      (b.customer_mobile && (c.mobile === b.customer_mobile || c.phone === b.customer_mobile))
    );

    const propCodeLookup = b.property_code || b.propertyCode || 'SRM-PROP-2026-000426';
    const matchedProp = (properties || []).find((p: any) => 
      p.property_code === propCodeLookup || p.id === propCodeLookup || p.propertyCode === propCodeLookup || (p.title && b.project_name && (p.title.toLowerCase().includes(b.project_name.toLowerCase()) || b.project_name.toLowerCase().includes(p.title.toLowerCase())))
    );

    const custName = b.customer_name || matchedCust?.name || matchedCust?.customer_name || matchedCust?.customerName || 'SUMANTH VARMA';
    const custNum = b.customer_number || matchedCust?.customer_number || matchedCust?.customerNumber || matchedCust?.id || 'SRM-CUS-2026-000185';
    const custMobile = b.customer_mobile || matchedCust?.mobile || matchedCust?.phone || '+91 98765 43210';
    const custEmail = (b.customer_email && !b.customer_email.includes('customcr') && b.customer_email !== 'customer@gmail.com')
      ? b.customer_email
      : (matchedCust?.email || `${custName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@gmail.com`);

    const propTitle = b.project_name || matchedProp?.title || 'GAJAPATI APARTMENT';
    const propLocality = matchedProp?.locality || b.locality || (b.project_name?.includes('Barasat') || b.project_name?.includes('Kolkata') ? 'Barasat, Kolkata' : 'Barasat, Kolkata');
    const custAddress = b.customer_address || matchedCust?.address || matchedCust?.full_address || matchedProp?.full_address || (matchedCust?.preferredArea ? `Jessore Road, ${matchedCust.preferredArea}, West Bengal - 700124` : 'Jessore Road, Barasat, Kolkata, West Bengal - 700124');
    const placeOfSupply = b.place_of_supply || matchedCust?.place_of_supply || matchedCust?.state || (propLocality.includes('Kolkata') || propTitle.includes('Kolkata') || (matchedCust?.preferredArea && matchedCust.preferredArea.includes('Kolkata')) ? '19 - West Bengal' : '19 - West Bengal');
    const gstinPan = b.customer_gstin_pan || matchedCust?.gstin || matchedCust?.pan || '19ABCDE1234F1Z5';

    const propConfig = matchedProp?.configuration || b.configuration || b.property_configuration || '2BHK Luxury Apartment';
    const devName = b.developer_name || matchedProp?.developer || matchedProp?.builder || 'Dhriti Builders & Developers';
    const devGstin = b.developer_gstin || matchedProp?.developer_gstin || '19AAACD4567E1Z2';
    const devRera = matchedProp?.rera_id || b.developer_rera_id || 'WBRERA/P/NOR/2024/000842';
    const devContact = b.developer_contact_person || 'Mr. Animesh Sen';
    const devMobile = b.developer_mobile || '+91 98300 12345';
    const devEmail = matchedProp?.developer_email || 'billing@dhritibuilders.com';
    const devAddress = matchedProp?.developer_address || 'Dhriti Towers, Jessore Road, Barasat, Kolkata - 700124';
    const devPos = placeOfSupply || '19 - West Bengal';
    const branchName = b.branch_name || (propLocality.includes('Kolkata') ? 'Kolkata Branch' : 'Head Office (Kolkata)');
    const agreeVal = String(b.agreement_value_num || 5114880);
    const flatVal = String(b.flat_price || Math.round(Number(agreeVal) * 0.95));
    const parkVal = String(b.parking_price || Math.round(Number(agreeVal) * 0.05));
    const brokPct = String(b.brokerage_percent || 2.0);

    // 1. CUSTOMER TAX INVOICE (B2C)
    const customerInvoiceObj = {
      id: `inv-cus-${Date.now()}`,
      invoice_number: generatedCustomerInvoiceNumber,
      booking_code: b.booking_code,
      customer_name: custName,
      customer_mobile: custMobile,
      customer_number: custNum,
      customer_email: custEmail,
      customer_address: custAddress,
      place_of_supply: placeOfSupply,
      customer_gstin_pan: gstinPan,
      property_title: propTitle,
      property_code: propCodeLookup,
      property_locality: propLocality,
      property_configuration: propConfig,
      developer_name: devName,
      developer_gstin: devGstin,
      developer_rera_id: devRera,
      developer_contact_person: devContact,
      developer_mobile: devMobile,
      developer_email: devEmail,
      developer_address: devAddress,
      developer_place_of_supply: devPos,
      branch_name: branchName,
      invoice_category: 'CUSTOMER',
      particulars: b.particulars || `Brokerage & Real Estate Marketing Service Charges for ${propTitle} (${b.tower_unit || 'Unit 302'})`,
      flat_price: flatVal,
      parking_price: parkVal,
      agreement_value: agreeVal,
      brokerage_percent: brokPct,
      taxable_value: taxableVal,
      apply_gst: true,
      gst_rate: '18',
      cgst_rate: '9',
      sgst_rate: '9',
      cgst_amount: cgst,
      sgst_amount: sgst,
      total_invoice_amount: totalAmt,
      payment_status: 'PAID_SETTLED',
      payment_mode: b.payment_mode || 'UPI / Online Bank Transfer',
      payment_ref: b.payment_ref || `TXN-SRM-${Math.floor(100000 + Math.random() * 900000)}`,
      created_date: new Date().toISOString().split('T')[0],
      sales_executive: b.sales_executive || 'Ramesh Pawar'
    };

    // 2. DEVELOPER BROKERAGE INVOICE (B2B)
    const developerInvoiceObj = {
      id: `inv-dev-${Date.now() + 1}`,
      invoice_number: generatedDeveloperInvoiceNumber,
      booking_code: b.booking_code,
      customer_name: custName,
      customer_mobile: custMobile,
      customer_number: custNum,
      customer_email: custEmail,
      customer_address: custAddress,
      place_of_supply: placeOfSupply,
      customer_gstin_pan: gstinPan,
      property_title: propTitle,
      property_code: propCodeLookup,
      property_locality: propLocality,
      property_configuration: propConfig,
      developer_name: devName,
      developer_gstin: devGstin,
      developer_rera_id: devRera,
      developer_contact_person: devContact,
      developer_mobile: devMobile,
      developer_email: devEmail,
      developer_address: devAddress,
      developer_place_of_supply: devPos,
      branch_name: branchName,
      invoice_category: 'DEVELOPER',
      particulars: `2.0% Channel Partner Success Fee / Brokerage for ${propTitle} (${b.tower_unit || 'Unit 302'})`,
      flat_price: flatVal,
      parking_price: parkVal,
      agreement_value: agreeVal,
      brokerage_percent: brokPct,
      taxable_value: taxableVal,
      apply_gst: true,
      gst_rate: '18',
      cgst_rate: '9',
      sgst_rate: '9',
      cgst_amount: cgst,
      sgst_amount: sgst,
      total_invoice_amount: totalAmt,
      payment_status: 'PAID_SETTLED',
      payment_mode: b.payment_mode || 'UPI / Online Bank Transfer',
      payment_ref: b.payment_ref || `TXN-DEV-${Math.floor(100000 + Math.random() * 900000)}`,
      created_date: new Date().toISOString().split('T')[0],
      sales_executive: b.sales_executive || 'Ramesh Pawar'
    };

    if (setInvoices) {
      setInvoices((prev: any[]) => [developerInvoiceObj, customerInvoiceObj, ...(prev || [])]);
    }

    if (setBookings) {
      setBookings((prev: any[]) => (prev || []).filter((item: any) => item.id !== b.id && item.booking_code !== b.booking_code));
    }

    if (setBillingInvoiceCategory) {
      setBillingInvoiceCategory('DEVELOPER');
    }

    if (setActiveTab) {
      setActiveTab('billing_management');
    }

    alert(`💳 BILLING INVOICES GENERATED SUCCESSFULLY!\n\n1. 🏢 Developer Brokerage Invoice: ${generatedDeveloperInvoiceNumber} (Developer: ${devName})\n2. 👤 Customer Tax Invoice: ${generatedCustomerInvoiceNumber} (Customer: ${custName})\n\nProperty: ${propTitle}\nAgreement Value: ₹${Number(agreeVal).toLocaleString('en-IN')}\nTaxable Brokerage: ₹${taxableVal.toLocaleString('en-IN')}\nTotal Invoice (18% GST): ₹${totalAmt.toLocaleString('en-IN')}\n\nBoth records created in Billing Management and removed from Booking Management.`);
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* CATEGORY HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BookmarkCheck size={24} color="#38bdf8" /> Property Unit Booking Management & Token Vault
          </h2>
          <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>Register new property unit bookings, lock units, record token advances, manage manager approvals, and issue Allotment Letters.</p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setShowNewBookingModal(true)}
            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
          >
            <BookmarkCheck size={16} /> + Register New Unit Booking
          </button>
        </div>
      </div>

      {/* SUB-TAB SELECTOR BAR */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '2px solid #e2e8f0' : '2px solid #334155', paddingBottom: '12px' }}>
        {[
          { id: 'all_bookings', label: '🏢 All Bookings Vault (' + bookings.length + ')' },
          { id: 'create_booking', label: '✍️ Register Booking' },
          { id: 'booking_approvals', label: '⚖️ Approvals & Token Lock (' + bookings.filter(b => b.approval_status === 'APPROVED_LOCKED').length + ')' },
          { id: 'allotment_letters', label: '📄 Allotment Letters' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              if (tab.id === 'create_booking') {
                setShowNewBookingModal(true);
              } else {
                setActiveBookingSubTab(tab.id as any);
              }
            }}
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: '800',
              background: activeBookingSubTab === tab.id ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : (isLight ? '#f1f5f9' : '#0f172a'),
              color: activeBookingSubTab === tab.id ? '#ffffff' : (isLight ? '#475569' : '#94a3b8')
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* SUB-TAB 1: ALL BOOKINGS VAULT */}
      {activeBookingSubTab === 'all_bookings' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📋 Master Property Unit Booking Vault</h3>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Central database of confirmed unit bookings, token advance receipts, and allotment statuses.</p>
            </div>
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                  <th style={{ padding: '12px' }}>Booking Code & Date</th>
                  <th style={{ padding: '12px' }}>Customer Name & Contact</th>
                  <th style={{ padding: '12px' }}>Project, Builder & Unit Details</th>
                  <th style={{ padding: '12px' }}>Agreement Value & Advance Token</th>
                  <th style={{ padding: '12px' }}>Payment Mode & Ref</th>
                  <th style={{ padding: '12px' }}>Channel Partner Brokerage</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Approval Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b: any) => (
                  <tr key={b.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}>
                        🆔 {b.booking_code}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                        📅 {b.booking_date}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.9rem' }}>{b.customer_name}</strong>
                      <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{b.customer_mobile}</span>
                      <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{b.customer_number}</div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: '#fbbf24', fontSize: '0.88rem' }}>🏢 {b.project_name}</strong>
                      <div style={{ marginTop: '3px', marginBottom: '3px' }}>
                        <span style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #0284c7', color: '#38bdf8', fontSize: '0.72rem', fontWeight: '900', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block' }}>
                          🏢 Property Code: {b.property_code || b.propertyCode || 'SRM-PROP-2026-000426'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', marginTop: '2px' }}>
                        {b.developer_name} • {b.tower_unit}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.9rem' }}>{b.agreement_value}</span>
                      <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '800', marginTop: '2px' }}>
                        💸 Advance Paid: ₹{Number(b.token_amount).toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800' }}>
                        💳 {b.payment_mode}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace', marginTop: '2px' }}>
                        Ref: {b.payment_ref}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ color: '#22c55e', fontWeight: '900', fontSize: '0.82rem' }}>💰 {b.brokerage_rate || '2.0%'} Brokerage</span>
                      <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                        Earned: ₹{Number(b.brokerage_amount || 168000).toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.75rem', display: 'inline-block' }}>
                        ✓ {b.approval_status || 'APPROVED_LOCKED'}
                      </span>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => setShowAllotmentModal({ open: true, booking: b })} 
                          style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          📄 Allotment PDF
                        </button>
                        <button 
                          onClick={() => handleTransferToBilling(b)} 
                          style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 6px rgba(16, 185, 129, 0.3)' }}
                          title="Generate Tax Invoice, remove from Booking Management, and transfer to Billing Management"
                        >
                          💳 Billing
                        </button>
                        {isSuperAdmin && (
                          <button 
                            onClick={() => {
                              if (window.confirm(`⚠️ CONFIRM DELETION:\n\nAre you sure you want to permanently delete Booking record ${b.booking_code || b.id} for ${b.customer_name || 'Customer'}?`)) {
                                if (setBookings) {
                                  setBookings((prev: any[]) => (prev || []).filter((item: any) => item.id !== b.id && item.booking_code !== b.booking_code));
                                }
                                alert(`🗑️ Booking record ${b.booking_code || b.id} deleted permanently.`);
                              }
                            }}
                            style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                            title="Permanently delete booking record"
                          >
                            🗑️ Delete
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: BOOKING APPROVALS & TOKEN LOCK */}
      {activeBookingSubTab === 'booking_approvals' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>⚖️ Manager Token Verification & Unit Lock Approval Queue</h3>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h4 style={{ color: '#4ade80', fontWeight: '900' }}>✓ All Current Bookings Verified & Locked</h4>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Token advance payments verified by finance manager. Locked inventory units will not be available for other prospects.</p>
            </div>
            <span style={{ background: '#22c55e', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontWeight: '900', fontSize: '0.8rem' }}>
              LOCKING SYSTEM ACTIVE
            </span>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: ALLOTMENT LETTERS */}
      {activeBookingSubTab === 'allotment_letters' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📄 Automated Corporate Unit Allotment Letters</h3>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '12px' }}>
            {bookings.map((b: any) => (
              <div key={b.id} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800', fontFamily: 'monospace' }}>{b.booking_code}</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>{b.customer_name}</h4>
                  <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>{b.project_name} • {b.tower_unit}</p>
                </div>
                <button 
                  onClick={() => setShowAllotmentModal({ open: true, booking: b })} 
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}
                >
                  📄 Print Allotment PDF
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
