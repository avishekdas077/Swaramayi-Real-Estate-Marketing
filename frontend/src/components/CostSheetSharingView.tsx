import React from 'react';
import { Share2, Plus, Trash2, Printer, Search, Eye } from 'lucide-react';

interface CostSheetSharingViewProps {
  isLight: boolean;
  windowWidth: number;
  setShowCreateShareModal: (val: boolean) => void;
  handleDeleteAllCurrentInside: () => void;
  newShareForm: any;
  setNewShareForm: React.Dispatch<React.SetStateAction<any>>;
  activeCostSheetShareSubTab: string;
  setActiveCostSheetShareSubTab: (tab: any) => void;
  individualCostSheets: any[];
  setIndividualCostSheets: React.Dispatch<React.SetStateAction<any[]>>;
  formatIndianRupees: (amount: number) => string;
  individualCostSheetsSearch: string;
  setIndividualCostSheetsSearch: (val: string) => void;
  individualCostSheetsStatusFilter: string;
  setIndividualCostSheetsStatusFilter: (val: string) => void;
  matchesSearchQuery: (item: any, query: string) => boolean;
  searchQuery: string;
  setShowViewIndividualCostSheetModal: (val: any) => void;
  handleOpenRevisionModal: (item: any) => void;
  downloadCostSheetPDF: (item: any) => void;
  setShowScheduleVisitModal: (val: any) => void;
  costSheetShares: any[];
}

export const CostSheetSharingView: React.FC<CostSheetSharingViewProps> = ({
  isLight,
  windowWidth,
  setShowCreateShareModal,
  handleDeleteAllCurrentInside,
  newShareForm,
  setNewShareForm,
  activeCostSheetShareSubTab,
  setActiveCostSheetShareSubTab,
  individualCostSheets = [],
  setIndividualCostSheets,
  formatIndianRupees,
  individualCostSheetsSearch,
  setIndividualCostSheetsSearch,
  individualCostSheetsStatusFilter,
  setIndividualCostSheetsStatusFilter,
  matchesSearchQuery,
  searchQuery,
  setShowViewIndividualCostSheetModal,
  handleOpenRevisionModal,
  downloadCostSheetPDF,
  setShowScheduleVisitModal,
  costSheetShares = [],
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* SYSTEM HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Share2 size={24} color="#38bdf8" /> COST SHEET SHARING & CUSTOMER DELIVERY HUB
            </h2>
            <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
              SRM-PSH / DISPATCHER ACTIVE
            </span>
          </div>
          <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
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
      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Share2 size={20} color="#fbbf24" />
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>⚡ QUICK CREATE COST SHEET SHARE AGAINST PARENT TRANSACTION ID</h4>
              <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>Select parent Cost Sheet ID, Selection ID, or Customer ID to generate a new Share ID (SRM-PSH-2026).</p>
            </div>
          </div>

          <button 
            onClick={() => setShowCreateShareModal(true)} 
            style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Plus size={15} color="#0f172a" /> + Open ID Builder Modal
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : '2fr 1fr 1fr', gap: '12px' }}>
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
              style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
            >
              <option value="SRM-CS-2026-000145">SRM-CS-2026-000145 — Rohan Deshmukh (Aparna Zenon 3BHK, ₹84 Lakhs)</option>
              <option value="SRM-CS-2026-000146">SRM-CS-2026-000146 — Avishek Das (Madhyamgram 3BHK, 55 Lakhs)</option>
              <option value="SRM-CS-2026-000147">SRM-CS-2026-000147 — Sumanth Varma (My Home Tarkshya 3BHK, ₹1.54 Crores)</option>
              <option value="SRM-SEL-2026-000078">SRM-SEL-2026-000078 — Selection Record (Rohan Deshmukh, 3 Properties)</option>
              <option value="MATREQ-2026-000002">MATREQ-2026-000002 — Avishek Das Matching Request</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>📲 Delivery Channel Gateway:</label>
            <select value={newShareForm.channel} onChange={(e) => setNewShareForm({ ...newShareForm, channel: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#22c55e', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
              <option value="WhatsApp & Email Gateway">WhatsApp & Email Gateway</option>
              <option value="WhatsApp Gateway Only">WhatsApp Business API Only</option>
              <option value="Email PDF Attachment">Email PDF Attachment</option>
              <option value="SMS Token Link">SMS Secure Token Link</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'transparent', display: 'block', marginBottom: '4px' }}>Action</label>
            <button 
              onClick={() => alert(`🚀 Executed Quick Dispatch Share Token for ${newShareForm.parentId}!`)} 
              style={{ width: '100%', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              🚀 Execute Quick Dispatch
            </button>
          </div>
        </div>
      </div>

      {/* SUB-NAVIGATION TABS FOR COST SHEET SHARING CATEGORY */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
        <button 
          onClick={() => setActiveCostSheetShareSubTab('individual_cost_sheets')} 
          style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCostSheetShareSubTab === 'individual_cost_sheets' ? '#0284c7' : '#1e293b', color: activeCostSheetShareSubTab === 'individual_cost_sheets' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          📄 Master Individual Cost Sheets Vault ({individualCostSheets.length})
        </button>
        <button 
          onClick={() => setActiveCostSheetShareSubTab('dispatcher')} 
          style={{ padding: '8px 18px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeCostSheetShareSubTab === 'dispatcher' ? '#0284c7' : '#1e293b', color: activeCostSheetShareSubTab === 'dispatcher' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          📲 Multi-Channel Dispatcher & Delivery Log ({costSheetShares.length})
        </button>
      </div>

      {/* SUB-TAB 1: MASTER INDIVIDUAL COST SHEETS VAULT */}
      {activeCostSheetShareSubTab === 'individual_cost_sheets' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          
          {/* KPI SUMMARY CARDS */}
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TOTAL COST SHEETS</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{individualCostSheets.length} Sheets</h3>
              <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>ONE PROPERTY = ONE COST SHEET</span>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>REVISED VERSIONS</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>{individualCostSheets.filter(c => c.versionNumber > 1).length} Revised</h3>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Version History Logged</span>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PORTFOLIO ESTIMATED COST</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>
                {formatIndianRupees(individualCostSheets.reduce((acc, c) => acc + (c.pricingSnapshot?.totalEstimatedCost || 0), 0))}
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>Includes Taxes & Charges</span>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>CONVERTED TO VISITS</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#a855f7', marginTop: '2px' }}>
                {individualCostSheets.filter(c => c.status === 'CONVERTED_TO_VISIT').length} Visits
              </h3>
              <span style={{ fontSize: '0.7rem', color: '#4ade80' }}>CRM Pipeline Stage 6</span>
            </div>
          </div>

          {/* SEARCH & STATUS FILTER STRIP */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px 12px' }}>
              <Search size={15} color="#38bdf8" />
              <input 
                type="text" 
                value={individualCostSheetsSearch} 
                onChange={(e) => setIndividualCostSheetsSearch(e.target.value)} 
                placeholder="Search Cost Sheet ID (e.g. COST-SHEET-2026-000001), Customer Name, Match ID, or Property..." 
                style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '800' }} 
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>Filter Status:</span>
              <select 
                value={individualCostSheetsStatusFilter} 
                onChange={(e) => setIndividualCostSheetsStatusFilter(e.target.value)} 
                style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '800' }}
              >
                <option value="ALL">📋 All Statuses ({individualCostSheets.length})</option>
                <option value="GENERATED">🟢 GENERATED</option>
                <option value="SENT_TO_CUSTOMER">📲 SENT TO CUSTOMER</option>
                <option value="REVISED">✏️ REVISED</option>
                <option value="APPROVED">✅ APPROVED</option>
                <option value="CONVERTED_TO_VISIT">🚘 CONVERTED TO VISIT</option>
                <option value="CANCELLED">❌ CANCELLED</option>
              </select>
            </div>
          </div>

          {/* MASTER INDIVIDUAL COST SHEETS TABLE */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                📄 Master Individual Cost Sheets Vault ({individualCostSheets.length} Records)
              </h3>
              <span style={{ fontSize: '0.75rem', color: '#4ade80', background: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                ● ONE PROPERTY = ONE COST SHEET ENFORCED
              </span>
            </div>

            {individualCostSheets.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', background: isLight ? '#f8fafc' : '#0f172a', borderRadius: '12px', border: '1px dashed #ef4444' }}>
                <Trash2 size={32} color="#ef4444" style={{ margin: '0 auto 10px auto' }} />
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.05rem' }}>📭 NO INDIVIDUAL COST SHEETS FOUND</h4>
                <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>
                  Select properties in Matched Properties workspace and click "Create Cost Sheet ID" or "Create Cost Sheets for All Selected".
                </p>
              </div>
            ) : (
              <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Cost Sheet ID & Version</th>
                      <th style={{ padding: '12px' }}>Customer Identity</th>
                      <th style={{ padding: '12px' }}>Match ID & Score</th>
                      <th style={{ padding: '12px' }}>Property Code & Title</th>
                      <th style={{ padding: '12px' }}>Base Price vs Total Est. Cost</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Status</th>
                      <th style={{ padding: '12px' }}>Created Date & By</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {individualCostSheets
                      .filter((item: any) => {
                        if (individualCostSheetsStatusFilter !== 'ALL' && item.status !== individualCostSheetsStatusFilter) return false;
                        return matchesSearchQuery(item, searchQuery || individualCostSheetsSearch);
                      })
                      .map((item: any, i: number) => (
                        <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.88rem' }}>{item.costSheetId}</span>
                            <br />
                            <span style={{ background: item.versionNumber > 1 ? '#fbbf24' : '#0284c7', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', marginTop: '2px', display: 'inline-block' }}>
                              {item.version || 'V01'}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{item.customerSnapshot?.customerName || 'Avishek Das'}</strong>
                            <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{item.customerSnapshot?.mobile || '9432328947'}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{item.customerId}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontFamily: 'monospace', color: '#fbbf24', fontWeight: '800' }}>{item.matchId}</span>
                            <br />
                            <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>
                              🔥 {item.matchSnapshot?.matchScore || 85}% Match
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800', fontSize: '0.75rem' }}>{item.propertyCode}</span>
                            <br /><strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.82rem' }}>{item.propertySnapshot?.propertyTitle || item.propertyCode}</strong>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{item.propertySnapshot?.locality} • {item.propertySnapshot?.developerName} ({item.propertySnapshot?.bhk})</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>Asking Base: </span>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{item.formattedPriceBreakup?.basePriceStr}</strong>
                            <br />
                            <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '900' }}>Total Est: </span>
                            <strong style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.92rem' }}>{item.formattedPriceBreakup?.totalEstimatedCostStr}</strong>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <span style={{ background: item.status === 'GENERATED' ? 'rgba(56, 189, 248, 0.2)' : item.status === 'SENT_TO_CUSTOMER' ? 'rgba(34, 197, 94, 0.2)' : item.status === 'REVISED' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(168, 85, 247, 0.2)', color: item.status === 'GENERATED' ? '#38bdf8' : item.status === 'SENT_TO_CUSTOMER' ? '#4ade80' : item.status === 'REVISED' ? '#fbbf24' : '#a855f7', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                              {item.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', fontSize: '0.78rem' }}>{item.createdAt}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>By: {item.createdBy}</span>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button 
                                onClick={() => setShowViewIndividualCostSheetModal({ open: true, costSheet: item })} 
                                style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                              >
                                <Eye size={12} /> View
                              </button>
                              <button 
                                onClick={() => handleOpenRevisionModal(item)} 
                                style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                              >
                                ✏️ Revise
                              </button>
                              <button 
                                onClick={() => {
                                  setIndividualCostSheets(prev => prev.map(c => c.costSheetId === item.costSheetId ? { ...c, status: 'SENT_TO_CUSTOMER' } : c));
                                  alert(`📲 Dispatched Individual Cost Sheet ${item.costSheetId} to ${item.customerSnapshot?.customerName} (${item.customerSnapshot?.mobile}) via WhatsApp Gateway & Email PDF!`);
                                }} 
                                style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}
                              >
                                📲 Send
                              </button>
                              <button 
                                onClick={() => downloadCostSheetPDF(item)} 
                                style={{ background: '#334155', color: '#38bdf8', border: '1px solid #38bdf8', padding: '4px 6px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}
                              >
                                📥 PDF
                              </button>
                              <button 
                                onClick={() => setShowScheduleVisitModal({ open: true, costSheet: item })} 
                                style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                                title="Schedule Site Visit for this Cost Sheet customer & property"
                              >
                                🚘 Visit Schedule
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: MULTI-CHANNEL DISPATCHER & DELIVERY LOG */}
      {activeCostSheetShareSubTab === 'dispatcher' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

          {/* TOP KPI CARDS STRIP */}
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: '12px' }}>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TOTAL SHARED</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>148 Shares</h3>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>WHATSAPP SENT</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#22c55e', marginTop: '2px' }}>94 Sent</h3>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>EMAIL SENT</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#0284c7', marginTop: '2px' }}>54 Sent</h3>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PORTAL OPENED</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>112 Views</h3>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PDF DOWNLOADS</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#a855f7', marginTop: '2px' }}>76 PDFs</h3>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>CONVERTED TO VISIT</span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>38 Visits</h3>
            </div>
          </div>

          {/* MASTER SHARED COST SHEETS AUDIT TABLE */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📋 Master Cost Sheet Share Vault ({costSheetShares.length} Active Shares)</h3>
              <span style={{ fontSize: '0.78rem', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.15)', padding: '4px 10px', borderRadius: '20px', fontWeight: '800' }}>
                IMMUTABLE AUDIT TRAIL LOGGED
              </span>
            </div>

            {costSheetShares.length === 0 ? (
              <div style={{ padding: '36px 20px', textAlign: 'center', background: isLight ? '#f8fafc' : '#0f172a', borderRadius: '12px', border: '1px dashed #ef4444' }}>
                <Trash2 size={32} color="#ef4444" style={{ margin: '0 auto 10px auto' }} />
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.05rem' }}>📭 ALL COST SHEET SHARES DELETED — WORKSPACE CLEAN</h4>
                <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>
                  No active cost sheet share records found inside. Click "+ Create Share against ID" to dispatch your first cost sheet.
                </p>
              </div>
            ) : (
              <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                    <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{item.shareId}</span>
                        <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{item.sentTime}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{item.customerName}</strong>
                        <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{item.mobile}</span>
                        <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8' }}>{item.customerNumber}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{item.propertyTitle}</strong>
                        <br /><span style={{ fontSize: '0.75rem', color: '#fbbf24', fontFamily: 'monospace' }}>{item.costSheetId} ({item.finalPrice})</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#22c55e', padding: '3px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.75rem' }}>
                          {item.channel}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '900' }}>
                          👁️ {item.viewCount} Views
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <span style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#a855f7', padding: '2px 8px', borderRadius: '10px', fontSize: '0.72rem', fontWeight: '900' }}>
                          📥 {item.downloadCount} Downloads
                        </span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem' }}>
                          {item.interest}
                        </span>
                      </td>
                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                          <button onClick={() => alert(`📲 Resent Cost Sheet ${item.costSheetId} to ${item.customerName}!`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}>Resend</button>
                          <button onClick={() => alert(`📊 Opened live tracking for Share ${item.shareId}`)} style={{ background: '#334155', color: '#38bdf8', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}>Analytics</button>
                        </div>
                      </td>
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
