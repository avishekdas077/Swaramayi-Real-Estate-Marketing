import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import {
  Home,
  Handshake,
  Building,
  TrendingUp,
  ShieldCheck,
  FileText,
  UserCheck,
  Search,
  Calculator,
  Megaphone,
  Briefcase,
  Key,
} from 'lucide-react';

const services = [
  { title: '1. Property Buying Assistance', desc: 'Personalized property searches, legal document checks, site tours, and negotiations.', icon: Home },
  { title: '2. Property Selling Marketing', desc: 'Targeted digital marketing, high-intent lead generation, and maximum property exposure.', icon: Handshake },
  { title: '3. Property Rental Services', desc: 'Assisting landlords and tenants in securing verified residential & commercial rentals.', icon: Building },
  { title: '4. Commercial Property Advisory', desc: 'Corporate office space discovery, retail showroom leasing, and IT park selections.', icon: Briefcase },
  { title: '5. Real Estate Investment Consulting', desc: 'High-yield portfolio structuring across emerging Kolkata corridors like New Town.', icon: TrendingUp },
  { title: '6. Developer Project Marketing', desc: 'Sole selling, digital marketing campaigns, lead management, and launch strategy for builders.', icon: Megaphone },
  { title: '7. Site Visit & Tour Management', desc: 'Chauffeur and advisor assistance for physical property site tours across Kolkata.', icon: UserCheck },
  { title: '8. Property Valuation Assistance', desc: 'Comparative market assessment (CMA) for pricing real estate accurately.', icon: Calculator },
  { title: '9. Documentation & Legal Checks', desc: 'Encumbrance verification, title deeds audit, and agreement drafting help.', icon: FileText },
  { title: '10. Home Loan Processing Support', desc: 'Assistance with leading public and private bank home loan approvals.', icon: ShieldCheck },
  { title: '11. NRI Real Estate Services', desc: 'End-to-end property investment management for non-resident Indians in Kolkata.', icon: Search },
  { title: '12. Property Management Assistance', desc: 'Tenant management, key custody, and property maintenance support.', icon: Key },
];

export default function Services() {
  return (
    <>
      <SEO
        title="Real Estate Services in Kolkata | Swarnamayi Real Estate Marketing"
        description="Comprehensive real estate marketing, property buying assistance, developer marketing, valuation, and legal documentation services in Kolkata."
      />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-10 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Our Services' }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Our Professional Real Estate Services</h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              From property discovery to developer marketing, valuation, and possession support in Kolkata.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-navy transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-gold-500 flex items-center justify-center mb-4">
                    <srv.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-navy-900 mb-2">{srv.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed mb-4">{srv.desc}</p>
                </div>
                <Link
                  to="/contact"
                  className="text-xs font-bold text-gold-600 hover:text-navy-900 inline-flex items-center space-x-1"
                >
                  <span>Inquire About Service →</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
