import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import rateLimit from 'express-rate-limit';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import leadRoutes from './routes/leadRoutes.js';
import demoBookingRoutes from './routes/demoBookingRoutes.js';
import contactMessageRoutes from './routes/contactMessageRoutes.js';

const rootEnv = resolve(dirname(fileURLToPath(import.meta.url)), '../../.env');
dotenv.config({ path: process.env.ENV_FILE || rootEnv });

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '16kb' }));
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173').split(',').map((origin) => origin.trim());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Rate Limiting
const limiter = rateLimit({
  windowMs: (parseInt(process.env.RATE_LIMIT_WINDOW) || 15) * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX) || 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.error('MongoDB connection failed:', error.name || 'UnknownError'));
}

// Health check
app.get('/api/health', (req, res) => {
  const ready = mongoose.connection.readyState === 1;
  res.status(ready ? 200 : 503).json({ status: ready ? 'ok' : 'unavailable', database: ready ? 'connected' : 'disconnected' });
});

app.use('/api/leads', leadRoutes);
app.use('/api/demo-bookings', demoBookingRoutes);
app.use('/api/contact', contactMessageRoutes);
app.use('/api/contact-messages', contactMessageRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found.' }));
app.use((error, req, res, next) => {
  if (error instanceof SyntaxError && 'body' in error) return res.status(400).json({ error: 'Invalid JSON body.' });
  if (error.type === 'entity.too.large') return res.status(413).json({ error: 'Request body is too large.' });
  console.error('Unhandled API error:', error.name || 'UnknownError');
  return res.status(500).json({ error: 'An unexpected server error occurred.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
