import { Router } from 'express';
import { 
  toggleLockdown, 
  getOrganizationStructure,
  createBranch,
  createTeam,
  getUsers, 
  createUser, 
  updateUserStatus,
  reassignEmployeeExit, 
  getRolePermissions, 
  updateRolePermission,
  createCustomRole,
  getApprovalRequests, 
  respondApprovalRequest, 
  getActiveSessions, 
  revokeSession,
  getAuditLogs, 
  getFraudAlerts 
} from '../controllers/security.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.post('/lockdown', authenticateToken, toggleLockdown);
router.get('/organization', authenticateToken, getOrganizationStructure);
router.post('/branches', authenticateToken, createBranch);
router.post('/teams', authenticateToken, createTeam);

router.get('/users', authenticateToken, getUsers);
router.post('/users', authenticateToken, createUser);
router.patch('/users/:id/status', authenticateToken, updateUserStatus);
router.post('/users/handover', authenticateToken, reassignEmployeeExit);

router.get('/roles', authenticateToken, getRolePermissions);
router.patch('/roles/permission', authenticateToken, updateRolePermission);
router.post('/roles/custom', authenticateToken, createCustomRole);

router.get('/approvals', authenticateToken, getApprovalRequests);
router.post('/approvals/:id/respond', authenticateToken, respondApprovalRequest);

router.get('/sessions', authenticateToken, getActiveSessions);
router.post('/sessions/:id/revoke', authenticateToken, revokeSession);

router.get('/audit-logs', authenticateToken, getAuditLogs);
router.get('/alerts', authenticateToken, getFraudAlerts);

export default router;
