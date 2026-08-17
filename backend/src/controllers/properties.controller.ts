import { Request, Response } from 'express';
import { dbStore, loadData, saveData, logAudit } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

export async function getProjects(req: Request, res: Response) {
  loadData();
  const projects = dbStore.data.projects.map(p => {
    const builder = dbStore.data.builders.find(b => b.id === p.builder_id);
    return {
      ...p,
      builder_name: builder ? builder.name : null,
      commission_percentage: builder ? builder.commission_percentage : null
    };
  });

  return res.json({
    status: 'SUCCESS',
    data: projects
  });
}

export async function getProjectUnits(req: Request, res: Response) {
  const { id } = req.params;
  loadData();

  const project = dbStore.data.projects.find(p => p.id === id);
  if (!project) {
    return res.status(404).json({ status: 'ERROR', message: 'Project not found.' });
  }

  const nowStr = new Date().toISOString();
  const units = dbStore.data.units.filter(u => u.project_id === id);

  let modified = false;
  units.forEach(u => {
    if (u.status === 'HOLD' && u.hold_expires_at && u.hold_expires_at < nowStr) {
      u.status = 'AVAILABLE';
      u.hold_expires_at = null;
      modified = true;
    }
  });

  if (modified) saveData();

  return res.json({
    status: 'SUCCESS',
    project,
    data: units
  });
}

export async function holdUnit(req: AuthRequest, res: Response) {
  const { id } = req.params;
  loadData();

  const unit = dbStore.data.units.find(u => u.id === id);
  if (!unit) {
    return res.status(404).json({ status: 'ERROR', message: 'Unit not found.' });
  }

  if (unit.status !== 'AVAILABLE') {
    return res.status(400).json({ status: 'ERROR', message: `Unit is currently in ${unit.status} status and cannot be locked.` });
  }

  const holdExpiry = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();
  unit.status = 'HOLD';
  unit.hold_expires_at = holdExpiry;
  saveData();

  logAudit(req.user?.id || null, 'HOLD_UNIT', 'INVENTORY', `Temporary 2-hour hold placed on unit ${unit.unit_number}`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: 'Unit locked on temporary hold for 2 hours.',
    data: {
      unit_id: id,
      unit_number: unit.unit_number,
      status: 'HOLD',
      hold_expires_at: holdExpiry
    }
  });
}
