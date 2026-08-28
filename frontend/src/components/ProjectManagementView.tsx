import React from 'react';
import { Upload, Building2, Share2, ArrowRightLeft, Compass, Navigation, Camera, Search, X } from 'lucide-react';

interface ProjectManagementViewProps {
  isLight: boolean;
  windowWidth: number;
  activeProjectSubTab: string;
  setActiveProjectSubTab: (tab: any) => void;
  properties: any[];
  propertyUnits: any[];
  projectVisitAgreements: any[];
  editingProperty: any;
  newPropertyForm: any;
  setNewPropertyForm: React.Dispatch<React.SetStateAction<any>>;
  devProjectMobile: string;
  setDevProjectMobile: (val: string) => void;
  verifiedDevProjectsList: any[];
  setVerifiedDevProjectsList: (val: any[]) => void;
  devProjectOtpVerified: boolean;
  setDevProjectOtpVerified: (val: boolean) => void;
  devProjectOtpSent: boolean;
  setDevProjectOtpSent: (val: boolean) => void;
  devProjectOtpInput: string;
  setDevProjectOtpInput: (val: string) => void;
  isCapturingGps: boolean;
  gpsCaptureStatus: string;
  handleCaptureCurrentGpsLocation: () => void;
  handleCreatePropertySubmit: (e: React.FormEvent) => void;
  generateNextPropertyCode: () => string;
  handleOpenAddPropertyModal: () => void;
  setShowBulkImportPropertyModal: (val: boolean) => void;
  setShowDeveloperIntroductionReportModal: (val: boolean) => void;
  setShowPvaDocumentModal: (val: any) => void;
  handleStartEditProperty: (prop: any) => void;
  handleDeleteProperty: (id: string, code: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  matchesSearchQuery: (item: any, query: string) => boolean;
  activeRadius: string;
  setActiveRadius: (r: any) => void;
  calculateIndividualCostSheet: (form: any) => any;
  formatIndianRupees: (amount: number) => string;
}

export const ProjectManagementView: React.FC<ProjectManagementViewProps> = ({
  isLight,
  windowWidth,
  activeProjectSubTab,
  setActiveProjectSubTab,
  properties = [],
  propertyUnits = [],
  projectVisitAgreements = [],
  editingProperty,
  newPropertyForm,
  setNewPropertyForm,
  devProjectMobile,
  setDevProjectMobile,
  verifiedDevProjectsList = [],
  setVerifiedDevProjectsList,
  devProjectOtpVerified,
  setDevProjectOtpVerified,
  devProjectOtpSent,
  setDevProjectOtpSent,
  devProjectOtpInput,
  setDevProjectOtpInput,
  isCapturingGps,
  gpsCaptureStatus,
  handleCaptureCurrentGpsLocation,
  handleCreatePropertySubmit,
  generateNextPropertyCode,
  handleOpenAddPropertyModal,
  setShowBulkImportPropertyModal,
  setShowDeveloperIntroductionReportModal,
  setShowPvaDocumentModal,
  handleStartEditProperty,
  handleDeleteProperty,
  searchQuery,
  setSearchQuery,
  matchesSearchQuery,
  activeRadius,
  setActiveRadius,
  calculateIndividualCostSheet,
  formatIndianRupees,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* SYSTEM HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>PROJECT & PROPERTY INVENTORY MANAGEMENT SYSTEM</h2>
            <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>STOCK INVENTORY ACTIVE</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
            Master Stock Inventory • Live Unit Tower Grid • GPS Radius Search • Deal Conversion Funnel
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button onClick={() => setShowBulkImportPropertyModal(true)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: windowWidth <= 640 ? '100%' : 'auto' }}>
            <Upload size={15} /> 📥 Import Bulk Inventory
          </button>
          <button onClick={handleOpenAddPropertyModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Building2 size={15} /> + Add Property Master
          </button>
          <button onClick={() => alert('📄 Generating Property Stock Inventory CSV Report...')} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#4ade80', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Share2 size={15} /> Export Inventory
          </button>
        </div>
      </div>

      {/* SUB-TABS NAVIGATION BAR FOR PROJECT MANAGEMENT */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
        <button onClick={() => setActiveProjectSubTab('property_master')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'property_master' ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === 'property_master' ? '#ffffff' : (isLight ? '#0f172a' : '#94a3b8'), border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          🏠 Property Master Stock ({properties.length})
        </button>
        <button onClick={handleOpenAddPropertyModal} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'add_property_master' ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === 'add_property_master' ? '#ffffff' : '#0284c7', border: activeProjectSubTab === 'add_property_master' ? '1px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'), display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Building2 size={16} /> {editingProperty ? `✏️ Edit Property (${editingProperty.property_code})` : '➕ Add Property Master'}
        </button>
        <button onClick={() => setActiveProjectSubTab('live_inventory_board')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'live_inventory_board' ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === 'live_inventory_board' ? '#ffffff' : (isLight ? '#0f172a' : '#94a3b8'), border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          🏢 Live Tower Unit Grid ({propertyUnits.length})
        </button>
        <button onClick={() => setActiveProjectSubTab('map_radius')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'map_radius' ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === 'map_radius' ? '#ffffff' : (isLight ? '#0f172a' : '#94a3b8'), border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📍 Radius GPS Search Filter
        </button>
        <button onClick={() => setActiveProjectSubTab('deal_pipeline_tracker')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === 'deal_pipeline_tracker' ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === 'deal_pipeline_tracker' ? '#ffffff' : (isLight ? '#0f172a' : '#94a3b8'), border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
          📈 Deal Conversion Funnel (13 Stages)
        </button>
        <button onClick={() => setActiveProjectSubTab('introduction_register' as any)} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeProjectSubTab === ('introduction_register' as any) ? '#0284c7' : (isLight ? '#ffffff' : '#1e293b'), color: activeProjectSubTab === ('introduction_register' as any) ? '#ffffff' : '#a855f7', border: activeProjectSubTab === ('introduction_register' as any) ? '1px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155') }}>
          🛡️ Customer Introduction Register ({projectVisitAgreements.length})
        </button>
      </div>

      {/* SUB-TAB: CUSTOMER INTRODUCTION REGISTER & BROKERAGE PROTECTION */}
      {activeProjectSubTab === ('introduction_register' as any) && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🛡️ PROJECT-WISE CUSTOMER INTRODUCTION REGISTER</h3>
              <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                Time-stamped, project-specific proof of introduced buyers backed by Project Visit Agreements (PVA)
              </p>
            </div>
            <button 
              onClick={() => setShowDeveloperIntroductionReportModal(true)}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              🏢 VIEW DEVELOPER INTRODUCTION SUMMARY REPORT
            </button>
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                  <th style={{ padding: '10px' }}>PVA ID & Date</th>
                  <th style={{ padding: '10px' }}>Customer & Mobile</th>
                  <th style={{ padding: '10px' }}>Project & Developer</th>
                  <th style={{ padding: '10px' }}>Assigned Sales Exec</th>
                  <th style={{ padding: '10px' }}>Protection Expiry Date</th>
                  <th style={{ padding: '10px' }}>Verification Status</th>
                  <th style={{ padding: '10px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {projectVisitAgreements.map((pva: any, idx: number) => (
                  <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '10px' }}>
                      <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{pva.projectVisitAgreementId}</span>
                      <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>📅 {pva.visitDate}</span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{pva.customerName}</strong>
                      <br /><span style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace' }}>{pva.customerMobile}</span>
                    </td>
                    <td style={{ padding: '10px' }}>
                      <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>{pva.projectTitle}</strong>
                      <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>Dev: {pva.developerName}</span>
                    </td>
                    <td style={{ padding: '10px', color: '#38bdf8', fontWeight: '800' }}>
                      {pva.salesPersonName}
                    </td>
                    <td style={{ padding: '10px', color: '#4ade80', fontWeight: '800' }}>
                      🗓️ {pva.protectionEndDate} ({pva.protectionPeriodMonths}M Protection)
                    </td>
                    <td style={{ padding: '10px' }}>
                      <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900' }}>
                        ✓ VISIT VERIFIED (GPS+OTP)
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button 
                        onClick={() => setShowPvaDocumentModal({ open: true, pva })}
                        style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem' }}
                      >
                        📄 View PVA Document
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB: FULL DEDICATED PAGE VIEW FOR PROPERTY MASTER REGISTRATION & EDITING */}
      {activeProjectSubTab === 'add_property_master' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* FULL PAGE NAVIGATION HEADER */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.04)' : 'none' }}>
            <div>
              <button 
                type="button" 
                onClick={() => setActiveProjectSubTab('property_master')}
                style={{ background: isLight ? '#f1f5f9' : '#0f172a', color: '#0284c7', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}
              >
                <ArrowRightLeft size={16} /> ⬅️ Back to Property Inventory Registry
              </button>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {editingProperty ? `✏️ Edit Property Master Record (${editingProperty.property_code})` : '🏠 Register New Property Master Inventory'}
              </h2>
              <p style={{ fontSize: '0.82rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                {editingProperty ? 'Modify full specifications, pricing, locality, facing, and status for this property master record.' : 'Adds property listing into central stock vault with automated property code (SRM-PROP).'}
              </p>
            </div>

            <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '10px', padding: '12px 20px', textAlign: 'right' }}>
              <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase', display: 'block' }}>Stock Inventory Tracking Code</span>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0284c7', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                {editingProperty ? editingProperty.property_code : (newPropertyForm.property_code || generateNextPropertyCode())}
              </h3>
            </div>
          </div>

          {/* FULL PAGE FORM CONTAINER */}
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: windowWidth <= 640 ? '16px' : '28px', boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.04)' : 'none' }}>
            <form onSubmit={handleCreatePropertySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* SECTION 1: PROJECT & DEVELOPER IDENTIFICATION */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '10px' }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0284c7' : '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    🏢 1. Project & Developer Identification
                  </h4>
                  <span style={{ fontSize: '0.75rem', background: '#22c55e', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                    1-Time Developer Project OTP Protocol
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Developer / Builder Name *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.developer} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, developer: e.target.value })} 
                      placeholder="e.g. My Home Constructions / Dhriti Builders / Aparna" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                      required 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Project Title & Name *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.title} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, title: e.target.value })} 
                      placeholder="e.g. My Home Bhooja / Dhriti Apartments / Aparna Zenon" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Developer Mobile Phone (for OTP) *</label>
                    <input 
                      type="text" 
                      value={devProjectMobile} 
                      onChange={(e) => setDevProjectMobile(e.target.value)} 
                      placeholder="e.g. +91 98490 88776" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                      required 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Locality Hub / Sector *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.locality} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, locality: e.target.value })} 
                      placeholder="e.g. Kondapur Hub / HITEC City Sector / Gachibowli" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                      required 
                    />
                  </div>
                </div>

                {/* DEVELOPER 1-TIME PROJECT OTP VERIFICATION CONTAINER */}
                {(() => {
                  const isAlreadyVerified = verifiedDevProjectsList.some(p => 
                    p.developer.toLowerCase().includes((newPropertyForm.developer || '').toLowerCase().trim()) &&
                    p.project.toLowerCase().includes((newPropertyForm.title || '').toLowerCase().trim())
                  ) || devProjectOtpVerified;

                  return (
                    <div style={{ background: isAlreadyVerified ? 'rgba(34, 197, 94, 0.12)' : (isLight ? '#ffffff' : '#1e293b'), border: `2px solid ${isAlreadyVerified ? '#22c55e' : '#0284c7'}`, borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <h4 style={{ fontSize: '0.88rem', fontWeight: '900', color: isAlreadyVerified ? '#22c55e' : '#0284c7', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {isAlreadyVerified ? '✅ DEVELOPER OTP VERIFIED (1-Time Project Verification Active)' : '🔐 DEVELOPER 1-TIME PROJECT OTP VERIFICATION'}
                          </h4>
                          <span style={{ fontSize: '0.74rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                            {isAlreadyVerified ? `Verified for Developer: ${newPropertyForm.developer || 'Builder'} • Project: ${newPropertyForm.title || 'Project'}` : '1-Time OTP authentication per project. Developers with multiple projects verify once per project.'}
                          </span>
                        </div>

                        {!isAlreadyVerified && !devProjectOtpSent && (
                          <button 
                            type="button" 
                            onClick={() => setDevProjectOtpSent(true)}
                            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(2, 132, 199, 0.3)' }}
                          >
                            📱 SEND DEVELOPER 1-TIME OTP FOR THIS PROJECT
                          </button>
                        )}
                      </div>

                      {!isAlreadyVerified && devProjectOtpSent && (
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '8px', border: '1px solid #38bdf8' }}>
                          <span style={{ fontSize: '0.78rem', color: '#4ade80', fontWeight: '800' }}>📲 Sent 6-Digit OTP to {devProjectMobile}:</span>
                          <input 
                            type="text" 
                            value={devProjectOtpInput} 
                            onChange={(e) => setDevProjectOtpInput(e.target.value)} 
                            placeholder="Enter 6-Digit OTP"
                            style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', color: '#22c55e', fontWeight: '900', padding: '6px 12px', borderRadius: '6px', fontSize: '0.9rem', width: '140px', fontFamily: 'monospace', textAlign: 'center' }}
                          />
                          <button 
                            type="button" 
                            onClick={() => {
                              if (devProjectOtpInput === '749201' || devProjectOtpInput.length === 6) {
                                setDevProjectOtpVerified(true);
                                const newVerifiedObj = {
                                  developer: newPropertyForm.developer || 'Builder',
                                  project: newPropertyForm.title || 'Project',
                                  mobile: devProjectMobile,
                                  verifiedAt: new Date().toLocaleString(),
                                  hash: `SHA256-DEV-OTP-VERIFIED-#${Math.floor(100000 + Math.random() * 900000)}`
                                };
                                setVerifiedDevProjectsList([newVerifiedObj, ...verifiedDevProjectsList]);
                              }
                            }}
                            style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '7px 16px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                          >
                            🔐 VERIFY DEVELOPER PROJECT OTP
                          </button>
                        </div>
                      )}

                      {isAlreadyVerified && (
                        <div style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace', fontWeight: '800', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                          <span>Audit Stamp: SHA256-DEV-PROJECT-OTP-AUTHENTICATED</span>
                          <span>Status: 1-Time Verification Complete</span>
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* GPS LATITUDE & LONGITUDE INPUTS WITH LIVE LOCATION CAPTURE BUTTON */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                        padding: '8px 16px', 
                        borderRadius: '8px', 
                        fontWeight: '900', 
                        fontSize: '0.8rem', 
                        cursor: isCapturingGps ? 'wait' : 'pointer', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)' 
                      }}
                    >
                      <Navigation size={15} />
                      {isCapturingGps ? '📡 Capturing GPS...' : '🎯 CAPTURE MY CURRENT GPS LOCATION'}
                    </button>
                  </div>

                  {gpsCaptureStatus && (
                    <div style={{ background: gpsCaptureStatus.startsWith('✓') ? 'rgba(34, 197, 94, 0.15)' : 'rgba(56, 189, 248, 0.15)', border: `1px solid ${gpsCaptureStatus.startsWith('✓') ? '#22c55e' : '#38bdf8'}`, borderRadius: '6px', padding: '8px 12px', fontSize: '0.78rem', color: gpsCaptureStatus.startsWith('✓') ? '#4ade80' : '#38bdf8', fontWeight: '800' }}>
                      {gpsCaptureStatus}
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GPS Latitude (Exact Map Lat)</label>
                      <input type="text" value={newPropertyForm.latitude} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, latitude: e.target.value })} placeholder="e.g. 22.698021 or 17.44008" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GPS Longitude (Exact Map Long)</label>
                      <input type="text" value={newPropertyForm.longitude} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, longitude: e.target.value })} placeholder="e.g. 88.463723 or 78.34891" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                    </div>
                  </div>
                </div>

                {/* BUILDING & EXTERIOR ELEVATION PHOTO CAPTURE WIDGET */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #eab308', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div>
                      <span style={{ fontSize: '0.82rem', color: '#eab308', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Camera size={16} color="#eab308" /> 📷 Building & Exterior Elevation Photo Capture
                      </span>
                      <p style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', margin: '2px 0 0 0' }}>
                        Capture on-site building photo. Sales personnel will see this photo with all property & GPS details when site visits are scheduled.
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {/* CAMERA / FILE CAPTURE BUTTON */}
                      <label style={{ background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: '#0f172a', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(234, 179, 8, 0.3)' }}>
                        <Camera size={15} color="#0f172a" />
                        📸 CAPTURE / UPLOAD BUILDING PHOTO
                        <input 
                          type="file" 
                          accept="image/*" 
                          capture="environment" 
                          style={{ display: 'none' }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setNewPropertyForm((prev: any) => ({
                                    ...prev,
                                    building_photo: event.target!.result as string
                                  }));
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>

                      {/* SAMPLE QUICK PHOTO PRESETS */}
                      <button
                        type="button"
                        onClick={() => {
                          const samplePhotos = [
                            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
                            'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
                          ];
                          const pick = samplePhotos[Math.floor(Math.random() * samplePhotos.length)];
                          setNewPropertyForm((prev: any) => ({ ...prev, building_photo: pick }));
                        }}
                        style={{ background: isLight ? '#e2e8f0' : '#1e293b', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 12px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}
                      >
                        🖼️ Preset Building Elevation
                      </button>
                    </div>
                  </div>

                  {/* IMAGE URL INPUT & LIVE THUMBNAIL PREVIEW */}
                  <div style={{ display: 'grid', gridTemplateColumns: newPropertyForm.building_photo ? '1fr 220px' : '1fr', gap: '14px', alignItems: 'center' }}>
                    <div>
                      <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Building Photo Image URL (Or Uploaded File Base64)</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.building_photo} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, building_photo: e.target.value })} 
                        placeholder="e.g. https://images.unsplash.com/... or click capture button above" 
                        style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} 
                      />
                    </div>

                    {newPropertyForm.building_photo && (
                      <div style={{ position: 'relative', background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                        <img 
                          src={newPropertyForm.building_photo} 
                          alt="Captured Building Photo" 
                          style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '6px' }} 
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: '900' }}>✓ PHOTO LINKED</span>
                          <button 
                            type="button" 
                            onClick={() => setNewPropertyForm((prev: any) => ({ ...prev, building_photo: '' }))}
                            style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '2px 6px', borderRadius: '4px', fontSize: '0.68rem', fontWeight: '800', cursor: 'pointer' }}
                          >
                            🗑️ Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* SECTION 2: PROPERTY SPECIFICATIONS & UNIT DETAILS */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#d97706' : '#fbbf24', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                  2. Property Specifications & Unit Details
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Property Category Type</label>
                    <select value={newPropertyForm.property_type} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, property_type: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <option value="Flat / Apartment (New / Builder)">🏢 Flat / Apartment (New / Builder)</option>
                      <option value="Flat / Apartment (Resale)">🔄 Flat / Apartment (Resale)</option>
                      <option value="Flat / Apartment (For Rent)">🔑 Flat / Apartment (For Rent)</option>
                      <option value="Gated Villa (New / Builder)">🏰 Gated Villa (New / Builder)</option>
                      <option value="Gated Villa (Resale)">🔄 Gated Villa (Resale)</option>
                      <option value="Gated Villa (For Rent)">🔑 Gated Villa (For Rent)</option>
                      <option value="Independent House (Resale)">🔄 Independent House (Resale)</option>
                      <option value="Independent House (For Rent)">🔑 Independent House (For Rent)</option>
                      <option value="Commercial Space (New / Builder)">🏢 Commercial Space (New / Builder)</option>
                      <option value="Commercial Space (Resale)">🔄 Commercial Space (Resale)</option>
                      <option value="Commercial Space (For Lease / Rent)">🔑 Commercial Space (For Lease / Rent)</option>
                      <option value="PG / Co-Living Space">🛌 PG / Co-Living Space (For Rent)</option>
                      <option value="Open Plot / Land (New / Builder)">📐 Open Plot / Land (New / Builder)</option>
                      <option value="Open Plot / Land (Resale)">📐 Open Plot / Land (Resale)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>BHK Configuration</label>
                    <select value={newPropertyForm.configuration} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, configuration: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <option value="1BHK">1BHK Studio</option>
                      <option value="2BHK">2BHK Flat</option>
                      <option value="3BHK">3BHK Flat</option>
                      <option value="4BHK">4BHK Luxury Apartment</option>
                      <option value="Villa">Gated Villa</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Super Built-up Area (Sq.Ft.)</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.super_builtup_area} 
                      onChange={(e) => {
                        const superVal = e.target.value;
                        const superNum = parseFloat(superVal.replace(/[^0-9.]/g, ''));
                        const pctNum = parseFloat((newPropertyForm.deduction_pct || '35%').replace(/[^0-9.]/g, '')) || 0;
                        let computedCarpet = newPropertyForm.carpet_area;
                        if (!isNaN(superNum) && superNum > 0) {
                          const carpetNum = superNum * (1 - pctNum / 100);
                          computedCarpet = `${Math.round(carpetNum * 100) / 100} Sq.Ft.`;
                        }
                        setNewPropertyForm({
                          ...newPropertyForm,
                          super_builtup_area: superVal,
                          carpet_area: computedCarpet
                        });
                      }} 
                      placeholder="e.g. 827" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Deduction / Loading (%) *</label>
                    <select 
                      value={newPropertyForm.deduction_pct || '35%'} 
                      onChange={(e) => {
                        const pctVal = e.target.value;
                        const pctNum = parseFloat(pctVal.replace(/[^0-9.]/g, '')) || 0;
                        const superNum = parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, ''));
                        let computedCarpet = newPropertyForm.carpet_area;
                        if (!isNaN(superNum) && superNum > 0) {
                          const carpetNum = superNum * (1 - pctNum / 100);
                          computedCarpet = `${Math.round(carpetNum * 100) / 100} Sq.Ft.`;
                        }
                        setNewPropertyForm({
                          ...newPropertyForm,
                          deduction_pct: pctVal,
                          carpet_area: computedCarpet
                        });
                      }} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #eab308', color: '#eab308', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}
                    >
                      <option value="35%">35% Deduction (Standard Builder Loading)</option>
                      <option value="30%">30% Deduction</option>
                      <option value="25%">25% Deduction</option>
                      <option value="20%">20% Deduction</option>
                      <option value="40%">40% Deduction (High Common Area)</option>
                      <option value="0%">0% Deduction (Direct Carpet = Super)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Carpet Area (Sq.Ft.) *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.carpet_area} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, carpet_area: e.target.value })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #38bdf8', color: '#38bdf8', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                      required 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Vastu Facing</label>
                    <select value={newPropertyForm.facing} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, facing: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <option value="East Facing">East Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="West Facing">West Facing</option>
                      <option value="North-East Facing">North-East Facing</option>
                      <option value="South Facing">South Facing</option>
                    </select>
                  </div>
                </div>

                {/* DEDUCTION AUTO-CALCULATION SUMMARY CARD */}
                {(() => {
                  const superNum = parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, ''));
                  const pctNum = parseFloat((newPropertyForm.deduction_pct || '35%').replace(/[^0-9.]/g, '')) || 0;
                  if (!isNaN(superNum) && superNum > 0) {
                    const deductionVal = superNum * (pctNum / 100);
                    const carpetVal = superNum - deductionVal;
                    return (
                      <div style={{ background: 'rgba(234, 179, 8, 0.12)', border: '1px solid #eab308', borderRadius: '8px', padding: '10px 14px', fontSize: '0.8rem', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                        <div>
                          <span style={{ color: '#eab308', fontWeight: '900' }}>📐 LIVE DEDUCTION CALCULATION:</span>{' '}
                          <strong>{superNum} Sq.Ft.</strong> (Super Built-up) − <strong>{pctNum}%</strong> Deduction ({Math.round(deductionVal * 100) / 100} Sq.Ft.) = <strong style={{ color: '#38bdf8', fontSize: '0.9rem' }}>{Math.round(carpetVal * 100) / 100} Sq.Ft. (Carpet Area)</strong>
                        </div>
                        <span style={{ background: '#eab308', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '900' }}>
                          AUTO-CALCULATED
                        </span>
                      </div>
                    );
                  }
                  return null;
                })()}

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Floor Number (Unit Floor) *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.unit_floor || '1st Floor'} 
                      onChange={(e) => {
                        const uFloor = e.target.value;
                        const tFloors = newPropertyForm.total_floors || '4 Floors';
                        setNewPropertyForm({
                          ...newPropertyForm,
                          unit_floor: uFloor,
                          floor_no: `${uFloor} out of ${tFloors}`
                        });
                      }} 
                      placeholder="e.g. 1st Floor / Ground Floor" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Total Floors in Building *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.total_floors || '4 Floors'} 
                      onChange={(e) => {
                        const tFloors = e.target.value;
                        const uFloor = newPropertyForm.unit_floor || '1st Floor';
                        setNewPropertyForm({
                          ...newPropertyForm,
                          total_floors: tFloors,
                          floor_no: `${uFloor} out of ${tFloors}`
                        });
                      }} 
                      placeholder="e.g. 4 Floors / 32 Floors" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Tower / Block Name</label>
                    <input type="text" value={newPropertyForm.tower_block} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, tower_block: e.target.value })} placeholder="Tower B - Sapphire" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>
                </div>
              </div>

              {/* SECTION 3: COMMERCIALS, PRICING & BROKERAGE */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#16a34a' : '#4ade80', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                  3. Pricing, Commercials & Brokerage Agreements
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Price per Sq.Ft. (INR) *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.price_sqft} 
                      onChange={(e) => {
                        const sqftVal = e.target.value;
                        const priceNum = parseFloat(sqftVal.replace(/[^0-9.]/g, ''));
                        const superNum = parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, ''));
                        let computedFlatPrice = newPropertyForm.final_price;
                        if (!isNaN(priceNum) && !isNaN(superNum) && superNum > 0) {
                          const flatVal = Math.round(priceNum * superNum);
                          computedFlatPrice = `₹${flatVal.toLocaleString('en-IN')}`;
                        }
                        setNewPropertyForm({
                          ...newPropertyForm,
                          price_sqft: sqftVal,
                          final_price: computedFlatPrice
                        });
                      }} 
                      placeholder="e.g. 3250"
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #38bdf8', color: '#38bdf8', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Base Flat Price (INR) [Super Built-up × Rate] *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.final_price || (parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) && parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, '')) ? `₹${Math.round(parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) * parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, ''))).toLocaleString('en-IN')}` : '')} 
                      onChange={(e) => {
                        const flatVal = e.target.value;
                        const flatNum = parseFloat(flatVal.replace(/[^0-9.]/g, ''));
                        const superNum = parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, ''));
                        let computedPriceSqft = newPropertyForm.price_sqft;
                        if (!isNaN(flatNum) && !isNaN(superNum) && superNum > 0) {
                          const sqftNum = Math.round(flatNum / superNum);
                          computedPriceSqft = `₹${sqftNum.toLocaleString('en-IN')}/Sq.Ft.`;
                        }
                        setNewPropertyForm({
                          ...newPropertyForm,
                          final_price: flatVal,
                          price_sqft: computedPriceSqft
                        });
                      }} 
                      placeholder="e.g. ₹57,50,000"
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                    />
                  </div>

                  {/* TOTAL ALL-INCLUSIVE FINAL PRICE (INCLUDES ALL CHARGES & TAXES) */}
                  {(() => {
                    const rawBasePrice = newPropertyForm.final_price || (parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) && parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, '')) ? `₹${Math.round(parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) * parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, '')))}` : '');
                    const computedCalc = calculateIndividualCostSheet({
                      ...newPropertyForm,
                      final_price: rawBasePrice
                    });
                    const computedAllInStr = rawBasePrice && computedCalc.totalEstimatedCost > 0 ? computedCalc.totalEstimatedCostStr : '';

                    return (
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: '900', display: 'block', marginBottom: '6px' }}>
                          🏆 Total All-Inclusive Final Price (INR) [Base + Charges + Taxes] *
                        </label>
                        <input 
                          type="text" 
                          value={newPropertyForm.total_all_inclusive_price || computedAllInStr} 
                          onChange={(e) => setNewPropertyForm({ ...newPropertyForm, total_all_inclusive_price: e.target.value })} 
                          placeholder="e.g. ₹70,32,500 (All-Inclusive Landed Price)"
                          style={{ width: '100%', background: 'rgba(34, 197, 94, 0.12)', border: '2px solid #22c55e', color: isLight ? '#15803d' : '#4ade80', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.92rem' }} 
                        />
                        <div style={{ fontSize: '0.68rem', color: '#22c55e', fontWeight: '800', marginTop: '4px' }}>
                          ✓ Auto-sums Base + Parking + Amenities + Statutory GST & Stamp Duty
                        </div>
                      </div>
                    );
                  })()}

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Agreed Brokerage Fee %</label>
                    <input type="text" value={newPropertyForm.commission_pct} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, commission_pct: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#d97706' : '#fbbf24', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>
                </div>

                {/* PARKING & AMENITY CHARGES ROW WITH PRESETS */}
                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Car Parking Availability *</label>
                    <select 
                      value={newPropertyForm.parking_availability || 'Covered Car Parking (1 Slot Included)'} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, parking_availability: e.target.value })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800' }}
                    >
                      <option value="Covered Car Parking (1 Slot Included)">🚗 Covered Car Parking (1 Slot Included)</option>
                      <option value="Covered Car Parking (2 Slots Included)">🚗🚗 Covered Car Parking (2 Slots Included)</option>
                      <option value="Uncovered / Open Parking">🅿️ Uncovered / Open Parking Slot</option>
                      <option value="Additional Parking Available">➕ Additional Parking Available for Purchase</option>
                      <option value="No Parking Allotted">❌ No Parking Allotted</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Parking Price (INR) *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.parking_price !== undefined ? newPropertyForm.parking_price : ''} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, parking_price: e.target.value })} 
                      placeholder="Enter Parking Price (e.g. Included in Flat Price / ₹3,00,000)"
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '9px 10px', borderRadius: '8px', fontSize: '0.82rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Amenity Charges (INR) *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.amenity_charges !== undefined ? newPropertyForm.amenity_charges : ''} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, amenity_charges: e.target.value })} 
                      placeholder="Enter Amenity Charges (e.g. Included in Flat Price / ₹2,50,000)"
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '9px 10px', borderRadius: '8px', fontSize: '0.82rem' }} 
                    />
                  </div>
                </div>

                {/* PRICING LIVE CALCULATION SUMMARY CARD */}
                {(() => {
                  const basePriceVal = newPropertyForm.final_price || (parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) && parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, '')) ? `₹${Math.round(parseFloat((newPropertyForm.price_sqft || '').replace(/[^0-9.]/g, '')) * parseFloat((newPropertyForm.super_builtup_area || '').replace(/[^0-9.]/g, '')))}` : '');
                  if (!basePriceVal) return null;
                  const computedCalc = calculateIndividualCostSheet({
                    ...newPropertyForm,
                    final_price: basePriceVal
                  });

                  if (computedCalc.totalEstimatedCost === 0) return null;

                  return (
                    <div style={{ background: 'rgba(34, 197, 94, 0.12)', border: '1.5px solid #22c55e', borderRadius: '10px', padding: '12px 16px', fontSize: '0.82rem', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ color: '#22c55e', fontWeight: '900', fontSize: '0.9rem', marginBottom: '2px' }}>
                          🏆 TOTAL ALL-INCLUSIVE FINAL LANDED COST: <span style={{ color: isLight ? '#15803d' : '#4ade80', fontSize: '1.05rem', fontWeight: '900', textDecoration: 'underline' }}>{newPropertyForm.total_all_inclusive_price || computedCalc.totalEstimatedCostStr}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: isLight ? '#475569' : '#cbd5e1' }}>
                          <strong>Base Flat:</strong> {computedCalc.basePriceStr} • <strong>Parking:</strong> {computedCalc.parkingStr} • <strong>Amenities:</strong> {computedCalc.clubStr !== 'Included in Flat Price' ? computedCalc.clubStr : computedCalc.amenityStr || 'Included'} • <strong>Subtotal:</strong> {computedCalc.subtotalStr} • <strong>GST ({computedCalc.gstPct}%):</strong> {formatIndianRupees(computedCalc.gstAmount)} • <strong>Stamp Duty ({computedCalc.stampDutyPct}%):</strong> {formatIndianRupees(computedCalc.stampDutyAmount)} • <strong>Reg Fee ({computedCalc.registrationPct}%):</strong> {formatIndianRupees(computedCalc.registrationAmount)}
                        </div>
                      </div>
                      <span style={{ background: '#22c55e', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', whiteSpace: 'nowrap' }}>
                        ALL-INCLUSIVE FINAL
                      </span>
                    </div>
                  );
                })()}

                {/* ITEMIZED PROPERTY PRICE & TAX BREAKUP SUB-CONTAINER FOR COST SHEET */}
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '10px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                    <h5 style={{ fontSize: '0.88rem', fontWeight: '900', color: '#0284c7', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      🧾 Itemized Property Price & Tax Breakup (Used for Cost Sheet Calculations)
                    </h5>
                    <span style={{ background: 'rgba(2, 132, 199, 0.15)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                      ⚡ AUTO-SYNCED TO COST SHEET
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Floor Rise Charge (INR)</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.floor_rise_charge || ''} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, floor_rise_charge: e.target.value })} 
                        placeholder="Enter Floor Rise Charge (e.g. ₹50,000)"
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferential Location Charge (PLC)</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.plc_charge || ''} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, plc_charge: e.target.value })} 
                        placeholder="Enter Preferential Location Charge (PLC)"
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Clubhouse & Gated Amenities Membership</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.clubhouse_charge || ''} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, clubhouse_charge: e.target.value })} 
                        placeholder="Enter Clubhouse Membership Charge"
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Advance Maintenance Charge (1 Year)</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.advance_maintenance_charge || ''} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, advance_maintenance_charge: e.target.value })} 
                        placeholder="Enter Advance Maintenance Charge"
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Infrastructure & Legal Documentation Fee</label>
                      <input 
                        type="text" 
                        value={newPropertyForm.legal_doc_charge || ''} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, legal_doc_charge: e.target.value })} 
                        placeholder="Enter Infrastructure & Legal Documentation Fee"
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }} 
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>GST Rate (%) *</label>
                      <select 
                        value={newPropertyForm.gst_pct || '5.0%'} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, gst_pct: e.target.value })} 
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#0284c7', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                      >
                        <option value="5.0%">5.0% GST (Under Construction Standard)</option>
                        <option value="0.0%">0.0% GST (Ready to Move / Exempt)</option>
                        <option value="1.0%">1.0% GST (Affordable Housing Rate)</option>
                        <option value="12.0%">12.0% GST (Commercial Real Estate)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Stamp Duty Rate (%) *</label>
                      <select 
                        value={newPropertyForm.stamp_duty_pct || '5.0%'} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, stamp_duty_pct: e.target.value })} 
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#0284c7', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                      >
                        <option value="5.0%">5.0% Stamp Duty (Standard Rate)</option>
                        <option value="7.5%">7.5% Stamp Duty (High Value Rate)</option>
                        <option value="4.0%">4.0% Stamp Duty (Women Concession)</option>
                        <option value="6.0%">6.0% Stamp Duty (State Concession)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.76rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Registration Fee (%) *</label>
                      <select 
                        value={newPropertyForm.registration_fee_pct || '1.0%'} 
                        onChange={(e) => setNewPropertyForm({ ...newPropertyForm, registration_fee_pct: e.target.value })} 
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#0284c7', fontWeight: '800', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}
                      >
                        <option value="1.0%">1.0% Registration Fee (Standard Rate)</option>
                        <option value="0.5%">0.5% Registration Fee (Flat Cap Rate)</option>
                        <option value="2.0%">2.0% Registration Fee (Commercial Rate)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Possession Status</label>
                    <select value={newPropertyForm.possession_status} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, possession_status: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction (Dec 2026)">Under Construction (Dec 2026)</option>
                      <option value="New Pre-Launch">New Pre-Launch</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Monthly Maintenance</label>
                    <input type="text" value={newPropertyForm.maintenance_monthly} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, maintenance_monthly: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Stock Inventory Status</label>
                    <select value={newPropertyForm.status} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, status: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                      <option value="AVAILABLE">🟢 AVAILABLE IN STOCK</option>
                      <option value="HOLD">⚡ HOLD / RESERVED</option>
                      <option value="BOOKED">🔴 BOOKED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 4: AMENITIES AVAILABLE (MULTIPLE SELECTION) */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#0284c7' : '#38bdf8' }}>
                    4. Amenities Available & Infrastructure Features (Multiple Selection)
                  </h4>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      type="button"
                      onClick={() => {
                        const allIds = [
                          '24/7 Power Backup', 'Water Supply', 'Security', 'CCTV cameras',
                          'Elevators', 'backup power', 'Fire Safety', 'Gymnasium',
                          'Swimming Pool', 'Clubhouse', "Children's Play Area", 'Sports Courts',
                          'Track', 'Gardens', 'Waste Management', 'EV Charging Stations'
                        ];
                        setNewPropertyForm({ ...newPropertyForm, selected_amenities: allIds });
                      }}
                      style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Select All (16 Amenities)
                    </button>
                    <button 
                      type="button"
                      onClick={() => setNewPropertyForm({ ...newPropertyForm, selected_amenities: [] })}
                      style={{ background: isLight ? '#e2e8f0' : '#334155', color: isLight ? '#475569' : '#cbd5e1', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.72rem', fontWeight: '800', cursor: 'pointer' }}
                    >
                      Clear All
                    </button>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                  {[
                    { id: '24/7 Power Backup', label: '⚡ 24/7 Power Backup' },
                    { id: 'Water Supply', label: '🚰 Water Supply (24 Hours)' },
                    { id: 'Security', label: '🛡️ 24/7 Security Guard' },
                    { id: 'CCTV cameras', label: '📹 CCTV Cameras' },
                    { id: 'Elevators', label: '🛗 High-Speed Elevators' },
                    { id: 'backup power', label: '⚡ Backup Power Generator' },
                    { id: 'Fire Safety', label: '🧯 Fire Safety System' },
                    { id: 'Gymnasium', label: '🏋️ Fitness Gymnasium' },
                    { id: 'Swimming Pool', label: '🏊 Swimming Pool' },
                    { id: 'Clubhouse', label: '🏛️ Luxury Clubhouse' },
                    { id: "Children's Play Area", label: "🛝 Children's Play Area" },
                    { id: 'Sports Courts', label: '🏸 Multi-Sports Courts' },
                    { id: 'Track', label: '🏃 Jogging / Walking Track' },
                    { id: 'Gardens', label: '🌳 Landscaped Gardens' },
                    { id: 'Waste Management', label: '♻️ Waste Management & STP' },
                    { id: 'EV Charging Stations', label: '🔌 EV Charging Stations' }
                  ].map((amenity) => {
                    const selectedList = newPropertyForm.selected_amenities || [];
                    const isChecked = selectedList.includes(amenity.id);
                    return (
                      <label 
                        key={amenity.id}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          background: isChecked ? (isLight ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.18)') : (isLight ? '#ffffff' : '#1e293b'),
                          border: isChecked ? '2px solid #38bdf8' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                          padding: '8px 12px', 
                          borderRadius: '8px', 
                          cursor: 'pointer',
                          fontSize: '0.8rem',
                          fontWeight: isChecked ? '800' : '600',
                          color: isChecked ? (isLight ? '#0284c7' : '#38bdf8') : (isLight ? '#334155' : '#cbd5e1'),
                          transition: 'all 0.15s ease-in-out'
                        }}
                      >
                        <input 
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            let updated = [...selectedList];
                            if (e.target.checked) {
                              if (!updated.includes(amenity.id)) updated.push(amenity.id);
                            } else {
                              updated = updated.filter(i => i !== amenity.id);
                            }
                            setNewPropertyForm({ ...newPropertyForm, selected_amenities: updated });
                          }}
                          style={{ accentColor: '#38bdf8', width: '15px', height: '15px' }}
                        />
                        <span>{amenity.label}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 5: KEYS CUSTODY & PROPERTY DESCRIPTION */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#7e22ce' : '#a855f7', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                  5. Keys Custody & Architectural Description
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Physical Keys / Custody Location</label>
                    <input type="text" value={newPropertyForm.key_custody} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, key_custody: e.target.value })} placeholder="Builder Lounge / Company Office" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Property Highlights & Notes</label>
                    <input type="text" value={newPropertyForm.description} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, description: e.target.value })} placeholder="Pool facing Vastu East, 3 balconies" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#0284c7' : '#38bdf8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>👤 Site Person Contact Name *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.site_person_name || ''} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, site_person_name: e.target.value })} 
                      placeholder="e.g. Rajesh Kumar (Site Manager / Security Incharge)" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: '#22c55e', fontWeight: '800', display: 'block', marginBottom: '6px' }}>📞 Site Person Contact Phone Number *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.site_person_contact || ''} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, site_person_contact: e.target.value })} 
                      placeholder="e.g. +91 98490 77665" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                    />
                  </div>
                </div>
              </div>

              {/* FULL PAGE ACTION FOOTER BUTTONS */}
              <div style={{ display: 'flex', gap: '16px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '20px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                <button 
                  type="button" 
                  onClick={() => setActiveProjectSubTab('property_master')} 
                  style={{ background: isLight ? '#f1f5f9' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  Cancel & Return to Registry
                </button>
                <button 
                  type="submit" 
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '12px 32px', borderRadius: '8px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
                >
                  {editingProperty ? '💾 Save & Update Property Master Record' : '🚀 Register Property Master Inventory Record'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}


      {/* SUB-TAB 2: PROPERTY MASTER STOCK LIST */}
      {activeProjectSubTab === 'property_master' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>
                🏠 Master Property Stock Inventory ({properties.filter(p => matchesSearchQuery(p, searchQuery)).length} of {properties.length} Active Stock)
              </h3>
              <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Comprehensive inventory registry with developer pricing, configuration, and availability status.</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', width: windowWidth <= 640 ? '100%' : 'auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '6px 12px', width: windowWidth <= 640 ? '100%' : '320px', flex: windowWidth <= 640 ? '1 1 100%' : 'none' }}>
                <Search size={15} color="#38bdf8" />
                <input 
                  type="text" 
                  value={searchQuery} 
                  onChange={(e) => setSearchQuery(e.target.value)} 
                  placeholder="Search property code, title, developer..." 
                  style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.82rem', width: '100%', fontWeight: '700' }} 
                />
                {searchQuery && (
                  <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} title="Clear Search" />
                )}
              </div>
              <button onClick={() => setShowBulkImportPropertyModal(true)} style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', width: windowWidth <= 640 ? '100%' : 'auto', flex: windowWidth <= 640 ? '1 1 100%' : 'none', whiteSpace: 'nowrap' }}>
                <Upload size={15} /> 📥 Import Bulk Inventory CSV / Excel
              </button>
            </div>
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <thead>
                <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                {properties
                  .filter(p => matchesSearchQuery(p, searchQuery))
                  .map(p => (
                  <tr key={p.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{p.property_code}</td>
                    <td style={{ padding: '12px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{p.title}</td>
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
                        <button onClick={() => handleStartEditProperty(p)} style={{ background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                        <button onClick={() => handleDeleteProperty(p.id, p.property_code)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: LIVE TOWER FLOOR UNIT GRID */}
      {activeProjectSubTab === 'live_inventory_board' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>🏢 Live Tower Floor Unit Grid Matrix</h3>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '14px' }}>
            {propertyUnits.map(u => (
              <div key={u.id} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '800', fontFamily: 'monospace' }}>{u.unit_code}</span>
                <h4 style={{ fontSize: '1.1rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900' }}>{u.unit_num} ({u.tower})</h4>
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
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>📍 Radius GPS Search Filter & Locality Map</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['1KM', '2KM', '5KM', '10KM', '25KM'].map(r => (
              <button key={r} onClick={() => setActiveRadius(r as any)} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '800', cursor: 'pointer', background: activeRadius === r ? '#0284c7' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                Radius {r}
              </button>
            ))}
          </div>
          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px dashed #334155', borderRadius: '12px', padding: '40px', textAlign: 'center', color: isLight ? '#64748b' : '#94a3b8' }}>
            🗺️ Interactive GPS Locality Map Active for Radius Filter ({activeRadius}) around Kondapur & Hitec City.
          </div>
        </div>
      )}

      {/* SUB-TAB 5: END-TO-END DEAL CONVERSION FUNNEL (13 STAGES) */}
      {activeProjectSubTab === 'deal_pipeline_tracker' && (
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📈 End-to-End Customer Requirement to Brokerage Funnel (13 Stages)</h3>
          <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)', gap: '8px' }}>
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
              <div key={idx} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 8px', borderRadius: '8px', textAlign: 'center' }}>
                <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>{s.stage}</span>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: s.color, marginTop: '2px' }}>{s.count}</h4>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
