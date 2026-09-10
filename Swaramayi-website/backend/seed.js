const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const User = require('./models/User');
const Admin = require('./models/Admin');
const Property = require('./models/Property');
const Project = require('./models/Project');
const Location = require('./models/Location');
const Agent = require('./models/Agent');
const File = require('./models/File');
const Testimonial = require('./models/Testimonial');
const Amenity = require('./models/Amenity');
const Category = require('./models/Category');
const City = require('./models/City');
const Developer = require('./models/Developer');
const Society = require('./models/Society');
const Phase = require('./models/Phase');
const Enquiry = require('./models/Enquiry');
const SiteVisit = require('./models/SiteVisit');
const ContactMessage = require('./models/ContactMessage');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://avishekdas075_db_user:11to1FBkkfSvKsse@cluster0.fathkrm.mongodb.net/swaramayi_crm?retryWrites=true&w=majority';
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected for Seeding...');
  } catch (err) {
    console.error('DB Connection error:', err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  await connectDB();

  console.log('Clearing old data across all collections...');
  await User.deleteMany({});
  await Admin.deleteMany({});
  await Property.deleteMany({});
  await Project.deleteMany({});
  await Location.deleteMany({});
  await Agent.deleteMany({});
  await File.deleteMany({});
  await Testimonial.deleteMany({});
  await Amenity.deleteMany({});
  await Category.deleteMany({});
  await City.deleteMany({});
  await Developer.deleteMany({});
  await Society.deleteMany({});
  await Phase.deleteMany({});
  await Enquiry.deleteMany({});
  await SiteVisit.deleteMany({});
  await ContactMessage.deleteMany({});

  console.log('Creating Admin Account...');
  const admin = await Admin.create({
    name: 'Swarnamayi Admin',
    email: 'admin@swarnamayi.com',
    password: 'Admin@123456',
    role: 'admin',
  });

  console.log('Creating Demo User Account...');
  const demoUser = await User.create({
    name: 'Demouser Kolkata',
    email: 'user@swarnamayi.com',
    password: 'Admin@123456',
    role: 'user',
  });

  console.log('Creating Real Estate Agents...');
  const agent1 = await Agent.create({
    name: 'Aritra Sen',
    phone: '+91 98300 12345',
    email: 'aritra.sen@swarnamayi.com',
    designation: 'Senior Property Advisor - New Town & Rajarhat',
    experience: '8 Years in Kolkata Real Estate',
  });

  const agent2 = await Agent.create({
    name: 'Priyanka Banerjee',
    phone: '+91 98311 67890',
    email: 'priyanka.banerjee@swarnamayi.com',
    designation: 'Luxury Homes Consultant - South Kolkata',
    experience: '10 Years in Kolkata High-End Residential',
  });

  const agent3 = await Agent.create({
    name: 'Sourav Ganguly',
    phone: '+91 98322 45678',
    email: 'sourav.ganguly@swarnamayi.com',
    designation: 'Commercial & Corporate Real Estate Head',
    experience: '12 Years in Commercial Realty & Retail Spaces',
  });

  const agent4 = await Agent.create({
    name: 'Ananya Roy',
    phone: '+91 98333 98765',
    email: 'ananya.roy@swarnamayi.com',
    designation: 'NRI & Luxury Property Advisor',
    experience: '7 Years in Luxury Villa & Sky Penthouse Sales',
  });

  console.log('Creating Cities...');
  await City.insertMany([
    { name: 'Kolkata', slug: 'kolkata', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Howrah', slug: 'howrah', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Durgapur', slug: 'durgapur', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80' },
    { name: 'Siliguri', slug: 'siliguri', state: 'West Bengal', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80' },
  ]);

  console.log('Creating Categories...');
  await Category.insertMany([
    { name: 'Buy', slug: 'buy', icon: 'Building2', description: 'Residential properties for sale across Kolkata and surrounding regions.' },
    { name: 'Rent', slug: 'rent', icon: 'Key', description: 'Apartments, houses, and builder floors available for monthly rental.' },
    { name: 'Commercial', slug: 'commercial', icon: 'Briefcase', description: 'Office spaces, retail shops, showrooms, and commercial land for lease or sale.' },
    { name: 'PG', slug: 'pg', icon: 'Home', description: 'Paying guest accommodations and co-living spaces for students and professionals.' },
  ]);

  console.log('Creating Amenities...');
  await Amenity.insertMany([
    { name: 'Swimming Pool', icon: 'Waves', category: 'Leisure' },
    { name: 'Gym', icon: 'Dumbbell', category: 'Fitness' },
    { name: 'Club House', icon: 'Building', category: 'Community' },
    { name: 'Garden', icon: 'Trees', category: 'Environment' },
    { name: 'Security', icon: 'ShieldCheck', category: 'Safety' },
    { name: 'Lift', icon: 'ArrowUpCircle', category: 'Convenience' },
    { name: 'Power Backup', icon: 'Zap', category: 'Utilities' },
    { name: 'Parking', icon: 'Car', category: 'Vehicle' },
    { name: 'CCTV', icon: 'Video', category: 'Safety' },
    { name: 'Community Hall', icon: 'Users', category: 'Community' },
    { name: "Children's Play Area", icon: 'Smile', category: 'Family' },
    { name: 'Intercom', icon: 'Phone', category: 'Communication' },
    { name: 'Sky Lounge', icon: 'Cloud', category: 'Luxury' },
    { name: 'Tennis Court', icon: 'Activity', category: 'Sports' },
    { name: 'Jogging Track', icon: 'Footprints', category: 'Fitness' },
    { name: 'Indoor Games Room', icon: 'Gamepad2', category: 'Leisure' },
  ]);

  console.log('Creating Developers...');
  await Developer.insertMany([
    { name: 'Swarnamayi Realty & Partners', slug: 'swarnamayi-realty', description: 'Premier luxury developer focused on high-rise residential towers in Kolkata.', contactEmail: 'info@swarnamayi.com', contactPhone: '+91 98300 00000' },
    { name: 'Vista Infrastructure Kolkata', slug: 'vista-infrastructure', description: 'Known for sustainable green townships and eco-residences in Rajarhat.', contactEmail: 'contact@vistainfra.com', contactPhone: '+91 98311 00000' },
    { name: 'PS Group', slug: 'ps-group', description: 'One of Eastern India\'s largest and most respected real estate conglomerates.', contactEmail: 'sales@psgroup.in', contactPhone: '+91 33 6767 6767' },
    { name: 'Siddha Group', slug: 'siddha-group', description: 'Pioneers of affordable modern living and high-end skylines.', contactEmail: 'info@siddhagroup.com', contactPhone: '+91 33 4007 1500' },
    { name: 'Merlin Group', slug: 'merlin-group', description: 'Leading real estate developer with iconic residential and commercial projects across Kolkata.', contactEmail: 'sales@merlinprojects.com', contactPhone: '+91 33 4015 4500' },
  ]);

  console.log('Creating Housing Societies...');
  await Society.insertMany([
    { name: 'Swarnamayi Heights', slug: 'swarnamayi-heights', location: 'New Town', city: 'Kolkata' },
    { name: 'Royal Palms Rajarhat', slug: 'royal-palms-rajarhat', location: 'Rajarhat', city: 'Kolkata' },
    { name: 'Tech Residency', slug: 'tech-residency', location: 'Salt Lake', city: 'Kolkata' },
    { name: 'The Grand Pinnacle', slug: 'the-grand-pinnacle', location: 'EM Bypass', city: 'Kolkata' },
    { name: 'South City Towers', slug: 'south-city-towers', location: 'EM Bypass', city: 'Kolkata' },
    { name: 'Uniworld City', slug: 'uniworld-city', location: 'New Town', city: 'Kolkata' },
    { name: 'DLF Heights', slug: 'dlf-heights', location: 'Rajarhat', city: 'Kolkata' },
    { name: 'Urbana Kolkata', slug: 'urbana-kolkata', location: 'EM Bypass', city: 'Kolkata' },
  ]);

  console.log('Creating Phases...');
  await Phase.insertMany([
    { name: 'Phase 1 - Tower A & B', society: 'Swarnamayi Heights', location: 'New Town' },
    { name: 'Phase 2 - Sky Villas', society: 'Royal Palms Rajarhat', location: 'Rajarhat' },
    { name: 'Block C - Executive Suites', society: 'Tech Residency', location: 'Salt Lake' },
  ]);

  console.log('Creating Locations...');
  const locationsData = [
    {
      name: 'New Town',
      slug: 'new-town',
      city: 'Kolkata',
      popular: true,
      description: 'New Town is Kolkata\'s premier planned satellite city featuring IT hubs, eco parks, top universities, and world-class residential towers.',
      connectivity: 'Connected via Major Arterial Road, Biswa Bangla Sarani & upcoming Metro Extension.',
      schools: 'DPS New Town, St. Xavier\'s University, Narayana School.',
      hospitals: 'Tata Medical Center, Ohio Hospital, Bhagirathi Neotia Woman and Child Care Centre.',
      shopping: 'City Centre 2, Axis Mall, Downtown Mall.',
    },
    {
      name: 'Rajarhat',
      slug: 'rajarhat',
      city: 'Kolkata',
      popular: true,
      description: 'Rapidly growing residential sector in Kolkata offering modern high-rise gated communities and close proximity to Netaji Subhash Chandra Bose International Airport.',
      connectivity: '15 mins from Kolkata International Airport.',
      schools: 'National English School, Derozio Memorial College.',
      hospitals: 'Charnock Hospital, VIP Apex Hospital.',
      shopping: 'City Centre 2, Diamond Plaza.',
    },
    {
      name: 'Salt Lake',
      slug: 'salt-lake',
      city: 'Kolkata',
      popular: true,
      description: 'Bidhannagar (Salt Lake) is an upscale planned township known for lush parks, wide avenues, Sector V tech city, and premium residences.',
      connectivity: 'Green Line East-West Metro, E.M. Bypass connector.',
      schools: 'Salt Lake School, Bharatiya Vidya Bhavan.',
      hospitals: 'Apollo Multispecialty Hospitals, AMRI Hospital Salt Lake.',
      shopping: 'City Centre 1, Central Park Shopping Complex.',
    },
    {
      name: 'EM Bypass',
      slug: 'em-bypass',
      city: 'Kolkata',
      popular: true,
      description: 'Eastern Metropolitan Bypass connects North and South Kolkata, home to luxury 5-star hotels, super-specialty hospitals, and premium high-rise apartments.',
      connectivity: 'Direct access to Park Circus Connector, Ruby Crossing & Airport.',
      schools: 'Heritage School, Calcutta International School.',
      hospitals: 'Ruby General Hospital, Fortis Hospital, Desun Hospital.',
      shopping: 'Acropolis Mall, Metropolis Mall.',
    },
    {
      name: 'Ballygunge',
      slug: 'ballygunge',
      city: 'Kolkata',
      popular: true,
      description: 'One of South Kolkata\'s most prestigious elite residential neighbourhoods, famed for broad avenues, cultural landmarks, luxury apartments, and private heritage homes.',
      connectivity: 'Suburban Rail, Gariahat Crossing & Park Circus Connection.',
      schools: 'South Point High School, St. Lawrence High School.',
      hospitals: 'Ballygunge Maternity Home, Woodlands Hospital nearby.',
      shopping: 'Gariahat Market, Quest Mall.',
    },
    {
      name: 'Alipore',
      slug: 'alipore',
      city: 'Kolkata',
      popular: true,
      description: 'Kolkata\'s most affluent residential district, home to sprawling bungalows, colonial elegance, the Zoological Garden, and ultra-luxury penthouses.',
      connectivity: 'Close to Taratala Flyover & Majerhat Bridge.',
      schools: 'Army Public School, Hastings High School.',
      hospitals: 'BM Birla Heart Research Centre, Kothari Medical Centre.',
      shopping: 'Forum Courtyard, New Market nearby.',
    },
    {
      name: 'Garia',
      slug: 'garia',
      city: 'Kolkata',
      popular: true,
      description: 'Major South Kolkata hub with seamless Metro rail connectivity, offering budget to premium modern residential flats.',
      connectivity: 'Kavi Subhash Metro Terminal, Southern Bypass.',
      schools: 'BD Memoral International, Future Institute of Technology.',
      hospitals: 'Peerless Hospital, IRIS Hospital.',
      shopping: 'Metropolis Mall, Garia Market.',
    },
    {
      name: 'Tollygunge',
      slug: 'tollygunge',
      city: 'Kolkata',
      popular: true,
      description: 'Famous as the heart of Tollywood Bengali film industry, featuring Tollygunge Club golf course and premier residential apartments.',
      connectivity: 'Mahanayak Uttam Kumar Metro Station.',
      schools: 'M.P. Birla Foundation Higher Secondary School.',
      hospitals: 'RSV Hospital, Tollygunge Emergency Clinic.',
      shopping: 'South City Mall.',
    },
  ];

  await Location.insertMany(locationsData);

  console.log('Creating Sample Properties...');
  const propertiesData = [
    {
      title: '3 BHK Modern Apartment in New Town Action Area 1',
      slug: '3-bhk-modern-apartment-in-new-town-action-area-1',
      description: 'Spacious, light-filled 3 BHK apartment in a premium gated community near Axis Mall, New Town. Features 3 balconies, modular kitchen, cross ventilation, 24/7 power backup, swimming pool, and dedicated parking.',
      category: 'Buy',
      propertyType: 'Apartment',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 8500000,
      pricePerSqft: 5862,
      city: 'Kolkata',
      location: 'New Town',
      locality: 'Action Area 1',
      society: 'Swarnamayi Heights',
      developer: 'Swarnamayi Realty & Partners',
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      areaSqft: 1450,
      carpetArea: 1150,
      builtUpArea: 1380,
      floor: 8,
      totalFloors: 14,
      facing: 'North-East',
      furnishing: 'Semi-Furnished',
      parking: 'Covered',
      propertyAge: 'Under 2 Years',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000123',
      amenities: ['Swimming Pool', 'Gym', 'Club House', 'Garden', 'Security', 'Lift', 'Power Backup', 'Parking', 'CCTV', 'Community Hall'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent1._id,
      featured: true,
      verified: true,
      premium: true,
      published: true,
    },
    {
      title: 'Luxury 4 BHK Sky Villa in Rajarhat Chowmatha',
      slug: 'luxury-4-bhk-sky-villa-in-rajarhat-chowmatha',
      description: 'Exclusive 4 BHK ultra-luxury residency with private terrace deck, panoramic Kolkata skyline view, double-height ceiling living room, and Italian marble flooring.',
      category: 'Buy',
      propertyType: 'Penthouse',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 16500000,
      pricePerSqft: 6875,
      city: 'Kolkata',
      location: 'Rajarhat',
      locality: 'Chowmatha',
      society: 'Royal Palms Rajarhat',
      developer: 'Vista Infrastructure Kolkata',
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      areaSqft: 2400,
      carpetArea: 1980,
      builtUpArea: 2280,
      floor: 18,
      totalFloors: 22,
      facing: 'South-East',
      furnishing: 'Fully Furnished',
      parking: 'Covered',
      propertyAge: 'Brand New',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000456',
      amenities: ['Swimming Pool', 'Gym', 'Club House', 'Garden', 'Security', 'Lift', 'Power Backup', 'Parking', "Children's Play Area", 'Intercom', 'Sky Lounge'],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent4._id,
      featured: true,
      verified: true,
      premium: true,
      published: true,
    },
    {
      title: '2 BHK Smart Residence in Salt Lake Sector V',
      slug: '2-bhk-smart-residence-in-salt-lake-sector-v',
      description: 'Compact and intelligent 2 BHK apartment designed for IT professionals, located just 5 minutes from Sector V Metro station.',
      category: 'Buy',
      propertyType: 'Apartment',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 5200000,
      pricePerSqft: 5473,
      city: 'Kolkata',
      location: 'Salt Lake',
      locality: 'Sector V',
      society: 'Tech Residency',
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      areaSqft: 950,
      carpetArea: 760,
      builtUpArea: 900,
      floor: 5,
      totalFloors: 10,
      facing: 'East',
      furnishing: 'Semi-Furnished',
      parking: 'Covered',
      propertyAge: 'New Construction',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000789',
      amenities: ['Gym', 'Security', 'Lift', 'Power Backup', 'CCTV'],
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent2._id,
      featured: true,
      verified: true,
      published: true,
    },
    {
      title: 'Ultra Luxury 4 BHK High-Rise Flat on EM Bypass',
      slug: 'ultra-luxury-4-bhk-high-rise-flat-on-em-bypass',
      description: 'Super-premium 4 BHK apartment along EM Bypass with unhindered view of Kolkata wetlands and city skyline. Includes club house privileges and Olympic-size swimming pool.',
      category: 'Buy',
      propertyType: 'Luxury Property',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 24500000,
      pricePerSqft: 8448,
      city: 'Kolkata',
      location: 'EM Bypass',
      locality: 'Ruby Crossing',
      society: 'The Grand Pinnacle',
      developer: 'PS Group',
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      areaSqft: 2900,
      carpetArea: 2350,
      builtUpArea: 2750,
      floor: 24,
      totalFloors: 35,
      facing: 'South',
      furnishing: 'Unfurnished',
      parking: 'Covered',
      propertyAge: 'Under Construction',
      constructionStatus: 'Under Construction',
      possessionStatus: 'Dec 2026',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000999',
      amenities: ['Swimming Pool', 'Gym', 'Club House', 'Garden', 'Security', 'Lift', 'Power Backup', 'Jogging Track', 'CCTV'],
      images: [
        'https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent2._id,
      featured: true,
      verified: true,
      premium: true,
      published: true,
    },
    {
      title: 'Exclusive 5 BHK Heritage Bungalow in Ballygunge',
      slug: 'exclusive-5-bhk-heritage-bungalow-in-ballygunge',
      description: 'Rare opportunity to own an independent 5 BHK luxury bungalow in heart of Ballygunge with private lawn, drive-in parking, and peaceful surroundings.',
      category: 'Buy',
      propertyType: 'Villa',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 45000000,
      pricePerSqft: 11250,
      city: 'Kolkata',
      location: 'Ballygunge',
      locality: 'Ballygunge Circular Road',
      bedrooms: 5,
      bathrooms: 5,
      balconies: 4,
      areaSqft: 4000,
      plotArea: 3200,
      floor: 2,
      totalFloors: 2,
      facing: 'East',
      furnishing: 'Semi-Furnished',
      parking: 'Both',
      propertyAge: 'Resale',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      amenities: ['Garden', 'Security', 'Power Backup', 'Parking'],
      images: [
        'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent4._id,
      featured: true,
      verified: true,
      premium: true,
      published: true,
    },
    {
      title: 'Modern Commercial Office Space in Sector V Salt Lake',
      slug: 'modern-commercial-office-space-in-sector-v-salt-lake',
      description: 'Fully furnished 2200 sqft IT/ITeS commercial office space with 30 workstations, 2 glass cabin rooms, conference room, reception, and pantry.',
      category: 'Commercial',
      propertyType: 'Commercial Office',
      listingType: 'Rent',
      priceType: 'Monthly Rent',
      price: 135000,
      pricePerSqft: 61,
      city: 'Kolkata',
      location: 'Salt Lake',
      locality: 'Sector V',
      society: 'Tech Residency',
      bedrooms: 0,
      bathrooms: 2,
      areaSqft: 2200,
      floor: 6,
      totalFloors: 12,
      facing: 'North',
      furnishing: 'Fully Furnished',
      parking: 'Covered',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      amenities: ['Security', 'Lift', 'Power Backup', 'CCTV', 'Intercom'],
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent3._id,
      featured: false,
      verified: true,
      published: true,
    },
    {
      title: '3 BHK Premium Lakeview Flat in South City, EM Bypass',
      slug: '3-bhk-premium-lakeview-flat-in-south-city-em-bypass-sold',
      description: 'Successfully sold by Swarnamayi. High-floor 3 BHK apartment with breathtaking panoramic views of South City lake and luxury amenities.',
      category: 'Buy',
      propertyType: 'Apartment',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 13500000,
      pricePerSqft: 7500,
      city: 'Kolkata',
      location: 'EM Bypass',
      locality: 'South City',
      society: 'South City Towers',
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      areaSqft: 1800,
      floor: 16,
      totalFloors: 35,
      facing: 'South-East',
      furnishing: 'Fully Furnished',
      parking: 'Covered',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Delivered',
      reraApproved: true,
      amenities: ['Swimming Pool', 'Club House', 'Gym', 'Security', 'Lift', 'Power Backup'],
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent2._id,
      featured: false,
      verified: true,
      published: true,
      isSold: true,
    },
    {
      title: '4 BHK Luxury Sky Villa in Uniworld City, New Town',
      slug: '4-bhk-luxury-sky-villa-in-uniworld-city-new-town-sold',
      description: 'Successfully sold by Swarnamayi. Ultra-spacious sky villa featuring double-height ceiling lounge, personal deck, and 2 covered car parks.',
      category: 'Buy',
      propertyType: 'Penthouse',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 19500000,
      pricePerSqft: 7222,
      city: 'Kolkata',
      location: 'New Town',
      locality: 'Action Area 3',
      society: 'Uniworld City',
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      areaSqft: 2700,
      floor: 22,
      totalFloors: 27,
      facing: 'East',
      furnishing: 'Semi-Furnished',
      parking: 'Covered',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Delivered',
      reraApproved: true,
      amenities: ['Club House', 'Swimming Pool', 'Tennis Court', 'Security', 'Power Backup'],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent1._id,
      featured: false,
      verified: true,
      published: true,
      isSold: true,
    },
    {
      title: '2 BHK Modern Apartment in DLF IT Park Road, Rajarhat',
      slug: '2-bhk-modern-apartment-in-dlf-it-park-road-rajarhat-sold',
      description: 'Successfully sold by Swarnamayi. Well-connected 2 BHK apartment close to major IT hubs in Rajarhat.',
      category: 'Buy',
      propertyType: 'Flat',
      listingType: 'Sale',
      priceType: 'Sale Price',
      price: 6200000,
      pricePerSqft: 5636,
      city: 'Kolkata',
      location: 'Rajarhat',
      locality: 'Chowmatha',
      society: 'DLF Heights',
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      areaSqft: 1100,
      floor: 7,
      totalFloors: 14,
      facing: 'North-East',
      furnishing: 'Semi-Furnished',
      parking: 'Covered',
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Delivered',
      reraApproved: true,
      amenities: ['Gym', 'Security', 'Lift', 'Power Backup', 'CCTV'],
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1000&q=80',
      ],
      agent: agent1._id,
      featured: false,
      verified: true,
      published: true,
      isSold: true,
    },
  ];

  const seededProperties = await Property.insertMany(propertiesData);

  console.log('Creating Sample Projects...');
  const projectsData = [
    {
      name: 'Swarnamayi Sky City',
      slug: 'swarnamayi-sky-city',
      description: 'Kolkata\'s iconic twin-tower residential development featuring 3 & 4 BHK sky residences near Eco Park, New Town.',
      developer: 'Swarnamayi Realty & Partners',
      city: 'Kolkata',
      location: 'New Town',
      priceMin: 8000000,
      priceMax: 18000000,
      propertyTypes: ['Apartment', 'Penthouse'],
      bhkOptions: ['3 BHK', '4 BHK'],
      totalUnits: 280,
      constructionStatus: 'Under Construction',
      possessionStatus: 'Late 2026',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000999',
      amenities: ['Sky Lounge', 'Swimming Pool', 'Indoor Games Room', 'Gym', 'Tennis Court', 'Club House'],
      images: ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80'],
      featured: true,
      published: true,
    },
    {
      name: 'The Green Vista Rajarhat',
      slug: 'the-green-vista-rajarhat',
      description: 'Nature-infused luxury 2 & 3 BHK living with 70% open green space, natural waterbody, and clubhouse.',
      developer: 'Vista Infrastructure Kolkata',
      city: 'Kolkata',
      location: 'Rajarhat',
      priceMin: 5500000,
      priceMax: 9500000,
      propertyTypes: ['Apartment', 'Flat'],
      bhkOptions: ['2 BHK', '3 BHK'],
      totalUnits: 190,
      constructionStatus: 'New Launch',
      possessionStatus: '2027',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000888',
      amenities: ['Garden', 'Jogging Track', 'Swimming Pool', 'Indoor Games Room'],
      images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80'],
      featured: true,
      published: true,
    },
    {
      name: 'Urbana Luxury Towers',
      slug: 'urbana-luxury-towers',
      description: 'Ultra-luxurious high-rise township along EM Bypass featuring international architectural design and elite amenities.',
      developer: 'PS Group',
      city: 'Kolkata',
      location: 'EM Bypass',
      priceMin: 22000000,
      priceMax: 50000000,
      propertyTypes: ['Luxury Property', 'Penthouse', 'Apartment'],
      bhkOptions: ['4 BHK', '5 BHK'],
      totalUnits: 450,
      constructionStatus: 'Ready to Move',
      possessionStatus: 'Immediate',
      reraApproved: true,
      reraNumber: 'WBRERA/P/KOL/2024/000777',
      amenities: ['Swimming Pool', 'Gym', 'Club House', 'Tennis Court', 'Sky Lounge', 'Security'],
      images: ['https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=1000&q=80'],
      featured: true,
      published: true,
    },
  ];

  await Project.insertMany(projectsData);

  console.log('Creating Sample Enquiries...');
  await Enquiry.insertMany([
    {
      name: 'Subhashish Roy',
      email: 'subhashish.roy@gmail.com',
      phone: '+91 98344 11223',
      message: 'Interested in the 3 BHK Modern Apartment in New Town Action Area 1. Please share floor plans and payment schedule.',
      propertyInterested: seededProperties[0]._id,
      propertyTitle: seededProperties[0].title,
      preferredVisitDate: '2026-09-10',
      preferredVisitTime: '11:00 AM',
      assignedAgent: agent1._id,
      status: 'New',
      notes: 'Customer looking for immediate possession within 1 month.',
    },
    {
      name: 'Debolina Sengupta',
      email: 'debolina.sengupta@yahoo.com',
      phone: '+91 98355 33445',
      message: 'Inquiring about 4 BHK Sky Villa in Rajarhat. Need detailed brochure and loan options.',
      propertyInterested: seededProperties[1]._id,
      propertyTitle: seededProperties[1].title,
      preferredVisitDate: '2026-09-12',
      preferredVisitTime: '03:30 PM',
      assignedAgent: agent4._id,
      status: 'Contacted',
      notes: 'Sent PDF brochure via email. Waiting for visit confirmation.',
    },
    {
      name: 'Amitabh Bhattacharya',
      email: 'amitabh.b@techcorp.in',
      phone: '+91 98366 55667',
      message: 'Looking to lease 2200 sqft IT Commercial Office in Sector V for software company.',
      propertyInterested: seededProperties[5]._id,
      propertyTitle: seededProperties[5].title,
      preferredVisitDate: '2026-09-08',
      preferredVisitTime: '02:00 PM',
      assignedAgent: agent3._id,
      status: 'Site Visit Scheduled',
      notes: 'Site visit confirmed with property manager.',
    },
  ]);

  console.log('Creating Sample Site Visits...');
  await SiteVisit.insertMany([
    {
      name: 'Rajesh Sharma',
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 98377 88990',
      property: seededProperties[0]._id,
      propertyTitle: seededProperties[0].title,
      visitDate: '2026-09-06',
      visitTime: '10:30 AM',
      status: 'Confirmed',
      assignedAgent: agent1._id,
      notes: 'Client requested cab pickup from Axis Mall New Town.',
    },
    {
      name: 'Dr. Indrani Mukhopadhyay',
      email: 'indrani.m@healthnet.org',
      phone: '+91 98388 99001',
      property: seededProperties[3]._id,
      propertyTitle: seededProperties[3].title,
      visitDate: '2026-09-07',
      visitTime: '04:00 PM',
      status: 'Requested',
      assignedAgent: agent2._id,
      notes: 'Interested in high floor flat on EM Bypass with wetland view.',
    },
    {
      name: 'Vikramjit Banerjee',
      email: 'vbanerjee@consulting.com',
      phone: '+91 98399 00112',
      property: seededProperties[4]._id,
      propertyTitle: seededProperties[4].title,
      visitDate: '2026-09-02',
      visitTime: '12:00 PM',
      status: 'Completed',
      assignedAgent: agent4._id,
      notes: 'Visited Ballygunge heritage bungalow. Follow-up meeting scheduled next week.',
    },
  ]);

  console.log('Creating Contact Messages...');
  await ContactMessage.insertMany([
    {
      name: 'Tanmoy Sen',
      email: 'tanmoy.sen@outlook.com',
      phone: '+91 98301 22334',
      subject: 'Property Consultation & Valuation',
      message: 'I want to sell my 3 BHK apartment in Salt Lake Sector 1. Looking for Swarnamayi property valuation and agent support.',
      status: 'New',
    },
    {
      name: 'Ritu Ganguly',
      email: 'ritu.ganguly@gmail.com',
      phone: '+91 98302 33445',
      subject: 'NRI Investment Query',
      message: 'Currently residing in Singapore. Interested in high-yield luxury rental properties along EM Bypass Kolkata.',
      status: 'Contacted',
    },
  ]);

  console.log('Creating Testimonials...');
  await Testimonial.insertMany([
    {
      name: 'Sujay Mukherjee',
      role: 'Property Owner, New Town',
      content: 'Swarnamayi Real Estate Marketing provided exceptional guidance when buying our 3 BHK flat in New Town. Complete transparency, zero hassle, and seamless documentation.',
      rating: 5,
      isDemo: true,
    },
    {
      name: 'Ananya Mitra',
      role: 'Investor, Salt Lake',
      content: 'Trusted professionals who truly understand the Kolkata property market. Highly recommend Swarnamayi for commercial and residential investments.',
      rating: 5,
      isDemo: true,
    },
    {
      name: 'Dr. Kaushik Sen',
      role: 'Homeowner, EM Bypass',
      content: 'Purchasing our high-rise luxury apartment through Swarnamayi was smooth from initial site visit to final registration. Top-notch team!',
      rating: 5,
      isDemo: true,
    },
  ]);

  console.log('Creating Downloadable Files...');
  await File.insertMany([
    {
      title: 'Swarnamayi Corporate Profile 2026',
      category: 'Company Profile',
      description: 'Official corporate overview of Swarnamayi Real Estate Marketing services in Kolkata.',
      filePath: '/uploads/swarnamayi-company-profile.pdf',
      fileType: 'application/pdf',
      fileSize: '2.4 MB',
    },
    {
      title: 'New Town & Rajarhat Property Investment Guide',
      category: 'Property Guide',
      description: 'Comprehensive guide covering upcoming infrastructure, metro connections, and price trends in Rajarhat & New Town.',
      filePath: '/uploads/new-town-investment-guide.pdf',
      fileType: 'application/pdf',
      fileSize: '3.8 MB',
    },
    {
      title: 'Kolkata Real Estate Market Trends Report 2026',
      category: 'Property Guide',
      description: 'In-depth analysis of property price appreciation, rental yields, and high-growth corridors across Kolkata.',
      filePath: '/uploads/kolkata-market-trends-2026.pdf',
      fileType: 'application/pdf',
      fileSize: '4.1 MB',
    },
  ]);

  console.log('Seeding completed successfully!');
  console.log('-----------------------------------');
  console.log('Default Admin Account:');
  console.log('Email: admin@swarnamayi.com');
  console.log('Password: Admin@123456');
  console.log('-----------------------------------');
  console.log('Default Demo User Account:');
  console.log('Email: user@swarnamayi.com');
  console.log('Password: Admin@123456');
  console.log('-----------------------------------');
  process.exit(0);
};

seedData();
