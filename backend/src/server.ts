import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { loadData } from './db/database.js';
import { connectMongoDB } from './db/mongoose.js';
import authRoutes from './routes/auth.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import securityRoutes from './routes/security.routes.js';
import crmRoutes from './routes/crm.routes.js';
import propertiesRoutes from './routes/properties.routes.js';
import salesRoutes from './routes/sales.routes.js';
import commissionsRoutes from './routes/commissions.routes.js';
import matchingRoutes from './routes/matching.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Database Storage (Local file + MongoDB fallback)
loadData();
connectMongoDB();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    service: 'Swaramayi Real Estate CRM Node.js Backend API',
    version: '1.0.0',
    mongodb_uri: process.env.MONGODB_URI,
    timestamp: new Date().toISOString()
  });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/security', securityRoutes);
app.use('/api/v1/crm', crmRoutes);
app.use('/api/v1/properties', propertiesRoutes);
app.use('/api/v1/sales', salesRoutes);
app.use('/api/v1/commissions', commissionsRoutes);
app.use('/api/v1/matching', matchingRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    status: 'ERROR',
    error_code: 'SERVER_ERROR',
    message: err.message || 'Internal Server Error'
  });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Swaramayi Real Estate CRM Backend running on port ${PORT}`);
  console.log(`📍 Base URL: http://localhost:${PORT}/api/v1`);
  console.log(`====================================================`);
});

export default app;
