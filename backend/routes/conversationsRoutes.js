import express from 'express';
import { getUserConversations, createConversation, getConversationData } from '../controllers/conversationController.js';

const router = express.Router();

router.get('/user/:userId', getUserConversations);
router.get('/:conversationId', getConversationData);
router.post('/', createConversation);

export default router;