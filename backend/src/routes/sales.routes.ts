import { Router } from 'express';
import { siteVisitCheckin, createBooking, approveBooking } from '../controllers/sales.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/site-visits/checkin', verifyToken, siteVisitCheckin);
router.post('/bookings', verifyToken, createBooking);
router.post('/bookings/:id/approve', verifyToken, requireRole(['SUPER_ADMIN', 'BRANCH_MANAGER']), approveBooking);

export default router;
