import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swaramayi_crm';
  
  try {
    console.log(`🔌 Attempting MongoDB connection: ${mongoURI}`);
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000
    });
    console.log(`✅ Connected to MongoDB successfully! Database: swaramayi_crm`);
    return true;
  } catch (err: any) {
    console.warn(`⚠️ Local MongoDB service not active on 27017. Falling back to embedded file database (db.json).`);
    return false;
  }
};
