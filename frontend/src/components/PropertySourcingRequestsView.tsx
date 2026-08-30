import React, { useState, useEffect } from 'react';
import { 
  SearchCode, Plus, Search, Filter, ShieldAlert, CheckCircle2, Clock, 
  Building2, User, Phone, MapPin, ArrowUpRight, Sparkles, X, Check,
  Edit3, Trash2, Tag, Eye, RefreshCw, Send, AlertTriangle
} from 'lucide-react';

interface PropertySourcingRequestsViewProps {
  isLight: boolean;
  windowWidth: number;
  leadsList: any[];
  customers: any[];
  properties: any[];
  openIdDetailsModal: (id: string, type: string) => void;
  maskPhone: (phone: string) => string;
  setActiveTab: (tab: string) => void;
}

export const PropertySourcingRequestsView: React.FC<PropertySourcingRequestsViewProps> = ({
  isLight,
  windowWidth,
  leadsList = [],
  customers = [],
  properties = [],
  openIdDetailsModal,
  maskPhone,
  setActiveTab
}) => {
  // Sourcing Requests Queue with LocalStorage Persistence
  const [sourcingRequests, setSourcingRequests] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_sourcing_requests_v1');
      if (saved) return JSON.parse(saved);
    } catch (err) {
      console.error('Error loading sourcing requests', err);
    }
    // Default Initial Data
    return [
      {
        id: 'SRM-SRC-2026-000101',
        customer_name: 'Bishwajit Pandey',
        customer_number: 'SRM-CUS-2026-000188',
        mobile: '+91 98305 97778',
        preferred_locality: 'Kondapur / Gachibowli',
        property_type: 'Flat / Apartment',
        configuration: '3BHK',
        budget_min: '₹70 Lakhs',
        budget_max: '₹95 Lakhs',
        possession_status: 'Ready to Move',
        facing: 'East Facing',
        assigned_executive: 'Punita Roy (Sales Exec)',
        status: 'PENDING_SOURCING',
        priority: 'HOT',
        notes: 'Client specifically needs 3BHK East Facing near Kondapur main road under 90L. Current inventory has no direct match.',
        created_at: new Date(Date.now() - 24 * 3600000).toISOString()
      },
      {
        id: 'SRM-SRC-2026-000102',
        customer_name: 'Supriya Chattopadhyay',
        customer_number: 'SRM-CUS-2026-000189',
        mobile: '+91 98305 97778',
        preferred_locality: 'Madhyamgram Hub',
        property_type: 'Flat / Apartment',
        configuration: '2BHK',
        budget_min: '₹50 Lakhs',
        budget_max: '₹55 Lakhs',
        possession_status: 'Ready to Move',
        facing: 'South / East Facing',
        assigned_executive: 'Punita Roy (Sales Exec)',
        status: 'BUILDER_CONTACTED',
        priority: 'HOT',
        notes: 'Contacted Star Builder representative for 2BHK flat option. Awaiting site clearance.',
        created_at: new Date(Date.now() - 12 * 3600000).toISOString()
      },
      {
        id: 'SRM-SRC-2026-000103',
        customer_name: 'Rajesh Sharma',
        customer_number: 'SRM-CUS-2026-000190',
        mobile: '+91 98490 12345',
        preferred_locality: 'HITEC City Sector',
        property_type: 'Commercial Office Space',
        configuration: '1,500 Sq.Ft.',
        budget_min: '₹1.50 Crore',
        budget_max: '₹2.00 Crore',
        possession_status: 'Immediate',
        facing: 'North Facing',
        assigned_executive: 'Priya Nair (Sales Exec)',
        status: 'INVENTORY_MATCHED',
        priority: 'WARM',
        notes: 'Matched with Cyber Towers Commercial Floor Unit 402. Cost sheet generated.',
        created_at: new Date(Date.now() - 48 * 3600000).toISOString()
      }
    ];
  });

  // Filter & Search States
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [priorityFilter, setPriorityFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<{ open: boolean; request: any } | null>(null);

  // New Request Form State
  const [newRequestForm, setNewRequestForm] = useState({
    customer_name: '',
    mobile: '',
    email: '',
    preferred_locality: 'Kondapur',
    property_type: 'Flat / Apartment',
    configuration: '3BHK',
    budget_min: '₹70 Lakhs',
    budget_max: '₹90 Lakhs',
    possession_status: 'Ready to Move',
    facing: 'East Facing',
    priority: 'HOT',
    assigned_executive: 'Punita Roy (Sales Exec)',
    notes: ''
  });

  // Update Status Form State
  const [updateForm, setUpdateForm] = useState({
    status: 'PENDING_SOURCING',
    notes: '',
    matched_property_code: ''
  });

  // Persist to LocalStorage whenever sourcingRequests change
  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_sourcing_requests_v1', JSON.stringify(sourcingRequests));
    } catch (err) {
      console.error('Error persisting sourcing requests', err);
    }
  }, [sourcingRequests]);

  // Handle Create Sourcing Request
  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRequestForm.customer_name || !newRequestForm.mobile) {
      alert('⚠️ Please enter Customer Name and Primary Mobile Phone!');
      return;
    }

    const nextId = `SRM-SRC-2026-000${sourcingRequests.length + 104}`;
    const nextCustCode = `SRM-CUS-2026-000${customers.length + 192}`;

    const newReqObj = {
      id: nextId,
      customer_name: newRequestForm.customer_name,
      customer_number: nextCustCode,
      mobile: newRequestForm.mobile,
      preferred_locality: newRequestForm.preferred_locality,
      property_type: newRequestForm.property_type,
      configuration: newRequestForm.configuration,
      budget_min: newRequestForm.budget_min,
      budget_max: newRequestForm.budget_max,
      possession_status: newRequestForm.possession_status,
      facing: newRequestForm.facing,
      assigned_executive: newRequestForm.assigned_executive,
      status: 'PENDING_SOURCING',
      priority: newRequestForm.priority,
      notes: newRequestForm.notes || 'New Property Sourcing Request registered.',
      created_at: new Date().toISOString()
    };

    const nextList = [newReqObj, ...sourcingRequests];
    setSourcingRequests(nextList);
    setShowCreateModal(false);
    
    // Reset Form
    setNewRequestForm({
      customer_name: '',
      mobile: '',
      email: '',
      preferred_locality: 'Kondapur',
      property_type: 'Flat / Apartment',
      configuration: '3BHK',
      budget_min: '₹70 Lakhs',
      budget_max: '₹90 Lakhs',
      possession_status: 'Ready to Move',
      facing: 'East Facing',
      priority: 'HOT',
      assigned_executive: 'Punita Roy (Sales Exec)',
      notes: ''
    });

    alert(`🎉 PROPERTY SOURCING REQUEST CREATED!\n\n• Sourcing ID: ${nextId}\n• Customer: ${newReqObj.customer_name}\n• Location: ${newReqObj.preferred_locality}\n• Assigned Desk: ${newReqObj.assigned_executive}\n\nPersisted into Sourcing Queue!`);
  };

  // Handle Update Status
  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showUpdateModal || !showUpdateModal.request) return;

    const reqId = showUpdateModal.request.id;
    const nextList = sourcingRequests.map(r => {
      if (r.id === reqId) {
        return {
          ...r,
          status: updateForm.status,
          notes: updateForm.notes ? `${r.notes}\n[${new Date().toLocaleDateString('en-GB')}]: ${updateForm.notes}` : r.notes,
          matched_property_code: updateForm.matched_property_code || r.matched_property_code,
          updated_at: new Date().toISOString()
        };
      }
      return r;
    });

    setSourcingRequests(nextList);
    setShowUpdateModal(null);
    alert(`✅ SOURCING REQUEST ${reqId} UPDATED!\n\nStatus set to: ${updateForm.status}`);
  };

  // Filter Sourcing Requests
  const filteredRequests = sourcingRequests.filter(req => {
    if (statusFilter !== 'ALL' && req.status !== statusFilter) return false;
    if (priorityFilter !== 'ALL' && req.priority !== priorityFilter) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = (req.customer_name || '').toLowerCase().includes(q);
      const matchId = (req.id || '').toLowerCase().includes(q);
      const matchCustCode = (req.customer_number || '').toLowerCase().includes(q);
      const matchMobile = (req.mobile || '').includes(q);
      const matchLoc = (req.preferred_locality || '').toLowerCase().includes(q);
      return matchName || matchId || matchCustCode || matchMobile || matchLoc;
    }
    return true;
  });

  // Summary Metrics
  const totalCount = sourcingRequests.length;
  const pendingCount = sourcingRequests.filter(r => r.status === 'PENDING_SOURCING').length;
  const contactedCount = sourcingRequests.filter(r => r.status === 'BUILDER_CONTACTED').length;
  const matchedCount = sourcingRequests.filter(r => r.status === 'INVENTORY_MATCHED' || r.status === 'CLOSED').length;
  const urgentCount = sourcingRequests.filter(r => r.priority === 'HOT').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* TOP TITLE & ACTION HEADER */}
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.04)' : 'none' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '8px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SearchCode size={24} color="#38bdf8" />
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>PROPERTY SOURCING REQUESTS DESK</h2>
          </div>
          <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
            Custom Property Sourcing Queue • Off-Market & Builder Inventory Procurement • Client Specification Matching
          </p>
        </div>

        <button 
          onClick={() => setShowCreateModal(true)} 
          style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)' }}
        >
          <Plus size={16} /> + CREATE NEW SOURCING REQUEST
        </button>
      </div>

      {/* METRICS CARDS ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: windowWidth < 768 ? '1fr 1fr' : '1fr 1fr 1fr 1fr', gap: '14px' }}>
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(56, 189, 248, 0.15)', padding: '10px', borderRadius: '10px', color: '#38bdf8' }}>
            <SearchCode size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>TOTAL SOURCING QUEUE</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>{totalCount} Requests</h3>
          </div>
        </div>

        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(239, 68, 68, 0.15)', padding: '10px', borderRadius: '10px', color: '#ef4444' }}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>HOT / URGENT SOURCING</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ef4444', margin: '2px 0 0 0' }}>{urgentCount} Urgent</h3>
          </div>
        </div>

        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(234, 179, 8, 0.15)', padding: '10px', borderRadius: '10px', color: '#fbbf24' }}>
            <Clock size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>BUILDER CONTACTED</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fbbf24', margin: '2px 0 0 0' }}>{contactedCount} In Progress</h3>
          </div>
        </div>

        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'rgba(34, 197, 94, 0.15)', padding: '10px', borderRadius: '10px', color: '#4ade80' }}>
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>MATCHED / FULFILLED</span>
            <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#4ade80', margin: '2px 0 0 0' }}>{matchedCount} Matched</h3>
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL BAR */}
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        
        {/* STATUS TABS */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'ALL', label: `All Requests (${sourcingRequests.length})` },
            { id: 'PENDING_SOURCING', label: `⚡ Pending (${pendingCount})` },
            { id: 'BUILDER_CONTACTED', label: `🟡 Builder Contacted (${contactedCount})` },
            { id: 'INVENTORY_MATCHED', label: `🟢 Matched (${matchedCount})` }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                background: statusFilter === tab.id ? '#0284c7' : (isLight ? '#f1f5f9' : '#0f172a'),
                color: statusFilter === tab.id ? '#ffffff' : (isLight ? '#64748b' : '#94a3b8'),
                border: statusFilter === tab.id ? '1px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155'),
                padding: '6px 12px',
                borderRadius: '6px',
                fontWeight: '800',
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SEARCH INPUT & PRIORITY SELECT */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <select 
            value={priorityFilter} 
            onChange={(e) => setPriorityFilter(e.target.value)}
            style={{ background: isLight ? '#ffffff' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700' }}
          >
            <option value="ALL">All Priorities</option>
            <option value="HOT">🔥 HOT / Urgent Only</option>
            <option value="WARM">⚡ WARM Priority</option>
            <option value="COLD">❄️ COLD Priority</option>
          </select>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search Customer, Sourcing ID, Locality..." 
              style={{ width: '100%', background: isLight ? '#ffffff' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '6px 10px 6px 30px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '700' }} 
            />
          </div>
        </div>

      </div>

      {/* SOURCING REQUESTS DATA TABLE */}
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
        <div style={{ padding: '14px 16px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <strong style={{ fontSize: '0.9rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900' }}>
            📋 ACTIVE PROPERTY SOURCING VAULT ({filteredRequests.length} Records)
          </strong>
          <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>
            Showing Filtered Sourcing Queue • Auto-Refreshed
          </span>
        </div>

        <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                <th style={{ padding: '12px' }}>Sourcing ID & Date</th>
                <th style={{ padding: '12px' }}>Customer Name & Contact</th>
                <th style={{ padding: '12px' }}>Customer ID</th>
                <th style={{ padding: '12px' }}>Target Spec & Locality</th>
                <th style={{ padding: '12px' }}>Target Budget</th>
                <th style={{ padding: '12px' }}>Sourcing Status</th>
                <th style={{ padding: '12px' }}>Assigned Desk</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '30px', textAlign: 'center', color: isLight ? '#64748b' : '#94a3b8' }}>
                    🔍 No property sourcing requests found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredRequests.map(req => {
                  const isPending = req.status === 'PENDING_SOURCING';
                  const isContacted = req.status === 'BUILDER_CONTACTED';
                  const isMatched = req.status === 'INVENTORY_MATCHED' || req.status === 'CLOSED';

                  return (
                    <tr key={req.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <td style={{ padding: '12px' }}>
                        <span 
                          onClick={() => openIdDetailsModal(req.id, 'SOURCING_ID')}
                          style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.84rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer', display: 'inline-block' }}
                          title="Click to view full sourcing request details"
                        >
                          🎯 {req.id}
                        </span>
                        <br />
                        <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px', display: 'block' }}>
                          📅 {new Date(req.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </td>

                      <td style={{ padding: '12px' }}>
                        <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{req.customer_name}</strong>
                        <br />
                        <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '800', fontFamily: 'monospace' }}>
                          📞 {maskPhone(req.mobile)}
                        </span>
                      </td>

                      <td style={{ padding: '12px' }}>
                        <span 
                          onClick={() => openIdDetailsModal(req.customer_number, 'CUSTOMER_ID')}
                          style={{ fontSize: '0.75rem', color: '#4ade80', fontFamily: 'monospace', textDecoration: 'underline', cursor: 'pointer' }}
                        >
                          👤 {req.customer_number}
                        </span>
                      </td>

                      <td style={{ padding: '12px' }}>
                        <strong style={{ color: '#fbbf24' }}>{req.configuration} {req.property_type}</strong>
                        <br />
                        <span style={{ fontSize: '0.75rem', color: isLight ? '#0f172a' : '#ffffff' }}>📍 {req.preferred_locality}</span>
                        <br />
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontStyle: 'italic' }}>Facing: {req.facing || 'East'}</span>
                      </td>

                      <td style={{ padding: '12px', color: '#4ade80', fontWeight: '900' }}>
                        {req.budget_min && req.budget_max ? `${req.budget_min} - ${req.budget_max}` : (req.budget_max || req.budget_min || '₹70 Lakhs+')}
                      </td>

                      <td style={{ padding: '12px' }}>
                        {isPending && (
                          <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: '1px solid #ef4444', padding: '3px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.73rem', display: 'inline-block' }}>
                            ⚡ PENDING SOURCING
                          </span>
                        )}
                        {isContacted && (
                          <span style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#fbbf24', border: '1px solid #fbbf24', padding: '3px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.73rem', display: 'inline-block' }}>
                            🟡 BUILDER CONTACTED
                          </span>
                        )}
                        {isMatched && (
                          <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', border: '1px solid #22c55e', padding: '3px 8px', borderRadius: '12px', fontWeight: '900', fontSize: '0.73rem', display: 'inline-block' }}>
                            🟢 INVENTORY MATCHED
                          </span>
                        )}
                      </td>

                      <td style={{ padding: '12px' }}>
                        <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', fontSize: '0.78rem' }}>
                          {req.assigned_executive}
                        </span>
                      </td>

                      <td style={{ padding: '12px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => {
                              setUpdateForm({
                                status: req.status,
                                notes: '',
                                matched_property_code: req.matched_property_code || ''
                              });
                              setShowUpdateModal({ open: true, request: req });
                            }}
                            style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.73rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          >
                            <Edit3 size={13} /> Update
                          </button>
                          <button
                            onClick={() => {
                              setActiveTab('matching_management');
                            }}
                            style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '5px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.73rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                            title="Scan Stock Vault for matching properties"
                          >
                            <Sparkles size={13} /> Scan Stock
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE NEW SOURCING REQUEST MODAL */}
      {showCreateModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '640px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SearchCode size={20} color="#38bdf8" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>CREATE NEW PROPERTY SOURCING REQUEST</h3>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowCreateModal(false)} />
            </div>

            <form onSubmit={handleCreateRequest} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                  <input type="text" value={newRequestForm.customer_name} onChange={(e) => setNewRequestForm({ ...newRequestForm, customer_name: e.target.value })} placeholder="e.g. Bishwajit Pandey" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Mobile Phone *</label>
                  <input type="text" value={newRequestForm.mobile} onChange={(e) => setNewRequestForm({ ...newRequestForm, mobile: e.target.value })} placeholder="+91 98305 97778" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Locality *</label>
                  <input type="text" value={newRequestForm.preferred_locality} onChange={(e) => setNewRequestForm({ ...newRequestForm, preferred_locality: e.target.value })} placeholder="e.g. Kondapur" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Type</label>
                  <select value={newRequestForm.property_type} onChange={(e) => setNewRequestForm({ ...newRequestForm, property_type: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <option value="Flat / Apartment">Flat / Apartment</option>
                    <option value="Luxury Villa">Luxury Villa</option>
                    <option value="Residential Plot">Residential Plot</option>
                    <option value="Commercial Office Space">Commercial Office Space</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Configuration</label>
                  <select value={newRequestForm.configuration} onChange={(e) => setNewRequestForm({ ...newRequestForm, configuration: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <option value="2BHK">2BHK</option>
                    <option value="3BHK">3BHK</option>
                    <option value="4BHK">4BHK</option>
                    <option value="Penthouse">Penthouse</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Min Budget</label>
                  <input type="text" value={newRequestForm.budget_min} onChange={(e) => setNewRequestForm({ ...newRequestForm, budget_min: e.target.value })} placeholder="₹50 Lakhs" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Max Budget</label>
                  <input type="text" value={newRequestForm.budget_max} onChange={(e) => setNewRequestForm({ ...newRequestForm, budget_max: e.target.value })} placeholder="₹75 Lakhs" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Priority</label>
                  <select value={newRequestForm.priority} onChange={(e) => setNewRequestForm({ ...newRequestForm, priority: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <option value="HOT">🔥 HOT / Urgent</option>
                    <option value="WARM">⚡ WARM Priority</option>
                    <option value="COLD">❄️ COLD Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Specific Sourcing Notes & Requirements</label>
                <textarea rows={3} value={newRequestForm.notes} onChange={(e) => setNewRequestForm({ ...newRequestForm, notes: e.target.value })} placeholder="Enter builder details, specific floor, east facing, urgency notes..." style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowCreateModal(false)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}>
                  🚀 Create Sourcing Request
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* UPDATE STATUS MODAL */}
      {showUpdateModal && showUpdateModal.request && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(4px)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', width: '100%', maxWidth: '520px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>UPDATE SOURCING STATUS</h3>
                <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'monospace' }}>{showUpdateModal.request.id} • {showUpdateModal.request.customer_name}</span>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowUpdateModal(null)} />
            </div>

            <form onSubmit={handleUpdateStatusSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Select Sourcing Stage *</label>
                <select value={updateForm.status} onChange={(e) => setUpdateForm({ ...updateForm, status: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '800' }}>
                  <option value="PENDING_SOURCING">⚡ PENDING SOURCING</option>
                  <option value="BUILDER_CONTACTED">🟡 BUILDER CONTACTED (Procurement Active)</option>
                  <option value="INVENTORY_MATCHED">🟢 INVENTORY MATCHED & READY</option>
                  <option value="CLOSED">🔒 CLOSED / FULFILLED</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Matched Property Code (Optional)</label>
                <input type="text" value={updateForm.matched_property_code} onChange={(e) => setUpdateForm({ ...updateForm, matched_property_code: e.target.value })} placeholder="e.g. PROP-2026-00042" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Add Sourcing Desk Notes & Updates</label>
                <textarea rows={3} value={updateForm.notes} onChange={(e) => setUpdateForm({ ...updateForm, notes: e.target.value })} placeholder="Enter builder response, stock availability, pricing updates..." style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowUpdateModal(null)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '800', fontSize: '0.82rem', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}>
                  Save Sourcing Update
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
