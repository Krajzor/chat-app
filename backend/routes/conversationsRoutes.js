import express from 'express';
import { getUserConversations } from '../controllers/conversationController.js';

const router = express.Router();

router.get('/user/:userId', getUserConversations);

export default router;