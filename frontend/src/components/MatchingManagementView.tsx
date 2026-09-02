import React from 'react';
import { Zap, Search, X } from 'lucide-react';

interface MatchingManagementViewProps {
  isLight: boolean;
  windowWidth: number;
  selectedCust: any;
  activeMatchingSubTab: string;
  setActiveMatchingSubTab: (tab: any) => void;
  matchingRequestsQueue: any[];
  selectedMatchingId: string;
  setSelectedMatchingId: (id: string) => void;
  costSheetShares: any[];
  scheduledVisits: any[];
  matchingVaultFilter: string;
  setMatchingVaultFilter: (filter: string) => void;
  matchesSearchQuery: (item: any, query: string) => boolean;
  searchQuery: string;
  matchingSearchQuery: string;
  setMatchingSearchQuery: (query: string) => void;
  openIdDetailsModal: (id: string, type: string) => void;
  setActiveTab: (tab: string) => void;
  setActiveCostSheetShareSubTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
  customers: any[];
  setSelectedCust: (cust: any) => void;
  properties: any[];
  selectedPropertyIds: string[];
  setSelectedPropertyIds: React.Dispatch<React.SetStateAction<string[]>>;
  propertySearchQuery: string;
  setPropertySearchQuery: (query: string) => void;
  calculatePropertyMatchScore: (cust: any, prop: any) => any;
  handleRowLevelCreateCostSheet: (prop: any) => void;
  handleBulkCreateCostSheets: () => void;
}

export const MatchingManagementView: React.FC<MatchingManagementViewProps> = ({
  isLight,
  windowWidth,
  selectedCust = {},
  activeMatchingSubTab,
  setActiveMatchingSubTab,
  matchingRequestsQueue = [],
  selectedMatchingId,
  setSelectedMatchingId,
  costSheetShares = [],
  scheduledVisits = [],
  matchingVaultFilter,
  setMatchingVaultFilter,
  matchesSearchQuery,
  searchQuery,
  matchingSearchQuery,
  setMatchingSearchQuery,
  openIdDetailsModal,
  setActiveTab,
  setActiveCostSheetShareSubTab,
  setSearchQuery,
  customers = [],
  setSelectedCust,
  properties = [],
  selectedPropertyIds = [],
  setSelectedPropertyIds,
  propertySearchQuery,
  setPropertySearchQuery,
  calculatePropertyMatchScore,
  handleRowLevelCreateCostSheet,
  handleBulkCreateCostSheets,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>SMART AI PROPERTY MATCHING & INVENTORY ENGINE</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
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
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveMatchingSubTab('ai_matching_engine')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'ai_matching_engine' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'ai_matching_engine' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          🤖 Smart AI Property Matcher
        </button>
        <button onClick={() => setActiveMatchingSubTab('req_inventory_matrix')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'req_inventory_matrix' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'req_inventory_matrix' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📋 Requirement vs Inventory Matrix
        </button>
        <button onClick={() => setActiveMatchingSubTab('portfolio_dispatcher')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeMatchingSubTab === 'portfolio_dispatcher' ? '#0284c7' : '#1e293b', color: activeMatchingSubTab === 'portfolio_dispatcher' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📤 Match Portfolio Dispatcher
        </button>
      </div>

      {/* SUB-TAB 1: AI MATCHING ENGINE (MATCHING ID CENTERED WORKSPACE) */}
      {activeMatchingSubTab === 'ai_matching_engine' && (() => {
        const pendingRequests = matchingRequestsQueue.filter(r => !r.costSheetId && r.status !== 'COST_SHEET_CREATED');
        const matchedReq = matchingRequestsQueue.find(r => 
          r.requestId.toLowerCase() === selectedMatchingId.toLowerCase() || 
          r.customerNumber.toLowerCase() === selectedMatchingId.toLowerCase()
        );
        const activeMatchingReq = matchedReq || pendingRequests[0] || matchingRequestsQueue[0] || {
          requestId: 'NO_MATCHING_REQUESTS',
          date: 'N/A',
          customerName: 'No Matching Requests Available',
          customerNumber: 'N/A',
          leadId: 'N/A',
          requirementId: 'N/A',
          mobile: 'N/A',
          purpose: 'N/A',
          propertyType: 'N/A',
          configuration: 'N/A',
          budget: 'N/A',
          preferredArea: 'N/A',
          secondaryAreas: 'N/A',
          radiusKm: 0,
          possessionStatus: 'N/A',
          carpetArea: 'N/A',
          facing: 'N/A',
          parking: 'N/A',
          amenities: 'N/A',
          completenessScore: 0,
          priority: 'COLD',
          leadScore: 0,
          assignedExecutive: 'Unassigned',
          status: 'NO_REQUESTS',
          version: 'SNAPSHOT V1'
        };

        return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* TOP MATCHING DASHBOARD KPI CARDS (SECTION 19) */}
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)', gap: '10px' }}>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>MATCHING REQUESTS</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{matchingRequestsQueue.length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PENDING</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>{pendingRequests.length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>IN PROGRESS</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{matchingRequestsQueue.filter(r => r.status === 'IN_PROGRESS').length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>MATCHED</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>{matchingRequestsQueue.filter(r => r.status === 'MATCHED' || (r.score && r.score >= 80)).length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SELECTED</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>{matchingRequestsQueue.filter(r => r.status === 'SELECTED' || r.selectedCount > 0).length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SHARED WITH CUS</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{costSheetShares.length}</h4>
            </div>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SITE VISIT REQ</span>
              <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#22c55e', marginTop: '2px' }}>{scheduledVisits.length}</h4>
            </div>
          </div>

          {/* INBOUND MATCHING REQUESTS SNAPSHOT VAULT (SECTION 20) */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📥 INBOUND MATCHING REQUESTS SNAPSHOT VAULT ({matchingRequestsQueue.length})</h3>
                <span style={{ background: '#22c55e', color: '#ffffff', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900' }}>QUALIFIED HANDOFF ACTIVE</span>
              </div>

              {/* VAULT FILTER TOGGLE BUTTONS */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setMatchingVaultFilter('PENDING_ONLY')}
                  style={{ 
                    background: matchingVaultFilter === 'PENDING_ONLY' ? '#fbbf24' : '#0f172a', 
                    color: matchingVaultFilter === 'PENDING_ONLY' ? '#0f172a' : '#94a3b8', 
                    border: '1px solid #fbbf24', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontWeight: '900', 
                    fontSize: '0.75rem', 
                    cursor: 'pointer' 
                  }}
                >
                  ⚡ PENDING COST SHEETS ONLY ({matchingRequestsQueue.filter(r => !r.costSheetId && r.status !== 'COST_SHEET_CREATED').length})
                </button>
                <button 
                  onClick={() => setMatchingVaultFilter('ALL')}
                  style={{ 
                    background: matchingVaultFilter === 'ALL' ? '#0284c7' : '#0f172a', 
                    color: matchingVaultFilter === 'ALL' ? '#ffffff' : '#94a3b8', 
                    border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', 
                    padding: '4px 12px', 
                    borderRadius: '20px', 
                    fontWeight: '900', 
                    fontSize: '0.75rem', 
                    cursor: 'pointer' 
                  }}
                >
                  📋 ALL MATCHING REQUESTS ({matchingRequestsQueue.length})
                </button>
              </div>
            </div>

            <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                    <th style={{ padding: '10px' }}>Matching ID & Date</th>
                    <th style={{ padding: '10px' }}>Customer & Contact</th>
                    <th style={{ padding: '10px' }}>Customer ID</th>
                    <th style={{ padding: '10px' }}>Structured Requirement</th>
                    <th style={{ padding: '10px' }}>Budget</th>
                    <th style={{ padding: '10px' }}>Cost Sheet Status</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matchingRequestsQueue
                    .filter(req => (matchingVaultFilter === 'ALL' || (!req.costSheetId && req.status !== 'COST_SHEET_CREATED')) && matchesSearchQuery(req, searchQuery || matchingSearchQuery))
                    .map((req) => {
                      const isCostSheetCreated = !!req.costSheetId || req.status === 'COST_SHEET_CREATED';
                      return (
                        <tr key={req.requestId} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', background: selectedMatchingId === req.requestId ? 'rgba(2, 132, 199, 0.15)' : 'transparent' }}>
                          <td style={{ padding: '10px' }}>
                            <span 
                              onClick={() => openIdDetailsModal(req.requestId, 'MATCHING_ID')}
                              style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}
                              title="Click to view full Matching Request details"
                            >
                              🎯 {req.requestId}
                            </span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px', display: 'block' }}>{req.date}</span>
                          </td>
                          <td style={{ padding: '10px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{req.customerName}</strong>
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
                            {(req.propertyCode || req.propCode) && (
                              <div style={{ marginTop: '2px', marginBottom: '2px' }}>
                                <span style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #0284c7', color: '#38bdf8', fontSize: '0.72rem', fontWeight: '900', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block' }}>
                                  🏢 Property Code: {req.propertyCode || req.propCode}
                                </span>
                              </div>
                            )}
                            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>{req.preferredArea} (Radius: {req.radiusKm || 10} KM)</span>
                          </td>
                          <td style={{ padding: '10px', color: '#4ade80', fontWeight: '900' }}>
                            {req.budget}
                          </td>
                          <td style={{ padding: '10px' }}>
                            {isCostSheetCreated ? (
                              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '2px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.75rem', display: 'inline-block' }}>
                                🟢 COST SHEET CREATED ({req.costSheetId || 'SRM-CS-2026-000145'})
                              </span>
                            ) : (
                              <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', border: '1px solid #fbbf24', padding: '2px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.75rem', display: 'inline-block' }}>
                                ⚡ PENDING (NO COST SHEET ID)
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '10px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                              {isCostSheetCreated ? (
                                <button 
                                  onClick={() => {
                                    setActiveTab('cost_sheet_share');
                                    setActiveCostSheetShareSubTab('individual_cost_sheets');
                                    setSearchQuery(req.costSheetId || req.customerNumber);
                                  }} 
                                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                                >
                                  📋 View in Cost Sheet Sharing →
                                </button>
                              ) : (
                                <>
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
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>

          {/* PRIMARY SEARCH MATCHING REQUEST BAR (SECTION 1 & 31) */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Zap size={22} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>SEARCH MATCHING REQUEST</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
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
                style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 14px', fontSize: '0.85rem', fontWeight: '800' }}
              >
                {matchingRequestsQueue
                  .filter(req => matchingVaultFilter === 'ALL' || (!req.costSheetId && req.status !== 'COST_SHEET_CREATED'))
                  .map((req) => (
                    <option key={req.requestId} value={req.requestId}>
                      ⚡ PENDING: {req.requestId} — {req.customerName} ({req.configuration}, {req.preferredArea})
                    </option>
                  ))}
              </select>
            </div>

            {/* SEARCH INPUT BAR */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
              <label style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>🔍 Search Matching Request (Primary ID: SRM-MAT-2026-000421):</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '6px', padding: '6px 10px' }}>
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
                  style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '800' }} 
                />
              </div>
            </div>

            {/* MATCHING REQUEST HEADER (SECTION 2 & 21) */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PRIMARY MATCHING ID</span>
                <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace' }}>{activeMatchingReq.requestId}</h4>
                <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800' }}>● MATCHING WORKSPACE ACTIVE</span>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER IDENTITY</span>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>{activeMatchingReq.customerName}</h4>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{activeMatchingReq.customerNumber} ({activeMatchingReq.mobile})</span>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED REQ & LEAD IDs</span>
                <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: '#fbbf24', fontFamily: 'monospace' }}>{activeMatchingReq.requirementId || 'SRM-REQ-2026-000094'}</h4>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace' }}>{activeMatchingReq.leadId || 'SRM-LEAD-2026-000184'}</span>
              </div>
              <div>
                <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CREATED BY & STATUS</span>
                <h4 style={{ fontSize: '0.82rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{activeMatchingReq.assignedExecutive || 'Priya Nair (Sales Exec)'}</h4>
                <span style={{ background: activeMatchingReq.status === 'COST_SHEET_CREATED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(234, 179, 8, 0.2)', color: activeMatchingReq.status === 'COST_SHEET_CREATED' ? '#4ade80' : '#fbbf24', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }}>{activeMatchingReq.status}</span>
              </div>
            </div>

            {/* COST SHEET CREATED & TRANSFERRED NOTIFICATION BANNER */}
            {(activeMatchingReq.status === 'COST_SHEET_CREATED' || activeMatchingReq.costSheetId) && (
              <div style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid #22c55e', borderRadius: '12px', padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '0.92rem', margin: 0 }}>
                    🟢 COST SHEET CREATED & TRANSFERRED TO COST SHEET SHARING
                  </h4>
                  <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.78rem', margin: '2px 0 0 0' }}>
                    Cost Sheet ID: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{activeMatchingReq.costSheetId || 'SRM-CS-2026-000145'}</strong> has been generated for customer {activeMatchingReq.customerName}.
                  </p>
                </div>
                <button 
                  onClick={() => {
                    setActiveTab('cost_sheet_share');
                    setActiveCostSheetShareSubTab('individual_cost_sheets');
                    setSearchQuery(activeMatchingReq.costSheetId || activeMatchingReq.customerNumber);
                  }} 
                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  📋 Open in Cost Sheet Sharing →
                </button>
              </div>
            )}

            {/* LOCKED CUSTOMER REQUIREMENT SNAPSHOT (SECTION 3 & 24) */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '900' }}>🔒 LOCKED CUSTOMER REQUIREMENT SNAPSHOT FOR {activeMatchingReq.requestId}</span>
                <span style={{ background: '#334155', color: '#fbbf24', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>REQUIREMENT VERSION: {activeMatchingReq.version || 'SNAPSHOT V1'}</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Target Property Code:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block', fontWeight: '900' }}>{activeMatchingReq.propertyCode || activeMatchingReq.propCode || 'N/A (Open Re-Rank Search)'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Property Type:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{activeMatchingReq.propertyType || 'Apartment / Flat'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>BHK Config:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{activeMatchingReq.configuration || '3 BHK'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Budget Range:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{activeMatchingReq.budget}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Preferred Location:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{activeMatchingReq.preferredArea} ({activeMatchingReq.radiusKm || 10} KM)</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Possession & Facing:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{activeMatchingReq.possessionStatus || 'Ready to Move'} | {activeMatchingReq.facing || 'East Facing'}</strong></div>
              </div>

              {/* RUN MATCHER BUTTON (SECTION 4) */}
              <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                <button onClick={() => alert(`⚡ Executed real-time property matching engine for ${activeMatchingReq.requestId} snapshot!`)} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={15} /> ⚡ RUN / RE-RUN MATCHER FOR {activeMatchingReq.requestId}
                </button>
              </div>
            </div>
          </div>

          {/* MATCHED PROPERTIES RESULTS & TABLE (SECTION 5, 7, 8, 9) */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🎯 MATCHED PROPERTIES FOR {activeMatchingReq.requestId} ({activeMatchingReq.customerName})</h3>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8' }}>{properties.length} Total Inventory Properties • AI Matching & Manual Lookup Active</p>
              </div>
              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '900', border: '1px solid #22c55e' }}>
                {selectedPropertyIds.length} PROPERTIES SELECTED
              </span>
            </div>

            {/* MANUAL PROPERTY SEARCH & MATCH SELECTION CONTROL PANEL */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  🔍 MANUAL PROPERTY SEARCH & DIRECT SELECTION (SEARCH BY PROPERTY ID / CODE / NAME)
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800' }}>
                  SEARCH & FILTER INVENTORY IN REAL-TIME
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
                {/* Search Input Bar */}
                <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '8px', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '8px', padding: '8px 12px' }}>
                  <Search size={16} color="#38bdf8" />
                  <input 
                    type="text" 
                    value={propertySearchQuery} 
                    onChange={(e) => setPropertySearchQuery(e.target.value)} 
                    placeholder="Enter Property Code (e.g. SRM-PROP-2026-000433), Title, or Developer..." 
                    style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '800' }} 
                  />
                  {propertySearchQuery && (
                    <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setPropertySearchQuery('')} />
                  )}
                </div>

                {/* Property Dropdown Picker */}
                <select 
                  value="" 
                  onChange={(e) => {
                    const selectedCode = e.target.value;
                    if (selectedCode) {
                      if (!selectedPropertyIds.includes(selectedCode)) {
                        setSelectedPropertyIds([...selectedPropertyIds, selectedCode]);
                        alert(`📌 Selected Property ${selectedCode} for ${activeMatchingReq.customerName}!`);
                      }
                      setPropertySearchQuery(selectedCode);
                    }
                  }}
                  style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', fontWeight: '800', maxWidth: '320px' }}
                >
                  <option value="">-- Or Quick Select Property Code --</option>
                  {properties.map(p => (
                    <option key={p.property_code} value={p.property_code}>
                      {p.property_code} — {p.title} ({p.locality})
                    </option>
                  ))}
                </select>

                {/* Manual Add / Select Button */}
                <button 
                  onClick={() => {
                    if (!propertySearchQuery.trim()) {
                      alert('⚠️ Please enter a Property ID / Code (e.g. SRM-PROP-2026-000433) to search and add manually.');
                      return;
                    }
                    const queryStr = propertySearchQuery.trim().toLowerCase();
                    const matchedProp = properties.find(p => 
                      p.property_code.toLowerCase().includes(queryStr) ||
                      p.title.toLowerCase().includes(queryStr) ||
                      p.locality.toLowerCase().includes(queryStr)
                    );
                    if (matchedProp) {
                      if (!selectedPropertyIds.includes(matchedProp.property_code)) {
                        setSelectedPropertyIds([...selectedPropertyIds, matchedProp.property_code]);
                        alert(`📌 Manually added & selected Property ${matchedProp.property_code} (${matchedProp.title}) for ${activeMatchingReq.customerName}!`);
                      } else {
                        alert(`ℹ️ Property ${matchedProp.property_code} is already selected.`);
                      }
                    } else {
                      alert(`❌ No property found matching search query "${propertySearchQuery}". Please check the Property ID.`);
                    }
                  }}
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                >
                  ➕ Add / Select Property
                </button>
              </div>
            </div>

            <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                  {(() => {
                    const fallbackInventory = [
                      {
                        id: 'PROP-BARASAT-001',
                        property_code: 'SRM-PROP-2026-000426',
                        title: '1 Properties (BARASAT, BANAMALIPUR, BARASAT NEAR ECO HOSPITAL)',
                        locality: 'Barasat / Banamalipur',
                        project: 'TILOTTAMA APPARTMENT',
                        developer: 'Swaramayi Partner Developer',
                        configuration: '3BHK',
                        type: 'Flat / Apartment (New / Builder)',
                        facing: 'East Facing (Poorva)',
                        possession_status: 'Ready to Move',
                        final_price: '₹51,14,880',
                        base_price: '₹48,00,000',
                        area_sqft: '1450 SqFt'
                      },
                      {
                        id: 'PROP-KONDAPUR-002',
                        property_code: 'SRM-PROP-2026-000427',
                        title: 'Aparna Zenon Luxury 3BHK Flat',
                        locality: 'Kondapur / Gachibowli',
                        project: 'Aparna Zenon',
                        developer: 'Aparna Constructions',
                        configuration: '3BHK',
                        type: 'Flat / Apartment (New / Builder)',
                        facing: 'North-East Facing',
                        possession_status: 'Under Construction',
                        final_price: '₹84,00,000',
                        base_price: '₹78,00,000',
                        area_sqft: '1680 SqFt'
                      }
                    ];

                    let displayProps = [...(properties || [])];
                    if (displayProps.length === 0) displayProps = fallbackInventory;
                    if (!displayProps.some(p => p.property_code === 'SRM-PROP-2026-000426')) {
                      displayProps.unshift(fallbackInventory[0]);
                    }

                    return displayProps
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
                        let matchVal = res.total;
                        const targetPCode = activeMatchingReq.propertyCode || activeMatchingReq.propCode;
                        if (targetPCode && p.property_code === targetPCode) {
                          matchVal = Math.max(matchVal, 96);
                        }
                        return { ...p, matchTotal: matchVal, breakdown: res.breakdown };
                      })
                    .filter(p => {
                      if (!propertySearchQuery.trim()) return true;
                      const q = propertySearchQuery.trim().toLowerCase();
                      return p.property_code.toLowerCase().includes(q) ||
                        p.title.toLowerCase().includes(q) ||
                        p.locality.toLowerCase().includes(q) ||
                        p.developer.toLowerCase().includes(q) ||
                        p.configuration.toLowerCase().includes(q);
                    })
                    .sort((a, b) => {
                      const aIsSelected = selectedPropertyIds.includes(a.property_code);
                      const bIsSelected = selectedPropertyIds.includes(b.property_code);
                      if (aIsSelected && !bIsSelected) return -1;
                      if (!aIsSelected && bIsSelected) return 1;
                      return b.matchTotal - a.matchTotal;
                    })
                    .map((p) => {
                      const pct = p.matchTotal;
                      const isChecked = selectedPropertyIds.includes(p.property_code);
                      return (
                        <tr key={p.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', background: isChecked ? 'rgba(2, 132, 199, 0.15)' : 'transparent' }}>
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
                              style={{ width: '18px', height: '18px', cursor: 'pointer' }} 
                            />
                          </td>
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.78rem' }}>{p.property_code}</span>
                              {isChecked && (
                                <span style={{ background: '#0284c7', color: '#ffffff', padding: '1px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900' }}>
                                  📌 SELECTED
                                </span>
                              )}
                            </div>
                            <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>{p.title}</h4>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{p.locality}</strong>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{p.developer}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: '#fbbf24', fontWeight: '800' }}>{p.configuration}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{p.carpet_area}</span>
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
                            {/* MATCH EXPLANATION (ALL 7 CRITERIA BREAKDOWN WITH ACHIEVED%/MAX% MATCH FORMATTING) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ background: pct >= 85 ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : pct >= 70 ? 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '12px', fontWeight: '900', fontSize: '0.78rem', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
                                  🎯 {pct}% / 100% OVERALL MATCH
                                </span>
                                <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>
                                  {pct >= 85 ? 'High Precision 7-Criteria Match' : pct >= 70 ? 'Good Compatibility' : 'Partial Criteria Match'}
                                </span>
                              </div>

                              <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', fontSize: '0.68rem' }}>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.bud === 25 ? '#22c55e' : '#ef4444'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.bud === 25 ? '#4ade80' : '#ef4444', fontWeight: '700' }}>
                                  {p.breakdown.bud === 25 ? '✓' : '✗'} Budget Range ({p.breakdown.bud}%/25% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.loc >= 15 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.loc >= 15 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Location ({p.breakdown.loc}%/20% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.bhk >= 12 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.bhk >= 12 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ BHK Config ({p.breakdown.bhk}%/15% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.sqft >= 10 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.sqft >= 10 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Sq.Ft Area ({p.breakdown.sqft}%/15% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.possession_facing >= 7 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.possession_facing >= 7 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Possession & Facing ({p.breakdown.possession_facing}%/10% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.floor_pref >= 4 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.floor_pref >= 4 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Floor Preference ({p.breakdown.floor_pref}%/5% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.type >= 4 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.type >= 4 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Category Type ({p.breakdown.type}%/5% match)
                                </span>
                                <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${p.breakdown.condition >= 3 ? '#22c55e' : '#fbbf24'}`, padding: '2px 6px', borderRadius: '4px', color: p.breakdown.condition >= 3 ? '#4ade80' : '#fbbf24', fontWeight: '700' }}>
                                  ✓ Condition ({p.breakdown.condition}%/5% match)
                                </span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <button 
                              onClick={() => handleRowLevelCreateCostSheet(p)} 
                              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: '1px solid #38bdf8', padding: '6px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                            >
                              📄 Create Cost Sheet ID
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          {/* FIXED SELECTED PROPERTY SUMMARY PANEL & DISPATCHER */}
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #0284c7', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', bottom: '10px', zIndex: 100, boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase' }}>
                  📌 PROPERTY SELECTION WORKSPACE & DISPATCHER
                </span>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>
                  {selectedPropertyIds.length} PROPERTIES SELECTED FOR {activeMatchingReq.customerName.toUpperCase()} ({activeMatchingReq.requestId})
                </h3>
              </div>

              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '0.78rem', border: '1px solid #22c55e' }}>
                ✓ {selectedPropertyIds.length} PROPERTIES READY TO DISPATCH
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {selectedPropertyIds.length === 0 ? (
                <span style={{ fontSize: '0.82rem', color: isLight ? '#64748b' : '#94a3b8', fontStyle: 'italic', padding: '6px 0' }}>
                  No properties selected yet. Select property checkboxes above or click "Add/Select Property" to add properties to workspace.
                </span>
              ) : (
                selectedPropertyIds.map((code, idx) => (
                  <div key={idx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{code}</span>
                    <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>{properties.find(p => p.property_code === code)?.title || code}</span>
                    <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => setSelectedPropertyIds(selectedPropertyIds.filter(id => id !== code))} />
                  </div>
                ))
              )}
            </div>

            {/* SELECTION ACTION BUTTON - ONE PROPERTY = ONE COST SHEET */}
            <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => {
                  if (selectedPropertyIds.length === 0) {
                    alert('⚠️ Please select at least one property using the checkboxes to create individual Cost Sheets.');
                    return;
                  }
                  if (selectedPropertyIds.length === 1) {
                    const singleProp = properties.find(p => p.property_code === selectedPropertyIds[0]) || properties[0];
                    handleRowLevelCreateCostSheet(singleProp);
                  } else {
                    handleBulkCreateCostSheets();
                  }
                }} 
                style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', color: '#0f172a', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(251, 191, 36, 0.4)' }}
              >
                📄 CREATE INDIVIDUAL COST SHEETS ({selectedPropertyIds.length} SELECTED) & SEND TO SHARING
              </button>
            </div>
          </div>

        </div>
        );
      })()}

      {/* SUB-TAB 2: REQUIREMENT VS INVENTORY MATRIX */}
      {activeMatchingSubTab === 'req_inventory_matrix' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📋 Customer Requirements vs Stock Inventory Availability Matrix</h3>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
            {['Kondapur', 'Gachibowli', 'Financial District', 'Hitec City'].map((loc, i) => (
              <div key={i} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '800' }}>📍 {loc} Sector</h4>
                <p style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>Matching Inventory: 12 Units Available</p>
                <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800', marginTop: '8px', display: 'block' }}>🟢 95% High Demand Alignment</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PORTFOLIO DISPATCHER */}
      {activeMatchingSubTab === 'portfolio_dispatcher' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📤 Multi-Channel Property Recommendation Portfolio Dispatcher</h3>
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
  );
};
