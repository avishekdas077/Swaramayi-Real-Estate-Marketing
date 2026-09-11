import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import { ShieldCheck, Target, Eye, Award, CheckCircle, MapPin, Users } from 'lucide-react';
import logoImg from '../../assets/logo.png';

export default function About() {
  return (
    <>
      <SEO
        title="About Swarnamayi Real Estate Marketing | Trusted Guidance in Kolkata"
        description="Learn about Swarnamayi Real Estate Marketing, Kolkata's professional real estate advisory. Discover our vision, mission, and transparent approach to property buying & selling."
      />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-12 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'About Us' }]} />
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-2">
              <div>
                <span className="text-xs font-bold text-gold-400 uppercase tracking-widest">Company Overview</span>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-1">About Swarnamayi</h1>
                <p className="text-sm text-gray-300 mt-2 max-w-2xl">
                  "Your Dream Property. Our Trusted Guidance."
                </p>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-gold-500/40 shadow-lg shrink-0">
                <img src={logoImg} alt="Swarnamayi Logo" className="h-16 sm:h-20 w-auto object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
          {/* VISION & MISSION */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-navy-900 mb-3">Our Vision</h2>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                "To become a trusted and technology-driven real estate marketing partner for property buyers, sellers, developers and investors."
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-400 flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-extrabold text-navy-900 mb-3">Our Mission</h2>
              <p className="text-sm text-gray-700 leading-relaxed font-medium">
                "To simplify real estate decisions through transparent information, professional marketing and trusted guidance."
              </p>
            </div>
          </div>

          {/* OUR STORY */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-extrabold text-navy-900 mb-4">Our Kolkata Journey</h2>
            <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
              <p>
                Swarnamayi Real Estate Marketing was established to bring structural clarity, digital accessibility, and total transparency to Kolkata's property landscape. Operating primarily across New Town, Rajarhat, Salt Lake Sector V, EM Bypass, and South Kolkata, we bridge property buyers and developers with verified data.
              </p>
              <p>
                Whether you are searching for a ready-to-move 3 BHK apartment, an ultra-luxury sky villa, or a commercial IT office space, our dedicated property consultants provide verified title checks, fair price guidance, and end-to-end documentation support.
              </p>
            </div>
          </div>

          {/* WHY CHOOSE US GRID */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-900">Why Work With Swarnamayi?</h2>
              <p className="text-xs text-gray-500 mt-1">Our commitments to real estate buyers, sellers, and developers in West Bengal.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Verified Listings', desc: 'Detailed site inspection and RERA status verification.' },
                { title: 'Kolkata Expertise', desc: 'In-depth market knowledge across New Town & South Kolkata.' },
                { title: 'Transparent Process', desc: 'Zero hidden advisory fees and clear legal documentation.' },
                { title: 'Site Tour Support', desc: 'Chauffeur and advisor assistance for physical inspections.' },
              ].map((val, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm text-center">
                  <CheckCircle className="w-8 h-8 text-gold-600 mx-auto mb-3" />
                  <h3 className="font-bold text-navy-900 text-sm mb-1.5">{val.title}</h3>
                  <p className="text-xs text-gray-500">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
