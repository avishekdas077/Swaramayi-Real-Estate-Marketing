import mongoose from 'mongoose';
import dns from 'dns';

try {
  dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']);
} catch (e) {}

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';
  
  try {
    const maskedURI = mongoURI.replace(/:([^@]+)@/, ':*****@');
    console.log(`🔌 Connecting to MongoDB Atlas Cluster: ${maskedURI}`);
    
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000
    });
    
    console.log(`✅ Connected to MongoDB Atlas Cluster0 (cluster0.fathkrm.mongodb.net) successfully! Database: swaramayi_crm`);
    return true;
  } catch (err: any) {
    console.warn(`⚠️ MongoDB Atlas Connection Note: ${err.message}`);
    return false;
  }
};
