import React from 'react';
import { Plus, Navigation, MapPin, Trash2 } from 'lucide-react';

interface VisitManagementViewProps {
  currentRole?: string;
  isLight: boolean;
  windowWidth: number;
  activeVisitSubTab: string;
  setActiveVisitSubTab: (tab: any) => void;
  visitPlans: any[];
  matchesSearchQuery: (item: any, query: string) => boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  visitFilterStatus: string;
  setVisitFilterStatus: (val: string) => void;
  visitFilterDate: string;
  setVisitFilterDate: (val: string) => void;
  visitFilterExec: string;
  setVisitFilterExec: (val: string) => void;
  individualCostSheets: any[];
  setShowScheduleVisitModal: (val: any) => void;
  routePlannerMode: string;
  setRoutePlannerMode: (val: any) => void;
  setShowRouteMapModal: (val: any) => void;
  setShowVisitDetailModal: (val: any) => void;
  selectedVisitPlanId: string;
  setSelectedVisitPlanId: (val: string) => void;
  setShowIndividualStopModal: (val: any) => void;
  scheduledVisits: any[];
  properties: any[];
  projectVisitAgreements: any[];
  handleMarkVisitDoneAndNotifyDeveloper: (v: any) => void;
  setShowPvaDocumentModal: (val: any) => void;
  setShowPvaVerificationModal: (val: any) => void;
  leadsList: any[];
  setActiveTab: (tab: string) => void;
  setShowLead360Drawer: (val: any) => void;
  matchingRequestsQueue: any[];
  setSelectedMatchingId: (val: any) => void;
  customers: any[];
  setSelectedCust: (val: any) => void;
  setActiveMatchingSubTab: (tab: string) => void;
  setShowLogSalesFeedbackModal: (val: boolean) => void;
  setShowAlternativePropertyModal: (val: any) => void;
  setUpdateReqForm: (val: any) => void;
  setShowUpdateRequirementModal: (val: any) => void;
  setShowLiveRouteTrackingModal: (val: any) => void;
  bookings?: any[];
  setBookings?: React.Dispatch<React.SetStateAction<any[]>>;
  setScheduledVisits?: React.Dispatch<React.SetStateAction<any[]>>;
  setVisitPlans?: React.Dispatch<React.SetStateAction<any[]>>;
  setActiveBookingSubTab?: (tab: any) => void;
}

export const VisitManagementView: React.FC<VisitManagementViewProps> = ({
  currentRole,
  isLight,
  windowWidth,
  activeVisitSubTab,
  setActiveVisitSubTab,
  visitPlans = [],
  matchesSearchQuery,
  searchQuery,
  setSearchQuery,
  visitFilterStatus,
  setVisitFilterStatus,
  visitFilterDate,
  setVisitFilterDate,
  visitFilterExec,
  setVisitFilterExec,
  individualCostSheets = [],
  setShowScheduleVisitModal,
  routePlannerMode,
  setRoutePlannerMode,
  setShowRouteMapModal,
  setShowVisitDetailModal,
  selectedVisitPlanId,
  setSelectedVisitPlanId,
  setShowIndividualStopModal,
  scheduledVisits = [],
  properties = [],
  projectVisitAgreements = [],
  handleMarkVisitDoneAndNotifyDeveloper,
  setShowPvaDocumentModal,
  setShowPvaVerificationModal,
  leadsList = [],
  setActiveTab,
  setShowLead360Drawer,
  matchingRequestsQueue = [],
  setSelectedMatchingId,
  customers = [],
  setSelectedCust,
  setActiveMatchingSubTab,
  setShowLogSalesFeedbackModal,
  setShowAlternativePropertyModal,
  setUpdateReqForm,
  setShowUpdateRequirementModal,
  setShowLiveRouteTrackingModal,
  bookings = [],
  setBookings,
  setScheduledVisits,
  setVisitPlans,
  setActiveBookingSubTab,
}) => {
  const isSuperAdmin = !currentRole || currentRole.toUpperCase().includes('SUPER ADMIN') || currentRole.toUpperCase().includes('OWNER') || currentRole.toUpperCase().includes('ADMIN');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>SITE VISIT SCHEDULING, OTP & GEOFENCE VERIFICATION SYSTEM</h2>
            <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>VISIT ENGINE ACTIVE</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
            Conflict-Free Executive Scheduling • 6-Digit Mobile OTP Verification • GPS Geofence Radius Audit • 5-Star Customer Feedback
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => alert('🚘 Opening Schedule Site Visit Modal...')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Plus size={15} /> + Schedule Site Visit
          </button>
        </div>
      </div>

      {/* 6 SUB-TABS NAVIGATION FOR VISIT MANAGEMENT */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveVisitSubTab('visit_route_planner')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer', background: activeVisitSubTab === 'visit_route_planner' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_route_planner' ? '#ffffff' : '#38bdf8', border: '1px solid #0284c7' }}>
          🗺️ Multi-Property Route Planner & Auto Navigation
        </button>
        <button onClick={() => setActiveVisitSubTab('visit_scheduler')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_scheduler' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_scheduler' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📅 Single Site Visit Scheduler
        </button>
        <button onClick={() => setActiveVisitSubTab('visit_otp_checkin')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_otp_checkin' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_otp_checkin' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          🔐 OTP Verification & Check-In
        </button>
        <button onClick={() => setActiveVisitSubTab('visit_feedback')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_feedback' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_feedback' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          ⭐ Structured 5-Star Feedback
        </button>
        <button onClick={() => setActiveVisitSubTab('visit_analytics')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeVisitSubTab === 'visit_analytics' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_analytics' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📊 Visit Conversion Analytics
        </button>
        <button onClick={() => setActiveVisitSubTab('visit_owner_tracking')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '900', cursor: 'pointer', background: activeVisitSubTab === 'visit_owner_tracking' ? '#0284c7' : '#1e293b', color: activeVisitSubTab === 'visit_owner_tracking' ? '#ffffff' : '#fbbf24', border: '1px solid #fbbf24' }}>
          👑 Owner Live Route Tracking
        </button>
      </div>

      {/* SUB-TAB 1: MULTI-PROPERTY ROUTE PLANNER & LIVE EXECUTION */}
      {activeVisitSubTab === 'visit_route_planner' && (() => {
        // Filter visit plans based on search query, status, date, exec
        const filteredPlans = visitPlans.filter((plan: any) => {
          if (!matchesSearchQuery(plan, searchQuery)) return false;
          if (visitFilterStatus !== 'ALL' && plan.status !== visitFilterStatus) return false;
          if (visitFilterDate !== 'ALL' && plan.visitDate !== visitFilterDate) return false;
          if (visitFilterExec !== 'ALL' && !plan.assignedExecutive.toLowerCase().includes(visitFilterExec.toLowerCase())) return false;
          return true;
        });

        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* ROUTE PLANNER COMPACT TOOLBAR */}
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isLight ? '#0f172a' : '#ffffff' }}>
                  <Navigation size={20} />
                </div>
                <div>
                  <h3 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.05rem' }}>🚘 MULTI-PROPERTY VISIT SCHEDULE REGISTER</h3>
                  <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.76rem' }}>Compact Master Records • Click Visit Schedule ID for Full Route Details</p>
                </div>
              </div>

              {/* QUICK ACTION BUTTONS */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => setShowScheduleVisitModal({ open: true, costSheet: individualCostSheets[0] })} 
                  style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus size={15} /> + Schedule Site Visit
                </button>
                <button 
                  onClick={() => setRoutePlannerMode(routePlannerMode === 'exec_cockpit' ? 'compact_table' as any : 'exec_cockpit')} 
                  style={{ background: routePlannerMode === 'exec_cockpit' ? '#0284c7' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  📱 Sales Person Mobile Cockpit
                </button>
                <button 
                  onClick={() => setShowRouteMapModal({ open: true, plan: visitPlans[0] })} 
                  style={{ background: '#334155', color: '#38bdf8', border: '1px solid #0284c7', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  🗺️ View Route Map
                </button>
              </div>
            </div>

            {/* SEARCH & FILTERS BAR */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: '1', minWidth: '240px' }}>
                <input 
                  type="text" 
                  placeholder="🔍 Search Visit Schedule ID, Customer ID, Customer Name, Mobile, Exec, Property, Cost Sheet..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem' }}
                />
              </div>

              {/* STATUS FILTER */}
              <div>
                <select 
                  value={visitFilterStatus} 
                  onChange={(e) => setVisitFilterStatus(e.target.value)}
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem' }}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="IN_PROGRESS">🔵 IN PROGRESS</option>
                  <option value="ASSIGNED">⚪ ASSIGNED / SCHEDULED</option>
                  <option value="COMPLETED">✅ COMPLETED</option>
                  <option value="PARTIALLY_COMPLETED">🟣 PARTIALLY COMPLETED</option>
                  <option value="DELAYED">🟡 DELAYED</option>
                </select>
              </div>

              {/* DATE FILTER */}
              <div>
                <select 
                  value={visitFilterDate} 
                  onChange={(e) => setVisitFilterDate(e.target.value)}
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#fbbf24', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem' }}
                >
                  <option value="ALL">All Dates</option>
                  <option value="2026-08-22">22 Aug 2026</option>
                  <option value="2026-08-23">23 Aug 2026</option>
                </select>
              </div>

              {/* EXEC FILTER */}
              <div>
                <select 
                  value={visitFilterExec} 
                  onChange={(e) => setVisitFilterExec(e.target.value)}
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem' }}
                >
                  <option value="ALL">All Execs</option>
                  <option value="Ramesh Pawar">Ramesh Pawar</option>
                  <option value="Priya Nair">Priya Nair</option>
                </select>
              </div>
            </div>

            {/* COMPACT MASTER TABLE VIEW */}
            {routePlannerMode !== 'exec_cockpit' ? (
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1rem' }}>
                    📋 MASTER VISIT SCHEDULES REGISTER ({filteredPlans.length} RECORDS)
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                    Click Visit Schedule ID or VIEW button to inspect complete route details
                  </span>
                </div>

                <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                        <th style={{ padding: '12px' }}>Visit Schedule ID</th>
                        <th style={{ padding: '12px' }}>Customer & Contact</th>
                        <th style={{ padding: '12px' }}>Date & Time</th>
                        <th style={{ padding: '12px' }}>Sales Person</th>
                        <th style={{ padding: '12px' }}>Stops / Properties</th>
                        <th style={{ padding: '12px' }}>Progress</th>
                        <th style={{ padding: '12px' }}>Status</th>
                        <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlans.map((plan: any) => {
                        const planStops = plan.stops || [];
                        const completedStops = planStops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
                        const totalStops = planStops.length;
                        const pct = totalStops > 0 ? Math.round((completedStops / totalStops) * 100) : 0;
                        const firstPropTitle = planStops[0]?.propertyTitle || 'Property';
                        const extraStopsCount = totalStops > 0 ? totalStops - 1 : 0;

                      return (
                        <tr key={plan.visitPlanId} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          
                          {/* 1. VISIT SCHEDULE ID (CLICKABLE LINK) */}
                          <td style={{ padding: '12px' }}>
                            <button 
                              onClick={() => setShowVisitDetailModal({ open: true, plan })}
                              style={{ background: 'none', border: 'none', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
                            >
                              {plan.visitPlanId || plan.visitScheduleId}
                            </button>
                          </td>

                          {/* 2. CUSTOMER & ID */}
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{plan.customerName}</strong>
                            <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{plan.customerNumber}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: '#4ade80', fontFamily: 'monospace' }}>{plan.mobile}</span>
                          </td>

                          {/* 3. DATE & TIME */}
                          <td style={{ padding: '12px', color: '#cbd5e1' }}>
                            <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800' }}>📅 {plan.visitDate}</span>
                            <br /><span style={{ color: '#fbbf24', fontWeight: '800' }}>⏰ {plan.startTime}</span>
                          </td>

                          {/* 4. SALES PERSON */}
                          <td style={{ padding: '12px', color: '#38bdf8', fontWeight: '800' }}>
                            👤 {plan.assignedExecutive}
                          </td>

                          {/* 5. STOPS / PROPERTIES (COMPACT PREVIEW) */}
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', color: '#fbbf24', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900' }}>
                              {totalStops} STOPS
                            </span>
                            <br /><span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: '800', marginTop: '2px', display: 'block' }}>
                              {firstPropTitle.slice(0, 20)}... {extraStopsCount > 0 ? `+${extraStopsCount} more` : ''}
                            </span>
                          </td>

                          {/* 6. PROGRESS */}
                          <td style={{ padding: '12px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900' }}>
                                <span>{completedStops}/{totalStops}</span>
                                <span>{pct}%</span>
                              </div>
                              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', borderRadius: '4px', height: '6px', width: '100%', overflow: 'hidden' }}>
                                <div style={{ background: 'linear-gradient(90deg, #0284c7 0%, #22c55e 100%)', width: `${pct}%`, height: '100%' }}></div>
                              </div>
                            </div>
                          </td>

                          {/* 7. STATUS */}
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: plan.status === 'COMPLETED' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(2, 132, 199, 0.2)', color: plan.status === 'COMPLETED' ? '#4ade80' : '#38bdf8', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900', display: 'inline-block' }}>
                              {plan.status === 'IN_PROGRESS' ? '🔵 IN PROGRESS' : plan.status === 'COMPLETED' ? '✅ COMPLETED' : '⚪ ASSIGNED'}
                            </span>
                          </td>

                          {/* 8. ACTIONS */}
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                              <button 
                                onClick={() => setShowVisitDetailModal({ open: true, plan })}
                                style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                                title="Open Complete Visit Details Modal"
                              >
                                👁️ VIEW
                              </button>
                              <button 
                                onClick={() => setShowRouteMapModal({ open: true, plan })}
                                style={{ background: '#a855f7', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                                title="View Route Map Modal"
                              >
                                🗺️ MAP
                              </button>
                              <button 
                                onClick={() => window.open(`tel:${plan.mobile}`)}
                                style={{ background: '#334155', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                                title="Call Customer"
                              >
                                📞 CALL
                              </button>
                              <button 
                                onClick={() => window.open(`https://api.whatsapp.com/send?phone=${plan.mobile.replace(/[^0-9]/g, '')}`)}
                                style={{ background: '#25D366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                                title="WhatsApp Customer"
                              >
                                💬 WA
                              </button>
                              {isSuperAdmin && (
                                <button 
                                  onClick={() => {
                                    if (window.confirm(`⚠️ SUPER ADMIN CONFIRMATION:\n\nAre you sure you want to permanently delete Visit Route Plan ${plan.visitPlanId || plan.visitScheduleId} for ${plan.customerName || 'Customer'}?`)) {
                                      if (setVisitPlans) {
                                        setVisitPlans((prev: any[]) => (prev || []).filter((p: any) => p.visitPlanId !== plan.visitPlanId && p.visitScheduleId !== plan.visitPlanId));
                                      }
                                      if (setScheduledVisits) {
                                        setScheduledVisits((prev: any[]) => (prev || []).filter((sv: any) => sv.visitId !== plan.visitPlanId && sv.costSheetId !== plan.visitPlanId));
                                      }
                                      alert(`🗑️ Visit Route Plan ${plan.visitPlanId || plan.visitScheduleId} deleted permanently by Super Admin.`);
                                    }
                                  }}
                                  style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                                  title="Super Admin Only: Permanently delete this visit route plan"
                                >
                                  🗑️ DELETE
                                </button>
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
          ) : (
            /* MOBILE COCKPIT VIEW (WHEN USER SWITCHES TO MOBILE COCKPIT MODE) */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* SELECTOR FOR ACTIVE VISIT PLAN */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>Active Visit Plan:</span>
                  <select 
                    value={selectedVisitPlanId} 
                    onChange={(e) => setSelectedVisitPlanId(e.target.value)} 
                    style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem' }}
                  >
                    {visitPlans.map(plan => (
                      <option key={plan.visitPlanId} value={plan.visitPlanId}>
                        {plan.visitPlanId} — {plan.customerName} ({(plan.stops || []).length} Stops) [{plan.visitDate}]
                      </option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={() => setRoutePlannerMode('compact_table' as any)} 
                  style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' }}
                >
                  ⬅️ Back to Compact Register Table
                </button>
              </div>

              {/* EXECUTIVE MOBILE ROUTE CARD */}
              {(() => {
                const currentPlan = visitPlans.find(p => p.visitPlanId === selectedVisitPlanId) || visitPlans[0] || {
                  visitPlanId: 'NO_VISIT_PLANS',
                  customerName: 'No Scheduled Visit Plans Available',
                  customerNumber: 'N/A',
                  mobile: 'N/A',
                  visitDate: 'N/A',
                  startTime: 'N/A',
                  salesExecutive: 'Unassigned',
                  status: 'NO_PLANS',
                  currentStopIndex: 0,
                  stops: []
                };
                const planStops = currentPlan.stops || [];
                const completedStops = planStops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
                const totalStops = planStops.length;
                const currentStopIndex = currentPlan.currentStopIndex || 0;
                const currentStop = planStops[currentStopIndex] || planStops[0] || {
                  stopId: 'N/A',
                  scheduledTime: 'N/A',
                  propertyTitle: 'No Active Stop Available',
                  address: 'N/A',
                  propertyCode: 'N/A',
                  costSheetId: 'N/A',
                  developer: 'N/A',
                  status: 'N/A'
                };

                return (
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', borderRadius: '20px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.8rem' }}>📱 TODAY'S VISIT PLAN</span>
                        <h3 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.2rem', marginTop: '2px' }}>{currentPlan.visitPlanId} — {currentPlan.customerName}</h3>
                        <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.78rem' }}>{totalStops} Stops • {completedStops}/{totalStops} Completed • {currentPlan.status}</span>
                      </div>
                      <button 
                        onClick={() => setShowVisitDetailModal({ open: true, plan: currentPlan })}
                        style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        OPEN VISIT DETAILS
                      </button>
                    </div>

                    {/* CURRENT STOP HIGHLIGHT CARD */}
                    <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #38bdf8', borderRadius: '14px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ background: '#38bdf8', color: '#0f172a', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900' }}>
                          🟡 CURRENT ACTIVE STOP (STOP {currentStopIndex + 1})
                        </span>
                        <span style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.78rem' }}>{currentStop.scheduledTime}</span>
                      </div>
                      <h3 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.1rem' }}>{currentStop.propertyTitle}</h3>
                      <p style={{ color: '#cbd5e1', fontSize: '0.8rem' }}>📍 Address: {currentStop.address}</p>
                      <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                        <button 
                          onClick={() => {
                            const cleanLat = currentStop.latitude.replace(/[^0-9.]/g, '') || '17.4612';
                            const cleanLng = currentStop.longitude.replace(/[^0-9.]/g, '') || '78.3689';
                            window.open(`https://www.google.com/maps/dir/?api=1&destination=${cleanLat},${cleanLng}`, '_blank');
                          }}
                          style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer' }}
                        >
                          🚀 START NAVIGATION
                        </button>
                        <button 
                          onClick={() => setShowIndividualStopModal({ open: true, stop: currentStop, plan: currentPlan })}
                          style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer' }}
                        >
                          👁️ View Stop Details
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })()}
            </div>
          )}

        </div>
      );
    })()}

    {/* SUB-TAB 2: VISIT SCHEDULER */}
    {activeVisitSubTab === 'visit_scheduler' && (
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📅 Scheduled Site Visits Register ({scheduledVisits.length} Visits)</h3>
            <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8' }}>Visits scheduled from Cost Sheet Sharing or Direct Booking Workflow</p>
          </div>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', border: '1px solid #22c55e' }}>
            ● AUTOMATIC COST SHEET SHARING TRANSFERS ACTIVE
          </span>
        </div>

        {scheduledVisits.length === 0 ? (
          <div style={{ padding: '36px 20px', textAlign: 'center', background: isLight ? '#f8fafc' : '#0f172a', borderRadius: '12px', border: '1px dashed #ef4444' }}>
            <Trash2 size={32} color="#ef4444" style={{ margin: '0 auto 10px auto' }} />
            <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.05rem' }}>📭 NO SCHEDULED SITE VISITS FOUND</h4>
            <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.82rem', marginTop: '4px' }}>
              Click "🚘 Visit Schedule" on any record in Cost Sheet Sharing to transfer a customer & property visit here.
            </p>
          </div>
        ) : (
          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '10px' }}>Visit ID & Cost Sheet ID</th>
                <th style={{ padding: '10px' }}>Customer & Contact</th>
                <th style={{ padding: '10px' }}>Target Property</th>
                <th style={{ padding: '10px' }}>Scheduled Date & Time</th>
                <th style={{ padding: '10px' }}>Assigned Field Exec</th>
                <th style={{ padding: '10px' }}>OTP Verification Status</th>
                <th style={{ padding: '10px' }}>Transport Logistics</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {scheduledVisits
                .filter(v => matchesSearchQuery(v, searchQuery))
                .map((v: any, idx: number) => {
                  const pCode = v.propertyCode || v.propertyTitle;
                  const matchedProp = properties.find((p: any) => 
                    p.property_code === pCode || 
                    p.id === pCode || 
                    (v.propertyTitle && p.title.toLowerCase().includes(v.propertyTitle.toLowerCase()))
                  );
                  const lat = matchedProp?.latitude || '17.4612° N';
                  const lng = matchedProp?.longitude || '78.3689° E';

                  const matchingPva = projectVisitAgreements.find((p: any) => 
                    p.customerMobile === v.mobile || 
                    p.visitScheduleId === v.visitId || 
                    p.customerId === v.customerNumber
                  );
                  const isOtpVerified = !!matchingPva || v.status === 'OTP_VERIFIED';

                  return (
                    <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <td style={{ padding: '10px' }}>
                        <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{v.visitId}</span>
                        {v.costSheetId && (
                          <>
                            <br /><span style={{ fontFamily: 'monospace', color: '#fbbf24', fontSize: '0.72rem', fontWeight: '800' }}>{v.costSheetId}</span>
                          </>
                        )}
                      </td>
                      <td style={{ padding: '10px' }}>
                        <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{v.customerName}</strong>
                        <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{v.mobile}</span>
                        {v.customerNumber && (
                          <>
                            <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{v.customerNumber}</span>
                          </>
                        )}
                      </td>
                      <td style={{ padding: '10px' }}>
                        <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.82rem' }}>{v.propertyTitle}</strong>
                        <div style={{ marginTop: '3px', marginBottom: '3px' }}>
                          <span style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #0284c7', color: '#38bdf8', fontSize: '0.72rem', fontWeight: '900', padding: '2px 7px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block' }}>
                            🏢 Property Code: {v.propertyCode || v.propCode || 'SRM-PROP-2026-000426'}
                          </span>
                        </div>
                        <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', padding: '2px 6px', borderRadius: '4px', width: 'fit-content' }}>
                          <MapPin size={11} color="#38bdf8" />
                          <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '800' }}>
                            GPS: {lat}, {lng}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '10px', color: '#cbd5e1' }}>
                        <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800' }}>📅 {v.visitDate}</span>
                        <br /><span style={{ color: '#fbbf24', fontWeight: '800' }}>⏰ {v.visitTime}</span>
                      </td>
                      <td style={{ padding: '10px', color: '#38bdf8', fontWeight: '800' }}>
                        {v.assignedExecutive}
                      </td>
                      <td style={{ padding: '10px' }}>
                        {isOtpVerified ? (
                          <div>
                            <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900', display: 'inline-block' }}>
                              ✅ OTP VERIFIED
                            </span>
                            <br />
                            <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '800' }}>
                              {matchingPva?.projectVisitAgreementId || 'SRM-PVA-2026-000001'}
                            </span>
                          </div>
                        ) : (
                          <div>
                            <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid #f59e0b', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900', display: 'inline-block' }}>
                              ⏳ OTP VERIFICATION PENDING
                            </span>
                            <br />
                            <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                              6-Digit OTP Check-In Awaited
                            </span>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '10px' }}>
                        <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                          {v.transport || 'Direct Arrival'}
                        </span>
                      </td>
                      <td style={{ padding: '10px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                          <button
                            onClick={() => handleMarkVisitDoneAndNotifyDeveloper(v)}
                            style={{ background: v.status === 'COMPLETED' || v.visitDone ? '#22c55e' : 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px', boxShadow: '0 2px 6px rgba(22, 197, 94, 0.3)' }}
                            title="Mark Visit Completed & automatically send WhatsApp confirmation to Developer with Customer Name and 7-digit Customer ID"
                          >
                            {v.status === 'COMPLETED' || v.visitDone ? '✅ VISIT DONE (Resend WA)' : '✅ MARK VISIT DONE & WA DEV'}
                          </button>

                          {isOtpVerified ? (
                            <button 
                              onClick={() => setShowPvaDocumentModal({ open: true, pva: matchingPva || projectVisitAgreements[0] })}
                              style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                            >
                              📄 View PVA PDF
                            </button>
                          ) : (
                            <button 
                              onClick={() => {
                                const matchedPlan = visitPlans.find(p => p.customerNumber === v.customerNumber || p.mobile === v.mobile) || visitPlans[0];
                                const targetStop = matchedPlan?.stops[0] || {
                                  stopId: 'SRM-VSTOP-2026-000001',
                                  costSheetId: v.costSheetId || 'SRM-CS-2026-000145',
                                  propertyCode: v.propertyCode || 'SRM-PROP-2026-000421',
                                  propertyTitle: v.propertyTitle,
                                  locality: 'Kondapur',
                                  developer: 'Partner Developer',
                                  latitude: lat,
                                  longitude: lng
                                };
                                setShowPvaVerificationModal({ open: true, plan: matchedPlan, stop: targetStop });
                              }} 
                              style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem' }}
                            >
                              🔐 Verify OTP Now
                            </button>
                          )}
                          <button onClick={() => { setActiveVisitSubTab('visit_feedback'); alert(`⭐ Opening feedback form for Visit ${v.visitId}`); }} style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}>⭐ Feedback</button>
                          <button 
                            onClick={() => {
                              setUpdateReqForm({
                                budget_min: '₹50 Lakhs',
                                budget_max: '₹1.5 Crores',
                                preferredArea: v.propertyTitle || 'Kondapur / Gachibowli',
                                configuration: '3BHK',
                                dislike_reason: 'Over Budget',
                                remarks: ''
                              });
                              setShowUpdateRequirementModal({ 
                                open: true, 
                                customer: { 
                                  custName: v.customerName || 'Customer', 
                                  custCode: v.customerNumber || v.mobile || 'SRM-CUS-2026', 
                                  mobile: v.mobile || v.customerNumber, 
                                  prefArea: v.propertyTitle || 'Kondapur / Gachibowli',
                                  budget_min: '₹50 Lakhs',
                                  budget_max: '₹1.5 Crores',
                                  reason: 'Updated from Single Site Visit Scheduler',
                                  visitId: v.visitId || 'SRM-VS-2026-000088',
                                  costSheetId: v.costSheetId || 'COST-SHEET-2026-000002',
                                  propertyCode: v.propertyCode || v.propCode || 'SRM-PROP-2026-000426'
                                } 
                              });
                            }}
                            style={{ background: '#eab308', color: '#0f172a', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                            title="Update buyer preferences & requirements on-the-spot"
                          >
                            ✏️ Update Requirement
                          </button>
                          <button 
                            onClick={() => {
                              const generatedBookingCode = (v.visitId && v.visitId.includes('SRM-VS-')) 
                                ? v.visitId.replace('SRM-VS-', 'SRM-BKG-') 
                                : `SRM-BKG-2026-0000${(bookings?.length || 0) + 88}`;
                              
                              const newBookingObj = {
                                id: `bkg-${Date.now()}`,
                                booking_code: generatedBookingCode,
                                booking_date: new Date().toISOString().split('T')[0],
                                customer_name: v.customerName || 'Bishwajit Pandey',
                                customer_mobile: v.mobile || '9432328947',
                                customer_number: v.customerNumber || 'SRM-CUS-2026-000188',
                                project_name: v.propertyTitle || 'TILOTTAMA APPARTMENT',
                                developer_name: 'Swaramayi Partner Developer',
                                tower_unit: 'Block A - Unit 302',
                                agreement_value: '₹51,14,880',
                                token_amount: 100000,
                                payment_mode: 'UPI / Online Bank Transfer',
                                payment_ref: `TXN-SRM-${Math.floor(100000 + Math.random() * 900000)}`,
                                brokerage_rate: '2.0%',
                                brokerage_amount: 102297,
                                approval_status: 'APPROVED_LOCKED',
                                sales_executive: v.assignedExecutive || 'Ramesh Pawar (Field Exec - Kondapur)'
                              };

                              if (setBookings) {
                                setBookings((prev: any[]) => [newBookingObj, ...(prev || [])]);
                              }
                              if (setScheduledVisits) {
                                setScheduledVisits((prev: any[]) => (prev || []).filter((sv: any) => sv.visitId !== v.visitId && sv.costSheetId !== v.costSheetId));
                              }
                              if (setVisitPlans) {
                                setVisitPlans((prev: any[]) => (prev || []).filter((plan: any) => plan.visitScheduleId !== v.visitId && plan.visitPlanId !== v.visitId));
                              }
                              setActiveTab('booking_management');
                              if (setActiveBookingSubTab) {
                                setActiveBookingSubTab('all_bookings');
                              }
                              alert(`🏢 BOOKING CREATED SUCCESSFULLY!\n\nGenerated Booking Code: ${generatedBookingCode}\nCustomer: ${v.customerName || 'Bishwajit Pandey'}\nProperty: ${v.propertyTitle || 'TILOTTAMA APPARTMENT'}\n\nRecord removed from Visit Management and transferred to Booking Management.`);
                            }}
                            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                            title="Convert visit into Booking Code, remove from Visit Management and transfer to Booking Management"
                          >
                            🏢 Booking
                          </button>

                          {isSuperAdmin && (
                            <button 
                              onClick={() => {
                                if (window.confirm(`⚠️ SUPER ADMIN CONFIRMATION:\n\nAre you sure you want to permanently delete Scheduled Visit record ${v.visitId || v.costSheetId || 'this visit'} for ${v.customerName || 'Customer'}?`)) {
                                  if (setScheduledVisits) {
                                    setScheduledVisits((prev: any[]) => (prev || []).filter((sv: any) => sv.visitId !== v.visitId && sv.costSheetId !== v.costSheetId && sv.id !== v.id));
                                  }
                                  if (setVisitPlans) {
                                    setVisitPlans((prev: any[]) => (prev || []).filter((plan: any) => plan.visitScheduleId !== v.visitId && plan.visitPlanId !== v.visitId && plan.id !== v.id));
                                  }
                                  alert(`🗑️ Scheduled Visit record ${v.visitId || v.costSheetId || ''} deleted permanently by Super Admin.`);
                                }
                              }}
                              style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                              title="Super Admin Only: Permanently delete this scheduled site visit record"
                            >
                              🗑️ Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
</div>
        )}
      </div>
    )}

    {/* SUB-TAB 2: OTP & GEOFENCE CHECK-IN CONTROL CENTER */}
    {activeVisitSubTab === 'visit_otp_checkin' && (
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔐 6-DIGIT MOBILE OTP & GPS GEOFENCE VERIFICATION CONTROL CENTER
            </h3>
            <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
              Real-time tracking of pending vs completed customer OTP verifications and Project Visit Agreements (PVA)
            </p>
          </div>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
            ● 5-MINUTE OTP TIMER & GEOFENCE ACTIVE
          </span>
        </div>

        {/* SUMMARY CARDS */}
        {(() => {
          const verifiedVisits = scheduledVisits.filter(v => projectVisitAgreements.some(p => p.customerMobile === v.mobile || p.visitScheduleId === v.visitId || p.customerId === v.customerNumber));
          const pendingVisits = scheduledVisits.filter(v => !projectVisitAgreements.some(p => p.customerMobile === v.mobile || p.visitScheduleId === v.visitId || p.customerId === v.customerNumber));

          return (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>TOTAL SCHEDULED VISITS</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#38bdf8', marginTop: '4px' }}>{scheduledVisits.length} Visits</h3>
                </div>
                <div style={{ background: 'rgba(245, 158, 11, 0.1)', border: '1px solid #f59e0b', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800' }}>⏳ PENDING OTP VERIFICATION</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#fbbf24', marginTop: '4px' }}>{pendingVisits.length} Visits Pending</h3>
                </div>
                <div style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', padding: '16px', borderRadius: '12px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>✅ OTP VERIFIED (PVA GENERATED)</span>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#4ade80', marginTop: '4px' }}>{verifiedVisits.length} Visits Verified</h3>
                </div>
              </div>

              {/* LIVE OTP VERIFICATION REGISTER TABLE */}
              <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Visit ID & Date</th>
                      <th style={{ padding: '12px' }}>Customer Name & Contact</th>
                      <th style={{ padding: '12px' }}>Target Property & GPS</th>
                      <th style={{ padding: '12px' }}>OTP Verification Status</th>
                      <th style={{ padding: '12px' }}>Legal PVA Reference</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Verification Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduledVisits.map((v: any, idx: number) => {
                      const pvaMatch = projectVisitAgreements.find((p: any) => p.customerMobile === v.mobile || p.visitScheduleId === v.visitId || p.customerId === v.customerNumber);
                      const isVerified = !!pvaMatch;

                      return (
                        <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px' }}>
                            <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{v.visitId}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>📅 {v.visitDate} at {v.visitTime}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.9rem' }}>{v.customerName}</strong>
                            <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{v.mobile}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{v.propertyTitle}</strong>
                            <div style={{ marginTop: '2px', marginBottom: '2px' }}>
                              <span style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #0284c7', color: '#38bdf8', fontSize: '0.72rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', fontFamily: 'monospace', display: 'inline-block' }}>
                                🏢 Property Code: {v.propertyCode || v.propCode || 'SRM-PROP-2026-000426'}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>📍 GPS: 17.4612° N, 78.3689° E</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            {isVerified ? (
                              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900', display: 'inline-block' }}>
                                ✅ OTP VERIFIED (COMPLETED)
                              </span>
                            ) : (
                              <span style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: '1px solid #f59e0b', padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900', display: 'inline-block' }}>
                                ⏳ OTP VERIFICATION PENDING
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '12px' }}>
                            {isVerified ? (
                              <div>
                                <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.78rem' }}>{pvaMatch.projectVisitAgreementId}</span>
                                <br /><span style={{ fontSize: '0.7rem', color: '#4ade80' }}>Protection till {pvaMatch.protectionEndDate}</span>
                              </div>
                            ) : (
                              <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontStyle: 'italic' }}>PVA Pending OTP Check-In</span>
                            )}
                          </td>
                          <td style={{ padding: '12px', textAlign: 'center' }}>
                            {isVerified ? (
                              <button 
                                onClick={() => setShowPvaDocumentModal({ open: true, pva: pvaMatch })}
                                style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900', fontSize: '0.78rem' }}
                              >
                                📄 View Verified PVA PDF
                              </button>
                            ) : (
                              <button 
                                onClick={() => {
                                  const matchedPlan = visitPlans.find(p => p.customerNumber === v.customerNumber || p.mobile === v.mobile) || visitPlans[0];
                                  const targetStop = matchedPlan?.stops[0] || {
                                    stopId: 'SRM-VSTOP-2026-000001',
                                    costSheetId: v.costSheetId || 'SRM-CS-2026-000145',
                                    propertyCode: v.propertyCode || 'SRM-PROP-2026-000421',
                                    propertyTitle: v.propertyTitle,
                                    locality: 'Kondapur',
                                    developer: 'Partner Developer',
                                    latitude: '17.4612° N',
                                    longitude: '78.3689° E'
                                  };
                                  setShowPvaVerificationModal({ open: true, plan: matchedPlan, stop: targetStop });
                                }}
                                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '900', fontSize: '0.78rem' }}
                              >
                                🔐 Verify 6-Digit OTP Now
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          );
        })()}
      </div>
    )}

    {/* SUB-TAB 3: VISIT SATISFACTION, REQUIREMENT UPDATE & ALTERNATIVE PROPERTY RECOMMENDATIONS */}
    {activeVisitSubTab === 'visit_feedback' && (
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⭐ Post-Visit Customer Satisfaction & Alternative Property Recommendation Cockpit
            </h3>
            <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
              Capture customer feedback, track objection reasons, update buyer requirements on-the-spot, and instantly recommend best alternative properties if not satisfied.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setShowLogSalesFeedbackModal(true)}
              style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              ➕ Log Executive Visit Feedback
            </button>
            <button 
              onClick={() => {
                setActiveTab('matching_management');
                setActiveMatchingSubTab('ai_matching_engine');
              }}
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              🎯 AI Matching Engine →
            </button>
          </div>
        </div>

        {/* CUSTOMER SATISFACTION & ALTERNATIVE RECOMMENDATION REGISTER TABLE */}
        <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '12px' }}>Customer & Visit ID</th>
                <th style={{ padding: '12px' }}>Visited Property</th>
                <th style={{ padding: '12px' }}>Satisfaction & Rating</th>
                <th style={{ padding: '12px' }}>Sales Person Feedback & Objection</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Buyer Intent Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Salesperson Actions & Alternatives</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 'FB-01',
                  visitId: 'SRM-VP-2026-000001',
                  custName: 'Rohan Deshmukh',
                  custMobile: '+91 98490 12345',
                  custCode: 'SRM-CUS-2026-000184',
                  propTitle: 'Prestige High Fields 3BHK',
                  locality: 'Nanakramguda',
                  rating: 2,
                  satisfaction: '😕 Not Satisfied (Requires Alternative)',
                  reason: 'Over Budget by ₹15L & East Facing Preferred',
                  intent: '⚡ WARM - Needs Alternative',
                  exec: 'Priya Nair (Sales Exec)',
                  budget_min: '₹70 Lakhs',
                  budget_max: '₹84 Lakhs',
                  prefArea: 'Kondapur / Gachibowli'
                },
                {
                  id: 'FB-02',
                  visitId: 'SRM-VP-2026-000002',
                  custName: 'Priya Sharma',
                  custMobile: '+91 99887 76655',
                  custCode: 'SRM-CUS-2026-000185',
                  propTitle: 'Financial Towers 4BHK Sky Suite',
                  locality: 'Financial District',
                  rating: 5,
                  satisfaction: '😍 Highly Satisfied (Ready for Booking)',
                  reason: 'Loved 12th Floor Sky Suite View & Layout',
                  intent: '🔥 HOT - Booking Lead',
                  exec: 'Priya Nair (Sales Exec)',
                  budget_min: '₹1.80 Crore',
                  budget_max: '₹2.20 Crore',
                  prefArea: 'Financial District'
                },
                {
                  id: 'FB-03',
                  visitId: 'SRM-VP-2026-000003',
                  custName: 'Dr. Ananth Kulkarni',
                  custMobile: '+91 98480 33445',
                  custCode: 'SRM-CUS-2026-000186',
                  propTitle: 'My Home Bhooja 5BHK Villa',
                  locality: 'HITEC City',
                  rating: 4,
                  satisfaction: '🙂 Moderately Interested (Comparing Options)',
                  reason: 'Comparing 5BHK Options with Jayabheri Silicon',
                  intent: '⚡ WARM - Comparing Options',
                  exec: 'Rahul Sharma (TL)',
                  budget_min: '₹4.00 Crore',
                  budget_max: '₹5.00 Crore',
                  prefArea: 'HITEC City'
                }
              ].map((fb, idx) => (
                <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  <td style={{ padding: '12px' }}>
                    <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.9rem' }}>{fb.custName}</strong>
                    <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{fb.custMobile}</span>
                    <br /><span style={{ fontSize: '0.72rem', color: '#38bdf8', fontFamily: 'monospace' }}>{fb.visitId}</span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>🏢 {fb.propTitle}</strong>
                    <div style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>📍 {fb.locality}</div>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.85rem' }}>
                      {'⭐'.repeat(fb.rating)} ({fb.rating}/5 Stars)
                    </div>
                    <span style={{ fontSize: '0.75rem', color: fb.rating <= 2 ? '#ef4444' : fb.rating >= 4 ? '#4ade80' : '#fbbf24', fontWeight: '800' }}>
                      {fb.satisfaction}
                    </span>
                  </td>

                  <td style={{ padding: '12px' }}>
                    <div style={{ fontSize: '0.8rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>
                      "{fb.reason}"
                    </div>
                    <div style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                      By Exec: {fb.exec}
                    </div>
                  </td>

                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <span style={{ background: fb.intent.includes('HOT') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)', color: fb.intent.includes('HOT') ? '#4ade80' : '#fbbf24', border: `1px solid ${fb.intent.includes('HOT') ? '#22c55e' : '#eab308'}`, padding: '4px 10px', borderRadius: '20px', fontWeight: '900', fontSize: '0.72rem', display: 'inline-block' }}>
                      {fb.intent}
                    </span>
                  </td>

                  <td style={{ padding: '12px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap' }}>
                      {fb.rating <= 3 && (
                        <button 
                          onClick={() => setShowAlternativePropertyModal({ open: true, customer: fb, currentProperty: fb.propTitle })}
                          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          🔄 Recommend Best Alternative Property
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

    {/* SUB-TAB 4: VISIT ANALYTICS */}
    {activeVisitSubTab === 'visit_analytics' && (
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📊 Site Visit Conversion Analytics</h3>
        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Total Site Visits</span>
            <h3 style={{ fontSize: '1.3rem', color: '#38bdf8', fontWeight: '900' }}>100 Visits</h3>
          </div>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Interested Prospects</span>
            <h3 style={{ fontSize: '1.3rem', color: '#4ade80', fontWeight: '900' }}>42 Prospects</h3>
          </div>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Active Negotiations</span>
            <h3 style={{ fontSize: '1.3rem', color: '#fbbf24', fontWeight: '900' }}>20 Deals</h3>
          </div>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '14px', borderRadius: '10px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Confirmed Bookings</span>
            <h3 style={{ fontSize: '1.3rem', color: '#22c55e', fontWeight: '900' }}>8 Bookings (8.0%)</h3>
          </div>
        </div>
      </div>
    )}

    {/* SUB-TAB 6: OWNER LIVE ROUTE TRACKING */}
    {activeVisitSubTab === 'visit_owner_tracking' && (
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>👑 OWNER LIVE ROUTE TRACKING & FIELD EXEC AUDIT MONITOR</h3>
            <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>Real-time GPS route progress, delay detection, and route deviation monitoring</p>
          </div>
          <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', padding: '4px 12px', borderRadius: '20px', fontWeight: '900', fontSize: '0.78rem', border: '1px solid #22c55e' }}>
            ● LIVE MONITORING ACTIVE ({visitPlans.length} ACTIVE ROUTES)
          </span>
        </div>

        <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '12px' }}>Visit Plan ID</th>
                <th style={{ padding: '12px' }}>Sales Executive</th>
                <th style={{ padding: '12px' }}>Customer</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Stops Progress</th>
                <th style={{ padding: '12px' }}>Current Stop</th>
                <th style={{ padding: '12px' }}>Next Stop</th>
                <th style={{ padding: '12px' }}>Route Status</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Live Actions</th>
              </tr>
            </thead>
            <tbody>
              {visitPlans.map((plan: any) => {
                const completedStops = plan.stops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
                const currentStop = plan.stops[plan.currentStopIndex] || plan.stops[0];
                const nextStop = plan.stops[plan.currentStopIndex + 1] || null;

                return (
                  <tr key={plan.visitPlanId} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>
                      {plan.visitPlanId}
                      <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{plan.visitDate}</span>
                    </td>
                    <td style={{ padding: '12px', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900' }}>
                      {plan.assignedExecutive}
                      <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{plan.assignedExecutivePhone}</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{plan.customerName}</strong>
                      <br /><span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'monospace' }}>{plan.customerNumber}</span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', color: '#38bdf8', padding: '4px 10px', borderRadius: '12px', fontWeight: '900', fontSize: '0.8rem' }}>
                        {completedStops} / {plan.stops.length} Stops ({Math.round((completedStops / plan.stops.length) * 100)}%)
                      </span>
                    </td>
                    <td style={{ padding: '12px', color: '#fbbf24', fontWeight: '800' }}>
                      {currentStop?.propertyTitle || 'N/A'}
                    </td>
                    <td style={{ padding: '12px', color: isLight ? '#64748b' : '#94a3b8' }}>
                      {nextStop?.propertyTitle || 'Drop Off'}
                    </td>
                    <td style={{ padding: '12px' }}>
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.75rem' }}>
                        {plan.delayStatus}
                      </span>
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setShowLiveRouteTrackingModal({ open: true, plan })} 
                        style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem' }}
                      >
                        👁️ Live Audit Track
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )}
    </div>
  );
};
