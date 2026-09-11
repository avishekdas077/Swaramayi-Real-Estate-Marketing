import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dbStore, loadData, saveData, generateID, PropertyRecord, CustomerRecord } from '../db/database.js';

// Helper to generate a URL-friendly slug
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

// Helper to check if a property is marked as SOLD / SOLD_OUT in CRM
function isSoldProperty(p: any): boolean {
  const s = String(p.status || p.availability_status || p.property_status || '').toUpperCase();
  return (
    s === 'SOLD' || 
    s === 'SOLD_OUT' || 
    s === 'SOLD OUT' || 
    p.isSold === true || 
    p.is_sold === true
  );
}

function parsePriceString(val: any): number {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return isNaN(val) || val <= 0 ? 0 : val;

  const str = String(val).trim();
  if (!str) return 0;

  if (/lakh/i.test(str)) {
    const cleanStr = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : Math.round(num * 100000);
  }

  if (/cr|crore/i.test(str)) {
    const cleanStr = str.replace(/[^0-9.]/g, '');
    const num = parseFloat(cleanStr);
    return isNaN(num) ? 0 : Math.round(num * 10000000);
  }

  const cleaned = str.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function parseAreaString(val: any): number {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return isNaN(val) || val <= 0 ? 0 : val;
  const str = String(val).trim();
  const cleaned = str.replace(/[^0-9.]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

function extractPropertyImages(p: any, title: string, id: string): string[] {
  const candidates: string[] = [];

  const addCandidate = (val: any) => {
    if (!val) return;
    if (Array.isArray(val)) {
      val.forEach(item => addCandidate(item));
    } else if (typeof val === 'string') {
      const trimmed = val.trim();
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:image/') || trimmed.startsWith('/')) {
        if (!candidates.includes(trimmed)) {
          candidates.push(trimmed);
        }
      }
    }
  };

  addCandidate(p.images);
  addCandidate(p.image);
  addCandidate(p.building_photos);
  addCandidate(p.building_photo);
  addCandidate(p.unit_photos);
  addCandidate(p.photos);
  addCandidate(p.photo);
  addCandidate(p.cover_image);
  addCandidate(p.image_url);
  addCandidate(p.imageUrl);
  addCandidate(p.thumbnail);
  addCandidate(p.picture);
  addCandidate(p.media);

  if (candidates.length > 0) {
    return candidates;
  }

  const defaultImagesSet = [
    [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
    ],
    [
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
    ],
    [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80'
    ],
    [
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
    ]
  ];

  let hash = 0;
  const str = id || title || 'default';
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const setIndex = Math.abs(hash) % defaultImagesSet.length;
  return defaultImagesSet[setIndex];
}

// Normalize Property for Public Website Response
function formatPublicProperty(p: any) {
  const title = p.property_title || p.title || `Property ${p.property_code || p.id}`;
  const slug = p.slug || slugify(`${title}-${p.property_code || p.id}`);

  const rawPrice = 
    parsePriceString(p.final_estimated_price) || 
    parsePriceString(p.final_price) || 
    parsePriceString(p.base_price) || 
    parsePriceString(p.price) || 
    parsePriceString(p.expected_price) || 
    parsePriceString(p.total_price) ||
    parsePriceString(p.amount) ||
    parsePriceString(p.budget) ||
    parsePriceString(p.asking_price);

  const superBuiltupArea = 
    parseAreaString(p.super_builtup_area) || 
    parseAreaString(p.super_built_up_area) || 
    parseAreaString(p.built_up_area_sqft) || 
    parseAreaString(p.built_up_area) || 
    parseAreaString(p.super_area);

  const carpetArea = 
    parseAreaString(p.carpet_area_sqft) || 
    parseAreaString(p.carpet_area);

  const fallbackArea = 
    parseAreaString(p.areaSqft) || 
    parseAreaString(p.area_sqft) || 
    parseAreaString(p.area) || 
    1200;

  const area = superBuiltupArea || carpetArea || fallbackArea;
  const finalSuperArea = superBuiltupArea || area;
  const finalCarpetArea = carpetArea || area;

  let price = rawPrice;
  if (price <= 0) {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('shibalay')) {
      price = 3000000;
    } else if (titleLower.includes('gajapati')) {
      price = 3515900;
    } else if (titleLower.includes('dhriti')) {
      price = 4250000;
    } else {
      const strForHash = p.id || p.property_code || title;
      let hash = 0;
      for (let i = 0; i < strForHash.length; i++) {
        hash = (hash << 5) - hash + strForHash.charCodeAt(i);
        hash |= 0;
      }
      const rate = 3800 + (Math.abs(hash) % 40) * 120;
      price = Math.round(area * rate);
    }
  }

  const explicitSqftRate = 
    parsePriceString(p.pricePerSqft) || 
    parsePriceString(p.price_per_sqft) || 
    parsePriceString(p.price_sqft) || 
    parsePriceString(p.rate_sqft);
  
  const pricePerSqft = explicitSqftRate > 0 ? explicitSqftRate : (area > 0 && price > 0 ? Math.round(price / area) : 0);

  const statusRaw = String(p.status || p.availability_status || p.property_status || 'LIVE').toUpperCase();
  let constructionStatus = 'LIVE / AVAILABLE';
  if (statusRaw === 'LIVE' || statusRaw === 'AVAILABLE' || statusRaw.includes('LIVE') || statusRaw.includes('READY') || statusRaw === 'READY_TO_MOVE') {
    constructionStatus = 'LIVE / AVAILABLE';
  } else if (statusRaw.includes('UNDER') || statusRaw === 'UNDER_CONSTRUCTION') {
    constructionStatus = 'Under Construction';
  } else if (statusRaw.includes('BOOKED')) {
    constructionStatus = 'Booked';
  } else if (statusRaw.includes('HOLD')) {
    constructionStatus = 'Hold / Reserved';
  } else if (statusRaw.includes('SOLD')) {
    constructionStatus = 'Sold Out';
  } else if (p.constructionStatus) {
    constructionStatus = p.constructionStatus;
  }

  const isSold = isSoldProperty(p);

  const images = extractPropertyImages(p, title, p.id || p.property_code);

  return {
    ...p,
    id: p.id,
    _id: p.id,
    property_code: p.property_code || p.id,
    title,
    property_title: title,
    slug,
    description: p.description || p.location_address || `${p.configuration || ''} ${p.property_type || 'Property'} available in ${p.locality || ''}, ${p.city || ''}`,
    category: (String(p.category || p.transaction_type || 'Buy').toLowerCase().includes('rent')) ? 'Rent' : 'Buy',
    propertyType: p.propertyType || p.property_type || 'Apartment',
    property_type: p.property_type || p.propertyType || 'Apartment',
    listingType: p.listingType || p.transaction_type || 'Sale',
    price,
    base_price: p.base_price || price,
    final_estimated_price: price,
    pricePerSqft,
    city: p.city || 'Kolkata',
    location: p.location || p.locality || 'Kolkata',
    locality: p.locality || p.location || 'Kolkata',
    society: p.society || p.project_name || '',
    developer: p.developer || p.developer_name || 'Swaramayi Developers',
    developer_name: p.developer_name || p.developer || 'Swaramayi Developers',
    project_name: p.project_name || p.society || '',
    bedrooms: p.bedrooms || (p.configuration ? parseInt(p.configuration) || 3 : 3),
    bathrooms: p.bathrooms || 2,
    balconies: p.balconies || 1,
    areaSqft: area,
    superBuiltupArea: finalSuperArea,
    carpetArea: finalCarpetArea,
    carpet_area_sqft: finalCarpetArea,
    built_up_area_sqft: finalSuperArea,
    floor: p.floor !== undefined && p.floor !== null && p.floor !== '' ? p.floor : (p.floor_number || p.unit_floor || ''),
    totalFloors: p.total_floors || p.total_floors_in_building || p.total_floor || '',
    possessionStatus: p.possession_status || p.possession_date || 'Ready to Move In',
    facing: p.facing || 'East',
    furnishing: p.furnishing || p.furnishing_status || 'Semi-Furnished',
    parking: p.parking || (p.parking_spaces ? `${p.parking_spaces} Space` : 'Covered'),
    constructionStatus,
    reraApproved: p.reraApproved !== undefined ? p.reraApproved : true,
    reraNumber: p.reraNumber || 'WBRERA/2026/00192',
    amenities: p.amenities || ['24x7 Security', 'Power Backup', 'Car Parking', 'Gymnasium', 'Swimming Pool', 'Clubhouse'],
    images,
    image: images[0],
    building_photo: images[0],
    cover_image: images[0],
    featured: Boolean(p.featured),
    verified: p.verified !== undefined ? p.verified : true,
    published: p.published !== undefined ? p.published : true,
    isSold,
    availability_status: isSold ? 'SOLD' : (p.availability_status || p.status || 'AVAILABLE'),
    views: (p.views || 0) + 1,
    created_at: p.created_at || new Date().toISOString(),
    assignedAdvisor: (() => {
      const u = (dbStore.data.users || []).find((usr: any) => 
        (p.assigned_employee_id && (usr.id === p.assigned_employee_id || String(usr.id) === String(p.assigned_employee_id))) ||
        (p.assigned_employee_name && (usr.full_name === p.assigned_employee_name || usr.username === p.assigned_employee_name))
      );
      let name = u?.full_name || p.assigned_employee_name;
      let role = u?.role || 'Property Advisor';
      let phone = u?.mobile || '9051322932';
      let email = u?.email || 'punitagswaramayi.com';
      let img = (u as any)?.avatar || (u as any)?.profileImage;

      const tLower = title.toLowerCase();
      const codeLower = String(p.property_code || p.id || '').toLowerCase();

      if (!name) {
        if (tLower.includes('shibalay') || codeLower.includes('425') || codeLower.includes('shibalay')) {
          name = 'Abinash Roy';
          role = 'Admin';
          phone = '7697098078';
          email = 'abinshggmail.com';
          img = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
        } else if (tLower.includes('dhriti') || codeLower.includes('427') || codeLower.includes('423') || codeLower.includes('dhriti')) {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        } else if (tLower.includes('gajapati') || codeLower.includes('422')) {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        } else {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        }
      }

      if (!img) {
        img = (name && name.toLowerCase().includes('punita')) 
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
      }

      return {
        name,
        role,
        designation: role,
        phone,
        mobile: phone,
        email,
        profileImage: img,
        image: img
      };
    })(),
    agent: (() => {
      const u = (dbStore.data.users || []).find((usr: any) => 
        (p.assigned_employee_id && (usr.id === p.assigned_employee_id || String(usr.id) === String(p.assigned_employee_id))) ||
        (p.assigned_employee_name && (usr.full_name === p.assigned_employee_name || usr.username === p.assigned_employee_name))
      );
      let name = u?.full_name || p.assigned_employee_name;
      let role = u?.role || 'Property Advisor';
      let phone = u?.mobile || '9051322932';
      let email = u?.email || 'punitagswaramayi.com';
      let img = (u as any)?.avatar || (u as any)?.profileImage;

      const tLower = title.toLowerCase();
      const codeLower = String(p.property_code || p.id || '').toLowerCase();

      if (!name) {
        if (tLower.includes('shibalay') || codeLower.includes('425') || codeLower.includes('shibalay')) {
          name = 'Abinash Roy';
          role = 'Admin';
          phone = '7697098078';
          email = 'abinshggmail.com';
          img = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
        } else if (tLower.includes('dhriti') || codeLower.includes('427') || codeLower.includes('423') || codeLower.includes('dhriti')) {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        } else if (tLower.includes('gajapati') || codeLower.includes('422')) {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        } else {
          name = 'Punita Roy';
          role = 'Sales Management';
          phone = '9051322932';
          email = 'punitagswaramayi.com';
          img = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';
        }
      }

      if (!img) {
        img = (name && name.toLowerCase().includes('punita')) 
          ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
          : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80';
      }

      return {
        name,
        role,
        designation: role,
        phone,
        mobile: phone,
        email,
        profileImage: img,
        image: img
      };
    })()
  };
}

// 1. Get Public Properties List (Active properties only - excludes SOLD OUT)
export async function getPublicProperties(req: Request, res: Response) {
  loadData();
  const { 
    search, type, propertyType, category, listingType, city, location, locality,
    minPrice, maxPrice, bedrooms, featured, recent, isSold, status
  } = req.query;

  const wantsSold = 
    isSold === 'true' || 
    String(isSold) === 'true' || 
    String(status || '').toLowerCase().includes('sold');

  let properties: any[] = [];

  if (wantsSold) {
    const explicitlySold = dbStore.data.properties.filter(p => !p.is_deleted && isSoldProperty(p));
    const bookedPropIds = new Set((dbStore.data.bookings || []).map((b: any) => b.property_code || b.property_id || b.unit_id).filter(Boolean));
    const bookingSold = dbStore.data.properties.filter(p => !p.is_deleted && bookedPropIds.has(p.property_code || p.id));
    
    const combinedSoldMap = new Map<string, any>();
    [...explicitlySold, ...bookingSold].forEach(p => combinedSoldMap.set(p.id || p.property_code, p));
    properties = Array.from(combinedSoldMap.values());
  } else {
    properties = dbStore.data.properties.filter(p => !p.is_deleted && !isSoldProperty(p));
  }

  // Formatting & Mapping
  let publicList = properties.map(p => {
    const formatted = formatPublicProperty(p);
    if (wantsSold) {
      formatted.isSold = true;
      formatted.availability_status = 'SOLD';
      formatted.constructionStatus = 'Sold Out';
    }
    return formatted;
  });

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    publicList = publicList.filter(p => 
      p.title.toLowerCase().includes(q) ||
      p.property_code.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.city.toLowerCase().includes(q) ||
      (p.project_name && p.project_name.toLowerCase().includes(q))
    );
  }

  if (type || propertyType) {
    const filterType = ((type || propertyType) as string).trim().toLowerCase();
    publicList = publicList.filter(p => {
      const pt = (p.propertyType || p.property_type || '').toLowerCase();
      if (pt === filterType) return true;
      if (pt.includes(filterType) || filterType.includes(pt)) return true;

      const isApartmentFilter = filterType.includes('apartment') || filterType.includes('flat');
      const isApartmentProperty = pt.includes('apartment') || pt.includes('flat') || pt.includes('residence') || pt.includes('bhk');
      if (isApartmentFilter && isApartmentProperty) return true;

      const isVillaFilter = filterType.includes('villa') || filterType.includes('house');
      const isVillaProperty = pt.includes('villa') || pt.includes('house') || pt.includes('bungalow') || pt.includes('duplex');
      if (isVillaFilter && isVillaProperty) return true;

      const isCommercialFilter = filterType.includes('commercial') || filterType.includes('office') || filterType.includes('shop');
      const isCommercialProperty = pt.includes('commercial') || pt.includes('office') || pt.includes('shop') || pt.includes('retail');
      if (isCommercialFilter && isCommercialProperty) return true;

      const isPlotFilter = filterType.includes('plot') || filterType.includes('land');
      const isPlotProperty = pt.includes('plot') || pt.includes('land');
      if (isPlotFilter && isPlotProperty) return true;

      return false;
    });
  }

  if (category) {
    const catFilter = (category as string).trim().toLowerCase();
    publicList = publicList.filter(p => {
      const pCat = (p.category || p.listingType || p.transaction_type || '').toLowerCase();
      if (catFilter === 'buy' || catFilter === 'sale') {
        return !pCat || pCat === 'buy' || pCat === 'sale' || pCat.includes('buy') || pCat.includes('sale');
      }
      if (catFilter === 'rent') {
        return pCat.includes('rent') || pCat.includes('lease');
      }
      if (catFilter === 'commercial') {
        const pt = (p.propertyType || p.property_type || '').toLowerCase();
        return pCat.includes('commercial') || pt.includes('commercial') || pt.includes('office') || pt.includes('shop');
      }
      return pCat === catFilter || pCat.includes(catFilter);
    });
  }

  if (city) {
    publicList = publicList.filter(p => p.city.toLowerCase().includes((city as string).toLowerCase()));
  }

  if (location || locality) {
    const loc = (location || locality) as string;
    publicList = publicList.filter(p => p.location.toLowerCase().includes(loc.toLowerCase()));
  }

  if (minPrice) {
    publicList = publicList.filter(p => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    publicList = publicList.filter(p => p.price <= Number(maxPrice));
  }

  if (bedrooms) {
    publicList = publicList.filter(p => p.bedrooms >= Number(bedrooms));
  }

  if (featured === 'true' || String(featured) === 'true') {
    publicList = publicList.filter(p => p.featured);
  }

  return res.json({
    status: 'success',
    success: true,
    count: publicList.length,
    total: publicList.length,
    data: publicList
  });
}

// 2. Get Featured Properties (Active properties only)
export async function getPublicFeaturedProperties(req: Request, res: Response) {
  loadData();
  const properties = dbStore.data.properties
    .filter(p => !p.is_deleted && !isSoldProperty(p))
    .map(formatPublicProperty);
    
  const featured = properties.filter(p => p.featured);
  const result = featured.length > 0 ? featured : properties.slice(0, 6);

  return res.json({
    status: 'success',
    success: true,
    count: result.length,
    data: result
  });
}

// 3. Get Recent Properties (Active properties only)
export async function getPublicRecentProperties(req: Request, res: Response) {
  loadData();
  const properties = dbStore.data.properties
    .filter(p => !p.is_deleted && !isSoldProperty(p))
    .map(formatPublicProperty)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return res.json({
    status: 'success',
    success: true,
    count: properties.length,
    data: properties.slice(0, 10)
  });
}

// 3b. Get Dynamic Sold Properties from CRM Database & Bookings
export async function getPublicSoldProperties(req: Request, res: Response) {
  loadData();
  
  // 1. Get properties explicitly marked as SOLD or SOLD_OUT in CRM
  let soldProperties = dbStore.data.properties
    .filter(p => !p.is_deleted && isSoldProperty(p))
    .map(formatPublicProperty);

  // 2. Cross-reference with Bookings table in CRM (dbStore.data.bookings)
  if (dbStore.data.bookings && dbStore.data.bookings.length > 0) {
    const bookedPropIds = new Set(dbStore.data.bookings.map((b: any) => b.property_code || b.property_id || b.unit_id).filter(Boolean));
    dbStore.data.properties.forEach(p => {
      if (!p.is_deleted && bookedPropIds.has(p.property_code || p.id)) {
        if (!soldProperties.some(sp => sp.id === p.id || sp.property_code === p.property_code)) {
          const formatted = formatPublicProperty(p);
          formatted.isSold = true;
          formatted.availability_status = 'SOLD';
          soldProperties.push(formatted);
        }
      }
    });
  }

  // Ensure all returned properties are flagged as sold
  const result = soldProperties.map(sp => ({
    ...sp,
    isSold: true,
    availability_status: 'SOLD',
    constructionStatus: 'Sold Out'
  }));

  // Dynamic Stats from CRM Data
  const totalSold = Math.max(result.length, dbStore.data.bookings?.length || 0);
  const totalVolume = result.reduce((sum, p) => sum + (p.price || 0), 0) + (dbStore.data.bookings?.reduce((sum: number, b: any) => sum + (b.agreement_value || b.booking_amount || 0), 0) || 0);
  const totalVolumeCr = Math.max(Math.round((totalVolume / 10000000) * 10) / 10, totalSold > 0 ? 5 : 0);

  return res.json({
    status: 'success',
    success: true,
    count: result.length,
    stats: {
      totalSold: totalSold > 0 ? totalSold : 150,
      totalVolumeCr: totalVolumeCr > 0 ? totalVolumeCr : 250,
      verifiedPct: 100,
      satisfactionPct: 98
    },
    data: result
  });
}

// 4. Get Single Public Property by Slug or ID
export async function getPublicPropertyBySlug(req: Request, res: Response) {
  loadData();
  const { slug } = req.params;

  const properties = dbStore.data.properties.filter(p => !p.is_deleted).map(formatPublicProperty);
  const property = properties.find(p => 
    p.slug === slug || 
    p.id === slug || 
    p.property_code === slug || 
    slugify(p.title) === slug
  );

  if (!property) {
    return res.status(404).json({
      status: 'error',
      success: false,
      message: 'Property not found'
    });
  }

  return res.json({
    status: 'success',
    success: true,
    data: property
  });
}

// 5. Get Public Projects List
export async function getPublicProjects(req: Request, res: Response) {
  loadData();
  let projects = (dbStore.data as any).projects || [];

  if (projects.length === 0) {
    // Generate projects from active properties
    const propertyProjects: any[] = [];
    const seenProjects = new Set<string>();

    dbStore.data.properties.forEach((p: any) => {
      const projName = p.project_name || p.society || 'Swaramayi Residency';
      if (!seenProjects.has(projName)) {
        seenProjects.add(projName);
        propertyProjects.push({
          id: uuidv4(),
          name: projName,
          slug: slugify(projName),
          description: `Premium real estate project located in ${p.locality || 'Kolkata'}, offering luxurious residential living with world-class amenities.`,
          developer: p.developer_name || 'Swaramayi Real Estate Marketing',
          city: p.city || 'Kolkata',
          location: p.locality || p.location_address || 'Kolkata',
          priceMin: p.base_price ? Math.round(p.base_price * 0.9) : 4500000,
          priceMax: p.base_price ? Math.round(p.base_price * 1.3) : 15000000,
          propertyTypes: ['Apartment', 'Villa'],
          bhkOptions: ['2 BHK', '3 BHK', '4 BHK'],
          constructionStatus: 'Under Construction',
          possessionStatus: '2026 - 2028',
          reraApproved: true,
          reraNumber: 'WBRERA/2026/00192',
          amenities: ['Club House', 'Swimming Pool', 'Gymnasium', 'Landscaped Gardens', '24x7 Security'],
          images: [
            'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80'
          ],
          featured: true,
          published: true
        });
      }
    });

    projects = propertyProjects;
  }

  return res.json({
    status: 'success',
    success: true,
    count: projects.length,
    data: projects
  });
}

// 6. Get Single Project by Slug or ID
export async function getPublicProjectBySlug(req: Request, res: Response) {
  loadData();
  const { slug } = req.params;
  const projectsRes = await getPublicProjectsData();
  const project = projectsRes.find((pr: any) => pr.slug === slug || pr.id === slug || slugify(pr.name) === slug);

  if (!project) {
    return res.status(404).json({
      status: 'error',
      success: false,
      message: 'Project not found'
    });
  }

  return res.json({
    status: 'success',
    success: true,
    data: project
  });
}

async function getPublicProjectsData() {
  loadData();
  let projects = (dbStore.data as any).projects || [];
  if (projects.length === 0) {
    const seen = new Set();
    projects = dbStore.data.properties.map((p: any) => {
      const name = p.project_name || p.society || 'Swaramayi Residency';
      if (!seen.has(name)) {
        seen.add(name);
        return {
          id: p.id,
          name,
          slug: slugify(name),
          description: `Luxury living space in ${p.locality || 'Kolkata'}`,
          developer: p.developer_name || 'Swaramayi Real Estate',
          city: p.city || 'Kolkata',
          location: p.locality || 'Kolkata',
          priceMin: p.base_price || 5000000,
          priceMax: (p.base_price || 5000000) * 1.5,
          amenities: ['Security', 'Gym', 'Parking'],
          images: p.images || []
        };
      }
      return null;
    }).filter(Boolean);
  }
  return projects;
}

// 7. Submit Public Contact / Property Enquiry -> Creates Enquiry & Lead in CRM
export async function submitPublicEnquiry(req: Request, res: Response) {
  const { name, email, phone, message, propertyInterested, propertyTitle, preferredVisitDate, preferredVisitTime } = req.body;

  if (!name || !phone) {
    return res.status(400).json({
      status: 'error',
      success: false,
      message: 'Name and phone number are required.'
    });
  }

  loadData();

  const customerNum = generateID('SRM-CUS');
  const leadNum = generateID('SRM-LEAD');

  const newCustomer: CustomerRecord = {
    id: uuidv4(),
    customer_number: customerNum,
    full_name: name,
    email: email || '',
    mobile: phone,
    city: 'Kolkata',
    source: 'Website Contact Form',
    priority: 'HOT',
    status: 'New',
    customer_status: 'NEW_LEAD',
    quality_score: 90,
    remarks: message ? `Website Message: ${message}` : 'Enquiry submitted via Website',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false
  };

  dbStore.data.customers.unshift(newCustomer);

  // Lead record in CRM leads table
  const newLead = {
    id: uuidv4(),
    lead_number: leadNum,
    customer_number: customerNum,
    full_name: name,
    phone,
    email,
    message: message || `Enquiry for ${propertyTitle || 'Property'}`,
    property_title: propertyTitle || '',
    property_id: propertyInterested || '',
    preferred_visit_date: preferredVisitDate || '',
    preferred_visit_time: preferredVisitTime || '',
    source: 'Website Contact Form',
    status: 'NEW_INQUIRY',
    assigned_employee_name: 'Unassigned (Web Lead)',
    created_at: new Date().toISOString()
  };

  if (!dbStore.data.leads) dbStore.data.leads = [];
  dbStore.data.leads.unshift(newLead);

  saveData();

  return res.status(201).json({
    status: 'success',
    success: true,
    message: 'Thank you for your enquiry! Our real estate specialist will contact you shortly.',
    data: {
      customer_number: customerNum,
      lead_number: leadNum
    }
  });
}

// 8. Schedule Site Visit from Website -> Creates SiteVisit & Lead in CRM
export async function schedulePublicSiteVisit(req: Request, res: Response) {
  const { name, email, phone, propertyId, propertyTitle, preferredVisitDate, preferredVisitTime, notes } = req.body;

  if (!name || !phone || !preferredVisitDate) {
    return res.status(400).json({
      status: 'error',
      success: false,
      message: 'Name, phone, and preferred visit date are required.'
    });
  }

  loadData();

  const customerNum = generateID('SRM-CUS');
  const siteVisitCode = generateID('SRM-SV');
  const leadNum = generateID('SRM-LEAD');

  // Customer Master
  const newCustomer: CustomerRecord = {
    id: uuidv4(),
    customer_number: customerNum,
    full_name: name,
    email: email || '',
    mobile: phone,
    city: 'Kolkata',
    source: 'Website Site Visit Request',
    priority: 'HOT',
    status: 'Site Visit Scheduled',
    customer_status: 'SCHEDULED_VISIT',
    quality_score: 95,
    remarks: `Site Visit requested for ${propertyTitle || 'Property'} on ${preferredVisitDate} ${preferredVisitTime || ''}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_deleted: false
  };

  dbStore.data.customers.unshift(newCustomer);

  // Site Visit Record
  const newSiteVisit = {
    id: uuidv4(),
    site_visit_code: siteVisitCode,
    customer_number: customerNum,
    customer_name: name,
    property_title: propertyTitle || 'Property Visit',
    sales_executive: 'Unassigned (Web Booking)',
    scheduled_date: preferredVisitDate,
    scheduled_time: preferredVisitTime || '11:00 AM',
    visit_status: 'SCHEDULED',
    feedback_notes: notes || 'Booked directly via public website',
    created_at: new Date().toISOString()
  };

  dbStore.data.site_visits.unshift(newSiteVisit);

  // Lead Record
  const newLead = {
    id: uuidv4(),
    lead_number: leadNum,
    customer_number: customerNum,
    full_name: name,
    phone,
    email,
    source: 'Website Site Visit Request',
    status: 'SITE_VISIT_SCHEDULED',
    created_at: new Date().toISOString()
  };

  if (!dbStore.data.leads) dbStore.data.leads = [];
  dbStore.data.leads.unshift(newLead);

  saveData();

  return res.status(201).json({
    status: 'success',
    success: true,
    message: 'Site visit scheduled successfully! We look forward to showing you the property.',
    data: {
      site_visit_code: siteVisitCode,
      customer_number: customerNum,
      scheduled_date: preferredVisitDate
    }
  });
}

// 9. Get Public Locations / Cities
export async function getPublicLocations(req: Request, res: Response) {
  loadData();
  const citiesSet = new Set<string>(['Kolkata', 'Hyderabad', 'Bangalore', 'Mumbai']);
  const locationsSet = new Set<string>([
    'Alipore', 'Anwar Shah Road', 'Ashok Nagar Road', 'Ballygunge', 'Bamangachhi', 
    'Bansdroni', 'Barasat', 'Behala', 'Bhawanipur', 'Bidhan Nagar Road', 'Bira', 
    'Birati', 'Bisharpara Kodaliya', 'Chetla', 'Dattapukur', 'Dhakuria', 'Dum Dum', 
    'Dum Dum Cantonment', 'Dum Dum Junction', 'Durganagar', 'EM Bypass', 'Garia', 
    'Gariahat', 'Golf Green', 'Guma', 'Hazra', 'Howrah', 'Hridaypur', 'Jadavpur', 
    'Jodhpur Park', 'Kalighat', 'Kasba', 'Kudghat', 'Lake Gardens', 'Lansdowne', 
    'Madhyamgram', 'Mukundapur', 'Naktala', 'Netaji Nagar', 'New Alipore', 
    'New Barrackpore', 'New Town', 'Prince Anwar Shah Road', 'Rajarhat', 
    'Rashbehari Avenue', 'Regent Park', 'Ruby', 'Salt Lake', 'Santoshpur', 
    'Sarat Bose Road', 'Sealdah', 'Tollygunge'
  ]);

  dbStore.data.properties.forEach(p => {
    if (p.city) citiesSet.add(p.city);
    if (p.locality) locationsSet.add(p.locality);
  });

  const cities = Array.from(citiesSet);
  const locations = Array.from(locationsSet);

  return res.json({
    status: 'success',
    success: true,
    data: {
      cities,
      locations
    }
  });
}

export async function getPublicLocationBySlug(req: Request, res: Response) {
  loadData();
  const { slug } = req.params;
  const nameFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const matchingProperties = dbStore.data.properties
    .filter(p => !p.is_deleted && !isSoldProperty(p))
    .map(formatPublicProperty)
    .filter(p => 
      p.location.toLowerCase().includes(nameFromSlug.toLowerCase()) ||
      p.locality.toLowerCase().includes(nameFromSlug.toLowerCase()) ||
      p.city.toLowerCase().includes(nameFromSlug.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(nameFromSlug.toLowerCase()))
    );

  const locationObj = {
    id: slug,
    name: nameFromSlug,
    slug: slug,
    description: `Explore premium residential properties, luxury apartments, and commercial real estate in ${nameFromSlug}, Kolkata.`,
    connectivity: `Convenient access to metro, major arteries, buses and railway hubs in ${nameFromSlug}.`,
    schools: `Top reputed schools, colleges and academic institutions in and around ${nameFromSlug}.`,
    hospitals: `Super-specialty medical centers and multi-specialty hospitals accessible from ${nameFromSlug}.`,
    shopping: `Shopping malls, local bazaars, hypermarkets and lifestyle destinations in ${nameFromSlug}.`
  };

  return res.json({
    status: 'success',
    success: true,
    data: {
      location: locationObj,
      properties: matchingProperties
    }
  });
}

export async function getPublicCities(req: Request, res: Response) {
  loadData();
  const cities = Array.from(new Set(dbStore.data.properties.map(p => p.city).filter(Boolean)));
  return res.json({
    status: 'success',
    success: true,
    data: cities.length > 0 ? cities : ['Kolkata', 'Hyderabad', 'Bangalore', 'Mumbai']
  });
}

export async function getPublicSocieties(req: Request, res: Response) {
  loadData();
  const societies = Array.from(new Set(dbStore.data.properties.map(p => p.project_name || (p as any).society).filter(Boolean)));
  return res.json({
    status: 'success',
    success: true,
    data: societies
  });
}

export async function getPublicPhases(req: Request, res: Response) {
  return res.json({
    status: 'success',
    success: true,
    data: ['Phase 1', 'Phase 2', 'Phase 3']
  });
}

export async function getPublicFiles(req: Request, res: Response) {
  return res.json({
    status: 'success',
    success: true,
    data: []
  });
}

export async function getPublicAgents(req: Request, res: Response) {
  loadData();
  const agents = dbStore.data.users.map(u => ({
    id: u.id,
    name: u.full_name || u.username,
    email: u.email,
    phone: u.mobile,
    role: u.role
  }));
  return res.json({
    status: 'success',
    success: true,
    data: agents
  });
}
