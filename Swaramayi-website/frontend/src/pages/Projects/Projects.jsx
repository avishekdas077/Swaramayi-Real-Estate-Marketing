import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import { projectService } from '../../services/projectService';
import { Building2, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjects();
      setProjects(res.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="New Residential Projects & Launches in Kolkata | Swarnamayi Real Estate"
        description="Discover top upcoming and under-construction gated communities, luxury apartment towers & commercial projects in Kolkata, New Town & Rajarhat."
      />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-10 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Real Estate Projects' }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Real Estate Projects in Kolkata</h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              Partnered real estate developments, high-rise luxury towers, and commercial complexes across Kolkata.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {loading ? (
            <div className="py-20 text-center text-navy-900 font-bold">Loading real estate projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj._id}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-navy transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                    <img
                      src={
                        proj.images?.[0] ||
                        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'
                      }
                      alt={proj.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-xs font-extrabold px-3 py-1 rounded-md shadow uppercase tracking-wider">
                      {proj.constructionStatus}
                    </span>
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs text-gold-400 font-semibold">{proj.developer}</div>
                      <h3 className="text-xl font-extrabold text-white">{proj.name}</h3>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-1.5 text-xs text-gray-600 font-semibold mb-3">
                        <MapPin className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>
                          {proj.location}, {proj.city}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 line-clamp-3 mb-4 leading-relaxed">{proj.description}</p>

                      <div className="grid grid-cols-2 gap-3 p-3 bg-light-bg rounded-xl mb-4 text-xs">
                        <div>
                          <div className="text-gray-500 font-medium">Price Range</div>
                          <div className="font-bold text-navy-900">
                            ₹ {(proj.priceMin / 100000).toFixed(0)} L - ₹ {(proj.priceMax / 10000000).toFixed(2)} Cr
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500 font-medium">RERA Approval</div>
                          <div className="font-bold text-navy-900">
                            {proj.reraApproved ? 'Approved' : 'In Progress'}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-medium">Possession: {proj.possessionStatus}</span>
                      <Link
                        to={`/projects/${proj.slug}`}
                        className="px-4 py-2 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center space-x-1"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
