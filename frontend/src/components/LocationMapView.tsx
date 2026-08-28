import React from 'react';
import { Compass } from 'lucide-react';

interface LocationMapViewProps {
  isLight: boolean;
  selectedLocality: string;
  setSelectedLocality: (loc: string) => void;
  selectedProperty: any;
  showAllOnMap: boolean;
  setShowAllOnMap: (val: boolean) => void;
  filteredProperties: any[];
  setSelectedProperty: (prop: any) => void;
  handleStartEditProperty: (prop: any) => void;
  handleDeleteProperty: (id: string, code: string) => void;
  InteractiveLeafletMap: React.FC<any>;
}

export const LocationMapView: React.FC<LocationMapViewProps> = ({
  isLight,
  selectedLocality,
  setSelectedLocality,
  selectedProperty = {},
  showAllOnMap,
  setShowAllOnMap,
  filteredProperties = [],
  setSelectedProperty,
  handleStartEditProperty,
  handleDeleteProperty,
  InteractiveLeafletMap,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* CATEGORY HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Compass size={24} color="#38bdf8" /> Project Location Wise Interactive Geographical Radar Map
          </h2>
          <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8' }}>Dedicated map portal: Click any location pin to inspect property specifications, prices, and owner contacts.</p>
        </div>

        <div>
          <button 
            onClick={() => setSelectedLocality('ALL')} 
            style={{ 
              padding: '6px 16px', 
              borderRadius: '6px', 
              border: 'none', 
              cursor: 'pointer', 
              background: selectedLocality === 'ALL' ? '#0284c7' : (isLight ? '#e2e8f0' : '#1e293b'), 
              color: selectedLocality === 'ALL' ? '#ffffff' : (isLight ? '#334155' : '#94a3b8'), 
              fontSize: '0.8rem', 
              fontWeight: '800',
              boxShadow: selectedLocality === 'ALL' ? '0 2px 8px rgba(2, 132, 199, 0.35)' : 'none'
            }}
          >
            🌐 All Hubs
          </button>
        </div>
      </div>

      {/* TOOLBAR CONTROLS (ABOVE MAP CONTAINER TO PREVENT OVERLAP) */}
      <div style={{ background: isLight ? '#ffffff' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: isLight ? '0 2px 8px rgba(0,0,0,0.04)' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', flex: 1, minWidth: 0 }}>
            <Compass size={18} color="#0284c7" />
            <span style={{ fontSize: '0.85rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '400px' }} title={selectedProperty ? `${selectedProperty.title || 'Property'} (${selectedProperty.locality || 'Location'})` : 'Select Property'}>
              📍 Selected: {selectedProperty ? `${selectedProperty.title || 'Property'} (${selectedProperty.locality || 'Location'})` : 'Select Property'}
            </span>
            <span style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#38bdf8', background: 'rgba(56, 189, 248, 0.12)', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
              GPS: {selectedProperty?.latitude || '17.4478'}, {selectedProperty?.longitude || '78.3789'}
            </span>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ background: isLight ? '#f1f5f9' : '#1e293b', borderRadius: '6px', padding: '3px', display: 'flex', gap: '4px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
              <button 
                onClick={() => setShowAllOnMap(true)} 
                style={{ background: showAllOnMap ? '#0284c7' : 'transparent', color: showAllOnMap ? '#ffffff' : (isLight ? '#64748b' : '#94a3b8'), border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
              >
                🌐 View All Properties Map
              </button>
              <button 
                onClick={() => setShowAllOnMap(false)} 
                style={{ background: !showAllOnMap ? '#0284c7' : 'transparent', color: !showAllOnMap ? '#ffffff' : (isLight ? '#64748b' : '#94a3b8'), border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' }}
              >
                📍 Focus Selected Pin
              </button>
            </div>

            <a 
              href={`https://www.google.com/maps?q=${String(selectedProperty?.latitude || '17.4478').replace(/[^\d.-]/g, '')},${String(selectedProperty?.longitude || '78.3789').replace(/[^\d.-]/g, '')}+(${encodeURIComponent(selectedProperty?.title || 'Property Location')})`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: '#ffffff', textDecoration: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 8px rgba(34, 197, 94, 0.3)' }}
            >
              Open Google Maps ↗
            </a>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID (MAP LEFT, DETAILS RIGHT) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '20px' }}>
        
        {/* MAP CANVAS CONTAINER */}
        <div style={{ background: isLight ? '#ffffff' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', height: '580px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
          <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
            <InteractiveLeafletMap 
              properties={filteredProperties}
              selectedProperty={selectedProperty}
              setSelectedProperty={setSelectedProperty}
              showAllOnMap={showAllOnMap}
              isLight={isLight}
            />

            {/* BOTTOM STATUS OVERLAY */}
            <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', zIndex: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: isLight ? 'rgba(255, 255, 255, 0.92)' : 'rgba(15, 23, 42, 0.92)', backdropFilter: 'blur(8px)', padding: '8px 14px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', fontSize: '0.75rem', color: isLight ? '#0f172a' : '#ffffff', fontWeight: '700' }}>
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '65%' }}>📍 GPS Engine • {selectedProperty ? `${selectedProperty.title || 'Property'} (${selectedProperty.latitude || '17.4474'}, ${selectedProperty.longitude || '78.3762'})` : (selectedLocality === 'ALL' ? 'Hyderabad Core' : selectedLocality)}</span>
              <span style={{ color: '#22c55e', fontWeight: '800', whiteSpace: 'nowrap' }}>● Live Interactive Map ({filteredProperties.length} Tracked)</span>
            </div>
          </div>
        </div>

        {/* RIGHT PROPERTY SPECIFICATION PANEL */}
        <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', overflow: 'hidden' }}>
          <div style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800', background: 'rgba(56, 189, 248, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>{selectedProperty?.property_code || 'N/A'}</span>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff', marginTop: '6px', wordBreak: 'break-word', overflowWrap: 'break-word', lineHeight: '1.3' }}>{selectedProperty?.title || 'No Property Selected'}</h3>
            <p style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '4px' }}>📍 {selectedProperty?.locality || 'Hyderabad Core'}, Hyderabad</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>Asking Price</span>
              <span style={{ fontSize: '1.3rem', color: '#4ade80', fontWeight: '900' }}>{selectedProperty?.final_price || '₹0'}</span>
            </div>
            <div>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>Rate / Sq.Ft.</span>
              <span style={{ fontSize: '0.9rem', color: '#38bdf8', fontWeight: '800' }}>{selectedProperty?.price_sqft || '₹0 / sq.ft.'}</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', overflow: 'hidden' }}>
              <span style={{ color: isLight ? '#64748b' : '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Developer</span>
              <strong style={{ color: isLight ? '#0f172a' : '#ffffff', wordBreak: 'break-word' }}>{selectedProperty?.developer || 'N/A'}</strong>
            </div>
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px', borderRadius: '8px', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
              <span style={{ color: isLight ? '#64748b' : '#94a3b8', display: 'block', fontSize: '0.65rem' }}>Config</span>
              <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{selectedProperty?.configuration || 'N/A'}</strong>
            </div>
          </div>

          <div style={{ background: isLight ? '#f8fafc' : '#0f172a', padding: '10px 12px', borderRadius: '8px', border: '1px solid #0284c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.65rem', color: isLight ? '#64748b' : '#94a3b8', display: 'block' }}>GPS Coordinates (Project Mgmt)</span>
              <strong style={{ fontSize: '0.8rem', color: '#38bdf8', fontFamily: 'monospace' }}>
                📍 {selectedProperty?.latitude || '17.4474'}, {selectedProperty?.longitude || '78.3762'}
              </strong>
            </div>
            <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: '0.68rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px' }}>
              ✓ GPS Synced
            </span>
          </div>

          <a 
            href={`https://www.google.com/maps?q=${String(selectedProperty?.latitude || '17.4478').replace(/[^\d.-]/g, '')},${String(selectedProperty?.longitude || '78.3789').replace(/[^\d.-]/g, '')}+(${encodeURIComponent(selectedProperty?.title || 'Property Location')})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', textDecoration: 'none', padding: '9px 14px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', marginTop: '4px', boxShadow: '0 4px 12px rgba(2, 132, 199, 0.3)' }}
          >
            🧭 Open Exact GPS Pin on Google Maps ↗
          </a>

          <div style={{ display: 'flex', gap: '8px', paddingTop: '10px' }}>
            <button onClick={() => handleStartEditProperty(selectedProperty)} style={{ flex: 1, background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Edit Record</button>
            <button onClick={() => handleDeleteProperty(selectedProperty?.id, selectedProperty?.property_code)} style={{ flex: 1, background: '#ef4444', color: '#ffffff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}>Delete</button>
          </div>
        </div>

      </div>
    </div>
  );
};
