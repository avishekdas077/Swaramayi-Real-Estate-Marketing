import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  MapPin,
  Bed,
  Bath,
  Maximize2,
  ShieldCheck,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  Layers,
  FileText,
  Calendar,
  CheckCircle,
  Building,
  UserCheck,
  Compass,
  ArrowRight,
  Eye,
} from 'lucide-react';

import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import EnquiryForm from '../../components/Forms/EnquiryForm';
import SiteVisitForm from '../../components/Forms/SiteVisitForm';
import EMICalculator from '../../components/Calculators/EMICalculator';
import PropertyCard from '../../components/PropertyCard/PropertyCard';

import { propertyService } from '../../services/propertyService';
import { useFavorites } from '../../context/FavoritesContext';
import { useCompare } from '../../context/CompareContext';

export default function PropertyDetails() {
  const { slug } = useParams();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { toggleCompare, isComparing } = useCompare();

  useEffect(() => {
    fetchDetails();
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const res = await propertyService.getPropertyBySlug(slug);
      if (res.data) {
        setProperty(res.data);
        setActiveImage(res.data.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80');

        // Fetch similar properties
        const simRes = await propertyService.getProperties({
          location: res.data.location,
          limit: 3,
        });
        setSimilarProperties((simRes.data || []).filter((p) => p._id !== res.data._id));
      }
    } catch (error) {
      console.error('Error loading property details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-navy-900 font-bold">
        Loading property details...
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-navy-900 mb-4">Property Not Found</h2>
        <Link to="/properties" className="px-6 py-2.5 bg-gold-500 text-navy-900 font-bold rounded-xl">
          Back to Properties
        </Link>
      </div>
    );
  }

  const favorited = isFavorite(property._id);
  const comparing = isComparing(property._id);

  const formatPrice = (amount) => {
    if (!amount) return 'Price on Request';
    if (amount >= 10000000) return `₹ ${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹ ${(amount / 100000).toFixed(2)} Lakhs`;
    return `₹ ${amount.toLocaleString('en-IN')}`;
  };

  const images = property.images?.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  const whatsappUrl = `https://wa.me/919830012345?text=${encodeURIComponent(
    `Hello Swarnamayi Real Estate Team, I am interested in "${property.title}" (${window.location.href}). Please share details.`
  )}`;

  return (
    <>
      <SEO
        title={`${property.title} | Swarnamayi Real Estate`}
        description={`${property.bedrooms} BHK Property in ${property.location}, ${property.city}. Price: ${formatPrice(property.price)}. Area: ${property.areaSqft} sqft.`}
        schema={{
          '@context': 'https://schema.org',
          '@type': 'RealEstateListing',
          name: property.title,
          description: property.description,
          url: window.location.href,
        }}
      />

      <div className="bg-light-bg min-h-screen pb-16">
        {/* Top Breadcrumb Header */}
        <div className="bg-navy-900 text-white py-6 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              items={[
                { label: 'Properties', link: '/properties' },
                { label: property.location, link: `/properties?location=${property.location}` },
                { label: property.title },
              ]}
            />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
              <div>
                <div className="flex items-center space-x-2 text-xs font-bold text-gold-400 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-gold-500" />
                  <span>
                    {property.location}, {property.city}
                  </span>
                  {property.society && <span>• {property.society}</span>}
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{property.title}</h1>
              </div>

              {/* Price Tag & Action Badges */}
              <div className="flex items-center space-x-4">
                <div>
                  <div className="text-xs text-gray-400">Offered Price</div>
                  <div className="text-2xl sm:text-3xl font-black text-gold-400">{formatPrice(property.price)}</div>
                </div>
                <button
                  onClick={() => toggleFavorite(property)}
                  className={`p-3 rounded-xl border backdrop-blur-md transition-colors ${
                    favorited ? 'bg-red-500 border-red-500 text-white' : 'bg-navy-800 border-gold-500/40 text-gold-400'
                  }`}
                  title="Bookmark Property"
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Details Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* LEFT COLUMN: Gallery, Details, Amenities, EMI */}
            <div className="lg:col-span-2 space-y-8">
              {/* IMAGE GALLERY */}
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm space-y-3">
                {/* Main Large Image */}
                <div className="relative h-[360px] sm:h-[450px] rounded-xl overflow-hidden bg-gray-100 group">
                  <img
                    src={activeImage}
                    alt={property.title}
                    className="w-full h-full object-cover cursor-pointer group-hover:scale-105 transition-transform duration-500"
                    onClick={() => setLightboxOpen(true)}
                  />
                  <div className="absolute bottom-3 right-3 bg-navy-900/80 text-white text-xs font-bold px-3 py-1.5 rounded-lg backdrop-blur-md">
                    Click for Fullscreen Gallery
                  </div>
                </div>

                {/* Thumbnails Row */}
                {images.length > 1 && (
                  <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(img)}
                        className={`w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                          activeImage === img ? 'border-gold-500 scale-105' : 'border-transparent opacity-70'
                        }`}
                      >
                        <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* QUICK SPEC HIGHLIGHTS GRID */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-gray-100">
                  Property Quick Specs
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Bedrooms</div>
                    <div className="font-bold text-navy-900 text-sm">{property.bedrooms || 0} BHK</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Super Area</div>
                    <div className="font-bold text-navy-900 text-sm">
                      {property.superBuiltupArea || property.built_up_area_sqft || property.superArea || property.areaSqft} sqft
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Carpet Area</div>
                    <div className="font-bold text-navy-900 text-sm">
                      {property.carpetArea || property.carpet_area_sqft || property.areaSqft} sqft
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Furnishing</div>
                    <div className="font-bold text-navy-900 text-sm">{property.furnishing}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Facing</div>
                    <div className="font-bold text-navy-900 text-sm">{property.facing || 'East'}</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Floor</div>
                    <div className="font-bold text-navy-900 text-sm">
                      {property.floor
                        ? (String(property.floor).toLowerCase().includes('floor')
                            ? property.floor
                            : `${property.floor}${property.totalFloors ? ` of ${property.totalFloors}` : ''}`)
                        : 'Ground'}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">Possession</div>
                    <div className="font-bold text-navy-900 text-sm">
                      {property.possessionStatus || property.possession_status || property.possession_date || 'Ready to Move In'}
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-xl">
                    <div className="text-gray-500 font-semibold mb-1">RERA Status</div>
                    <div className="font-bold text-navy-900 text-sm">{property.reraApproved ? 'Approved' : 'Pending'}</div>
                  </div>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-base font-bold text-navy-900 mb-3 pb-2 border-b border-gray-100">
                  Full Property Description
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* AMENITIES */}
              {property.amenities?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-base font-bold text-navy-900 mb-4 pb-2 border-b border-gray-100">
                    Amenities & Features
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-gray-800 p-2.5 bg-light-bg rounded-xl">
                        <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EMI CALCULATOR */}
              <EMICalculator defaultPrice={property.price} />
            </div>

            {/* RIGHT COLUMN: Enquiry Form, Site Visit Form & Agent Info */}
            <div className="space-y-6">
              {/* Agent Card */}
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="text-xs font-bold text-gold-600 uppercase tracking-wider mb-3">Assigned Property Advisor</div>
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={property.agent?.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'}
                    alt={property.agent?.name || 'Swarnamayi Agent'}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gold-500"
                  />
                  <div>
                    <h4 className="font-bold text-navy-900 text-sm">{property.agent?.name || 'Aritra Sen'}</h4>
                    <p className="text-xs text-gray-500">{property.agent?.designation || 'Senior Advisor - Kolkata'}</p>
                    <span className="inline-block mt-1 bg-green-100 text-green-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      Official Swarnamayi Advisor
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="tel:+919830012345"
                    className="py-2.5 bg-navy-900 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1 hover:bg-navy-800"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-400" />
                    <span>Call Advisor</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center space-x-1 hover:bg-emerald-600"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Enquiry Form */}
              <EnquiryForm propertyId={property._id} propertyTitle={property.title} />

              {/* Site Visit Form */}
              <SiteVisitForm propertyId={property._id} propertyTitle={property.title} />
            </div>
          </div>

          {/* SIMILAR RECOMMENDED PROPERTIES */}
          {similarProperties.length > 0 && (
            <div className="mt-16 pt-10 border-t border-gray-200">
              <h2 className="text-2xl font-extrabold text-navy-900 mb-6">Similar Properties in {property.location}</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarProperties.map((simProp, idx) => (
                  <PropertyCard key={simProp.id || simProp._id || simProp.slug || idx} property={simProp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
