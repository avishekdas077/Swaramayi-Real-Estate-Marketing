const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const propertyRoutes = require('./routes/propertyRoutes');
const projectRoutes = require('./routes/projectRoutes');
const locationRoutes = require('./routes/locationRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const siteVisitRoutes = require('./routes/siteVisitRoutes');
const fileRoutes = require('./routes/fileRoutes');
const agentRoutes = require('./routes/agentRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Connect Database
connectDB();

// Security Middlewares
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', company: 'SWARNAMAYI REAL ESTATE MARKETING', time: new Date() });
});

// API Routes
app.use('/api/properties', propertyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/site-visits', siteVisitRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/agents', agentRoutes);
app.use('/api/users', userRoutes);

// Error Handling Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Swarnamayi Server running on port ${PORT}`);
});
