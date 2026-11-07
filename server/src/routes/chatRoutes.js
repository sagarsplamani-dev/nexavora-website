import express from 'express';
import { createChatResponse } from '../controllers/chatController.js';

const router = express.Router();

router.post('/', createChatResponse);

export default router;
