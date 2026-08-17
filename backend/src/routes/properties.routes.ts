import { Router } from 'express';
import { 
  getProperties, createProperty, getPropertyMatches, shareProperty, revisePropertyPrice 
} from '../controllers/property.controller.js';
import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, getProperties);
router.post('/', verifyToken, createProperty);
router.get('/:id/matches', verifyToken, getPropertyMatches);
router.post('/:id/share', verifyToken, shareProperty);
router.post('/:id/price-update', verifyToken, revisePropertyPrice);

export default router;
