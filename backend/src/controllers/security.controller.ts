import { Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { dbStore, loadData, saveData, logAudit, generateID, UserRecord } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

// 1. Emergency System Lockdown Toggle
export async function toggleLockdown(req: AuthRequest, res: Response) {
  const { is_locked } = req.body;
  const statusStr = is_locked ? 'true' : 'false';

  loadData();
  dbStore.data.system_settings.is_lockdown_active = statusStr;
  saveData();

  logAudit(req.user?.id || null, 'EMERGENCY_LOCKDOWN', 'SECURITY', `System emergency lockdown set to ${statusStr}`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: is_locked ? 'EMERGENCY SYSTEM LOCKDOWN ACTIVATED. Non-SuperAdmin access blocked.' : 'Emergency lockdown lifted.',
    is_lockdown_active: is_locked
  });
}

// 2. User & Employee Directory Management
export async function getUsers(req: AuthRequest, res: Response) {
  loadData();
  return res.json({
    status: 'SUCCESS',
    count: dbStore.data.users.length,
    data: dbStore.data.users
  });
}

export async function createUser(req: AuthRequest, res: Response) {
  const { username, full_name, email, mobile, role, branch_name, department, team_name, manager_name } = req.body;

  if (!username || !email || !role) {
    return res.status(400).json({ status: 'ERROR', message: 'username, email, and role are required.' });
  }

  loadData();
  const newUser: UserRecord = {
    id: `USR-0${dbStore.data.users.length + 1}`,
    username,
    full_name: full_name || username,
    email,
    mobile: mobile || '+91 98490 00000',
    role: role || 'SALES_EXEC',
    branch_name: branch_name || 'Kondapur Branch',
    department: department || 'Sales',
    team_name: team_name || 'Sales Team A',
    manager_name: manager_name || 'Rahul Sharma',
    is_active: true,
    user_status: 'ACTIVE',
    created_at: new Date().toISOString().split('T')[0]
  };

  dbStore.data.users.unshift(newUser);
  saveData();

  logAudit(req.user?.id || null, 'CREATE_USER', 'SECURITY', `Created user ${username} (${role})`, req.ip);

  return res.status(201).json({
    status: 'SUCCESS',
    message: `User ${username} created successfully with role ${role}.`,
    data: newUser
  });
}

// 3. Employee Exit & Database Handover Reassignment
export async function reassignEmployeeExit(req: AuthRequest, res: Response) {
  const { resigning_user_id, new_assigned_agent_name, new_assigned_agent_id } = req.body;

  loadData();
  const user = dbStore.data.users.find(u => u.id === resigning_user_id);
  if (user) {
    user.is_active = false;
    user.user_status = 'RESIGNED';
  }

  // Reassign customers
  let reassignedCustomersCount = 0;
  dbStore.data.customers.forEach(c => {
    if (c.assigned_employee_id === resigning_user_id || c.assigned_employee_name === user?.username) {
      c.assigned_employee_id = new_assigned_agent_id;
      c.assigned_employee_name = new_assigned_agent_name;
      reassignedCustomersCount++;
    }
  });

  saveData();

  logAudit(req.user?.id || null, 'EMPLOYEE_EXIT_HANDOVER', 'SECURITY', `Employee ${user?.username} marked RESIGNED. ${reassignedCustomersCount} records reassigned to ${new_assigned_agent_name}`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: `Employee exit completed. ${reassignedCustomersCount} customer & lead records reassigned to ${new_assigned_agent_name}.`,
    reassigned_count: reassignedCustomersCount
  });
}

// 4. Role Permission Matrix
export async function getRolePermissions(req: AuthRequest, res: Response) {
  loadData();
  return res.json({
    status: 'SUCCESS',
    data: dbStore.data.role_permissions
  });
}

// 5. Universal Approval Engine
export async function getApprovalRequests(req: AuthRequest, res: Response) {
  loadData();
  return res.json({
    status: 'SUCCESS',
    data: dbStore.data.approval_requests
  });
}

export async function respondApprovalRequest(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const { action } = req.body; // 'APPROVE' or 'REJECT'

  loadData();
  const request = dbStore.data.approval_requests.find(r => r.id === id || r.request_code === id);
  if (!request) {
    return res.status(404).json({ status: 'ERROR', message: 'Approval request not found.' });
  }

  request.status = action === 'APPROVE' ? 'APPROVED' : 'REJECTED';
  request.approved_by_name = req.user?.username || 'Super Admin';
  request.approved_at = new Date().toLocaleString();

  saveData();

  logAudit(req.user?.id || null, `APPROVAL_${action}`, 'SECURITY', `Approval request ${request.request_code} set to ${request.status}`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: `Request ${request.request_code} ${request.status}.`,
    data: request
  });
}

// 6. Active Sessions & Security Alerts
export async function getActiveSessions(req: AuthRequest, res: Response) {
  loadData();
  return res.json({
    status: 'SUCCESS',
    sessions: dbStore.data.active_sessions
  });
}

export async function getAuditLogs(req: AuthRequest, res: Response) {
  loadData();
  const logs = dbStore.data.audit_logs.map(a => {
    const user = dbStore.data.users.find(u => u.id === a.user_id);
    return {
      ...a,
      username: user ? user.username : null,
      full_name: user ? user.full_name : null
    };
  });

  return res.json({
    status: 'SUCCESS',
    data: logs
  });
}

export async function getFraudAlerts(req: AuthRequest, res: Response) {
  loadData();
  return res.json({
    status: 'SUCCESS',
    data: dbStore.data.security_alerts
  });
}
