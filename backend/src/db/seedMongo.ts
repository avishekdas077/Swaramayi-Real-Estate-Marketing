import dns from 'dns';
try { dns.setServers(['8.8.8.8', '1.1.1.1']); } catch (e) {}
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { dbStore } from './database.js';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';

// Define Mongoose Schemas for All Collections
const UserSchema = new mongoose.Schema({ id: String, username: String, full_name: String, email: String, mobile: String, role: String, branch_name: String, department: String, team_name: String, is_active: Boolean }, { timestamps: true });
const PropertySchema = new mongoose.Schema({ id: String, property_code: String, title: String, type: String, developer: String, project: String, tower: String, floor: Number, unit: String, configuration: String, carpet_area: String, facing: String, final_price: String, base_price: String, status: String, locality: String, map_x: Number, map_y: Number, latitude: String, longitude: String, owner_phone: String, price_sqft: String }, { timestamps: true });
const CustomerSchema = new mongoose.Schema({ id: String, customer_number: String, name: String, mobile: String, email: String, budget: String, preferredArea: String, configuration: String, status: String, priority: String, assigned_agent: String, score: Number, source: String }, { timestamps: true });
const BookingSchema = new mongoose.Schema({ id: String, booking_code: String, customer_name: String, property_title: String, developer: String, booking_value: String, brokerage_expected: String, brokerage_received: String, status: String, payment_status: String }, { timestamps: true });
const InvoiceSchema = new mongoose.Schema({ id: String, invoice_number: String, customer_name: String, developer_name: String, property_title: String, agreement_value: String, taxable_value: Number, cgst_amount: Number, sgst_amount: Number, total_invoice_amount: Number, payment_status: String }, { timestamps: true });
const AgreementSchema = new mongoose.Schema({ id: String, agreement_code: String, agreement_type: String, title: String, party_name: String, party_contact: String, property_details: String, signed_status: String, signature_hash: String, signed_at: String }, { timestamps: true });

const UserModel = mongoose.model('User', UserSchema);
const PropertyModel = mongoose.model('Property', PropertySchema);
const CustomerModel = mongoose.model('Customer', CustomerSchema);
const BookingModel = mongoose.model('Booking', BookingSchema);
const InvoiceModel = mongoose.model('Invoice', InvoiceSchema);
const AgreementModel = mongoose.model('Agreement', AgreementSchema);

const sampleProperties: any[] = [];
const sampleCustomers: any[] = [];
const sampleBookings: any[] = [];
const sampleInvoices: any[] = [];
const sampleAgreements: any[] = [];

export const seedMongoDB = async () => {
  try {
    console.log(`🔌 Connecting to MongoDB at ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log(`✅ Connected to MongoDB! Database: swaramayi_crm`);

    const db = dbStore.data;

    if (db.users && db.users.length > 0) {
      // Preserve Users (Super Admin and user profiles)
      console.log(`🔒 Preserving ${db.users.length} User accounts & profiles in 'users' collection.`);
    }

    await PropertyModel.deleteMany({});
    console.log(`🧹 Cleaned MongoDB 'properties' collection`);

    await CustomerModel.deleteMany({});
    console.log(`🧹 Cleaned MongoDB 'customers' collection`);

    await BookingModel.deleteMany({});
    console.log(`🧹 Cleaned MongoDB 'bookings' collection`);

    await InvoiceModel.deleteMany({});
    console.log(`🧹 Cleaned MongoDB 'invoices' collection`);

    await AgreementModel.deleteMany({});
    console.log(`🧹 Cleaned MongoDB 'agreements' collection`);

    console.log(`🎉 MongoDB Demo Data Clean Completed (Users & Super Admin Intact)!`);
  } catch (err: any) {
    console.error(`❌ MongoDB Seeding Error:`, err.message);
  }
};

if (process.argv[1] && (process.argv[1].endsWith('seedMongo.ts') || process.argv[1].endsWith('seedMongo.js'))) {
  seedMongoDB().then(() => process.exit(0));
}
