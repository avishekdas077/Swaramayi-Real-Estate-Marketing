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
export const SourcingRequestSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);
export const DeveloperSchema = new mongoose.Schema({ id: { type: String, unique: true } }, options);

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
export const SourcingRequestModel = mongoose.models.SourcingRequest || mongoose.model('SourcingRequest', SourcingRequestSchema);
export const DeveloperModel = mongoose.models.Developer || mongoose.model('Developer', DeveloperSchema);

// Helper function to sync array of records into a model (handles permanent deletions)
async function syncCollection(model: mongoose.Model<any>, records: any[]) {
  if (!records || !Array.isArray(records) || records.length === 0) {
    return;
  }

  try {
    // Extract valid record identifiers
    const validIds = records.map(r => r.id).filter(Boolean);
    const validCustNums = records.map(r => r.customer_number).filter(Boolean);
    const validBookingCodes = records.map(r => r.booking_code).filter(Boolean);
    const validInvoiceNums = records.map(r => r.invoice_number).filter(Boolean);
    const validAgreementCodes = records.map(r => r.agreement_code).filter(Boolean);
    const validPvaIds = records.map(r => r.projectVisitAgreementId || r.pvaId).filter(Boolean);
    const validCostSheetIds = records.map(r => r.costSheetId).filter(Boolean);

    // Delete records from MongoDB Atlas that were permanently deleted in CRM
    const deleteConditions: any[] = [];
    if (validIds.length > 0) deleteConditions.push({ id: { $nin: validIds } });
    if (validCustNums.length > 0) deleteConditions.push({ customer_number: { $nin: validCustNums } });
    if (validBookingCodes.length > 0) deleteConditions.push({ booking_code: { $nin: validBookingCodes } });
    if (validInvoiceNums.length > 0) deleteConditions.push({ invoice_number: { $nin: validInvoiceNums } });
    if (validAgreementCodes.length > 0) deleteConditions.push({ agreement_code: { $nin: validAgreementCodes } });
    if (validPvaIds.length > 0) deleteConditions.push({ projectVisitAgreementId: { $nin: validPvaIds }, pvaId: { $nin: validPvaIds } });
    if (validCostSheetIds.length > 0) deleteConditions.push({ costSheetId: { $nin: validCostSheetIds } });

    if (deleteConditions.length > 0) {
      await model.deleteMany({ $and: deleteConditions });
    }

    // Upsert remaining active records
    const ops = records.map(rec => {
      const filter = rec.id 
        ? { id: rec.id } 
        : (rec.customer_number ? { customer_number: rec.customer_number } 
        : (rec.booking_code ? { booking_code: rec.booking_code } 
        : (rec.invoice_number ? { invoice_number: rec.invoice_number } 
        : (rec.agreement_code ? { agreement_code: rec.agreement_code } 
        : (rec.costSheetId ? { costSheetId: rec.costSheetId } 
        : (rec.projectVisitAgreementId ? { projectVisitAgreementId: rec.projectVisitAgreementId } 
        : (rec.team_name ? { team_name: rec.team_name } 
        : (rec.branch_name ? { branch_name: rec.branch_name } : rec))))))));
      
      return {
        updateOne: {
          filter,
          update: { $set: rec },
          upsert: true
        }
      };
    });

    if (ops.length > 0) {
      await model.bulkWrite(ops);
    }
  } catch (err: any) {
    console.warn(`MongoDB Sync Note [${model.modelName}]:`, err.message);
  }
}

// Sync memory data to MongoDB Atlas
export async function syncToMongoDB(data: any) {
  if (mongoose.connection.readyState !== 1) {
    return;
  }

  try {
    if (Array.isArray(data.users)) await syncCollection(UserModel, data.users);
    if (Array.isArray(data.properties)) await syncCollection(PropertyModel, data.properties);
    if (Array.isArray(data.customers)) await syncCollection(CustomerModel, data.customers);
    if (Array.isArray(data.leads)) await syncCollection(LeadModel, data.leads);
    if (Array.isArray(data.bookings)) await syncCollection(BookingModel, data.bookings);
    if (Array.isArray(data.invoices)) await syncCollection(InvoiceModel, data.invoices);
    if (Array.isArray(data.agreements)) await syncCollection(AgreementModel, data.agreements);
    if (Array.isArray(data.site_visits)) await syncCollection(SiteVisitModel, data.site_visits);
    if (Array.isArray(data.brokerage_records)) await syncCollection(BrokerageModel, data.brokerage_records);
    if (Array.isArray(data.followups)) await syncCollection(FollowupModel, data.followups);
    if (Array.isArray(data.teams)) await syncCollection(TeamModel, data.teams);
    if (Array.isArray(data.branches)) await syncCollection(BranchModel, data.branches);
    if (Array.isArray(data.cost_sheets)) await syncCollection(CostSheetModel, data.cost_sheets);
    if (Array.isArray(data.matching_requests)) await syncCollection(MatchingRequestModel, data.matching_requests);
    if (Array.isArray(data.pva_agreements)) await syncCollection(ProjectVisitAgreementModel, data.pva_agreements);
    if (Array.isArray(data.sourcing_requests)) await syncCollection(SourcingRequestModel, data.sourcing_requests);
    if (Array.isArray(data.developers)) await syncCollection(DeveloperModel, data.developers);

    console.log(`⚡ MongoDB Atlas Live Sync Complete with Permanent Deletion Support`);
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
    const mongoSourcingRequests = await SourcingRequestModel.find({}).lean();
    const mongoDevelopers = await DeveloperModel.find({}).lean();

    console.log(`📥 Loaded existing data from MongoDB Atlas: ${mongoUsers.length} users, ${mongoTeams.length} teams, ${mongoBranches.length} branches, ${mongoProperties.length} properties, ${mongoCustomers.length} customers, ${mongoDevelopers.length} developers`);

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
      pva_agreements: mongoPvaAgreements,
      sourcing_requests: mongoSourcingRequests,
      developers: mongoDevelopers
    };
  } catch (e: any) {
    console.warn('MongoDB Data Loading Warning:', e.message);
    return null;
  }
}
