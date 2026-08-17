import { Router } from 'express';
import { 
  getCustomers, checkDuplicateCustomer, createCustomer, getCustomer360, 
  submitTransferRequest, handleTransferApproval, smartSearch 
} from '../controllers/crm.controller.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/customers', verifyToken, getCustomers);
router.post('/customers/check-duplicate', verifyToken, checkDuplicateCustomer);
router.post('/customers', verifyToken, createCustomer);
router.get('/customers/:id/360', verifyToken, getCustomer360);

router.post('/leads/transfer-request', verifyToken, submitTransferRequest);
router.post('/leads/transfer-approve', verifyToken, requireRole(['SUPER_ADMIN', 'BRANCH_MANAGER']), handleTransferApproval);

router.get('/search', verifyToken, smartSearch);

export default router;
