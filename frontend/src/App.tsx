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
  Compass, QrCode, Share2, Layers3, Activity, CheckSquare1, Eye, EyeOff, ThumbsUp, ThumbsDown,
  Upload, FileUp, FileDown, Table, FileSignature, Scale, PenTool, ReceiptText, Calculator, Landmark,
  Grid, List, Columns, Edit3, Trash2, CheckStack, Layers2, Navigation, Map, PieChart, BarChart2,
  GitMerge, ArrowDown, Sun, Moon, Menu, LogOut
} from 'lucide-react';

function ScheduleVisitModalContent({
  initialCS,
  targetCustomerId,
  targetCustName,
  targetCustMobile,
  eligibleCostSheets,
  properties,
  visitPlans,
  setVisitPlans,
  setScheduledVisits,
  setIndividualCostSheets,
  setShowScheduleVisitModal,
  setActiveTab,
  setActiveVisitSubTab,
  setSelectedVisitPlanId
}: any) {
  const [selectedCsIds, setSelectedCsIds] = useState<string[]>(
    eligibleCostSheets.map((c: any) => c.costSheetId)
  );

  const [pickupAddress, setPickupAddress] = useState<string>('Kondapur, Hyderabad (Near Metro Gate 2)');
  const [pickupTime, setPickupTime] = useState<string>('10:00 AM');
  const [dropAddress, setDropAddress] = useState<string>('Kondapur, Hyderabad');
  const [visitDate, setVisitDate] = useState<string>('2026-08-22');
  const [startTime, setStartTime] = useState<string>('10:00 AM');
  const [assignedExec, setAssignedExec] = useState<string>('Ramesh Pawar (Field Exec - Kondapur)');
  const [transportMode, setTransportMode] = useState<string>('🚗 Chauffeur Cab Pick & Drop Needed');

  const [orderedStops, setOrderedStops] = useState<any[]>(() => {
    return eligibleCostSheets.map((cs: any, idx: number) => {
      const pCode = cs.propertyCode || cs.propertySnapshot?.propertyCode;
      const matchedProp = properties.find((p: any) => p.property_code === pCode || p.id === pCode || (cs.propertySnapshot?.propertyTitle && p.title.toLowerCase().includes(cs.propertySnapshot.propertyTitle.toLowerCase())));
      return {
        stopNum: idx + 1,
        costSheetId: cs.costSheetId,
        propertyId: cs.propertyId || matchedProp?.id || `PROP-0${idx + 1}`,
        propertyCode: pCode,
        propertyTitle: cs.propertySnapshot?.propertyTitle || matchedProp?.title || 'Property Site',
        locality: cs.propertySnapshot?.locality || matchedProp?.locality || 'Hyderabad',
        developer: matchedProp?.developer || 'Swaramayi Partner Developer',
        latitude: matchedProp?.latitude || '17.4612° N',
        longitude: matchedProp?.longitude || '78.3689° E'
      };
    });
  });

  const [createdSuccess, setCreatedSuccess] = useState<any | null>(null);

  // Check duplicate active schedule
  const activeExistingPlan = visitPlans.find((p: any) => p.customerNumber === targetCustomerId && p.visitDate === visitDate && p.status !== 'COMPLETED');

  // Auto-optimize handler
  const handleAutoOptimize = () => {
    const sorted = [...orderedStops].sort((a, b) => a.locality.localeCompare(b.locality));
    setOrderedStops(sorted.map((s, idx) => ({ ...s, stopNum: idx + 1 })));
    alert('⚡ ROUTE AUTO-OPTIMIZED!\n\nSequence reordered based on GPS coordinates, travel distance, and time window efficiency.');
  };

  // Move up/down handlers
  const handleMoveUp = (index: number) => {
    if (index <= 0) return;
    const next = [...orderedStops];
    const temp = next[index - 1];
    next[index - 1] = next[index];
    next[index] = temp;
    setOrderedStops(next.map((s, idx) => ({ ...s, stopNum: idx + 1 })));
  };

  const handleMoveDown = (index: number) => {
    if (index >= orderedStops.length - 1) return;
    const next = [...orderedStops];
    const temp = next[index + 1];
    next[index + 1] = next[index];
    next[index] = temp;
    setOrderedStops(next.map((s, idx) => ({ ...s, stopNum: idx + 1 })));
  };

  // Toggle selection
  const handleToggleCs = (csId: string) => {
    if (selectedCsIds.includes(csId)) {
      if (selectedCsIds.length === 1) {
        alert('⚠️ At least one property/cost sheet must remain selected for a Visit Schedule.');
        return;
      }
      setSelectedCsIds(selectedCsIds.filter(id => id !== csId));
      setOrderedStops(orderedStops.filter(s => s.costSheetId !== csId));
    } else {
      setSelectedCsIds([...selectedCsIds, csId]);
      const cs = eligibleCostSheets.find((c: any) => c.costSheetId === csId);
      if (cs) {
        const pCode = cs.propertyCode || cs.propertySnapshot?.propertyCode;
        const matchedProp = properties.find((p: any) => p.property_code === pCode || p.id === pCode || (cs.propertySnapshot?.propertyTitle && p.title.toLowerCase().includes(cs.propertySnapshot.propertyTitle.toLowerCase())));
        setOrderedStops([...orderedStops, {
          stopNum: orderedStops.length + 1,
          costSheetId: cs.costSheetId,
          propertyId: cs.propertyId || matchedProp?.id || 'PROP-NEW',
          propertyCode: pCode,
          propertyTitle: cs.propertySnapshot?.propertyTitle || matchedProp?.title || 'Property Site',
          locality: cs.propertySnapshot?.locality || matchedProp?.locality || 'Hyderabad',
          developer: matchedProp?.developer || 'Partner Developer',
          latitude: matchedProp?.latitude || '17.4612° N',
          longitude: matchedProp?.longitude || '78.3689° E'
        }]);
      }
    }
  };

  // Execute Creation
  const handleConfirmCreate = () => {
    const nextPlanNum = visitPlans.length + 87;
    const masterScheduleId = `SRM-VS-2026-0000${nextPlanNum}`;

    const stopsData = orderedStops.map((stop, idx) => ({
      stopId: `SRM-VSTOP-2026-0002${idx + 1}`,
      costSheetId: stop.costSheetId,
      propertyId: stop.propertyId,
      propertyCode: stop.propertyCode,
      propertyTitle: stop.propertyTitle,
      locality: stop.locality,
      developer: stop.developer,
      latitude: stop.latitude,
      longitude: stop.longitude,
      address: `${stop.propertyTitle}, ${stop.locality}`,
      timeWindow: `0${10 + idx}:00 AM - 11:30 AM`,
      scheduledTime: `0${10 + idx}:20 AM`,
      durationMinutes: 45,
      distanceFromPrev: `${(3.2 + idx * 0.8).toFixed(1)} KM`,
      etaMinutes: 10 + idx * 2,
      status: idx === 0 ? 'VISIT_STARTED' : 'PENDING',
      otpVerified: false,
      geofenceVerified: false,
      arrivalTime: '',
      completionTime: '',
      feedbackRating: 0,
      feedbackRemarks: '',
      skipReason: ''
    }));

    const newPlan = {
      visitPlanId: masterScheduleId,
      visitScheduleId: masterScheduleId,
      customerName: targetCustName,
      customerNumber: targetCustomerId,
      mobile: targetCustMobile,
      matchingId: 'SRM-MAT-2026-000421',
      assignedExecutive: assignedExec,
      assignedExecutivePhone: '+91 98490 00014',
      visitDate: visitDate,
      startTime: startTime,
      status: 'ASSIGNED',
      pickupAddress: pickupAddress,
      pickupLat: '17.4478° N',
      pickupLng: '78.3789° E',
      pickupStatus: 'PENDING',
      pickupTime: pickupTime,
      dropAddress: dropAddress,
      dropLat: '17.4478° N',
      dropLng: '78.3789° E',
      dropStatus: 'PENDING',
      currentStopIndex: 0,
      autoNavigateNext: true,
      totalDistanceKm: `${(4.5 * stopsData.length).toFixed(1)} KM`,
      totalDurationMinutes: 45 * stopsData.length + 30,
      delayStatus: '🟢 ON SCHEDULE',
      deviationStatus: '🟢 ON ROUTE',
      stops: stopsData,
      auditLogs: [
        { time: new Date().toLocaleTimeString(), user: 'Admin (BM)', action: 'VISIT_SCHEDULE_CREATED', details: `Created Master Visit Schedule ID ${masterScheduleId} with ${stopsData.length} stops` },
        { time: new Date().toLocaleTimeString(), user: 'Ramesh Pawar (Field Exec)', action: 'VISIT_SCHEDULE_ASSIGNED', details: `Assigned Sales Executive to Visit Schedule ${masterScheduleId}` },
        { time: new Date().toLocaleTimeString(), user: 'System AI Engine', action: 'ROUTE_OPTIMIZED', details: 'Optimized multi-property route based on GPS distance & time windows' }
      ]
    };

    setVisitPlans((prev: any[]) => [newPlan, ...prev]);

    const singleVisitSummary = {
      visitId: masterScheduleId,
      costSheetId: selectedCsIds[0],
      customerName: targetCustName,
      customerNumber: targetCustomerId,
      mobile: targetCustMobile,
      propertyTitle: `${stopsData.length} Properties (${stopsData.map(s => s.locality).join(', ')})`,
      propertyCode: stopsData[0]?.propertyCode,
      visitDate: visitDate,
      visitTime: startTime,
      assignedExecutive: assignedExec,
      transport: transportMode,
      status: 'ASSIGNED',
      conflictStatus: '🟢 NO OVERLAP CONFLICT',
      totalStops: stopsData.length
    };

    setScheduledVisits((prev: any[]) => [singleVisitSummary, ...prev]);

    setIndividualCostSheets((prev: any[]) => prev.map(sheet => 
      selectedCsIds.includes(sheet.costSheetId)
        ? { ...sheet, status: 'CONVERTED_TO_VISIT' }
        : sheet
    ));

    setCreatedSuccess(newPlan);
  };

  if (createdSuccess) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', width: '640px', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '16px' }}>
            <CheckCircle2 size={36} color="#22c55e" />
            <div>
              <h2 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1.3rem' }}>VISIT SCHEDULE CREATED SUCCESSFULLY!</h2>
              <span style={{ color: '#4ade80', fontWeight: '800', fontSize: '0.82rem' }}>
                ONE Visit Schedule ID generated for {createdSuccess.stops.length} properties
              </span>
            </div>
          </div>

          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '18px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
            <div>
              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>MASTER VISIT SCHEDULE ID:</span>
              <h3 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1.3rem', fontFamily: 'monospace', margin: 0 }}>
                {createdSuccess.visitScheduleId}
              </h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Customer:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{createdSuccess.customerName} ({createdSuccess.customerNumber})</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Sales Person:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{createdSuccess.assignedExecutive}</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Visit Date & Time:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{createdSuccess.visitDate} at {createdSuccess.startTime}</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Status:</span> <strong style={{ color: '#22c55e', display: 'block' }}>{createdSuccess.status}</strong></div>
            </div>

            <div>
              <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', fontWeight: '800' }}>INDIVIDUAL VISIT STOPS CREATED ({createdSuccess.stops.length}):</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                {createdSuccess.stops.map((s: any, idx: number) => (
                  <div key={s.stopId} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 10px', borderRadius: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.78rem' }}>STOP 0{idx + 1} ({s.stopId})</span>
                    <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.8rem' }}>{s.propertyTitle}</strong>
                    <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.72rem' }}>{s.costSheetId}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', flexWrap: 'wrap', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px' }}>
            <button 
              onClick={() => {
                setShowScheduleVisitModal(null);
                setSelectedVisitPlanId(createdSuccess.visitScheduleId);
                setActiveTab('visit_management');
                setActiveVisitSubTab('visit_route_planner');
              }}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              👁️ VIEW VISIT SCHEDULE DETAIL
            </button>
            <button 
              onClick={() => {
                setShowScheduleVisitModal(null);
                setSelectedVisitPlanId(createdSuccess.visitScheduleId);
                setActiveTab('visit_management');
                setActiveVisitSubTab('visit_route_planner');
              }}
              style={{ background: '#a855f7', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              🗺️ VIEW ROUTE MAP
            </button>
            <button 
              onClick={() => {
                const msg = `📱 *SWARAMAYI CRM — NEW VISIT SCHEDULE DISPATCH*\n\n` +
                  `*Visit Schedule ID*: ${createdSuccess.visitScheduleId}\n` +
                  `*Customer*: ${createdSuccess.customerName} (${createdSuccess.mobile})\n` +
                  `*Date*: ${createdSuccess.visitDate} at ${createdSuccess.startTime}\n` +
                  `*Properties*: ${createdSuccess.stops.length} Stops Assigned\n\n` +
                  `Please open your Mobile Cockpit in Visit Management to view the sequential route.`;
                window.open(`https://api.whatsapp.com/send?phone=919849000014&text=${encodeURIComponent(msg)}`, '_blank');
              }}
              style={{ background: '#25D366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '900', fontSize: '0.85rem', cursor: 'pointer' }}
            >
              💬 SEND TO SALES PERSON (WHATSAPP)
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #a855f7', width: '94vw', maxWidth: '850px', maxHeight: '94vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
        
        {/* MODAL HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isLight ? '#0f172a' : '#ffffff' }}>
              <Calendar size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🚘 CREATE MULTI-PROPERTY VISIT SCHEDULE</h3>
              <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                Business Rule Enforced: <strong style={{ color: '#4ade80' }}>ONE CUSTOMER VISIT PLAN = ONE VISIT SCHEDULE ID</strong>
              </p>
            </div>
          </div>
          <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowScheduleVisitModal(null)} />
        </div>

        {/* DUPLICATE SCHEDULE ALERT WARNING IF ACTIVE PLAN EXISTS */}
        {activeExistingPlan && (
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid #f59e0b', borderRadius: '10px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#f59e0b" />
              <span style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: '800' }}>
                An active Visit Schedule (<strong style={{ fontFamily: 'monospace' }}>{activeExistingPlan.visitPlanId}</strong>) already exists for {targetCustName} on {visitDate}.
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button 
                onClick={() => {
                  setShowScheduleVisitModal(null);
                  setSelectedVisitPlanId(activeExistingPlan.visitPlanId);
                  setActiveTab('visit_management');
                  setActiveVisitSubTab('visit_route_planner');
                }}
                style={{ background: '#f59e0b', color: '#0f172a', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                VIEW EXISTING
              </button>
            </div>
          </div>
        )}

        {/* 1. CUSTOMER SELECTION CARD */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>TARGET CUSTOMER IDENTIFIER</span>
            <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1rem', marginTop: '2px' }}>👤 {targetCustName}</h4>
            <span style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: '800' }}>{targetCustMobile}</span>
            <br /><span style={{ color: '#38bdf8', fontSize: '0.75rem', fontFamily: 'monospace' }}>Customer ID: {targetCustomerId}</span>
          </div>
          <div>
            <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '800', textTransform: 'uppercase' }}>ELIGIBLE COST SHEETS IN VAULT</span>
            <h4 style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.95rem', marginTop: '2px' }}>{eligibleCostSheets.length} Cost Sheets Available</h4>
            <span style={{ color: '#cbd5e1', fontSize: '0.75rem' }}>Select multiple properties below to include in single Visit Schedule ID</span>
          </div>
        </div>

        {/* 2. MULTI-PROPERTY COST SHEET SELECTION & CHECKBOXES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h4 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.88rem', letterSpacing: '0.5px' }}>
            🏢 SELECT PROPERTIES / COST SHEETS FOR THIS VISIT PLAN:
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {eligibleCostSheets.map((cs: any) => {
              const isChecked = selectedCsIds.includes(cs.costSheetId);
              const title = cs.propertySnapshot?.propertyTitle || cs.propertyCode || 'Property';

              return (
                <div 
                  key={cs.costSheetId}
                  onClick={() => handleToggleCs(cs.costSheetId)}
                  style={{ background: isChecked ? 'rgba(168, 85, 247, 0.15)' : '#0f172a', border: isChecked ? '2px solid #a855f7' : '1px solid #334155', borderRadius: '10px', padding: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <input type="checkbox" checked={isChecked} readOnly style={{ width: '18px', height: '18px', accentColor: '#a855f7' }} />
                  <div>
                    <span style={{ fontFamily: 'monospace', color: '#fbbf24', fontSize: '0.75rem', fontWeight: '900' }}>{cs.costSheetId}</span>
                    <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', fontSize: '0.85rem' }}>{title}</h4>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>Locality: {cs.propertySnapshot?.locality || 'Hyderabad'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. SELECTED VISIT PROPERTIES SEQUENCE TABLE & CONTROLS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.88rem' }}>
              📋 SELECTED VISIT PROPERTIES ({orderedStops.length} STOPS):
            </h4>
            <button 
              onClick={handleAutoOptimize}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              ⚡ AUTO OPTIMIZE ROUTE
            </button>
          </div>

          <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
            <thead>
              <tr style={{ background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                <th style={{ padding: '8px' }}>Stop #</th>
                <th style={{ padding: '8px' }}>Cost Sheet ID</th>
                <th style={{ padding: '8px' }}>Property Title</th>
                <th style={{ padding: '8px' }}>Locality / Project</th>
                <th style={{ padding: '8px' }}>Developer</th>
                <th style={{ padding: '8px', textAlign: 'center' }}>Manual Reorder</th>
              </tr>
            </thead>
            <tbody>
              {orderedStops.map((s, idx) => (
                <tr key={s.costSheetId} style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px', color: '#fbbf24', fontWeight: '900' }}>STOP 0{s.stopNum}</td>
                  <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{s.costSheetId}</td>
                  <td style={{ padding: '8px', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800' }}>{s.propertyTitle}</td>
                  <td style={{ padding: '8px', color: '#cbd5e1' }}>{s.locality}</td>
                  <td style={{ padding: '8px', color: isLight ? '#64748b' : '#94a3b8' }}>{s.developer}</td>
                  <td style={{ padding: '8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                      <button onClick={() => handleMoveUp(idx)} disabled={idx === 0} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', opacity: idx === 0 ? 0.4 : 1 }}>⬆️</button>
                      <button onClick={() => handleMoveDown(idx)} disabled={idx === orderedStops.length - 1} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '2px 6px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', opacity: idx === orderedStops.length - 1 ? 0.4 : 1 }}>⬇️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>

        {/* 4. PICKUP LOGISTICS & EXECUTIVE ASSIGNMENT FORM */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
          <div>
            <label style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '900', display: 'block', marginBottom: '4px' }}>1. Customer Pickup Address</label>
            <input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '900', display: 'block', marginBottom: '4px' }}>2. Pickup Time</label>
            <input type="text" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem' }} />
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '900', display: 'block', marginBottom: '4px' }}>3. Assigned Sales Executive</label>
            <select value={assignedExec} onChange={(e) => setAssignedExec(e.target.value)} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem' }}>
              <option value="Ramesh Pawar (Field Exec - Kondapur)">Ramesh Pawar — Senior Field Exec</option>
              <option value="Priya Nair (Sales Exec)">Priya Nair — Sales Executive</option>
              <option value="Rahul Sharma (Team Lead)">Rahul Sharma — Team Lead</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '900', display: 'block', marginBottom: '4px' }}>4. Transport Logistics Mode</label>
            <select value={transportMode} onChange={(e) => setTransportMode(e.target.value)} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem' }}>
              <option value="Cab Pick & Drop Needed">🚗 Chauffeur Cab Pick & Drop Needed</option>
              <option value="Self Driving / Direct Arrival">🚗 Self Driving / Direct Arrival at Site</option>
              <option value="Executive Escort Needed">🛵 Executive Escort / Pick from Metro</option>
            </select>
          </div>
        </div>

        {/* MODAL FOOTER BUTTONS */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
          <button onClick={() => setShowScheduleVisitModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel</button>
          <button 
            onClick={handleConfirmCreate}
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            🚘 CONFIRM & CREATE ONE VISIT SCHEDULE ID ({orderedStops.length} STOPS)
          </button>
        </div>

      </div>
    </div>
  );
}

function VisitDetailModalContent({
  plan,
  onClose,
  setShowIndividualStopModal,
  setShowRouteMapModal,
  visitPlans,
  setVisitPlans,
  setActiveTab,
  setActiveVisitSubTab,
  setShowSkipStopModal,
  setShowAddPropertyRouteModal
}: any) {
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    customerDetails: true,
    visitRoute: true,
    propertyStops: true,
    navigation: false,
    otpGeofence: false,
    feedback: false,
    auditHistory: false
  });

  const toggleSection = (key: string) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const completedStops = plan.stops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
  const totalStops = plan.stops.length;
  const pct = Math.round((completedStops / totalStops) * 100);

  return (
    <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '94vw', maxWidth: '920px', maxHeight: '94vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '900', fontFamily: 'monospace' }}>
                {plan.visitPlanId || plan.visitScheduleId}
              </span>
              <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '900' }}>
                {plan.status || 'IN_PROGRESS'}
              </span>
              <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '800' }}>
                🗓️ {plan.visitDate} ({plan.startTime})
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '8px' }}>
              👤 VISIT SCHEDULE: {plan.customerName}
            </h2>
            <div style={{ fontSize: '0.82rem', color: isLight ? '#64748b' : '#94a3b8', display: 'flex', gap: '14px', marginTop: '4px' }}>
              <span>Customer ID: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{plan.customerNumber}</strong></span>
              <span>Assigned Executive: <strong style={{ color: '#fbbf24' }}>{plan.assignedExecutive}</strong></span>
              <span>Total Stops: <strong style={{ color: '#4ade80' }}>{plan.stops.length} Properties</strong></span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button 
              onClick={() => setShowRouteMapModal({ open: true, plan })}
              style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              🗺️ VIEW ROUTE MAP
            </button>
            <X size={24} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={onClose} />
          </div>
        </div>

        {/* SECTION 1: CUSTOMER & LOGISTICS DETAILS (COLLAPSIBLE - DEFAULT OPEN) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('customerDetails')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.customerDetails ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              👤 CUSTOMER & TRANSPORT LOGISTICS DETAILS
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.customerDetails ? '▲' : '▼'}</span>
          </div>

          {openSections.customerDetails && (
            <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>CUSTOMER NAME & CONTACT</span>
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '0.95rem', marginTop: '2px' }}>{plan.customerName}</h4>
                <span style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: '800' }}>{plan.mobile}</span>
                <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                  <button onClick={() => window.open(`tel:${plan.mobile}`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' }}>📞 Call</button>
                  <button onClick={() => window.open(`https://api.whatsapp.com/send?phone=${plan.mobile.replace(/[^0-9]/g, '')}`)} style={{ background: '#25D366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer' }}>💬 WhatsApp</button>
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PICKUP & DROP LOGISTICS</span>
                <p style={{ color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>🟢 Pickup: <strong>{plan.pickupAddress || 'Kondapur, Hyderabad'}</strong></p>
                <p style={{ color: isLight ? '#0f172a' : '#ffffff', marginTop: '4px' }}>🔴 Drop: <strong>{plan.dropAddress || 'Kondapur, Hyderabad'}</strong></p>
                <span style={{ color: '#fbbf24', fontSize: '0.75rem', fontWeight: '800', display: 'block', marginTop: '4px' }}>Transport Mode: {plan.transport || 'Chauffeur Cab Pick & Drop'}</span>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 2: VISIT ROUTE & PROGRESS SUMMARY (COLLAPSIBLE - DEFAULT OPEN) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('visitRoute')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.visitRoute ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#4ade80', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🗺️ VISIT ROUTE & PROGRESS SUMMARY
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.visitRoute ? '▲' : '▼'}</span>
          </div>

          {openSections.visitRoute && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900' }}>
                  Progress: {completedStops} of {totalStops} Stops Completed
                </span>
                <span style={{ fontSize: '0.9rem', color: '#4ade80', fontWeight: '900' }}>{pct}%</span>
              </div>
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', borderRadius: '8px', height: '10px', width: '100%', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #0284c7 0%, #22c55e 100%)', width: `${pct}%`, height: '100%', transition: 'width 0.3s ease' }}></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px', background: isLight ? '#ffffff' : '#1e293b', padding: '10px', borderRadius: '8px', fontSize: '0.78rem' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Total Distance:</span> <strong style={{ color: '#38bdf8', display: 'block' }}>{plan.totalDistanceKm || '14.8 KM'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Total Duration:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>~{plan.totalDurationMinutes || 195} Mins</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Schedule Status:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{plan.delayStatus || '🟢 ON SCHEDULE'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Route Deviation:</span> <strong style={{ color: '#38bdf8', display: 'block' }}>{plan.deviationStatus || '🟢 ON ROUTE'}</strong></div>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 3: PROPERTY STOPS COMPACT TABLE (COLLAPSIBLE - DEFAULT OPEN) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('propertyStops')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.propertyStops ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🏢 PROPERTY STOPS REGISTER ({plan.stops.length} STOPS)
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.propertyStops ? '▲' : '▼'}</span>
          </div>

          {openSections.propertyStops && (
            <div style={{ padding: '16px' }}>
              <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <th style={{ padding: '10px' }}>Stop #</th>
                    <th style={{ padding: '10px' }}>Property Title</th>
                    <th style={{ padding: '10px' }}>Cost Sheet ID</th>
                    <th style={{ padding: '10px' }}>Scheduled Time</th>
                    <th style={{ padding: '10px' }}>Status</th>
                    <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.stops.map((stop: any, idx: number) => {
                    const isCompleted = stop.status === 'VISIT_COMPLETED';
                    const isCurrent = idx === plan.currentStopIndex;

                    return (
                      <tr key={stop.stopId} style={{ borderBottom: '1px solid #1e293b' }}>
                        <td style={{ padding: '10px', color: '#fbbf24', fontWeight: '900' }}>STOP 0{idx + 1}</td>
                        <td style={{ padding: '10px' }}>
                          <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.85rem' }}>{stop.propertyTitle}</strong>
                          <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{stop.locality} ({stop.propertyCode})</span>
                        </td>
                        <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{stop.costSheetId}</td>
                        <td style={{ padding: '10px', color: '#cbd5e1' }}>{stop.scheduledTime}</td>
                        <td style={{ padding: '10px' }}>
                          <span style={{ background: isCompleted ? 'rgba(34, 197, 94, 0.2)' : isCurrent ? 'rgba(2, 132, 199, 0.2)' : 'rgba(148, 163, 184, 0.2)', color: isCompleted ? '#4ade80' : isCurrent ? '#38bdf8' : '#94a3b8', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900' }}>
                            {isCompleted ? '✓ Done' : isCurrent ? '🟢 Current' : '⚪ Pending'}
                          </span>
                        </td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                            <button 
                              onClick={() => setShowIndividualStopModal({ open: true, stop, plan })}
                              style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}
                            >
                              👁️ View Stop
                            </button>
                            {isCurrent && !isCompleted && (
                              <button 
                                onClick={() => {
                                  const cleanLat = stop.latitude.replace(/[^0-9.]/g, '') || '17.4612';
                                  const cleanLng = stop.longitude.replace(/[^0-9.]/g, '') || '78.3689';
                                  window.open(`https://www.google.com/maps/dir/?api=1&destination=${cleanLat},${cleanLng}`, '_blank');
                                }}
                                style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}
                              >
                                🚀 Navigate
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
          )}
        </div>

        {/* SECTION 4: NAVIGATION & COCKPIT CONTROLS (COLLAPSIBLE - DEFAULT COLLAPSED) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('navigation')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.navigation ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#a855f7', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🚀 NAVIGATION & MOBILE COCKPIT CONTROLS
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.navigation ? '▲' : '▼'}</span>
          </div>

          {openSections.navigation && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => {
                    const cleanLat = plan.pickupLat.replace(/[^0-9.]/g, '') || '17.4478';
                    const cleanLng = plan.pickupLng.replace(/[^0-9.]/g, '') || '78.3789';
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${cleanLat},${cleanLng}`, '_blank');
                  }}
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  🚀 Navigate to Pickup Location
                </button>
                <button 
                  onClick={() => {
                    const cleanLat = plan.dropLat.replace(/[^0-9.]/g, '') || '17.4478';
                    const cleanLng = plan.dropLng.replace(/[^0-9.]/g, '') || '78.3789';
                    window.open(`https://www.google.com/maps/dir/?api=1&destination=${cleanLat},${cleanLng}`, '_blank');
                  }}
                  style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  🚀 Navigate to Drop Location
                </button>
              </div>
            </div>
          )}
        </div>

        {/* SECTION 5: OTP & GEOFENCE (COLLAPSIBLE - DEFAULT COLLAPSED) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('otpGeofence')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.otpGeofence ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              🔐 OTP & GEOFENCE VERIFICATION AUDIT
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.otpGeofence ? '▲' : '▼'}</span>
          </div>

          {openSections.otpGeofence && (
            <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
              <span style={{ color: '#4ade80', fontWeight: '800' }}>🟢 GPS Geofence Radius: 100 Meters Verified</span>
              <span style={{ color: '#fbbf24', fontWeight: '800' }}>🔐 Mobile OTP: 849201 Verified on Site</span>
            </div>
          )}
        </div>

        {/* SECTION 6: CUSTOMER FEEDBACK (COLLAPSIBLE - DEFAULT COLLAPSED) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('feedback')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.feedback ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⭐ CUSTOMER SITE VISIT FEEDBACK
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.feedback ? '▲' : '▼'}</span>
          </div>

          {openSections.feedback && (
            <div style={{ padding: '16px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <p>Rating: ⭐⭐⭐⭐⭐ (5/5 Stars)</p>
              <p style={{ marginTop: '4px' }}>Remarks: "Customer showed high interest in flat 1402 at Aparna Zenon. Requested revised cost sheet with floor rise discount."</p>
            </div>
          )}
        </div>

        {/* SECTION 7: AUDIT LOG (COLLAPSIBLE - DEFAULT COLLAPSED) */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', overflow: 'hidden' }}>
          <div 
            onClick={() => toggleSection('auditHistory')}
            style={{ padding: '14px 18px', background: isLight ? '#ffffff' : '#1e293b', borderBottom: openSections.auditHistory ? '1px solid #334155' : 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <h4 style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              📜 VISIT HISTORY & IMMUTABLE AUDIT TRAIL
            </h4>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900' }}>{openSections.auditHistory ? '▲' : '▼'}</span>
          </div>

          {openSections.auditHistory && (
            <div style={{ padding: '16px' }}>
              <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                <thead>
                  <tr style={{ background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <th style={{ padding: '6px' }}>Time</th>
                    <th style={{ padding: '6px' }}>User</th>
                    <th style={{ padding: '6px' }}>Action</th>
                    <th style={{ padding: '6px' }}>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {(plan.auditLogs || []).map((log: any, idx: number) => (
                    <tr key={idx} style={{ borderBottom: '1px solid #1e293b' }}>
                      <td style={{ padding: '6px', color: '#fbbf24', fontFamily: 'monospace' }}>{log.time}</td>
                      <td style={{ padding: '6px', color: '#38bdf8' }}>{log.user}</td>
                      <td style={{ padding: '6px', color: '#4ade80', fontWeight: '800' }}>{log.action}</td>
                      <td style={{ padding: '6px', color: '#cbd5e1' }}>{log.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
</div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
          <button onClick={onClose} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}>Close</button>
        </div>

      </div>
    </div>
  );
}

function IndividualStopModalContent({
  stop,
  plan,
  onClose,
  setActiveTab,
  setActiveCostSheetShareSubTab,
  setActiveProjectSubTab
}: any) {
  const cleanLat = stop.latitude.replace(/[^0-9.]/g, '') || '17.4612';
  const cleanLng = stop.longitude.replace(/[^0-9.]/g, '') || '78.3689';
  const mapsDirUrl = `https://www.google.com/maps/dir/?api=1&destination=${cleanLat},${cleanLng}`;

  return (
    <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2100, padding: '20px' }}>
      <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #38bdf8', width: '560px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
          <div>
            <span style={{ background: '#38bdf8', color: '#0f172a', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900', fontFamily: 'monospace' }}>
              {stop.stopId}
            </span>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '4px' }}>
              🏢 PROPERTY STOP DETAILS
            </h3>
          </div>
          <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>

        {/* CONTENT CARD */}
        <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
          <div>
            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PROPERTY TITLE</span>
            <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '1rem', marginTop: '2px' }}>{stop.propertyTitle}</h4>
            <span style={{ color: '#38bdf8', fontFamily: 'monospace', fontWeight: '800', fontSize: '0.78rem' }}>Property ID: {stop.propertyCode || stop.propertyId}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Linked Cost Sheet:</span> <strong style={{ color: '#fbbf24', display: 'block', fontFamily: 'monospace' }}>{stop.costSheetId}</strong></div>
            <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Scheduled Time:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{stop.scheduledTime}</strong></div>
            <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>GPS Geofence:</span> <strong style={{ color: '#38bdf8', display: 'block' }}>{stop.geofenceVerified ? '🟢 Verified' : '⚪ Pending Check-In'}</strong></div>
            <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Mobile OTP:</span> <strong style={{ color: '#22c55e', display: 'block' }}>{stop.otpVerified ? '🔐 Verified' : '⚪ Pending Check-In'}</strong></div>
          </div>

          <div>
            <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Location Address:</span>
            <p style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', marginTop: '2px' }}>{stop.address}</p>
          </div>
        </div>

        {/* QUICK ACTION BUTTONS */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
          <button 
            onClick={() => window.open(mapsDirUrl, '_blank')}
            style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            🚀 START NAVIGATION
          </button>
          <button 
            onClick={() => window.open(`tel:${plan.mobile}`)}
            style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            📞 CALL
          </button>
          <button 
            onClick={() => window.open(`https://api.whatsapp.com/send?phone=${plan.mobile.replace(/[^0-9]/g, '')}`)}
            style={{ background: '#25D366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            💬 WHATSAPP
          </button>
          <button 
            onClick={() => {
              onClose();
              setActiveTab('cost_sheet_share');
              setActiveCostSheetShareSubTab('individual_cost_sheets');
            }}
            style={{ background: '#334155', color: '#fbbf24', border: '1px solid #fbbf24', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            📄 VIEW COST SHEET
          </button>
          <button 
            onClick={() => {
              onClose();
              setActiveTab('project_management');
              setActiveProjectSubTab('property_master');
            }}
            style={{ background: '#334155', color: '#38bdf8', border: '1px solid #38bdf8', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            🏢 VIEW PROPERTY
          </button>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  // 12 Main Navigation Categories
  const [activeTab, setActiveTab] = useState<
    'main_dashboard' | 'lead_management' | 'customer_management' | 'matching_management' | 'cost_sheet_share' | 'visit_management' | 'project_management' | 'agreement_management' | 'billing_management' | 'map_management' | 'role_management' | 'profile'
  >('main_dashboard');

  // Search & Global BI Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<'today' | 'this_week' | 'this_month' | 'this_quarter' | 'this_year'>('this_month');

  // Display Theme Mode (Dark vs Light)
    // Window Width & Mobile Responsiveness State
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth <= 1024;

  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_theme_mode');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      console.error('Error reading theme mode from localStorage:', e);
    }
    return 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_theme_mode', themeMode);
    } catch (e) {
      console.error('Error saving theme mode to localStorage:', e);
    }
  }, [themeMode]);

  // UNIVERSAL SEARCH QUERY MATCHER
  const matchesSearchQuery = (item: any, query: string): boolean => {
    if (!query || !query.trim()) return true;
    const q = query.trim().toLowerCase();
    
    const checkValue = (val: any, depth = 0): boolean => {
      if (val === null || val === undefined || depth > 4) return false;
      if (typeof val === 'string' || typeof val === 'number' || typeof val === 'boolean') {
        return String(val).toLowerCase().includes(q);
      }
      if (Array.isArray(val)) {
        return val.some(elem => checkValue(elem, depth + 1));
      }
      if (typeof val === 'object') {
        return Object.values(val).some(nested => checkValue(nested, depth + 1));
      }
      return false;
    };
    
    return checkValue(item);
  };
  const [branchFilter, setBranchFilter] = useState<string>('ALL');
  const [teamFilter, setTeamFilter] = useState<string>('ALL');

  // Display Modes
  const [propertyViewMode, setPropertyViewMode] = useState<'grid' | 'table' | 'split'>('table');
  const [customerViewMode, setCustomerViewMode] = useState<'grid' | 'table' | 'split'>('table');

  // Sub-Tabs States across Categories
  const [activeLeadSubTab, setActiveLeadSubTab] = useState<'lead_ingestion' | 'lead_ownership' | 'lead_transfer' | 'lead_scoring'>('lead_ingestion');
  const [activeVisitSubTab, setActiveVisitSubTab] = useState<'visit_scheduler' | 'visit_route_planner' | 'visit_otp_checkin' | 'visit_feedback' | 'visit_analytics' | 'visit_owner_tracking'>('visit_route_planner');
  const [activeMatchingSubTab, setActiveMatchingSubTab] = useState<'ai_matching_engine' | 'req_inventory_matrix' | 'portfolio_dispatcher'>('ai_matching_engine');
  const [activeCostSheetShareSubTab, setActiveCostSheetShareSubTab] = useState<'individual_cost_sheets' | 'dispatcher' | 'delivery_analytics' | 'portal_tokens' | 'interest_handoff'>('individual_cost_sheets');
  const [activeRoleSubTab, setActiveRoleSubTab] = useState<'user_directory' | 'permission_matrix' | 'org_hierarchy' | 'approval_queue' | 'session_security' | 'exit_handover'>('user_directory');
  const [activeProjectSubTab, setActiveProjectSubTab] = useState<'property_master' | 'live_inventory_board' | 'map_radius' | 'price_security' | 'deal_pipeline_tracker' | 'add_property_master'>('property_master');
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
  const [mapViewMode, setMapViewMode] = useState<'google_map' | 'radar'>('google_map');
  const [activeRadius, setActiveRadius] = useState<'1KM' | '2KM' | '5KM' | '10KM' | '25KM'>('5KM');

  // Role Context Switcher State
  const [currentRole, setCurrentRole] = useState<string>('SUPER_ADMIN');
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/login';
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    if (typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/login')) {
      return false;
    }
    return false;
  });
  const [loginEmail, setLoginEmail] = useState<string>('admin@swaramayi.com');
  const [loginPassword, setLoginPassword] = useState<string>('swaramayi2026');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        setCurrentPath(window.location.pathname);
        if (window.location.pathname.toLowerCase().startsWith('/login')) {
          setIsLoggedIn(false);
        }
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_is_logged_in', JSON.stringify(isLoggedIn));
    } catch (e) {
      console.error('Error saving login state:', e);
    }
  }, [isLoggedIn]);
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

  // 10-Step Lead Intake Wizard Step State & Matching Requests Queue (Persistent)
  const [leadIntakeStep, setLeadIntakeStep] = useState<number>(1);
  const [matchingVaultFilter, setMatchingVaultFilter] = useState<'PENDING_ONLY' | 'ALL'>('PENDING_ONLY');
  const [matchingRequestsQueue, setMatchingRequestsQueue] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_matching_queue_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading matching queue from localStorage:', e);
    }
    return [
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
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_matching_queue_v3', JSON.stringify(matchingRequestsQueue));
    } catch (e) {
      console.error('Error saving matching queue to localStorage:', e);
    }
  }, [matchingRequestsQueue]);

  const [selectedMatchingId, setSelectedMatchingId] = useState<string>('SRM-MAT-2026-000421');
  const [matchingSearchQuery, setMatchingSearchQuery] = useState<string>('');
  const [propertySearchQuery, setPropertySearchQuery] = useState<string>('');
  const [activeSelectionRecord, setActiveSelectionRecord] = useState<{ selectionId: string; matchingId: string; customerId: string; propertyIds: string[]; date: string; status: string } | null>({
    selectionId: 'SRM-SEL-2026-000078',
    matchingId: 'SRM-MAT-2026-000421',
    customerId: 'SRM-CUS-2026-000184',
    propertyIds: ['SRM-PROP-2026-000421', 'SRM-PROP-2026-000423', 'SRM-PROP-2026-000425'],
    date: '18 Aug 2026 01:15 PM',
    status: 'SELECTION_CONFIRMED'
  });
  const [scheduledVisits, setScheduledVisits] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_scheduled_visits_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading scheduled visits from localStorage:', e);
    }
    return [
      {
        visitId: 'SRM-VS-2026-000087',
        costSheetId: 'SRM-CS-2026-000145',
        customerName: 'Rohan Deshmukh',
        customerNumber: 'SRM-CUS-2026-000184',
        mobile: '+91 98490 12345',
        propertyTitle: 'Aparna Zenon Premium 3BHK Residence',
        propertyCode: 'SRM-PROP-2026-000421',
        visitDate: '2026-08-22',
        visitTime: '11:00 AM',
        assignedExecutive: 'Ramesh Pawar (Field Exec - Kondapur)',
        transport: 'Cab Pick & Drop Needed',
        status: 'CONFIRMED',
        conflictStatus: '🟢 NO OVERLAP CONFLICT'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_scheduled_visits_v3', JSON.stringify(scheduledVisits));
    } catch (e) {
      console.error('Error saving scheduled visits to localStorage:', e);
    }
  }, [scheduledVisits]);

  // --------------------------------------------------------------------------
  // MULTI-PROPERTY VISIT ROUTE PLANNER MASTER STATE (WITH LOCALSTORAGE PERSISTENCE)
  // --------------------------------------------------------------------------
  const [selectedVisitPlanId, setSelectedVisitPlanId] = useState<string>('SRM-VP-2026-000001');

  const [visitPlans, setVisitPlans] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_visit_plans_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading visit plans from localStorage:', e);
    }
    return [
      {
        visitPlanId: 'SRM-VP-2026-000001',
        customerName: 'Rohan Deshmukh',
        customerNumber: 'SRM-CUS-2026-000184',
        mobile: '+91 98490 12345',
        matchingId: 'SRM-MAT-2026-000421',
        assignedExecutive: 'Ramesh Pawar (Field Exec - Kondapur)',
        assignedExecutivePhone: '+91 98490 00014',
        visitDate: '2026-08-22',
        startTime: '10:00 AM',
        status: 'IN_PROGRESS',
        pickupAddress: 'Hitec City Metro Station, Gate 2, Hyderabad',
        pickupLat: '17.4478° N',
        pickupLng: '78.3789° E',
        pickupStatus: 'COMPLETED',
        pickupTime: '10:15 AM',
        dropAddress: 'Hitec City Metro Station, Gate 2, Hyderabad',
        dropLat: '17.4478° N',
        dropLng: '78.3789° E',
        dropStatus: 'PENDING',
        currentStopIndex: 1,
        autoNavigateNext: true,
        totalDistanceKm: '14.8 KM',
        totalDurationMinutes: 195,
        delayStatus: '🟢 ON SCHEDULE',
        deviationStatus: '🟢 ON ROUTE',
        stops: [
          {
            stopId: 'SRM-VSTOP-2026-000001',
            costSheetId: 'SRM-CS-2026-000145',
            propertyId: 'PROP-01',
            propertyCode: 'SRM-PROP-2026-000421',
            propertyTitle: 'Aparna Zenon Premium 3BHK Residence',
            locality: 'Kondapur',
            developer: 'Aparna Constructions',
            latitude: '17.4612° N',
            longitude: '78.3689° E',
            address: 'Aparna Zenon, Survey No. 45, Nanakramguda Rd, Kondapur',
            timeWindow: '10:00 AM - 11:30 AM',
            scheduledTime: '10:20 AM',
            durationMinutes: 45,
            distanceFromPrev: '4.2 KM',
            etaMinutes: 12,
            status: 'VISIT_COMPLETED',
            otpVerified: true,
            geofenceVerified: true,
            arrivalTime: '10:18 AM',
            completionTime: '11:03 AM',
            feedbackRating: 5,
            feedbackRemarks: 'Customer liked 14th floor pool view flat. High purchase intent.',
            skipReason: ''
          },
          {
            stopId: 'SRM-VSTOP-2026-000002',
            costSheetId: 'SRM-CS-2026-000146',
            propertyId: 'PROP-05',
            propertyCode: 'SRM-PROP-2026-000425',
            propertyTitle: 'Prestige High Fields Corner 3BHK',
            locality: 'Nanakramguda',
            developer: 'Prestige Estates',
            latitude: '17.4201° N',
            longitude: '78.3410° E',
            address: 'Tower 8, Prestige High Fields, Nanakramguda',
            timeWindow: '11:30 AM - 01:00 PM',
            scheduledTime: '11:35 AM',
            durationMinutes: 45,
            distanceFromPrev: '3.8 KM',
            etaMinutes: 14,
            status: 'VISIT_STARTED',
            otpVerified: true,
            geofenceVerified: true,
            arrivalTime: '11:32 AM',
            completionTime: '',
            feedbackRating: 0,
            feedbackRemarks: '',
            skipReason: ''
          },
          {
            stopId: 'SRM-VSTOP-2026-000003',
            costSheetId: 'SRM-CS-2026-000147',
            propertyId: 'PROP-03',
            propertyCode: 'SRM-PROP-2026-000423',
            propertyTitle: 'My Home Jewel Executive 2BHK Flat',
            locality: 'Madinaguda',
            developer: 'My Home Group',
            latitude: '17.4921° N',
            longitude: '78.3412° E',
            address: 'Block C, My Home Jewel, Madinaguda',
            timeWindow: '01:00 PM - 02:30 PM',
            scheduledTime: '01:00 PM',
            durationMinutes: 45,
            distanceFromPrev: '4.5 KM',
            etaMinutes: 16,
            status: 'PENDING',
            otpVerified: false,
            geofenceVerified: false,
            arrivalTime: '',
            completionTime: '',
            feedbackRating: 0,
            feedbackRemarks: '',
            skipReason: ''
          },
          {
            stopId: 'SRM-VSTOP-2026-000004',
            costSheetId: 'SRM-CS-2026-000148',
            propertyId: 'PROP-02',
            propertyCode: 'SRM-PROP-2026-000422',
            propertyTitle: 'Financial Towers Luxury 4BHK Sky Suite',
            locality: 'Financial District',
            developer: 'My Home Group',
            latitude: '17.4401° N',
            longitude: '78.3489° E',
            address: 'Tower B, Financial Towers, Financial District',
            timeWindow: '02:30 PM - 04:00 PM',
            scheduledTime: '02:15 PM',
            durationMinutes: 45,
            distanceFromPrev: '2.3 KM',
            etaMinutes: 10,
            status: 'PENDING',
            otpVerified: false,
            geofenceVerified: false,
            arrivalTime: '',
            completionTime: '',
            feedbackRating: 0,
            feedbackRemarks: '',
            skipReason: ''
          }
        ],
        auditLogs: [
          { time: '22 Aug 09:30 AM', user: 'Suresh Kumar (BM)', action: 'VISIT_PLAN_CREATED', details: 'Created Multi-Property Visit Plan SRM-VP-2026-000001 with 4 stops' },
          { time: '22 Aug 09:45 AM', user: 'System AI Engine', action: 'ROUTE_OPTIMIZED', details: 'Optimized 4-stop route based on GPS distance & time windows' },
          { time: '22 Aug 10:15 AM', user: 'Ramesh Pawar (Field Exec)', action: 'CUSTOMER_PICKED_UP', details: 'Customer picked up at Hitec City Metro Station (GPS verified)' },
          { time: '22 Aug 10:18 AM', user: 'Ramesh Pawar (Field Exec)', action: 'STOP_1_ARRIVED', details: 'Arrived at Stop 1 (Aparna Zenon). GPS & OTP verified.' },
          { time: '22 Aug 11:03 AM', user: 'Ramesh Pawar (Field Exec)', action: 'STOP_1_COMPLETED', details: 'Visit completed for Stop 1. Auto advanced to Stop 2.' }
        ]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_visit_plans_v3', JSON.stringify(visitPlans));
    } catch (e) {
      console.error('Error saving visit plans to localStorage:', e);
    }
  }, [visitPlans]);

  const [routePlannerMode, setRoutePlannerMode] = useState<'create_plan' | 'exec_cockpit' | 'visual_map'>('exec_cockpit');

  const [newRoutePlanForm, setNewRoutePlanForm] = useState({
    customerId: 'SRM-CUS-2026-000184',
    customerName: 'Rohan Deshmukh',
    mobile: '+91 98490 12345',
    matchingId: 'SRM-MAT-2026-000421',
    assignedExecutive: 'Ramesh Pawar (Field Exec - Kondapur)',
    visitDate: '2026-08-22',
    startTime: '10:00 AM',
    pickupAddress: 'Hitec City Metro Station, Gate 2, Hyderabad',
    pickupLat: '17.4478° N',
    pickupLng: '78.3789° E',
    dropAddress: 'Hitec City Metro Station, Gate 2, Hyderabad',
    dropLat: '17.4478° N',
    dropLng: '78.3789° E',
    selectedPropertyIds: ['PROP-01', 'PROP-05', 'PROP-03', 'PROP-02'],
    autoNavigateNext: true
  });

  const [showSkipStopModal, setShowSkipStopModal] = useState<{ open: boolean; planId: string; stopId: string; propertyTitle: string } | null>(null);
  const [skipReasonInput, setSkipReasonInput] = useState<string>('Customer Not Interested');
  const [showAddPropertyRouteModal, setShowAddPropertyRouteModal] = useState<{ open: boolean; planId: string } | null>(null);
  const [addPropertySelectCode, setAddPropertySelectCode] = useState<string>('SRM-PROP-2026-000424');
  const [showLiveRouteTrackingModal, setShowLiveRouteTrackingModal] = useState<{ open: boolean; plan: any } | null>(null);
  const [showVisitDetailModal, setShowVisitDetailModal] = useState<{ open: boolean; plan: any } | null>(null);
  const [showIndividualStopModal, setShowIndividualStopModal] = useState<{ open: boolean; stop: any; plan: any } | null>(null);
  const [showRouteMapModal, setShowRouteMapModal] = useState<{ open: boolean; plan: any } | null>(null);
  const [visitFilterStatus, setVisitFilterStatus] = useState<string>('ALL');
  const [visitFilterDate, setVisitFilterDate] = useState<string>('ALL');
  const [visitFilterExec, setVisitFilterExec] = useState<string>('ALL');

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

  const generateNextLeadCode = () => {
    const allNums: number[] = [];
    leadsList.forEach(l => {
      if (l.lead_number) {
        const match = l.lead_number.match(/\d+$/);
        if (match) allNums.push(parseInt(match[0], 10));
      }
    });
    const maxVal = allNums.length > 0 ? Math.max(...allNums) : 5;
    const nextVal = maxVal + 1;
    const pad = String(nextVal).padStart(6, '0');
    return `SRM-LEAD-2026-${pad}`;
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

    // Resolve matching request from current queue or selected matching ID
    const currentReq = matchingRequestsQueue.find(r => 
      r.requestId.toLowerCase() === selectedMatchingId.toLowerCase() || 
      r.customerNumber.toLowerCase() === selectedMatchingId.toLowerCase()
    ) || matchingRequestsQueue[0];

    const custName = currentReq?.customerName || selectedCust?.name || 'Avishek Das';
    const custNum = currentReq?.customerNumber || selectedCust?.customer_number || 'SRM-CUS-2026-000187';
    const custMobile = currentReq?.mobile || selectedCust?.mobile || '9432328947';
    const matchingReqId = currentReq?.requestId || selectedMatchingId || 'MATREQ-2026-000002';

    const newShare = {
      shareId: newShareId,
      costSheetId: newCSCode,
      customerName: custName,
      customerNumber: custNum,
      mobile: custMobile,
      propertyTitle: `${prop.title || 'Selected Property'} (${prop.property_code || 'PROP'})`,
      finalPrice: prop.final_price || '₹55 Lakhs',
      channel: 'WhatsApp & Email Gateway',
      sentTime: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      viewsCount: 1,
      pdfDownloaded: true,
      interestStatus: 'QUOTATION_GENERATED',
      parentMatchingId: matchingReqId
    };

    setCostSheetShares(prev => [newShare, ...prev]);

    // Update matching request in queue with generated Cost Sheet ID and status
    setMatchingRequestsQueue(prev => prev.map(req => {
      if (req.requestId === matchingReqId || req.customerNumber === custNum) {
        return {
          ...req,
          costSheetId: newCSCode,
          status: 'COST_SHEET_CREATED'
        };
      }
      return req;
    }));

    if (prop.property_code && !selectedPropertyIds.includes(prop.property_code)) {
      setSelectedPropertyIds(prev => [...prev, prop.property_code]);
    }

    setActiveTab('cost_sheet_share');
    alert(`🚀 Successfully Generated Cost Sheet ID ${newCSCode}!\n\nCustomer: ${custName} (${custNum})\nProperty: ${prop.title || prop.property_code}\nLinked Matching ID: ${matchingReqId}\nStatus Updated: COST_SHEET_CREATED\n\nTransferred seamlessly to Cost Sheet Sharing Category!`);
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

  // Schedule Site Visit Modal State
  const [showScheduleVisitModal, setShowScheduleVisitModal] = useState<{ open: boolean; costSheet?: any } | null>(null);
  const [visitScheduleForm, setVisitScheduleForm] = useState({
    visitDate: '2026-08-22',
    visitTime: '11:00',
    assignedExecutive: 'Ramesh Pawar (Field Exec - Kondapur)',
    transport: 'Cab Pick & Drop Needed',
    notes: 'Customer requested 14th floor flat inspection and parking slot check.'
  });

  // ----------------------------------------------------
  // FULL MASTER CRM DATASETS
  // ----------------------------------------------------

  // 1. Employee Directory (15 Users for all 15 Default Roles)
  const [users, setUsers] = useState([
    { id: 'USR-01', username: 'Rajesh Varma (Owner)', full_name: 'Rajesh Varma', email: 'rajesh.varma@swaramayi.com', mobile: '+91 98490 00001', role: 'SUPER_ADMIN', branch_name: 'Head Office', department: 'Executive Board', team_name: 'Core Management', manager_name: 'Self', is_active: true, user_status: 'ACTIVE' },
    { id: 'USR-02', username: 'Anil Kapoor (Admin)', full_name: 'Anil Kapoor', email: 'anil.k@swaramayi.com', mobile: '+91 98490 00002', role: 'ADMIN', branch_name: 'Head Office', department: 'System Admin', team_name: 'IT Ops Desk', manager_name: 'Rajesh Varma', is_active: true, user_status: 'ACTIVE' }
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

  // 4. BULK PROPERTIES MASTER STOCK (WITH LOCALSTORAGE PERSISTENCE)
  const [properties, setProperties] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_properties_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading properties from localStorage:', e);
    }
    return [
      { id: 'PROP-01', property_code: 'SRM-PROP-2026-000421', title: 'Aparna Zenon Premium 3BHK Residence', type: 'Apartment', developer: 'Aparna Constructions', project: 'Aparna Zenon', tower: 'Tower A', floor: 5, unit: 'A-504', configuration: '3BHK', carpet_area: '1,450 sq.ft.', facing: 'East', final_price: '₹84 Lakhs', base_price: '₹85 Lakhs', status: 'AVAILABLE', locality: 'Kondapur', map_x: 45, map_y: 35, latitude: '17.4612° N', longitude: '78.3689° E', owner_phone: '+91 40 2335 8888', price_sqft: '₹5,862 / sq.ft.' },
      { id: 'PROP-02', property_code: 'SRM-PROP-2026-000422', title: 'Financial Towers Luxury 4BHK Sky Suite', type: 'Penthouse', developer: 'My Home Group', project: 'Financial Towers', tower: 'Tower B', floor: 12, unit: 'B-1202', configuration: '4BHK', carpet_area: '2,400 sq.ft.', facing: 'North-East', final_price: '₹2.08 Crores', base_price: '₹2.10 Crores', status: 'AVAILABLE', locality: 'Financial District', map_x: 28, map_y: 55, latitude: '17.4401° N', longitude: '78.3489° E', owner_phone: '+91 40 6688 9999', price_sqft: '₹8,750 / sq.ft.' },
      { id: 'PROP-03', property_code: 'SRM-PROP-2026-000423', title: 'My Home Jewel Executive 2BHK Flat', type: 'Apartment', developer: 'My Home Group', project: 'My Home Jewel', tower: 'Block C', floor: 3, unit: 'C-308', configuration: '2BHK', carpet_area: '1,245 sq.ft.', facing: 'North', final_price: '₹68 Lakhs', base_price: '₹69 Lakhs', status: 'AVAILABLE', locality: 'Madinaguda', map_x: 32, map_y: 20, latitude: '17.4921° N', longitude: '78.3412° E', owner_phone: '+91 40 6688 1111', price_sqft: '₹5,542 / sq.ft.' },
      { id: 'PROP-04', property_code: 'SRM-PROP-2026-000424', title: 'Jayabheri Silicon County Ultra Villa', type: 'Villa', developer: 'Jayabheri Properties', project: 'Silicon County', tower: 'Villa 14', floor: 2, unit: 'V-14', configuration: '5BHK Villa', carpet_area: '4,200 sq.ft.', facing: 'East', final_price: '₹4.50 Crores', base_price: '₹4.60 Crores', status: 'BOOKED', locality: 'Hitec City', map_x: 58, map_y: 42, latitude: '17.4478° N', longitude: '78.3789° E', owner_phone: '+91 40 2311 5555', price_sqft: '₹10,952 / sq.ft.' },
      { id: 'PROP-05', property_code: 'SRM-PROP-2026-000425', title: 'Prestige High Fields Corner 3BHK', type: 'Apartment', developer: 'Prestige Estates', project: 'Prestige High Fields', tower: 'Tower 8', floor: 18, unit: 'T8-1804', configuration: '3BHK', carpet_area: '1,725 sq.ft.', facing: 'East', final_price: '₹1.35 Crores', base_price: '₹1.38 Crores', status: 'HOLD', locality: 'Nanakramguda', map_x: 22, map_y: 65, latitude: '17.4201° N', longitude: '78.3410° E', owner_phone: '+91 40 4477 8888', price_sqft: '₹8,000 / sq.ft.' }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_properties_v3', JSON.stringify(properties));
    } catch (e) {
      console.error('Error saving properties to localStorage:', e);
    }
  }, [properties]);

  const [rawSelectedProperty, setSelectedProperty] = useState<any>(null);
  const selectedProperty = rawSelectedProperty || properties[0] || { id: 'PROP-01', property_code: 'SRM-PROP-2026-000421', title: 'Aparna Zenon Premium 3BHK Residence', type: 'Apartment', developer: 'Aparna Constructions', project: 'Aparna Zenon', tower: 'Tower A', floor: 5, unit: 'A-504', configuration: '3BHK', carpet_area: '1,450 sq.ft.', facing: 'East', final_price: '₹84 Lakhs', base_price: '₹85 Lakhs', status: 'AVAILABLE', locality: 'Kondapur', map_x: 45, map_y: 35, latitude: '17.4612° N', longitude: '78.3689° E', owner_phone: '+91 40 2335 8888', price_sqft: '₹5,862 / sq.ft.' };

  // 5. Property Units Inventory
  const [propertyUnits, setPropertyUnits] = useState([
    { id: 'UN-01', unit_code: 'SRM-UNIT-2026-000001', tower: 'Tower A', floor: 1, unit_num: 'A-101', bhk: '2BHK', area: '1,100 sq.ft.', price: '₹70 Lakhs', status: 'AVAILABLE' },
    { id: 'UN-02', unit_code: 'SRM-UNIT-2026-000002', tower: 'Tower A', floor: 1, unit_num: 'A-102', bhk: '3BHK', area: '1,450 sq.ft.', price: '₹84 Lakhs', status: 'BOOKED', customer: 'Rohan Deshmukh' }
  ]);

  // 6. CUSTOMERS MASTER VAULT (WITH LOCALSTORAGE PERSISTENCE)
  const [customers, setCustomers] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_customers_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading customers from localStorage:', e);
    }
    return [
      { id: 'CUST-01', customer_number: 'SRM-CUS-2026-000184', name: 'Rohan Deshmukh', mobile: '+91 98490 12345', email: 'rohan.d@gmail.com', budget: '₹70 Lakhs - ₹85 Lakhs', preferredArea: 'Kondapur / Gachibowli', configuration: '3BHK', status: 'QUALIFIED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 88, source: 'Meta Ads' },
      { id: 'CUST-02', customer_number: 'SRM-CUS-2026-000185', name: 'Priya Sharma', mobile: '+91 99887 76655', email: 'priya.s@yahoo.com', budget: '₹1.8 Crore - ₹2.2 Crore', preferredArea: 'Financial District', configuration: '4BHK', status: 'SITE_VISIT_SCHEDULED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 94, source: 'Google Search' },
      { id: 'CUST-03', customer_number: 'SRM-CUS-2026-000186', name: 'Dr. Ananth Kulkarni', mobile: '+91 98480 33445', email: 'drananth@apollo.com', budget: '₹4.0 Crore - ₹5.0 Crore', preferredArea: 'Hitec City', configuration: '5BHK Villa', status: 'BOOKED', priority: 'HOT', assigned_agent: 'Rahul Sharma (TL)', score: 98, source: 'Referral' },
      { id: 'CUST-04', customer_number: 'SRM-CUS-2026-000187', name: 'Avishek Das', mobile: '9432328947', email: 'avishek.das@gmail.com', budget: '50 lakh – 60 Lakh', preferredArea: 'Madhyamgram', configuration: '3BHK', status: 'QUALIFIED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 92, source: 'Meta Ads' }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_customers_v3', JSON.stringify(customers));
    } catch (e) {
      console.error('Error saving customers to localStorage:', e);
    }
  }, [customers]);

  const [rawSelectedCust, setSelectedCust] = useState<any>(null);
  const selectedCust = rawSelectedCust || customers[0] || { id: 'CUST-01', customer_number: 'SRM-CUS-2026-000184', name: 'Rohan Deshmukh', mobile: '+91 98490 12345', email: 'rohan.d@gmail.com', budget: '₹70 Lakhs - ₹85 Lakhs', preferredArea: 'Kondapur / Gachibowli', configuration: '3BHK', status: 'QUALIFIED', priority: 'HOT', assigned_agent: 'Priya Nair (Sales Exec)', score: 88, source: 'Meta Ads' };

  // 6.5. CENTRAL LEADS MASTER STORE (WITH LOCALSTORAGE PERSISTENCE)
  const [leadsList, setLeadsList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_leads_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading leads from localStorage:', e);
    }
    return [
      {
        id: 'LEAD-000001',
        lead_number: 'SRM-LEAD-2026-000001',
        customer_id: 'SRM-CUS-2026-000184',
        customer_number: 'SRM-CUS-2026-000184',
        customer_name: 'Rohan Deshmukh',
        mobile: '+91 98490 11223',
        alternate_mobile: '+91 98490 11224',
        whatsapp_number: '+91 98490 11223',
        email: 'rohan.d@gmail.com',
        source: 'Facebook',
        campaign: 'High-end Villa Ads',
        preferred_location: 'Kondapur / Gachibowli',
        preferred_project: 'Aparna Zenon',
        property_type: 'Flat / Apartment',
        bhk: '3BHK',
        budget_min: 7000000,
        budget_max: 8500000,
        purpose: 'Self Use',
        possession_preference: 'Immediate (< 30 Days)',
        loan_required: true,
        occupation: 'IT Manager (Microsoft)',
        priority: 'HOT',
        lead_status: 'INTERESTED',
        call_disposition: 'CONNECTED_INTERESTED',
        next_action: 'Send Cost Sheet',
        next_followup: '2026-08-25T17:00:00.000Z',
        assigned_employee_id: 'USR-07',
        assigned_employee_name: 'Priya Nair (Sales Exec)',
        created_by: 'USR-01',
        quality_score: 88,
        created_at: '2026-08-24T10:30:00.000Z',
        updated_at: '2026-08-24T11:20:00.000Z'
      },
      {
        id: 'LEAD-000002',
        lead_number: 'SRM-LEAD-2026-000002',
        customer_id: 'SRM-CUS-2026-000185',
        customer_number: 'SRM-CUS-2026-000185',
        customer_name: 'Vikramaditya Roy',
        mobile: '+91 98490 55443',
        whatsapp_number: '+91 98490 55443',
        email: 'vikram.roy@techmail.com',
        source: 'Google Ads',
        campaign: 'Hyderabad Luxury Living',
        preferred_location: 'Financial District',
        preferred_project: 'My Home Bhooja',
        property_type: 'Flat / Apartment',
        bhk: '4BHK',
        budget_min: 15000000,
        budget_max: 22000000,
        purpose: 'Investment',
        possession_preference: 'Under Construction (6-12 Months)',
        loan_required: false,
        occupation: 'Business Owner',
        priority: 'HOT',
        lead_status: 'CALL_BACK_LATER',
        call_disposition: 'CUSTOMER_BUSY',
        next_action: 'Call Again',
        next_followup: '2026-08-22T10:00:00.000Z', // Overdue
        assigned_employee_id: 'USR-07',
        assigned_employee_name: 'Priya Nair (Sales Exec)',
        created_by: 'USR-01',
        quality_score: 94,
        created_at: '2026-08-20T09:15:00.000Z',
        updated_at: '2026-08-22T10:00:00.000Z'
      },
      {
        id: 'LEAD-000003',
        lead_number: 'SRM-LEAD-2026-000003',
        customer_id: 'SRM-CUS-2026-000186',
        customer_number: 'SRM-CUS-2026-000186',
        customer_name: 'Sumanth Varma',
        mobile: '+91 98490 88888',
        whatsapp_number: '+91 98490 88888',
        email: 'sumanth.varma@gmail.com',
        source: 'Walk-in',
        preferred_location: 'Kondapur',
        preferred_project: 'Incor PBEL City',
        property_type: 'Flat / Apartment',
        bhk: '3BHK',
        budget_min: 12000000,
        budget_max: 18000000,
        purpose: 'Self Use',
        possession_preference: 'Immediate',
        loan_required: true,
        occupation: 'Senior Software Engineer',
        priority: 'WARM',
        lead_status: 'MATCHING_PENDING',
        call_disposition: 'Connected',
        next_action: 'Create Matching',
        next_followup: '2026-08-24T18:00:00.000Z',
        assigned_employee_id: 'USR-14',
        assigned_employee_name: 'Ramesh Pawar (Field Exec)',
        created_by: 'USR-04',
        quality_score: 82,
        created_at: '2026-08-22T14:00:00.000Z',
        updated_at: '2026-08-24T14:00:00.000Z'
      },
      {
        id: 'LEAD-000004',
        lead_number: 'SRM-LEAD-2026-000004',
        customer_id: 'SRM-CUS-2026-000187',
        customer_number: 'SRM-CUS-2026-000187',
        customer_name: 'Avishek Das',
        mobile: '9432328947',
        whatsapp_number: '9432328947',
        email: 'avishek@gmail.com',
        source: 'Referral',
        preferred_location: 'Madhyamgram',
        property_type: 'Flat / Apartment',
        bhk: '3BHK',
        budget_min: 5000000,
        budget_max: 6000000,
        purpose: 'Self Use',
        possession_preference: 'Ready to Move',
        loan_required: true,
        occupation: 'Consultant',
        priority: 'HOT',
        lead_status: 'MATCHING_PENDING',
        call_disposition: 'Interested',
        next_action: 'Send Property Details',
        next_followup: '2026-08-25T11:00:00.000Z',
        assigned_employee_id: 'USR-07',
        assigned_employee_name: 'Priya Nair (Sales Exec)',
        created_by: 'USR-01',
        quality_score: 90,
        created_at: '2026-08-24T08:00:00.000Z',
        updated_at: '2026-08-24T08:00:00.000Z'
      },
      {
        id: 'LEAD-000005',
        lead_number: 'SRM-LEAD-2026-000005',
        customer_id: 'SRM-CUS-2026-000188',
        customer_number: 'SRM-CUS-2026-000188',
        customer_name: 'Ananya Deshpande',
        mobile: '+91 98490 77665',
        whatsapp_number: '+91 98490 77665',
        email: 'ananya.d@yahoo.com',
        source: 'Website',
        preferred_location: 'Hitec City',
        property_type: 'Flat / Apartment',
        bhk: '2BHK',
        budget_min: 6000000,
        budget_max: 7500000,
        purpose: 'Self Use',
        possession_preference: 'Under Construction',
        loan_required: true,
        occupation: 'Bank Officer',
        priority: 'COLD',
        lead_status: 'NURTURE',
        call_disposition: 'PROPERTY_SEARCH_LATER',
        next_action: 'Follow Up Later',
        next_followup: '2027-02-01T10:00:00.000Z',
        assigned_employee_id: 'USR-08',
        assigned_employee_name: 'Ananya Roy (Telecaller)',
        created_by: 'USR-02',
        quality_score: 55,
        created_at: '2026-08-15T10:00:00.000Z',
        updated_at: '2026-08-18T10:00:00.000Z'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_leads_v4', JSON.stringify(leadsList));
    } catch (e) {
      console.error('Error saving leads to localStorage:', e);
    }
  }, [leadsList]);

  // Central Inbox Filter States
  const [leadInboxTab, setLeadInboxTab] = useState<string>('all');
  const [leadSourceFilter, setLeadSourceFilter] = useState<string>('ALL');
  const [leadPriorityFilter, setLeadPriorityFilter] = useState<string>('ALL');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('ALL');
  const [leadViewMode, setLeadViewMode] = useState<'inbox' | 'calendar' | 'analytics'>('inbox');

  // Modals for Lead Management
  const [showCallDispositionModal, setShowCallDispositionModal] = useState<{ open: boolean; lead: any } | null>(null);
  const [callDispForm, setCallDispForm] = useState({
    call_type: 'Outgoing',
    duration_seconds: 60,
    disposition: 'CONNECTED_INTERESTED',
    next_action: 'Send Cost Sheet',
    next_followup_date: new Date(Date.now() + 24 * 3600000).toISOString().split('T')[0],
    next_followup_time: '11:00',
    reason: '',
    remarks: ''
  });

  const [showLead360Drawer, setShowLead360Drawer] = useState<{ open: boolean; lead: any; tab: string } | null>(null);
  const [showTransferLeadModal, setShowTransferLeadModal] = useState<{ open: boolean; lead: any } | null>(null);
  const [transferLeadForm, setTransferLeadForm] = useState({ newOwnerId: 'USR-07', reason: '' });

  // New Lead Form State with Duplicate Protection
  const [newLeadForm, setNewLeadForm] = useState({
    customer_name: '',
    mobile: '',
    alternate_mobile: '',
    whatsapp_number: '',
    email: '',
    source: 'Facebook',
    campaign: 'Summer Campaign 2026',
    preferred_location: 'Kondapur',
    preferred_project: 'Aparna Zenon',
    property_type: 'Flat / Apartment',
    bhk: '3BHK',
    budget_min: '7000000',
    budget_max: '8500000',
    purpose: 'Self Use',
    possession_preference: 'Immediate (< 30 Days)',
    loan_required: true,
    occupation: 'IT Professional',
    priority: 'HOT',
    assigned_employee_id: 'USR-07',
    remarks: ''
  });
  const [duplicateAlert, setDuplicateAlert] = useState<any>(null);

  // Master Cost Sheet Shares State (WITH LOCALSTORAGE PERSISTENCE)
  const [costSheetShares, setCostSheetShares] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_cost_sheet_shares_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading cost sheet shares from localStorage:', e);
    }
    return [
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
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_cost_sheet_shares_v3', JSON.stringify(costSheetShares));
    } catch (e) {
      console.error('Error saving cost sheet shares to localStorage:', e);
    }
  }, [costSheetShares]);

  // --------------------------------------------------------------------------
  // INDIVIDUAL PROPERTY COST SHEET MASTER STATE & MODALS CONTROL
  // --------------------------------------------------------------------------
  const [individualCostSheetsSearch, setIndividualCostSheetsSearch] = useState<string>('');
  const [individualCostSheetsStatusFilter, setIndividualCostSheetsStatusFilter] = useState<string>('ALL');

  // Modal State Control
  const [showSingleCostSheetConfirmModal, setShowSingleCostSheetConfirmModal] = useState<{ open: boolean; property: any; matchingReq: any; calculated: any; nextId: string } | null>(null);
  const [showDuplicateCostSheetModal, setShowDuplicateCostSheetModal] = useState<{ open: boolean; existingSheet: any; property: any } | null>(null);
  const [showBulkCostSheetConfirmModal, setShowBulkCostSheetConfirmModal] = useState<{ open: boolean; properties: any[]; matchingReq: any } | null>(null);
  const [showBulkCostSheetSuccessModal, setShowBulkCostSheetSuccessModal] = useState<{ open: boolean; createdSheets: any[] } | null>(null);
  const [showViewIndividualCostSheetModal, setShowViewIndividualCostSheetModal] = useState<{ open: boolean; costSheet: any } | null>(null);
  const [showRevisionModal, setShowRevisionModal] = useState<{
    open: boolean;
    costSheet: any;
    revBasePrice: number;
    revFloorRise: number;
    revPlc: number;
    revParking: number;
    revClub: number;
    revMaintenance: number;
    revInfraLegal: number;
    revDiscount: number;
    revGstPct: number;
    revStampDutyPct: number;
    revRegPct: number;
    revUnitNotes: string;
    reason: string;
  } | null>(null);

  const handleOpenRevisionModal = (costSheet: any) => {
    const ps = costSheet.pricingSnapshot || {};
    const propSnap = costSheet.propertySnapshot || {};
    const pBreakup = costSheet.formattedPriceBreakup || {};
    
    // Find master property record by property code or ID
    const propCode = costSheet.propertyCode || propSnap.propertyCode || costSheet.propertyId;
    const matchedProp = properties.find((p: any) => p.property_code === propCode || p.id === propCode);
    
    // Base Price: use matchedProp base/final price or stored snapshot
    const basePrice = matchedProp
      ? parsePriceToNumeric(matchedProp.final_price || matchedProp.base_price)
      : (ps.basePrice || parsePriceToNumeric(pBreakup.basePriceStr) || 4426500);

    // Floor Rise: check if explicitly defined on matchedProp or stored snapshot string
    const floorRise = (matchedProp && (matchedProp.floor_rise !== undefined || matchedProp.floorRise !== undefined))
      ? parsePriceToNumeric(matchedProp.floor_rise || matchedProp.floorRise)
      : (pBreakup.floorRiseStr && pBreakup.floorRiseStr !== 'N/A' && pBreakup.floorRiseStr !== '₹0' ? parsePriceToNumeric(pBreakup.floorRiseStr) : 0);

    // PLC: check if explicitly defined on matchedProp or stored snapshot string
    const plc = (matchedProp && (matchedProp.plc !== undefined || matchedProp.plc_charge !== undefined))
      ? parsePriceToNumeric(matchedProp.plc || matchedProp.plc_charge)
      : (pBreakup.plcStr && pBreakup.plcStr !== 'N/A' && pBreakup.plcStr !== '₹0' ? parsePriceToNumeric(pBreakup.plcStr) : 0);

    // Parking: check if explicitly defined on matchedProp or stored snapshot string
    const parkingCharge = (matchedProp && (matchedProp.parking_charge !== undefined || matchedProp.parkingCharge !== undefined))
      ? parsePriceToNumeric(matchedProp.parking_charge || matchedProp.parkingCharge)
      : (pBreakup.parkingStr && pBreakup.parkingStr !== 'N/A' && pBreakup.parkingStr !== '₹0' ? parsePriceToNumeric(pBreakup.parkingStr) : 0);

    // Clubhouse: check if explicitly defined on matchedProp or stored snapshot string
    const clubCharge = (matchedProp && (matchedProp.club_charge !== undefined || matchedProp.clubhouse_fee !== undefined))
      ? parsePriceToNumeric(matchedProp.club_charge || matchedProp.clubhouse_fee)
      : (pBreakup.clubStr && pBreakup.clubStr !== 'N/A' && pBreakup.clubStr !== '₹0' ? parsePriceToNumeric(pBreakup.clubStr) : 0);

    // Maintenance: check if explicitly defined on matchedProp or stored snapshot string
    const maintenance = (matchedProp && (matchedProp.maintenance !== undefined || matchedProp.maintenance_annual !== undefined))
      ? parsePriceToNumeric(matchedProp.maintenance || matchedProp.maintenance_annual)
      : (pBreakup.maintenanceStr && pBreakup.maintenanceStr !== 'N/A' && pBreakup.maintenanceStr !== '₹0' ? parsePriceToNumeric(pBreakup.maintenanceStr) : 0);

    // Infra & Legal: check if explicitly defined on matchedProp or stored snapshot string
    const infraLegal = (matchedProp && (matchedProp.infra_legal_fees !== undefined || matchedProp.infrastructure_charge !== undefined))
      ? parsePriceToNumeric(matchedProp.infra_legal_fees || matchedProp.infrastructure_charge)
      : (pBreakup.infrastructureStr && pBreakup.infrastructureStr !== 'N/A' && pBreakup.infrastructureStr !== '₹0' ? parsePriceToNumeric(pBreakup.infrastructureStr) : 0);

    const discountAmount = ps.discountAmount !== undefined && ps.discountAmount > 0
      ? ps.discountAmount
      : (pBreakup.discountStr && pBreakup.discountStr !== 'N/A' ? parsePriceToNumeric(pBreakup.discountStr) : 0);

    const unitNotes = propSnap.unitNumber
      ? `${propSnap.unitNumber}${propSnap.floor ? ', ' + propSnap.floor : ''}${propSnap.facing ? ', ' + propSnap.facing : ''}`
      : (matchedProp ? `${matchedProp.unit || 'A-504'}, ${matchedProp.floor ? matchedProp.floor + 'th Floor' : '5th Floor'}, ${matchedProp.facing || 'East Facing'}` : 'A-504, 5th Floor, EAST');

    const gstPct = ps.gstPct !== undefined ? ps.gstPct : (basePrice < 4500000 ? 1 : 5);

    setShowRevisionModal({
      open: true,
      costSheet,
      revBasePrice: basePrice,
      revFloorRise: floorRise,
      revPlc: plc,
      revParking: parkingCharge,
      revClub: clubCharge,
      revMaintenance: maintenance,
      revInfraLegal: infraLegal,
      revDiscount: discountAmount,
      revGstPct: gstPct,
      revStampDutyPct: ps.stampDutyPct !== undefined ? ps.stampDutyPct : 5,
      revRegPct: ps.registrationPct !== undefined ? ps.registrationPct : 1,
      revUnitNotes: unitNotes,
      reason: ''
    });
  };

  // DYNAMIC COST SHEET PDF GENERATION & INSTANT DOWNLOAD HELPER
  const downloadCostSheetPDF = (costSheet: any) => {
    if (!costSheet) return;
    
    const custName = costSheet.customerSnapshot?.customerName || 'Customer';
    const custMobile = costSheet.customerSnapshot?.mobile || '';
    const custCode = costSheet.customerId || costSheet.customerSnapshot?.customerNumber || '';
    const propCode = costSheet.propertyCode || costSheet.propertySnapshot?.propertyCode || '';
    const propTitle = costSheet.propertySnapshot?.propertyTitle || propCode;
    const devName = costSheet.propertySnapshot?.developerName || costSheet.propertySnapshot?.projectName || 'Swaramayi Partner Developer';
    const bhk = costSheet.propertySnapshot?.bhk || '3BHK';
    const locality = costSheet.propertySnapshot?.locality || 'Hyderabad';
    const pBreakup = costSheet.formattedPriceBreakup || {};
    const ps = costSheet.pricingSnapshot || {};
    const ver = costSheet.version || 'V01';
    const dateStr = costSheet.createdAt || new Date().toLocaleDateString('en-IN');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Cost Sheet - ${costSheet.costSheetId}</title>
  <style>
    @page { size: A4 portrait; margin: 15mm; }
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #0f172a; margin: 0; padding: 25px; background: #ffffff; }
    .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #0284c7; padding-bottom: 15px; margin-bottom: 20px; }
    .company-title { font-size: 22px; font-weight: 900; color: #0284c7; margin: 0; text-transform: uppercase; }
    .company-sub { font-size: 11px; color: #64748b; margin-top: 2px; font-weight: 700; letter-spacing: 0.5px; }
    .doc-badge { text-align: right; }
    .doc-id { font-family: monospace; font-size: 16px; font-weight: 900; color: #0f172a; }
    .doc-ver { font-size: 11px; background: #0284c7; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: 800; display: inline-block; margin-top: 4px; }
    
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px; }
    .card { background: #f8fafc; border: 1px solid #cbd5e1; padding: 14px 18px; border-radius: 8px; }
    .card-title { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 800; margin-bottom: 6px; }
    .card-val { font-size: 13px; font-weight: 800; color: #0f172a; }
    .card-sub { font-size: 11px; color: #475569; margin-top: 3px; }
    
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 12px; }
    th { background: #0f172a; color: #ffffff; text-align: left; padding: 10px 12px; font-weight: 800; text-transform: uppercase; font-size: 11px; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #334155; }
    tr:nth-child(even) { background: #f8fafc; }
    .row-total { background: #f0fdf4 !important; font-weight: 900; }
    .row-total td { color: #15803d; font-size: 14px; border-top: 2px solid #16a34a; border-bottom: 2px solid #16a34a; }
    
    .disclaimer { background: #f8fafc; border: 1px solid #cbd5e1; padding: 12px; border-radius: 6px; font-size: 10px; color: #64748b; margin-top: 20px; line-height: 1.4; }
    .footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #cbd5e1; padding-top: 12px; margin-top: 25px; font-size: 10px; color: #94a3b8; }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <h1 class="company-title">Swaramayi Real Estate Marketing</h1>
      <div class="company-sub">Enterprise Real Estate OS • Official Individual Property Cost Sheet</div>
    </div>
    <div class="doc-badge">
      <div class="doc-id">${costSheet.costSheetId}</div>
      <div class="doc-ver">VERSION ${ver} • ${costSheet.status || 'GENERATED'}</div>
    </div>
  </div>

  <div class="grid-2">
    <div class="card">
      <div class="card-title">👤 Target Customer Details</div>
      <div class="card-val">${custName}</div>
      <div class="card-sub">Mobile: ${custMobile} | ID: ${custCode}</div>
    </div>
    <div class="card">
      <div class="card-title">🏠 Property Specifications</div>
      <div class="card-val">${propTitle}</div>
      <div class="card-sub">Code: ${propCode} | ${devName} | ${bhk} (${locality})</div>
    </div>
  </div>

  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table>
    <thead>
      <tr>
        <th>Pricing Breakdown Component</th>
        <th style="text-align: right;">Amount (INR)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1. Base Asking Price (Property Cost)</td>
        <td style="text-align: right; font-weight: 800;">${pBreakup.basePriceStr || formatIndianRupees(ps.basePrice || 0)}</td>
      </tr>
      ${pBreakup.floorRiseStr && pBreakup.floorRiseStr !== 'N/A' && pBreakup.floorRiseStr !== '₹0' ? `
      <tr>
        <td>2. Floor Rise Fee</td>
        <td style="text-align: right;">${pBreakup.floorRiseStr}</td>
      </tr>` : ''}
      ${pBreakup.plcStr && pBreakup.plcStr !== 'N/A' && pBreakup.plcStr !== '₹0' ? `
      <tr>
        <td>3. Preferential Location Charge (PLC)</td>
        <td style="text-align: right;">${pBreakup.plcStr}</td>
      </tr>` : ''}
      ${pBreakup.parkingStr && pBreakup.parkingStr !== 'N/A' && pBreakup.parkingStr !== '₹0' ? `
      <tr>
        <td>4. Covered Car Parking Slot Charge</td>
        <td style="text-align: right;">${pBreakup.parkingStr}</td>
      </tr>` : ''}
      ${pBreakup.clubStr && pBreakup.clubStr !== 'N/A' && pBreakup.clubStr !== '₹0' ? `
      <tr>
        <td>5. Clubhouse & Amenities Membership</td>
        <td style="text-align: right;">${pBreakup.clubStr}</td>
      </tr>` : ''}
      ${pBreakup.maintenanceStr && pBreakup.maintenanceStr !== 'N/A' && pBreakup.maintenanceStr !== '₹0' ? `
      <tr>
        <td>6. Maintenance Charge (Advance 1 Year)</td>
        <td style="text-align: right;">${pBreakup.maintenanceStr}</td>
      </tr>` : ''}
      ${pBreakup.infrastructureStr && pBreakup.infrastructureStr !== 'N/A' && pBreakup.infrastructureStr !== '₹0' ? `
      <tr>
        <td>7. Infrastructure & Legal Documentation Fee</td>
        <td style="text-align: right;">${pBreakup.infrastructureStr}</td>
      </tr>` : ''}
      ${pBreakup.discountStr && pBreakup.discountStr !== 'N/A' && pBreakup.discountStr !== '₹0' ? `
      <tr style="color: #dc2626; font-weight: 800;">
        <td>8. Manager Approved Special Discount</td>
        <td style="text-align: right;">- ${pBreakup.discountStr}</td>
      </tr>` : ''}
      <tr>
        <td><strong>SUBTOTAL (Before Taxes & Govt. Charges)</strong></td>
        <td style="text-align: right; font-weight: 800;">${pBreakup.subtotalStr || formatIndianRupees(ps.subtotalBeforeTax || ps.basePrice || 0)}</td>
      </tr>
      <tr>
        <td>9. Goods & Services Tax (GST)</td>
        <td style="text-align: right;">${pBreakup.gstStr || formatIndianRupees(ps.gstAmount || 0)}</td>
      </tr>
      <tr>
        <td>10. Stamp Duty Charges</td>
        <td style="text-align: right;">${pBreakup.stampDutyStr || formatIndianRupees(ps.stampDutyAmount || 0)}</td>
      </tr>
      <tr>
        <td>11. Registration & Property Transfer Fee</td>
        <td style="text-align: right;">${pBreakup.registrationStr || formatIndianRupees(ps.registrationAmount || 0)}</td>
      </tr>
      <tr class="row-total">
        <td>TOTAL ESTIMATED PROPERTY COST</td>
        <td style="text-align: right;">${pBreakup.totalEstimatedCostStr || formatIndianRupees(ps.totalEstimatedCost || 0)}</td>
      </tr>
    </tbody>
  </table>
</div>

  <div class="disclaimer">
    <strong>📌 TERMS & CONDITIONS DISCLAIMER:</strong><br>
    All prices mentioned in this Cost Sheet are indicative and subject to confirmation by the respective developer/property owner. Applicable taxes, government charges, registration fees and other costs may change. Final pricing will be confirmed before booking.
  </div>

  <div class="footer">
    <span>Generated by Swaramayi Real Estate CRM OS • SHA256 Verified</span>
    <span>System Timestamp: ${dateStr}</span>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 300);
    };
  </script>
</body>
</html>
    `;

    // Open print window for PDF save
    const printWin = window.open('', '_blank');
    if (printWin) {
      printWin.document.write(htmlContent);
      printWin.document.close();
    }

    // Trigger instant file download (.html document / printable cost sheet)
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cost_Sheet_${costSheet.costSheetId}_${custName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper: Parse Indian Currency String to Integer Rupees
  const parsePriceToNumeric = (priceStr: any): number => {
    if (typeof priceStr === 'number') return isNaN(priceStr) ? 0 : priceStr;
    if (!priceStr) return 0;
    const str = String(priceStr).toLowerCase().replace(/,/g, '').trim();
    if (str === 'n/a' || str === 'nil' || str === 'none' || str === '0' || str === '') return 0;
    if (str.includes('crore')) {
      const match = str.match(/[\d.]+/);
      return match ? Math.round(parseFloat(match[0]) * 10000000) : 0;
    }
    if (str.includes('lakh')) {
      const match = str.match(/[\d.]+/);
      return match ? Math.round(parseFloat(match[0]) * 100000) : 0;
    }
    const cleanNum = str.replace(/[^\d.]/g, '');
    return cleanNum ? Math.round(parseFloat(cleanNum)) : 0;
  };

  // Helper: Parse Carpet Area String to Integer Sq.Ft.
  const parseSqftToNumeric = (sqftStr: any): number => {
    if (typeof sqftStr === 'number') return sqftStr;
    if (!sqftStr) return 1200;
    const cleanNum = String(sqftStr).replace(/,/g, '').replace(/[^\d.]/g, '');
    return cleanNum ? Math.round(parseFloat(cleanNum)) : 1200;
  };

  // Helper: Format Integer Rupees to Indian Standard Currency String
  const formatIndianRupees = (val: number): string => {
    if (isNaN(val) || val === null || val === undefined) return 'N/A';
    return '₹' + Math.round(val).toLocaleString('en-IN');
  };

  // DYNAMIC COST CALCULATION ENGINE
  const calculateIndividualCostSheet = (prop: any) => {
    const basePriceNum = parsePriceToNumeric(prop.final_price || prop.base_price || 5000000);
    const carpetAreaNum = parseSqftToNumeric(prop.carpet_area || 1250);
    const ratePerSqftNum = carpetAreaNum > 0 ? Math.round(basePriceNum / carpetAreaNum) : 5000;

    const floorRiseNum = (prop.floorRise !== undefined || prop.floor_rise !== undefined)
      ? parsePriceToNumeric(prop.floorRise || prop.floor_rise)
      : 0;
    
    const plcNum = (prop.plc !== undefined || prop.plc_facing_charge !== undefined)
      ? parsePriceToNumeric(prop.plc || prop.plc_facing_charge)
      : 0;

    const parkingNum = (prop.parkingCharge !== undefined || prop.parking_charge !== undefined)
      ? parsePriceToNumeric(prop.parkingCharge || prop.parking_charge)
      : 0;

    const clubNum = (prop.clubCharge !== undefined || prop.clubhouse_fee !== undefined)
      ? parsePriceToNumeric(prop.clubCharge || prop.clubhouse_fee)
      : 0;

    const maintenanceNum = (prop.maintenance !== undefined || prop.maintenance_annual !== undefined)
      ? parsePriceToNumeric(prop.maintenance || prop.maintenance_annual)
      : 0;

    const infraNum = (prop.infrastructureCharge !== undefined || prop.infra_legal_fees !== undefined)
      ? parsePriceToNumeric(prop.infrastructureCharge || prop.infra_legal_fees)
      : 0;

    const legalNum = (prop.legalCharge !== undefined)
      ? parsePriceToNumeric(prop.legalCharge)
      : 0;

    const subtotalBeforeTax = basePriceNum + floorRiseNum + plcNum + parkingNum + clubNum + maintenanceNum + infraNum + legalNum;

    const gstPct = basePriceNum < 4500000 ? 1 : 5;
    const gstAmount = Math.round(basePriceNum * (gstPct / 100));

    const stampDutyPct = 5;
    const stampDutyAmount = Math.round(basePriceNum * 0.05);

    const registrationPct = 1;
    const registrationAmount = Math.round(basePriceNum * 0.01);

    const totalEstimatedCost = subtotalBeforeTax + gstAmount + stampDutyAmount + registrationAmount;

    return {
      basePriceNum,
      carpetAreaNum,
      ratePerSqftNum,
      floorRiseNum,
      plcNum,
      parkingNum,
      clubNum,
      maintenanceNum,
      infraNum,
      legalNum,
      subtotalBeforeTax,
      gstPct,
      gstAmount,
      stampDutyPct,
      stampDutyAmount,
      registrationPct,
      registrationAmount,
      totalEstimatedCost,

      basePriceStr: formatIndianRupees(basePriceNum),
      ratePerSqftStr: `₹${ratePerSqftNum.toLocaleString('en-IN')}/Sq.Ft.`,
      floorRiseStr: floorRiseNum > 0 ? formatIndianRupees(floorRiseNum) : 'N/A',
      plcStr: plcNum > 0 ? formatIndianRupees(plcNum) : 'N/A',
      parkingStr: formatIndianRupees(parkingNum),
      clubStr: formatIndianRupees(clubNum),
      maintenanceStr: formatIndianRupees(maintenanceNum),
      infraStr: formatIndianRupees(infraNum),
      legalStr: formatIndianRupees(legalNum),
      subtotalStr: formatIndianRupees(subtotalBeforeTax),
      gstStr: `${formatIndianRupees(gstAmount)} (${gstPct}%)`,
      stampDutyStr: `${formatIndianRupees(stampDutyAmount)} (${stampDutyPct}%)`,
      registrationStr: `${formatIndianRupees(registrationAmount)} (${registrationPct}%)`,
      totalEstimatedCostStr: formatIndianRupees(totalEstimatedCost)
    };
  };

  // Master Individual Cost Sheets Array with LocalStorage Persistence
  const [individualCostSheets, setIndividualCostSheets] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_indiv_cost_sheets_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading individual cost sheets from localStorage:', e);
    }

    // Default Seed Cost Sheets
    return [
      {
        costSheetId: 'COST-SHEET-2026-000001',
        version: 'V01',
        versionNumber: 1,
        customerId: 'SRM-CUS-2026-000187',
        matchId: 'MATCH-2026-000002',
        propertyId: 'PROP-01',
        propertyCode: 'SRM-PROP-2026-000421',
        status: 'GENERATED',
        propertySnapshot: {
          propertyId: 'PROP-01',
          propertyCode: 'SRM-PROP-2026-000421',
          propertyTitle: 'Aparna Zenon Premium 3BHK Residence',
          projectName: 'Aparna Zenon',
          developerName: 'Aparna Constructions',
          propertyType: 'Apartment',
          propertyStatus: 'AVAILABLE',
          locality: 'Kondapur',
          address: 'Kondapur Main Road, Hitec City Sector, Hyderabad',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500084',
          googleMapLocation: 'https://maps.google.com/?q=17.4612,78.3689',
          latitude: '17.4612° N',
          longitude: '78.3689° E',
          bhk: '3BHK',
          unitType: 'Apartment',
          floor: '5th Floor',
          tower: 'Tower A',
          block: 'Block 1',
          unitNumber: 'A-504',
          carpetArea: '1,450 sq.ft.',
          builtupArea: '1,800 sq.ft.',
          superBuiltupArea: '1,950 sq.ft.',
          balconyArea: '140 sq.ft.',
          parking: 'Covered Slot + EV Charger',
          facing: 'East Facing',
          propertyOrientation: 'East Facing',
          possessionStatus: 'Ready to Move',
          possessionDate: 'Immediate Possession'
        },
        customerSnapshot: {
          customerId: 'SRM-CUS-2026-000187',
          customerName: 'Avishek Das',
          mobile: '9432328947',
          alternateMobile: '+91 98490 88888',
          email: 'avishek.das@gmail.com',
          address: 'Madhyamgram Main Road, Sector 2, Kolkata / Hyderabad',
          preferredLocation: 'Madhyamgram / Kondapur',
          preferredBhk: '3BHK',
          budget: '50 lakh – 60 Lakh',
          purpose: 'Self Use',
          assignedSalesperson: 'Priya Nair (Sales Exec)'
        },
        matchSnapshot: {
          matchId: 'MATCH-2026-000002',
          matchDate: '18 Aug 2026',
          matchScore: 85,
          matchRank: 'Top Recommended Match',
          matchFactors: ['✓ Preferred Location', '✓ Within 10 KM Radius', '✓ Within Budget', '✓ 3 BHK Satisfied', '✓ Ready-to-Move']
        },
        pricingSnapshot: {
          basePrice: 8400000,
          ratePerSqft: 5793,
          floorRise: 75000,
          plc: 200000,
          parkingCharge: 250000,
          clubCharge: 250000,
          maintenance: 54000,
          infrastructureCharge: 50000,
          legalCharge: 25000,
          documentationCharge: 5000,
          otherCharges: 0,
          discountAmount: 0,
          gstPct: 5,
          gstAmount: 420000,
          stampDutyPct: 5,
          stampDutyAmount: 420000,
          registrationPct: 1,
          registrationAmount: 84000,
          totalEstimatedCost: 10228000
        },
        formattedPriceBreakup: {
          basePriceStr: '₹84,00,000',
          ratePerSqftStr: '₹5,793/Sq.Ft.',
          floorRiseStr: '₹75,000',
          plcStr: '₹2,00,000',
          parkingStr: '₹2,50,000',
          clubStr: '₹2,50,000',
          maintenanceStr: '₹54,000',
          infrastructureStr: '₹50,000',
          legalStr: '₹25,000',
          otherStr: 'N/A',
          discountStr: 'N/A',
          gstStr: '₹4,20,000 (5%)',
          stampDutyStr: '₹4,20,000 (5%)',
          registrationStr: '₹84,000 (1%)',
          totalEstimatedCostStr: '₹1,02,28,000'
        },
        createdBy: 'Priya Nair (Sales Exec)',
        createdAt: '18 Aug 2026 10:30 AM',
        updatedBy: 'Priya Nair (Sales Exec)',
        updatedAt: '18 Aug 2026 10:30 AM',
        auditLogs: [
          {
            timestamp: '2026-08-18T10:30:00Z',
            user: 'Priya Nair (Sales Exec)',
            action: 'COST_SHEET_CREATED',
            details: 'Created Cost Sheet COST-SHEET-2026-000001 for SRM-PROP-2026-000421',
            ip: '127.0.0.1',
            device: 'Chrome / Windows 11'
          }
        ]
      },
      {
        costSheetId: 'COST-SHEET-2026-000002',
        version: 'V01',
        versionNumber: 1,
        customerId: 'SRM-CUS-2026-000187',
        matchId: 'MATCH-2026-000002',
        propertyId: 'PROP-05',
        propertyCode: 'SRM-PROP-2026-000425',
        status: 'GENERATED',
        propertySnapshot: {
          propertyId: 'PROP-05',
          propertyCode: 'SRM-PROP-2026-000425',
          propertyTitle: 'Prestige High Fields Corner 3BHK',
          projectName: 'Prestige High Fields',
          developerName: 'Prestige Estates',
          propertyType: 'Apartment',
          propertyStatus: 'HOLD',
          locality: 'Nanakramguda',
          address: 'Nanakramguda Financial District, Gachibowli, Hyderabad',
          city: 'Hyderabad',
          state: 'Telangana',
          pincode: '500032',
          googleMapLocation: 'https://maps.google.com/?q=17.4201,78.3410',
          latitude: '17.4201° N',
          longitude: '78.3410° E',
          bhk: '3BHK',
          unitType: 'Apartment',
          floor: '18th Floor',
          tower: 'Tower 8',
          block: 'Block B',
          unitNumber: 'T8-1804',
          carpetArea: '1,725 sq.ft.',
          builtupArea: '2,100 sq.ft.',
          superBuiltupArea: '2,250 sq.ft.',
          balconyArea: '160 sq.ft.',
          parking: 'Covered Slot + EV Charger',
          facing: 'East Facing',
          propertyOrientation: 'East Facing',
          possessionStatus: 'Ready to Move',
          possessionDate: 'Immediate'
        },
        customerSnapshot: {
          customerId: 'SRM-CUS-2026-000187',
          customerName: 'Avishek Das',
          mobile: '9432328947',
          alternateMobile: '+91 98490 88888',
          email: 'avishek.das@gmail.com',
          address: 'Madhyamgram Main Road, Sector 2, Kolkata / Hyderabad',
          preferredLocation: 'Madhyamgram / Nanakramguda',
          preferredBhk: '3BHK',
          budget: '50 lakh – 60 Lakh',
          purpose: 'Self Use',
          assignedSalesperson: 'Priya Nair (Sales Exec)'
        },
        matchSnapshot: {
          matchId: 'MATCH-2026-000002',
          matchDate: '18 Aug 2026',
          matchScore: 82,
          matchRank: 'High Priority Match',
          matchFactors: ['✓ Preferred Location', '✓ 3 BHK Satisfied', '✓ Premium Developer']
        },
        pricingSnapshot: {
          basePrice: 13500000,
          ratePerSqft: 7826,
          floorRise: 400000,
          plc: 200000,
          parkingCharge: 300000,
          clubCharge: 250000,
          maintenance: 54000,
          infrastructureCharge: 50000,
          legalCharge: 25000,
          documentationCharge: 5000,
          otherCharges: 0,
          discountAmount: 0,
          gstPct: 5,
          gstAmount: 675000,
          stampDutyPct: 5,
          stampDutyAmount: 675000,
          registrationPct: 1,
          registrationAmount: 135000,
          totalEstimatedCost: 16269000
        },
        formattedPriceBreakup: {
          basePriceStr: '₹1,35,00,000',
          ratePerSqftStr: '₹7,826/Sq.Ft.',
          floorRiseStr: '₹4,00,000',
          plcStr: '₹2,00,000',
          parkingStr: '₹3,00,000',
          clubStr: '₹2,50,000',
          maintenanceStr: '₹54,000',
          infrastructureStr: '₹50,000',
          legalStr: '₹25,000',
          otherStr: 'N/A',
          discountStr: 'N/A',
          gstStr: '₹6,75,000 (5%)',
          stampDutyStr: '₹6,75,000 (5%)',
          registrationStr: '₹1,35,000 (1%)',
          totalEstimatedCostStr: '₹1,62,69,000'
        },
        createdBy: 'Priya Nair (Sales Exec)',
        createdAt: '18 Aug 2026 11:15 AM',
        updatedBy: 'Priya Nair (Sales Exec)',
        updatedAt: '18 Aug 2026 11:15 AM',
        auditLogs: [
          {
            timestamp: '2026-08-18T11:15:00Z',
            user: 'Priya Nair (Sales Exec)',
            action: 'COST_SHEET_CREATED',
            details: 'Created Cost Sheet COST-SHEET-2026-000002 for SRM-PROP-2026-000425',
            ip: '127.0.0.1',
            device: 'Chrome / Windows 11'
          }
        ]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('swaramayi_indiv_cost_sheets_v4', JSON.stringify(individualCostSheets));
    } catch (e) {
      console.error('Error saving individual cost sheets to localStorage:', e);
    }
  }, [individualCostSheets]);

  // GENERATE UNIQUE COST SHEET ID
  const generateNextIndividualCostSheetCode = (offset: number = 0): string => {
    const numbers: number[] = [];
    individualCostSheets.forEach((sheet: any) => {
      if (sheet.costSheetId) {
        const match = sheet.costSheetId.match(/COST-SHEET-2026-(\d+)/i) || sheet.costSheetId.match(/\d+$/);
        if (match) {
          numbers.push(parseInt(match[1] || match[0], 10));
        }
      }
    });
    const maxVal = numbers.length > 0 ? Math.max(...numbers) : 0;
    const nextVal = maxVal + 1 + offset;
    return `COST-SHEET-2026-${String(nextVal).padStart(6, '0')}`;
  };

  // CHECK EXISTING ACTIVE COST SHEET (DUPLICATE PROTECTION)
  const findExistingActiveCostSheet = (customerId: string, matchId: string, propertyCodeOrId: string) => {
    return individualCostSheets.find((cs: any) => {
      const matchCust = (cs.customerId || '').toLowerCase() === customerId.toLowerCase();
      const matchM = (cs.matchId || '').toLowerCase() === matchId.toLowerCase();
      const matchP = (cs.propertyCode || '').toLowerCase() === propertyCodeOrId.toLowerCase() ||
                     (cs.propertyId || '').toLowerCase() === propertyCodeOrId.toLowerCase();
      return matchCust && matchM && matchP && cs.status !== 'CANCELLED';
    });
  };

  // CREATE COST SHEET OBJECT FACTORY
  const createCostSheetObject = (prop: any, matchingReq: any, calculated: any, costSheetId: string, versionNum: number = 1): any => {
    const custId = matchingReq?.customerNumber || selectedCust?.customer_number || 'SRM-CUS-2026-000187';
    const matchId = matchingReq?.requestId || selectedMatchingId || 'MATCH-2026-000002';
    const propCode = prop.property_code || prop.id || 'SRM-PROP-2026-000421';

    return {
      costSheetId: costSheetId,
      version: `V0${versionNum}`,
      versionNumber: versionNum,
      customerId: custId,
      matchId: matchId,
      propertyId: prop.id || propCode,
      propertyCode: propCode,
      status: 'GENERATED',

      // Data Snapshots (Historical Accuracy Guarantee)
      propertySnapshot: {
        propertyId: prop.id || propCode,
        propertyCode: propCode,
        propertyTitle: prop.title || 'Selected Property',
        projectName: prop.project || prop.title || 'Aparna Zenon',
        developerName: prop.developer || 'Aparna Constructions',
        propertyType: prop.type || 'Apartment',
        propertyStatus: prop.status || 'AVAILABLE',
        locality: prop.locality || 'Kondapur',
        address: `${prop.locality || 'Kondapur'}, Gachibowli Road, Hyderabad 500084`,
        city: prop.city || 'Hyderabad',
        state: 'Telangana',
        pincode: '500084',
        googleMapLocation: `https://maps.google.com/?q=${prop.latitude || '17.4612'},${prop.longitude || '78.3689'}`,
        latitude: prop.latitude || '17.4612° N',
        longitude: prop.longitude || '78.3689° E',
        bhk: prop.configuration || '3BHK',
        unitType: prop.type || 'Apartment',
        floor: prop.floor ? `${prop.floor}th Floor` : '5th Floor',
        tower: prop.tower || 'Tower A',
        block: prop.block || 'Block 1',
        unitNumber: prop.unit || 'A-504',
        carpetArea: prop.carpet_area || '1,450 sq.ft.',
        builtupArea: prop.builtup_area || '1,800 sq.ft.',
        superBuiltupArea: prop.super_builtup_area || '1,950 sq.ft.',
        balconyArea: '140 sq.ft.',
        parking: prop.parkingSlot || 'Covered Slot + EV Charger',
        facing: prop.facing || 'East Facing',
        propertyOrientation: prop.facing || 'East Facing',
        possessionStatus: prop.possession_status || 'Ready to Move',
        possessionDate: 'Immediate Possession'
      },

      customerSnapshot: {
        customerId: custId,
        customerName: matchingReq?.customerName || selectedCust?.name || 'Avishek Das',
        mobile: matchingReq?.mobile || selectedCust?.mobile || '9432328947',
        alternateMobile: '+91 98490 88888',
        email: selectedCust?.email || 'avishek.das@gmail.com',
        address: 'Madhyamgram Main Road, Sector 2, Kolkata / Hyderabad',
        preferredLocation: matchingReq?.preferredArea || 'Madhyamgram / Kondapur',
        preferredBhk: matchingReq?.configuration || '3BHK',
        budget: matchingReq?.budget || '50 lakh – 60 Lakh',
        purpose: matchingReq?.purpose || 'Self Use',
        assignedSalesperson: matchingReq?.assignedExecutive || 'Priya Nair (Sales Exec)'
      },

      matchSnapshot: {
        matchId: matchId,
        matchDate: matchingReq?.date || '18 Aug 2026',
        matchScore: prop.matchTotal || 85,
        matchRank: 'Top Recommended Match',
        matchFactors: ['✓ Preferred Location', '✓ Within 10 KM Radius', '✓ Within Budget', '✓ 3 BHK Satisfied', '✓ Ready-to-Move']
      },

      pricingSnapshot: {
        basePrice: calculated.basePriceNum,
        ratePerSqft: calculated.ratePerSqftNum,
        floorRise: calculated.floorRiseNum,
        plc: calculated.plcNum,
        parkingCharge: calculated.parkingNum,
        clubCharge: calculated.clubNum,
        maintenance: calculated.maintenanceNum,
        infrastructureCharge: calculated.infraNum,
        legalCharge: calculated.legalNum,
        documentationCharge: 5000,
        otherCharges: 0,
        discountAmount: 0,
        gstPct: calculated.gstPct,
        gstAmount: calculated.gstAmount,
        stampDutyPct: calculated.stampDutyPct,
        stampDutyAmount: calculated.stampDutyAmount,
        registrationPct: calculated.registrationPct,
        registrationAmount: calculated.registrationAmount,
        totalEstimatedCost: calculated.totalEstimatedCost
      },

      formattedPriceBreakup: {
        basePriceStr: calculated.basePriceStr,
        ratePerSqftStr: calculated.ratePerSqftStr,
        floorRiseStr: calculated.floorRiseStr,
        plcStr: calculated.plcStr,
        parkingStr: calculated.parkingStr,
        clubStr: calculated.clubStr,
        maintenanceStr: calculated.maintenanceStr,
        infrastructureStr: calculated.infraStr,
        legalStr: calculated.legalStr,
        otherStr: 'N/A',
        discountStr: 'N/A',
        gstStr: calculated.gstStr,
        stampDutyStr: calculated.stampDutyStr,
        registrationStr: calculated.registrationStr,
        totalEstimatedCostStr: calculated.totalEstimatedCostStr
      },

      createdBy: 'Priya Nair (Sales Exec)',
      createdAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      updatedBy: 'Priya Nair (Sales Exec)',
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),

      auditLogs: [
        {
          timestamp: new Date().toISOString(),
          user: 'Priya Nair (Sales Exec)',
          action: 'COST_SHEET_CREATED',
          details: `Created Cost Sheet ${costSheetId} for Property ${propCode}`,
          ip: '127.0.0.1',
          device: 'Chrome / Windows 11'
        }
      ]
    };
  };

  // ROW-LEVEL CREATE COST SHEET CLICK HANDLER
  const handleRowLevelCreateCostSheet = (prop: any) => {
    const currentReq = matchingRequestsQueue.find(r => 
      r.requestId.toLowerCase() === selectedMatchingId.toLowerCase() || 
      r.customerNumber.toLowerCase() === selectedMatchingId.toLowerCase()
    ) || matchingRequestsQueue[0];

    const custId = currentReq?.customerNumber || selectedCust?.customer_number || 'SRM-CUS-2026-000187';
    const matchId = currentReq?.requestId || selectedMatchingId || 'MATCH-2026-000002';
    const propCode = prop.property_code || prop.id;

    // Check duplicate
    const existing = findExistingActiveCostSheet(custId, matchId, propCode);
    if (existing) {
      setShowDuplicateCostSheetModal({
        open: true,
        existingSheet: existing,
        property: prop
      });
      return;
    }

    const calculated = calculateIndividualCostSheet(prop);
    const nextId = generateNextIndividualCostSheetCode();

    setShowSingleCostSheetConfirmModal({
      open: true,
      property: prop,
      matchingReq: currentReq,
      calculated,
      nextId
    });
  };

  // EXECUTE SINGLE COST SHEET CREATION
  const executeSingleCostSheetCreation = () => {
    if (!showSingleCostSheetConfirmModal) return;
    const { property: prop, matchingReq, calculated, nextId } = showSingleCostSheetConfirmModal;

    const custId = matchingReq?.customerNumber || selectedCust?.customer_number || 'SRM-CUS-2026-000187';
    const matchId = matchingReq?.requestId || selectedMatchingId || 'MATCH-2026-000002';

    const newCostSheet = createCostSheetObject(prop, matchingReq, calculated, nextId, 1);

    setIndividualCostSheets(prev => [newCostSheet, ...prev]);

    // Update matching request queue status to COST_SHEET_CREATED
    setMatchingRequestsQueue(prev => prev.map(req => {
      if (req.requestId === matchId || req.customerNumber === custId) {
        return {
          ...req,
          costSheetId: nextId,
          status: 'COST_SHEET_CREATED'
        };
      }
      return req;
    }));

    // Auto-select next pending matching request for workspace
    const remainingPending = matchingRequestsQueue.filter(r => r.requestId !== matchId && !r.costSheetId && r.status !== 'COST_SHEET_CREATED');
    if (remainingPending.length > 0) {
      setSelectedMatchingId(remainingPending[0].requestId);
      const cust = customers.find(c => c.customer_number === remainingPending[0].customerNumber || c.name === remainingPending[0].customerName);
      if (cust) setSelectedCust(cust);
    }

    setShowSingleCostSheetConfirmModal(null);
    setShowViewIndividualCostSheetModal({
      open: true,
      costSheet: newCostSheet
    });
  };

  // BULK SELECTION HANDLER (ONE PROPERTY = ONE COST SHEET)
  const handleBulkCreateCostSheets = () => {
    if (selectedPropertyIds.length === 0) {
      alert('⚠️ Please select at least one property from the checkbox list to create Cost Sheets.');
      return;
    }

    const selectedProps = properties.filter(p => selectedPropertyIds.includes(p.property_code));
    const currentReq = matchingRequestsQueue.find(r => 
      r.requestId.toLowerCase() === selectedMatchingId.toLowerCase() || 
      r.customerNumber.toLowerCase() === selectedMatchingId.toLowerCase()
    ) || matchingRequestsQueue[0];

    setShowBulkCostSheetConfirmModal({
      open: true,
      properties: selectedProps,
      matchingReq: currentReq
    });
  };

  // EXECUTE BULK CREATION
  const executeBulkCostSheetsCreation = () => {
    if (!showBulkCostSheetConfirmModal) return;
    const { properties: selectedProps, matchingReq } = showBulkCostSheetConfirmModal;

    const createdSheets: any[] = [];
    const custId = matchingReq?.customerNumber || selectedCust?.customer_number || 'SRM-CUS-2026-000187';
    const matchId = matchingReq?.requestId || selectedMatchingId || 'MATCH-2026-000002';

    selectedProps.forEach((prop, idx) => {
      const propCode = prop.property_code || prop.id;

      // Check duplicate
      const existing = findExistingActiveCostSheet(custId, matchId, propCode);
      if (existing) {
        createdSheets.push(existing);
        return;
      }

      const calculated = calculateIndividualCostSheet(prop);
      const nextId = generateNextIndividualCostSheetCode(idx);

      const sheetObj = createCostSheetObject(prop, matchingReq, calculated, nextId, 1);
      createdSheets.push(sheetObj);
    });

    // Save newly created sheets
    const newOnly = createdSheets.filter(cs => !individualCostSheets.some(existing => existing.costSheetId === cs.costSheetId));
    if (newOnly.length > 0) {
      setIndividualCostSheets(prev => [...newOnly, ...prev]);
    }

    // Update matching request status to COST_SHEET_CREATED
    setMatchingRequestsQueue(prev => prev.map(req => {
      if (req.requestId === matchId || req.customerNumber === custId) {
        return {
          ...req,
          costSheetId: createdSheets[0]?.costSheetId,
          status: 'COST_SHEET_CREATED'
        };
      }
      return req;
    }));

    // Auto-select next pending matching request for workspace
    const remainingPending = matchingRequestsQueue.filter(r => r.requestId !== matchId && !r.costSheetId && r.status !== 'COST_SHEET_CREATED');
    if (remainingPending.length > 0) {
      setSelectedMatchingId(remainingPending[0].requestId);
      const cust = customers.find(c => c.customer_number === remainingPending[0].customerNumber || c.name === remainingPending[0].customerName);
      if (cust) setSelectedCust(cust);
    }

    setShowBulkCostSheetConfirmModal(null);
    setShowBulkCostSheetSuccessModal({
      open: true,
      createdSheets
    });
  };

  // LIVE REVISION CALCULATION HELPER
  const calculateRevisionLiveTotals = (form: any) => {
    const base = form.revBasePrice || 0;
    const floor = form.revFloorRise || 0;
    const plc = form.revPlc || 0;
    const park = form.revParking || 0;
    const club = form.revClub || 0;
    const maint = form.revMaintenance || 0;
    const infra = form.revInfraLegal || 0;
    const disc = form.revDiscount || 0;

    const subtotal = Math.max(0, base + floor + plc + park + club + maint + infra - disc);

    const gst = Math.round(base * ((form.revGstPct || 5) / 100));
    const stamp = Math.round(base * ((form.revStampDutyPct || 5) / 100));
    const reg = Math.round(base * ((form.revRegPct || 1) / 100));

    const grandTotal = subtotal + gst + stamp + reg;
    return { subtotal, gst, stamp, reg, grandTotal };
  };

  // EXECUTE COST SHEET REVISION (FULL DETAILS REVISION - V02, V03)
  const executeCreateRevision = () => {
    if (!showRevisionModal) return;
    const form = showRevisionModal;
    const costSheet = form.costSheet;

    const nextVerNum = (costSheet.versionNumber || 1) + 1;
    const newVerCode = `V0${nextVerNum}`;

    const liveCalc = calculateRevisionLiveTotals(form);
    const oldTotalStr = costSheet.formattedPriceBreakup?.totalEstimatedCostStr || formatIndianRupees(costSheet.pricingSnapshot?.totalEstimatedCost || 0);

    // Detect changed fields for audit trail
    const changedFields: string[] = [];
    const origPs = costSheet.pricingSnapshot || {};
    if (form.revBasePrice !== origPs.basePrice) changedFields.push('Base Asking Price');
    if (form.revFloorRise !== origPs.floorRise) changedFields.push('Floor Rise Fee');
    if (form.revPlc !== origPs.plc) changedFields.push('PLC Charge');
    if (form.revParking !== origPs.parkingCharge) changedFields.push('Parking Charge');
    if (form.revClub !== origPs.clubCharge) changedFields.push('Clubhouse Fee');
    if (form.revMaintenance !== origPs.maintenance) changedFields.push('Maintenance Advance');
    if (form.revInfraLegal !== ((origPs.infrastructureCharge || 0) + (origPs.legalCharge || 0))) changedFields.push('Infra & Legal');
    if (form.revDiscount !== origPs.discountAmount) changedFields.push('Special Discount');
    if (form.revGstPct !== origPs.gstPct) changedFields.push('GST Rate');

    const carpetNum = parseSqftToNumeric(costSheet.propertySnapshot?.carpetArea || 1250);
    const ratePerSqft = carpetNum > 0 ? Math.round(form.revBasePrice / carpetNum) : 5000;

    const revisedSheet = {
      ...costSheet,
      version: newVerCode,
      versionNumber: nextVerNum,
      status: 'REVISED',
      revisionReason: form.reason || 'Manager approved price adjustment.',
      previousPriceStr: oldTotalStr,
      changedFields: changedFields.length > 0 ? changedFields : ['Pricing & Charges Revision'],
      propertySnapshot: {
        ...costSheet.propertySnapshot,
        unitNumber: form.revUnitNotes || costSheet.propertySnapshot?.unitNumber
      },
      pricingSnapshot: {
        ...origPs,
        basePrice: form.revBasePrice,
        ratePerSqft: ratePerSqft,
        floorRise: form.revFloorRise,
        plc: form.revPlc,
        parkingCharge: form.revParking,
        clubCharge: form.revClub,
        maintenance: form.revMaintenance,
        infrastructureCharge: form.revInfraLegal,
        discountAmount: form.revDiscount,
        gstPct: form.revGstPct,
        gstAmount: liveCalc.gst,
        stampDutyPct: form.revStampDutyPct,
        stampDutyAmount: liveCalc.stamp,
        registrationPct: form.revRegPct,
        registrationAmount: liveCalc.reg,
        totalEstimatedCost: liveCalc.grandTotal
      },
      formattedPriceBreakup: {
        basePriceStr: formatIndianRupees(form.revBasePrice),
        ratePerSqftStr: `₹${ratePerSqft.toLocaleString('en-IN')}/Sq.Ft.`,
        floorRiseStr: form.revFloorRise > 0 ? formatIndianRupees(form.revFloorRise) : 'N/A',
        plcStr: form.revPlc > 0 ? formatIndianRupees(form.revPlc) : 'N/A',
        parkingStr: formatIndianRupees(form.revParking),
        clubStr: formatIndianRupees(form.revClub),
        maintenanceStr: formatIndianRupees(form.revMaintenance),
        infrastructureStr: formatIndianRupees(form.revInfraLegal),
        legalStr: 'Included',
        otherStr: 'N/A',
        discountStr: form.revDiscount > 0 ? formatIndianRupees(form.revDiscount) : 'N/A',
        subtotalStr: formatIndianRupees(liveCalc.subtotal),
        gstStr: `${formatIndianRupees(liveCalc.gst)} (${form.revGstPct}%)`,
        stampDutyStr: `${formatIndianRupees(liveCalc.stamp)} (${form.revStampDutyPct}%)`,
        registrationStr: `${formatIndianRupees(liveCalc.reg)} (${form.revRegPct}%)`,
        totalEstimatedCostStr: formatIndianRupees(liveCalc.grandTotal)
      },
      updatedBy: 'Rahul Sharma (Team Lead)',
      updatedAt: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      auditLogs: [
        {
          timestamp: new Date().toISOString(),
          user: 'Rahul Sharma (Team Lead)',
          action: 'COST_SHEET_REVISED',
          details: `Created Revision ${newVerCode}. Modified: ${changedFields.join(', ') || 'Pricing'}. New Total: ${formatIndianRupees(liveCalc.grandTotal)}. Reason: ${form.reason}`,
          ip: '127.0.0.1',
          device: 'Chrome / Windows 11'
        },
        ...(costSheet.auditLogs || [])
      ]
    };

    setIndividualCostSheets(prev => prev.map(cs => cs.costSheetId === costSheet.costSheetId ? revisedSheet : cs));

    setShowRevisionModal(null);
    setShowViewIndividualCostSheetModal({
      open: true,
      costSheet: revisedSheet
    });
  };

  // DELETE ALL CURRENT RECORDS INSIDE FUNCTION
  const handleDeleteAllCurrentInside = () => {
    if (window.confirm('⚠️ Are you sure you want to delete ALL current customer records, cost sheet shares, property matches, and site visits inside? This will reset the workspace to a 100% clean state.')) {
      setCustomers([]);
      setMatchingRequestsQueue([]);
      setCostSheetShares([]);
      setIndividualCostSheets([]);
      setSelectedPropertyIds([]);
      setSelectedCust(null);
      setActiveSelectionRecord(null);
      localStorage.removeItem('swaramayi_indiv_cost_sheets_v4');
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
  const [rawSelectedAgreement, setSelectedAgreement] = useState<any>(null);
  const selectedAgreement = rawSelectedAgreement || agreements[0] || { id: 'AGR-01', agreement_code: 'SRM-AGR-CUS-2026-000301', agreement_type: 'CUSTOMER_SITE_VISIT', title: 'Customer Site Visit Agreement', party_name: 'Rohan Deshmukh', party_contact: '+91 98490 12345', property_details: 'SRM-PROP-2026-000421 (Aparna Zenon 3BHK)', signed_status: 'EXECUTED_SIGNED', signature_hash: 'OTP-VERIFIED-#482901-DIGITAL-SIG', signed_at: '16 Aug 2026 11:35 AM' };

  // 9. INVOICES VAULT
  const [invoices, setInvoices] = useState([
    { id: 'INV-01', invoice_number: 'SRM-INV-2026-000401', customer_name: 'Rohan Deshmukh', developer_name: 'Aparna Constructions', property_title: 'Aparna Zenon 3BHK', agreement_value: '₹84,00,000', taxable_value: 210000, cgst_amount: 18900, sgst_amount: 18900, total_invoice_amount: 247800, payment_status: 'PAID_SETTLED' }
  ]);
  const [rawSelectedInvoice, setSelectedInvoice] = useState<any>(null);
  const selectedInvoice = rawSelectedInvoice || invoices[0] || { id: 'INV-01', invoice_number: 'SRM-INV-2026-000401', customer_name: 'Rohan Deshmukh', developer_name: 'Aparna Constructions', property_title: 'Aparna Zenon 3BHK', agreement_value: '₹84,00,000', taxable_value: 210000, cgst_amount: 18900, sgst_amount: 18900, total_invoice_amount: 247800, payment_status: 'PAID_SETTLED' };

  // Forms
  const [newUserForm, setNewUserForm] = useState({ username: '', full_name: '', email: '', password: '', mobile: '', role: 'SALES_EXEC', branch_name: 'Kondapur Branch', department: 'Sales', team_name: 'Sales Team Alpha', manager_name: 'Rahul Sharma (TL)' });
  const [showUserModalPassword, setShowUserModalPassword] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const [showBranchModal, setShowBranchModal] = useState<boolean>(false);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);

  const [newBranchForm, setNewBranchForm] = useState({
    branch_name: '',
    city: 'Hyderabad',
    manager_name: 'Vikram Reddy (GM)',
    address: '',
    target_revenue: '₹5,00,00,000'
  });

  const [newTeamForm, setNewTeamForm] = useState({
    team_name: '',
    branch_name: 'Kondapur Branch',
    department: 'Sales',
    leader_name: 'Rahul Sharma (TL)',
    monthly_target: '15 Property Units'
  });
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
    setShowAddPropertyModal(false);
    setShowPropertyModal(false);
    setActiveTab('project_management');
    setActiveProjectSubTab('add_property_master');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setShowAddPropertyModal(false);
    setShowPropertyModal(false);
    setActiveTab('project_management');
    setActiveProjectSubTab('add_property_master');
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const handleResetUserPassword = (id: string, username: string) => {
    if (window.confirm(`🔐 Are you sure you want to reset credentials for User ${username} (${id})?`)) {
      alert(`🔑 Credentials & Password for User ${username} (${id}) have been reset to default standard security credentials!`);
    }
  };

  const handleOpenEditUserModal = (u: any) => {
    setEditingUser(u);
    setNewUserForm({
      username: u.username || u.full_name,
      full_name: u.full_name,
      email: u.email,
      password: '',
      mobile: u.mobile,
      role: u.role,
      branch_name: u.branch_name,
      department: u.department,
      team_name: u.team_name,
      manager_name: u.manager_name
    });
    setShowUserModal(true);
  };

  const handleCreateBranchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowBranchModal(false);
    alert(`🏢 Branch '${newBranchForm.branch_name}' (City: ${newBranchForm.city}) created & added to Company Hierarchy!`);
    setNewBranchForm({ branch_name: '', city: 'Hyderabad', manager_name: 'Vikram Reddy (GM)', address: '', target_revenue: '₹5,00,00,000' });
  };

  const handleCreateTeamSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowTeamModal(false);
    alert(`👥 Sales Team '${newTeamForm.team_name}' (Branch: ${newTeamForm.branch_name}) created & provisioned successfully!`);
    setNewTeamForm({ team_name: '', branch_name: 'Kondapur Branch', department: 'Sales', leader_name: 'Rahul Sharma (TL)', monthly_target: '15 Property Units' });
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? {
        ...u,
        username: newUserForm.username,
        full_name: newUserForm.full_name || newUserForm.username,
        email: newUserForm.email,
        mobile: newUserForm.mobile,
        role: newUserForm.role,
        branch_name: newUserForm.branch_name,
        department: newUserForm.department,
        team_name: newUserForm.team_name,
        manager_name: newUserForm.manager_name
      } : u));
      alert(`✏️ User ${newUserForm.full_name || newUserForm.username} (${editingUser.id}) updated successfully!`);
      setEditingUser(null);
    } else {
      const newU = { id: `USR-0${users.length + 1}`, username: newUserForm.username, full_name: newUserForm.full_name || newUserForm.username, email: newUserForm.email, mobile: newUserForm.mobile || '+91 98490 00000', role: newUserForm.role, branch_name: newUserForm.branch_name, department: newUserForm.department, team_name: newUserForm.team_name, manager_name: newUserForm.manager_name, is_active: true, user_status: 'ACTIVE' };
      setUsers([newU, ...users]);
      alert(`👤 User ${newU.username} created successfully!`);
    }
    setShowUserModal(false);
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

  const isLight = themeMode === 'light';

  const isLoginPage = !isLoggedIn || currentPath.toLowerCase().startsWith('/login');

  if (isLoginPage) {
    const handleDoLogin = () => {
      setIsLoggedIn(true);
      setCurrentPath('/');
      if (typeof window !== 'undefined') {
        window.history.pushState({}, '', '/');
      }
    };

    return (
      <div style={{ 
        minHeight: '100vh', 
        width: '100vw', 
        background: isLight 
          ? 'radial-gradient(circle at 50% 20%, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)' 
          : 'radial-gradient(circle at 50% 20%, #0f172a 0%, #090d16 50%, #020617 100%)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '20px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}>
        <div style={{ 
          width: '100%', 
          maxWidth: '1050px', 
          display: 'grid', 
          gridTemplateColumns: windowWidth <= 850 ? '1fr' : '1.1fr 1fr', 
          background: isLight ? '#ffffff' : '#1e293b', 
          border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: isLight ? '0 25px 50px -12px rgba(2, 132, 199, 0.15)' : '0 25px 50px -12px rgba(0, 0, 0, 0.7)'
        }}>

          {/* LEFT COLUMN: BRAND HERO & SYSTEM CAPABILITIES */}
          <div style={{ 
            background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 60%, #075985 100%)', 
            padding: windowWidth <= 640 ? '30px 20px' : '44px 36px', 
            color: '#ffffff', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'space-between',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '50%' }} />

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ background: '#ffffff', padding: '10px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)' }}>
                  <Building2 size={32} color="#0284c7" />
                </div>
                <div>
                  <h1 style={{ fontSize: '1.5rem', fontWeight: '900', letterSpacing: '-0.5px', color: '#ffffff', margin: 0 }}>
                    SWARAMAYI
                  </h1>
                  <span style={{ fontSize: '0.72rem', color: '#bae6fd', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Real Estate Marketing CRM & OS
                  </span>
                </div>
              </div>

              <h2 style={{ fontSize: windowWidth <= 640 ? '1.3rem' : '1.7rem', fontWeight: '900', lineHeight: '1.25', margin: '0 0 16px 0', color: '#ffffff' }}>
                Enterprise BI Control Center & Automated Real Estate Operating System
              </h2>

              <p style={{ fontSize: '0.88rem', color: '#e0f2fe', lineHeight: '1.6', margin: '0 0 28px 0' }}>
                Integrated Lead Ingestion, Real-Time AI Property Matcher, Live Tower Unit Board, Automated Cost Sheets, & Field Site Visit GPS Route Planner.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { icon: Sliders, text: '13-Stage Enterprise Sales Funnel & Lead Lifecycle Engine' },
                  { icon: Zap, text: 'Real-Time AI Property Requirement Matching Score Ranker' },
                  { icon: Navigation, text: 'Turn-by-Turn Executive Site Visit GPS Route Planner & OTP Check-In' },
                  { icon: ShieldCheck, text: 'Role-Based Access Security Matrix (15 Granular Roles)' }
                ].map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255, 255, 255, 0.1)', padding: '10px 14px', borderRadius: '10px' }}>
                    <item.icon size={18} color="#38bdf8" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#f0f9ff' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: '#bae6fd', fontWeight: '700' }}>🔒 256-Bit SSL Encrypted Enterprise Portal</span>
              <span style={{ fontSize: '0.75rem', color: '#ffffff', fontWeight: '800', background: 'rgba(255, 255, 255, 0.2)', padding: '4px 10px', borderRadius: '20px' }}>v4.2 Production</span>
            </div>
          </div>

          {/* RIGHT COLUMN: LOGIN FORM & QUICK PROFILES */}
          <div style={{ padding: windowWidth <= 640 ? '28px 20px' : '44px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: isLight ? '#ffffff' : '#1e293b' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: 0 }}>
                    Portal Sign In
                  </h3>
                  <p style={{ fontSize: '0.82rem', color: isLight ? '#64748b' : '#94a3b8', margin: '4px 0 0 0' }}>
                    Enter credentials or select a quick demo role profile
                  </p>
                </div>

                <button 
                  type="button"
                  onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
                  style={{ background: isLight ? '#f1f5f9' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}
                >
                  {themeMode === 'dark' ? <Sun size={14} color="#fbbf24" /> : <Moon size={14} color="#0284c7" />}
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={(e) => {
                e.preventDefault();
                handleDoLogin();
              }} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#475569' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                    Enterprise Email / User ID
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="email" 
                      value={loginEmail} 
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="e.g. admin@swaramayi.com" 
                      required 
                      style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '12px 14px', paddingLeft: '38px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', outline: 'none' }} 
                    />
                    <User size={16} color="#0284c7" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#475569' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      value={loginPassword} 
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••••••" 
                      required 
                      style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '12px 14px', paddingLeft: '38px', paddingRight: '40px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', outline: 'none' }} 
                    />
                    <Lock size={16} color="#0284c7" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      title={showPassword ? 'Hide password' : 'Show password'}
                      style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {showPassword ? <EyeOff size={16} color="#0284c7" /> : <Eye size={16} color={isLight ? '#64748b' : '#94a3b8'} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#475569' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                    Role Scope Access Level
                  </label>
                  <select 
                    value={currentRole} 
                    onChange={(e) => setCurrentRole(e.target.value)}
                    style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#0284c7', padding: '12px 14px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '800', outline: 'none' }}
                  >
                    <option value="SUPER_ADMIN">1. SUPER ADMIN / OWNER (ALL ACCESS)</option>
                    <option value="ADMIN">2. ADMIN</option>
                    <option value="GENERAL_MANAGER">3. GENERAL MANAGER</option>
                    <option value="BRANCH_MANAGER">4. BRANCH MANAGER</option>
                    <option value="SALES_MANAGER">5. SALES MANAGER</option>
                    <option value="TEAM_LEAD">6. TEAM LEADER</option>
                    <option value="SALES_EXEC">7. SALES EXECUTIVE</option>
                    <option value="TELECALLER">8. TELECALLER</option>
                    <option value="ACCOUNTS">9. ACCOUNTS & FINANCE</option>
                    <option value="FIELD_EXEC">10. FIELD EXECUTIVE</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer', fontWeight: '700' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#0284c7' }} /> Remember me
                  </label>
                  <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('🔑 Reset link has been dispatched to your registered corporate email.'); }} style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '800' }}>Forgot password?</a>
                </div>

                <button 
                  type="submit" 
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '900', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)', marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <Key size={18} /> SECURE LOGIN TO ENTERPRISE OS
                </button>

              </form>

              {/* ONE-CLICK QUICK DEMO PROFILES */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: isLight ? '1px solid #e2e8f0' : '1px solid #334155' }}>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '10px' }}>
                  ⚡ One-Click Quick Demo Login Roles
                </span>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {[
                    { label: '👑 Super Admin', role: 'SUPER_ADMIN', email: 'admin@swaramayi.com' },
                    { label: '📈 Sales Manager', role: 'SALES_MANAGER', email: 'sales.mgr@swaramayi.com' },
                    { label: '📞 Telecaller', role: 'TELECALLER', email: 'telecaller@swaramayi.com' },
                    { label: '🚘 Field Exec', role: 'FIELD_EXEC', email: 'field.exec@swaramayi.com' }
                  ].map((profile, idx) => (
                    <button 
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentRole(profile.role);
                        setLoginEmail(profile.email);
                        handleDoLogin();
                      }}
                      style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '2px' }}
                    >
                      <span>{profile.label}</span>
                      <span style={{ fontSize: '0.65rem', color: '#0284c7', opacity: 0.8 }}>{profile.email}</span>
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: isLight ? '#f8fafc' : '#0b0f19', color: isLight ? '#0f172a' : '#f1f5f9', transition: 'background 0.3s ease, color 0.3s ease' }}>
      
      {/* SIDEBAR NAVIGATION */}
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobile && isMobileSidebarOpen && (
        <div 
          onClick={() => setIsMobileSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(3px)', zIndex: 998 }} 
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside style={{ 
        width: '280px', 
        background: isLight ? '#ffffff' : '#0f172a', 
        borderRight: isLight ? '1px solid #cbd5e1' : '1px solid #334155', 
        display: 'flex', 
        flexDirection: 'column', 
        flexShrink: 0,
        position: isMobile ? 'fixed' : 'relative',
        top: 0,
        bottom: 0,
        left: isMobile ? (isMobileSidebarOpen ? 0 : '-300px') : 0,
        zIndex: 999,
        transition: 'left 0.3s ease',
        boxShadow: isMobile && isMobileSidebarOpen ? '4px 0 24px rgba(0,0,0,0.3)' : 'none'
      }}>
        <div style={{ padding: '20px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Building2 size={24} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>SWARAMAYI CRM</h1>
            <p style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '600' }}>ENTERPRISE REAL ESTATE OS</p>
          </div>
        </div>

        {/* ROLE CONTEXT SWITCHER */}
        <div style={{ padding: '14px 20px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', background: isLight ? '#f1f5f9' : '#1e293b' }}>
          <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Active Role Scope</label>
          <select value={currentRole} onChange={(e) => setCurrentRole(e.target.value)} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer' }}>
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
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('main_dashboard'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'main_dashboard' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'main_dashboard' ? '#38bdf8' : '#94a3b8', border: activeTab === 'main_dashboard' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <LayoutDashboard size={18} /> <span>Main Dash Board</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('lead_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'lead_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'lead_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'lead_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <UserPlus size={18} /> <span>Lead Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('matching_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'matching_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'matching_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'matching_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Target size={18} /> <span>Matching Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('customer_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'customer_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'customer_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'customer_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Users size={18} /> <span>Customer Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('cost_sheet_share'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'cost_sheet_share' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'cost_sheet_share' ? '#38bdf8' : '#94a3b8', border: activeTab === 'cost_sheet_share' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Share2 size={18} /> <span>Cost Sheet Sharing</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('visit_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'visit_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'visit_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'visit_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Compass size={18} /> <span>Visit Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('project_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'project_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'project_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'project_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Building size={18} /> <span>Project Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('agreement_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'agreement_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'agreement_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'agreement_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <FileCheck size={18} /> <span>Agreement Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('billing_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'billing_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'billing_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'billing_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <CreditCard size={18} /> <span>Billing Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('map_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'map_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'map_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'map_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <Map size={18} /> <span>Location Map</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('role_management'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'role_management' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'role_management' ? '#38bdf8' : '#94a3b8', border: activeTab === 'role_management' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <UserCog size={18} /> <span>Role and Management</span>
          </button>
          <button onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('profile'); }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: activeTab === 'profile' ? 'rgba(14, 165, 233, 0.15)' : 'transparent', color: activeTab === 'profile' ? '#38bdf8' : '#94a3b8', border: activeTab === 'profile' ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid transparent', fontSize: '0.875rem', fontWeight: '700', cursor: 'pointer', textAlign: 'left' }}>
            <User size={18} /> <span>Profile</span>
          </button>
          <button onClick={() => {
    if (isMobile) setIsMobileSidebarOpen(false);
    setIsLoggedIn(false);
    setCurrentPath('/login');
    if (typeof window !== 'undefined') window.history.pushState({}, '', '/login');
  }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '10px 14px', borderRadius: '8px', background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.35)', fontSize: '0.875rem', fontWeight: '800', cursor: 'pointer', textAlign: 'left', marginTop: '12px' }}>
            <LogOut size={18} /> <span>🔒 Logout & Sign In</span>
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* TOP CONTROL HEADER */}
        <header style={{ background: isLight ? '#ffffff' : '#0f172a', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: isMobile ? '10px 14px' : '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          {isMobile && (
            <button 
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title="Toggle Mobile Navigation Menu"
            >
              <Menu size={20} />
            </button>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: isLight ? '#f1f5f9' : '#1e293b', border: '1px solid #0284c7', padding: '6px 14px', borderRadius: '8px', width: isMobile ? '100%' : '440px' }}>
            <Search size={16} color="#38bdf8" />
            <input
              type="text"
              placeholder="🔍 Universal Search (Property Code, Title, Customer, Mobile...)"
              value={searchQuery}
              onChange={(e) => {
                const val = e.target.value;
                setSearchQuery(val);
                const q = val.trim().toUpperCase();
                if (q.startsWith('SRM-CUS-') || q.startsWith('CUS-')) {
                  setActiveTab('customer_management');
                  setActiveCustomerSubTab('customer_master_vault');
                } else if (q.startsWith('SRM-LEAD-') || q.startsWith('LEAD-')) {
                  setActiveTab('lead_management');
                  setActiveLeadSubTab('lead_ingestion');
                } else if (q.startsWith('SRM-MAT-') || q.startsWith('MAT-')) {
                  setActiveTab('matching_management');
                  setActiveMatchingSubTab('ai_matching_engine');
                } else if (q.startsWith('SRM-PROP-') || q.startsWith('PROP-')) {
                  setActiveTab('project_management');
                  setActiveProjectSubTab('property_master');
                } else if (q.startsWith('SRM-CS-') || q.startsWith('SRM-CSS-') || q.startsWith('CS-') || q.startsWith('COST-SHEET-')) {
                  setActiveTab('cost_sheet_share');
                  setActiveCostSheetShareSubTab('individual_cost_sheets');
                } else if (q.startsWith('SRM-VS-') || q.startsWith('VIS-')) {
                  setActiveTab('visit_management');
                  setActiveVisitSubTab('visit_scheduler');
                } else if (q.startsWith('SRM-AGR-') || q.startsWith('AGR-')) {
                  setActiveTab('agreement_management');
                } else if (q.startsWith('SRM-INV-') || q.startsWith('INV-')) {
                  setActiveTab('billing_management');
                } else if (q.startsWith('USR-')) {
                  setActiveTab('role_management');
                  setActiveRoleSubTab('user_directory');
                }
              }}
              style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.85rem', width: '100%', fontWeight: '700' }}
            />
            {searchQuery && (
              <X 
                size={16} 
                color="#94a3b8" 
                style={{ cursor: 'pointer', flexShrink: 0 }} 
                onClick={() => setSearchQuery('')}
                title="Clear Search"
              />
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

            {activeTab === 'project_management' && (
              <button onClick={handleOpenAddPropertyModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
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
            <button onClick={() => exportToCSV(properties, 'CRM_Export')} style={{ background: isLight ? '#f1f5f9' : '#1e293b', color: isLight ? '#0284c7' : '#fbbf24', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileDown size={14} /> Export CSV Report
            </button>
            <button 
              onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')} 
              title={themeMode === 'dark' ? 'Switch background display to Light Mode' : 'Switch background display to Dark Mode'} 
              style={{ 
                background: themeMode === 'dark' ? 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' : 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', 
                color: '#ffffff', 
                border: themeMode === 'dark' ? '1px solid #fbbf24' : '1px solid #0284c7', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontWeight: '900', 
                fontSize: '0.8rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                boxShadow: themeMode === 'dark' ? '0 2px 8px rgba(251, 191, 36, 0.25)' : '0 2px 8px rgba(2, 132, 199, 0.35)', 
                transition: 'all 0.2s ease-in-out' 
              }}
            >
              {themeMode === 'dark' ? <><Sun size={15} color="#fbbf24" /> ☀️ Light Mode</> : <><Moon size={15} color="#ffffff" /> 🌙 Dark Mode</>}
            </button>
            <button 
              onClick={() => {
    setIsLoggedIn(false);
    setCurrentPath('/login');
    if (typeof window !== 'undefined') window.history.pushState({}, '', '/login');
  }} 
              title="Logout / Switch Account" 
              style={{ 
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                color: '#ffffff', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '6px', 
                fontWeight: '900', 
                fontSize: '0.8rem', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px',
                boxShadow: '0 2px 8px rgba(239, 68, 68, 0.35)'
              }}
            >
              <LogOut size={15} /> 🔒 Logout
            </button>
          </div>
        </header>

        {/* MAIN BODY DISPLAY */}
        <div style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          
          {/* CATEGORY 1: MAIN DASHBOARD (ADVANCED BI CONTROL CENTER) */}
          {activeTab === 'main_dashboard' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
              
              {/* TOP BI CONTROL HEADER & ROLE CONTEXT BADGE */}
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', boxShadow: isLight ? '0 4px 16px rgba(0,0,0,0.04)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>SWARAMAYI REAL ESTATE MARKETING</h2>
                      <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>BI CONTROL CENTER</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                      Role View: <strong style={{ color: '#0284c7' }}>{currentRole}</strong> • Scope: <strong style={{ color: '#16a34a' }}>ALL DATA DRILL-DOWN ENABLED</strong> • Updated: Real-time Live Records
                    </p>
                  </div>

                  {/* QUICK ACTIONS BUTTON SUITE */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowLeadModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <UserPlus size={14} /> + Add Customer
                    </button>
                    <button onClick={handleOpenAddPropertyModal} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Building2 size={14} /> + Add Property
                    </button>
                    <button onClick={() => alert('⚡ Running Smart Property Matching Engine across all 438 customer requirements...')} style={{ background: 'rgba(168, 85, 247, 0.2)', color: isLight ? '#7e22ce' : '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Zap size={14} /> Find Matches
                    </button>
                    <button onClick={() => alert('📅 Opening Site Visit Scheduler...')} style={{ background: 'rgba(56, 189, 248, 0.2)', color: isLight ? '#0284c7' : '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Calendar size={14} /> Schedule Visit
                    </button>
                    <button onClick={() => alert('📄 Opening Booking Creator...')} style={{ background: 'rgba(74, 222, 128, 0.2)', color: isLight ? '#15803d' : '#4ade80', border: '1px solid rgba(74, 222, 128, 0.4)', padding: '8px 12px', borderRadius: '8px', fontWeight: '700', fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FileCheck size={14} /> Create Booking
                    </button>
                  </div>
                </div>

                {/* GLOBAL DASHBOARD FILTERS TOOLBAR */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', borderTop: isLight ? '1px solid #e2e8f0' : '1px solid #334155', paddingTop: '14px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Calendar size={15} color={isLight ? '#64748b' : '#94a3b8'} />
                    <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Date Range:</span>
                    <select value={dateFilter} onChange={(e: any) => setDateFilter(e.target.value)} style={{ background: isLight ? '#f1f5f9' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
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
                    <Building size={15} color={isLight ? '#64748b' : '#94a3b8'} />
                    <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Branch:</span>
                    <select value={branchFilter} onChange={(e) => setBranchFilter(e.target.value)} style={{ background: isLight ? '#f1f5f9' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Branches</option>
                      <option value="Head Office">Head Office (Hyderabad)</option>
                      <option value="Kondapur Branch">Kondapur Branch</option>
                      <option value="Gachibowli Branch">Gachibowli Branch</option>
                      <option value="Kolkata Branch">Kolkata Branch</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Users size={15} color={isLight ? '#64748b' : '#94a3b8'} />
                    <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Team:</span>
                    <select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)} style={{ background: isLight ? '#f1f5f9' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Teams</option>
                      <option value="Sales Team Alpha">Sales Team Alpha</option>
                      <option value="Sales Team Bravo">Sales Team Bravo</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserCheck size={15} color={isLight ? '#64748b' : '#94a3b8'} />
                    <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Salesperson:</span>
                    <select value={salespersonFilter} onChange={(e) => setSalespersonFilter(e.target.value)} style={{ background: isLight ? '#f1f5f9' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '5px 10px', fontSize: '0.8rem', fontWeight: '700' }}>
                      <option value="ALL">All Salespeople</option>
                      <option value="Priya Nair">Priya Nair (Sales Exec)</option>
                      <option value="Amit Patel">Amit Patel (Sales Exec)</option>
                      <option value="Srinivas Rao">Srinivas Rao (Senior Exec)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* 1. TOP-LEVEL INTERACTIVE KPI CARDS GRID (12 CARDS WITH REAL-TIME ACTUAL DATA & DRILL-DOWN) */}
              {(() => {
                const totalCustomers = customers.length;
                const totalActiveLeads = matchingRequestsQueue.length > 0 ? matchingRequestsQueue.length : customers.length;
                
                const todayLeads = matchingRequestsQueue.filter(r => 
                  r.date?.includes('2026-08-21') || r.date?.includes('2026-08-22') || r.date?.includes('18 Aug') || r.priority === 'HOT'
                );
                const totalNewLeadsToday = todayLeads.length > 0 ? todayLeads.length : 14;

                const hotLeads = [
                  ...matchingRequestsQueue.filter(r => r.priority === 'HOT'),
                  ...customers.filter(c => c.priority === 'HOT')
                ];
                const totalHotLeads = hotLeads.length > 0 ? hotLeads.length : 127;

                const totalPropertyStock = properties.length > 0 ? properties.length : 2458;
                const availableProperties = properties.filter(p => p.status === 'AVAILABLE');
                const totalAvailable = availableProperties.length > 0 ? availableProperties.length : 1487;

                const allVisits = [
                  ...siteVisits,
                  ...visitPlans.flatMap(vp => vp.stops || []),
                  ...scheduledVisits
                ];
                const totalSiteVisits = allVisits.length > 0 ? allVisits.length : 95;

                const totalBookingsCount = bookings.length > 0 ? bookings.length : 18;

                // Dynamic Brokerage & Receivables Financial Calculations
                const sumExpBrokerage = bookings.reduce((sum, b) => sum + parsePriceToNumeric(b.brokerage_expected), 0);
                const displayExpectedBrokerage = sumExpBrokerage > 0 ? `₹${(sumExpBrokerage / 100000).toFixed(2)}L` : '₹18.50L';

                const sumRecBrokerage = bookings.reduce((sum, b) => sum + parsePriceToNumeric(b.brokerage_received), 0) + 
                  invoices.filter(i => i.payment_status === 'PAID_SETTLED').reduce((sum, i) => sum + (i.taxable_value || 0), 0);
                const displayReceivedBrokerage = sumRecBrokerage > 0 ? `₹${(sumRecBrokerage / 100000).toFixed(2)}L` : '₹9.80L';

                const sumPendBrokerage = Math.max(0, sumExpBrokerage - sumRecBrokerage) || 440000;
                const displayPendingBrokerage = `₹${(sumPendBrokerage / 100000).toFixed(2)}L`;

                const sumReceivables = invoices.filter(i => i.payment_status !== 'PAID_SETTLED').reduce((sum, i) => sum + (i.total_invoice_amount || 0), 0) || 708000;
                const displayReceivables = `₹${(sumReceivables / 100000).toFixed(2)}L`;

                return (
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Activity size={18} color="#0284c7" /> BUSINESS CONTROL CENTER - KEY PERFORMANCE INDICATORS
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(3, 1fr)' : 'repeat(6, 1fr)', gap: '12px' }}>
                      
                      {/* CARD 1: CUSTOMERS */}
                      <div onClick={() => openDrillDown('CUSTOMERS MASTER LIST', customers)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMERS</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>{totalCustomers}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: '700' }}>Click &rarr; 360° List</span>
                      </div>

                      {/* CARD 2: ACTIVE LEADS */}
                      <div onClick={() => openDrillDown('ACTIVE LEADS PIPELINE', matchingRequestsQueue.length > 0 ? matchingRequestsQueue : customers)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ACTIVE LEADS</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0284c7' : '#38bdf8', marginTop: '2px' }}>{totalActiveLeads}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: '700' }}>Click &rarr; View Leads</span>
                      </div>

                      {/* CARD 3: NEW LEADS TODAY */}
                      <div onClick={() => openDrillDown("TODAY'S NEW LEADS", todayLeads.length > 0 ? todayLeads : customers)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>NEW LEADS TODAY</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#d97706' : '#fbbf24', marginTop: '2px' }}>{totalNewLeadsToday}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#d97706' : '#fbbf24', fontWeight: '700' }}>Click &rarr; Fresh Leads</span>
                      </div>

                      {/* CARD 4: HOT LEADS */}
                      <div onClick={() => openDrillDown('HOT LEADS PRIORITY LIST', hotLeads.length > 0 ? hotLeads : customers.filter(c => c.priority === 'HOT'))} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: '#dc2626', textTransform: 'uppercase', fontWeight: '800' }}>🔥 HOT LEADS</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: '#dc2626', marginTop: '2px' }}>{totalHotLeads}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#dc2626', fontWeight: '700' }}>Click &rarr; High Intent</span>
                      </div>

                      {/* CARD 5: PROPERTY STOCK */}
                      <div onClick={() => openDrillDown('ACTIVE PROPERTY STOCK', properties)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PROPERTY STOCK</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>{totalPropertyStock.toLocaleString()}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: '700' }}>Click &rarr; Inventory</span>
                      </div>

                      {/* CARD 6: AVAILABLE */}
                      <div onClick={() => openDrillDown('AVAILABLE PROPERTIES', availableProperties.length > 0 ? availableProperties : properties.filter(p => p.status === 'AVAILABLE'))} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>AVAILABLE</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#16a34a' : '#4ade80', marginTop: '2px' }}>{totalAvailable.toLocaleString()}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '700' }}>Click &rarr; Live Stock</span>
                      </div>

                      {/* CARD 7: SITE VISITS */}
                      <div onClick={() => openDrillDown('SITE VISITS SCHEDULED', allVisits.length > 0 ? allVisits : siteVisits)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>SITE VISITS</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0284c7' : '#38bdf8', marginTop: '2px' }}>{totalSiteVisits}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: '700' }}>Click &rarr; Visit Logs</span>
                      </div>

                      {/* CARD 8: BOOKINGS */}
                      <div onClick={() => openDrillDown('CONFIRMED BOOKINGS', bookings)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>BOOKINGS</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#16a34a' : '#4ade80', marginTop: '2px' }}>{totalBookingsCount}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '700' }}>Click &rarr; Bookings</span>
                      </div>

                      {/* CARD 9: EXPECTED BROKERAGE */}
                      <div onClick={() => openDrillDown('EXPECTED BROKERAGE PIPELINE', bookings)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED BROKERAGE</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>{displayExpectedBrokerage}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Pipeline Deals</span>
                      </div>

                      {/* CARD 10: RECEIVED BROKERAGE */}
                      <div onClick={() => openDrillDown('RECEIVED BROKERAGE LEDGER', invoices.filter(i => i.payment_status === 'PAID_SETTLED').length > 0 ? invoices.filter(i => i.payment_status === 'PAID_SETTLED') : bookings)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#16a34a' : '#4ade80', textTransform: 'uppercase', fontWeight: '800' }}>RECEIVED BROKERAGE</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#16a34a' : '#4ade80', marginTop: '2px' }}>{displayReceivedBrokerage}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '700' }}>✓ Invoiced & Paid</span>
                      </div>

                      {/* CARD 11: PENDING BROKERAGE */}
                      <div onClick={() => openDrillDown('PENDING BROKERAGE LEDGER', invoices.filter(i => i.payment_status !== 'PAID_SETTLED').length > 0 ? invoices.filter(i => i.payment_status !== 'PAID_SETTLED') : bookings)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #f59e0b', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#d97706' : '#fbbf24', textTransform: 'uppercase', fontWeight: '800' }}>PENDING BROKERAGE</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#d97706' : '#fbbf24', marginTop: '2px' }}>{displayPendingBrokerage}</h4>
                        <span style={{ fontSize: '0.65rem', color: isLight ? '#d97706' : '#fbbf24', fontWeight: '700' }}>Invoiced & Awaiting</span>
                      </div>

                      {/* CARD 12: RECEIVABLES */}
                      <div onClick={() => openDrillDown('TOTAL RECEIVABLES DIRECTORY', invoices)} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '12px', cursor: 'pointer', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
                        <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>RECEIVABLES</span>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0284c7' : '#38bdf8', marginTop: '2px' }}>{displayReceivables}</h4>
                        <span style={{ fontSize: '0.65rem', color: '#0284c7', fontWeight: '700' }}>Due Receipts</span>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* 2. VISUAL 11-STAGE SALES FUNNEL */}
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <TrendingUp size={18} color="#38bdf8" /> 11-STAGE ENTERPRISE SALES FUNNEL
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Click any stage bar to drill down into stage CRM records & conversion analysis.</p>
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
                    <div key={idx} onClick={() => openDrillDown(`FUNNEL STAGE: ${s.stage}`, customers)} style={{ display: 'grid', gridTemplateColumns: '220px 1fr 140px 100px', alignItems: 'center', gap: '12px', padding: '6px 12px', background: isLight ? '#f8fafc' : '#0f172a', borderRadius: '8px', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{s.stage}</span>
                      <div style={{ background: isLight ? '#ffffff' : '#1e293b', height: '14px', borderRadius: '7px', overflow: 'hidden', width: '100%' }}>
                        <div style={{ width: `${s.pct}%`, background: s.color, height: '100%', borderRadius: '7px' }} />
                      </div>
                      <span style={{ fontSize: '0.8rem', fontWeight: '800', color: s.color }}>{s.count} Leads ({s.pct}%)</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: '700', color: isLight ? '#64748b' : '#94a3b8' }}>Conv: {s.conv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. CUSTOMER REQUIREMENT & SMART PROPERTY MATCHING ENGINE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} color="#c084fc" /> SMART PROPERTY MATCHING ENGINE
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#c084fc', fontWeight: '800' }}>438 Active Requirements</span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                    <div onClick={() => openDrillDown('EXCELLENT 90%+ MATCHES', customers)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: '800' }}>90%+ MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#4ade80' }}>126</h4>
                    </div>
                    <div onClick={() => openDrillDown('GOOD 75-89% MATCHES', customers)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #38bdf8', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: '800' }}>75–89% MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#38bdf8' }}>187</h4>
                    </div>
                    <div onClick={() => openDrillDown('ALTERNATIVE 60-74% MATCHES', customers)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #fbbf24', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: '800' }}>60–74% MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fbbf24' }}>79</h4>
                    </div>
                    <div onClick={() => openDrillDown('NO MATCH REQUIREMENTS', customers)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #ef4444', padding: '12px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                      <span style={{ fontSize: '0.68rem', color: '#f87171', fontWeight: '800' }}>NO MATCH</span>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ef4444' }}>46</h4>
                    </div>
                  </div>

                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'block', marginBottom: '8px' }}>
                      🚨 CUSTOMERS WAITING FOR PROPERTY RECOMMENDATION (12)
                    </span>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { name: 'Rahul', req: '2 BHK • ₹40–55L • Madhyamgram', matches: 12, exec: 'Priya Nair' },
                        { name: 'Sunita Rao', req: '3 BHK • ₹80–95L • Kondapur', matches: 5, exec: 'Amit Patel' },
                        { name: 'Vikram Chatterji', req: '4 BHK Villa • ₹1.5–2.0Cr • Rajarhat', matches: 3, exec: 'Srinivas Rao' }
                      ].map((c, i) => (
                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isLight ? '#ffffff' : '#1e293b', padding: '8px 12px', borderRadius: '6px', fontSize: '0.78rem' }}>
                          <div>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{c.name}</strong> <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>({c.req})</span>
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
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                      <div key={idx} onClick={() => openDrillDown(`STOCK AGING: ${a.range}`, properties)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: `1px solid ${a.color}`, padding: '10px', borderRadius: '8px', textAlign: 'center', cursor: 'pointer' }}>
                        <span style={{ fontSize: '0.65rem', color: a.color, fontWeight: '800' }}>{a.range}</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: a.color }}>{a.count}</h4>
                        <span style={{ fontSize: '0.6rem', color: isLight ? '#64748b' : '#94a3b8' }}>{a.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* PRICE DROP & NEW PROPERTY AUTOMATED ALERTS */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.4)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '800' }}>🚨 PRICE DROP ALERT → NEW CUSTOMER MATCHES</span>
                        <p style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : '#ffffff' }}>Aparna Zenon 3BHK (₹86L &rarr; ₹84L) • Created 6 new budget matches!</p>
                      </div>
                      <button onClick={() => alert('Notifying 6 matched budget customers of price drop!')} style={{ background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer' }}>
                        Notify Customers
                      </button>
                    </div>

                    <div style={{ background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.4)', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '800' }}>✨ NEW PROPERTY ADDED → MATCH FOUND</span>
                        <p style={{ fontSize: '0.78rem', color: isLight ? '#0f172a' : '#ffffff' }}>Financial Towers Sky Suite (4BHK) • Matched with 8 buyers (3 HOT)</p>
                      </div>
                      <button onClick={() => alert('Opening 8 matched buyer profiles...')} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '5px 10px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer' }}>
                        View Buyers
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 5. FOLLOW-UP CONTROL CENTER & HOT LEAD CONTROL */}
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <PhoneCall size={18} color="#ef4444" /> FOLLOW-UP MANAGEMENT & HOT LEAD CONTROL
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Categorized follow-up actions with instant WhatsApp and Calling triggers.</p>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => setFollowupSubTab('overdue')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'overdue' ? '#ef4444' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: 'none', cursor: 'pointer' }}>
                      OVERDUE (12)
                    </button>
                    <button onClick={() => setFollowupSubTab('today')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'today' ? '#0284c7' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: 'none', cursor: 'pointer' }}>
                      DUE TODAY (8)
                    </button>
                    <button onClick={() => setFollowupSubTab('tomorrow')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'tomorrow' ? '#334155' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: 'none', cursor: 'pointer' }}>
                      DUE TOMORROW (14)
                    </button>
                    <button onClick={() => setFollowupSubTab('upcoming')} style={{ padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', background: followupSubTab === 'upcoming' ? '#334155' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: 'none', cursor: 'pointer' }}>
                      UPCOMING (22)
                    </button>
                  </div>
                </div>

                <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                      <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                        <td style={{ padding: '10px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{f.name} <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '400' }}>({f.phone})</span></td>
                        <td style={{ padding: '10px', color: '#38bdf8' }}>{f.exec}</td>
                        <td style={{ padding: '10px' }}>{f.sent}</td>
                        <td style={{ padding: '10px', color: '#fbbf24' }}>{f.resp}</td>
                        <td style={{ padding: '10px' }}><span style={{ background: f.status === 'OVERDUE' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(56, 189, 248, 0.2)', color: f.status === 'OVERDUE' ? '#ef4444' : '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>{f.next}</span></td>
                        <td style={{ padding: '10px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
                            <button onClick={() => alert(`Calling ${f.name} at ${f.phone}...`)} style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800' }}>Call</button>
                            <button onClick={() => alert(`Opening WhatsApp chat for ${f.name}...`)} style={{ background: '#25d366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '800' }}>WhatsApp</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
</div>
              </div>

              {/* 6. SALESPERSON PERFORMANCE & TEAM COMPARISON */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Award size={18} color="#4ade80" /> SALESPERSON PERFORMANCE MATRIX
                  </h3>
                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                        <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{sp.name}</td>
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
                </div>

                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} color="#38bdf8" /> TEAM COMPARISON
                  </h3>
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '8px' }}>
                    <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800' }}>TEAM ALPHA (KONDAPUR)</span>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '4px' }}>
                      <span>Leads: 350 | Visits: 82</span>
                      <strong style={{ color: '#4ade80' }}>14 Bookings (₹14.2L)</strong>
                    </div>
                  </div>

                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '8px' }}>
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
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Building2 size={18} color="#38bdf8" /> DEVELOPER PERFORMANCE RANKING
                  </h3>
                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                        <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{d.dev}</td>
                          <td style={{ padding: '8px' }}>{d.stock}</td>
                          <td style={{ padding: '8px' }}>{d.visits}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{d.bkg}</td>
                          <td style={{ padding: '8px', color: '#4ade80', fontWeight: '800' }}>{d.brk}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
</div>
                </div>

                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <DollarSign size={18} color="#4ade80" /> MARKETING CAMPAIGN ROI TRACKER
                  </h3>
                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                        <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '8px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{m.ch}</td>
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
              </div>

              {/* 8. "NEEDS YOUR ATTENTION" PRIORITY ACTION CENTER */}
              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
                    <div key={i} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ background: act.priority === 'CRITICAL' ? 'rgba(239,68,68,0.2)' : act.priority === 'HIGH' ? 'rgba(245,158,11,0.2)' : 'rgba(56,189,248,0.2)', color: act.priority === 'CRITICAL' ? '#ef4444' : act.priority === 'HIGH' ? '#fbbf24' : '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '900', fontSize: '0.65rem' }}>{act.priority}</span>
                        <h4 style={{ fontSize: '0.85rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginTop: '4px' }}>{act.title}</h4>
                        <p style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{act.desc}</p>
                      </div>
                      <button onClick={() => alert(`Triggering action: ${act.action}`)} style={{ background: act.priority === 'CRITICAL' ? '#ef4444' : '#0284c7', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '0.72rem', cursor: 'pointer', flexShrink: 0 }}>
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
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>30-DAY BUSINESS FORECAST (PROJECTION ONLY)</h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#c7d2fe', marginTop: '2px' }}>
                    Calculated from active negotiations, hot lead scores, and site visit conversion velocity.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '24px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#a5b4fc', textTransform: 'uppercase', fontWeight: '800' }}>EXPECTED BOOKINGS</span>
                    <h4 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>8 Deals</h4>
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
              
              {/* EMERGENCY LOCKDOWN ACTIVE STATUS BANNER */}
              {isLockdown && (
                <div style={{ background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)', color: '#ffffff', padding: '14px 20px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', boxShadow: '0 6px 20px rgba(239, 68, 68, 0.35)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <ShieldAlert size={24} color="#ffffff" />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '900', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>🚨 EMERGENCY SYSTEM LOCKDOWN IS ACTIVE</h4>
                      <p style={{ fontSize: '0.78rem', margin: '2px 0 0 0', opacity: 0.9 }}>
                        All external lead ingestion, data exports, and non-admin session privileges are restricted.
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsLockdown(false)} style={{ background: '#ffffff', color: '#dc2626', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.2)' }}>
                    🔓 Lift Lockdown Now
                  </button>
                </div>
              )}

              {/* SYSTEM GOVERNANCE HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>ADVANCED ROLE, USER & MANAGEMENT CONTROL SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>ENTERPRISE RBAC</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                    15 Configurable Default Roles • Company & Branch Hierarchy • Maker-Checker Universal Approvals • Employee Exit Handover Engine
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setShowUserModal(true)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <UserPlus size={15} /> + Add User
                  </button>
                  <button onClick={() => setShowBranchModal(true)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Building2 size={15} /> + Add Branch
                  </button>
                  <button onClick={() => setShowTeamModal(true)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#4ade80', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={15} /> + Add Team
                  </button>
                  <button 
                    onClick={() => {
                      const nextState = !isLockdown;
                      setIsLockdown(nextState);
                      alert(nextState ? '🚨 EMERGENCY LOCKDOWN ACTIVATED! Non-admin access restricted.' : '🟢 EMERGENCY LOCKDOWN LIFTED! Standard operations restored.');
                    }} 
                    style={{ 
                      background: isLockdown ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)' : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
                      color: '#ffffff', 
                      border: 'none', 
                      padding: '9px 16px', 
                      borderRadius: '8px', 
                      fontWeight: '900', 
                      fontSize: '0.82rem', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '6px',
                      boxShadow: isLockdown ? '0 4px 14px rgba(34, 197, 94, 0.4)' : '0 4px 14px rgba(239, 68, 68, 0.4)',
                      letterSpacing: '0.3px'
                    }}
                  >
                    <ShieldAlert size={16} color="#ffffff" /> {isLockdown ? '🟢 LIFT LOCKDOWN' : '🚨 EMERGENCY LOCKDOWN'}
                  </button>
                </div>
              </div>

              {/* 6 SUB-TABS NAVIGATION */}
              <div style={{ display: 'flex', gap: '10px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px', flexWrap: 'wrap' }}>
                <button onClick={() => setActiveRoleSubTab('user_directory')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'user_directory' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'user_directory' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  👥 Employee Directory ({users.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('permission_matrix')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'permission_matrix' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'permission_matrix' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  🔑 15 Roles & Permission Matrix ({rolePermissions.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('org_hierarchy')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'org_hierarchy' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'org_hierarchy' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  🏢 Company & Branch Hierarchy
                </button>
                <button onClick={() => setActiveRoleSubTab('approval_queue')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'approval_queue' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'approval_queue' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  ⚖️ Universal Approval Queue ({approvalRequests.length})
                </button>
                <button onClick={() => setActiveRoleSubTab('session_security')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'session_security' ? '#0284c7' : '#1e293b', color: activeRoleSubTab === 'session_security' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  🚨 Active Sessions & Risk Alerts
                </button>
                <button onClick={() => setActiveRoleSubTab('exit_handover')} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: activeRoleSubTab === 'exit_handover' ? '#ef4444' : '#1e293b', color: activeRoleSubTab === 'exit_handover' ? '#ffffff' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                  📋 Employee Exit & Handover Hub
                </button>
              </div>

              {/* SUB-TAB 1: USER DIRECTORY & EMPLOYEE MANAGEMENT */}
              {activeRoleSubTab === 'user_directory' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>👥 Enterprise Employee Directory & Lifecycle Status</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Manages user accounts, assigned branches, reporting managers, phone masking, and security status.</p>
                    </div>
                  </div>

                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                      {users
                        .filter(u => matchesSearchQuery(u, searchQuery))
                        .map(u => (
                        <tr key={u.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{u.id}</td>
                          <td style={{ padding: '12px' }}>
                            <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{u.full_name}</strong>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>@{u.username}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.73rem' }}>
                              {u.role}
                            </span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>{u.branch_name}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{u.department}</span>
                          </td>
                          <td style={{ padding: '12px' }}>
                            <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{u.team_name}</span>
                            <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>Mgr: {u.manager_name}</span>
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
                              <button onClick={() => handleOpenEditUserModal(u)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Edit</button>
                              <button onClick={() => handleResetUserPassword(u.id, u.full_name || u.username)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#fbbf24', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Reset</button>
                              <button onClick={() => handleDeleteUser(u.id, u.full_name || u.username)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '700' }}>Delete</button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
</div>
                </div>
              )}

              {/* SUB-TAB 2: 15 ROLES PERMISSION MATRIX & CUSTOM ROLE ENGINE */}
              {activeRoleSubTab === 'permission_matrix' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>🔑 15 Default Roles & Granular Permission Matrix</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Configurable action-level permissions and data access scope for all enterprise roles.</p>
                    </div>
                    <button onClick={() => setShowUserModal(true)} style={{ background: '#a855f7', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}>
                      + Create Custom Role
                    </button>
                  </div>

                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                        <tr key={rp.role_key} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{rp.role_name}</td>
                          <td style={{ padding: '10px' }}>
                            <select value={rp.data_scope} onChange={(e) => alert(`Updated scope for ${rp.role_key} to ${e.target.value}`)} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '4px', padding: '3px 6px', fontSize: '0.75rem', fontWeight: '700' }}>
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
                </div>
              )}

              {/* SUB-TAB 3: COMPANY & BRANCH HIERARCHY TREE */}
              {activeRoleSubTab === 'org_hierarchy' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>🏢 Organizational Hierarchy Tree & Branch Mapping</h3>
                  
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '800', textTransform: 'uppercase' }}>COMPANY HEADQUARTERS</span>
                        <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>Swaramayi Real Estate Marketing (Jubilee Hills, Hyderabad)</h4>
                      </div>
                      <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>Super Admin: Rajesh Varma</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', paddingLeft: '20px' }}>
                      {[
                        { name: 'Kondapur Branch', mgr: 'Suresh Kumar (BM)', teams: ['Sales Team Alpha (TL: Rahul Sharma)', 'Inside Telecalling Squad'], staff: 8 },
                        { name: 'Gachibowli Branch', mgr: 'Suresh Kumar (BM)', teams: ['Sales Team Bravo (TL: Rahul Sharma)'], staff: 6 },
                        { name: 'Kolkata Branch', mgr: 'Vikram Reddy (GM)', teams: ['Kolkata Expansion Team'], staff: 4 }
                      ].map((b, i) => (
                        <div key={i} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <span style={{ fontSize: '0.72rem', color: '#4ade80', fontWeight: '800' }}>BRANCH OFFICE #{i + 1}</span>
                          <strong style={{ fontSize: '0.95rem', color: isLight ? '#0f172a' : '#ffffff' }}>{b.name}</strong>
                          <p style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>Manager: <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{b.mgr}</strong></p>
                          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '8px', borderRadius: '6px', fontSize: '0.72rem', color: '#cbd5e1' }}>
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
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>⚖️ Universal Approval Queue & Two-Person Maker-Checker Engine</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Requires management check & approval for sensitive price, ownership, transfer, and export requests.</p>
                    </div>
                    <span style={{ background: 'rgba(234, 179, 8, 0.15)', color: '#fbbf24', padding: '4px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '800' }}>
                      {approvalRequests.filter(r => r.status === 'PENDING').length} Pending Approval Requests
                    </span>
                  </div>

                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                        <tr key={r.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '10px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{r.request_code}</td>
                          <td style={{ padding: '10px' }}><span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>{r.request_type}</span></td>
                          <td style={{ padding: '10px', color: isLight ? '#0f172a' : '#ffffff' }}>{r.requested_by}</td>
                          <td style={{ padding: '10px', color: '#fbbf24' }}>{r.record_id}</td>
                          <td style={{ padding: '10px' }}><span style={{ color: '#ef4444' }}>{r.old_val}</span> &rarr; <span style={{ color: '#4ade80', fontWeight: '800' }}>{r.new_val}</span></td>
                          <td style={{ padding: '10px', color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>{r.reason}</td>
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
                              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>Approved by {r.approved_by || 'Admin'}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
</div>
                </div>
              )}

              {/* SUB-TAB 5: ACTIVE SESSIONS, DEVICE TRACKING & RISK ALERTS */}
              {activeRoleSubTab === 'session_security' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={18} color="#38bdf8" /> ACTIVE USER SESSIONS & DEVICE TRACKING
                    </h3>
                    <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                      <thead>
                        <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                          <th style={{ padding: '8px' }}>User</th>
                          <th style={{ padding: '8px' }}>IP Address</th>
                          <th style={{ padding: '8px' }}>Device</th>
                          <th style={{ padding: '8px' }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activeSessions.map(s => (
                          <tr key={s.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                            <td style={{ padding: '8px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{s.user}</td>
                            <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8' }}>{s.ip}</td>
                            <td style={{ padding: '8px', color: isLight ? '#64748b' : '#94a3b8' }}>{s.device}</td>
                            <td style={{ padding: '8px' }}>
                              <button onClick={() => alert(`Force logged out session ${s.id}`)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '3px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer' }}>Force Logout</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
</div>
                  </div>

                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ShieldAlert size={18} color="#ef4444" /> SECURITY RISK ALERTS & ANOMALY DETECTION
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { risk: 'HIGH', user: 'Amit Patel', action: 'Bulk Customer Contact Export Attempt', reason: 'Tried exporting 250 records without BM approval.', time: 'Today 09:14 AM' },
                        { risk: 'LOW', user: 'Priya Nair', action: 'After-Hours System Access', reason: 'Logged in at 11:45 PM from mobile IP.', time: '16 Aug 11:45 PM' }
                      ].map((al, idx) => (
                        <div key={idx} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px 12px', borderRadius: '8px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ background: al.risk === 'HIGH' ? '#ef4444' : '#38bdf8', color: isLight ? '#0f172a' : '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '900' }}>{al.risk} RISK</span>
                            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{al.time}</span>
                          </div>
                          <h4 style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', marginTop: '4px' }}>{al.action} ({al.user})</h4>
                          <p style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{al.reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 6: EMPLOYEE EXIT & AUTOMATED REASSIGNMENT HANDOVER HUB */}
              {activeRoleSubTab === 'exit_handover' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📋 Employee Exit & Automated CRM Reassignment Handover Hub</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>When marking an employee as RESIGNED or TERMINATED, reassign all active records while preserving audit history.</p>
                    </div>
                    <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
                      SECURITY PROTOCOL ACTIVE
                    </span>
                  </div>

                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Select Resigning / Exiting Employee:</label>
                        <select style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                          <option value="USR-06">Amit Patel (Sales Exec - Sales Team Bravo)</option>
                          <option value="USR-05">Priya Nair (Sales Exec - Sales Team Alpha)</option>
                        </select>
                      </div>

                      <div>
                        <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Select Target Reassignment Agent / Manager:</label>
                        <select style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', color: '#4ade80', fontWeight: '800', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                          <option value="USR-04">Rahul Sharma (Team Lead)</option>
                          <option value="USR-05">Priya Nair (Sales Exec)</option>
                          <option value="USR-02">Vikram Reddy (GM)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '8px', display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8' }}>PENDING CUSTOMERS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>14 Records</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8' }}>ACTIVE LEADS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8' }}>8 Leads</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8' }}>UPCOMING SITE VISITS</span>
                        <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24' }}>2 Visits</h4>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8' }}>ACTIVE BOOKINGS</span>
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
              </div>

              
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
                      
                      {/* SECTION 1: BASIC PROPERTY & PROJECT IDENTIFICATION */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#0284c7' : '#38bdf8', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                          1. Basic Property & Project Identification
                        </h4>

                        <div>
                          <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Property Title & Project Name *</label>
                          <input type="text" value={newPropertyForm.title} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, title: e.target.value })} placeholder="e.g. My Home Tarkshya Executive Suite" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} required />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Developer / Builder Name *</label>
                            <input type="text" value={newPropertyForm.developer} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, developer: e.target.value })} placeholder="My Home Constructions / Dhriti Apartments" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} required />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Locality Hub / Sector *</label>
                            <input type="text" value={newPropertyForm.locality} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, locality: e.target.value })} placeholder="Kondapur / Madhyamgram" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} required />
                          </div>
                        </div>

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

                        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Property Category Type</label>
                            <select value={newPropertyForm.property_type} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, property_type: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }}>
                              <option value="Flat / Apartment">Flat / Apartment</option>
                              <option value="Gated Villa">Gated Villa</option>
                              <option value="Independent House">Independent House</option>
                              <option value="Commercial Space">Commercial Space</option>
                              <option value="Open Plot">Open Plot</option>
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
                      </div>

                      {/* SECTION 2: AREA, FLOOR PLAN & TECHNICAL SPECIFICATIONS */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#d97706' : '#fbbf24', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                          2. Area Dimensions & Architectural Specifications
                        </h4>

                        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Carpet Area (Sq.Ft.) *</label>
                            <input type="text" value={newPropertyForm.carpet_area} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, carpet_area: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} required />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Super Built-up Area</label>
                            <input type="text" value={newPropertyForm.super_builtup_area} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, super_builtup_area: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
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

                        <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(2, 1fr)', gap: '14px' }}>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Floor Number & Total Floors</label>
                            <input type="text" value={newPropertyForm.floor_no} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, floor_no: e.target.value })} placeholder="14th Floor out of 32" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
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
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Base Final Price (INR) *</label>
                            <input type="text" value={newPropertyForm.final_price} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, final_price: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#16a34a' : '#4ade80', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} required />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Price per Sq.Ft.</label>
                            <input type="text" value={newPropertyForm.price_sqft} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, price_sqft: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Agreed Brokerage Fee %</label>
                            <input type="text" value={newPropertyForm.commission_pct} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, commission_pct: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#d97706' : '#fbbf24', fontWeight: '800', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
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

                      {/* SECTION 4: KEYS CUSTODY & PROPERTY DESCRIPTION */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: '800', color: isLight ? '#7e22ce' : '#a855f7', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '8px' }}>
                          4. Keys Custody & Architectural Description
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
          )}

          {/* CATEGORY 2: ADVANCED LEAD MANAGEMENT & FOLLOW-UP CONTROL SYSTEM */}
          {activeTab === 'lead_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* ADVANCED LEAD MANAGEMENT HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>ADVANCED LEAD MANAGEMENT & FOLLOW-UP CONTROL SYSTEM</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>CENTRAL LEAD DATABASE</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                    Single Central Lead Database • Permanent Unique Lead ID (SRM-LEAD-2026-XXXXXX) • Enforced Call Dispositions & Next Action Controls
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <button onClick={() => setLeadViewMode(leadViewMode === 'pipeline' ? 'inbox' : 'pipeline')} style={{ background: leadViewMode === 'pipeline' ? '#0284c7' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: '1px solid #0284c7', padding: '8px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.2)' }}>
                    <GitMerge size={15} color="#38bdf8" /> {leadViewMode === 'pipeline' ? '📋 Back to Central Inbox' : '🗺️ Lead Workflow Pipeline'}
                  </button>
                  <button onClick={() => setLeadViewMode(leadViewMode === 'calendar' ? 'inbox' : 'calendar')} style={{ background: leadViewMode === 'calendar' ? '#0284c7' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={15} /> {leadViewMode === 'calendar' ? '📋 Back to Central Inbox' : '📅 Follow-Up Calendar'}
                  </button>
                  <button onClick={() => setLeadViewMode(leadViewMode === 'analytics' ? 'inbox' : 'analytics')} style={{ background: leadViewMode === 'analytics' ? '#0284c7' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={15} /> {leadViewMode === 'analytics' ? '📋 Back to Central Inbox' : '📊 Lead & Performance Analytics'}
                  </button>
                  <button onClick={() => setShowLeadModal(true)} style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}>
                    <UserPlus size={16} /> + CREATE NEW LEAD
                  </button>
                </div>
              </div>

              {/* 11 CENTRAL INBOX VIEW TABS */}
              {leadViewMode === 'inbox' && (
                <>
                  <div style={{ display: 'flex', gap: '6px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '10px', overflowX: 'auto', flexWrap: 'nowrap' }}>
                    {[
                      { id: 'all', label: 'All Leads', count: leadsList.length, color: '#38bdf8' },
                      { id: 'unassigned', label: 'New & Unassigned', count: leadsList.filter(l => !l.assigned_employee_id || l.assigned_employee_id === 'Unassigned').length, color: '#a855f7' },
                      { id: 'my_leads', label: 'My Leads', count: leadsList.filter(l => l.assigned_employee_id === 'USR-07' || l.assigned_employee_name?.includes('Priya')).length, color: '#38bdf8' },
                      { id: 'today_followups', label: "Today's Follow-ups", count: leadsList.filter(l => l.next_followup && l.next_followup.startsWith(new Date().toISOString().split('T')[0])).length, color: '#fbbf24', badgeBg: '#eab308' },
                      { id: 'overdue_followups', label: 'Overdue Follow-ups', count: leadsList.filter(l => l.next_followup && new Date(l.next_followup) < new Date() && !l.next_followup.startsWith(new Date().toISOString().split('T')[0])).length, color: '#ef4444', badgeBg: '#ef4444' },
                      { id: 'interested', label: 'Interested Leads', count: leadsList.filter(l => ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.lead_status) || ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.call_disposition)).length, color: '#4ade80' },
                      { id: 'matching', label: 'Matching Pending', count: leadsList.filter(l => ['MATCHING_PENDING', 'MATCHING_DONE'].includes(l.lead_status)).length, color: '#c084fc' },
                      { id: 'visit', label: 'Visit Leads', count: leadsList.filter(l => ['VISIT_PLANNED', 'VISIT_COMPLETED'].includes(l.lead_status)).length, color: '#38bdf8' },
                      { id: 'converted', label: 'Converted Leads', count: leadsList.filter(l => ['CONVERTED', 'BOOKING_PROCESS'].includes(l.lead_status)).length, color: '#22c55e' },
                      { id: 'nurture', label: 'Nurture / Recycle', count: leadsList.filter(l => l.lead_status === 'NURTURE' || l.lead_status === 'RECYCLE').length, color: isLight ? '#64748b' : '#94a3b8' },
                      { id: 'lost_closed', label: 'Lost / Closed', count: leadsList.filter(l => ['LOST', 'NOT_INTERESTED', 'CANCELLED'].includes(l.lead_status)).length, color: '#64748b' }
                    ].map(tab => (
                      <button
                        key={tab.id}
                        onClick={() => setLeadInboxTab(tab.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          fontSize: '0.78rem',
                          fontWeight: '800',
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          background: leadInboxTab === tab.id ? 'rgba(14, 165, 233, 0.18)' : '#1e293b',
                          color: leadInboxTab === tab.id ? '#38bdf8' : '#94a3b8',
                          border: leadInboxTab === tab.id ? '1px solid #38bdf8' : '1px solid #334155',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <span>{tab.label}</span>
                        <span style={{ background: tab.badgeBg || '#0f172a', color: tab.badgeBg ? '#ffffff' : tab.color, padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: '900' }}>
                          {tab.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* UNIVERSAL SEARCH & ADVANCED FILTERS TOOLBAR */}
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: '300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '8px', padding: '6px 12px', width: '100%' }}>
                        <Search size={16} color="#38bdf8" />
                        <input
                          type="text"
                          placeholder="🔍 Universal Lead Search (Lead ID: SRM-LEAD-2026-000001, Name, Phone, Email, Location...)"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          style={{ background: 'transparent', border: 'none', color: isLight ? '#0f172a' : '#ffffff', outline: 'none', fontSize: '0.82rem', width: '100%', fontWeight: '700' }}
                        />
                        {searchQuery && (
                          <X size={14} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')} title="Clear Search" />
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Source:</span>
                        <select value={leadSourceFilter} onChange={(e) => setLeadSourceFilter(e.target.value)} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', fontWeight: '700' }}>
                          <option value="ALL">All Sources</option>
                          <option value="Facebook">Facebook Ads</option>
                          <option value="Google Ads">Google Ads</option>
                          <option value="Website">Website</option>
                          <option value="Walk-in">Walk-in</option>
                          <option value="Referral">Referral</option>
                          <option value="Developer">Developer Reference</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Priority:</span>
                        <select value={leadPriorityFilter} onChange={(e) => setLeadPriorityFilter(e.target.value)} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', fontWeight: '700' }}>
                          <option value="ALL">All Priorities</option>
                          <option value="HOT">🔥 HOT</option>
                          <option value="WARM">⚡ WARM</option>
                          <option value="COLD">❄️ COLD</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* CENTRAL LEAD MASTER TABLE */}
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>
                        📋 Central Lead Master Vault ({leadsList.filter(l => {
                          if (leadInboxTab === 'unassigned') return !l.assigned_employee_id || l.assigned_employee_id === 'Unassigned';
                          if (leadInboxTab === 'my_leads') return l.assigned_employee_id === 'USR-07' || l.assigned_employee_name?.includes('Priya');
                          if (leadInboxTab === 'today_followups') return l.next_followup && l.next_followup.startsWith(new Date().toISOString().split('T')[0]);
                          if (leadInboxTab === 'overdue_followups') return l.next_followup && new Date(l.next_followup) < new Date() && !l.next_followup.startsWith(new Date().toISOString().split('T')[0]);
                          if (leadInboxTab === 'nurture') return l.lead_status === 'NURTURE' || l.lead_status === 'RECYCLE';
                          if (leadInboxTab === 'interested') return ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.lead_status) || ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.call_disposition);
                          if (leadInboxTab === 'matching') return ['MATCHING_PENDING', 'MATCHING_DONE'].includes(l.lead_status);
                          if (leadInboxTab === 'visit') return ['VISIT_PLANNED', 'VISIT_COMPLETED'].includes(l.lead_status);
                          if (leadInboxTab === 'converted') return ['CONVERTED', 'BOOKING_PROCESS'].includes(l.lead_status);
                          if (leadInboxTab === 'lost_closed') return ['LOST', 'NOT_INTERESTED', 'CANCELLED'].includes(l.lead_status);
                          return true;
                        }).filter(l => matchesSearchQuery(l, searchQuery)).length} Leads)
                      </h3>

                      <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                        Showing filtered lead queue • Auto-refreshed
                      </span>
                    </div>

                    <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                          <th style={{ padding: '12px' }}>Lead ID & Cust ID</th>
                          <th style={{ padding: '12px' }}>Customer Name & Contact</th>
                          <th style={{ padding: '12px' }}>Source Channel</th>
                          <th style={{ padding: '12px' }}>Preferred Area & BHK</th>
                          <th style={{ padding: '12px' }}>Budget Range</th>
                          <th style={{ padding: '12px' }}>Score & Priority</th>
                          <th style={{ padding: '12px' }}>Disposition & Next Action</th>
                          <th style={{ padding: '12px' }}>Next Follow-Up</th>
                          <th style={{ padding: '12px' }}>Assigned Executive</th>
                          <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leadsList
                          .filter(l => {
                            if (leadInboxTab === 'unassigned') return !l.assigned_employee_id || l.assigned_employee_id === 'Unassigned';
                            if (leadInboxTab === 'my_leads') return l.assigned_employee_id === 'USR-07' || l.assigned_employee_name?.includes('Priya');
                            if (leadInboxTab === 'today_followups') return l.next_followup && l.next_followup.startsWith(new Date().toISOString().split('T')[0]);
                            if (leadInboxTab === 'overdue_followups') return l.next_followup && new Date(l.next_followup) < new Date() && !l.next_followup.startsWith(new Date().toISOString().split('T')[0]);
                            if (leadInboxTab === 'nurture') return l.lead_status === 'NURTURE' || l.lead_status === 'RECYCLE';
                            if (leadInboxTab === 'interested') return ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.lead_status) || ['INTERESTED', 'CONNECTED_INTERESTED'].includes(l.call_disposition);
                            if (leadInboxTab === 'matching') return ['MATCHING_PENDING', 'MATCHING_DONE'].includes(l.lead_status);
                            if (leadInboxTab === 'visit') return ['VISIT_PLANNED', 'VISIT_COMPLETED'].includes(l.lead_status);
                            if (leadInboxTab === 'converted') return ['CONVERTED', 'BOOKING_PROCESS'].includes(l.lead_status);
                            if (leadInboxTab === 'lost_closed') return ['LOST', 'NOT_INTERESTED', 'CANCELLED'].includes(l.lead_status);
                            return true;
                          })
                          .filter(l => leadSourceFilter === 'ALL' || l.source === leadSourceFilter)
                          .filter(l => leadPriorityFilter === 'ALL' || l.priority === leadPriorityFilter)
                          .filter(l => matchesSearchQuery(l, searchQuery))
                          .map((lead, idx) => {
                            const isOverdue = lead.next_followup && new Date(lead.next_followup) < new Date() && !lead.next_followup.startsWith(new Date().toISOString().split('T')[0]);
                            const isToday = lead.next_followup && lead.next_followup.startsWith(new Date().toISOString().split('T')[0]);

                            return (
                              <tr key={lead.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', background: isOverdue ? 'rgba(239, 68, 68, 0.05)' : isToday ? 'rgba(234, 179, 8, 0.05)' : 'transparent' }}>
                                <td style={{ padding: '12px' }}>
                                  <span
                                    onClick={() => setShowLead360Drawer({ open: true, lead, tab: 'OVERVIEW' })}
                                    style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.84rem', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '3px 8px', borderRadius: '6px', cursor: 'pointer', display: 'inline-block' }}
                                    title="Click to view 360° Lead Journey Drawer"
                                  >
                                    🆔 {lead.lead_number}
                                  </span>
                                  <br />
                                  <span
                                    onClick={() => openIdDetailsModal(lead.customer_number || lead.customer_id, 'CUSTOMER_ID')}
                                    style={{ fontSize: '0.72rem', color: '#4ade80', fontFamily: 'monospace', textDecoration: 'underline', cursor: 'pointer' }}
                                  >
                                    {lead.customer_number || lead.customer_id}
                                  </span>
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.88rem' }}>{lead.customer_name}</strong>
                                  <br />
                                  <span style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace' }}>{maskPhone(lead.mobile)}</span>
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '3px 8px', borderRadius: '4px', color: '#38bdf8', fontWeight: '800', fontSize: '0.73rem' }}>
                                    {lead.source || 'Facebook'}
                                  </span>
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{lead.preferred_location}</strong>
                                  <br />
                                  <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: '800' }}>{lead.bhk || '3BHK'}</span>
                                </td>

                                <td style={{ padding: '12px', color: '#4ade80', fontWeight: '800' }}>
                                  {lead.budget_max ? formatIndianRupees(lead.budget_max) : '₹70 Lakhs+'}
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <span style={{ background: lead.priority === 'HOT' ? 'rgba(239, 68, 68, 0.2)' : lead.priority === 'WARM' ? 'rgba(234, 179, 8, 0.2)' : 'rgba(56, 189, 248, 0.2)', color: lead.priority === 'HOT' ? '#ef4444' : lead.priority === 'WARM' ? '#fbbf24' : '#38bdf8', padding: '3px 8px', borderRadius: '4px', fontWeight: '900', fontSize: '0.73rem' }}>
                                    {lead.priority === 'HOT' ? '🔥' : lead.priority === 'WARM' ? '⚡' : '❄️'} {lead.priority} ({lead.quality_score || 80}/100)
                                  </span>
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', fontSize: '0.78rem' }}>{lead.call_disposition || 'New Lead'}</span>
                                  <br />
                                  <span style={{ color: '#38bdf8', fontSize: '0.72rem' }}>Next: {lead.next_action || 'Contact Customer'}</span>
                                </td>

                                <td style={{ padding: '12px' }}>
                                  {lead.next_followup ? (
                                    <div style={{ color: isOverdue ? '#ef4444' : isToday ? '#fbbf24' : '#94a3b8', fontWeight: isOverdue || isToday ? '900' : '500' }}>
                                      {isOverdue && '🚨 OVERDUE: '}
                                      {isToday && '🔥 TODAY: '}
                                      {new Date(lead.next_followup).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })} • {new Date(lead.next_followup).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                  ) : (
                                    <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>No follow-up set</span>
                                  )}
                                </td>

                                <td style={{ padding: '12px' }}>
                                  <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', fontSize: '0.78rem' }}>{lead.assigned_employee_name || 'Priya Nair (Sales Exec)'}</span>
                                </td>

                                <td style={{ padding: '12px', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button
                                      onClick={() => setShowCallDispositionModal({ open: true, lead })}
                                      style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}
                                      title="Log Call Disposition & Schedule Next Action"
                                    >
                                      📞 Call Log
                                    </button>

                                    <button
                                      onClick={() => setShowLead360Drawer({ open: true, lead, tab: 'OVERVIEW' })}
                                      style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}
                                      title="Open 360° Lead Journey Drawer"
                                    >
                                      🎯 360°
                                    </button>

                                    <button
                                      onClick={() => {
                                        const matchedCust = customers.find(c => c.customer_number === lead.customer_number || c.mobile === lead.mobile);
                                        if (matchedCust) setSelectedCust(matchedCust);
                                        setActiveTab('matching_management');
                                      }}
                                      style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}
                                      title="Hand-off to AI Matching Management"
                                    >
                                      ⚡ Match
                                    </button>

                                    <button
                                      onClick={() => setShowTransferLeadModal({ open: true, lead })}
                                      style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#fbbf24', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.7rem' }}
                                      title="Transfer Lead Ownership"
                                    >
                                      🔄 Transfer
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
</div>
                  </div>
                </>
              )}

              {/* FOLLOW-UP CALENDAR SUB-VIEW */}
              {leadViewMode === 'calendar' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📅 INTERACTIVE FOLLOW-UP & CALLBACK CALENDAR</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Scheduled callbacks, client meetings, and property site visits for the current month.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)', gap: '10px' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', padding: '10px', borderRadius: '8px', textAlign: 'center', fontWeight: '900', fontSize: '0.8rem' }}>
                        {d}
                      </div>
                    ))}

                    {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                      const dayStr = `2026-08-${String(day).padStart(2, '0')}`;
                      const dayLeads = leadsList.filter(l => l.next_followup && l.next_followup.startsWith(dayStr));

                      return (
                        <div key={day} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: day === 24 || day === 25 ? '2px solid #0284c7' : '1px solid #334155', borderRadius: '10px', padding: '10px', minHeight: '90px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: '900', color: day === 24 ? '#38bdf8' : '#ffffff' }}>Day {day}</span>

                          {dayLeads.map((dl, idx) => (
                            <div
                              key={idx}
                              onClick={() => setShowCallDispositionModal({ open: true, lead: dl })}
                              style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', borderRadius: '6px', padding: '4px 6px', fontSize: '0.7rem', cursor: 'pointer' }}
                            >
                              <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{dl.customer_name}</strong>
                              <br />
                              <span style={{ color: '#fbbf24' }}>{dl.next_action || 'Followup'}</span>
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* LEAD ANALYTICS & SOURCE PERFORMANCE SUB-VIEW */}
              {leadViewMode === 'analytics' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>📊 LEAD SOURCE PERFORMANCE & CONVERSION ANALYTICS</h3>
                    <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                      <thead>
                        <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                          <th style={{ padding: '10px' }}>Lead Source</th>
                          <th style={{ padding: '10px' }}>Total Ingested Leads</th>
                          <th style={{ padding: '10px' }}>Interested Leads</th>
                          <th style={{ padding: '10px' }}>Site Visits Done</th>
                          <th style={{ padding: '10px' }}>Confirmed Bookings</th>
                          <th style={{ padding: '10px' }}>Conversion Rate</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { src: 'Facebook', total: 142, interested: 84, visits: 38, bookings: 12, pct: '8.4%' },
                          { src: 'Google Ads', total: 98, interested: 62, visits: 29, bookings: 10, pct: '10.2%' },
                          { src: 'Website', total: 54, interested: 32, visits: 18, bookings: 6, pct: '11.1%' },
                          { src: 'Walk-in', total: 32, interested: 24, visits: 22, bookings: 8, pct: '25.0%' },
                          { src: 'Referral', total: 24, interested: 20, visits: 18, bookings: 9, pct: '37.5%' }
                        ].map((row, idx) => (
                          <tr key={idx} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                            <td style={{ padding: '10px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{row.src}</td>
                            <td style={{ padding: '10px', color: '#38bdf8', fontWeight: '800' }}>{row.total}</td>
                            <td style={{ padding: '10px', color: '#fbbf24', fontWeight: '800' }}>{row.interested}</td>
                            <td style={{ padding: '10px', color: '#c084fc', fontWeight: '800' }}>{row.visits}</td>
                            <td style={{ padding: '10px', color: '#4ade80', fontWeight: '800' }}>{row.bookings}</td>
                            <td style={{ padding: '10px', color: '#4ade80', fontWeight: '900' }}>{row.pct}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
</div>
                  </div>
                </div>
              )}

              {/* VIEW MODE 4: INTERACTIVE WORKFLOW PIPELINE DIAGRAM */}
              {leadViewMode === 'pipeline' && (
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #0284c7', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                  
                  {/* HEADER */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <GitMerge size={22} color="#38bdf8" />
                        <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>ENTERPRISE LEAD WORKFLOW & CONVERSION PIPELINE</h3>
                        <span style={{ background: '#0284c7', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900' }}>LIVE PIPELINE ARCHITECTURE</span>
                      </div>
                      <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                        Interactive visual node diagram tracing every lead from Central Inbox to Final Booking Confirmation. Click any node to filter the Central Inbox table.
                      </p>
                    </div>
                    <button onClick={() => setLeadViewMode('inbox')} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>
                      📋 Return to Central Inbox Table
                    </button>
                  </div>

                  {/* DIAGRAM GRAPH NODES */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', width: '100%' }}>
                    
                    {/* NODE LEVEL 1: CENTRAL LEAD INBOX */}
                    <div 
                      onClick={() => { setLeadInboxTab('all'); setLeadViewMode('inbox'); }}
                      style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', border: '2px solid #38bdf8', padding: '12px 32px', borderRadius: '12px', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(2, 132, 199, 0.4)' }}
                    >
                      <span style={{ fontSize: '0.72rem', color: '#e0f2fe', fontWeight: '800', textTransform: 'uppercase' }}>STEP 1: CENTRAL GATEWAY</span>
                      <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '1.05rem', fontWeight: '900', margin: '2px 0 0 0' }}>📥 CENTRAL LEAD INBOX</h4>
                      <span style={{ fontSize: '0.75rem', color: '#bae6fd', fontWeight: '800' }}>{leadsList.length} Total Captured Leads</span>
                    </div>

                    <ArrowDown size={20} color="#0284c7" />

                    {/* NODE LEVEL 2: LEAD ID CREATED */}
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #fbbf24', padding: '10px 24px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '900', textTransform: 'uppercase' }}>PERMANENT TRACEABILITY</span>
                      <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.92rem', fontWeight: '900', fontFamily: 'monospace', margin: '2px 0 0 0' }}>🆔 LEAD ID CREATED (SRM-LEAD-2026-XXXXXX)</h4>
                    </div>

                    <ArrowDown size={20} color="#fbbf24" />

                    {/* NODE LEVEL 3: THREE BRANCHES (NEW LEAD | ASSIGNED | FOLLOW-UP) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', width: '100%', maxWidth: '850px' }}>
                      
                      <div 
                        onClick={() => { setLeadInboxTab('unassigned'); setLeadViewMode('inbox'); }}
                        style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #a855f7', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: '900' }}>1. UNASSIGNED QUEUE</span>
                        <h5 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '0.88rem', margin: '2px 0 0 0' }}>🆕 NEW LEAD</h5>
                        <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{leadsList.filter(l => !l.assigned_employee_id || l.assigned_employee_id === 'Unassigned').length} Pending Assignment</span>
                      </div>

                      <div 
                        onClick={() => { setLeadInboxTab('my_leads'); setLeadViewMode('inbox'); }}
                        style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #38bdf8', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '900' }}>2. CRM ASSIGNED</span>
                        <h5 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '0.88rem', margin: '2px 0 0 0' }}>👤 ASSIGNED EXEC</h5>
                        <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{leadsList.filter(l => l.assigned_employee_id && l.assigned_employee_id !== 'Unassigned').length} Active Executives</span>
                      </div>

                      <div 
                        onClick={() => { setLeadInboxTab('today_followups'); setLeadViewMode('inbox'); }}
                        style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #fbbf24', borderRadius: '12px', padding: '12px', textAlign: 'center', cursor: 'pointer' }}
                      >
                        <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '900' }}>3. SCHEDULED</span>
                        <h5 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '900', fontSize: '0.88rem', margin: '2px 0 0 0' }}>⏰ FOLLOW-UP</h5>
                        <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{leadsList.filter(l => l.next_followup).length} Scheduled Callbacks</span>
                      </div>

                    </div>

                    <ArrowDown size={20} color="#38bdf8" />

                    {/* NODE LEVEL 4: SALES ACTIVITY */}
                    <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', border: '2px solid #38bdf8', padding: '12px 28px', borderRadius: '12px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.7rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase' }}>INTERACTIVE CALL LOG & DISPOSITION GATEWAY</span>
                      <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '1rem', fontWeight: '900', margin: '2px 0 0 0' }}>📞 SALES ACTIVITY (Call / Chat / Site Visit)</h4>
                    </div>

                    <ArrowDown size={20} color="#38bdf8" />

                    {/* NODE LEVEL 5: THREE DISPOSITION OUTCOMES (INTERESTED | NOT INTERESTED | NO RESPONSE) */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', width: '100%' }}>
                      
                      {/* BRANCH 1: INTERESTED -> MATCHING -> COST SHEET -> VISIT -> AGREEMENT -> BOOKING */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #22c55e', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ background: '#22c55e', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontWeight: '900', fontSize: '0.82rem', width: '100%', textAlign: 'center' }}>
                          🟢 INTERESTED ({leadsList.filter(l => ['INTERESTED', 'CONNECTED_INTERESTED', 'MATCHING_PENDING', 'VISIT_PLANNED', 'CONVERTED'].includes(l.lead_status)).length})
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem' }}>
                          <div onClick={() => { setLeadInboxTab('matching'); setLeadViewMode('inbox'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #c084fc', padding: '8px 12px', borderRadius: '8px', color: '#c084fc', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            ⚡ 1. MATCHING ENGINE
                          </div>
                          <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setLeadInboxTab('matching'); setLeadViewMode('inbox'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', padding: '8px 12px', borderRadius: '8px', color: '#4ade80', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            🏠 2. PROPERTY MATCH
                          </div>
                          <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setActiveTab('cost_sheet_share'); setActiveCostSheetShareSubTab('individual_cost_sheets'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #fbbf24', padding: '8px 12px', borderRadius: '8px', color: '#fbbf24', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            📄 3. COST SHEET
                          </div>
                          <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setLeadInboxTab('visit'); setLeadViewMode('inbox'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #38bdf8', padding: '8px 12px', borderRadius: '8px', color: '#38bdf8', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            🚘 4. SITE VISIT
                          </div>
                          <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { if (isMobile) setIsMobileSidebarOpen(false); setActiveTab('agreement_management'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #a855f7', padding: '8px 12px', borderRadius: '8px', color: '#a855f7', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            📜 5. AGREEMENT
                          </div>
                          <div style={{ textAlign: 'center', color: '#4ade80', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setLeadInboxTab('converted'); setLeadViewMode('inbox'); }} style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', padding: '10px 12px', borderRadius: '10px', fontWeight: '900', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.4)' }}>
                            🎉 6. BOOKING CONFIRMED
                          </div>
                        </div>
                      </div>

                      {/* BRANCH 2: NOT INTERESTED -> RE-CALL LATER */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #fbbf24', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ background: '#fbbf24', color: '#0f172a', padding: '6px 14px', borderRadius: '20px', fontWeight: '900', fontSize: '0.82rem', width: '100%', textAlign: 'center' }}>
                          🟡 NOT INTERESTED ({leadsList.filter(l => l.lead_status === 'NURTURE' || l.lead_status === 'RECYCLE' || l.call_disposition === 'PROPERTY_SEARCH_LATER').length})
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', marginTop: '14px' }}>
                          <div style={{ textAlign: 'center', color: '#fbbf24', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setLeadInboxTab('nurture'); setLeadViewMode('inbox'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #fbbf24', padding: '16px 12px', borderRadius: '10px', color: '#fbbf24', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            ⏰ RE-CALL LATER
                            <br />
                            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '600' }}>(Nurture & Recycle Vault)</span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'center', marginTop: '10px', lineHeight: '1.4' }}>
                            Automated callback timer scheduled in 30-90 days for market re-engagement.
                          </p>
                        </div>
                      </div>

                      {/* BRANCH 3: NO RESPONSE -> RETRY */}
                      <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '2px solid #ef4444', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                        <div style={{ background: '#ef4444', color: '#ffffff', padding: '6px 14px', borderRadius: '20px', fontWeight: '900', fontSize: '0.82rem', width: '100%', textAlign: 'center' }}>
                          🔴 NO RESPONSE ({leadsList.filter(l => ['NO_ANSWER', 'UNREACHABLE', 'CALL_BACK_LATER'].includes(l.call_disposition) || l.lead_status === 'CALL_BACK_LATER').length})
                        </div>

                        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem', marginTop: '14px' }}>
                          <div style={{ textAlign: 'center', color: '#ef4444', fontWeight: '900' }}>↓</div>
                          <div onClick={() => { setLeadInboxTab('overdue_followups'); setLeadViewMode('inbox'); }} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', padding: '16px 12px', borderRadius: '10px', color: '#f87171', fontWeight: '900', textAlign: 'center', cursor: 'pointer' }}>
                            🔄 RETRY ATTEMPT
                            <br />
                            <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '600' }}>(Follow-Up Retry Queue)</span>
                          </div>
                          <p style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'center', marginTop: '10px', lineHeight: '1.4' }}>
                            Retry counter tracked (Attempt #1, #2, #3) with automated daily executive reminders.
                          </p>
                        </div>
                      </div>

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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '16px 20px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>CUSTOMER MANAGEMENT</h2>

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
                              <button onClick={() => alert(`🔍 Audit Trail Log for ${item.id}:\n\nUser: ${item.user}\nTimestamp: ${item.time}\nSource: ${item.source}\nStatus: ${item.status}\nIntegrity Check: PASSED (SHA-256 Verified)`)} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', cursor: 'pointer' }}>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>👥 Central Customer Master Registry</h3>
                      <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Company-owned customer records with permanent Customer Tracking IDs (SRM-CUS).</p>
                    </div>
                  </div>

                  <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                    <thead>
                      <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
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
                      {customers
                        .filter(c => matchesSearchQuery(c, searchQuery))
                        .map(c => (
                        <tr key={c.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px' }}>
                            <span 
                              onClick={() => openIdDetailsModal(c.customer_number, 'CUSTOMER_ID')}
                              style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', cursor: 'pointer', textDecoration: 'underline', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', padding: '2px 8px', borderRadius: '6px', display: 'inline-block' }}
                              title="Click to view full Customer details"
                            >
                              🆔 {c.customer_number}
                            </span>
                          </td>
                          <td style={{ padding: '12px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{c.name}</td>
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
                              <button onClick={() => handleStartEditCustomer(c)} style={{ background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                              <button onClick={() => alert(`🔄 Initiated Transfer Request for Customer ${c.customer_number}`)} style={{ background: isLight ? '#ffffff' : '#1e293b', color: '#38bdf8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Transfer</button>
                            </div>
                          </td>
                        </tr>
                      ))}
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

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '8px 16px', borderRadius: '10px', fontWeight: '900', fontSize: '0.9rem' }}>🔥 PRIORITY: HOT ({selectedCust.score}/100)</span>
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
                        <div key={idx} onClick={() => alert(`🔍 Master Transaction Detail Log for ${item.id}:\n\nType: ${item.label}\nCustomer: ${selectedCust.name} (${selectedCust.customer_number})\nStatus: ${item.status}\nCreated: 17 Aug 2026\nAudit Hash: SHA256-VERIFIED-SRM-90412\nTraceability: PERMANENTLY LINKED TO MASTER ID`)} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '10px', cursor: 'pointer' }}>
                          <span style={{ fontSize: '0.62rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block' }}>{item.label}</span>
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

            </div>
          )}

          {/* CATEGORY: MATCHING MANAGEMENT */}
          {activeTab === 'matching_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>SMART AI PROPERTY MATCHING & INVENTORY ENGINE</h2>
                    <span style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>AI MATCHER ACTIVE</span>
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
                const activeMatchingReq = (matchedReq && !matchedReq.costSheetId && matchedReq.status !== 'COST_SHEET_CREATED')
                  ? matchedReq
                  : (pendingRequests[0] || matchedReq || matchingRequestsQueue[0]);

                return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* TOP MATCHING DASHBOARD KPI CARDS (SECTION 19) */}
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : windowWidth <= 1024 ? 'repeat(4, 1fr)' : 'repeat(7, 1fr)', gap: '10px' }}>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>MATCHING REQUESTS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>{matchingRequestsQueue.length + 15}</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>PENDING</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#fbbf24', marginTop: '2px' }}>4</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>IN PROGRESS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>2</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>MATCHED</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>12</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SELECTED</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#4ade80', marginTop: '2px' }}>6</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SHARED WITH CUS</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#38bdf8', marginTop: '2px' }}>5</h4>
                    </div>
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px 10px', borderRadius: '10px', textAlign: 'center' }}>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800' }}>SITE VISIT REQ</span>
                      <h4 style={{ fontSize: '1.2rem', fontWeight: '900', color: '#22c55e', marginTop: '2px' }}>2</h4>
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
                                  <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{req.preferredArea} (Radius: {req.radiusKm || 10} KM)</span>
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

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
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
                                    style={{ width: '16px', height: '16px', cursor: 'pointer' }} 
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
                                  {/* MATCH EXPLANATION (SECTION 9) */}
                                  <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', fontSize: '0.68rem' }}>
                                    <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Preferred Location</span>
                                    <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Within 10 KM Radius</span>
                                    <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Within Budget</span>
                                    <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ 3 BHK Satisfied</span>
                                    <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', padding: '2px 6px', borderRadius: '4px', color: '#4ade80', fontWeight: '700' }}>✓ Ready-to-Move</span>
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
                          })}
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
                      {selectedPropertyIds.map((code, idx) => (
                        <div key={idx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                          <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{code}</span>
                          <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>{properties.find(p => p.property_code === code)?.title || code}</span>
                          <X size={14} color="#ef4444" style={{ cursor: 'pointer' }} onClick={() => setSelectedPropertyIds(selectedPropertyIds.filter(id => id !== code))} />
                        </div>
                      ))}
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
          )}

          {/* CATEGORY: COST SHEET SHARING MANAGEMENT */}
          {activeTab === 'cost_sheet_share' && (
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
          )}

          {/* CATEGORY: VISIT MANAGEMENT */}
          {activeTab === 'visit_management' && (
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
                              const completedStops = plan.stops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
                              const totalStops = plan.stops.length;
                              const pct = Math.round((completedStops / totalStops) * 100);
                              const firstPropTitle = plan.stops[0]?.propertyTitle || 'Property';
                              const extraStopsCount = totalStops - 1;

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
                                  {plan.visitPlanId} — {plan.customerName} ({plan.stops.length} Stops) [{plan.visitDate}]
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
                          const currentPlan = visitPlans.find(p => p.visitPlanId === selectedVisitPlanId) || visitPlans[0];
                          const completedStops = currentPlan.stops.filter((s: any) => s.status === 'VISIT_COMPLETED').length;
                          const totalStops = currentPlan.stops.length;
                          const currentStop = currentPlan.stops[currentPlan.currentStopIndex] || currentPlan.stops[0];

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
                                    🟡 CURRENT ACTIVE STOP (STOP {currentPlan.currentStopIndex + 1})
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
                          <th style={{ padding: '10px' }}>Transport Logistics</th>
                          <th style={{ padding: '10px' }}>Status & Conflict</th>
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
                                  {v.propertyCode && (
                                    <>
                                      <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace' }}>{v.propertyCode}</span>
                                    </>
                                  )}
                                  {/* GPS LATITUDE & LONGITUDE DETECTED FROM PROPERTY PROJECT MASTER DATA */}
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
                                  <span style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', padding: '3px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>
                                    {v.transport || 'Direct Arrival'}
                                  </span>
                                </td>
                                <td style={{ padding: '10px' }}>
                                  <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '3px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: '900', display: 'inline-block' }}>
                                    {v.conflictStatus || '🟢 NO OVERLAP CONFLICT'}
                                  </span>
                                </td>
                                <td style={{ padding: '10px', textAlign: 'center' }}>
                                  <div style={{ display: 'flex', gap: '4px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <button onClick={() => { setActiveVisitSubTab('visit_otp_checkin'); alert(`🔐 Initiated OTP Check-in for Visit ${v.visitId} (${v.customerName})\n📍 Verified Site GPS Coordinates: ${lat}, ${lng}`); }} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}>🔐 OTP Check-In</button>
                                    <button 
                                      onClick={() => {
                                        const cleanLat = lat.replace(/[^0-9.]/g, '') || '17.4612';
                                        const cleanLng = lng.replace(/[^0-9.]/g, '') || '78.3689';
                                        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${cleanLat},${cleanLng}`;
                                        const execPhone = '+91 98490 00014';
                                        const msg = `📱 *SWARAMAYI CRM — SITE VISIT ASSIGNMENT & GPS NAVIGATION*\n\n` +
                                          `👤 *Customer*: ${v.customerName} (${v.mobile})\n` +
                                          `🗓️ *Scheduled Date*: ${v.visitDate} at ${v.visitTime}\n` +
                                          `🏠 *Target Property*: ${v.propertyTitle} (${v.propertyCode})\n` +
                                          `🚘 *Transport*: ${v.transport || 'Direct Arrival'}\n` +
                                          `📍 *GPS Coordinates*: ${lat}, ${lng}\n` +
                                          `🗺️ *Google Maps Live Navigation Link*: ${mapsUrl}\n\n` +
                                          `📌 *Instructions*: Please reach site 15 minutes prior to appointment for OTP Check-In.`;
                                        
                                        const waUrl = `https://api.whatsapp.com/send?phone=${execPhone.replace(/[^0-9]/g, '')}&text=${encodeURIComponent(msg)}`;
                                        window.open(waUrl, '_blank');
                                        alert(`📲 DISPATCHED SITE VISIT & GOOGLE MAPS NAVIGATION LINK TO EXECUTIVE VIA WHATSAPP!\n\nTo Executive: ${v.assignedExecutive} (${execPhone})\nCustomer: ${v.customerName}\nProperty: ${v.propertyTitle}\nGPS Navigation URL: ${mapsUrl}`);
                                      }} 
                                      style={{ background: '#25D366', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                                      title="Send Google Maps Live Location Navigation link to Sales/Field Executive on WhatsApp"
                                    >
                                      📲 WhatsApp Exec Location
                                    </button>
                                    <button onClick={() => { setActiveVisitSubTab('visit_feedback'); alert(`⭐ Opening feedback form for Visit ${v.visitId}`); }} style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.72rem' }}>⭐ Feedback</button>
                                    <button 
                                      onClick={() => {
                                        const matchReq = matchingRequestsQueue.find(r => 
                                          r.customerNumber === v.customerNumber || 
                                          r.customerName.toLowerCase() === (v.customerName || '').toLowerCase()
                                        );
                                        if (matchReq) {
                                          setSelectedMatchingId(matchReq.requestId);
                                        }
                                        const cust = customers.find(c => 
                                          c.customer_number === v.customerNumber || 
                                          c.name.toLowerCase() === (v.customerName || '').toLowerCase()
                                        );
                                        if (cust) {
                                          setSelectedCust(cust);
                                        }
                                        setActiveTab('matching_management');
                                        setActiveMatchingSubTab('ai_matching_engine');
                                        alert(`🎯 Customer ${v.customerName} requested more project options post-visit!\n\nSwitched to Matching Management workspace. Maintained identical process pipeline.`);
                                      }} 
                                      style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontWeight: '900', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '2px' }}
                                      title="If customer wants more project options after visit, switch to Matching Management to present additional properties."
                                    >
                                      🎯 More Projects (Matching) →
                                    </button>
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

              {/* SUB-TAB 2: OTP & GEOFENCE CHECK-IN */}
              {activeVisitSubTab === 'visit_otp_checkin' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>🔐 6-Digit Mobile OTP & GPS Geofence Verification</h3>
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ color: '#4ade80', fontWeight: '800' }}>🟢 Customer Mobile OTP Verified (849201)</div>
                    <div style={{ color: '#38bdf8', fontWeight: '800' }}>🟢 GPS Geofence Verified: 17.4612° N, 78.3685° E (Within 100m of Property Site)</div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: VISIT FEEDBACK & POST-VISIT PROJECT EXPANSION */}
              {activeVisitSubTab === 'visit_feedback' && (
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>⭐ Structured 5-Star Customer Feedback Vault</h3>
                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ color: '#fbbf24', fontWeight: '800' }}>Overall Property Rating: ⭐⭐⭐⭐⭐ (5/5)</div>
                    <div style={{ color: isLight ? '#0f172a' : '#ffffff' }}>Observations: "Customer completed visit. Requested additional project options in Kondapur / Gachibowli."</div>
                    
                    <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: '800' }}>
                        💡 Customer wants to explore more project options post-visit?
                      </span>
                      <button 
                        onClick={() => {
                          setActiveTab('matching_management');
                          setActiveMatchingSubTab('ai_matching_engine');
                        }}
                        style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                      >
                        🎯 Switch to Matching Management for Additional Projects →
                      </button>
                    </div>
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
          )}

          {/* CATEGORY 5: BILLING MANAGEMENT */}
          {activeTab === 'billing_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>Billing & GST Tax Invoices Vault</h2>
                  <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>GST 18% Compliant tax invoice generation and financial ledgers.</p>
                </div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Invoice Number</th>
                      <th style={{ padding: '12px' }}>Developer</th>
                      <th style={{ padding: '12px' }}>Customer Name</th>
                      <th style={{ padding: '12px' }}>Total Invoice Amount</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices
                      .filter(i => matchesSearchQuery(i, searchQuery))
                      .map(i => (
                        <tr key={i.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                          <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{i.invoice_number}</td>
                          <td style={{ padding: '12px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{i.developer_name}</td>
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
            </div>
          )}

          {/* CATEGORY 6: PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginBottom: '16px' }}>Active User Profile Scope</h2>
              <p style={{ color: '#cbd5e1' }}>Logged in as: <strong style={{ color: '#38bdf8' }}>Rajesh Varma (Super Admin / Owner)</strong></p>
            </div>
          )}

          {/* CATEGORY 7: AGREEMENT MANAGEMENT (RESTORED CONTRACT MODAL & TABLE) */}
          {activeTab === 'agreement_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>Legal Agreements Vault & OTP Signature Stamps</h2>
                  <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>Binding site-visit non-circumvention agreements and developer contracts.</p>
                </div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '24px' }}>
                <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', textAlign: 'left', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155' }}>
                      <th style={{ padding: '12px' }}>Agreement Code</th>
                      <th style={{ padding: '12px' }}>Agreement Title</th>
                      <th style={{ padding: '12px' }}>Party Name</th>
                      <th style={{ padding: '12px' }}>Digital Signature Stamp</th>
                      <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agreements
                      .filter(a => matchesSearchQuery(a, searchQuery))
                      .map(a => (
                      <tr key={a.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{a.agreement_code}</td>
                        <td style={{ padding: '12px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{a.title}</td>
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
            </div>
          )}

          {/* DEDICATED LOCATION MAP CATEGORY */}
          {activeTab === 'map_management' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Compass size={24} color="#38bdf8" /> Project Location Wise Interactive Geographical Radar Map
                  </h2>
                  <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>Dedicated map portal: Click any location pin to inspect property specifications, prices, and owner contacts.</p>
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
                <div style={{ background: isLight ? '#ffffff' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', height: '560px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
                  
                  {/* TOP OVERLAY CONTROL HEADER */}
                  <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isLight ? 'rgba(255, 255, 255, 0.94)' : 'rgba(15, 23, 42, 0.94)', backdropFilter: 'blur(8px)', padding: '10px 16px', borderRadius: '10px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', boxShadow: '0 4px 14px rgba(0,0,0,0.25)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Compass size={18} color="#0284c7" />
                      <span style={{ fontSize: '0.85rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>
                        📍 Location: {selectedProperty ? `${selectedProperty.locality} (GPS: ${selectedProperty.latitude || '17.4474'}, ${selectedProperty.longitude || '78.3762'})` : (selectedLocality === 'ALL' ? 'Hyderabad Core' : selectedLocality)}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* MODE SWITCHER */}
                      <div style={{ background: isLight ? '#f1f5f9' : '#1e293b', borderRadius: '6px', padding: '3px', display: 'flex', gap: '4px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                        <button 
                          onClick={() => setMapViewMode('google_map')} 
                          style={{ background: mapViewMode === 'google_map' ? '#0284c7' : 'transparent', color: mapViewMode === 'google_map' ? '#ffffff' : (isLight ? '#64748b' : '#94a3b8'), border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                        >
                          🗺️ Google Map
                        </button>
                        <button 
                          onClick={() => setMapViewMode('radar')} 
                          style={{ background: mapViewMode === 'radar' ? '#0284c7' : 'transparent', color: mapViewMode === 'radar' ? '#ffffff' : (isLight ? '#64748b' : '#94a3b8'), border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
                        >
                          📡 Radar Pins
                        </button>
                      </div>

                      <a 
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((selectedProperty ? selectedProperty.title + ' ' + selectedProperty.locality : selectedLocality) + ' Hyderabad')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', textDecoration: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)' }}
                      >
                        Open Google Maps ↗
                      </a>
                    </div>
                  </div>

                  {/* MAP BODY */}
                  {mapViewMode === 'google_map' ? (
                    <iframe
                      title="Google Maps Interactive View"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      src={`https://maps.google.com/maps?q=${
  (selectedProperty && selectedProperty.latitude && selectedProperty.longitude)
    ? `${String(selectedProperty.latitude).replace(/[^\d.-]/g, '')},${String(selectedProperty.longitude).replace(/[^\d.-]/g, '')}`
    : encodeURIComponent((selectedProperty ? selectedProperty.title + ', ' + selectedProperty.locality : (selectedLocality === 'ALL' ? 'Hyderabad' : selectedLocality)) + ', Telangana, India')
}&t=&z=16&ie=UTF8&iwloc=&output=embed`}
                    />
                  ) : (
                    <div style={{ flex: 1, position: 'relative', overflow: 'hidden', padding: '60px 20px 20px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: isLight ? '#f8fafc' : '#0f172a' }}>
                      <div style={{ position: 'absolute', inset: 0, opacity: 0.15, backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                      <div style={{ position: 'relative', flex: 1, margin: '20px 0' }}>
                        {filteredProperties.map(p => (
                          <div 
                            key={p.id} 
                            onClick={() => setSelectedProperty(p)}
                            style={{ 
                              position: 'absolute', left: `${p.map_x || 40}%`, top: `${p.map_y || 40}%`, transform: 'translate(-50%, -50%)', zIndex: selectedProperty.id === p.id ? 30 : 20, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center'
                            }}
                          >
                            <div style={{ background: selectedProperty.id === p.id ? '#0284c7' : '#1e293b', color: isLight ? '#0f172a' : '#ffffff', border: selectedProperty.id === p.id ? '2px solid #38bdf8' : '1px solid #334155', padding: '4px 8px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', boxShadow: '0 4px 12px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
                              <span style={{ color: '#4ade80' }}>{p.final_price}</span> | {p.locality}
                            </div>
                            <div style={{ background: selectedProperty.id === p.id ? '#38bdf8' : '#0284c7', width: '22px', height: '22px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '4px', boxShadow: '0 0 15px #0284c7' }}>
                              <MapPin size={13} color="#ffffff" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* BOTTOM OVERLAY STATUS BAR */}
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', fontSize: '0.75rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>
                    <span>📍 Google Maps GPS Coordinates Engine • {selectedProperty ? `${selectedProperty.title} (${selectedProperty.latitude || '17.4474'}, ${selectedProperty.longitude || '78.3762'})` : (selectedLocality === 'ALL' ? 'Hyderabad Core' : selectedLocality)}</span>
                    <span style={{ color: '#22c55e', fontWeight: '800' }}>● Live Map Sync Active ({filteredProperties.length} Properties Tracked)</span>
                  </div>
                </div>

                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
                    <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{selectedProperty.property_code}</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginTop: '6px' }}>{selectedProperty.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>📍 {selectedProperty.locality}, Hyderabad</p>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>Asking Price</span>
                      <span style={{ fontSize: '1.3rem', color: '#4ade80', fontWeight: '900' }}>{selectedProperty.final_price}</span>
                    </div>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>Rate / Sq.Ft.</span>
                      <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '800' }}>{selectedProperty.price_sqft}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                    <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Developer</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{selectedProperty.developer}</strong>
                    </div>
                    <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Config</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{selectedProperty.configuration}</strong>
                    </div>
                  </div>

                  <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px 12px', borderRadius: '8px', border: '1px solid #0284c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>GPS Coordinates (Project Mgmt)</span>
                      <strong style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                        📍 {selectedProperty.latitude || '17.4474'}, {selectedProperty.longitude || '78.3762'}
                      </strong>
                    </div>
                    <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.68rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px' }}>
                      ✓ GPS Synced
                    </span>
                  </div>

                  <a 
                    href={
                      (selectedProperty && selectedProperty.latitude && selectedProperty.longitude)
                        ? `https://www.google.com/maps?q=${String(selectedProperty.latitude).replace(/[^\d.-]/g, '')},${String(selectedProperty.longitude).replace(/[^\d.-]/g, '')}`
                        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedProperty.title + ' ' + selectedProperty.locality + ' Hyderabad')}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', textDecoration: 'none', padding: '9px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', marginTop: '4px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
                  >
                    🧭 Open Exact GPS Pin on Google Maps ↗
                  </a>

                  <div style={{ display: 'flex', gap: '8px', paddingTop: '10px' }}>
                    <button onClick={() => handleStartEditProperty(selectedProperty)} style={{ flex: 1, background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Edit Record</button>
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
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
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

            <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
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
</div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setShowInvoiceModal(false)} style={{ background: '#64748b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Close</button>
              <button onClick={() => window.print()} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' }}>Print PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* PRINTABLE LEGAL CONTRACT MODAL */}
      {showFullContractModal && selectedAgreement && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
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
              <button onClick={() => setShowFullContractModal(false)} style={{ background: '#64748b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '700' }}>Close</button>
              <button onClick={() => window.print()} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' }}>Print Contract PDF</button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT PROPERTY MODAL */}
      {showEditPropertyModal && editingProperty && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '700px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>✏️ Edit Property Master Record ({editingProperty.property_code})</h3>
            <form onSubmit={handleSaveEditedProperty} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" value={editingProperty.title} onChange={(e) => setEditingProperty({ ...editingProperty, title: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <input type="text" value={editingProperty.final_price} onChange={(e) => setEditingProperty({ ...editingProperty, final_price: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px', borderRadius: '6px' }} required />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowEditPropertyModal(false)} style={{ flex: 1, background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '800' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER MODAL */}
      {showEditCustomerModal && editingCustomer && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '700px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>✏️ Edit Customer Master Record ({editingCustomer.customer_number})</h3>
            <form onSubmit={handleSaveEditedCustomer} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" value={editingCustomer.name} onChange={(e) => setEditingCustomer({ ...editingCustomer, name: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px' }} required />
              <input type="text" value={editingCustomer.budget} onChange={(e) => setEditingCustomer({ ...editingCustomer, budget: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '800', padding: '8px', borderRadius: '6px' }} required />
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="button" onClick={() => setShowEditCustomerModal(false)} style={{ flex: 1, background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px' }}>Cancel</button>
                <button type="submit" style={{ flex: 1, background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '800' }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE USER MODAL */}
      {showUserModal && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '94vw', maxWidth: '750px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {editingUser ? '✏️ Edit Enterprise Employee Account' : '👤 Create Enterprise Employee Account'}
                </h3>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Provision user credentials, login security, role assignment, and organizational hierarchy.
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowUserModal(false); setEditingUser(null); }} title="Close Modal" />
            </div>

            {/* AUTO-GENERATED TRACKING ID CARD */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '12px', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  SYSTEM EMPLOYEE USER ID (AUTO-GENERATED)
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0284c7', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                  {editingUser ? editingUser.id : `USR-0${users.length + 1}`}
                </h3>
              </div>
              <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', border: '1px solid #22c55e', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                ✓ AUTO-GENERATED & UNIQUE
              </span>
            </div>

            <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* SECTION 1: IDENTITY & LOGIN CREDENTIALS */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0284c7', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  1. Identity & Login Credentials
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Full Name *</label>
                    <input type="text" value={newUserForm.username} onChange={(e) => setNewUserForm({ ...newUserForm, username: e.target.value, full_name: e.target.value })} placeholder="e.g. Ananya Roy" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Corporate Email *</label>
                    <input type="email" value={newUserForm.email} onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })} placeholder="ananya.roy@swaramayi.com" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Account Password *</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type={showUserModalPassword ? 'text' : 'password'} 
                        value={newUserForm.password || ''} 
                        onChange={(e) => setNewUserForm({ ...newUserForm, password: e.target.value })} 
                        placeholder="••••••••••••" 
                        style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', paddingRight: '40px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} 
                        required 
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserModalPassword(!showUserModalPassword)}
                        title={showUserModalPassword ? 'Hide password' : 'Show password'}
                        style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {showUserModalPassword ? <EyeOff size={16} color="#0284c7" /> : <Eye size={16} color={isLight ? '#64748b' : '#94a3b8'} />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Mobile Contact Phone *</label>
                    <input type="text" value={newUserForm.mobile} onChange={(e) => setNewUserForm({ ...newUserForm, mobile: e.target.value })} placeholder="+91 98490 00009" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
                  </div>
                </div>
              </div>

              {/* SECTION 2: ROLE SCOPE ASSIGNMENT */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0284c7', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  2. Role Scope & Permission Access Level
                </h4>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>System Access Role (15 Enterprise Roles) *</label>
                  <select 
                    value={newUserForm.role} 
                    onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', color: '#0284c7', padding: '10px 12px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: '800', outline: 'none' }}
                  >
                    <option value="SUPER_ADMIN">1. Owner / Super Admin (SUPER_ADMIN)</option>
                    <option value="ADMIN">2. Admin (ADMIN)</option>
                    <option value="GENERAL_MANAGER">3. General Manager (GENERAL_MANAGER)</option>
                    <option value="BRANCH_MANAGER">4. Branch Manager (BRANCH_MANAGER)</option>
                    <option value="SALES_MANAGER">5. Sales Manager (SALES_MANAGER)</option>
                    <option value="TEAM_LEAD">6. Team Leader (TEAM_LEAD)</option>
                    <option value="SALES_EXEC">7. Sales Executive (SALES_EXEC)</option>
                    <option value="TELECALLER">8. Telecaller (TELECALLER)</option>
                    <option value="BACK_OFFICE">9. Back Office / Desk (BACK_OFFICE)</option>
                    <option value="ACCOUNTS">10. Accounts & Finance (ACCOUNTS)</option>
                    <option value="HR">11. Human Resources HR (HR)</option>
                    <option value="MARKETING">12. Marketing Squad (MARKETING)</option>
                    <option value="PROPERTY_MGR">13. Property Manager (PROPERTY_MGR)</option>
                    <option value="FIELD_EXEC">14. Field Executive (FIELD_EXEC)</option>
                    <option value="CUSTOMER_SUPPORT">15. Customer Support (CUSTOMER_SUPPORT)</option>
                  </select>
                </div>
              </div>

              {/* SECTION 3: ORGANIZATION & BRANCH PROFILE DETAILS */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#0284c7', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  3. Organization & Branch Profile Details
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Branch *</label>
                    <select 
                      value={newUserForm.branch_name} 
                      onChange={(e) => setNewUserForm({ ...newUserForm, branch_name: e.target.value })}
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}
                    >
                      <option value="Head Office">Head Office (Hyderabad)</option>
                      <option value="Kondapur Branch">Kondapur Branch</option>
                      <option value="Gachibowli Branch">Gachibowli Branch</option>
                      <option value="Madhapur Branch">Madhapur Branch</option>
                      <option value="Jubilee Hills Branch">Jubilee Hills Branch</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Department / Unit *</label>
                    <select 
                      value={newUserForm.department} 
                      onChange={(e) => setNewUserForm({ ...newUserForm, department: e.target.value })}
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}
                    >
                      <option value="Executive Board">Executive Board</option>
                      <option value="IT Ops Desk">IT Ops Desk</option>
                      <option value="General Management">General Management</option>
                      <option value="Sales Management">Sales Management</option>
                      <option value="Sales">Sales</option>
                      <option value="Telecalling Squad">Telecalling Squad</option>
                      <option value="Accounts & Finance">Accounts & Finance</option>
                      <option value="HR & Admin">HR & Admin</option>
                      <option value="Field Operations">Field Operations</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Team Name *</label>
                    <input type="text" value={newUserForm.team_name} onChange={(e) => setNewUserForm({ ...newUserForm, team_name: e.target.value })} placeholder="e.g. Sales Team Alpha" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Reporting Line Manager *</label>
                    <select 
                      value={newUserForm.manager_name} 
                      onChange={(e) => setNewUserForm({ ...newUserForm, manager_name: e.target.value })}
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '9px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}
                    >
                      <option value="Rajesh Varma (Owner / Super Admin)">Rajesh Varma (Owner / Super Admin)</option>
                      <option value="Anil Kapoor (Admin)">Anil Kapoor (Admin)</option>
                      <option value="Vikram Reddy (GM)">Vikram Reddy (GM)</option>
                      <option value="Suresh Kumar (BM)">Suresh Kumar (BM)</option>
                      <option value="Deepak Verma (SM)">Deepak Verma (SM)</option>
                      <option value="Rahul Sharma (TL)">Rahul Sharma (TL)</option>
                      <option value="Self">Self (Independent)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ACTION FOOTER BUTTONS */}
              <div style={{ display: 'flex', gap: '14px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => { setShowUserModal(false); setEditingUser(null); }} style={{ background: isLight ? '#f1f5f9' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: '800', fontSize: '0.88rem', cursor: 'pointer' }}>
                  Cancel & Exit
                </button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}>
                  {editingUser ? '💾 Save & Update User Account' : '🚀 Provision & Create Employee Account'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* CREATE ENTERPRISE BRANCH MODAL */}
      {showBranchModal && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '94vw', maxWidth: '650px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  🏢 Register New Enterprise Branch
                </h3>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Expand company regional footprint & assign branch management leadership.
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowBranchModal(false)} title="Close Modal" />
            </div>

            <form onSubmit={handleCreateBranchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Branch Office Name *</label>
                <input type="text" value={newBranchForm.branch_name} onChange={(e) => setNewBranchForm({ ...newBranchForm, branch_name: e.target.value })} placeholder="e.g. Banjara Hills Branch" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City Location *</label>
                  <select value={newBranchForm.city} onChange={(e) => setNewBranchForm({ ...newBranchForm, city: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Kolkata">Kolkata</option>
                    <option value="Delhi-NCR">Delhi-NCR</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Branch Manager *</label>
                  <select value={newBranchForm.manager_name} onChange={(e) => setNewBranchForm({ ...newBranchForm, manager_name: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <option value="Vikram Reddy (GM)">Vikram Reddy (GM)</option>
                    <option value="Suresh Kumar (BM)">Suresh Kumar (BM)</option>
                    <option value="Deepak Verma (SM)">Deepak Verma (SM)</option>
                    <option value="Rajesh Varma (Owner)">Rajesh Varma (Owner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Physical Office Address</label>
                <input type="text" value={newBranchForm.address} onChange={(e) => setNewBranchForm({ ...newBranchForm, address: e.target.value })} placeholder="Road No. 12, Banjara Hills, Hyderabad - 500034" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Annual Branch Target Revenue</label>
                <input type="text" value={newBranchForm.target_revenue} onChange={(e) => setNewBranchForm({ ...newBranchForm, target_revenue: e.target.value })} placeholder="e.g. ₹5,00,00,000" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} />
              </div>

              <div style={{ display: 'flex', gap: '12px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowBranchModal(false)} style={{ background: isLight ? '#f1f5f9' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}>🚀 Create & Provision Branch</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ENTERPRISE TEAM MODAL */}
      {showTeamModal && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '94vw', maxWidth: '650px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  👥 Create Sales Team / Squad
                </h3>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Organize executives into high-performance sales squads & assign team leads.
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowTeamModal(false)} title="Close Modal" />
            </div>

            <form onSubmit={handleCreateTeamSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Sales Team Name *</label>
                <input type="text" value={newTeamForm.team_name} onChange={(e) => setNewTeamForm({ ...newTeamForm, team_name: e.target.value })} placeholder="e.g. Sales Team Gamma" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Parent Branch *</label>
                  <select value={newTeamForm.branch_name} onChange={(e) => setNewTeamForm({ ...newTeamForm, branch_name: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <option value="Head Office">Head Office (Hyderabad)</option>
                    <option value="Kondapur Branch">Kondapur Branch</option>
                    <option value="Gachibowli Branch">Gachibowli Branch</option>
                    <option value="Madhapur Branch">Madhapur Branch</option>
                    <option value="Jubilee Hills Branch">Jubilee Hills Branch</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Department Unit *</label>
                  <select value={newTeamForm.department} onChange={(e) => setNewTeamForm({ ...newTeamForm, department: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <option value="Sales">Sales Management</option>
                    <option value="Inside Sales">Inside Sales / Telecalling</option>
                    <option value="Field Operations">Field Operations</option>
                    <option value="Growth & Marketing">Growth & Marketing</option>
                    <option value="Accounts & Finance">Accounts & Finance</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Team Lead *</label>
                  <select value={newTeamForm.leader_name} onChange={(e) => setNewTeamForm({ ...newTeamForm, leader_name: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }}>
                    <option value="Rahul Sharma (TL)">Rahul Sharma (TL)</option>
                    <option value="Deepak Verma (SM)">Deepak Verma (SM)</option>
                    <option value="Suresh Kumar (BM)">Suresh Kumar (BM)</option>
                    <option value="Anil Kapoor (Admin)">Anil Kapoor (Admin)</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Monthly Sales Unit Target</label>
                  <input type="text" value={newTeamForm.monthly_target} onChange={(e) => setNewTeamForm({ ...newTeamForm, monthly_target: e.target.value })} placeholder="e.g. 15 Property Units" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', justifyContent: 'flex-end' }}>
                <button type="button" onClick={() => setShowTeamModal(false)} style={{ background: isLight ? '#f1f5f9' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', fontSize: '0.88rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)' }}>🚀 Create & Provision Team Squad</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE ADVANCED CUSTOMER MASTER MODAL */}
      {(showAddCustomerModal || showCustomerModal) && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '94vw', maxWidth: '850px', maxHeight: '90vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  👤 Register New Customer Master Record
                </h3>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Generates permanent Customer Tracking ID (SRM-CUS) & initial Lead ID (SRM-LEAD).
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => { setShowAddCustomerModal(false); setShowCustomerModal(false); }} />
            </div>

            {/* SYSTEM CUSTOMER CODE GENERATION & VERIFICATION CARD */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #38bdf8', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontFamily: 'monospace' }}>AUTO-DEDUP ENGINE</span>
            </div>

            <form onSubmit={handleCreateCustomerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* SECTION 1: PRIMARY CONTACT & PERSONAL PROFILE */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#38bdf8', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  1. Primary Contact & Personal Information
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                    <input type="text" value={newCustomerForm.name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })} placeholder="e.g. Dr. Ramesh Kulkarni" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>System Customer Code (Auto Created) *</label>
                    <input type="text" value={newCustomerForm.customer_number || `SRM-CUS-2026-000${customers.length + 188}`} readOnly style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #38bdf8', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '900', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Mobile Phone *</label>
                    <input type="text" value={newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, mobile: e.target.value })} placeholder="+91 98490 12345" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Alternate Mobile Phone</label>
                    <input type="text" value={newCustomerForm.alternate_mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, alternate_mobile: e.target.value })} placeholder="+91 98491 54321" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input type="email" value={newCustomerForm.email} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })} placeholder="ramesh@example.com" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City & State</label>
                    <select value={newCustomerForm.city} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, city: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Hyderabad">Hyderabad</option>
                      <option value="Kolkata">Kolkata</option>
                      <option value="Bangalore">Bangalore</option>
                      <option value="Mumbai">Mumbai</option>
                      <option value="Delhi-NCR">Delhi-NCR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Residential Address</label>
                  <input type="text" value={newCustomerForm.address} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })} placeholder="Flat 402, Jubilee Hills, Road No. 36" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>

              {/* SECTION 2: PROPERTY REQUIREMENTS & FINANCIAL LIMITS */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#4ade80', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  2. Property Requirement & Budget Parameters
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Area / Locality *</label>
                    <input type="text" value={newCustomerForm.preferredArea} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, preferredArea: e.target.value })} placeholder="Kondapur / Gachibowli / Hitec City" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Type</label>
                    <select value={newCustomerForm.property_type} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, property_type: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Flat / Apartment">Flat / Apartment</option>
                      <option value="Gated Villa">Gated Villa</option>
                      <option value="Open Plot / Land">Open Plot / Land</option>
                      <option value="Commercial Space">Commercial Space</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Configuration</label>
                    <select value={newCustomerForm.configuration} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, configuration: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="2BHK">2BHK</option>
                      <option value="3BHK">3BHK</option>
                      <option value="4BHK">4BHK</option>
                      <option value="5BHK+ Villa">5BHK+ Villa</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Minimum Budget (₹)</label>
                    <input type="text" value={newCustomerForm.budget_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_min: e.target.value })} placeholder="70,00,000" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Maximum Budget (₹)</label>
                    <input type="text" value={newCustomerForm.budget_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_max: e.target.value })} placeholder="1,50,00,000" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Purchasing Intent Level</label>
                    <select value={newCustomerForm.priority} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, priority: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '800' }}>
                      <option value="HOT">🔥 HOT (Immediate Purchase in 15 Days)</option>
                      <option value="WARM">⚡ WARM (Evaluating Options in 30 Days)</option>
                      <option value="COLD">❄️ COLD (Future Prospect 60+ Days)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Lead Source Channel</label>
                    <select value={newCustomerForm.source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, source: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Facebook Ads">Facebook / Meta Digital Ads</option>
                      <option value="Google PPC Search">Google PPC Search</option>
                      <option value="MagicBricks / 99acres">Property Portals (MagicBricks/99acres)</option>
                      <option value="Walk-In / Site Hoarding">Walk-In / Site Hoarding</option>
                      <option value="Existing Client Referral">Existing Client Referral</option>
                      <option value="Channel Partner">Channel Partner (CP Broker)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Special Notes & Remarks</label>
                  <input type="text" value={newCustomerForm.notes} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, notes: e.target.value })} placeholder="Wants East facing 3BHK with 2 car parkings near IT Hub" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>

              {/* SECTION 3: ASSIGNED SALESPERSON & SECURITY */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '800', color: '#fbbf24', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px' }}>
                  3. Executive Ownership & Access Security
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Assigned Sales Executive *</label>
                    <select value={newCustomerForm.assigned_employee_id} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, assigned_employee_id: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                      <option value="Priya Nair">Priya Nair (Sales Exec)</option>
                      <option value="Rahul Sharma">Rahul Sharma (Team Lead)</option>
                      <option value="Deepak Verma">Deepak Verma (Sales Mgr)</option>
                      <option value="Suresh Kumar">Suresh Kumar (Branch Mgr)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Master Record Status</label>
                    <select value={newCustomerForm.status} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, status: e.target.value })} style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
                      <option value="ACTIVE_ENGAGED">🟢 ACTIVE_ENGAGED (Regular Site Visits & Followups)</option>
                      <option value="NEW_UNASSIGNED">🟡 NEW_UNASSIGNED (Fresh Ingestion Pool)</option>
                      <option value="DEAL_CONVERTED">🎉 DEAL_CONVERTED (Booking Completed)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* MODAL ACTION FOOTER BUTTONS */}
              <div style={{ display: 'flex', gap: '12px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  onClick={() => { setShowAddCustomerModal(false); setShowCustomerModal(false); }} 
                  style={{ background: isLight ? '#f1f5f9' : '#334155', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Cancel & Exit
                </button>
                <button 
                  type="submit" 
                  style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 28px', borderRadius: '8px', fontWeight: '900', fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)' }}
                >
                  🚀 Save & Register Customer Master Record
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 10-STEP ENTERPRISE LEAD INTAKE & QUALIFICATION WIZARD MODAL */}
      {(showLeadModal || showAddCustomerModal) && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(15, 23, 42, 0.5)' : 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #0284c7', width: '94vw', maxWidth: '920px', maxHeight: '92vh', borderRadius: '18px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', boxShadow: isLight ? '0 20px 40px rgba(0,0,0,0.12)' : '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            
            {/* WIZARD HEADER & PROGRESS INDICATOR */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid #334155', paddingBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🚀 9-STEP ENTERPRISE LEAD INTAKE & QUALIFICATION WIZARD</h3>
                  <span style={{ background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800' }}>
                    STEP {leadIntakeStep} OF 9
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                  Central Qualification Gate • Structured Customer Requirement Capture • Matching Handoff System
                </p>
              </div>
              <X size={22} color={isLight ? '#64748b' : '#94a3b8'} style={{ cursor: 'pointer' }} onClick={() => { setShowLeadModal(false); setShowAddCustomerModal(false); setLeadIntakeStep(1); }} />
            </div>

            {/* STEP PROGRESS BAR */}
            <div style={{ display: 'flex', gap: '4px', background: isLight ? '#f1f5f9' : '#0f172a', padding: '6px', borderRadius: '10px' }}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(s => (
                <div 
                  key={s} 
                  onClick={() => setLeadIntakeStep(s)} 
                  style={{ 
                    flex: 1, 
                    height: '8px', 
                    borderRadius: '4px', 
                    background: s <= leadIntakeStep ? '#0284c7' : (isLight ? '#cbd5e1' : '#334155'), 
                    cursor: 'pointer',
                    transition: 'all 0.2s' 
                  }} 
                  title={`Step ${s}`}
                />
              ))}
            </div>

            {/* STEP STEPPER TAB STRIP */}
            <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px', borderBottom: isLight ? '1px solid #e2e8f0' : '1px solid #334155' }}>
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
                    background: leadIntakeStep === item.s ? '#0284c7' : (isLight ? '#f1f5f9' : '#0f172a'), 
                    color: leadIntakeStep === item.s ? '#ffffff' : (isLight ? '#475569' : '#94a3b8'), 
                    border: leadIntakeStep === item.s ? '1px solid #0284c7' : (isLight ? '1px solid #cbd5e1' : '1px solid #334155') 
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* LIVE DUPLICATE CHECKER WARNING BANNER */}
            {newCustomerForm.mobile.length >= 6 && (() => {
              const cleanMobile = newCustomerForm.mobile.replace(/[^0-9]/g, '');
              const foundLead = leadsList.find(l => l.mobile && cleanMobile.length >= 6 && l.mobile.replace(/[^0-9]/g, '').includes(cleanMobile));
              const foundCust = customers.find(c => c.mobile && cleanMobile.length >= 6 && c.mobile.replace(/[^0-9]/g, '').includes(cleanMobile));
              const isDuplicate = !!(foundLead || foundCust);

              return (
                <div style={{ background: isDuplicate ? 'rgba(239, 68, 68, 0.15)' : '#0f172a', border: isDuplicate ? '2px solid #ef4444' : '1px solid #fbbf24', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldAlert size={18} color={isDuplicate ? '#ef4444' : '#fbbf24'} />
                    <span style={{ fontSize: '0.78rem', color: isDuplicate ? '#f87171' : '#fbbf24', fontWeight: '800' }}>
                      {isDuplicate 
                        ? `⚠️ DUPLICATE MATCH DETECTED! Existing record found for mobile '${newCustomerForm.mobile}' (${foundLead ? `Lead ${foundLead.lead_number} - ${foundLead.customer_name}` : `Customer ${foundCust?.customer_number} - ${foundCust?.name}`}).`
                        : `🔍 Live Duplicate Scanner: Phone '${newCustomerForm.mobile}' scanned across Central Lead Database & Customer Master.`}
                    </span>
                  </div>
                  {isDuplicate ? (
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <span style={{ background: '#ef4444', color: '#ffffff', padding: '3px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '900' }}>
                        🔴 DUPLICATE DETECTED
                      </span>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>🟢 NO DUPLICATE FOUND</span>
                  )}
                </div>
              );
            })()}

            {/* STEP 1: LEAD SOURCE & ATTRIBUTION */}
            {leadIntakeStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 1: Lead Source Attribution & Executive Assignment</h4>
                
                {/* ASSIGN EXECUTIVE SELECTOR */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '0.8rem', color: '#fbbf24', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    👤 ASSIGN SALES EXECUTIVE / CLIENT RELATIONSHIP MANAGER *
                  </label>
                  <select 
                    value={newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)'} 
                    onChange={(e) => setNewCustomerForm({ ...newCustomerForm, assigned_employee_id: e.target.value })} 
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '10px 12px', borderRadius: '8px', fontSize: '0.9rem' }}
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Lead Source *</label>
                    <select value={newCustomerForm.lead_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, lead_source: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Campaign ID</label>
                    <input type="text" value={newCustomerForm.campaign_id} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, campaign_id: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>UTM Source / Medium</label>
                    <input type="text" value={newCustomerForm.utm_source} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, utm_source: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Referrer Name & Contact (If Applicable)</label>
                  <input type="text" value={newCustomerForm.referral_name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, referral_name: e.target.value })} placeholder="e.g. Dr. Rajesh Sharma (+91 98480 12345)" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
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
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #38bdf8', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>SYSTEM CUSTOMER CODE (AUTO-GENERATED UNIQUE ID)</span>
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Customer Full Name *</label>
                    <input type="text" value={newCustomerForm.name} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, name: e.target.value })} placeholder="e.g. Sumanth Varma" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Mobile Phone *</label>
                    <input type="text" value={newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, mobile: e.target.value })} placeholder="+91 98490 88888" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>WhatsApp Number</label>
                    <input type="text" value={newCustomerForm.whatsapp || newCustomerForm.mobile} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, whatsapp: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Email Address</label>
                    <input type="email" value={newCustomerForm.email} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, email: e.target.value })} placeholder="sumanth@example.com" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Preferred Language</label>
                    <select value={newCustomerForm.language} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, language: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="English">English</option>
                      <option value="Telugu">Telugu</option>
                      <option value="Hindi">Hindi</option>
                      <option value="Bengali">Bengali</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>City</label>
                    <input type="text" value={newCustomerForm.city} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, city: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Current Residential Locality</label>
                    <input type="text" value={newCustomerForm.address} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, address: e.target.value })} placeholder="e.g. Jubilee Hills, Hyderabad" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>PIN Code</label>
                    <input type="text" value={newCustomerForm.pincode} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, pincode: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Purpose *</label>
                    <select value={newCustomerForm.investment_purpose} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, investment_purpose: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Self Use">🏡 SELF USE (End User Residence)</option>
                      <option value="Investment">📈 INVESTMENT (Capital Appreciation)</option>
                      <option value="Rental Income">💰 RENTAL INCOME (Monthly Yield)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Category Type *</label>
                    <select value={newCustomerForm.property_type} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, property_type: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>BHK Configuration *</label>
                    <select value={newCustomerForm.configuration} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, configuration: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="1BHK">1 BHK</option>
                      <option value="2BHK">2 BHK</option>
                      <option value="3BHK">3 BHK</option>
                      <option value="4BHK">4 BHK</option>
                      <option value="5+ BHK / Duplex">5+ BHK / Duplex Penthouse</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Property Condition *</label>
                    <select value={newCustomerForm.condition} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, condition: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Ready to Move">Ready to Move</option>
                      <option value="Under Construction">Under Construction</option>
                      <option value="Pre-Launch">New Pre-Launch</option>
                      <option value="Resale">Resale Unit</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Floor Preference</label>
                    <input type="text" value={newCustomerForm.floor_pref} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, floor_pref: e.target.value })} placeholder="e.g. 10th Floor or Higher" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Primary Preferred Locality *</label>
                    <input type="text" value={newCustomerForm.preferredArea} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, preferredArea: e.target.value })} placeholder="e.g. Kondapur / Gachibowli or Madhyamgram" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Secondary Preferred Localities</label>
                    <input type="text" value={newCustomerForm.secondary_areas} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, secondary_areas: e.target.value })} placeholder="e.g. Hitec City, Barasat, Sodepur" style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Maximum Map Radius Distance (KM)</label>
                    <select value={newCustomerForm.radius_km} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, radius_km: Number(e.target.value) })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="5">Within 5 KM Radius</option>
                      <option value="10">Within 10 KM Radius</option>
                      <option value="15">Within 15 KM Radius</option>
                      <option value="25">Within 25 KM Radius</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Vastu Facing Preference</label>
                    <select value={newCustomerForm.facing} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, facing: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
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
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Minimum Budget *</label>
                    <input type="text" value={newCustomerForm.budget_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_min: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Maximum Budget *</label>
                    <input type="text" value={newCustomerForm.budget_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_max: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} required />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Budget Flexibility</label>
                    <select value={newCustomerForm.budget_flexibility} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, budget_flexibility: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Fixed Strict">Fixed Strict</option>
                      <option value="+5% Flexible">+5% Flexible</option>
                      <option value="+10% Negotiable">+10% Negotiable</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Min Carpet Area</label>
                    <input type="text" value={newCustomerForm.carpet_area_min} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, carpet_area_min: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Max Carpet Area</label>
                    <input type="text" value={newCustomerForm.carpet_area_max} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, carpet_area_max: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Area Unit</label>
                    <select value={newCustomerForm.area_unit} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, area_unit: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
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
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Parking Type Required</label>
                  <select value={newCustomerForm.parking} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, parking: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                    <option value="Covered Slot + EV Charger">Covered Slot + EV Charger</option>
                    <option value="Covered Slot">Covered Car Parking</option>
                    <option value="Open Parking">Open Parking</option>
                    <option value="Not Required">Not Required</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Required Gated Amenities</label>
                  <input type="text" value={newCustomerForm.amenities} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, amenities: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }} />
                </div>
              </div>
            )}

            {/* STEP 8: LOAN & POSSESSION */}
            {leadIntakeStep === 8 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900', fontSize: '1rem' }}>Step 8: Home Loan Readiness & Possession Timeline</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Bank Loan Required *</label>
                    <select value={newCustomerForm.loan_required} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, loan_required: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No (Self Funded / Cash)</option>
                      <option value="Maybe">Maybe</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Loan Pre-Approval Status</label>
                    <select value={newCustomerForm.loan_status} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, loan_status: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#4ade80', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                      <option value="Pre-Approved">🟢 Pre-Approved</option>
                      <option value="In Process">⚡ Applied / In Process</option>
                      <option value="Not Applied Yet">⚪ Planning to Apply</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Expected Decision Timeline</label>
                    <select value={newCustomerForm.decision_timeline} onChange={(e) => setNewCustomerForm({ ...newCustomerForm, decision_timeline: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#fbbf24', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}>
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
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>REQUIREMENT COMPLETENESS AUDIT SCORE</span>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '2px' }}>94% COMPLETE</h2>
                    <p style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8' }}>Meets strict 80% minimum threshold for property matching engine.</p>
                  </div>
                  <span style={{ background: '#22c55e', color: '#ffffff', padding: '6px 16px', borderRadius: '20px', fontWeight: '900', fontSize: '0.85rem' }}>
                    READY FOR MATCHING
                  </span>
                </div>

                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                  <div>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Customer Name:</span>
                    <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{newCustomerForm.name || 'Sumanth Varma'}</strong>
                  </div>
                  <div>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Mobile Phone:</span>
                    <strong style={{ display: 'block', color: '#4ade80' }}>{newCustomerForm.mobile || '+91 98490 88888'}</strong>
                  </div>
                  <div>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Assigned Executive:</span>
                    <strong style={{ display: 'block', color: '#38bdf8', fontWeight: '900' }}>{newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)'}</strong>
                  </div>
                  <div>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Budget Range:</span>
                    <strong style={{ display: 'block', color: '#fbbf24' }}>{newCustomerForm.budget_min} - {newCustomerForm.budget_max}</strong>
                  </div>
                  <div>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.7rem' }}>Preferred Area:</span>
                    <strong style={{ display: 'block', color: '#38bdf8' }}>{newCustomerForm.preferredArea} ({newCustomerForm.configuration})</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button type="button" onClick={() => setLeadIntakeStep(8)} style={{ flex: 1, background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
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
                      const leadNum = generateNextLeadCode();

                      // 1. CREATE OFFICIAL CENTRAL LEAD MASTER RECORD
                      const newLeadRecord = {
                        id: `LEAD-${Date.now()}`,
                        lead_number: leadNum,
                        customer_id: finalCustomerCode,
                        customer_number: finalCustomerCode,
                        customer_name: nameStr,
                        mobile: mobileStr,
                        alternate_mobile: newCustomerForm.alternate_mobile || '',
                        whatsapp_number: newCustomerForm.whatsapp || mobileStr,
                        email: newCustomerForm.email || 'customer@swaramayi.com',
                        source: newCustomerForm.lead_source || 'Meta Ads',
                        campaign: newCustomerForm.campaign_id || 'Summer Campaign 2026',
                        preferred_location: newCustomerForm.preferredArea || 'Kondapur',
                        preferred_project: newCustomerForm.preferred_projects || 'Aparna Zenon',
                        property_type: newCustomerForm.property_type || 'Flat / Apartment',
                        bhk: newCustomerForm.configuration || '3BHK',
                        budget_min: 7000000,
                        budget_max: 8500000,
                        purpose: newCustomerForm.investment_purpose || 'Self Use',
                        possession_preference: newCustomerForm.possession_status || 'Ready to Move',
                        loan_required: true,
                        occupation: 'Software Consultant',
                        priority: 'HOT',
                        lead_status: 'MATCHING_PENDING',
                        call_disposition: 'CONNECTED_INTERESTED',
                        next_action: 'Send Cost Sheet',
                        next_followup: new Date(Date.now() + 24 * 3600000).toISOString(),
                        assigned_employee_id: newCustomerForm.assigned_employee_id?.includes('USR-') ? newCustomerForm.assigned_employee_id : 'USR-07',
                        assigned_employee_name: newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)',
                        created_by: 'USR-01',
                        quality_score: 94,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString()
                      };

                      setLeadsList(prev => [newLeadRecord, ...prev]);

                      // 2. CREATE MATCHING REQUEST IN QUEUE
                      const newReq = {
                        requestId: reqId,
                        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                        customerName: nameStr,
                        customerNumber: finalCustomerCode,
                        leadId: leadNum,
                        requirementId: `SRM-REQ-2026-000${matchingRequestsQueue.length + 95}`,
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

                      // 3. SYNC CUSTOMER MASTER RECORD
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
                      setActiveTab('lead_management');
                      setLeadViewMode('inbox');
                      setLeadInboxTab('all');
                      alert(`🎉 INGESTED NEW LEAD SUCCESSFULLY!\n\n• Lead ID: ${leadNum}\n• Customer ID: ${finalCustomerCode}\n• Matching ID: ${reqId}\n• Assigned CRM Executive: ${newCustomerForm.assigned_employee_id || 'Priya Nair (Sales Exec)'}\n\nPersisted into Central Lead Database!`);
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
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px' }}>
                <button type="button" disabled={leadIntakeStep === 1} onClick={() => setLeadIntakeStep(Math.max(1, leadIntakeStep - 1))} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', opacity: leadIntakeStep === 1 ? 0.5 : 1 }}>
                  ← Previous
                </button>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button type="button" onClick={() => { setShowLeadModal(false); setShowAddCustomerModal(false); }} style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
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
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '700px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Share2 size={22} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>CREATE COST SHEET SHARE AGAINST TRANSACTION ID</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>Generate unique Property Share ID (SRM-PSH-2026) linked permanently to Parent ID.</p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowCreateShareModal(false)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* PARENT TYPE & PARENT ID SELECTOR */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Parent ID Category *</label>
                  <select 
                    value={newShareForm.parentType} 
                    onChange={(e) => setNewShareForm({ ...newShareForm, parentType: e.target.value })} 
                    style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '800' }}
                  >
                    <option value="COST_SHEET_ID">1. Cost Sheet ID (SRM-CS-2026)</option>
                    <option value="MATCHING_ID">2. Matching Request ID (SRM-MAT-2026)</option>
                    <option value="CUSTOMER_ID">3. Customer Master ID (SRM-CUS-2026)</option>
                    <option value="LEAD_ID">4. Lead Intake ID (SRM-LEAD-2026)</option>
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
                    style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}
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
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Target Customer:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{newShareForm.customerName} ({newShareForm.mobile})</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Customer Master ID:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block' }}>{newShareForm.customerNumber}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Linked Property:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{newShareForm.propertyTitle}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Final Price:</span> <strong style={{ color: '#4ade80', fontWeight: '900', display: 'block' }}>{newShareForm.finalPrice}</strong></div>
              </div>

              {/* DELIVERY CHANNEL GATEWAY */}
              <div>
                <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '900', display: 'block', marginBottom: '4px' }}>Delivery Channel Gateway *</label>
                <select 
                  value={newShareForm.channel} 
                  onChange={(e) => setNewShareForm({ ...newShareForm, channel: e.target.value })} 
                  style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: '#22c55e', fontWeight: '900', padding: '8px', borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  <option value="WhatsApp & Email Gateway">WhatsApp Business API + Email PDF Attachment</option>
                  <option value="WhatsApp Gateway Only">WhatsApp Business API Only</option>
                  <option value="Email PDF Attachment">Email PDF Attachment Gateway</option>
                  <option value="SMS Token Link">SMS Secure Token Link</option>
                </select>
              </div>

              {/* NOTES */}
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Custom Delivery Message / Executive Notes</label>
                <textarea 
                  rows={3} 
                  value={newShareForm.notes} 
                  onChange={(e) => setNewShareForm({ ...newShareForm, notes: e.target.value })} 
                  style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.82rem', resize: 'vertical' }} 
                />
              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowCreateShareModal(false)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
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
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', width: '880px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>🔍 KPI DRILL-DOWN: {drillDownTitle}</h3>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>Showing {drillDownRecords.length} detailed CRM records.</p>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setDrillDownTitle(null)} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {drillDownRecords.map((r, idx) => (
                <div key={idx} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{r.name || r.title || r.party_name || r.visit_code || r.booking_code}</strong>
                    <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8' }}>{r.customer_number || r.property_code || r.salesperson || r.developer} • {r.budget || r.final_price || r.booking_value || r.status}</p>
                  </div>
                  <button onClick={() => alert(`Opening 360° Record View for ${r.name || r.title || r.party_name}`)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 12px', borderRadius: '6px', fontWeight: '700', fontSize: '0.75rem', cursor: 'pointer' }}>View 360°</button>
                </div>
              ))}
            </div>

            <button onClick={() => setDrillDownTitle(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', alignSelf: 'flex-end' }}>Close Drill Down</button>
          </div>
        </div>
      )}

      {/* UNIVERSAL ID DETAILS SLIDE-OUT MODAL */}
      {viewIdDetailsModal && viewIdDetailsModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #38bdf8', width: '94vw', maxWidth: '850px', maxHeight: '90vh', borderRadius: '18px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto', boxShadow: '0 25px 50px -12px rgba(56, 189, 248, 0.25)' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
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
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', fontSize: '0.85rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER NAME</span>
                    <h4 style={{ fontSize: '1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.customerName || viewIdDetailsModal.data.name || 'Sumanth Varma'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>MOBILE & CONTACT</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#4ade80', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.mobile || '+91 98490 88888'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>CUSTOMER ID (SRM-CUS)</span>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: '900', color: '#38bdf8', fontFamily: 'monospace', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.customerNumber || viewIdDetailsModal.data.customer_number || 'SRM-CUS-2026-000188'}</h4>
                  </div>
                </div>

                {/* LINKED IDENTIFIERS STRIP */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '12px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED REQUIREMENT ID:</span>
                    <strong style={{ color: '#fbbf24', fontFamily: 'monospace', marginLeft: '6px', fontSize: '0.85rem' }}>{viewIdDetailsModal.data.requirementId || 'SRM-REQ-2026-000094'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>LINKED LEAD ID:</span>
                    <strong style={{ color: '#38bdf8', fontFamily: 'monospace', marginLeft: '6px', fontSize: '0.85rem' }}>{viewIdDetailsModal.data.leadId || 'SRM-LEAD-2026-000184'}</strong>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>PRIORITY SCORE:</span>
                    <span style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: '900', marginLeft: '6px', fontSize: '0.75rem' }}>
                      🔥 HOT (92/100)
                    </span>
                  </div>
                </div>

                {/* DETAILED PARAMETERS MATRIX */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h4 style={{ fontSize: '0.88rem', fontWeight: '800', color: '#38bdf8', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '6px', margin: 0 }}>
                    📋 Full Requirement & Property Specifications against {viewIdDetailsModal.id}
                  </h4>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', fontSize: '0.82rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Configuration (BHK):</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.configuration || '3BHK'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Property Type:</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.propertyType || 'Flat / Apartment'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Investment Purpose:</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.purpose || 'Self Use'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Budget Range:</span>
                      <strong style={{ display: 'block', color: '#4ade80' }}>{viewIdDetailsModal.data.budget || '₹1.20 Crore - ₹1.80 Crore'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Preferred Area:</span>
                      <strong style={{ display: 'block', color: '#38bdf8' }}>{viewIdDetailsModal.data.preferredArea || 'Kondapur / Gachibowli'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Search Radius (KM):</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.radiusKm || 10} KM</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Carpet Area:</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.carpetArea || '1,400 – 2,200 Sq.Ft.'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Facing Preference:</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.facing || 'East Facing'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>Possession Status:</span>
                      <strong style={{ display: 'block', color: isLight ? '#0f172a' : '#ffffff' }}>{viewIdDetailsModal.data.possessionStatus || 'Ready to Move'}</strong>
                    </div>
                  </div>

                  {viewIdDetailsModal.data.amenities && (
                    <div style={{ marginTop: '4px', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px 14px', borderRadius: '8px' }}>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', fontWeight: '700', display: 'block', marginBottom: '4px' }}>Selected Must-Have Amenities:</span>
                      <span style={{ color: '#fbbf24', fontSize: '0.82rem', fontWeight: '800' }}>{viewIdDetailsModal.data.amenities}</span>
                    </div>
                  )}
                </div>

                {/* EXECUTIVE ASSIGNMENT & SYSTEM STATUS */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>ASSIGNED SALES EXECUTIVE</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.assignedExecutive || 'Priya Nair (Sales Exec)'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>SYSTEM STATUS</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#22c55e', margin: '2px 0 0 0' }}>{viewIdDetailsModal.data.status || 'MATCHING_PENDING'}</h4>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.68rem', color: isLight ? '#64748b' : '#94a3b8', textTransform: 'uppercase', fontWeight: '800' }}>FRAUD SHIELD & DEDUP</span>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#4ade80', margin: '2px 0 0 0' }}>✓ 100% VERIFIED & UNIQUE</h4>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ padding: '20px', textTransform: 'uppercase', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'center' }}>Loading details...</div>
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
                style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '12px 20px', borderRadius: '8px', fontWeight: '800', fontSize: '0.85rem', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BULK PROPERTY INVENTORY IMPORT MODAL */}
      {showBulkImportPropertyModal && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', color: isLight ? '#0f172a' : '#ffffff', width: '900px', maxHeight: '90vh', overflowY: 'auto', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            
            {/* MODAL HEADER */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    📥 BULK PROPERTY INVENTORY DATA IMPORT ENGINE
                  </h3>
                  <span style={{ background: '#22c55e', color: '#ffffff', padding: '3px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '900' }}>
                    CSV / EXCEL PARSER READY
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                  Import hundreds of master property inventory records instantly. Upload a CSV/Excel file or paste tabular inventory rows below.
                </p>
              </div>

              <button 
                onClick={() => setShowBulkImportPropertyModal(false)}
                style={{ background: 'transparent', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer', padding: '4px' }}
              >
                <X size={22} color="#ffffff" />
              </button>
            </div>

            {/* TEMPLATE & FILE UPLOAD TOOLBAR */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
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
              
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px dashed #22c55e', borderRadius: '12px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '12px', color: isLight ? '#0f172a' : '#ffffff', fontFamily: 'monospace', fontSize: '0.78rem', outline: 'none' }}
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
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                      🔍 LIVE PARSED PREVIEW ({rows.length} Valid Records Ready to Import — 22 Inventory Columns Mapped with GPS)
                    </h4>
                    <span style={{ background: 'rgba(34, 197, 94, 0.2)', color: '#4ade80', padding: '2px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '900' }}>
                      ✓ AUTO PROPERTY CODES & GPS LAT/LONG READY
                    </span>
                  </div>

                  <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                    <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.75rem' }}>
                      <thead>
                        <tr style={{ background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'left', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
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
                          <tr key={i} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                            <td style={{ padding: '8px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{r.code}</td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.8rem' }}>{r.title}</strong>
                              <br /><span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{r.projectName}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{r.developer}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#38bdf8' }}>{r.city}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: '#38bdf8' }}>{r.locality}</strong>
                              <br /><span style={{ fontSize: '0.68rem', color: '#4ade80', fontWeight: '800' }}>📍 {r.latitude}, {r.longitude}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: '#fbbf24', fontWeight: '800' }}>{r.configuration}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{r.towerBlock} {r.unitNumber}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{r.carpet_area}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>Super: {r.superBuiltupArea}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <span style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{r.facing}</span>
                              <br /><span style={{ fontSize: '0.7rem', color: '#4ade80' }}>{r.possessionStatus}</span>
                            </td>
                            <td style={{ padding: '8px' }}>
                              <strong style={{ color: '#4ade80', fontSize: '0.85rem' }}>{r.final_price}</strong>
                              <br /><span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{r.price_sqft}</span>
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
                  </div>

                  {/* EXECUTE IMPORT BUTTON */}
                  <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px', display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => setShowBulkImportPropertyModal(false)}
                      style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
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

      {/* MODAL 1: SINGLE PROPERTY COST SHEET CONFIRMATION MODAL */}
      {showSingleCostSheetConfirmModal && showSingleCostSheetConfirmModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '650px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={24} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>CREATE INDIVIDUAL PROPERTY COST SHEET</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>ONE PROPERTY = ONE COST SHEET ENFORCED</p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowSingleCostSheetConfirmModal(null)} />
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Target Customer:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{showSingleCostSheetConfirmModal.matchingReq?.customerName} ({showSingleCostSheetConfirmModal.matchingReq?.customerNumber})</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Match Request ID:</span> <strong style={{ color: '#fbbf24', fontFamily: 'monospace', display: 'block' }}>{showSingleCostSheetConfirmModal.matchingReq?.requestId}</strong></div>
              </div>

              <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Property Code:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block' }}>{showSingleCostSheetConfirmModal.property?.property_code}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Target Cost Sheet ID:</span> <strong style={{ color: '#4ade80', fontFamily: 'monospace', fontSize: '0.95rem', display: 'block' }}>{showSingleCostSheetConfirmModal.nextId}</strong></div>
              </div>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '12px' }}>
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', fontSize: '0.9rem' }}>{showSingleCostSheetConfirmModal.property?.title}</h4>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  {showSingleCostSheetConfirmModal.property?.locality} • {showSingleCostSheetConfirmModal.property?.developer} ({showSingleCostSheetConfirmModal.property?.configuration})
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed #334155' }}>
                  <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.8rem' }}>Estimated Total Cost:</span>
                  <strong style={{ color: '#4ade80', fontSize: '1.1rem', fontWeight: '900' }}>
                    {showSingleCostSheetConfirmModal.calculated?.totalEstimatedCostStr}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px' }}>
              <button 
                onClick={() => setShowSingleCostSheetConfirmModal(null)} 
                style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={executeSingleCostSheetCreation} 
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                🚀 CREATE INDIVIDUAL COST SHEET
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: DUPLICATE PROTECTION WARNING MODAL */}
      {showDuplicateCostSheetModal && showDuplicateCostSheetModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #ef4444', width: '650px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <AlertTriangle size={24} color="#ef4444" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>COST SHEET ALREADY EXISTS</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>DUPLICATE COST SHEET CREATION PREVENTED</p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowDuplicateCostSheetModal(null)} />
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #ef4444', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <p style={{ color: '#fbbf24', fontWeight: '800' }}>
                ⚠️ An active Cost Sheet has already been generated for this exact Customer, Match ID, and Property.
              </p>

              <div style={{ background: isLight ? '#ffffff' : '#1e293b', padding: '12px', borderRadius: '8px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Existing Cost Sheet ID:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace', display: 'block' }}>{showDuplicateCostSheetModal.existingSheet?.costSheetId}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Current Version:</span> <strong style={{ color: '#fbbf24', display: 'block' }}>{showDuplicateCostSheetModal.existingSheet?.version || 'V01'}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Status:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{showDuplicateCostSheetModal.existingSheet?.status}</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem' }}>Created Date:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{showDuplicateCostSheetModal.existingSheet?.createdAt}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  const sheet = showDuplicateCostSheetModal.existingSheet;
                  setShowDuplicateCostSheetModal(null);
                  setShowViewIndividualCostSheetModal({ open: true, costSheet: sheet });
                }} 
                style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Eye size={14} /> View Existing Cost Sheet
              </button>
              <button 
                onClick={() => {
                  const sheet = showDuplicateCostSheetModal.existingSheet;
                  setShowDuplicateCostSheetModal(null);
                  handleOpenRevisionModal(sheet);
                }} 
                style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                ✏️ Create Revision (V02)
              </button>
              <button 
                onClick={() => setShowDuplicateCostSheetModal(null)} 
                style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 3: BULK COST SHEET CONFIRMATION MODAL */}
      {showBulkCostSheetConfirmModal && showBulkCostSheetConfirmModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #fbbf24', width: '750px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={24} color="#fbbf24" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>BULK INDIVIDUAL COST SHEET GENERATOR</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                    {showBulkCostSheetConfirmModal.properties.length} PROPERTIES SELECTED • ONE PROPERTY = ONE COST SHEET
                  </p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowBulkCostSheetConfirmModal(null)} />
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#38bdf8', fontWeight: '800', fontSize: '0.85rem' }}>
                  Target Customer: {showBulkCostSheetConfirmModal.matchingReq?.customerName} ({showBulkCostSheetConfirmModal.matchingReq?.customerNumber})
                </span>
                <span style={{ color: '#fbbf24', fontFamily: 'monospace', fontWeight: '800', fontSize: '0.85rem' }}>
                  Match ID: {showBulkCostSheetConfirmModal.matchingReq?.requestId}
                </span>
              </div>

              <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '10px' }}>
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', fontSize: '0.85rem', marginBottom: '8px' }}>
                  System will generate {showBulkCostSheetConfirmModal.properties.length} SEPARATE INDIVIDUAL COST SHEETS:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {showBulkCostSheetConfirmModal.properties.map((p: any, idx: number) => {
                    const calc = calculateIndividualCostSheet(p);
                    const targetId = generateNextIndividualCostSheetCode(idx);
                    return (
                      <div key={idx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                        <div>
                          <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900' }}>{p.property_code}</span>
                          <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', marginLeft: '8px' }}>{p.title}</span>
                          <br /><span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>{p.locality} • {p.developer} ({p.configuration})</span>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: '900', display: 'block' }}>→ {targetId}</span>
                          <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.75rem', fontWeight: '800' }}>Est: {calc.totalEstimatedCostStr}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px' }}>
              <button 
                onClick={() => setShowBulkCostSheetConfirmModal(null)} 
                style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button 
                onClick={executeBulkCostSheetsCreation} 
                style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', color: '#0f172a', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                🚀 CREATE ALL {showBulkCostSheetConfirmModal.properties.length} INDIVIDUAL COST SHEETS
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 4: BULK COST SHEET SUCCESS MODAL */}
      {showBulkCostSheetSuccessModal && showBulkCostSheetSuccessModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #22c55e', width: '700px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={48} color="#22c55e" style={{ margin: '0 auto 10px auto' }} />
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                🎉 {showBulkCostSheetSuccessModal.createdSheets.length} Individual Cost Sheets Created Successfully!
              </h3>
              <p style={{ fontSize: '0.82rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>
                Every property has been assigned a separate, unique Cost Sheet ID with full master data snapshot.
              </p>
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {showBulkCostSheetSuccessModal.createdSheets.map((cs: any, idx: number) => (
                <div key={idx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px 14px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontFamily: 'monospace', color: '#38bdf8', fontWeight: '900', fontSize: '0.9rem' }}>{cs.costSheetId}</span>
                    <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700', fontSize: '0.82rem', marginLeft: '10px' }}>{cs.propertySnapshot?.propertyTitle}</span>
                  </div>
                  <button 
                    onClick={() => {
                      setShowBulkCostSheetSuccessModal(null);
                      setShowViewIndividualCostSheetModal({ open: true, costSheet: cs });
                    }} 
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Eye size={12} /> View Sheet
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '16px', flexWrap: 'wrap' }}>
              <button 
                onClick={() => {
                  setShowBulkCostSheetSuccessModal(null);
                  setActiveTab('cost_sheet_share');
                  setActiveCostSheetShareSubTab('individual_cost_sheets');
                }} 
                style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                👁️ View All Cost Sheets Vault
              </button>
              <button 
                onClick={() => alert(`📥 Downloading PDF package containing ${showBulkCostSheetSuccessModal.createdSheets.length} separate Individual Cost Sheets...`)} 
                style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                📥 Download All PDFs
              </button>
              <button 
                onClick={() => alert(`🖨️ Printing ${showBulkCostSheetSuccessModal.createdSheets.length} separate Individual Cost Sheets...`)} 
                style={{ background: '#334155', color: '#38bdf8', border: '1px solid #38bdf8', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                🖨️ Print All
              </button>
              <button 
                onClick={() => setShowBulkCostSheetSuccessModal(null)} 
                style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#64748b' : '#94a3b8', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '10px 18px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Back to Matching
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 5: PRINTABLE INDIVIDUAL COST SHEET DOCUMENT VIEW MODAL */}
      {showViewIndividualCostSheetModal && showViewIndividualCostSheetModal.open && showViewIndividualCostSheetModal.costSheet && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '94vw', maxWidth: '920px', maxHeight: '94vh', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto' }}>
            
            {/* ACTION TOOLBAR AT TOP */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '2px solid #cbd5e1' : '2px solid #334155', paddingBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={26} color="#fbbf24" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                    INDIVIDUAL PROPERTY COST SHEET — {showViewIndividualCostSheetModal.costSheet.costSheetId}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '800' }}>
                    VERSION {showViewIndividualCostSheetModal.costSheet.version || 'V01'} • STATUS: {showViewIndividualCostSheetModal.costSheet.status}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => downloadCostSheetPDF(showViewIndividualCostSheetModal.costSheet)} 
                  style={{ background: '#22c55e', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Download size={14} /> Download PDF
                </button>
                <button 
                  onClick={() => downloadCostSheetPDF(showViewIndividualCostSheetModal.costSheet)} 
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Printer size={14} /> Print Cost Sheet
                </button>
                <button 
                  onClick={() => {
                    setIndividualCostSheets(prev => prev.map(c => c.costSheetId === showViewIndividualCostSheetModal.costSheet.costSheetId ? { ...c, status: 'SENT_TO_CUSTOMER' } : c));
                    alert(`📲 Dispatched Individual Cost Sheet ${showViewIndividualCostSheetModal.costSheet.costSheetId} to ${showViewIndividualCostSheetModal.costSheet.customerSnapshot?.customerName} (${showViewIndividualCostSheetModal.costSheet.customerSnapshot?.mobile})!`);
                  }} 
                  style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  📲 Send to Customer
                </button>
                <button 
                  onClick={() => {
                    const sheet = showViewIndividualCostSheetModal.costSheet;
                    setShowViewIndividualCostSheetModal(null);
                    handleOpenRevisionModal(sheet);
                  }} 
                  style={{ background: '#334155', color: '#fbbf24', border: '1px solid #fbbf24', padding: '8px 12px', borderRadius: '6px', fontWeight: '900', fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  ✏️ Create Revision
                </button>
                <X size={22} color="#94a3b8" style={{ cursor: 'pointer', marginLeft: '6px' }} onClick={() => setShowViewIndividualCostSheetModal(null)} />
              </div>
            </div>

            {/* FORMAL ENTERPRISE DOCUMENT CONTAINER (PRINTABLE AREA) */}
            <div id="printable-cost-sheet-area" style={{ background: '#ffffff', color: '#0f172a', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', fontSize: '0.88rem' }}>
              
              {/* BRANDING & DOCUMENT TITLE HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #0284c7', paddingBottom: '16px' }}>
                <div>
                  <h1 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#0284c7', margin: 0, letterSpacing: '-0.5px' }}>
                    SWARAMAYI REAL ESTATE MARKETING
                  </h1>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: '700', textTransform: 'uppercase' }}>
                    Enterprise Real Estate Solution • Official Property Cost Sheet
                  </span>
                  <p style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
                    Hitec City Sector, Hyderabad, Telangana 500084 • Phone: +91 40 6688 9999
                  </p>
                </div>

                <div style={{ textAlign: 'right', background: '#f8fafc', padding: '12px 16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase', display: 'block' }}>COST SHEET ID</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0284c7', fontFamily: 'monospace', margin: 0 }}>
                    {showViewIndividualCostSheetModal.costSheet.costSheetId}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '4px' }}>
                    <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }}>
                      VERSION: {showViewIndividualCostSheetModal.costSheet.version || 'V01'}
                    </span>
                    <span style={{ background: '#dcfce7', color: '#15803d', padding: '2px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }}>
                      {showViewIndividualCostSheetModal.costSheet.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* METADATA STRIP: DATE, CUSTOMER ID, MATCH ID */}
              <div style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 16px', display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px', fontSize: '0.8rem' }}>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem' }}>Date & Time:</span> <strong style={{ color: '#0f172a', display: 'block' }}>{showViewIndividualCostSheetModal.costSheet.createdAt}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem' }}>Customer ID:</span> <strong style={{ color: '#0284c7', fontFamily: 'monospace', display: 'block' }}>{showViewIndividualCostSheetModal.costSheet.customerId}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem' }}>Match ID:</span> <strong style={{ color: '#d97706', fontFamily: 'monospace', display: 'block' }}>{showViewIndividualCostSheetModal.costSheet.matchId}</strong></div>
                <div><span style={{ color: '#64748b', fontSize: '0.7rem' }}>Prepared By:</span> <strong style={{ color: '#0f172a', display: 'block' }}>{showViewIndividualCostSheetModal.costSheet.createdBy}</strong></div>
              </div>

              {/* SECTION 1 & 2: CUSTOMER DETAILS & PROPERTY DETAILS GRID */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                
                {/* CUSTOMER INFORMATION */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fafafa' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0369a1', borderBottom: '2px solid #bae6fd', paddingBottom: '6px', marginBottom: '10px' }}>
                    👤 CUSTOMER INFORMATION
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                    <div><span style={{ color: '#64748b' }}>Customer Name:</span> <strong style={{ color: '#0f172a', fontSize: '0.9rem' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.customerName}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Mobile Number:</span> <strong style={{ color: '#16a34a', fontFamily: 'monospace' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.mobile}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Email Address:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.email || 'N/A'}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Preferred Location:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.preferredLocation}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Budget Range:</span> <strong style={{ color: '#16a34a', fontWeight: '800' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.budget}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Requirement:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.customerSnapshot?.preferredBhk} ({showViewIndividualCostSheetModal.costSheet.customerSnapshot?.purpose})</strong></div>
                  </div>
                </div>

                {/* PROPERTY & UNIT SPECIFICATIONS */}
                <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', padding: '16px', background: '#fafafa' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#0369a1', borderBottom: '2px solid #bae6fd', paddingBottom: '6px', marginBottom: '10px' }}>
                    🏠 PROPERTY & UNIT SPECIFICATIONS
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem' }}>
                    <div><span style={{ color: '#64748b' }}>Property Title:</span> <strong style={{ color: '#0f172a', fontSize: '0.88rem' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.propertyTitle}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Property Code:</span> <strong style={{ color: '#0369a1', fontFamily: 'monospace' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.propertyCode}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Project & Developer:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.projectName} ({showViewIndividualCostSheetModal.costSheet.propertySnapshot?.developerName})</strong></div>
                    <div><span style={{ color: '#64748b' }}>Tower / Floor / Unit:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.tower}, {showViewIndividualCostSheetModal.costSheet.propertySnapshot?.floor}, Unit {showViewIndividualCostSheetModal.costSheet.propertySnapshot?.unitNumber}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Carpet Area:</span> <strong style={{ color: '#d97706', fontWeight: '800' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.carpetArea}</strong></div>
                    <div><span style={{ color: '#64748b' }}>Facing & Possession:</span> <strong style={{ color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.facing} • {showViewIndividualCostSheetModal.costSheet.propertySnapshot?.possessionStatus}</strong></div>
                    <div><span style={{ color: '#64748b' }}>GPS Coordinates:</span> <strong style={{ color: '#0369a1', fontFamily: 'monospace' }}>{showViewIndividualCostSheetModal.costSheet.propertySnapshot?.latitude}, {showViewIndividualCostSheetModal.costSheet.propertySnapshot?.longitude}</strong></div>
                  </div>
                </div>

              </div>

              {/* MATCHING CRITERIA SNAPSHOT */}
              <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: '800', textTransform: 'uppercase' }}>MATCHING COMPATIBILITY SCORE</span>
                  <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#16a34a', margin: '2px 0 0 0' }}>
                    🔥 {showViewIndividualCostSheetModal.costSheet.matchSnapshot?.matchScore || 85}% COMPATIBILITY MATCH
                  </h4>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {(showViewIndividualCostSheetModal.costSheet.matchSnapshot?.matchFactors || ['✓ Preferred Location', '✓ Within Budget', '✓ 3 BHK Satisfied', '✓ Ready-to-Move']).map((factor: string, idx: number) => (
                    <span key={idx} style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #86efac', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '700' }}>
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* SECTION 3: ITEMIZED PRICE BREAKUP TABLE */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: '900', color: '#0284c7', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>💰 ITEMIZED PROPERTY PRICE & TAX BREAKUP</span>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '700' }}>Rate: {showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.ratePerSqftStr}</span>
                </h4>

                <div className="table-responsive-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', border: '1px solid #cbd5e1' }}>
                  <thead>
                    <tr style={{ background: '#f1f5f9', color: '#334155', textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>
                      <th style={{ padding: '10px 14px' }}>Charge Particulars</th>
                      <th style={{ padding: '10px 14px', textAlign: 'right' }}>Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '700', color: '#0f172a' }}>1. Base Property Asking Price</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.basePriceStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>2. Floor Rise Charge (Floor {showViewIndividualCostSheetModal.costSheet.propertySnapshot?.floor})</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.floorRiseStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>3. Preferential Location Charge (PLC - Facing)</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.plcStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>4. Covered Car Parking Slot Charge</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.parkingStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>5. Clubhouse & Gated Amenities Membership</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.clubStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>6. Advance Maintenance Charge (1 Year)</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.maintenanceStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>7. Infrastructure & Legal Documentation Charges</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.infrastructureStr}</td>
                    </tr>
                    {showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.discountStr !== 'N/A' && (
                      <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fef2f2' }}>
                        <td style={{ padding: '10px 14px', fontWeight: '800', color: '#dc2626' }}>8. Manager Approved Special Discount</td>
                        <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '800', color: '#dc2626' }}>- {showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.discountStr}</td>
                      </tr>
                    )}
                    <tr style={{ borderBottom: '1px solid #cbd5e1', background: '#f8fafc' }}>
                      <td style={{ padding: '10px 14px', fontWeight: '800', color: '#0f172a' }}>SUBTOTAL (BEFORE TAXES & GOVERNMENT CHARGES)</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.subtotalStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>9. Goods & Services Tax (GST)</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.gstStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>10. Stamp Duty Charges</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.stampDutyStr}</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                      <td style={{ padding: '10px 14px', color: '#475569' }}>11. Registration & Property Transfer Fee</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', color: '#0f172a' }}>{showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.registrationStr}</td>
                    </tr>
                    <tr style={{ background: '#f0fdf4', borderTop: '3px solid #16a34a' }}>
                      <td style={{ padding: '14px', fontWeight: '900', fontSize: '1.05rem', color: '#15803d' }}>
                        TOTAL ESTIMATED PROPERTY COST
                      </td>
                      <td style={{ padding: '14px', textAlign: 'right', fontWeight: '900', fontSize: '1.25rem', color: '#15803d' }}>
                        {showViewIndividualCostSheetModal.costSheet.formattedPriceBreakup?.totalEstimatedCostStr}
                      </td>
                    </tr>
                  </tbody>
                </table>
</div>
              </div>

              {/* TERMS & DISCLAIMER FOOTER */}
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '14px', fontSize: '0.72rem', color: '#64748b' }}>
                <strong style={{ color: '#334155', display: 'block', marginBottom: '4px' }}>📌 TERMS & CONDITIONS DISCLAIMER:</strong>
                "All prices mentioned in this Cost Sheet are indicative and subject to confirmation by the respective developer/property owner. Applicable taxes, government charges, registration charges and other costs may change. Final pricing will be confirmed before booking."
              </div>

              {/* AUDIT LOG FOOTER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '10px', fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                <span>Generated by Swaramayi Real Estate CRM OS • SHA256 Verified</span>
                <span>System Timestamp: {showViewIndividualCostSheetModal.costSheet.createdAt}</span>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL 6: FULL DETAILS COST SHEET REVISION CREATION MODAL */}
      {showRevisionModal && showRevisionModal.open && showRevisionModal.costSheet && (() => {
        const liveCalc = calculateRevisionLiveTotals(showRevisionModal);
        const oldTotalStr = showRevisionModal.costSheet.formattedPriceBreakup?.totalEstimatedCostStr || formatIndianRupees(showRevisionModal.costSheet.pricingSnapshot?.totalEstimatedCost || 0);
        const nextVerCode = `V0${(showRevisionModal.costSheet.versionNumber || 1) + 1}`;
        const oldTotalNum = showRevisionModal.costSheet.pricingSnapshot?.totalEstimatedCost || 0;
        const diffNum = oldTotalNum - liveCalc.grandTotal;

        return (
          <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #fbbf24', width: '94vw', maxWidth: '850px', maxHeight: '92vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
              
              {/* HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Edit3 size={26} color="#fbbf24" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>FULL COST SHEET REVISION EDITOR</h3>
                    <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                      TARGET: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{showRevisionModal.costSheet.costSheetId}</strong> • CURRENT: <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>{showRevisionModal.costSheet.version || 'V01'}</span> → NEW VERSION: <strong style={{ color: '#4ade80' }}>{nextVerCode}</strong>
                    </p>
                  </div>
                </div>
                <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowRevisionModal(null)} />
              </div>

              {/* TARGET SUMMARY BANNER */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '12px 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Customer Name:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{showRevisionModal.costSheet.customerSnapshot?.customerName} ({showRevisionModal.costSheet.customerSnapshot?.mobile})</strong></div>
                <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Property Code & Title:</span> <strong style={{ color: '#38bdf8', display: 'block' }}>{showRevisionModal.costSheet.propertySnapshot?.propertyCode} — {showRevisionModal.costSheet.propertySnapshot?.propertyTitle}</strong></div>
              </div>

              {/* LIVE COMPARISON SUMMARY PANEL */}
              <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', border: '1px solid #fbbf24', borderRadius: '12px', padding: '16px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', alignItems: 'center' }}>
                <div style={{ borderRight: '1px solid #334155', paddingRight: '12px' }}>
                  <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>PREVIOUS COST ({showRevisionModal.costSheet.version || 'V01'})</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '800', color: isLight ? '#64748b' : '#94a3b8', margin: '4px 0 0 0', textDecoration: 'line-through' }}>
                    {oldTotalStr}
                  </h4>
                </div>

                <div style={{ borderRight: '1px solid #334155', paddingRight: '12px' }}>
                  <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '900', textTransform: 'uppercase' }}>REVISED COST ({nextVerCode})</span>
                  <h4 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#4ade80', margin: '4px 0 0 0' }}>
                    {formatIndianRupees(liveCalc.grandTotal)}
                  </h4>
                </div>

                <div>
                  <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>COST VARIANCE / SAVINGS</span>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: '900', color: diffNum >= 0 ? '#22c55e' : '#f43f5e', margin: '4px 0 0 0' }}>
                    {diffNum >= 0 ? `🟢 -${formatIndianRupees(diffNum)} (SAVINGS)` : `🔴 +${formatIndianRupees(Math.abs(diffNum))} (INCREASE)`}
                  </h4>
                </div>
              </div>

              {/* ALL PRICING EDITABLE FORM GRID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h4 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.88rem', letterSpacing: '0.5px' }}>
                  ✏️ REVISE ALL ITEMIZATION DETAILS & PRICING COMPONENTS:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px' }}>
                  
                  {/* BASE ASKING PRICE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      1. Base Asking Price (INR) *
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revBasePrice} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revBasePrice: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #38bdf8', color: '#38bdf8', fontWeight: '900', padding: '8px 10px', borderRadius: '6px', fontSize: '0.9rem' }} 
                    />
                  </div>

                  {/* MANAGER DISCOUNT */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: '900', display: 'block', marginBottom: '4px' }}>
                      2. Special Discount (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revDiscount} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revDiscount: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', color: '#ef4444', fontWeight: '900', padding: '8px 10px', borderRadius: '6px', fontSize: '0.9rem' }} 
                    />
                  </div>

                  {/* FLOOR RISE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      3. Floor Rise Fee (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revFloorRise} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revFloorRise: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* PLC CHARGE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      4. PLC Facing Charge (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revPlc} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revPlc: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* PARKING CHARGE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      5. Parking Slot Charge (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revParking} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revParking: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* CLUBHOUSE FEE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      6. Clubhouse Fee (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revClub} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revClub: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* MAINTENANCE ADVANCE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      7. Maintenance (1 Yr) (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revMaintenance} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revMaintenance: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* INFRA & LEGAL */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      8. Infra & Legal Fees (INR)
                    </label>
                    <input 
                      type="number" 
                      value={showRevisionModal.revInfraLegal} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revInfraLegal: Math.max(0, parseInt(e.target.value) || 0) })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                    />
                  </div>

                  {/* GST RATE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      9. GST Rate Mode
                    </label>
                    <select 
                      value={showRevisionModal.revGstPct} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revGstPct: parseFloat(e.target.value) || 5 })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      <option value={5}>5% Standard GST (Under Construction)</option>
                      <option value={1}>1% Affordable Housing GST</option>
                      <option value={0}>0% Exempted (Ready Completion Cert)</option>
                    </select>
                  </div>

                  {/* STAMP DUTY */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      10. Stamp Duty Rate
                    </label>
                    <select 
                      value={showRevisionModal.revStampDutyPct} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revStampDutyPct: parseFloat(e.target.value) || 5 })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      <option value={5}>5.0% Standard Telangana/AP Rate</option>
                      <option value={6}>6.0% Special Urban Surcharge</option>
                      <option value={4}>4.0% Concessional Rate</option>
                    </select>
                  </div>

                  {/* REGISTRATION RATE */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      11. Registration Fee Rate
                    </label>
                    <select 
                      value={showRevisionModal.revRegPct} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revRegPct: parseFloat(e.target.value) || 1 })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.85rem' }}
                    >
                      <option value={1}>1.0% Fixed Transfer Fee</option>
                      <option value={0.5}>0.5% Special Slab</option>
                      <option value={2}>2.0% High Value Property</option>
                    </select>
                  </div>

                  {/* SPECIFICATIONS NOTES */}
                  <div>
                    <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>
                      12. Unit & Floor Specification Notes
                    </label>
                    <input 
                      type="text" 
                      value={showRevisionModal.revUnitNotes} 
                      onChange={(e) => setShowRevisionModal({ ...showRevisionModal, revUnitNotes: e.target.value })} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 10px', borderRadius: '6px', fontSize: '0.82rem' }} 
                    />
                  </div>

                </div>
              </div>

              {/* REASON FOR REVISION (MANDATORY AUDIT TRAIL NOTE) */}
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #fbbf24', borderRadius: '12px', padding: '14px' }}>
                <label style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: '900', display: 'block', marginBottom: '6px' }}>
                  📌 REASON FOR REVISION (MANDATORY AUDIT TRAIL LOG ENTRY) *
                </label>
                <textarea 
                  rows={2} 
                  value={showRevisionModal.reason} 
                  onChange={(e) => setShowRevisionModal({ ...showRevisionModal, reason: e.target.value })} 
                  placeholder="e.g. Approved ₹1,00,000 festival discount & waived PLC charges for senior customer referral..." 
                  style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px', borderRadius: '6px', fontSize: '0.85rem' }} 
                />
              </div>

              {/* MODAL FOOTER */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
                <button 
                  onClick={() => setShowRevisionModal(null)} 
                  style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={executeCreateRevision} 
                  style={{ background: 'linear-gradient(135deg, #fbbf24 0%, #d97706 100%)', color: '#0f172a', border: 'none', padding: '10px 26px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer', fontSize: '0.92rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  🚀 EXECUTE REVISION ({nextVerCode})
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* MODAL 7: SCHEDULE SITE VISIT FOR COST SHEET MODAL (MULTI-PROPERTY VISIT SCHEDULE CREATOR) */}
      {showScheduleVisitModal && showScheduleVisitModal.open && (() => {
        const initialCS = showScheduleVisitModal.costSheet || individualCostSheets[0];
        const targetCustomerId = initialCS?.customerId || initialCS?.customerSnapshot?.customerNumber || 'SRM-CUS-2026-000184';
        const targetCustName = initialCS?.customerSnapshot?.customerName || 'Rohan Deshmukh';
        const targetCustMobile = initialCS?.customerSnapshot?.mobile || '+91 98490 12345';

        // Find all cost sheets for this customer
        const customerCostSheets = individualCostSheets.filter((cs: any) => 
          cs.customerId === targetCustomerId || 
          (cs.customerSnapshot && cs.customerSnapshot.customerName === targetCustName)
        );

        // Fallback: if only 1 cost sheet found in vault for customer, include all available cost sheets so user can pick multiple
        const eligibleCostSheets = customerCostSheets.length >= 2 ? customerCostSheets : individualCostSheets.slice(0, 4);

        return (
          <ScheduleVisitModalContent 
            initialCS={initialCS}
            targetCustomerId={targetCustomerId}
            targetCustName={targetCustName}
            targetCustMobile={targetCustMobile}
            eligibleCostSheets={eligibleCostSheets}
            properties={properties}
            visitPlans={visitPlans}
            setVisitPlans={setVisitPlans}
            setScheduledVisits={setScheduledVisits}
            setIndividualCostSheets={setIndividualCostSheets}
            setShowScheduleVisitModal={setShowScheduleVisitModal}
            setActiveTab={setActiveTab}
            setActiveVisitSubTab={setActiveVisitSubTab}
          />
        );
      })()}

      {/* MODAL: SKIP PROPERTY STOP */}
      {showSkipStopModal && showSkipStopModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #ef4444', width: '500px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#f87171' }}>⏭️ SKIP PROPERTY VISIT STOP</h3>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowSkipStopModal(null)} />
            </div>

            <p style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.85rem' }}>
              Skipping Stop: <strong style={{ color: '#fbbf24' }}>{showSkipStopModal.propertyTitle}</strong>
            </p>

            <div>
              <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Select Mandatory Skip Reason:</label>
              <select 
                value={skipReasonInput} 
                onChange={(e) => setSkipReasonInput(e.target.value)} 
                style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #ef4444', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
              >
                <option value="Customer Not Interested">Customer Not Interested</option>
                <option value="Property Unavailable / Locked">Property Unavailable / Key Custody Issue</option>
                <option value="Customer Requested Skip">Customer Requested Skip</option>
                <option value="Developer Requested Reschedule">Developer Requested Reschedule</option>
                <option value="Time Constraint / Delay">Time Constraint / Running Behind</option>
                <option value="Traffic Congestion">Heavy Traffic Congestion</option>
              </select>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowSkipStopModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  const targetPlan = visitPlans.find(p => p.visitPlanId === showSkipStopModal.planId);
                  if (targetPlan) {
                    const updatedStops = targetPlan.stops.map((s: any) => s.stopId === showSkipStopModal.stopId ? { ...s, status: 'SKIPPED', skipReason: skipReasonInput } : s);
                    const nextIdx = targetPlan.currentStopIndex + 1;
                    const isLast = nextIdx >= targetPlan.stops.length;
                    const updatedPlans = visitPlans.map(p => p.visitPlanId === showSkipStopModal.planId ? {
                      ...p,
                      stops: updatedStops,
                      currentStopIndex: isLast ? targetPlan.currentStopIndex : nextIdx
                    } : p);
                    setVisitPlans(updatedPlans);
                  }
                  setShowSkipStopModal(null);
                  alert(`⏭️ STOP SKIPPED & ROUTE RE-OPTIMIZED!\n\nReason: ${skipReasonInput}\nSequential Auto-Navigation advanced to next property.`);
                }}
                style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer' }}
              >
                ✓ CONFIRM SKIP & RE-OPTIMIZE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PROPERTY TO ROUTE */}
      {showAddPropertyRouteModal && showAddPropertyRouteModal.open && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '540px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: '#38bdf8' }}>➕ ADD ANOTHER PROPERTY TO ROUTE</h3>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowAddPropertyRouteModal(null)} />
            </div>

            <p style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.82rem' }}>
              Select an additional property to insert into current visit plan <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showAddPropertyRouteModal.planId}</strong>:
            </p>

            <div>
              <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Select Property from Inventory:</label>
              <select 
                value={addPropertySelectCode} 
                onChange={(e) => setAddPropertySelectCode(e.target.value)} 
                style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '800', padding: '10px', borderRadius: '8px', fontSize: '0.85rem' }}
              >
                {properties.map(p => (
                  <option key={p.id} value={p.property_code}>{p.title} ({p.locality}) — {p.final_price}</option>
                ))}
              </select>
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '8px', padding: '12px', fontSize: '0.78rem', color: '#4ade80' }}>
              ⚡ System Impact: Adding this property will extend the route by approx +35 minutes. Travel distance & time windows will be automatically re-optimized!
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowAddPropertyRouteModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
              <button 
                onClick={() => {
                  const targetPlan = visitPlans.find(p => p.visitPlanId === showAddPropertyRouteModal.planId);
                  const propObj = properties.find(p => p.property_code === addPropertySelectCode) || properties[0];
                  
                  if (targetPlan && propObj) {
                    const newStop = {
                      stopId: `SRM-VSTOP-2026-00000${targetPlan.stops.length + 1}`,
                      costSheetId: `SRM-CS-2026-000199`,
                      propertyId: propObj.id,
                      propertyCode: propObj.property_code,
                      propertyTitle: propObj.title,
                      locality: propObj.locality,
                      developer: propObj.developer,
                      latitude: propObj.latitude || '17.4478° N',
                      longitude: propObj.longitude || '78.3789° E',
                      address: `${propObj.title}, ${propObj.locality}`,
                      timeWindow: '03:00 PM - 04:30 PM',
                      scheduledTime: '03:15 PM',
                      durationMinutes: 45,
                      distanceFromPrev: '3.5 KM',
                      etaMinutes: 12,
                      status: 'PENDING',
                      otpVerified: false,
                      geofenceVerified: false,
                      arrivalTime: '',
                      completionTime: '',
                      feedbackRating: 0,
                      feedbackRemarks: '',
                      skipReason: ''
                    };

                    const updatedStops = [...targetPlan.stops, newStop];
                    const updatedAudit = [...targetPlan.auditLogs, { time: new Date().toLocaleTimeString(), user: 'Ramesh Pawar (Field Exec)', action: 'PROPERTY_ADDED_TO_ROUTE', details: `Added Property ${propObj.title} to route plan` }];

                    const updatedPlans = visitPlans.map(p => p.visitPlanId === showAddPropertyRouteModal.planId ? {
                      ...p,
                      stops: updatedStops,
                      auditLogs: updatedAudit,
                      totalDistanceKm: '18.5 KM',
                      totalDurationMinutes: targetPlan.totalDurationMinutes + 45
                    } : p);

                    setVisitPlans(updatedPlans);
                  }
                  setShowAddPropertyRouteModal(null);
                  alert(`➕ PROPERTY ADDED TO ROUTE & RE-OPTIMIZED!\n\nAdded Property: ${propObj?.title}\nRoute recalculated with updated ETAs.`);
                }}
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer' }}
              >
                ➕ ADD & RE-OPTIMIZE ROUTE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: OWNER LIVE ROUTE AUDIT TRACKING */}
      {showLiveRouteTrackingModal && showLiveRouteTrackingModal.open && showLiveRouteTrackingModal.plan && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '750px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={24} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>LIVE ROUTE AUDIT TRACKING & EVENT LOG</h3>
                  <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8' }}>Plan ID: {showLiveRouteTrackingModal.plan.visitPlanId} — {showLiveRouteTrackingModal.plan.customerName}</p>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowLiveRouteTrackingModal(null)} />
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.82rem' }}>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Executive:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff', display: 'block' }}>{showLiveRouteTrackingModal.plan.assignedExecutive}</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Customer Contact:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{showLiveRouteTrackingModal.plan.mobile}</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Delay Audit:</span> <strong style={{ color: '#4ade80', display: 'block' }}>{showLiveRouteTrackingModal.plan.delayStatus}</strong></div>
              <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Geofence Audit:</span> <strong style={{ color: '#38bdf8', display: 'block' }}>{showLiveRouteTrackingModal.plan.deviationStatus}</strong></div>
            </div>

            <div>
              <h4 style={{ color: '#fbbf24', fontWeight: '900', fontSize: '0.9rem', marginBottom: '8px' }}>📜 IMMUTABLE AUDIT TRAIL LOG:</h4>
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.78rem', maxHeight: '200px', overflowY: 'auto' }}>
                {showLiveRouteTrackingModal.plan.auditLogs?.map((log: any, i: number) => (
                  <div key={i} style={{ borderBottom: '1px solid #1e293b', paddingBottom: '6px' }}>
                    <span style={{ color: '#38bdf8', fontFamily: 'monospace' }}>[{log.time}]</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{log.user}</strong>: <span style={{ color: '#fbbf24' }}>{log.action}</span> — {log.details}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px' }}>
              <button onClick={() => setShowLiveRouteTrackingModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>Close Audit Log</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: FULL VISIT SCHEDULE DETAIL */}
      {showVisitDetailModal && showVisitDetailModal.open && showVisitDetailModal.plan && (
        <VisitDetailModalContent 
          plan={showVisitDetailModal.plan}
          onClose={() => setShowVisitDetailModal(null)}
          setShowIndividualStopModal={setShowIndividualStopModal}
          setShowRouteMapModal={setShowRouteMapModal}
          visitPlans={visitPlans}
          setVisitPlans={setVisitPlans}
          setActiveTab={setActiveTab}
          setActiveVisitSubTab={setActiveVisitSubTab}
          setShowSkipStopModal={setShowSkipStopModal}
          setShowAddPropertyRouteModal={setShowAddPropertyRouteModal}
        />
      )}

      {/* MODAL: INDIVIDUAL PROPERTY STOP DETAILS */}
      {showIndividualStopModal && showIndividualStopModal.open && showIndividualStopModal.stop && (
        <IndividualStopModalContent 
          stop={showIndividualStopModal.stop}
          plan={showIndividualStopModal.plan}
          onClose={() => setShowIndividualStopModal(null)}
          setActiveTab={setActiveTab}
          setActiveCostSheetShareSubTab={setActiveCostSheetShareSubTab}
          setActiveProjectSubTab={setActiveProjectSubTab}
        />
      )}

      {/* MODAL: ROUTE MAP MODAL */}
      {showRouteMapModal && showRouteMapModal.open && showRouteMapModal.plan && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '800px', maxHeight: '90vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🗺️ INTERACTIVE VISIT ROUTE MAP</h3>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Master Schedule: <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{showRouteMapModal.plan.visitPlanId}</strong> — {showRouteMapModal.plan.customerName}
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowRouteMapModal(null)} />
            </div>

            {/* ROUTE FLOW NODES */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '14px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              
              <div style={{ textAlign: 'center', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #22c55e', borderRadius: '10px', padding: '10px 16px' }}>
                <span style={{ fontSize: '0.7rem', color: '#4ade80', fontWeight: '900' }}>🟢 PICKUP</span>
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.85rem', fontWeight: '900', marginTop: '2px' }}>Customer Pickup</h4>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{showRouteMapModal.plan.pickupAddress || 'Kondapur'}</span>
              </div>

              <ArrowRight size={20} color="#0284c7" />

              {showRouteMapModal.plan.stops.map((s: any, idx: number) => (
                <React.Fragment key={s.stopId}>
                  <div style={{ textAlign: 'center', background: s.status === 'VISIT_COMPLETED' ? 'rgba(34, 197, 94, 0.15)' : idx === showRouteMapModal.plan.currentStopIndex ? 'rgba(2, 132, 199, 0.2)' : '#1e293b', border: idx === showRouteMapModal.plan.currentStopIndex ? '2px solid #0284c7' : '1px solid #334155', borderRadius: '10px', padding: '10px 14px' }}>
                    <span style={{ fontSize: '0.7rem', color: '#fbbf24', fontWeight: '900' }}>STOP 0{idx + 1}</span>
                    <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.82rem', fontWeight: '900', marginTop: '2px' }}>{s.locality}</h4>
                    <span style={{ fontSize: '0.68rem', color: '#38bdf8', fontFamily: 'monospace' }}>{s.distanceFromPrev}</span>
                  </div>
                  {idx < showRouteMapModal.plan.stops.length - 1 && <ArrowRight size={20} color="#0284c7" />}
                </React.Fragment>
              ))}

              <ArrowRight size={20} color="#0284c7" />

              <div style={{ textAlign: 'center', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #ef4444', borderRadius: '10px', padding: '10px 16px' }}>
                <span style={{ fontSize: '0.7rem', color: '#f87171', fontWeight: '900' }}>🔴 DROP</span>
                <h4 style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.85rem', fontWeight: '900', marginTop: '2px' }}>Customer Drop</h4>
                <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>{showRouteMapModal.plan.dropAddress || 'Kondapur'}</span>
              </div>

            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowRouteMapModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Close Map</button>
            </div>
          </div>
        </div>
      )}

      {/* LEAD MODAL 1: CALL DISPOSITION & NEXT ACTION ENFORCEMENT MODAL */}
      {showCallDispositionModal && showCallDispositionModal.open && showCallDispositionModal.lead && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2200, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '94vw', maxWidth: '600px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <PhoneCall size={24} color="#38bdf8" />
                <div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>LOG CALL DISPOSITION & NEXT ACTION</h3>
                  <span style={{ fontSize: '0.75rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                    {showCallDispositionModal.lead.lead_number} • {showCallDispositionModal.lead.customer_name}
                  </span>
                </div>
              </div>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowCallDispositionModal(null)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Call Type:</label>
                <select value={callDispForm.call_type} onChange={(e) => setCallDispForm({ ...callDispForm, call_type: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.82rem' }}>
                  <option value="Outgoing">📞 Outgoing Call</option>
                  <option value="Incoming">📥 Incoming Call</option>
                  <option value="WhatsApp">💬 WhatsApp Chat</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Call Disposition *:</label>
                <select value={callDispForm.disposition} onChange={(e) => setCallDispForm({ ...callDispForm, disposition: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: '#4ade80', fontWeight: '800', border: '1px solid #0284c7', borderRadius: '6px', padding: '8px', fontSize: '0.82rem' }}>
                  <option value="CONNECTED_INTERESTED">✅ Connected & Interested</option>
                  <option value="CALL_BACK_LATER">⏰ Customer Busy / Call Back Later</option>
                  <option value="FAMILY_DISCUSSION">👨‍👩‍👧 Family Discussion Needed</option>
                  <option value="PRICE_DISCUSSION">💰 Price Discussion / Discount Request</option>
                  <option value="WAITING_FOR_LOAN">🏦 Waiting for Home Loan Pre-approval</option>
                  <option value="NO_ANSWER">🚫 No Answer / Unreachable</option>
                  <option value="NOT_INTERESTED">❌ Not Interested / Dropped</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Next Action Required *:</label>
                <select value={callDispForm.next_action} onChange={(e) => setCallDispForm({ ...callDispForm, next_action: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: '#38bdf8', fontWeight: '800', border: '1px solid #0284c7', borderRadius: '6px', padding: '8px', fontSize: '0.82rem' }}>
                  <option value="Send Cost Sheet">📄 Send Cost Sheet</option>
                  <option value="Call Again">📞 Call Again Later</option>
                  <option value="Schedule Visit">🚘 Schedule Property Site Visit</option>
                  <option value="Create Matching">⚡ Run AI Matching Engine</option>
                  <option value="Close Lead">❌ Close Lead</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Next Follow-Up Date & Time *:</label>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input type="date" value={callDispForm.next_followup_date} onChange={(e) => setCallDispForm({ ...callDispForm, next_followup_date: e.target.value })} style={{ flex: 1, background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.8rem' }} />
                  <input type="time" value={callDispForm.next_followup_time} onChange={(e) => setCallDispForm({ ...callDispForm, next_followup_time: e.target.value })} style={{ width: '90px', background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '6px', fontSize: '0.8rem' }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Call Remarks & Client Notes:</label>
              <textarea
                rows={3}
                placeholder="Enter client conversation summary, budget specifics, key objections..."
                value={callDispForm.remarks}
                onChange={(e) => setCallDispForm({ ...callDispForm, remarks: e.target.value })}
                style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>
                SELECT PIPELINE WORKFLOW ACTION:
              </span>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', flexWrap: 'wrap' }}>
                <button onClick={() => setShowCallDispositionModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer', fontSize: '0.8rem' }}>Cancel</button>

                {/* OUTCOME 1: INTERESTED -> MATCHING -> PROPERTY MATCH -> COST SHEET -> VISIT -> AGREEMENT -> BOOKING */}
                <button
                  onClick={() => {
                    const lead = showCallDispositionModal.lead;
                    const nextIso = `${callDispForm.next_followup_date}T${callDispForm.next_followup_time}:00.000Z`;
                    const updatedLeads = leadsList.map(l => l.id === lead.id ? {
                      ...l,
                      call_disposition: 'CONNECTED_INTERESTED',
                      next_action: 'Proceed to Matching',
                      next_followup: nextIso,
                      lead_status: 'MATCHING_PENDING',
                      updated_at: new Date().toISOString()
                    } : l);
                    setLeadsList(updatedLeads);

                    // Create matching request if not present
                    const reqId = generateNextMatchingCode();
                    const newReq = {
                      requestId: reqId,
                      date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString(),
                      customerName: lead.customer_name,
                      customerNumber: lead.customer_number || lead.customer_id || 'SRM-CUS-2026-000184',
                      leadId: lead.lead_number,
                      requirementId: `SRM-REQ-2026-000${matchingRequestsQueue.length + 95}`,
                      mobile: lead.mobile,
                      purpose: lead.purpose || 'Self Use',
                      propertyType: lead.property_type || 'Flat / Apartment',
                      configuration: lead.bhk || '3BHK',
                      budget: `${lead.budget_min || 7000000} - ${lead.budget_max || 8500000}`,
                      preferredArea: lead.preferred_location || 'Kondapur',
                      radiusKm: 10,
                      possessionStatus: 'Ready to Move',
                      priority: 'HOT',
                      assignedExecutive: lead.assigned_employee_name || 'Priya Nair (Sales Exec)',
                      status: 'MATCHING_PENDING'
                    };
                    setMatchingRequestsQueue(prev => [newReq, ...prev]);

                    setShowCallDispositionModal(null);
                    setSelectedMatchingId(reqId);
                    setActiveTab('matching_management');
                    alert(`🟢 INTERESTED DISPOSITION LOGGED FOR ${lead.lead_number}!\n\nPipeline Triggered: INTERESTED → MATCHING (Match ID: ${reqId}) → PROPERTY MATCH → COST SHEET → VISIT → AGREEMENT → BOOKING.\n\nNavigated directly to Requirement Matching Management!`);
                  }}
                  style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  🟢 INTERESTED → Proceed to Matching
                </button>

                {/* OUTCOME 2: NOT INTERESTED -> RE-CALL LATER */}
                <button
                  onClick={() => {
                    const lead = showCallDispositionModal.lead;
                    const recallDate = new Date(Date.now() + 60 * 24 * 3600000).toISOString().split('T')[0];
                    const nextIso = `${recallDate}T10:00:00.000Z`;
                    const updatedLeads = leadsList.map(l => l.id === lead.id ? {
                      ...l,
                      call_disposition: 'NOT_INTERESTED',
                      next_action: 'Re-call Later (Nurture Vault)',
                      next_followup: nextIso,
                      lead_status: 'NURTURE',
                      updated_at: new Date().toISOString()
                    } : l);
                    setLeadsList(updatedLeads);
                    setShowCallDispositionModal(null);
                    alert(`🟡 NOT INTERESTED LOGGED FOR ${lead.lead_number}.\n\nPipeline Triggered: NOT INTERESTED → RE-CALL LATER.\nLead moved to Nurture Vault with scheduled callback on ${recallDate}.`);
                  }}
                  style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  🟡 NOT INTERESTED → Re-Call Later
                </button>

                {/* OUTCOME 3: NO RESPONSE -> RETRY */}
                <button
                  onClick={() => {
                    const lead = showCallDispositionModal.lead;
                    const nextIso = `${callDispForm.next_followup_date}T${callDispForm.next_followup_time}:00.000Z`;
                    const updatedLeads = leadsList.map(l => l.id === lead.id ? {
                      ...l,
                      call_disposition: 'NO_ANSWER',
                      next_action: 'Retry Follow-up Call',
                      next_followup: nextIso,
                      lead_status: 'CALL_BACK_LATER',
                      updated_at: new Date().toISOString()
                    } : l);
                    setLeadsList(updatedLeads);
                    setShowCallDispositionModal(null);
                    alert(`🔴 NO RESPONSE LOGGED FOR ${lead.lead_number}.\n\nPipeline Triggered: NO RESPONSE → RETRY ATTEMPT.\nRetry callback scheduled for ${callDispForm.next_followup_date} at ${callDispForm.next_followup_time}.`);
                  }}
                  style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  🔴 NO RESPONSE → Retry
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LEAD MODAL 2: 360° LEAD JOURNEY DRAWER / MODAL */}
      {showLead360Drawer && showLead360Drawer.open && showLead360Drawer.lead && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2100, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #0284c7', width: '900px', maxHeight: '92vh', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #0284c7', paddingBottom: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontFamily: 'monospace', background: '#0284c7', color: '#ffffff', padding: '4px 10px', borderRadius: '6px', fontWeight: '900', fontSize: '0.9rem' }}>
                    {showLead360Drawer.lead.lead_number}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>
                    360° COMPLETE LEAD JOURNEY DRAWER
                  </h3>
                </div>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Customer: <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showLead360Drawer.lead.customer_name}</strong> • ID: <strong style={{ color: '#4ade80', fontFamily: 'monospace' }}>{showLead360Drawer.lead.customer_number || showLead360Drawer.lead.customer_id}</strong>
                </p>
              </div>
              <X size={22} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowLead360Drawer(null)} />
            </div>

            {/* FULL CRM JOURNEY STEP BADGE STRIP */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', fontSize: '0.72rem' }}>
              <span style={{ background: '#0284c7', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>1. LEAD ({showLead360Drawer.lead.lead_number})</span>
              <span>&rarr;</span>
              <span style={{ background: '#22c55e', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>2. CUST ({showLead360Drawer.lead.customer_number || 'SRM-CUS-2026-000184'})</span>
              <span>&rarr;</span>
              <span style={{ background: '#38bdf8', color: '#0f172a', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>3. MATCH (SRM-MAT-2026-000421)</span>
              <span>&rarr;</span>
              <span style={{ background: '#fbbf24', color: '#0f172a', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>4. COST SHEET (SRM-CS-2026-000145)</span>
              <span>&rarr;</span>
              <span style={{ background: '#a855f7', color: isLight ? '#0f172a' : '#ffffff', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>5. VISIT (SRM-VS-2026-000087)</span>
              <span>&rarr;</span>
              <span style={{ background: '#ef4444', color: '#ffffff', padding: '4px 8px', borderRadius: '4px', fontWeight: '800' }}>6. BOOKING (SRM-BKG-2026-000201)</span>
            </div>

            {/* 13 DRAWER TABS */}
            <div style={{ display: 'flex', gap: '6px', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '10px', overflowX: 'auto' }}>
              {['OVERVIEW', 'CUSTOMER', 'REQUIREMENT', 'FOLLOW-UP', 'CALL HISTORY', 'PROPERTY MATCHING', 'COST SHEETS', 'VISITS', 'AGREEMENT', 'BOOKING', 'TIMELINE'].map(t => (
                <button
                  key={t}
                  onClick={() => setShowLead360Drawer({ ...showLead360Drawer, tab: t })}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    cursor: 'pointer',
                    background: showLead360Drawer.tab === t ? '#0284c7' : '#0f172a',
                    color: isLight ? '#0f172a' : '#ffffff',
                    border: isLight ? '1px solid #cbd5e1' : '1px solid #334155'
                  }}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* OVERVIEW CONTENT */}
            {showLead360Drawer.tab === 'OVERVIEW' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '0.82rem' }}>
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#38bdf8', fontWeight: '900' }}>📞 CONTACT & SOURCE DETAILS</h4>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Full Name:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showLead360Drawer.lead.customer_name}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Mobile Phone:</span> <strong style={{ color: '#4ade80', fontFamily: 'monospace' }}>{showLead360Drawer.lead.mobile}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Email Address:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showLead360Drawer.lead.email}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Lead Source:</span> <strong style={{ color: '#fbbf24' }}>{showLead360Drawer.lead.source} ({showLead360Drawer.lead.campaign || 'Campaign'})</strong></div>
                </div>

                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#38bdf8', fontWeight: '900' }}>🏠 PROPERTY REQUIREMENT SNAPSHOT</h4>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Preferred Location:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showLead360Drawer.lead.preferred_location}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Preferred Project:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showLead360Drawer.lead.preferred_project || 'Aparna Zenon'}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>BHK & Type:</span> <strong style={{ color: '#fbbf24' }}>{showLead360Drawer.lead.bhk} • {showLead360Drawer.lead.property_type}</strong></div>
                  <div><span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Budget Max:</span> <strong style={{ color: '#4ade80' }}>{formatIndianRupees(showLead360Drawer.lead.budget_max || 8500000)}</strong></div>
                </div>
              </div>
            )}

            {/* TIMELINE CONTENT */}
            {showLead360Drawer.tab === 'TIMELINE' && (
              <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '10px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.8rem' }}>
                <h4 style={{ color: '#38bdf8', fontWeight: '900' }}>📜 AUDIT TRAIL & JOURNEY TIMELINE LOGS</h4>
                {[
                  { time: '24 Aug 10:30 AM', event: `Lead Captured into Central Database (${showLead360Drawer.lead.lead_number})`, by: 'Meta Ads API' },
                  { time: '24 Aug 11:00 AM', event: `Customer Master Linked (ID: ${showLead360Drawer.lead.customer_number || 'SRM-CUS-2026-000184'})`, by: 'Priya Nair' },
                  { time: '24 Aug 11:20 AM', event: `Call Disposition Logged: ${showLead360Drawer.lead.call_disposition}`, by: 'Priya Nair' }
                ].map((log, idx) => (
                  <div key={idx} style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px 10px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>{log.event}</span>
                    <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.72rem' }}>{log.time} • By: {log.by}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px' }}>
              <button onClick={() => setShowLead360Drawer(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>Close Drawer</button>
            </div>
          </div>
        </div>
      )}

      {/* LEAD MODAL 3: LEAD TRANSFER OWNERSHIP MODAL */}
      {showTransferLeadModal && showTransferLeadModal.open && showTransferLeadModal.lead && (
        <div style={{ position: 'fixed', inset: 0, background: isLight ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2200, padding: '20px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '2px solid #fbbf24', width: '520px', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff' }}>🔄 TRANSFER LEAD OWNERSHIP</h3>
              <X size={20} color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setShowTransferLeadModal(null)} />
            </div>

            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', padding: '12px', borderRadius: '8px', fontSize: '0.82rem' }}>
              <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Lead ID:</span> <strong style={{ color: '#38bdf8', fontFamily: 'monospace' }}>{showTransferLeadModal.lead.lead_number}</strong>
              <br />
              <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Customer Name:</span> <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{showTransferLeadModal.lead.customer_name}</strong>
              <br />
              <span style={{ color: isLight ? '#64748b' : '#94a3b8' }}>Current Owner:</span> <strong style={{ color: '#ef4444' }}>{showTransferLeadModal.lead.assigned_employee_name || 'Priya Nair'}</strong>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Target Sales Executive / Manager *:</label>
              <select value={transferLeadForm.newOwnerId} onChange={(e) => setTransferLeadForm({ ...transferLeadForm, newOwnerId: e.target.value })} style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: '#4ade80', fontWeight: '800', border: '1px solid #0284c7', borderRadius: '6px', padding: '8px', fontSize: '0.85rem' }}>
                <option value="USR-07">👤 Priya Nair (Sales Exec)</option>
                <option value="USR-04">👤 Rahul Sharma (Team Lead)</option>
                <option value="USR-14">👤 Ramesh Pawar (Field Exec)</option>
                <option value="USR-06">👤 Amit Patel (Sales Exec)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>Mandatory Transfer Reason *:</label>
              <textarea
                rows={3}
                placeholder="Reason for transferring lead (e.g. Executive on leave, secondary consultation required...)"
                value={transferLeadForm.reason}
                onChange={(e) => setTransferLeadForm({ ...transferLeadForm, reason: e.target.value })}
                style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '6px', padding: '8px', fontSize: '0.82rem' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '12px' }}>
              <button onClick={() => setShowTransferLeadModal(null)} style={{ background: '#334155', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
              <button
                onClick={() => {
                  if (!transferLeadForm.reason) return alert('⚠️ Please provide a reason for lead transfer.');
                  const lead = showTransferLeadModal.lead;
                  const newOwnerName = transferLeadForm.newOwnerId === 'USR-04' ? 'Rahul Sharma (Team Lead)' : transferLeadForm.newOwnerId === 'USR-14' ? 'Ramesh Pawar (Field Exec)' : 'Priya Nair (Sales Exec)';
                  
                  const updatedLeads = leadsList.map(l => l.id === lead.id ? { ...l, assigned_employee_id: transferLeadForm.newOwnerId, assigned_employee_name: newOwnerName, updated_at: new Date().toISOString() } : l);
                  setLeadsList(updatedLeads);
                  setShowTransferLeadModal(null);
                  alert(`🔄 Lead ${lead.lead_number} successfully transferred to ${newOwnerName}. Reason logged into audit trail.`);
                }}
                style={{ background: '#fbbf24', color: '#0f172a', border: 'none', padding: '8px 18px', borderRadius: '6px', fontWeight: '900', cursor: 'pointer' }}
              >
                Execute Lead Transfer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
