import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';

async function main() {
  console.log('🔌 Connecting to MongoDB Atlas...');
  await mongoose.connect(mongoURI);
  console.log('✅ Connected to MongoDB Atlas!');

  if (!mongoose.connection.db) {
    console.log('DB connection object undefined');
    return;
  }

  const db = mongoose.connection.db;

  const targetCollections = [
    'customers',
    'matchingrequests',
    'costsheets',
    'leads',
    'sitevisits',
    'projectvisitagreements',
    'invoices',
    'bookings',
    'agreements',
    'followups',
    'brokerages',
    'sourcingrequests'
  ];

  console.log('🧹 Cleaning collections...');
  for (const colName of targetCollections) {
    try {
      const exists = await db.listCollections({ name: colName }).hasNext();
      if (exists) {
        const res = await db.collection(colName).deleteMany({});
        console.log(`🗑️ Deleted ${res.deletedCount} documents from '${colName}'`);
      }
    } catch (err) {
      console.error(`Error cleaning ${colName}:`, err);
    }
  }

  console.log('\n--- ALL COLLECTIONS STATUS AFTER CLEANUP ---');
  const collections = await db.listCollections().toArray();
  for (const c of collections) {
    const count = await db.collection(c.name).countDocuments();
    console.log(`Collection '${c.name}': ${count} docs`);
  }

  await mongoose.disconnect();
  console.log('✅ MongoDB Atlas Clean Finished.');
}

main().catch(console.error);

