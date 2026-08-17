import { Response } from 'express';
import { dbStore, loadData } from '../db/database.js';
import { AuthRequest } from '../middleware/auth.js';

export async function getDashboardStats(req: AuthRequest, res: Response) {
  loadData();
  const data = dbStore.data;

  const totalLeads = data.leads.length;
  const newLeads = data.leads.filter(l => l.status === 'NEW').length;
  const qualifiedLeads = data.leads.filter(l => l.status === 'QUALIFIED').length;
  const wonLeads = data.leads.filter(l => l.status === 'WON').length;
  
  const totalBookings = data.bookings.length;
  const approvedBookings = data.bookings.filter(b => b.status === 'APPROVED');
  const totalRevenue = approvedBookings.reduce((sum, b) => sum + (b.booking_amount || 0), 0);

  const activeFraudAlerts = data.fraud_alerts.filter(f => f.status === 'ACTIVE').length;
  const siteVisitsCount = data.site_visits.length;

  const recentLeads = data.leads.slice(0, 5).map(l => {
    const agent = data.users.find(u => u.id === l.assigned_to_user_id);
    return {
      ...l,
      agent_name: agent ? agent.full_name : 'Unassigned'
    };
  });

  return res.json({
    status: 'SUCCESS',
    data: {
      kpis: {
        totalLeads,
        newLeads,
        qualifiedLeads,
        wonLeads,
        totalBookings,
        totalRevenue,
        siteVisitsCount,
        activeFraudAlerts,
        isLockdownActive: data.system_settings.is_lockdown_active === 'true'
      },
      recentLeads,
      pipelineBreakdown: {
        new: newLeads,
        qualified: qualifiedLeads,
        siteVisitScheduled: data.leads.filter(l => l.status === 'SITE_VISIT_SCHEDULED').length,
        won: wonLeads,
        lost: data.leads.filter(l => l.status === 'LOST').length
      }
    }
  });
}
