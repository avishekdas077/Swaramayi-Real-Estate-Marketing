import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import EnquiryForm from '../../components/Forms/EnquiryForm';
import { projectService } from '../../services/projectService';
import { MapPin, Building, ShieldCheck, CheckCircle2, Phone, Calendar, Download } from 'lucide-react';

export default function ProjectDetails() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [slug]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjectBySlug(slug);
      setProject(res.data);
    } catch (error) {
      console.error('Error fetching project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="py-20 text-center text-navy-900 font-bold">Loading project details...</div>;
  if (!project) return <div className="py-20 text-center text-navy-900 font-bold">Project not found</div>;

  return (
    <>
      <SEO title={`${project.name} | Swarnamayi Real Estate Kolkata`} description={project.description} />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-8 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Projects', link: '/projects' }, { label: project.name }]} />
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
              <div>
                <div className="text-xs text-gold-400 font-bold uppercase tracking-wider">{project.developer}</div>
                <h1 className="text-3xl font-extrabold text-white">{project.name}</h1>
                <div className="flex items-center space-x-2 text-xs text-gray-300 mt-1">
                  <MapPin className="w-4 h-4 text-gold-500" />
                  <span>
                    {project.location}, {project.city}
                  </span>
                </div>
              </div>
              <div className="bg-navy-800 p-4 rounded-xl border border-gold-500/30">
                <div className="text-xs text-gray-400">Price Range</div>
                <div className="text-2xl font-black text-gold-400">
                  ₹ {(project.priceMin / 100000).toFixed(0)} L - ₹ {(project.priceMax / 10000000).toFixed(2)} Cr
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm overflow-hidden h-[400px]">
                <img
                  src={project.images?.[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'}
                  alt={project.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-bold text-navy-900 mb-3 pb-2 border-b">Project Overview</h3>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{project.description}</p>
              </div>

              {project.amenities?.length > 0 && (
                <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-bold text-navy-900 mb-4 pb-2 border-b">Project Amenities</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {project.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center space-x-2 text-xs font-semibold text-gray-800 p-3 bg-light-bg rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <EnquiryForm propertyTitle={`Project: ${project.name}`} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
