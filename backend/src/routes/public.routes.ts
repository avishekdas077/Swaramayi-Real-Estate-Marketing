import { Router } from 'express';
import {
  getPublicProperties,
  getPublicFeaturedProperties,
  getPublicRecentProperties,
  getPublicSoldProperties,
  getPublicPropertyBySlug,
  getPublicProjects,
  getPublicProjectBySlug,
  submitPublicEnquiry,
  schedulePublicSiteVisit,
  getPublicLocations,
  getPublicLocationBySlug,
  getPublicCities,
  getPublicSocieties,
  getPublicPhases,
  getPublicFiles,
  getPublicAgents
} from '../controllers/public.controller.js';

const router = Router();

// Public Property Endpoints (specific endpoints BEFORE :slug)
router.get('/properties', getPublicProperties);
router.get('/properties/featured', getPublicFeaturedProperties);
router.get('/properties/recent', getPublicRecentProperties);
router.get('/properties/sold', getPublicSoldProperties);
router.get('/properties/:slug', getPublicPropertyBySlug);

// Public Project Endpoints
router.get('/projects', getPublicProjects);
router.get('/projects/:slug', getPublicProjectBySlug);

// Public Enquiry & Site Visit Submissions (Creates Leads in CRM)
router.post('/enquiries', submitPublicEnquiry);
router.post('/site-visits', schedulePublicSiteVisit);

// Public Location listings (specific endpoints BEFORE :slug)
router.get('/locations', getPublicLocations);
router.get('/locations/cities', getPublicCities);
router.get('/locations/societies', getPublicSocieties);
router.get('/locations/phases', getPublicPhases);
router.get('/locations/:slug', getPublicLocationBySlug);

// Public File & Agent listings
router.get('/files', getPublicFiles);
router.get('/agents', getPublicAgents);

export default router;
