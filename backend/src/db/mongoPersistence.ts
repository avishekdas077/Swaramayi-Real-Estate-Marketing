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
  if (!records || !Array.isArray(records)) {
    return;
  }

  try {
    if (records.length === 0) {
      // All records were deleted by user in CRM -> wipe database collection
      await model.deleteMany({});
      return;
    }

    // Extract valid record identifiers
    const validIds: string[] = [];
    const validMongoIds: any[] = [];

    records.forEach((r: any) => {
      if (r._id) validMongoIds.push(r._id);
      if (r.id) validIds.push(String(r.id));
      if (r.booking_code) validIds.push(String(r.booking_code));
      if (r.invoice_number) validIds.push(String(r.invoice_number));
      if (r.agreement_code) validIds.push(String(r.agreement_code));
      if (r.customer_number) validIds.push(String(r.customer_number));
      if (r.property_code) validIds.push(String(r.property_code));
      if (r.lead_number) validIds.push(String(r.lead_number));
      if (r.costSheetId) validIds.push(String(r.costSheetId));
      if (r.projectVisitAgreementId) validIds.push(String(r.projectVisitAgreementId));
      if (r.pvaId) validIds.push(String(r.pvaId));
      if (r.visitId) validIds.push(String(r.visitId));
      if (r.visitScheduleId) validIds.push(String(r.visitScheduleId));
      if (r.visitPlanId) validIds.push(String(r.visitPlanId));
      if (r.planId) validIds.push(String(r.planId));
      if (r.requestId) validIds.push(String(r.requestId));
      if (r.selectionId) validIds.push(String(r.selectionId));
      if (r.team_name) validIds.push(String(r.team_name));
      if (r.branch_name) validIds.push(String(r.branch_name));
      if (r.name) validIds.push(String(r.name));
    });

    const orConditions: any[] = [];
    if (validIds.length > 0) {
      orConditions.push({ id: { $in: validIds } });
      orConditions.push({ booking_code: { $in: validIds } });
      orConditions.push({ invoice_number: { $in: validIds } });
      orConditions.push({ agreement_code: { $in: validIds } });
      orConditions.push({ customer_number: { $in: validIds } });
      orConditions.push({ property_code: { $in: validIds } });
      orConditions.push({ lead_number: { $in: validIds } });
      orConditions.push({ costSheetId: { $in: validIds } });
      orConditions.push({ projectVisitAgreementId: { $in: validIds } });
      orConditions.push({ pvaId: { $in: validIds } });
      orConditions.push({ visitId: { $in: validIds } });
      orConditions.push({ visitScheduleId: { $in: validIds } });
      orConditions.push({ visitPlanId: { $in: validIds } });
      orConditions.push({ planId: { $in: validIds } });
      orConditions.push({ requestId: { $in: validIds } });
      orConditions.push({ selectionId: { $in: validIds } });
      orConditions.push({ team_name: { $in: validIds } });
      orConditions.push({ branch_name: { $in: validIds } });
      orConditions.push({ name: { $in: validIds } });
    }
    if (validMongoIds.length > 0) {
      orConditions.push({ _id: { $in: validMongoIds } });
    }

    // Delete records from MongoDB Atlas that are no longer present in CRM
    if (orConditions.length > 0) {
      await model.deleteMany({ $nor: orConditions });
    } else {
      await model.deleteMany({});
    }

    // Upsert remaining active records
    const ops = records.map(rec => {
      const filter: any = rec.id 
        ? { id: rec.id } 
        : (rec.visitId ? { visitId: rec.visitId }
        : (rec.visitScheduleId ? { visitScheduleId: rec.visitScheduleId }
        : (rec.visitPlanId ? { visitPlanId: rec.visitPlanId }
        : (rec.planId ? { planId: rec.planId }
        : (rec.booking_code ? { booking_code: rec.booking_code } 
        : (rec.invoice_number ? { invoice_number: rec.invoice_number } 
        : (rec.agreement_code ? { agreement_code: rec.agreement_code } 
        : (rec.customer_number ? { customer_number: rec.customer_number } 
        : (rec.property_code ? { property_code: rec.property_code } 
        : (rec.lead_number ? { lead_number: rec.lead_number } 
        : (rec.costSheetId ? { costSheetId: rec.costSheetId } 
        : (rec.projectVisitAgreementId ? { projectVisitAgreementId: rec.projectVisitAgreementId } 
        : (rec.team_name ? { team_name: rec.team_name } 
        : (rec.branch_name ? { branch_name: rec.branch_name } 
        : (rec.name ? { name: rec.name } : rec)))))))))))))));
      
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
