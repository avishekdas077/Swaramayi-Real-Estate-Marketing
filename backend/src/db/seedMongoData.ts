import dns from 'dns';
try { dns.setServers(['8.8.8.8', '1.1.1.1', '8.8.4.4']); } catch (e) {}
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { 
  PropertyModel, 
  CustomerModel, 
  LeadModel, 
  MatchingRequestModel, 
  DeveloperModel, 
  TeamModel, 
  BranchModel,
  SourcingRequestModel
} from './mongoPersistence.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';

export const seedMongoDBData = async () => {
  try {
    const maskedURI = mongoURI.replace(/:([^@]+)@/, ':*****@');
    console.log(`🔌 Connecting to MongoDB Atlas Cluster for Clean Setup: ${maskedURI}`);

    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000
    });

    console.log(`✅ Connected to MongoDB Atlas! Database: ${mongoose.connection.db?.databaseName}`);

    // CLEAR ALL LEADS FROM MONGODB ATLAS
    await LeadModel.deleteMany({});
    console.log(`🧹 Cleared all leads from MongoDB Atlas!`);

    console.log(`\n======================================================`);
    console.log(`🎉 MONGODB ATLAS CLEANUP COMPLETED! LEADS COLLECTION IS 100% EMPTY.`);
    console.log(`======================================================\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err: any) {
    console.error('❌ Error updating MongoDB Atlas data:', err.message);
    process.exit(1);
  }
};

seedMongoDBData();
