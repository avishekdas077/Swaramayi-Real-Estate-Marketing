import mongoose from 'mongoose';

// Flexible options schema for all collections
const options = { timestamps: true, strict: false };

// Mongoose Schemas & Models
export const UserSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const PropertySchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const CustomerSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const LeadSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const BookingSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const InvoiceSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const AgreementSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const SiteVisitSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const BrokerageSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const FollowupSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const TeamSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const BranchSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);

export const CostSheetSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const MatchingRequestSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const ProjectVisitAgreementSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);

export const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);
export const PropertyModel = mongoose.models.Property || mongoose.model('Property', PropertySchema);
export const CustomerModel = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);
export const LeadModel = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
export const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
export const InvoiceModel = mongoose.models.Invoice || mongoose.model('Invoice', InvoiceSchema);
export const AgreementModel = mongoose.models.Agreement || mongoose.model('Agreement', AgreementSchema);
export const SiteVisitModel = mongoose.models.SiteVisit || mongoose.model('SiteVisit', SiteVisitSchema);
export const BrokerageModel = mongoose.models.Brokerage || mongoose.model('Brokerage', BrokerageSchema);
export const FollowupModel = mongoose.models.Followup || mongoose.model('Followup', FollowupSchema);
export const TeamModel = mongoose.models.Team || mongoose.model('Team', TeamSchema);
export const BranchModel = mongoose.models.Branch || mongoose.model('Branch', BranchSchema);
export const CostSheetModel = mongoose.models.CostSheet || mongoose.model('CostSheet', CostSheetSchema);
export const MatchingRequestModel = mongoose.models.MatchingRequest || mongoose.model('MatchingRequest', MatchingRequestSchema);
export const ProjectVisitAgreementModel = mongoose.models.ProjectVisitAgreement || mongoose.model('ProjectVisitAgreement', ProjectVisitAgreementSchema);

// Helper function to upsert array of records into a model
async function upsertCollection(model: mongoose.Model<any>, records: any[]) {
  if (!records || !Array.isArray(records) || records.length === 0) return;
  const ops = records.map(rec => {
    const filter = rec.id ? { id: rec.id } : (rec.agreement_code ? { agreement_code: rec.agreement_code } : (rec.property_code ? { property_code: rec.property_code } : (rec.team_name ? { team_name: rec.team_name } : (rec.branch_name ? { branch_name: rec.branch_name } : rec))));
    return {
      updateOne: {
        filter,
        update: { $set: rec },
        upsert: true
      }
    };
  });
  try {
    await model.bulkWrite(ops);
  } catch (err: any) {
    console.warn(`MongoDB Bulk Write Note [${model.modelName}]:`, err.message);
  }
}

// Sync memory data to MongoDB Atlas
export async function syncToMongoDB(data: any) {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    if (data.users && data.users.length > 0) await upsertCollection(UserModel, data.users);
    if (data.properties && data.properties.length > 0) await upsertCollection(PropertyModel, data.properties);
    if (data.customers && data.customers.length > 0) await upsertCollection(CustomerModel, data.customers);
    if (data.leads && data.leads.length > 0) await upsertCollection(LeadModel, data.leads);
    if (data.bookings && data.bookings.length > 0) await upsertCollection(BookingModel, data.bookings);
    if (data.invoices && data.invoices.length > 0) await upsertCollection(InvoiceModel, data.invoices);
    if (data.agreements && data.agreements.length > 0) await upsertCollection(AgreementModel, data.agreements);
    if (data.site_visits && data.site_visits.length > 0) await upsertCollection(SiteVisitModel, data.site_visits);
    if (data.brokerage_records && data.brokerage_records.length > 0) await upsertCollection(BrokerageModel, data.brokerage_records);
    if (data.followups && data.followups.length > 0) await upsertCollection(FollowupModel, data.followups);
    if (data.teams && data.teams.length > 0) await upsertCollection(TeamModel, data.teams);
    if (data.branches && data.branches.length > 0) await upsertCollection(BranchModel, data.branches);
    if (data.cost_sheets && data.cost_sheets.length > 0) await upsertCollection(CostSheetModel, data.cost_sheets);
    if (data.matching_requests && data.matching_requests.length > 0) await upsertCollection(MatchingRequestModel, data.matching_requests);
    if (data.pva_agreements && data.pva_agreements.length > 0) await upsertCollection(ProjectVisitAgreementModel, data.pva_agreements);

    console.log(`⚡ MongoDB Atlas Live Sync Complete (Users, Teams, Branches, Properties, Customers, Leads, Agreements, CostSheets, Bookings, Invoices)`);
  } catch (e: any) {
    console.error('MongoDB Live Sync Error:', e.message);
  }
}

// Load existing data from MongoDB Atlas into memory store
export async function loadDataFromMongoDB() {
  if (mongoose.connection.readyState !== 1) {
    return null;
  }

  try {
    const mongoUsers = await UserModel.find({}).lean();
    const mongoProperties = await PropertyModel.find({}).lean();
    const mongoCustomers = await CustomerModel.find({}).lean();
    const mongoLeads = await LeadModel.find({}).lean();
    const mongoBookings = await BookingModel.find({}).lean();
    const mongoInvoices = await InvoiceModel.find({}).lean();
    const mongoAgreements = await AgreementModel.find({}).lean();
    const mongoSiteVisits = await SiteVisitModel.find({}).lean();
    const mongoBrokerage = await BrokerageModel.find({}).lean();
    const mongoFollowups = await FollowupModel.find({}).lean();
    const mongoTeams = await TeamModel.find({}).lean();
    const mongoBranches = await BranchModel.find({}).lean();
    const mongoCostSheets = await CostSheetModel.find({}).lean();
    const mongoMatchingRequests = await MatchingRequestModel.find({}).lean();
    const mongoPvaAgreements = await ProjectVisitAgreementModel.find({}).lean();

    console.log(`📥 Loaded existing data from MongoDB Atlas: ${mongoUsers.length} users, ${mongoTeams.length} teams, ${mongoBranches.length} branches, ${mongoProperties.length} properties, ${mongoCustomers.length} customers`);

    return {
      users: mongoUsers.length > 0 ? mongoUsers : null,
      properties: mongoProperties,
      customers: mongoCustomers,
      leads: mongoLeads,
      bookings: mongoBookings,
      invoices: mongoInvoices,
      agreements: mongoAgreements,
      site_visits: mongoSiteVisits,
      brokerage_records: mongoBrokerage,
      followups: mongoFollowups,
      teams: mongoTeams.length > 0 ? mongoTeams : null,
      branches: mongoBranches.length > 0 ? mongoBranches : null,
      cost_sheets: mongoCostSheets,
      matching_requests: mongoMatchingRequests,
      pva_agreements: mongoPvaAgreements
    };
  } catch (e: any) {
    console.warn('MongoDB Data Loading Warning:', e.message);
    return null;
  }
}
