import { Router } from 'express';
import { 
  getProperties, createProperty, getPropertyMatches, shareProperty, revisePropertyPrice 
} from '../controllers/property.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/properties', verifyToken, getProperties);
router.post('/properties', verifyToken, createProperty);
router.get('/properties/:id/matches', verifyToken, getPropertyMatches);
router.post('/properties/:id/share', verifyToken, shareProperty);
router.post('/properties/:id/price-update', verifyToken, revisePropertyPrice);

export default router;
