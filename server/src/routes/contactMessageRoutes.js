import express from 'express';
import { createContactMessage } from '../controllers/contactMessageController.js';

const router = express.Router();

router.post('/', createContactMessage);

export default router;
