import React from 'react';
import { CreditCard, Plus, Printer } from 'lucide-react';

interface BillingManagementViewProps {
  isLight: boolean;
  billingInvoiceCategory: string;
  setBillingInvoiceCategory: (category: string) => void;
  invoices: any[];
  searchQuery: string;
  matchesSearchQuery: (item: any, query: string) => boolean;
  setCreateInvoiceForm: (form: any) => void;
  setShowCreateInvoiceModal: (val: boolean) => void;
  setShowPrintInvoiceModal: (val: any) => void;
}

export const BillingManagementView: React.FC<BillingManagementViewProps> = ({
  isLight,
  billingInvoiceCategory,
  setBillingInvoiceCategory,
  invoices = [],
  searchQuery,
  matchesSearchQuery,
  setCreateInvoiceForm,
  setShowCreateInvoiceModal,
  setShowPrintInvoiceModal,
}) => {
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
                particulars: billingInvoiceCategory === 'DEVELOPER' ? '2.0% Channel Partner Success Fee / Commission for Unit A-504' : 'Property Consultation & Processing Charges',
                agreement_value: '8400000',
                taxable_value: billingInvoiceCategory === 'DEVELOPER' ? '168000' : '200000'
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

      {/* TABLE CONTAINER */}
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px' }}>
        <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '12px' }}>Invoice Number & Date</th>
                <th style={{ padding: '12px' }}>{billingInvoiceCategory === 'DEVELOPER' ? 'Developer / Builder Name & GSTIN' : 'Customer Name & Contact'}</th>
                <th style={{ padding: '12px' }}>Property Title & Particulars</th>
                <th style={{ padding: '12px' }}>Taxable Value & GST (18%)</th>
                <th style={{ padding: '12px' }}>Total Amount Billed</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Payment Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices
                .filter(i => (billingInvoiceCategory === 'DEVELOPER' ? i.invoice_category === 'DEVELOPER' : (i.invoice_category === 'CUSTOMER' || !i.invoice_category)))
                .filter(i => matchesSearchQuery(i, searchQuery))
                .map(i => (
                  <tr key={i.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}>
                        🆔 {i.invoice_number}
                      </span>
                      <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
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

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ background: i.payment_status === 'PAID_SETTLED' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)', color: i.payment_status === 'PAID_SETTLED' ? '#4ade80' : '#fbbf24', border: `1px solid ${i.payment_status === 'PAID_SETTLED' ? '#22c55e' : '#eab308'}`, padding: '3px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.72rem', display: 'inline-block' }}>
                        {i.payment_status === 'PAID_SETTLED' ? '✓ PAID' : '⏳ UNPAID / PENDING'}
                      </span>
                    </td>

                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setShowPrintInvoiceModal({ open: true, invoice: i })} 
                        style={{ background: billingInvoiceCategory === 'DEVELOPER' ? '#16a34a' : '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px', margin: '0 auto' }}
                      >
                        <Printer size={14} /> Print {billingInvoiceCategory === 'DEVELOPER' ? 'Developer' : 'Customer'} GST PDF
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
