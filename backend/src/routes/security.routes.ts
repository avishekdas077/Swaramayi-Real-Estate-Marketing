import { Router } from 'express';
import { 
  toggleLockdown, 
  getUsers, 
  createUser, 
  reassignEmployeeExit, 
  getRolePermissions, 
  getApprovalRequests, 
  respondApprovalRequest, 
  getActiveSessions, 
  getAuditLogs, 
  getFraudAlerts 
} from '../controllers/security.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/lockdown', authenticateToken, toggleLockdown);
router.get('/users', authenticateToken, getUsers);
router.post('/users', authenticateToken, createUser);
router.post('/users/handover', authenticateToken, reassignEmployeeExit);
router.get('/roles', authenticateToken, getRolePermissions);
router.get('/approvals', authenticateToken, getApprovalRequests);
router.post('/approvals/:id/respond', authenticateToken, respondApprovalRequest);
router.get('/sessions', authenticateToken, getActiveSessions);
router.get('/audit-logs', authenticateToken, getAuditLogs);
router.get('/alerts', authenticateToken, getFraudAlerts);

export default router;
