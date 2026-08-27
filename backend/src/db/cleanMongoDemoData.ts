import dns from 'dns';
try { dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']); } catch (e) {}
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dbStore } from './database.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';

export const cleanMongoDBDemoData = async () => {
  try {
    const maskedURI = mongoURI.replace(/:([^@]+)@/, ':*****@');
    console.log(`🔌 Connecting to MongoDB Atlas Cluster for Demo Data Cleanup: ${maskedURI}`);

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`✅ Connected to MongoDB Atlas! Database: ${mongoose.connection.db?.databaseName}`);

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error('Database connection instance is undefined.');
    }
    const collections = await db.listCollections().toArray();

    console.log(`\n======================================================`);
    console.log(`🧹 STARTING MONGODB DEMO DATA CLEANUP PROTOCOL`);
    console.log(`======================================================\n`);

    let totalDeleted = 0;
    const report: { collection: string; status: string; deletedCount: number }[] = [];

    for (const colInfo of collections) {
      const name = colInfo.name;
      const lowerName = name.toLowerCase();

      // STRICT PROTECTION RULE: NEVER DELETE USERS OR SUPER ADMIN PROFILES
      if (lowerName === 'users' || lowerName === 'user') {
        const userCount = await db.collection(name).countDocuments();
        console.log(`🔒 PRESERVED COLLECTION: '${name}' (${userCount} Super Admin & User Profile records intact)`);
        report.push({ collection: name, status: 'PRESERVED (Users Intact)', deletedCount: 0 });
        continue;
      }

      // Delete all demo data from demo collection
      const count = await db.collection(name).countDocuments();
      if (count > 0) {
        await db.collection(name).deleteMany({});
        totalDeleted += count;
        console.log(`🧹 CLEANED COLLECTION: '${name}' — Deleted ${count} demo documents.`);
        report.push({ collection: name, status: 'CLEANED', deletedCount: count });
      } else {
        console.log(`ℹ️ COLLECTION '${name}' is already empty.`);
        report.push({ collection: name, status: 'ALREADY_EMPTY', deletedCount: 0 });
      }
    }

    // Also ensure all registered Mongoose models for demo data are emptied
    const demoModels = ['Property', 'Customer', 'Lead', 'Booking', 'Invoice', 'Agreement', 'SiteVisit', 'Brokerage', 'Followup', 'PropertyUnit', 'RecommendationShare', 'ApprovalRequest', 'Payment'];
    for (const mName of demoModels) {
      try {
        if (mongoose.models[mName]) {
          await mongoose.models[mName].deleteMany({});
        }
      } catch (e) {}
    }

    // Reset Memory Database Store
    if (dbStore && dbStore.data) {
      dbStore.data.customers = [];
      dbStore.data.properties = [];
      dbStore.data.leads = [];
      dbStore.data.bookings = [];
      dbStore.data.invoices = [];
      dbStore.data.agreements = [];
      dbStore.data.site_visits = [];
      dbStore.data.followups = [];
      dbStore.data.brokerage_records = [];
      dbStore.data.property_units = [];
      dbStore.data.property_price_history = [];
      dbStore.data.property_shares = [];
      dbStore.data.recommendation_shares = [];
      dbStore.data.approval_requests = [];
      dbStore.data.security_alerts = [];
      dbStore.data.audit_logs = [];
      dbStore.data.payments = [];
      dbStore.data.marketing_campaigns = [];
      dbStore.data.employee_activities = [];
      dbStore.data.projects = [];
      dbStore.data.builders = [];
      dbStore.data.units = [];
      dbStore.data.commissions = [];
      dbStore.data.fraud_alerts = [];
      dbStore.data.lead_transfers = [];
    }

    console.log(`\n======================================================`);
    console.log(`🎉 MONGODB DEMO DATA CLEANUP COMPLETED!`);
    console.log(`Total Demo Records Removed across all collections: ${totalDeleted}`);
    console.log(`Super Admin & User Profiles: 100% PRESERVED AND ACTIVE`);
    console.log(`======================================================\n`);

    return { success: true, totalDeleted, report };
  } catch (err: any) {
    console.error(`❌ MongoDB Demo Cleanup Failed:`, err.message);
    throw err;
  }
};

if (process.argv[1] && (process.argv[1].endsWith('cleanMongoDemoData.ts') || process.argv[1].endsWith('cleanMongoDemoData.js'))) {
  cleanMongoDBDemoData().then(() => process.exit(0)).catch(() => process.exit(1));
}
