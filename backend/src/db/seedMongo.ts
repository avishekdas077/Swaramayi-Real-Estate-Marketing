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

const sampleProperties = [
  { id: 'PROP-01', property_code: 'SRM-PROP-2026-000421', title: 'Aparna Zenon Premium 3BHK Residence', type: 'Apartment', developer: 'Aparna Constructions', project: 'Aparna Zenon', tower: 'Tower A', floor: 5, unit: 'A-504', configuration: '3BHK', carpet_area: '1,450 sq.ft.', facing: 'East', final_price: '₹84 Lakhs', base_price: '₹85 Lakhs', status: 'AVAILABLE', locality: 'Kondapur', map_x: 45, map_y: 35, latitude: '17.4612', longitude: '78.3689', owner_phone: '+91 40 2335 8888', price_sqft: '₹5,862 / sq.ft.' },
  { id: 'PROP-02', property_code: 'SRM-PROP-2026-000422', title: 'Financial Towers Luxury 4BHK Sky Suite', type: 'Penthouse', developer: 'My Home Group', project: 'Financial Towers', tower: 'Tower B', floor: 12, unit: 'B-1202', configuration: '4BHK', carpet_area: '2,400 sq.ft.', facing: 'North-East', final_price: '₹2.08 Crores', base_price: '₹2.10 Crores', status: 'AVAILABLE', locality: 'Financial District', map_x: 28, map_y: 55, latitude: '17.4401', longitude: '78.3489', owner_phone: '+91 40 6688 9999', price_sqft: '₹8,750 / sq.ft.' },
  { id: 'PROP-03', property_code: 'SRM-PROP-2026-000423', title: 'My Home Jewel Executive 2BHK Flat', type: 'Apartment', developer: 'My Home Group', project: 'My Home Jewel', tower: 'Block C', floor: 3, unit: 'C-308', configuration: '2BHK', carpet_area: '1,245 sq.ft.', facing: 'North', final_price: '₹68 Lakhs', base_price: '₹69 Lakhs', status: 'AVAILABLE', locality: 'Madinaguda', map_x: 32, map_y: 20, latitude: '17.4921', longitude: '78.3412', owner_phone: '+91 40 6688 1111', price_sqft: '₹5,542 / sq.ft.' },
  { id: 'PROP-04', property_code: 'SRM-PROP-2026-000424', title: 'Jayabheri Silicon County Ultra Villa', type: 'Villa', developer: 'Jayabheri Properties', project: 'Silicon County', tower: 'Villa 14', floor: 2, unit: 'V-14', configuration: '5BHK Villa', carpet_area: '4,200 sq.ft.', facing: 'East', final_price: '₹4.50 Crores', base_price: '₹4.60 Crores', status: 'BOOKED', locality: 'Hitec City', map_x: 58, map_y: 42, latitude: '17.4478', longitude: '78.3789', owner_phone: '+91 40 2311 5555', price_sqft: '₹10,952 / sq.ft.' },
  { id: 'PROP-05', property_code: 'SRM-PROP-2026-000425', title: 'Prestige High Fields Corner 3BHK', type: 'Apartment', developer: 'Prestige Estates', project: 'Prestige High Fields', tower: 'Tower 8', floor: 18, unit: 'T8-1804', configuration: '3BHK', carpet_area: '1,725 sq.ft.', facing: 'East', final_price: '₹1.35 Crores', base_price: '₹1.38 Crores', status: 'HOLD', locality: 'Nanakramguda', map_x: 22, map_y: 65, latitude: '17.4201', longitude: '78.3410', owner_phone: '+91 40 4477 8888', price_sqft: '₹7,826 / sq.ft.' }
];

const sampleCustomers = [
  { id: 'CUS-01', customer_number: 'SRM-CUS-2026-000184', name: 'Rohan Deshmukh', mobile: '+91 98490 11223', email: 'rohan.d@gmail.com', budget: '₹70L - ₹85L', preferredArea: 'Kondapur', configuration: '3BHK', status: 'INTERESTED', priority: 'HOT', assigned_agent: 'Priya Nair', score: 88, source: 'Facebook Ads' },
  { id: 'CUS-02', customer_number: 'SRM-CUS-2026-000185', name: 'Vikramaditya Roy', mobile: '+91 98490 55443', email: 'vikram.roy@techmail.com', budget: '₹1.5Cr - ₹2.2Cr', preferredArea: 'Financial District', configuration: '4BHK', status: 'CALL_BACK_LATER', priority: 'HOT', assigned_agent: 'Priya Nair', score: 94, source: 'Google Ads' },
  { id: 'CUS-03', customer_number: 'SRM-CUS-2026-000186', name: 'Sumanth Varma', mobile: '+91 98490 88888', email: 'sumanth.varma@gmail.com', budget: '₹1.2Cr - ₹1.8Cr', preferredArea: 'Kondapur', configuration: '3BHK', status: 'MATCHING_PENDING', priority: 'WARM', assigned_agent: 'Ramesh Pawar', score: 82, source: 'Walk-in' },
  { id: 'CUS-04', customer_number: 'SRM-CUS-2026-000187', name: 'Avishek Das', mobile: '9432328947', email: 'avishek@gmail.com', budget: '₹50L - ₹60L', preferredArea: 'Madhyamgram', configuration: '3BHK', status: 'MATCHING_PENDING', priority: 'HOT', assigned_agent: 'Priya Nair', score: 90, source: 'Referral' }
];

const sampleBookings = [
  { id: 'BKG-01', booking_code: 'SRM-BKG-2026-000201', customer_name: 'Rohan Deshmukh', property_title: 'Aparna Zenon Premium 3BHK Residence', developer: 'Aparna Constructions', booking_value: '₹84 Lakhs', brokerage_expected: '₹1,68,000', brokerage_received: '₹1,68,000', status: 'CONFIRMED', payment_status: 'PAID' },
  { id: 'BKG-02', booking_code: 'SRM-BKG-2026-000202', customer_name: 'Jayabheri Silicon County Ultra Villa', property_title: 'Jayabheri Silicon County Ultra Villa', developer: 'Jayabheri Properties', booking_value: '₹4.50 Crores', brokerage_expected: '₹9,00,00,000', brokerage_received: '₹4,50,000', status: 'PENDING_APPROVAL', payment_status: 'PARTIAL' }
];

const sampleInvoices = [
  { id: 'INV-01', invoice_number: 'SRM-INV-2026-000401', customer_name: 'Rohan Deshmukh', developer_name: 'Aparna Constructions', property_title: 'Aparna Zenon Premium 3BHK Residence', agreement_value: '₹84 Lakhs', taxable_value: 168000, cgst_amount: 15120, sgst_amount: 15120, total_invoice_amount: 198240, payment_status: 'PAID_SETTLED' }
];

const sampleAgreements = [
  { id: 'AGR-01', agreement_code: 'SRM-AGR-CUS-2026-000301', agreement_type: 'CUSTOMER_SITE_VISIT', title: 'Site Visit Exclusivity & Brokerage Protocol Agreement', party_name: 'Rohan Deshmukh', party_contact: '+91 98490 11223', property_details: 'Aparna Zenon 3BHK Unit A-504', signed_status: 'EXECUTED_SIGNED', signature_hash: '0x8f2a4b1c9d3e5f7a', signed_at: '2026-08-24 11:30 AM' }
];

export const seedMongoDB = async () => {
  try {
    console.log(`🔌 Connecting to MongoDB at ${mongoURI}...`);
    await mongoose.connect(mongoURI);
    console.log(`✅ Connected to MongoDB! Database: swaramayi_crm`);

    const db = dbStore.data;

    if (db.users) {
      await UserModel.deleteMany({});
      await UserModel.insertMany(db.users);
      console.log(`📥 Seeded ${db.users.length} Users into MongoDB 'users' collection`);
    }

    await PropertyModel.deleteMany({});
    await PropertyModel.insertMany(sampleProperties);
    console.log(`📥 Seeded ${sampleProperties.length} Properties into MongoDB 'properties' collection`);

    await CustomerModel.deleteMany({});
    await CustomerModel.insertMany(sampleCustomers);
    console.log(`📥 Seeded ${sampleCustomers.length} Customers into MongoDB 'customers' collection`);

    await BookingModel.deleteMany({});
    await BookingModel.insertMany(sampleBookings);
    console.log(`📥 Seeded ${sampleBookings.length} Bookings into MongoDB 'bookings' collection`);

    await InvoiceModel.deleteMany({});
    await InvoiceModel.insertMany(sampleInvoices);
    console.log(`📥 Seeded ${sampleInvoices.length} Invoices into MongoDB 'invoices' collection`);

    await AgreementModel.deleteMany({});
    await AgreementModel.insertMany(sampleAgreements);
    console.log(`📥 Seeded ${sampleAgreements.length} Agreements into MongoDB 'agreements' collection`);

    console.log(`🎉 MongoDB Master Dataset Seeding Completed Successfully!`);
  } catch (err: any) {
    console.error(`❌ MongoDB Seeding Error:`, err.message);
  }
};

if (process.argv[1] && (process.argv[1].endsWith('seedMongo.ts') || process.argv[1].endsWith('seedMongo.js'))) {
  seedMongoDB().then(() => process.exit(0));
}
