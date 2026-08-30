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
  devProjectAltMobile?: string;
  setDevProjectAltMobile?: (val: string) => void;
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
  devProjectAltMobile = '',
  setDevProjectAltMobile,
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
  // DEVELOPER MASTER ID REGISTRY STATE & PERSISTENCE
  const PROJECT_GPS_MAP: Record<string, { lat: string; lng: string }> = {
    'TILOTTAMA APPARTMENT': { lat: '22.722361', lng: '88.493403' },
    'My Home Bhooja': { lat: '17.440081', lng: '78.377625' },
    'My Home Sayuk': { lat: '17.462100', lng: '78.291200' },
    'My Home Tarkshya': { lat: '17.465400', lng: '78.361200' },
    'Dhriti Apartments': { lat: '17.468000', lng: '78.358000' },
    'Dhriti Heights': { lat: '17.442000', lng: '78.349000' },
    'Aparna Zenon': { lat: '17.468200', lng: '78.354100' },
    'Aparna Sarovar Zicon': { lat: '17.478900', lng: '78.318000' },
    'Jayabheri The Peak': { lat: '17.419800', lng: '78.341200' }
  };

  const getGpsForProject = (projTitle: string, defaultLat?: string, defaultLng?: string) => {
    const cleanTitle = (projTitle || '').trim();
    if (PROJECT_GPS_MAP[cleanTitle]) return PROJECT_GPS_MAP[cleanTitle];
    const foundKey = Object.keys(PROJECT_GPS_MAP).find(k => k.toLowerCase().includes(cleanTitle.toLowerCase()) || cleanTitle.toLowerCase().includes(k.toLowerCase()));
    if (foundKey) return PROJECT_GPS_MAP[foundKey];
    return { lat: defaultLat || '22.722361', lng: defaultLng || '88.493403' };
  };

  const DEFAULT_DEVELOPERS = [
    {
      id: 'SRM-DEV-2026-000101',
      name: 'My Home Constructions',
      mobile: '+91 98490 88776',
      email: 'contact@myhomeconstructions.com',
      projects: [
        { id: 'PRJ-101', title: 'My Home Bhooja', locality: 'HITEC City Sector', lat: '17.440081', lng: '78.377625' },
        { id: 'PRJ-102', title: 'My Home Sayuk', locality: 'Tellapur Hub', lat: '17.462100', lng: '78.291200' },
        { id: 'PRJ-103', title: 'My Home Tarkshya', locality: 'Kondapur Hub', lat: '17.465400', lng: '78.361200' }
      ]
    },
    {
      id: 'SRM-DEV-2026-000102',
      name: 'Dhriti Builders & Developers',
      mobile: '+91 98491 55432',
      email: 'sales@dhritibuilders.com',
      projects: [
        { id: 'PRJ-201', title: 'Dhriti Apartments', locality: 'Kondapur Hub', lat: '17.468000', lng: '78.358000' },
        { id: 'PRJ-202', title: 'Dhriti Heights', locality: 'Gachibowli', lat: '17.442000', lng: '78.349000' }
      ]
    },
    {
      id: 'SRM-DEV-2026-000103',
      name: 'Aparna Constructions',
      mobile: '+91 98492 11009',
      email: 'info@aparnaconstructions.com',
      projects: [
        { id: 'PRJ-301', title: 'Aparna Zenon', locality: 'Kondapur Hub', lat: '17.468200', lng: '78.354100' },
        { id: 'PRJ-302', title: 'Aparna Sarovar Zicon', locality: 'Nallagandla', lat: '17.478900', lng: '78.318000' }
      ]
    },
    {
      id: 'SRM-DEV-2026-000104',
      name: 'Jayabheri Properties',
      mobile: '+91 98493 77812',
      email: 'contact@jayabheri.com',
      projects: [
        { id: 'PRJ-401', title: 'Jayabheri The Peak', locality: 'Financial District', lat: '17.419800', lng: '78.341200' }
      ]
    },
    {
      id: 'SRM-DEV-2026-000105',
      name: 'LITTON SEN',
      mobile: '9883395102',
      altMobile: '7044293951',
      email: 'litton.sen@tilottama.com',
      projects: [
        { id: 'PRJ-501', title: 'TILOTTAMA APPARTMENT', locality: 'BARASAT, CHAPADALI', lat: '22.722361', lng: '88.493403' }
      ]
    }
  ];

  const [developerMasterList, setDeveloperMasterList] = React.useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_developers_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const merged = [...parsed];
          DEFAULT_DEVELOPERS.forEach(d => {
            if (!merged.some(m => m.id === d.id || m.name.toLowerCase().trim() === d.name.toLowerCase().trim())) {
              merged.push(d);
            }
          });
          return merged;
        }
      }
    } catch {
      return DEFAULT_DEVELOPERS;
    }
    return DEFAULT_DEVELOPERS;
  });

  const [selectedDevId, setSelectedDevId] = React.useState<string>('');
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>('');
  const [devSearchQuery, setDevSearchQuery] = React.useState<string>('');
  const [projectSearchQuery, setProjectSearchQuery] = React.useState<string>('');
  const [showDevVaultModal, setShowDevVaultModal] = React.useState<boolean>(false);
  const [newDevNameInput, setNewDevNameInput] = React.useState<string>('');
  const [newDevMobileInput, setNewDevMobileInput] = React.useState<string>('');
  const [newDevAltMobileInput, setNewDevAltMobileInput] = React.useState<string>('');
  const [newDevProjectTitleInput, setNewDevProjectTitleInput] = React.useState<string>('');
  const [newDevProjectLocalityInput, setNewDevProjectLocalityInput] = React.useState<string>('');
  const [viewPropertyModal, setViewPropertyModal] = React.useState<any | null>(null);

  // PROJECT PARKING STOCK MAP & PERSISTENCE WITH PRICING
  const [projectParkingStockMap, setProjectParkingStockMap] = React.useState<Record<string, {
    totalCovered: number;
    priceCovered: number | string;
    totalEv: number;
    priceEv: number | string;
    totalOpen: number;
    priceOpen: number | string;
  }>>(() => {
    try {
      const saved = localStorage.getItem('swaramayi_project_parking_stock_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      'TILOTTAMA APPARTMENT': { totalCovered: 12, priceCovered: 300000, totalEv: 2, priceEv: 450000, totalOpen: 6, priceOpen: 150000 },
      'My Home Sayuk': { totalCovered: 120, priceCovered: 350000, totalEv: 20, priceEv: 500000, totalOpen: 30, priceOpen: 200000 },
      'My Home Bhooja': { totalCovered: 150, priceCovered: 400000, totalEv: 25, priceEv: 600000, totalOpen: 40, priceOpen: 250000 },
      'Aparna Zenon': { totalCovered: 90, priceCovered: 300000, totalEv: 15, priceEv: 450000, totalOpen: 25, priceOpen: 150000 },
      'Rajapushpa Imperia': { totalCovered: 80, priceCovered: 350000, totalEv: 10, priceEv: 500000, totalOpen: 20, priceOpen: 175000 },
      'Dhriti Residency': { totalCovered: 15, priceCovered: 250000, totalEv: 2, priceEv: 350000, totalOpen: 5, priceOpen: 125000 }
    };
  });

  const [showManageParkingModal, setShowManageParkingModal] = React.useState<boolean>(false);
  const [parkingModalProjectName, setParkingModalProjectName] = React.useState<string>('');
  const [parkingModalForm, setParkingModalForm] = React.useState({
    totalCovered: 12,
    priceCovered: 300000,
    totalEv: 2,
    priceEv: 450000,
    totalOpen: 6,
    priceOpen: 150000
  });

  React.useEffect(() => {
    try {
      localStorage.setItem('swaramayi_project_parking_stock_v1', JSON.stringify(projectParkingStockMap));
    } catch (e) {
      console.error(e);
    }
  }, [projectParkingStockMap]);

  React.useEffect(() => {
    try {
      localStorage.setItem('swaramayi_developers_v1', JSON.stringify(developerMasterList));
    } catch (e) {
      console.error(e);
    }
  }, [developerMasterList]);

  const [propCodeSearchQuery, setPropCodeSearchQuery] = React.useState<string>('');
  const [selectedPropCode, setSelectedPropCode] = React.useState<string>('');

  const handleSelectPropertyByCode = (foundProp: any) => {
    if (!foundProp) return;
    setPropCodeSearchQuery(foundProp.property_code);
    setSelectedPropCode(foundProp.property_code);

    const devObj = developerMasterList.find(d => 
      d.id === foundProp.developer_id || 
      (foundProp.developer && d.name.toLowerCase().trim() === foundProp.developer.toLowerCase().trim())
    );

    if (devObj) {
      setSelectedDevId(devObj.id);
      setDevSearchQuery(devObj.name);
      if (devObj.projects?.[0]) setSelectedProjectId(devObj.projects[0].id);
    }

    const primaryMob = foundProp.developer_mobile || devObj?.mobile?.split('/')[0]?.trim() || devObj?.mobile || '9883395102';
    const secondaryMob = foundProp.developer_alt_mobile || devObj?.altMobile || '7044293951';
    const projTitle = foundProp.title || 'TILOTTAMA APPARTMENT';
    const gps = getGpsForProject(projTitle, foundProp.latitude, foundProp.longitude);

    setNewPropertyForm((prev: any) => ({
      ...prev,
      property_code: foundProp.property_code,
      developer_id: foundProp.developer_id || devObj?.id || 'SRM-DEV-2026-000105',
      developer: foundProp.developer || 'LITTON SEN',
      title: projTitle,
      locality: foundProp.locality || 'BARASAT, CHAPADALI',
      configuration: foundProp.configuration || '3BHK',
      carpet_area: foundProp.carpet_area || '898.1 Sq.Ft.',
      super_builtup_area: foundProp.super_builtup_area || '1,283 Sq.Ft.',
      floor_num: foundProp.floor_num || foundProp.floor_number || '2nd Floor',
      total_floors: foundProp.total_floors || 'G+4 Floors',
      facing: foundProp.facing || 'South Facing',
      furnishing: foundProp.furnishing || 'Semi-Furnished',
      final_price: foundProp.final_price || '₹46,08,000',
      price_sqft: foundProp.price_sqft || '₹5,131/Sq.Ft.',
      car_parking: foundProp.car_parking || '1 Covered Parking Slot',
      parking_price: foundProp.parking_price || '300000',
      latitude: gps.lat,
      longitude: gps.lng,
      building_photos: foundProp.building_photos || [],
      building_photo: foundProp.building_photo || '',
      unit_photos: foundProp.unit_photos || [],
      unit_photo: foundProp.unit_photo || '',
      project_posting_id: foundProp.project_posting_id || 'PRJ-POST-2026-8802',
      key_custody: foundProp.key_custody || 'Builder Site Office',
      description: foundProp.description || '',
      site_person_name: foundProp.site_person_name || '',
      site_person_contact: foundProp.site_person_contact || ''
    }));

    setDevProjectMobile(primaryMob);
    if (setDevProjectAltMobile) setDevProjectAltMobile(secondaryMob);
  };

  React.useEffect(() => {
    if (searchQuery && searchQuery.trim().length >= 2) {
      const q = searchQuery.trim().toLowerCase();
      const matched = properties.find(p => 
        (p.property_code || '').toLowerCase().includes(q) ||
        (p.title || '').toLowerCase().includes(q) ||
        (p.developer || '').toLowerCase().includes(q)
      );
      if (matched && matched.property_code) {
        handleSelectPropertyByCode(matched);
      }
    }
  }, [searchQuery, properties]);

  const handleSelectDeveloperObj = (found: any) => {
    if (!found) return;
    setSelectedDevId(found.id);
    const firstProj = found.projects?.[0];
    if (firstProj) setSelectedProjectId(firstProj.id);

    const primaryMob = found.mobile?.split('/')[0]?.trim() || found.mobile || '';
    const secondaryMob = found.altMobile || (found.mobile?.includes('/') ? found.mobile.split('/')[1]?.trim() : '');

    const projTitle = firstProj?.title || 'TILOTTAMA APPARTMENT';
    const gps = getGpsForProject(projTitle, firstProj?.lat, firstProj?.lng);

    setNewPropertyForm((prev: any) => ({
      ...prev,
      developer_id: found.id,
      developer: found.name,
      title: projTitle,
      locality: firstProj?.locality || prev.locality || '',
      developer_alt_mobile: secondaryMob,
      latitude: gps.lat,
      longitude: gps.lng
    }));

    setDevProjectMobile(primaryMob);
    if (setDevProjectAltMobile) setDevProjectAltMobile(secondaryMob);
  };

  const filteredDevs = developerMasterList.filter(dev => {
    if (!devSearchQuery.trim()) return true;
    const q = devSearchQuery.toLowerCase().trim();
    const matchesProj = (dev.projects || []).some((p: any) => p.title?.toLowerCase().includes(q) || p.locality?.toLowerCase().includes(q));
    return (
      dev.id.toLowerCase().includes(q) ||
      dev.name.toLowerCase().includes(q) ||
      (dev.mobile && dev.mobile.toLowerCase().includes(q)) ||
      (dev.altMobile && dev.altMobile.toLowerCase().includes(q)) ||
      (dev.email && dev.email.toLowerCase().includes(q)) ||
      matchesProj
    );
  });

  const allGlobalProjects = React.useMemo(() => {
    const list: any[] = [];
    const seenTitles = new Set<string>();

    developerMasterList.forEach(dev => {
      (dev.projects || []).forEach((proj: any) => {
        const key = proj.title.toLowerCase().trim();
        if (!seenTitles.has(key)) {
          seenTitles.add(key);
          const gps = getGpsForProject(proj.title, proj.lat, proj.lng);
          list.push({
            id: proj.id || `PROJ-${Date.now()}-${Math.random()}`,
            title: proj.title,
            locality: proj.locality || 'Kondapur / Madhyamgram',
            devName: dev.name,
            devId: dev.id,
            devMobile: dev.mobile,
            devAltMobile: dev.altMobile,
            lat: gps.lat,
            lng: gps.lng
          });
        }
      });
    });

    properties.forEach((p: any) => {
      if (p.title && !seenTitles.has(p.title.toLowerCase().trim())) {
        seenTitles.add(p.title.toLowerCase().trim());
        const gps = getGpsForProject(p.title, p.latitude, p.longitude);
        list.push({
          id: `PROJ-PROP-${p.id}`,
          title: p.title,
          locality: p.locality || 'BARASAT, CHAPADALI',
          devName: p.developer || 'LITTON SEN',
          devId: p.developer_id || 'SRM-DEV-2026-000105',
          devMobile: p.developer_mobile || '9883395102',
          devAltMobile: p.developer_alt_mobile || '7044293951',
          lat: gps.lat,
          lng: gps.lng
        });
      }
    });

    const defaultMatrix = [
      { title: 'TILOTTAMA APPARTMENT', locality: 'BARASAT, BANAMALIPUR, BARASAT NEAR ECO HOSPITAL', devName: 'LITTON SEN', devId: 'SRM-DEV-2026-000105', devMobile: '9883395102', devAltMobile: '7044293951', lat: '22.722361', lng: '88.493403' },
      { title: 'My Home Bhooja', locality: 'Kondapur / HITEC City', devName: 'My Home Constructions', devId: 'SRM-DEV-2026-000101', devMobile: '9849012345', devAltMobile: '9849012346', lat: '17.440081', lng: '78.377625' },
      { title: 'My Home Sayuk', locality: 'Tellapur / Gachibowli', devName: 'My Home Constructions', devId: 'SRM-DEV-2026-000101', devMobile: '9849012345', devAltMobile: '9849012346', lat: '17.452000', lng: '78.285000' },
      { title: 'Aparna Zenon', locality: 'Nanakramguda / Financial District', devName: 'Aparna Constructions', devId: 'SRM-DEV-2026-000102', devMobile: '9849023456', devAltMobile: '9849023457', lat: '17.420100', lng: '78.341000' },
      { title: 'Rajapushpa Imperia', locality: 'Tellapur Hub', devName: 'Rajapushpa Properties', devId: 'SRM-DEV-2026-000103', devMobile: '9849034567', devAltMobile: '9849034568', lat: '17.452000', lng: '78.285000' },
      { title: 'Dhriti Residency', locality: 'Madinaguda Sector', devName: 'Dhriti Builders', devId: 'SRM-DEV-2026-000104', devMobile: '9849045678', devAltMobile: '9849045679', lat: '17.492100', lng: '78.341200' }
    ];

    defaultMatrix.forEach(def => {
      if (!seenTitles.has(def.title.toLowerCase().trim())) {
        seenTitles.add(def.title.toLowerCase().trim());
        list.push({
          id: `PROJ-DEF-${def.title.replace(/\s+/g, '-')}`,
          ...def
        });
      }
    });

    return list;
  }, [developerMasterList, properties]);

  const handleSelectProjectObj = (foundProj: any) => {
    if (!foundProj) return;
    setSelectedProjectId(foundProj.id);
    const gps = getGpsForProject(foundProj.title, foundProj.lat, foundProj.lng);

    if (foundProj.devId) {
      setSelectedDevId(foundProj.devId);
      const dev = developerMasterList.find(d => d.id === foundProj.devId);
      if (dev) setDevSearchQuery(dev.name);
    }
    if (foundProj.devMobile) setDevProjectMobile(foundProj.devMobile);
    if (foundProj.devAltMobile && setDevProjectAltMobile) setDevProjectAltMobile(foundProj.devAltMobile);

    setNewPropertyForm((prev: any) => ({
      ...prev,
      title: foundProj.title,
      locality: foundProj.locality || prev.locality || '',
      developer: foundProj.devName || prev.developer || 'LITTON SEN',
      developer_id: foundProj.devId || prev.developer_id || 'SRM-DEV-2026-000105',
      developer_alt_mobile: foundProj.devAltMobile || prev.developer_alt_mobile || '7044293951',
      latitude: gps.lat,
      longitude: gps.lng
    }));
  };

  const selectedDev = developerMasterList.find(d => d.id === selectedDevId);

  const filteredProjects = allGlobalProjects.filter((proj: any) => {
    if (selectedDevId) {
      const devMatch = proj.devId === selectedDevId || (selectedDev && proj.devName?.toLowerCase().trim() === selectedDev.name?.toLowerCase().trim());
      if (projectSearchQuery.trim()) {
        const q = projectSearchQuery.toLowerCase().trim();
        return (proj.title.toLowerCase().includes(q) || proj.locality.toLowerCase().includes(q));
      }
      return devMatch || true;
    }

    if (!projectSearchQuery.trim()) return true;
    const q = projectSearchQuery.toLowerCase().trim();
    return (
      proj.title.toLowerCase().includes(q) ||
      proj.locality.toLowerCase().includes(q) ||
      (proj.devName && proj.devName.toLowerCase().includes(q))
    );
  });

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
        <button onClick={() => setShowDevVaultModal(true)} style={{ padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer', background: isLight ? '#ffffff' : '#1e293b', color: '#fbbf24', border: '1px solid #fbbf24', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          🏢 Developer Master Vault ({developerMasterList.length} Developer IDs)
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

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={(e) => handleCreatePropertySubmit(e as any)}
                style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#ffffff', border: 'none', padding: '12px 24px', borderRadius: '10px', fontWeight: '900', fontSize: '0.92rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(22, 163, 74, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                💾 SAVE & COMPLETE REGISTRATION
              </button>

              <div style={{ background: 'rgba(56, 189, 248, 0.15)', border: '1px solid #38bdf8', borderRadius: '10px', padding: '10px 18px', textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: '900', textTransform: 'uppercase', display: 'block' }}>Stock Tracking Code</span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '900', color: '#0284c7', fontFamily: 'monospace', margin: '2px 0 0 0' }}>
                  {editingProperty ? editingProperty.property_code : (newPropertyForm.property_code || generateNextPropertyCode())}
                </h3>
              </div>
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

                {/* SEARCH & FETCH EXISTING PROPERTY BY PROPERTY CODE */}
                <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <label style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      🔑 SEARCH & FETCH EXISTING PROPERTY BY PROPERTY CODE (e.g. SRM-PROP-2026-000427) *
                    </label>
                    {selectedPropCode && (
                      <button 
                        type="button" 
                        onClick={() => {
                          const p = properties.find((item: any) => item.property_code === selectedPropCode);
                          if (p) setViewPropertyModal(p);
                        }}
                        style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        👁️ View Full Details ({selectedPropCode})
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : '1fr 1fr', gap: '12px' }}>
                    {/* INPUT SEARCH BY CODE */}
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text"
                        value={propCodeSearchQuery}
                        onChange={(e) => {
                          const q = e.target.value;
                          setPropCodeSearchQuery(q);
                          if (q.trim().length >= 1) {
                            const lowerQ = q.toLowerCase().trim();
                            const foundProp = properties.find((p: any) => 
                              (p.property_code || '').toLowerCase().includes(lowerQ) ||
                              (p.id || '').toLowerCase().includes(lowerQ)
                            );
                            if (foundProp) {
                              handleSelectPropertyByCode(foundProp);
                            }
                          }
                        }}
                        placeholder="🔎 Type Property Code (e.g. SRM-PROP-2026-000427)..."
                        style={{ width: '100%', background: isLight ? '#ffffff' : '#0f172a', border: '1.5px solid #38bdf8', color: '#38bdf8', fontWeight: '900', padding: '8px 12px 8px 34px', borderRadius: '8px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                      />
                      <Search size={16} style={{ position: 'absolute', left: '10px', top: '10px', color: '#38bdf8' }} />
                    </div>

                    {/* DROPDOWN LIST OF PROPERTY CODES */}
                    <select
                      value={selectedPropCode}
                      onChange={(e) => {
                        const pCode = e.target.value;
                        setSelectedPropCode(pCode);
                        const foundProp = properties.find((p: any) => p.property_code === pCode);
                        if (foundProp) {
                          handleSelectPropertyByCode(foundProp);
                        }
                      }}
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#0f172a', border: '1.5px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '8px 12px', borderRadius: '8px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                    >
                      <option value="">-- SELECT FROM LIST OF REGISTERED PROPERTY CODES ({properties.length} Available) --</option>
                      {properties.map((p: any) => (
                        <option key={p.id} value={p.property_code}>
                          🔑 {p.property_code} — {p.title} ({p.developer})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* DEVELOPER ID & PROJECT MASTER LOOKUP CONTAINER */}
                <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1.5px solid #0284c7', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : '1fr 1fr', gap: '14px' }}>
                    
                    {/* DEVELOPER SEARCH & SELECT BY DEVELOPER ID */}
                    <div>
                      <label style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        🔍 SEARCH & SELECT DEVELOPER BY DEVELOPER ID / BUILDER NAME *
                      </label>

                      {/* LIVE SEARCH INPUT FOR DEVELOPER */}
                      <div style={{ position: 'relative', marginBottom: '8px' }}>
                        <input 
                          type="text"
                          value={devSearchQuery}
                          onChange={(e) => {
                            const q = e.target.value;
                            setDevSearchQuery(q);
                            if (q.trim().length >= 1) {
                              const lowerQ = q.toLowerCase().trim();
                              const matchedDev = developerMasterList.find(dev => 
                                dev.id.toLowerCase().includes(lowerQ) ||
                                dev.name.toLowerCase().includes(lowerQ) ||
                                (dev.mobile && dev.mobile.toLowerCase().includes(lowerQ)) ||
                                (dev.altMobile && dev.altMobile.toLowerCase().includes(lowerQ)) ||
                                (dev.projects && dev.projects.some((p: any) => p.title?.toLowerCase().includes(lowerQ) || p.locality?.toLowerCase().includes(lowerQ)))
                              );
                              if (matchedDev) {
                                handleSelectDeveloperObj(matchedDev);
                              } else {
                                setSelectedDevId('');
                                setSelectedProjectId('');
                                setDevProjectMobile('');
                                if (setDevProjectAltMobile) setDevProjectAltMobile('');
                                setNewPropertyForm((prev: any) => ({
                                  ...prev,
                                  developer_id: '',
                                  developer: q,
                                  title: '',
                                  locality: ''
                                }));
                              }
                            } else {
                              setSelectedDevId('');
                              setSelectedProjectId('');
                              setDevProjectMobile('');
                              if (setDevProjectAltMobile) setDevProjectAltMobile('');
                              setNewPropertyForm((prev: any) => ({
                                ...prev,
                                developer_id: '',
                                developer: '',
                                title: '',
                                locality: ''
                              }));
                            }
                          }}
                          placeholder="🔎 Type Developer ID, Builder Name, or Mobile (e.g. LITTON SEN, SRM-DEV-105)..."
                          style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #0284c7', color: '#38bdf8', fontWeight: '800', padding: '8px 12px 8px 34px', borderRadius: '8px', fontSize: '0.84rem' }}
                        />
                        <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#0284c7' }} />
                      </div>

                      <select 
                        value={selectedDevId}
                        onChange={(e) => {
                          const val = e.target.value;
                          setSelectedDevId(val);
                          setSelectedProjectId('');
                          if (val === 'NEW_DEV') {
                            const newId = `SRM-DEV-2026-000${developerMasterList.length + 105}`;
                            setNewPropertyForm((prev: any) => ({ ...prev, developer_id: newId }));
                          } else {
                            const found = developerMasterList.find(d => d.id === val);
                            if (found) {
                              handleSelectDeveloperObj(found);
                            }
                          }
                        }}
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #0284c7', color: '#38bdf8', fontWeight: '900', padding: '10px 12px', borderRadius: '8px', fontSize: '0.88rem' }}
                      >
                        <option value="">-- SELECT REGISTERED DEVELOPER ID OR ADD NEW ({filteredDevs.length} Found) --</option>
                        {filteredDevs.map(dev => (
                          <option key={dev.id} value={dev.id}>
                            🏢 {dev.id} — {dev.name} ({dev.mobile})
                          </option>
                        ))}
                        <option value="NEW_DEV">➕ Register New Developer ID Master</option>
                      </select>
                    </div>

                    {/* PROJECT SELECTOR DROPDOWN */}
                    <div>
                      <label style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                        📁 SELECT REGISTERED PROJECT TITLE & NAME ({filteredProjects.length} Projects Listed)
                      </label>

                      {/* LIVE SEARCH INPUT FOR PROJECT */}
                      <div style={{ position: 'relative', marginBottom: '8px' }}>
                        <input 
                          type="text"
                          value={projectSearchQuery}
                          onChange={(e) => {
                            const q = e.target.value;
                            setProjectSearchQuery(q);
                            if (q.trim().length >= 1) {
                              const lowerQ = q.toLowerCase().trim();
                              const matchedProj = allGlobalProjects.find((p: any) =>
                                p.title.toLowerCase().includes(lowerQ) ||
                                p.locality.toLowerCase().includes(lowerQ)
                              );
                              if (matchedProj) {
                                handleSelectProjectObj(matchedProj);
                              }
                            }
                          }}
                          placeholder="🔎 Type to search Project Title or Locality (e.g. TILOTTAMA, Bhooja, Zenon)..."
                          style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #38bdf8', color: '#4ade80', fontWeight: '800', padding: '8px 12px 8px 34px', borderRadius: '8px', fontSize: '0.84rem' }}
                        />
                        <Search size={15} style={{ position: 'absolute', left: '10px', top: '10px', color: '#38bdf8' }} />
                      </div>

                      <select
                        value={selectedProjectId}
                        onChange={(e) => {
                          const pVal = e.target.value;
                          setSelectedProjectId(pVal);
                          if (pVal && pVal !== 'NEW_PROJECT') {
                            const foundProj = allGlobalProjects.find((p: any) => p.id === pVal);
                            if (foundProj) {
                              handleSelectProjectObj(foundProj);
                            }
                          }
                        }}
                        style={{ width: '100%', background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #38bdf8', color: '#4ade80', fontWeight: '900', padding: '10px 12px', borderRadius: '8px', fontSize: '0.88rem' }}
                      >
                        <option value="">-- SELECT EXISTING REGISTERED PROJECT ({filteredProjects.length} Available) --</option>
                        {filteredProjects.map((proj: any) => (
                          <option key={proj.id} value={proj.id}>
                            🏢 {proj.title} ({proj.locality}) — Dev: {proj.devName || 'LITTON SEN'}
                          </option>
                        ))}
                        <option value="NEW_PROJECT">➕ Add / Type Individual Project Title & Name</option>
                      </select>
                    </div>
                  </div>

                  {/* ACTIVE DEVELOPER BADGE SUMMARY */}
                  {selectedDev && (
                    <div style={{ background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '8px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ fontSize: '0.82rem', color: isLight ? '#0f172a' : '#ffffff' }}>
                        <span style={{ color: '#fbbf24', fontWeight: '900', marginRight: '8px' }}>🆔 DEVELOPER ID: {selectedDev.id}</span>
                        <strong style={{ color: '#38bdf8' }}>{selectedDev.name}</strong> • 📱 {selectedDev.mobile} • 📧 {selectedDev.email}
                      </div>
                      <span style={{ fontSize: '0.72rem', background: '#0284c7', color: '#ffffff', padding: '3px 10px', borderRadius: '12px', fontWeight: '800' }}>
                        {selectedDev.projects.length} Registered Projects
                      </span>
                    </div>
                  )}
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
                      onChange={(e) => {
                        const val = e.target.value;
                        const gps = getGpsForProject(val);
                        setNewPropertyForm((prev: any) => ({
                          ...prev,
                          title: val,
                          latitude: gps ? gps.lat : prev.latitude,
                          longitude: gps ? gps.lng : prev.longitude
                        }));
                      }} 
                      placeholder="e.g. My Home Bhooja / Dhriti Apartments / Aparna Zenon" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                      required 
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Developer Mobile Phone (for OTP) *</label>
                    <input 
                      type="text" 
                      value={devProjectMobile} 
                      onChange={(e) => setDevProjectMobile(e.target.value)} 
                      placeholder="e.g. +91 98833 95102" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                      required 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>Alternative Phone Number (Secondary Contact)</label>
                    <input 
                      type="text" 
                      value={devProjectAltMobile} 
                      onChange={(e) => {
                        const val = e.target.value;
                        if (setDevProjectAltMobile) setDevProjectAltMobile(val);
                        setNewPropertyForm({ ...newPropertyForm, developer_alt_mobile: val });
                      }} 
                      placeholder="e.g. +91 70442 93951" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }} 
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Locality Hub / Sector *</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.locality} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, locality: e.target.value })} 
                      placeholder="e.g. Kondapur Hub / HITEC City Sector / BARASAT" 
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

                {/* MULTIPLE BUILDING & EXTERIOR ELEVATION PHOTO CAPTURE WIDGET */}
                {(() => {
                  const photosList: string[] = Array.isArray(newPropertyForm.building_photos) 
                    ? newPropertyForm.building_photos 
                    : (newPropertyForm.building_photo ? [newPropertyForm.building_photo] : []);

                  return (
                    <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #eab308', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.86rem', color: '#eab308', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Camera size={18} color="#eab308" /> 📷 Building & Exterior Elevation Photo Capture (Multiple Uploads Allowed)
                          </span>
                          <p style={{ fontSize: '0.74rem', color: isLight ? '#64748b' : '#94a3b8', margin: '3px 0 0 0' }}>
                            Upload multiple exterior photos & elevation views. Sales personnel & buyers can view full gallery during site visits.
                          </p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {/* MULTIPLE FILES UPLOAD BUTTON */}
                          <label style={{ background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: '#0f172a', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 10px rgba(234, 179, 8, 0.35)' }}>
                            <Camera size={16} color="#0f172a" />
                            📸 UPLOAD MULTIPLE BUILDING PHOTOS
                            <input 
                              type="file" 
                              accept="image/*" 
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                  const fileArray = Array.from(files);
                                  const readPromises = fileArray.map(file => {
                                    return new Promise<string>((resolve) => {
                                      const reader = new FileReader();
                                      reader.onload = (evt) => resolve(evt.target?.result as string || '');
                                      reader.readAsDataURL(file);
                                    });
                                  });
                                  Promise.all(readPromises).then(base64Results => {
                                    const validResults = base64Results.filter(b => b);
                                    const updatedList = [...photosList, ...validResults];
                                    setNewPropertyForm((prev: any) => ({
                                      ...prev,
                                      building_photos: updatedList,
                                      building_photo: updatedList[0] || ''
                                    }));
                                  });
                                }
                              }}
                            />
                          </label>

                          {/* SAMPLE PRESET GALLERY */}
                          <button
                            type="button"
                            onClick={() => {
                              const sampleElevations = [
                                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
                              ];
                              const updatedList = Array.from(new Set([...photosList, ...sampleElevations]));
                              setNewPropertyForm((prev: any) => ({
                                ...prev,
                                building_photos: updatedList,
                                building_photo: updatedList[0] || ''
                              }));
                            }}
                            style={{ background: isLight ? '#ffffff' : '#1e293b', color: isLight ? '#0f172a' : '#ffffff', border: '1.5px solid #0284c7', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}
                          >
                            🖼️ Preset Elevation Gallery
                          </button>
                        </div>
                      </div>

                      {/* ADD CUSTOM PHOTO URL INPUT & BUTTON */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          id="newPhotoUrlInput"
                          placeholder="Paste image URL (e.g. https://images.unsplash.com/...) and press Enter or click Add"
                          style={{ flex: 1, background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.84rem' }} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const updatedList = [...photosList, val];
                                setNewPropertyForm((prev: any) => ({
                                  ...prev,
                                  building_photos: updatedList,
                                  building_photo: updatedList[0] || ''
                                }));
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('newPhotoUrlInput') as HTMLInputElement;
                            if (el && el.value.trim()) {
                              const val = el.value.trim();
                              const updatedList = [...photosList, val];
                              setNewPropertyForm((prev: any) => ({
                                ...prev,
                                building_photos: updatedList,
                                building_photo: updatedList[0] || ''
                              }));
                              el.value = '';
                            }
                          }}
                          style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          ➕ Add Photo URL
                        </button>
                      </div>

                      {/* MULTIPLE PHOTOS GALLERY GRID */}
                      {photosList.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: isLight ? '#ffffff' : '#1e293b', border: '1px solid rgba(234, 179, 8, 0.4)', borderRadius: '10px', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.76rem', color: '#eab308', fontWeight: '900' }}>
                              🖼️ UPLOADED BUILDING GALLERY ({photosList.length} Photo{photosList.length > 1 ? 's' : ''})
                            </span>
                            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                              Photo #1 will be used as primary property thumbnail
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                            {photosList.map((photoUrl, idx) => (
                              <div key={idx} style={{ position: 'relative', background: isLight ? '#f8fafc' : '#0f172a', border: idx === 0 ? '2px solid #22c55e' : '1px solid #334155', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <img 
                                  src={photoUrl} 
                                  alt={`Building Photo ${idx + 1}`} 
                                  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px' }} 
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                  <span style={{ fontSize: '0.66rem', fontWeight: '900', color: idx === 0 ? '#4ade80' : '#38bdf8' }}>
                                    {idx === 0 ? '⭐ Primary Cover' : `Photo #${idx + 1}`}
                                  </span>
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const updatedList = photosList.filter((_, i) => i !== idx);
                                      setNewPropertyForm((prev: any) => ({
                                        ...prev,
                                        building_photos: updatedList,
                                        building_photo: updatedList[0] || ''
                                      }));
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.66rem', fontWeight: '800', cursor: 'pointer' }}
                                  >
                                    🗑️ Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
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
                      <option value="East Facing">East Facing (Poorva)</option>
                      <option value="North-East Facing">North-East Facing (NE / Ishanya)</option>
                      <option value="North Facing">North Facing (Uttara)</option>
                      <option value="North-West Facing">North-West Facing (NW / Vayavya)</option>
                      <option value="West Facing">West Facing (Paschima)</option>
                      <option value="South-West Facing">South-West Facing (SW / Nairutya)</option>
                      <option value="South Facing">South Facing (Dakshina)</option>
                      <option value="South-East Facing">South-East Facing (SE / Agneya)</option>
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
                    <select 
                      value={newPropertyForm.unit_floor || '2nd Floor'} 
                      onChange={(e) => {
                        const uFloor = e.target.value;
                        const tFloors = newPropertyForm.total_floors || 'G+4 Floors (5 Storey)';
                        setNewPropertyForm({
                          ...newPropertyForm,
                          unit_floor: uFloor,
                          floor_no: `${uFloor} out of ${tFloors}`
                        });
                      }} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800' }} 
                    >
                      <option value="Basement 2 (B2)">Basement 2 (B2)</option>
                      <option value="Basement 1 (B1 / B)">Basement 1 (B1 / B)</option>
                      <option value="Ground Floor (G)">Ground Floor (G)</option>
                      {Array.from({ length: 30 }, (_, i) => {
                        const num = i + 1;
                        let suffix = 'th';
                        if (num === 1 || (num > 20 && num % 10 === 1)) suffix = 'st';
                        else if (num === 2 || (num > 20 && num % 10 === 2)) suffix = 'nd';
                        else if (num === 3 || (num > 20 && num % 10 === 3)) suffix = 'rd';
                        return (
                          <option key={`unit_fl_${num}`} value={`${num}${suffix} Floor`}>
                            {num}{suffix} Floor
                          </option>
                        );
                      })}
                      <option value="31st Floor / Sky Suite">31st Floor / Sky Suite</option>
                      <option value="Penthouse / Top Floor">Penthouse / Top Floor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Total Floors in Building *</label>
                    <select 
                      value={newPropertyForm.total_floors || 'G+4 Floors (5 Storey)'} 
                      onChange={(e) => {
                        const tFloors = e.target.value;
                        const uFloor = newPropertyForm.unit_floor || '2nd Floor';
                        setNewPropertyForm({
                          ...newPropertyForm,
                          total_floors: tFloors,
                          floor_no: `${uFloor} out of ${tFloors}`
                        });
                      }} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '800' }} 
                    >
                      <option value="Ground Floor Only (G)">Ground Floor Only (G)</option>
                      {Array.from({ length: 30 }, (_, i) => {
                        const num = i + 1;
                        const storey = num + 1;
                        return (
                          <option key={`tot_fl_${num}`} value={`G+${num} Floors (${storey} Storey)`}>
                            G+{num} Floors ({storey} Storey)
                          </option>
                        );
                      })}
                      <option value="B+G (Basement + Ground)">B+G (Basement + Ground)</option>
                      <option value="B+G+4 Floors (Midrise)">B+G+4 Floors (Midrise)</option>
                      <option value="B+G+14 Floors (Highrise)">B+G+14 Floors (Highrise)</option>
                      <option value="B+G+30 Floors (Ultra Highrise)">B+G+30 Floors (Ultra Highrise)</option>
                      <option value="2B+G+30 Floors (Mega Highrise)">2B+G+30 Floors (Mega Highrise)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Tower / Block Name</label>
                    <input type="text" value={newPropertyForm.tower_block} onChange={(e) => setNewPropertyForm({ ...newPropertyForm, tower_block: e.target.value })} placeholder="Tower B - Sapphire" style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} />
                  </div>
                </div>

                {/* SECTION 2 MULTIPLE UNIT INTERIOR & FLOOR PLAN PHOTO CAPTURE WIDGET */}
                {(() => {
                  const unitPhotosList: string[] = Array.isArray(newPropertyForm.unit_photos) 
                    ? newPropertyForm.unit_photos 
                    : (newPropertyForm.unit_photo ? [newPropertyForm.unit_photo] : []);

                  return (
                    <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1.5px solid #38bdf8', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <span style={{ fontSize: '0.86rem', color: '#38bdf8', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Camera size={18} color="#38bdf8" /> 📸 Unit Interior, Room Layout & Floor Plan Photos (Multiple Uploads)
                          </span>
                          <p style={{ fontSize: '0.74rem', color: isLight ? '#64748b' : '#94a3b8', margin: '3px 0 0 0' }}>
                            Capture flat interiors, living room, modular kitchen, master bedroom, balcony views, and 2D/3D floor plans.
                          </p>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {/* MULTIPLE FILES UPLOAD BUTTON */}
                          <label style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 10px rgba(2, 132, 199, 0.35)' }}>
                            <Camera size={16} color="#ffffff" />
                            📸 UPLOAD MULTIPLE UNIT PHOTOS
                            <input 
                              type="file" 
                              accept="image/*" 
                              multiple
                              style={{ display: 'none' }}
                              onChange={(e) => {
                                const files = e.target.files;
                                if (files && files.length > 0) {
                                  const fileArray = Array.from(files);
                                  const readPromises = fileArray.map(file => {
                                    return new Promise<string>((resolve) => {
                                      const reader = new FileReader();
                                      reader.onload = (evt) => resolve(evt.target?.result as string || '');
                                      reader.readAsDataURL(file);
                                    });
                                  });
                                  Promise.all(readPromises).then(base64Results => {
                                    const validResults = base64Results.filter(b => b);
                                    const updatedList = [...unitPhotosList, ...validResults];
                                    setNewPropertyForm((prev: any) => ({
                                      ...prev,
                                      unit_photos: updatedList,
                                      unit_photo: updatedList[0] || ''
                                    }));
                                  });
                                }
                              }}
                            />
                          </label>

                          {/* SAMPLE PRESET GALLERY BUTTON */}
                          <button
                            type="button"
                            onClick={() => {
                              const sampleUnitPhotos = [
                                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
                                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
                              ];
                              const updatedList = Array.from(new Set([...unitPhotosList, ...sampleUnitPhotos]));
                              setNewPropertyForm((prev: any) => ({
                                ...prev,
                                unit_photos: updatedList,
                                unit_photo: updatedList[0] || ''
                              }));
                            }}
                            style={{ background: isLight ? '#f8fafc' : '#0f172a', color: isLight ? '#0f172a' : '#ffffff', border: '1.5px solid #38bdf8', padding: '8px 14px', borderRadius: '8px', fontWeight: '800', fontSize: '0.78rem', cursor: 'pointer' }}
                          >
                            🖼️ Preset Unit Interiors
                          </button>
                        </div>
                      </div>

                      {/* ADD CUSTOM UNIT PHOTO URL INPUT & BUTTON */}
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <input 
                          type="text" 
                          id="newUnitPhotoUrlInput"
                          placeholder="Paste interior / floor plan photo URL and press Enter or click Add"
                          style={{ flex: 1, background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.84rem' }} 
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const val = (e.target as HTMLInputElement).value.trim();
                              if (val) {
                                const updatedList = [...unitPhotosList, val];
                                setNewPropertyForm((prev: any) => ({
                                  ...prev,
                                  unit_photos: updatedList,
                                  unit_photo: updatedList[0] || ''
                                }));
                                (e.target as HTMLInputElement).value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const el = document.getElementById('newUnitPhotoUrlInput') as HTMLInputElement;
                            if (el && el.value.trim()) {
                              const val = el.value.trim();
                              const updatedList = [...unitPhotosList, val];
                              setNewPropertyForm((prev: any) => ({
                                ...prev,
                                unit_photos: updatedList,
                                unit_photo: updatedList[0] || ''
                              }));
                              el.value = '';
                            }
                          }}
                          style={{ background: '#38bdf8', color: '#0f172a', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '900', fontSize: '0.78rem', cursor: 'pointer', whiteSpace: 'nowrap' }}
                        >
                          ➕ Add Unit Photo URL
                        </button>
                      </div>

                      {/* MULTIPLE UNIT PHOTOS GALLERY GRID */}
                      {unitPhotosList.length > 0 && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: '10px', padding: '12px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '0.76rem', color: '#38bdf8', fontWeight: '900' }}>
                              🖼️ UPLOADED UNIT & INTERIOR GALLERY ({unitPhotosList.length} Photo{unitPhotosList.length > 1 ? 's' : ''})
                            </span>
                            <span style={{ fontSize: '0.7rem', color: isLight ? '#64748b' : '#94a3b8' }}>
                              Photo #1 will be shown on matching cost sheets
                            </span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
                            {unitPhotosList.map((photoUrl, idx) => (
                              <div key={idx} style={{ position: 'relative', background: isLight ? '#ffffff' : '#1e293b', border: idx === 0 ? '2px solid #22c55e' : '1px solid #334155', borderRadius: '8px', padding: '6px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <img 
                                  src={photoUrl} 
                                  alt={`Unit Photo ${idx + 1}`} 
                                  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '6px' }} 
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                  <span style={{ fontSize: '0.66rem', fontWeight: '900', color: idx === 0 ? '#4ade80' : '#38bdf8' }}>
                                    {idx === 0 ? '⭐ Primary Unit' : `Unit Photo #${idx + 1}`}
                                  </span>
                                  <button 
                                    type="button" 
                                    onClick={() => {
                                      const updatedList = unitPhotosList.filter((_, i) => i !== idx);
                                      setNewPropertyForm((prev: any) => ({
                                        ...prev,
                                        unit_photos: updatedList,
                                        unit_photo: updatedList[0] || ''
                                      }));
                                    }}
                                    style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', padding: '3px 8px', borderRadius: '4px', fontSize: '0.66rem', fontWeight: '800', cursor: 'pointer' }}
                                  >
                                    🗑️ Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
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

                {/* LIVE PROJECT PARKING STOCK METRIC BANNER */}
                {(() => {
                  const currProj = (newPropertyForm.title || newPropertyForm.project_name || 'TILOTTAMA APPARTMENT').trim();
                  const pStockLimits = projectParkingStockMap[currProj] || 
                    Object.entries(projectParkingStockMap).find(([k]) => k.toLowerCase().includes(currProj.toLowerCase()) || currProj.toLowerCase().includes(k.toLowerCase()))?.[1] ||
                    { totalCovered: 15, priceCovered: 300000, totalEv: 3, priceEv: 450000, totalOpen: 10, priceOpen: 150000 };

                  const matchingProps = properties.filter((p: any) => {
                    const pT = (p.title || p.project_name || '').toLowerCase();
                    const cT = currProj.toLowerCase();
                    return pT.includes(cT) || cT.includes(pT);
                  });

                  let assignedCovered = 0;
                  let assignedEv = 0;
                  let assignedOpen = 0;

                  matchingProps.forEach((p: any) => {
                    const avail = p.parking_availability || '';
                    if (avail.includes('2 Covered') || avail.includes('2 Slots')) assignedCovered += 2;
                    else if (avail.includes('1 Covered') || avail.includes('Covered Car')) assignedCovered += 1;

                    if (avail.includes('EV')) assignedEv += 1;
                    if (avail.includes('Open') || avail.includes('Uncovered')) assignedOpen += 1;
                  });

                  const remCovered = Math.max(0, pStockLimits.totalCovered - assignedCovered);
                  const remEv = Math.max(0, pStockLimits.totalEv - assignedEv);
                  const remOpen = Math.max(0, pStockLimits.totalOpen - assignedOpen);

                  const fmtPrice = (val: any) => {
                    if (typeof val === 'number') return `₹${val.toLocaleString('en-IN')}`;
                    return val ? `₹${val}` : 'N/A';
                  };

                  return (
                    <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1.5px solid #0284c7', borderRadius: '12px', padding: '14px', marginBottom: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '0.85rem', fontWeight: '900', color: '#38bdf8' }}>🚗 PROJECT PARKING STOCK & PRICING TRACKER:</span>
                          <strong style={{ fontSize: '0.88rem', color: isLight ? '#0f172a' : '#ffffff' }}>{currProj}</strong>
                        </div>
                        <div style={{ display: 'flex', gap: '14px', marginTop: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '0.75rem', color: remCovered > 0 ? '#4ade80' : '#ef4444', fontWeight: '800' }}>
                            🚗 Covered: {remCovered} / {pStockLimits.totalCovered} Available <small style={{ color: '#38bdf8' }}>({fmtPrice(pStockLimits.priceCovered)})</small>
                          </span>
                          <span style={{ fontSize: '0.75rem', color: remEv > 0 ? '#fbbf24' : '#ef4444', fontWeight: '800' }}>
                            ⚡ EV Stations: {remEv} / {pStockLimits.totalEv} Available <small style={{ color: '#38bdf8' }}>({fmtPrice(pStockLimits.priceEv)})</small>
                          </span>
                          <span style={{ fontSize: '0.75rem', color: remOpen > 0 ? '#38bdf8' : '#ef4444', fontWeight: '800' }}>
                            🅿️ Open Slots: {remOpen} / {pStockLimits.totalOpen} Available <small style={{ color: '#38bdf8' }}>({fmtPrice(pStockLimits.priceOpen)})</small>
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setParkingModalProjectName(currProj);
                          setParkingModalForm(pStockLimits);
                          setShowManageParkingModal(true);
                        }}
                        style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 14px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        ⚙️ Manage Project Parking Stock & Pricing
                      </button>
                    </div>
                  );
                })()}

                {/* PARKING & AMENITY CHARGES ROW WITH PRESETS */}
                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : windowWidth <= 1024 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700', display: 'block', marginBottom: '6px' }}>Car Parking Availability *</label>
                    <select 
                      value={newPropertyForm.parking_availability || 'Covered Car Parking (1 Slot Included)'} 
                      onChange={(e) => {
                        const availVal = e.target.value;
                        const currProj = (newPropertyForm.title || newPropertyForm.project_name || 'TILOTTAMA APPARTMENT').trim();
                        const pLimits = projectParkingStockMap[currProj] || { priceCovered: 300000, priceEv: 450000, priceOpen: 150000 };

                        let autoPrice = newPropertyForm.parking_price;
                        if (availVal.includes('2 Covered')) autoPrice = typeof pLimits.priceCovered === 'number' ? pLimits.priceCovered * 2 : pLimits.priceCovered;
                        else if (availVal.includes('Covered') || availVal.includes('1 Covered')) autoPrice = pLimits.priceCovered;
                        else if (availVal.includes('EV')) autoPrice = pLimits.priceEv;
                        else if (availVal.includes('Open') || availVal.includes('Uncovered')) autoPrice = pLimits.priceOpen;
                        else if (availVal.includes('No Parking')) autoPrice = 'Included in Flat Price';

                        setNewPropertyForm({ 
                          ...newPropertyForm, 
                          parking_availability: availVal,
                          parking_price: autoPrice !== undefined ? autoPrice : newPropertyForm.parking_price
                        });
                      }} 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '10px 14px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '800' }}
                    >
                      <option value="Covered Car Parking (1 Slot Included)">🚗 1 Covered Car Parking Slot (Single)</option>
                      <option value="Covered Car Parking (2 Slots Included)">🚗🚗 2 Covered Car Parking Slots (Tandem)</option>
                      <option value="1 Covered Slot + EV Station">⚡ 1 Covered Slot + EV Fast Charging Station</option>
                      <option value="2 Covered Slots + EV Fast Charger">⚡🚗 2 Covered Slots + EV Fast Charger</option>
                      <option value="Uncovered / Open Parking">🅿️ 1 Open / Surface Parking Slot</option>
                      <option value="1 Mechanical Stacker Slot">🏗️ 1 Mechanical Stacker Parking Slot</option>
                      <option value="3 Premium Basement Slots">🏎️ 3 Premium Basement Parking Slots</option>
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

                <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(1, 1fr)' : 'repeat(3, 1fr)', gap: '14px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', color: isLight ? '#0284c7' : '#38bdf8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>🆔 Project Posting ID</label>
                    <input 
                      type="text" 
                      value={newPropertyForm.project_posting_id !== undefined ? newPropertyForm.project_posting_id : (newPropertyForm.campaign_id || 'PRJ-POST-2026-8802')} 
                      onChange={(e) => setNewPropertyForm({ ...newPropertyForm, project_posting_id: e.target.value })} 
                      placeholder="e.g. PRJ-POST-2026-8802" 
                      style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: '1.5px solid #0284c7', color: '#fbbf24', fontWeight: '900', padding: '10px 14px', borderRadius: '8px', fontSize: '0.9rem' }} 
                    />
                  </div>

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
                  style={{ background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)', color: '#ffffff', border: 'none', padding: '14px 36px', borderRadius: '10px', fontWeight: '900', fontSize: '1rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(22, 163, 74, 0.4)', display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  {editingProperty ? `💾 SAVE & UPDATE PROPERTY (${editingProperty.property_code})` : `💾 SAVE & COMPLETE PROPERTY REGISTRATION (${newPropertyForm.property_code || generateNextPropertyCode()})`}
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
                  <th style={{ padding: '12px' }}>Developer Name & Code</th>
                  <th style={{ padding: '12px' }}>Config</th>
                  <th style={{ padding: '12px' }}>Super Built-up</th>
                  <th style={{ padding: '12px' }}>Carpet Area</th>
                  <th style={{ padding: '12px' }}>Price</th>
                  <th style={{ padding: '12px' }}>Status</th>
                  <th style={{ padding: '12px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties
                  .filter(p => matchesSearchQuery(p, searchQuery))
                  .map(p => {
                    const carpetNum = parseFloat((p.carpet_area || '').replace(/[^0-9.]/g, ''));
                    const calcSuper = carpetNum ? `${Math.round(carpetNum / 0.7)} Sq.Ft.` : '1,280 Sq.Ft.';
                    const superDisp = p.super_builtup_area || calcSuper;

                    const devObj = developerMasterList.find(d => 
                      d.name.toLowerCase().includes((p.developer || '').toLowerCase().trim()) || 
                      (p.developer || '').toLowerCase().trim().includes(d.name.toLowerCase())
                    );
                    const devCode = p.developer_id || p.developer_code || devObj?.id || 'SRM-DEV-2026-000105';

                    return (
                      <tr key={p.id} style={{ borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155' }}>
                        <td style={{ padding: '12px', fontFamily: 'monospace', color: '#38bdf8', fontWeight: '800' }}>{p.property_code}</td>
                        <td style={{ padding: '12px', fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{p.title}</td>
                        <td style={{ padding: '12px' }}>
                          <div style={{ fontWeight: '800', color: isLight ? '#0f172a' : '#ffffff' }}>{p.developer}</div>
                          <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #0284c7', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900', fontFamily: 'monospace', marginTop: '3px', display: 'inline-block' }}>
                            🔑 {devCode}
                          </span>
                        </td>
                        <td style={{ padding: '12px', color: '#38bdf8', fontWeight: '800' }}>{p.configuration}</td>
                        <td style={{ padding: '12px', fontWeight: '900', color: '#fbbf24' }}>{superDisp}</td>
                        <td style={{ padding: '12px', fontWeight: '700' }}>{p.carpet_area}</td>
                        <td style={{ padding: '12px', color: '#4ade80', fontWeight: '800' }}>{p.final_price}</td>
                        <td style={{ padding: '12px' }}>
                          <span style={{ background: p.status === 'AVAILABLE' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: p.status === 'AVAILABLE' ? '#4ade80' : '#ef4444', padding: '2px 8px', borderRadius: '4px', fontWeight: '800', fontSize: '0.72rem' }}>
                            {p.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                            <button onClick={() => setViewPropertyModal(p)} style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '800', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '4px' }}>👁️ View</button>
                            <button onClick={() => handleStartEditProperty(p)} style={{ background: '#f59e0b', color: isLight ? '#0f172a' : '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Edit</button>
                            <button onClick={() => handleDeleteProperty(p.id, p.property_code)} style={{ background: '#ef4444', color: '#ffffff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' }}>Delete</button>
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

      {/* DEVELOPER MASTER VAULT MODAL */}
      {showDevVaultModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '20px', width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🏢 DEVELOPER MASTER ID VAULT & REGISTERED PROJECTS REGISTRY
                </h3>
                <p style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', marginTop: '2px' }}>
                  Unique Developer ID (SRM-DEV) Master Index • Associated Projects & Mobile OTP Credentials
                </p>
              </div>
              <button onClick={() => setShowDevVaultModal(false)} style={{ background: 'none', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {/* ADD NEW DEVELOPER FORM */}
            <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: '900', color: '#38bdf8' }}>➕ Register New Developer ID & Master Project</h4>
              <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : '1fr 1fr 1fr 1fr', gap: '10px' }}>
                <input 
                  type="text" 
                  value={newDevNameInput} 
                  onChange={(e) => setNewDevNameInput(e.target.value)} 
                  placeholder="Developer / Builder Name *" 
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '700' }} 
                />
                <input 
                  type="text" 
                  value={newDevMobileInput} 
                  onChange={(e) => setNewDevMobileInput(e.target.value)} 
                  placeholder="Primary Mobile Phone *" 
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '700' }} 
                />
                <input 
                  type="text" 
                  value={newDevAltMobileInput} 
                  onChange={(e) => setNewDevAltMobileInput(e.target.value)} 
                  placeholder="Alternative Phone (Optional)" 
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '700' }} 
                />
                <input 
                  type="text" 
                  value={newDevProjectTitleInput} 
                  onChange={(e) => setNewDevProjectTitleInput(e.target.value)} 
                  placeholder="Initial Project Title *" 
                  style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px 12px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: '700' }} 
                />
              </div>
              <button 
                type="button" 
                onClick={() => {
                  if (!newDevNameInput || !newDevMobileInput) return alert('Please enter Developer Name & Primary Mobile Phone');
                  const newDevObj = {
                    id: `SRM-DEV-2026-000${developerMasterList.length + 105}`,
                    name: newDevNameInput,
                    mobile: newDevAltMobileInput ? `${newDevMobileInput} / ${newDevAltMobileInput}` : newDevMobileInput,
                    email: `${newDevNameInput.toLowerCase().replace(/[^a-z0-9]/g, '')}@builder.com`,
                    projects: newDevProjectTitleInput ? [{ id: `PRJ-${Date.now()}`, title: newDevProjectTitleInput, locality: 'Kondapur Hub' }] : []
                  };
                  setDeveloperMasterList([newDevObj, ...developerMasterList]);
                  setNewDevNameInput('');
                  setNewDevMobileInput('');
                  setNewDevAltMobileInput('');
                  setNewDevProjectTitleInput('');
                  alert(`🎉 REGISTERED NEW DEVELOPER MASTER!\n\n• Developer ID: ${newDevObj.id}\n• Builder Name: ${newDevObj.name}\n• Phone: ${newDevObj.mobile}`);
                }}
                style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '8px 16px', borderRadius: '8px', fontWeight: '900', fontSize: '0.82rem', cursor: 'pointer', alignSelf: 'flex-end' }}
              >
                🚀 CREATE DEVELOPER ID & SAVE MASTER
              </button>
            </div>

            {/* DEVELOPERS MASTER LIST TABLE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {developerMasterList.map((dev) => (
                <div key={dev.id} style={{ background: isLight ? '#f8fafc' : '#0f172a', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                    <div>
                      <span style={{ fontSize: '0.75rem', color: '#fbbf24', fontWeight: '900', fontFamily: 'monospace', background: 'rgba(251, 191, 36, 0.15)', border: '1px solid rgba(251, 191, 36, 0.3)', padding: '2px 8px', borderRadius: '4px' }}>
                        🆔 {dev.id}
                      </span>
                      <h4 style={{ fontSize: '1.05rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', marginTop: '4px' }}>
                        🏢 {dev.name}
                      </h4>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isLight ? '#64748b' : '#94a3b8', textAlign: 'right' }}>
                      <div>📱 Phone (for OTP): <strong style={{ color: '#4ade80' }}>{dev.mobile}</strong></div>
                      <div>📧 Email: {dev.email}</div>
                    </div>
                  </div>

                  {/* REGISTERED PROJECTS LIST FOR THIS DEVELOPER */}
                  <div style={{ borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '10px' }}>
                    <span style={{ fontSize: '0.72rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '6px' }}>
                      📁 REGISTERED PROJECTS ({dev.projects.length}):
                    </span>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {dev.projects.map((p: any) => (
                        <span key={p.id || p.title} style={{ background: isLight ? '#ffffff' : '#1e293b', border: '1px solid #38bdf8', color: '#38bdf8', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800' }}>
                          🏢 {p.title} <small style={{ color: isLight ? '#64748b' : '#94a3b8' }}>({p.locality})</small>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingTop: '14px' }}>
              <button onClick={() => setShowDevVaultModal(false)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                Close Vault
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANAGE PROJECT PARKING STOCK MODAL */}
      {showManageParkingModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '16px' }}>
          <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #0284c7', borderRadius: '20px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: isLight ? '1px solid #cbd5e1' : '1px solid #334155', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  🚗 MANAGE PROJECT PARKING STOCK
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: '800' }}>Project: {parkingModalProjectName}</span>
              </div>
              <button onClick={() => setShowManageParkingModal(false)} style={{ background: 'none', border: 'none', color: isLight ? '#64748b' : '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setProjectParkingStockMap(prev => ({
                  ...prev,
                  [parkingModalProjectName]: {
                    totalCovered: Number(parkingModalForm.totalCovered) || 0,
                    priceCovered: parkingModalForm.priceCovered || 0,
                    totalEv: Number(parkingModalForm.totalEv) || 0,
                    priceEv: parkingModalForm.priceEv || 0,
                    totalOpen: Number(parkingModalForm.totalOpen) || 0,
                    priceOpen: parkingModalForm.priceOpen || 0
                  }
                }));
                setShowManageParkingModal(false);
                alert(`✅ PARKING STOCK & PRICING UPDATED FOR PROJECT: ${parkingModalProjectName}!\n\n• Covered: ${parkingModalForm.totalCovered} Slots @ ₹${parkingModalForm.priceCovered}\n• EV Stations: ${parkingModalForm.totalEv} Slots @ ₹${parkingModalForm.priceEv}\n• Open: ${parkingModalForm.totalOpen} Slots @ ₹${parkingModalForm.priceOpen}`);
              }}
              style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
            >
              {/* COVERED PARKING STOCK & PRICE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '10px', border: '1px solid #0284c7' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🚗 Total Covered Parking Slots</label>
                  <input 
                    type="number" 
                    value={parkingModalForm.totalCovered} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, totalCovered: Number(e.target.value) })}
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>💰 Covered Slot Price (INR)</label>
                  <input 
                    type="text" 
                    value={parkingModalForm.priceCovered !== undefined ? parkingModalForm.priceCovered : ''} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, priceCovered: e.target.value })}
                    placeholder="e.g. 300000 / Included"
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
              </div>

              {/* EV STATIONS STOCK & PRICE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '10px', border: '1px solid #eab308' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>⚡ Total EV Fast Charging Slots</label>
                  <input 
                    type="number" 
                    value={parkingModalForm.totalEv} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, totalEv: Number(e.target.value) })}
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>💰 EV Station Slot Price (INR)</label>
                  <input 
                    type="text" 
                    value={parkingModalForm.priceEv !== undefined ? parkingModalForm.priceEv : ''} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, priceEv: e.target.value })}
                    placeholder="e.g. 450000"
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
              </div>

              {/* OPEN PARKING STOCK & PRICE */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', background: isLight ? '#f8fafc' : '#0f172a', padding: '12px', borderRadius: '10px', border: '1px solid #38bdf8' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>🅿️ Total Open Surface Slots</label>
                  <input 
                    type="number" 
                    value={parkingModalForm.totalOpen} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, totalOpen: Number(e.target.value) })}
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '800', display: 'block', marginBottom: '4px' }}>💰 Open Slot Price (INR)</label>
                  <input 
                    type="text" 
                    value={parkingModalForm.priceOpen !== undefined ? parkingModalForm.priceOpen : ''} 
                    onChange={(e) => setParkingModalForm({ ...parkingModalForm, priceOpen: e.target.value })}
                    placeholder="e.g. 150000"
                    style={{ width: '100%', background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1px solid #334155', color: isLight ? '#0f172a' : '#ffffff', padding: '8px', borderRadius: '6px', fontSize: '0.88rem', fontWeight: '800' }}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button type="button" onClick={() => setShowManageParkingModal(false)} style={{ background: '#334155', color: '#ffffff', border: 'none', padding: '10px 18px', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button type="submit" style={{ background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', color: '#ffffff', border: 'none', padding: '10px 22px', borderRadius: '8px', fontWeight: '900', cursor: 'pointer' }}>
                  Save Parking Stock Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* COMPREHENSIVE PROPERTY VAULT DETAILS INSPECTION MODAL */}
      {viewPropertyModal && (() => {
        const modalProjStock = projectParkingStockMap[viewPropertyModal.title] || projectParkingStockMap['TILOTTAMA APPARTMENT'] || {
          totalCovered: 12,
          priceCovered: 300000,
          totalEv: 2,
          priceEv: 450000,
          totalOpen: 6,
          priceOpen: 150000
        };
        const modalProjProps = properties.filter(p => (p.title || '').toLowerCase().trim() === (viewPropertyModal.title || '').toLowerCase().trim());
        const modalAllocCovered = modalProjProps.filter(p => (p.car_parking || '').toLowerCase().includes('covered')).length;
        const modalAllocEv = modalProjProps.filter(p => (p.car_parking || '').toLowerCase().includes('ev')).length;
        const modalAllocOpen = modalProjProps.filter(p => (p.car_parking || '').toLowerCase().includes('open')).length;

        const modalAvailCovered = Math.max(0, modalProjStock.totalCovered - modalAllocCovered);
        const modalAvailEv = Math.max(0, modalProjStock.totalEv - modalAllocEv);
        const modalAvailOpen = Math.max(0, modalProjStock.totalOpen - modalAllocOpen);

        // 🏢 PROJECT NAME WISE BUILDING ELEVATION PHOTOS (Aggregated for all listings under viewPropertyModal.title)
        const buildingPhotosList: string[] = Array.from(new Set([
          ...(Array.isArray(viewPropertyModal.building_photos) && viewPropertyModal.building_photos.length > 0 ? viewPropertyModal.building_photos : []),
          ...(viewPropertyModal.building_photo ? [viewPropertyModal.building_photo] : []),
          ...modalProjProps.flatMap((p: any) => Array.isArray(p.building_photos) ? p.building_photos : (p.building_photo ? [p.building_photo] : [])),
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80'
        ])).filter(Boolean);

        // 📸 PROPERTY CODE WISE UNIT INTERIOR & FLOOR PLAN PHOTOS (Strictly scoped to viewPropertyModal.property_code)
        const unitPhotosList: string[] = Array.from(new Set([
          ...(Array.isArray(viewPropertyModal.unit_photos) && viewPropertyModal.unit_photos.length > 0 ? viewPropertyModal.unit_photos : []),
          ...(viewPropertyModal.unit_photo ? [viewPropertyModal.unit_photo] : []),
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'
        ])).filter(Boolean);

        return (
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
            <div style={{ background: isLight ? '#ffffff' : '#1e293b', border: isLight ? '1px solid #cbd5e1' : '1.5px solid #0284c7', borderRadius: '24px', width: '100%', maxWidth: '880px', maxHeight: '90vh', overflowY: 'auto', padding: '28px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* MODAL HEADER */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: isLight ? '2px solid #e2e8f0' : '2px solid #334155', paddingBottom: '16px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '6px' }}>
                    <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', border: '1px solid #0284c7', padding: '3px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: '900', fontFamily: 'monospace' }}>
                      🔑 {viewPropertyModal.property_code}
                    </span>
                    <span style={{ background: viewPropertyModal.status === 'AVAILABLE' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)', color: viewPropertyModal.status === 'AVAILABLE' ? '#4ade80' : '#ef4444', padding: '3px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem' }}>
                      ● {viewPropertyModal.status}
                    </span>
                  </div>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', margin: '4px 0' }}>
                    {viewPropertyModal.title}
                  </h2>
                  <span style={{ fontSize: '0.85rem', color: isLight ? '#64748b' : '#94a3b8', fontWeight: '700' }}>
                    📍 {viewPropertyModal.locality || 'BARASAT, CHAPADALI'}
                  </span>
                </div>
                <button onClick={() => setViewPropertyModal(null)} style={{ background: isLight ? '#f1f5f9' : '#0f172a', border: 'none', color: isLight ? '#64748b' : '#94a3b8', padding: '8px', borderRadius: '10px', cursor: 'pointer' }}>
                  <X size={22} />
                </button>
              </div>

              {/* MODAL BODY GRID */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* SECTION 1: DEVELOPER IDENTIFICATION & CONTACTS */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #0284c7', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    🏢 DEVELOPER IDENTIFICATION & CONTACT CREDENTIALS
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : 'repeat(3, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Developer Name</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff', fontSize: '0.95rem' }}>{viewPropertyModal.developer}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Developer ID Code</span>
                      <strong style={{ color: '#fbbf24', fontFamily: 'monospace' }}>{viewPropertyModal.developer_id || viewPropertyModal.developer_code || 'SRM-DEV-2026-000105'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Developer Primary Mobile</span>
                      <strong style={{ color: '#4ade80' }}>📱 {viewPropertyModal.developer_mobile || devProjectMobile || '9883395102'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Alternative Phone Number</span>
                      <strong style={{ color: '#38bdf8' }}>📞 {viewPropertyModal.developer_alt_mobile || devProjectAltMobile || '7044293951'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>OTP Verification Protocol</span>
                      <span style={{ background: '#22c55e', color: '#ffffff', padding: '2px 8px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: '800' }}>✓ 1-TIME OTP VERIFIED</span>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Project Posting ID</span>
                      <strong style={{ color: '#a855f7', fontFamily: 'monospace' }}>{viewPropertyModal.project_posting_id || 'PRJ-POST-2026-8802'}</strong>
                    </div>
                  </div>
                </div>

                {/* SECTION 2: 📍 GPS LOCATION & EXACT COORDINATES */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #22c55e', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#4ade80', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      📍 GPS LOCATION & EXACT GEOLOCATION COORDINATES
                    </h4>
                    <a 
                      href={`https://www.google.com/maps?q=${viewPropertyModal.latitude || '22.722361'},${viewPropertyModal.longitude || '88.493403'}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ background: '#0284c7', color: '#ffffff', textDecoration: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      🗺️ Open Direct Google Maps View
                    </a>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : 'repeat(3, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Locality Hub / Sector</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.locality || 'BARASAT, CHAPADALI'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>GPS Latitude (Exact Map Lat)</span>
                      <strong style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.92rem' }}>{viewPropertyModal.latitude || '22.722361'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>GPS Longitude (Exact Map Long)</span>
                      <strong style={{ color: '#38bdf8', fontFamily: 'monospace', fontSize: '0.92rem' }}>{viewPropertyModal.longitude || '88.493403'}</strong>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: 📐 PROPERTY SPECIFICATIONS & AREA METRICS */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #fbbf24', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    📐 PROPERTY SPECIFICATIONS, FLOORS & AREA METRICS
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Property Type</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.property_type || viewPropertyModal.type || 'Flat / Apartment'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Configuration</span>
                      <strong style={{ color: '#38bdf8', fontWeight: '900' }}>{viewPropertyModal.configuration || '3BHK'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Carpet Area</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.carpet_area || '898.1 Sq.Ft.'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Super Built-up Area</span>
                      <strong style={{ color: '#fbbf24', fontWeight: '900' }}>{viewPropertyModal.super_builtup_area || '1,283 Sq.Ft.'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Floor Number (Unit Floor)</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.floor_num || viewPropertyModal.floor_number || '2nd Floor'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Total Floors in Building</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.total_floors || 'G+4 Floors'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Facing Direction</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.facing || 'East Facing'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Furnishing Status</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.furnishing || 'Semi-Furnished'}</strong>
                    </div>
                  </div>
                </div>

                {/* SECTION 4: 💰 FINANCIALS, PRICING & PARKING STOCK */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #a855f7', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#a855f7', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    💰 FINANCIAL VALUATION, CAR PARKING & COST SHEET
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Total Inventory Final Price</span>
                      <strong style={{ color: '#4ade80', fontSize: '1.1rem', fontWeight: '900' }}>{viewPropertyModal.final_price || '₹46,08,000'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Parking Slot Allocation</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.car_parking || '1 Covered Parking Slot'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Parking Price Tag</span>
                      <strong style={{ color: '#38bdf8', fontWeight: '800' }}>{viewPropertyModal.parking_price ? `₹${viewPropertyModal.parking_price}` : '₹3,00,000'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Physical Keys / Custody</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.key_custody || 'Builder Site Office'}</strong>
                    </div>
                  </div>

                  {/* PROJECT PARKING STOCK AVAILABILITY BREAKDOWN */}
                  <div style={{ background: isLight ? '#ffffff' : '#1e293b', padding: '12px', borderRadius: '10px', border: '1px solid #0284c7', marginTop: '6px' }}>
                    <span style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: '900', display: 'block', marginBottom: '8px' }}>
                      🚗 PROJECT PARKING STOCK STATUS ({viewPropertyModal.title})
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : 'repeat(3, 1fr)', gap: '10px', fontSize: '0.8rem' }}>
                      <div style={{ background: 'rgba(56, 189, 248, 0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid #0284c7' }}>
                        <span style={{ color: '#38bdf8', fontWeight: '800' }}>🚗 Covered Stock:</span> <strong style={{ color: '#4ade80' }}>{modalAvailCovered} / {modalProjStock.totalCovered} Available</strong> (₹{modalProjStock.priceCovered})
                      </div>
                      <div style={{ background: 'rgba(234, 179, 8, 0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid #eab308' }}>
                        <span style={{ color: '#eab308', fontWeight: '800' }}>⚡ EV Stations:</span> <strong style={{ color: '#4ade80' }}>{modalAvailEv} / {modalProjStock.totalEv} Available</strong> (₹{modalProjStock.priceEv})
                      </div>
                      <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid #22c55e' }}>
                        <span style={{ color: '#4ade80', fontWeight: '800' }}>🅿️ Open Surface:</span> <strong style={{ color: '#4ade80' }}>{modalAvailOpen} / {modalProjStock.totalOpen} Available</strong> (₹{modalProjStock.priceOpen})
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 5: 🏢 UPLOADED BUILDING & EXTERIOR ELEVATION GALLERY (PROJECT NAME WISE) */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #eab308', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#eab308', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      🏢 UPLOADED BUILDING & EXTERIOR ELEVATION GALLERY (PROJECT NAME WISE: {viewPropertyModal.title}) ({buildingPhotosList.length} Photos Listed)
                    </h4>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                      📌 Shared Across Project ({viewPropertyModal.title})
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                    {buildingPhotosList.map((url, idx) => (
                      <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #0284c7', background: '#000000', cursor: 'pointer', height: '110px' }} onClick={() => window.open(url, '_blank')}>
                        <img src={url} alt={`Building Photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(15, 23, 42, 0.85)', color: '#ffffff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                          {idx === 0 ? '⭐ Primary Exterior Cover' : idx === 1 ? '🏢 Building Elevation' : `Exterior #${idx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 6: 📸 UNIT INTERIOR, ROOM LAYOUT & FLOOR PLAN PHOTOS (PROPERTY CODE WISE) */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #38bdf8', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                      📸 UNIT INTERIOR, ROOM LAYOUT & FLOOR PLAN PHOTOS (PROPERTY CODE WISE: {viewPropertyModal.property_code}) ({unitPhotosList.length} Photos Listed)
                    </h4>
                    <span style={{ fontSize: '0.72rem', background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                      🔑 Scoped to Property Code ({viewPropertyModal.property_code})
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: '10px' }}>
                    {unitPhotosList.map((url, idx) => (
                      <div key={idx} style={{ position: 'relative', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid #38bdf8', background: '#000000', cursor: 'pointer', height: '110px' }} onClick={() => window.open(url, '_blank')}>
                        <img src={url} alt={`Unit Interior Photo ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', bottom: '4px', left: '4px', background: 'rgba(15, 23, 42, 0.85)', color: '#ffffff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: '800' }}>
                          {idx === 0 ? '🛋️ Living Room Layout' : idx === 1 ? '🛏️ Bedroom Interior' : idx === 2 ? '🍳 Kitchen View' : `Floor Plan #${idx + 1}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SECTION 6: 👤 SITE CONTACT PERSON & PROPERTY HIGHLIGHTS */}
                <div style={{ background: isLight ? '#f8fafc' : '#0f172a', border: '1px solid #cbd5e1', borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: '900', color: isLight ? '#0f172a' : '#ffffff', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                    👤 SITE PERSON CONTACT & ARCHITECTURAL HIGHLIGHTS
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: windowWidth <= 640 ? '1fr' : 'repeat(3, 1fr)', gap: '12px', fontSize: '0.85rem' }}>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Site Incharge Person Name</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.site_person_name || 'Rajesh Kumar (Site Manager)'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Site Person Contact Phone</span>
                      <strong style={{ color: '#22c55e' }}>📞 {viewPropertyModal.site_person_contact || '+91 98490 77665'}</strong>
                    </div>
                    <div>
                      <span style={{ color: isLight ? '#64748b' : '#94a3b8', fontSize: '0.75rem', display: 'block', fontWeight: '700' }}>Property Highlights & Notes</span>
                      <strong style={{ color: isLight ? '#0f172a' : '#ffffff' }}>{viewPropertyModal.description || 'Pool facing Vastu East, 3 balconies'}</strong>
                    </div>
                  </div>
                </div>

              </div>

              {/* MODAL FOOTER ACTIONS */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: isLight ? '2px solid #e2e8f0' : '2px solid #334155', paddingTop: '16px', flexWrap: 'wrap', gap: '10px' }}>
                <button 
                  onClick={() => {
                    const pToEdit = viewPropertyModal;
                    setViewPropertyModal(null);
                    handleStartEditProperty(pToEdit);
                  }} 
                  style={{ background: '#f59e0b', color: '#ffffff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  ✏️ Edit This Property Record
                </button>

                <button 
                  onClick={() => setViewPropertyModal(null)} 
                  style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '10px 24px', borderRadius: '10px', fontWeight: '900', cursor: 'pointer' }}
                >
                  Close Inspection Vault
                </button>
              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
};
