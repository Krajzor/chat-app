import Conversation from '../models/conversation.js';

export const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({participants: userId}).sort({'lastMessage.createdAt': -1});

        res.status(200).json(conversations);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
}