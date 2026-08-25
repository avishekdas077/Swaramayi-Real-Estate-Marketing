import { Router } from 'express';
import {
  getLeads, checkDuplicateLead, createLead, logCallDisposition,
  getLeadJourney360, transferLead, getLeadSourceReport, getSalesPersonPerformanceReport
} from '../controllers/lead.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', verifyToken, getLeads);
router.post('/check-duplicate', verifyToken, checkDuplicateLead);
router.post('/', verifyToken, createLead);
router.get('/:id/journey-360', verifyToken, getLeadJourney360);
router.post('/disposition', verifyToken, logCallDisposition);
router.post('/transfer', verifyToken, requireRole(['SUPER_ADMIN', 'ADMIN', 'BRANCH_MANAGER', 'SALES_MANAGER']), transferLead);
router.get('/reports/sources', verifyToken, getLeadSourceReport);
router.get('/reports/performance', verifyToken, getSalesPersonPerformanceReport);

export default router;
