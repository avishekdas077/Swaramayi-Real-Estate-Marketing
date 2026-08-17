import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/swaramayi_crm';

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

export const seedMongoDB = async () => {
  try {
    console.log(`🔌 Connecting to MongoDB at ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log(`✅ Connected to MongoDB! Database: swaramayi_crm`);

    // Load data from db.json
    const dbFilePath = path.join(process.cwd(), 'src', 'db', 'db.json');
    if (fs.existsSync(dbFilePath)) {
      const rawData = fs.readFileSync(dbFilePath, 'utf-8');
      const db = JSON.parse(rawData);

      if (db.users) {
        await UserModel.deleteMany({});
        await UserModel.insertMany(db.users);
        console.log(`📥 Seeded ${db.users.length} Users into MongoDB 'users' collection`);
      }

      if (db.properties) {
        await PropertyModel.deleteMany({});
        await PropertyModel.insertMany(db.properties);
        console.log(`📥 Seeded ${db.properties.length} Properties into MongoDB 'properties' collection`);
      }

      if (db.customers) {
        await CustomerModel.deleteMany({});
        await CustomerModel.insertMany(db.customers);
        console.log(`📥 Seeded ${db.customers.length} Customers into MongoDB 'customers' collection`);
      }

      if (db.bookings) {
        await BookingModel.deleteMany({});
        await BookingModel.insertMany(db.bookings);
        console.log(`📥 Seeded ${db.bookings.length} Bookings into MongoDB 'bookings' collection`);
      }

      if (db.invoices) {
        await InvoiceModel.deleteMany({});
        await InvoiceModel.insertMany(db.invoices);
        console.log(`📥 Seeded ${db.invoices.length} Invoices into MongoDB 'invoices' collection`);
      }

      if (db.agreements) {
        await AgreementModel.deleteMany({});
        await AgreementModel.insertMany(db.agreements);
        console.log(`📥 Seeded ${db.agreements.length} Agreements into MongoDB 'agreements' collection`);
      }
    }

    console.log(`🎉 MongoDB Master Dataset Seeding Completed Successfully!`);
  } catch (err: any) {
    console.error(`❌ MongoDB Seeding Error:`, err.message);
  }
};

if (require.main === module) {
  seedMongoDB().then(() => process.exit(0));
}
