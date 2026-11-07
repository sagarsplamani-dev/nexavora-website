import express from 'express';
import { createDemoBooking } from '../controllers/demoBookingController.js';

const router = express.Router();

router.post('/', createDemoBooking);

export default router;
