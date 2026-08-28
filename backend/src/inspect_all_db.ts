import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';

async function main() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(mongoURI);
  console.log('Connected!');

  if (!mongoose.connection.db) {
    console.log('DB connection object undefined');
    return;
  }

  const collections = await mongoose.connection.db.listCollections().toArray();
  console.log('--- ALL COLLECTIONS ---');
  for (const c of collections) {
    const docs = await mongoose.connection.db.collection(c.name).find({}).toArray();
    console.log(`\n=== Collection: ${c.name} (${docs.length} docs) ===`);
    console.log(JSON.stringify(docs, null, 2));
  }

  await mongoose.disconnect();
}

main().catch(console.error);
