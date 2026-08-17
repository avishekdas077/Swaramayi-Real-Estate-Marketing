import { Router } from 'express';
import { getCommissionSplits, approveCommissionSplit } from '../controllers/commissions.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/splits', verifyToken, requireRole(['SUPER_ADMIN', 'BRANCH_MANAGER', 'FINANCE_SPECIALIST']), getCommissionSplits);
router.post('/splits/:id/approve', verifyToken, requireRole(['SUPER_ADMIN', 'FINANCE_SPECIALIST']), approveCommissionSplit);

export default router;
