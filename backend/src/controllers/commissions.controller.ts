import { Response } from 'express';
import { dbStore, loadData, saveData, logAudit } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

export async function getCommissionSplits(req: AuthRequest, res: Response) {
  loadData();
  const splits = dbStore.data.commissions.map(c => {
    const booking = dbStore.data.bookings.find(b => b.id === c.booking_id);
    const lead = booking ? dbStore.data.leads.find(l => l.id === booking.lead_id) : null;
    const agent = booking ? dbStore.data.users.find(u => u.id === booking.sales_exec_id) : null;

    return {
      ...c,
      booking_amount: booking ? booking.booking_amount : null,
      customer_name: lead ? `${lead.first_name} ${lead.last_name || ''}`.trim() : null,
      agent_name: agent ? agent.full_name : null
    };
  });

  return res.json({
    status: 'SUCCESS',
    data: splits
  });
}

export async function approveCommissionSplit(req: AuthRequest, res: Response) {
  const { id } = req.params;
  loadData();

  const commission = dbStore.data.commissions.find(c => c.id === id);
  if (!commission) {
    return res.status(404).json({ status: 'ERROR', message: 'Commission split record not found.' });
  }

  commission.status = 'APPROVED';
  commission.approved_by_user_id = req.user?.id || null;
  saveData();

  logAudit(req.user?.id || null, 'APPROVE_COMMISSION', 'FINANCE', `Commission payout ${id} authorized for disbursement`, req.ip);

  return res.json({
    status: 'SUCCESS',
    message: 'Commission payout voucher authorized and posted to accounts payable.'
  });
}
