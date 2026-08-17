import { Router } from 'express';
import {
  getDashboardOverview,
  getSalesFunnel,
  getCustomerRequirementsIntelligence,
  getPropertyStockAnalytics,
  getFollowUpControlCenter,
  getSiteVisitIntelligence,
  getBookingAndBrokerageIntelligence,
  getTeamPerformanceAnalytics,
  getDeveloperAndProjectPerformance,
  getLeadSourceAndMarketingROI,
  getActionCenter,
  getSecurityAndActivityLogs,
  getForecasting,
  getCustomer360,
  getProperty360
} from '../controllers/dashboard.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/overview', verifyToken, getDashboardOverview);
router.get('/sales-funnel', verifyToken, getSalesFunnel);
router.get('/customer-requirements', verifyToken, getCustomerRequirementsIntelligence);
router.get('/property-stock', verifyToken, getPropertyStockAnalytics);
router.get('/followups', verifyToken, getFollowUpControlCenter);
router.get('/site-visits', verifyToken, getSiteVisitIntelligence);
router.get('/bookings', verifyToken, getBookingAndBrokerageIntelligence);
router.get('/brokerage', verifyToken, getBookingAndBrokerageIntelligence);
router.get('/team-performance', verifyToken, getTeamPerformanceAnalytics);
router.get('/developer-performance', verifyToken, getDeveloperAndProjectPerformance);
router.get('/lead-source', verifyToken, getLeadSourceAndMarketingROI);
router.get('/action-center', verifyToken, getActionCenter);
router.get('/security', verifyToken, getSecurityAndActivityLogs);
router.get('/forecasting', verifyToken, getForecasting);
router.get('/customer-360/:id', verifyToken, getCustomer360);
router.get('/property-360/:id', verifyToken, getProperty360);

// Backward compatibility alias
router.get('/stats', verifyToken, getDashboardOverview);

export default router;
