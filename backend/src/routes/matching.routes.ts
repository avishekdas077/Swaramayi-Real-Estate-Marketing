import { Router } from 'express';
import { 
  calculateCustomerMatches, 
  sendPropertyRecommendations, 
  getCustomerRecommendationView, 
  submitCustomerResponse, 
  scheduleSiteVisit, 
  confirmUnitBooking 
} from '../controllers/matching.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/calculate', authenticateToken, calculateCustomerMatches);
router.post('/send-recommendations', authenticateToken, sendPropertyRecommendations);
router.get('/customer-view/:shareToken', getCustomerRecommendationView);
router.post('/customer-response', submitCustomerResponse);
router.post('/schedule-site-visit', authenticateToken, scheduleSiteVisit);
router.post('/confirm-booking', authenticateToken, confirmUnitBooking);

export default router;
