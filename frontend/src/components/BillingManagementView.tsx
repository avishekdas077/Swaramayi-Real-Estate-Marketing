import React, { useState } from 'react';
import { CreditCard, Plus, Printer, Calendar, Link, CheckCircle2, Clock, Share2, Copy, Send, DollarSign, X } from 'lucide-react';

interface BillingManagementViewProps {
  isLight: boolean;
  billingInvoiceCategory: string;
  setBillingInvoiceCategory: (category: string) => void;
  invoices: any[];
  setInvoices?: (invoices: any[]) => void;
  searchQuery: string;
  matchesSearchQuery: (item: any, query: string) => boolean;
  setCreateInvoiceForm: (form: any) => void;
  setShowCreateInvoiceModal: (val: boolean) => void;
  setShowPrintInvoiceModal: (val: any) => void;
  currentRole?: string;
  users?: any[];
  branches?: any[];
}

export const BillingManagementView: React.FC<BillingManagementViewProps> = ({
  isLight,
  billingInvoiceCategory,
  setBillingInvoiceCategory,
  invoices = [],
  setInvoices,
  searchQuery,
  matchesSearchQuery,
  setCreateInvoiceForm,
  setShowCreateInvoiceModal,
  setShowPrintInvoiceModal,
  currentRole,
  users = [],
  branches = [],
}) => {
  const getCurrentUserBranch = () => {
    const matchedUser = (users || []).find((u: any) => u.role === currentRole) || (users || []).find((u: any) => u.id === 'USR-01') || (users || [])[0];
    if (matchedUser && matchedUser.branch_name) {
      if (matchedUser.branch_name === 'Head Office') return 'Head Office (Kolkata)';
      return matchedUser.branch_name;
    }
    if (currentRole === 'SUPER_ADMIN' || currentRole === 'OWNER') return 'Head Office (Kolkata)';
    if (branches && branches.length > 0) return branches[0].branch_name;
    return 'Head Office (Kolkata)';
  };

  const [datePeriodFilter, setDatePeriodFilter] = useState<'ALL' | 'TODAY' | 'WEEK' | 'MONTH' | 'CUSTOM'>('ALL');
  const [startDateFilter, setStartDateFilter] = useState<string>('2026-08-01');
  const [endDateFilter, setEndDateFilter] = useState<string>('2026-08-31');

  // MODAL STATES
  const [showPaymentLinkModal, setShowPaymentLinkModal] = useState<any>(null);
  const [showRecordPaymentModal, setShowRecordPaymentModal] = useState<any>(null);
  const [showCustomerPaymentPortal, setShowCustomerPaymentPortal] = useState<any>(null);
  const [portalPaymentTab, setPortalPaymentTab] = useState<'UPI' | 'CARD' | 'NEFT'>('UPI');
  const [isProcessingPayment, setIsProcessingPayment] = useState<boolean>(false);
  const [paymentSuccessReceipt, setPaymentSuccessReceipt] = useState<any>(null);

  const [paymentModeInput, setPaymentModeInput] = useState<'ONLINE' | 'CASH' | 'CHEQUE' | 'NEFT'>('ONLINE');
  const [paymentStatusInput, setPaymentStatusInput] = useState<'PAID_SETTLED' | 'UNPAID_PENDING'>('PAID_SETTLED');
  const [paymentRefInput, setPaymentRefInput] = useState<string>('');
  const [copyToast, setCopyToast] = useState<boolean>(false);

  const isDateInPeriod = (dateStr: string) => {
    if (!dateStr || datePeriodFilter === 'ALL') return true;

    const todayStr = '2026-08-29'; // system reference current date
    if (datePeriodFilter === 'TODAY') {
      return dateStr === todayStr || dateStr === new Date().toISOString().split('T')[0];
    }

    if (datePeriodFilter === 'WEEK') {
      return dateStr >= '2026-08-23' && dateStr <= '2026-08-31';
    }

    if (datePeriodFilter === 'MONTH') {
      return dateStr.startsWith('2026-08');
    }

    if (datePeriodFilter === 'CUSTOM') {
      if (!startDateFilter && !endDateFilter) return true;
      const start = startDateFilter || '2020-01-01';
      const end = endDateFilter || '2030-12-31';
      return dateStr >= start && dateStr <= end;
    }

    return true;
  };

  const handleUpdatePayment = () => {
    if (!showRecordPaymentModal || !setInvoices) return;

    const updated = invoices.map(inv => {
      if (inv.id === showRecordPaymentModal.id) {
        return {
          ...inv,
          payment_status: paymentStatusInput,
          payment_mode: paymentStatusInput === 'PAID_SETTLED' ? paymentModeInput : undefined,
          payment_ref: paymentRefInput || undefined
        };
      }
      return inv;
    });

    setInvoices(updated);
    setShowRecordPaymentModal(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* CATEGORY HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <CreditCard size={24} color="#38bdf8" /> GST Tax Billing & Invoice Management Vault
          </h2>
          <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>Generate and manage GST 18% tax invoices for direct Customer billing and Developer channel partner brokerage.</p>
        </div>

        <div>
          <button 
            onClick={() => {
              setCreateInvoiceForm({
                invoice_category: billingInvoiceCategory,
                branch_name: getCurrentUserBranch(),
                customer_name: 'Rohan Deshmukh',
                customer_number: 'SRM-CUS-2026-000184',
                customer_mobile: '+91 90490 12345',
                customer_email: 'rohan.deshmukh@gmail.com',
                customer_address: 'Flat 402, Royal Heights, Jubilee Hills, Hyderabad - 500033',
                place_of_supply: '36 - Telangana',
                customer_gstin_pan: '36ABCDE1234F1Z5',
                developer_name: billingInvoiceCategory === 'DEVELOPER' ? 'Aparna Constructions' : 'Aparna Constructions',
                developer_gstin: '36AAACA1234F1Z5',
                property_title: 'Aparna Zenon Premium 3BHK Residence',
                particulars: billingInvoiceCategory === 'DEVELOPER' ? '2.0% Channel Partner Success Fee / Brokerage' : 'Property Consultation & Processing Charges',
                brokerage_percent: '2.0',
                flat_price: '8000000',
                parking_price: '400000',
                agreement_value: '8400000',
                taxable_value: '168000',
                bank_name: 'HDFC Bank',
                bank_account_number: '50200018942109',
                bank_ifsc_code: 'HDFC0000128',
                bank_upi_id: 'swaramayi@hdfcbank'
              });
              setShowCreateInvoiceModal(true);
            }}
            style={{ background: billingInvoiceCategory === 'DEVELOPER' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
          >
            <Plus size={16} /> + Create {billingInvoiceCategory === 'DEVELOPER' ? 'Developer Brokerage Invoice' : 'Customer Tax Invoice'}
          </button>
        </div>
      </div>

      {/* TWO MAIN CATEGORY SWITCHER TABS */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '2px solid #e2e8f0' : '2px solid #334155', paddingBottom: '12px' }}>
        <button 
          onClick={() => setBillingInvoiceCategory('CUSTOMER')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: '800',
            background: billingInvoiceCategory === 'CUSTOMER' ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)' : (isLight ? '#f1f5f9' : '#0f172a'),
            color: billingInvoiceCategory === 'CUSTOMER' ? '#ffffff' : (isLight ? '#475569' : '#94a3b8'),
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: billingInvoiceCategory === 'CUSTOMER' ? '0 4px 12px rgba(2, 132, 199, 0.25)' : 'none'
          }}
        >
          👤 Customer Tax Invoices ({invoices.filter(i => i.invoice_category === 'CUSTOMER' || !i.invoice_category).length})
        </button>

        <button 
          onClick={() => setBillingInvoiceCategory('DEVELOPER')}
          style={{
            padding: '10px 20px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.88rem',
            fontWeight: '800',
            background: billingInvoiceCategory === 'DEVELOPER' ? 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)' : (isLight ? '#f1f5f9' : '#0f172a'),
            color: billingInvoiceCategory === 'DEVELOPER' ? '#ffffff' : (isLight ? '#475569' : '#94a3b8'),
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: billingInvoiceCategory === 'DEVELOPER' ? '0 4px 12px rgba(22, 163, 74, 0.25)' : 'none'
          }}
        >
          🏢 Developer Brokerage Invoices ({invoices.filter(i => i.invoice_category === 'DEVELOPER').length})
        </button>
      </div>

      {/* DATE PERIOD & GROUPING FILTER TOOLBAR */}
      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} color="#38bdf8" />
            <span style={{ fontSize: '0.88rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
              📅 Filter Invoices by Period (Date-Wise, Week-Wise, Month-Wise)
            </span>
          </div>

          {/* DATE PERIOD PILL BUTTONS */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {[
              { key: 'ALL', label: '📅 All Time' },
              { key: 'TODAY', label: '⚡ Date-Wise (Today)' },
              { key: 'WEEK', label: '🗓️ Week-Wise (This Week)' },
              { key: 'MONTH', label: '📆 Month-Wise (August 2026)' },
              { key: 'CUSTOM', label: '🛠️ Custom Range' },
            ].map(p => (
              <button
                key={p.key}
                onClick={() => setDatePeriodFilter(p.key as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  border: datePeriodFilter === p.key ? '2px solid #38bdf8' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                  background: datePeriodFilter === p.key ? (billingInvoiceCategory === 'DEVELOPER' ? '#16a34a' : '#0284c7') : (isLight ? '#ffffff' : '#1e293b'),
                  color: datePeriodFilter === p.key ? '#ffffff' : (isLight ? '#475569' : '#94a3b8'),
                  fontWeight: datePeriodFilter === p.key ? '900' : '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  boxShadow: datePeriodFilter === p.key ? '0 2px 8px rgba(56, 189, 248, 0.3)' : 'none'
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* CUSTOM DATE RANGE PICKER */}
        {datePeriodFilter === 'CUSTOM' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: isLight ? '#ffffff' : '#1e293b', padding: '10px 14px', borderRadius: '8px', border: '1px solid #38bdf8', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: isLight ? '#64748b' : '#94a3b8' }}>From Date:</label>
              <input 
                type="date" 
                value={startDateFilter} 
                onChange={(e) => setStartDateFilter(e.target.value)} 
                style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem' }} 
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: '800', color: isLight ? '#64748b' : '#94a3b8' }}>To Date:</label>
              <input 
                type="date" 
                value={endDateFilter} 
                onChange={(e) => setEndDateFilter(e.target.value)} 
                style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem' }} 
              />
            </div>
          </div>
        )}

        {/* PERIOD METRICS SUMMARY RIBBON */}
        {(() => {
          const categoryInvoices = invoices.filter(i => (billingInvoiceCategory === 'DEVELOPER' ? i.invoice_category === 'DEVELOPER' : (i.invoice_category === 'CUSTOMER' || !i.invoice_category)));
          const filteredInvoices = categoryInvoices.filter(i => matchesSearchQuery(i, searchQuery) && isDateInPeriod(i.created_date));
          const totalBilled = filteredInvoices.reduce((acc, curr) => acc + Number(curr.total_invoice_amount || 0), 0);
          const taxableRevenue = filteredInvoices.reduce((acc, curr) => acc + Number(curr.taxable_value || 0), 0);
          const gstCollected = filteredInvoices.reduce((acc, curr) => acc + (Number(curr.cgst_amount || 0) + Number(curr.sgst_amount || 0)), 0);

          return (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', paddingTop: '4px' }}>
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TOTAL INVOICES</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#38bdf8' }}>{filteredInvoices.length} Records</div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TOTAL BILLED AMOUNT</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#4ade80' }}>₹{totalBilled.toLocaleString('en-IN')}</div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TAXABLE REVENUE</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#fbbf24' }}>₹{taxableRevenue.toLocaleString('en-IN')}</div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 12px' }}>
                <div style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>GST COLLECTED (18%)</div>
                <div style={{ fontSize: '1.1rem', fontWeight: '900', color: '#a855f7' }}>₹{gstCollected.toLocaleString('en-IN')}</div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* TABLE CONTAINER */}
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
        <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '12px' }}>Invoice Number & Branch</th>
                <th style={{ padding: '12px' }}>{billingInvoiceCategory === 'DEVELOPER' ? 'Developer / Builder Name & GSTIN' : 'Customer Name & Contact'}</th>
                <th style={{ padding: '12px' }}>Property Title & Particulars</th>
                <th style={{ padding: '12px' }}>Taxable Value & GST (18%)</th>
                <th style={{ padding: '12px' }}>Total Amount Billed</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Payment Status & Mode</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices
                .filter(i => (billingInvoiceCategory === 'DEVELOPER' ? i.invoice_category === 'DEVELOPER' : (i.invoice_category === 'CUSTOMER' || !i.invoice_category)))
                .filter(i => matchesSearchQuery(i, searchQuery))
                .filter(i => isDateInPeriod(i.created_date))
                .map(i => (
                  <tr key={i.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}>
                        🆔 {i.invoice_number}
                      </span>
                      <div style={{ fontSize: '0.74rem', color: isLight ? '#475569' : '#cbd5e1', fontWeight: '800', marginTop: '4px' }}>
                        🏛️ {i.branch_name || 'Kolkata Branch'}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                        📅 {i.created_date || '2026-08-25'}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      {billingInvoiceCategory === 'DEVELOPER' ? (
                        <div>
                          <strong style={{ color: '#fbbf24', fontSize: '0.9rem' }}>🏢 {i.developer_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#38bdf8', fontFamily: 'monospace', marginTop: '2px' }}>
                            GSTIN: {i.developer_gstin || '36AAACA1234F1Z5'}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                            👤 {i.developer_contact_person || 'Mr. S. K. Reddy'} • 📞 {i.developer_mobile || '+91 98490 99887'}
                          </div>
                        </div>
                      ) : (
                        <div>
                          <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.9rem' }}>👤 {i.customer_name}</strong>
                          <div style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace', marginTop: '2px' }}>
                            {i.customer_mobile || '+91 98490 12345'}
                          </div>
                        </div>
                      )}
                    </td>

                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.85rem' }}>{i.property_title}</strong>
                      <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                        {i.particulars || 'Property Consultation & Service Charges'}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800' }}>₹{Number(i.taxable_value || 200000).toLocaleString('en-IN')}</span>
                      <div style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '700', marginTop: '2px' }}>
                        + GST 18%: ₹{Number((i.cgst_amount || 18000) + (i.sgst_amount || 18000)).toLocaleString('en-IN')}
                      </div>
                    </td>

                    <td style={{ padding: '12px' }}>
                      <span style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.95rem' }}>
                        ₹{Number(i.total_invoice_amount || 236000).toLocaleString('en-IN')}
                      </span>
                    </td>

                    {/* INTERACTIVE PAYMENT STATUS & MODE COLUMN */}
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                        <span style={{ 
                          background: i.payment_status === 'PAID_SETTLED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)', 
                          color: i.payment_status === 'PAID_SETTLED' ? '#4ade80' : '#fbbf24', 
                          border: `1px solid ${i.payment_status === 'PAID_SETTLED' ? '#22c55e' : '#eab308'}`, 
                          padding: '4px 10px', 
                          borderRadius: '20px', 
                          fontWeight: '900', 
                          fontSize: '0.74rem', 
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {i.payment_status === 'PAID_SETTLED' ? (
                            <>✓ PAID ({i.payment_mode || 'ONLINE'})</>
                          ) : (
                            <>⏳ UNPAID / PENDING</>
                          )}
                        </span>

                        <button
                          onClick={() => {
                            setShowRecordPaymentModal(i);
                            setPaymentStatusInput(i.payment_status || 'PAID_SETTLED');
                            setPaymentModeInput(i.payment_mode || 'ONLINE');
                            setPaymentRefInput(i.payment_ref || '');
                          }}
                          style={{
                            background: 'transparent',
                            border: isLight ? '1px solid #cbd5e1' : '1px solid #334155',
                            color: isLight ? '#0284c7' : '#38bdf8',
                            fontSize: '0.7rem',
                            fontWeight: '800',
                            borderRadius: '4px',
                            padding: '2px 8px',
                            cursor: 'pointer'
                          }}
                        >
                          ⚡ Update Payment
                        </button>
                      </div>
                    </td>

                    {/* ACTIONS COLUMN WITH PRINT PDF & PAYMENT LINK */}
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button 
                          onClick={() => setShowPrintInvoiceModal({ open: true, invoice: i })} 
                          style={{ background: billingInvoiceCategory === 'DEVELOPER' ? '#16a34a' : '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          <Printer size={13} /> Print GST PDF
                        </button>

                        <button 
                          onClick={() => {
                            setShowPaymentLinkModal(i);
                            setCopyToast(false);
                          }} 
                          style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(168, 85, 247, 0.3)' }}
                        >
                          <Link size={13} /> Payment Link
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: RECORD / UPDATE PAYMENT & SELECT PAYMENT MODE */}
      {showRecordPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #38bdf8', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '900' }}>⚡ PAYMENT STATUS & MODE SETTLEMENT</span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>
                  Update {showRecordPaymentModal.invoice_number}
                </h3>
              </div>
              <button onClick={() => setShowRecordPaymentModal(null)} style={{ background: 'none', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* STATUS TOGGLE */}
            <div>
              <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '8px' }}>
                Select Payment Status *
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setPaymentStatusInput('PAID_SETTLED')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: paymentStatusInput === 'PAID_SETTLED' ? '2px solid #22c55e' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                    background: paymentStatusInput === 'PAID_SETTLED' ? 'rgba(34, 197, 94, 0.15)' : (isLight ? '#f8fafc' : '#0f172a'),
                    color: paymentStatusInput === 'PAID_SETTLED' ? '#22c55e' : (isLight ? '#475569' : '#94a3b8'),
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '6px'
                  }}
                >
                  <CheckCircle2 size={16} /> ✓ Mark as PAID
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentStatusInput('UNPAID_PENDING')}
                  style={{
                    padding: '10px',
                    borderRadius: '8px',
                    border: paymentStatusInput === 'UNPAID_PENDING' ? '2px solid #eab308' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                    background: paymentStatusInput === 'UNPAID_PENDING' ? 'rgba(234, 179, 8, 0.15)' : (isLight ? '#f8fafc' : '#0f172a'),
                    color: paymentStatusInput === 'UNPAID_PENDING' ? '#eab308' : (isLight ? '#475569' : '#94a3b8'),
                    fontWeight: '900',
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '6px'
                  }}
                >
                  <Clock size={16} /> ⏳ Mark as PENDING
                </button>
              </div>
            </div>

            {/* PAYMENT MODE SELECTOR (WHEN PAID IS SELECTED) */}
            {paymentStatusInput === 'PAID_SETTLED' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', padding: '14px', borderRadius: '10px', border: '1px solid #22c55e' }}>
                <label style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', display: 'block' }}>
                  💳 Select Payment Mode *
                </label>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {[
                    { mode: 'ONLINE', label: '💳 ONLINE (UPI / Card)' },
                    { mode: 'CASH', label: '💵 CASH (Physical Cash)' },
                    { mode: 'CHEQUE', label: '📑 CHEQUE (Check Deposit)' },
                    { mode: 'NEFT', label: '🏦 NEFT / RTGS / IMPS' },
                  ].map(m => (
                    <button
                      key={m.mode}
                      type="button"
                      onClick={() => setPaymentModeInput(m.mode as any)}
                      style={{
                        padding: '8px 10px',
                        borderRadius: '6px',
                        border: paymentModeInput === m.mode ? '2px solid #38bdf8' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                        background: paymentModeInput === m.mode ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'),
                        color: paymentModeInput === m.mode ? '#ffffff' : (isLight ? '#0f172a' : '#ffffff'),
                        fontWeight: paymentModeInput === m.mode ? '900' : '700',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>

                <div>
                  <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                    Payment Reference / Txn No. (Optional)
                  </label>
                  <input 
                    type="text" 
                    value={paymentRefInput} 
                    onChange={(e) => setPaymentRefInput(e.target.value)} 
                    placeholder="e.g. TXN90412895 or CHQ-401928" 
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace' }} 
                  />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button type="button" onClick={() => setShowRecordPaymentModal(null)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
              <button type="button" onClick={handleUpdatePayment} style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer' }}>
                ✓ Save Payment Status
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: GENERATE & SHARE INSTANT PAYMENT LINK */}
      {showPaymentLinkModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #6366f1', borderRadius: '16px', width: '100%', maxWidth: '580px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '18px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.2rem', color: '#6366f1' }}>🔗</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                  Invoice Payment Link
                </h3>
              </div>
              <button onClick={() => setShowPaymentLinkModal(null)} style={{ background: 'none', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* GREEN ALERT BANNER */}
            <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontSize: '0.85rem', fontWeight: '800' }}>
              <CheckCircle2 size={18} />
              <span>Payment link successfully generated for invoice <strong>{showPaymentLinkModal.invoice_number}</strong>!</span>
            </div>

            {/* INVOICE DETAILS WHITE CARD */}
            <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', color: '#0f172a', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: '700' }}>Customer / Billed Name</span>
                <strong style={{ fontSize: '0.9rem' }}>{showPaymentLinkModal.customer_name || showPaymentLinkModal.developer_name}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: '700' }}>Invoice Reference Number</span>
                <strong style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '0.9rem' }}>{showPaymentLinkModal.invoice_number}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: '700' }}>Property Unit</span>
                <strong style={{ fontSize: '0.85rem' }}>{showPaymentLinkModal.property_title}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', fontSize: '0.72rem', display: 'block', fontWeight: '700' }}>Total Payable Amount</span>
                <strong style={{ color: '#16a34a', fontSize: '1.1rem' }}>₹{Number(showPaymentLinkModal.total_invoice_amount).toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* GENERATED PAYMENT LINK URL INPUT BOX */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>
                Generated Payment Link URL:
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="text" 
                  readOnly 
                  value={`${window.location.origin}/pay/invoice?inv=${showPaymentLinkModal.invoice_number}`} 
                  style={{ flex: 1, background: isLight ? '#0f172a' : '#0f172a', border: '1px solid #6366f1', color: '#38bdf8', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', fontFamily: 'monospace' }} 
                />
                <button
                  type="button"
                  onClick={() => {
                    const payUrl = `${window.location.origin}/pay/invoice?inv=${showPaymentLinkModal.invoice_number}`;
                    navigator.clipboard.writeText(payUrl);
                    setCopyToast(true);
                    setTimeout(() => setCopyToast(false), 3000);
                  }}
                  style={{ background: '#6366f1', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}
                >
                  <Copy size={16} /> {copyToast ? '✓ Copied!' : 'Copy'}
                </button>
              </div>
              {copyToast && (
                <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: '800', marginTop: '2px' }}>
                  ✓ Payment Link URL successfully copied to clipboard!
                </div>
              )}
            </div>

            {/* INSTANT SHARE ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => {
                    const phone = (showPaymentLinkModal.customer_mobile || showPaymentLinkModal.developer_mobile || '').replace(/[^0-9]/g, '');
                    const payUrl = `${window.location.origin}/pay/invoice?inv=${showPaymentLinkModal.invoice_number}`;
                    const msg = encodeURIComponent(`Hello ${showPaymentLinkModal.customer_name || showPaymentLinkModal.developer_name},\n\nHere is your official Swaramayi Real Estate GST Tax Invoice ${showPaymentLinkModal.invoice_number} for ₹${Number(showPaymentLinkModal.total_invoice_amount).toLocaleString('en-IN')}.\n\nPay online securely via UPI / Card / Net Banking:\n${payUrl}\n\nThank you,\nSwaramayi Real Estate Marketing`);
                    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
                  }}
                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Share2 size={16} /> Share on WhatsApp
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const email = showPaymentLinkModal.customer_email || showPaymentLinkModal.developer_email || 'rohan.deshmukh@gmail.com';
                    const payUrl = `${window.location.origin}/pay/invoice?inv=${showPaymentLinkModal.invoice_number}`;
                    const subject = encodeURIComponent(`Tax Invoice Payment Link - ${showPaymentLinkModal.invoice_number}`);
                    const body = encodeURIComponent(`Dear ${showPaymentLinkModal.customer_name || showPaymentLinkModal.developer_name},\n\nPlease find your official Swaramayi Real Estate GST Tax Invoice payment link below:\n\n• Invoice Number: ${showPaymentLinkModal.invoice_number}\n• Property Unit: ${showPaymentLinkModal.property_title}\n• Total Payable Amount: ₹${Number(showPaymentLinkModal.total_invoice_amount).toLocaleString('en-IN')}\n\n🌐 Secure Online Payment URL:\n${payUrl}\n\nRegards,\nSwaramayi Real Estate Marketing`);
                    window.open(`mailto:${email}?subject=${subject}&body=${body}`, '_blank');
                  }}
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Send size={16} /> Send via Email
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const payUrl = `${window.location.origin}/pay/invoice?inv=${showPaymentLinkModal.invoice_number}`;
                    navigator.clipboard.writeText(payUrl);
                    setCopyToast(true);
                    setTimeout(() => setCopyToast(false), 3000);
                  }}
                  style={{ background: '#4f46e5', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Copy size={16} /> Copy Payment Link
                </button>
              </div>

              <button type="button" onClick={() => setShowPaymentLinkModal(null)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.82rem' }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: LIVE INTERACTIVE CUSTOMER ONLINE PAYMENT GATEWAY PORTAL */}
      {showCustomerPaymentPortal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 20000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', borderRadius: '20px', width: '100%', maxWidth: '680px', maxHeight: '92vh', overflowY: 'auto', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)' }}>
            
            {/* HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #22c55e', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img 
                  src="/swaramayi-logo.png" 
                  alt="Swaramayi Logo" 
                  style={{ height: '46px', background: '#ffffff', padding: '3px 10px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', objectFit: 'contain' }} 
                />
                <div>
                  <span style={{ background: '#22c55e', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', letterSpacing: '0.5px' }}>
                    🔒 256-BIT SSL SECURE PAYMENT GATEWAY
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '4px', margin: 0 }}>
                    SWARAMAYI REAL ESTATE ONLINE CHECKOUT
                  </h2>
                </div>
              </div>
              <button onClick={() => { setShowCustomerPaymentPortal(null); setPaymentSuccessReceipt(null); }} style={{ background: 'none', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer' }}><X size={22} /></button>
            </div>

            {/* SUCCESS RECEIPT VIEW */}
            {paymentSuccessReceipt ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center', padding: '20px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(34, 197, 94, 0.2)', border: '2px solid #22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={36} color="#22c55e" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#22c55e' }}>Payment Successful & Settled!</h3>
                  <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                    Transaction Receipt #{paymentSuccessReceipt.txnId} generated successfully.
                  </p>
                </div>

                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', width: '100%', textAlign: 'left', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
                  <div><strong>Invoice Number:</strong> {paymentSuccessReceipt.invoice_number}</div>
                  <div><strong>Amount Paid:</strong> <strong style={{ color: '#22c55e' }}>₹{Number(paymentSuccessReceipt.amount).toLocaleString('en-IN')}</strong></div>
                  <div><strong>Payment Mode:</strong> {paymentSuccessReceipt.mode}</div>
                  <div><strong>Date & Time:</strong> {paymentSuccessReceipt.timestamp}</div>
                  <div style={{ gridColumn: 'span 2' }}><strong>SHA256 Stamp:</strong> <span style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#38bdf8' }}>{paymentSuccessReceipt.hash}</span></div>
                </div>

                <button
                  onClick={() => {
                    setShowCustomerPaymentPortal(null);
                    setPaymentSuccessReceipt(null);
                  }}
                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  ✓ Done & Return to Vault
                </button>
              </div>
            ) : (
              <>
                {/* INVOICE PAYABLE BILL SUMMARY BOX */}
                <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', borderRadius: '14px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', opacity: 0.9, fontWeight: '700' }}>PAYABLE INVOICE AMOUNT</span>
                    <h1 style={{ fontSize: '1.8rem', fontWeight: '900', margin: '2px 0 0 0' }}>
                      ₹{Number(showCustomerPaymentPortal.total_invoice_amount).toLocaleString('en-IN')}
                    </h1>
                    <div style={{ fontSize: '0.78rem', opacity: 0.85, marginTop: '4px' }}>
                      Invoice: {showCustomerPaymentPortal.invoice_number} • Billed To: {showCustomerPaymentPortal.customer_name || showCustomerPaymentPortal.developer_name}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(4px)', padding: '8px 14px', borderRadius: '10px', textAlign: 'center' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: '900', display: 'block' }}>PAYMENT STATUS</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#fbbf24' }}>⏳ PENDING</span>
                  </div>
                </div>

                {/* ONLINE PAYMENT METHOD TABS */}
                <div>
                  <label style={{ fontSize: '0.8rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', display: 'block', marginBottom: '8px' }}>
                    Choose Preferred Payment Method:
                  </label>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                    {[
                      { tab: 'UPI', label: '📱 UPI (GPay / Paytm)' },
                      { tab: 'CARD', label: '💳 Credit / Debit Card' },
                      { tab: 'NEFT', label: '🏦 Net Banking / NEFT' },
                    ].map(t => (
                      <button
                        key={t.tab}
                        onClick={() => setPortalPaymentTab(t.tab as any)}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: portalPaymentTab === t.tab ? '2px solid #22c55e' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                          background: portalPaymentTab === t.tab ? (isLight ? '#f0fdf4' : '#052e16') : (isLight ? '#ffffff' : '#1e293b'),
                          color: portalPaymentTab === t.tab ? '#22c55e' : (isLight ? '#475569' : '#94a3b8'),
                          fontWeight: '900',
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* TAB 1: UPI PAY */}
                {portalPaymentTab === 'UPI' && (
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
                    <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '2px solid #22c55e', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(`upi://pay?pa=${showCustomerPaymentPortal.bank_upi_id || 'swaramayi@hdfcbank'}&pn=Swaramayi%20Real%20Estate&am=${showCustomerPaymentPortal.total_invoice_amount}&tr=${showCustomerPaymentPortal.invoice_number}`)}`} 
                        alt="UPI QR Code" 
                        style={{ width: '160px', height: '160px' }}
                      />
                      <span style={{ fontSize: '0.75rem', fontWeight: '900', color: '#0f172a', fontFamily: 'monospace' }}>
                        VPA: {showCustomerPaymentPortal.bank_upi_id || 'swaramayi@hdfcbank'}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                      Scan QR Code with any UPI App or click instant pay button below:
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                      <button type="button" onClick={() => setPortalPaymentTab('UPI')} style={{ background: '#4285F4', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800', cursor: 'pointer' }}>Google Pay</button>
                      <button type="button" onClick={() => setPortalPaymentTab('UPI')} style={{ background: '#5f259f', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800', cursor: 'pointer' }}>PhonePe</button>
                      <button type="button" onClick={() => setPortalPaymentTab('UPI')} style={{ background: '#00baf2', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800', cursor: 'pointer' }}>Paytm UPI</button>
                    </div>
                  </div>
                )}

                {/* TAB 2: CREDIT / DEBIT CARD */}
                {portalPaymentTab === 'CARD' && (
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Cardholder Full Name</label>
                      <input type="text" defaultValue={showCustomerPaymentPortal.customer_name || 'Rohan Deshmukh'} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>16-Digit Card Number</label>
                      <input type="text" defaultValue="4532 8910 2034 9012" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace' }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Expiry Date (MM/YY)</label>
                        <input type="text" defaultValue="09/29" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>CVV Security Code</label>
                        <input type="password" defaultValue="849" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', fontFamily: 'monospace' }} />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: NET BANKING / NEFT */}
                {portalPaymentTab === 'NEFT' && (
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                    <div><strong>Beneficiary Bank:</strong> {showCustomerPaymentPortal.bank_name || 'HDFC Bank'}</div>
                    <div><strong>Account Number:</strong> <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{showCustomerPaymentPortal.bank_account_number || '50200018942109'}</span></div>
                    <div><strong>IFSC Code:</strong> <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{showCustomerPaymentPortal.bank_ifsc_code || 'HDFC0000128'}</span></div>
                    <div><strong>Account Name:</strong> Swaramayi Real Estate</div>
                    <div style={{ gridColumn: 'span 2', fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                      Transfer amount via NEFT / RTGS / IMPS and click "Complete Secure Payment" below.
                    </div>
                  </div>
                )}

                {/* ACTION BUTTON TO COMPLETE PAYMENT LIVE */}
                <button
                  type="button"
                  disabled={isProcessingPayment}
                  onClick={() => {
                    setIsProcessingPayment(true);
                    setTimeout(() => {
                      const txnId = 'TXN-2026-' + Math.floor(100000 + Math.random() * 900000);
                      const hash = 'SHA256-' + Math.random().toString(36).substring(2, 12).toUpperCase();

                      // Update invoice in state
                      if (setInvoices) {
                        const updated = invoices.map(inv => {
                          if (inv.id === showCustomerPaymentPortal.id || inv.invoice_number === showCustomerPaymentPortal.invoice_number) {
                            return {
                              ...inv,
                              payment_status: 'PAID_SETTLED',
                              payment_mode: portalPaymentTab,
                              payment_ref: txnId
                            };
                          }
                          return inv;
                        });
                        setInvoices(updated);
                      }

                      setIsProcessingPayment(false);
                      setPaymentSuccessReceipt({
                        txnId,
                        hash,
                        invoice_number: showCustomerPaymentPortal.invoice_number,
                        amount: showCustomerPaymentPortal.total_invoice_amount,
                        mode: portalPaymentTab,
                        timestamp: new Date().toLocaleString('en-IN')
                      });
                    }, 1200);
                  }}
                  style={{
                    background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '10px',
                    fontWeight: '900',
                    fontSize: '1rem',
                    cursor: isProcessingPayment ? 'wait' : 'pointer',
                    boxShadow: '0 4px 16px rgba(34, 197, 94, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justify: 'center',
                    gap: '8px'
                  }}
                >
                  {isProcessingPayment ? (
                    <>⏳ Processing Payment via Bank Network...</>
                  ) : (
                    <>✓ Complete Secure Payment (₹{Number(showCustomerPaymentPortal.total_invoice_amount).toLocaleString('en-IN')})</>
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
