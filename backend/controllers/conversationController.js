import Conversation from '../models/conversation.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getUserConversations = async (req, res) => {
    try {
        const { userId } = req.params;
        const conversations = await Conversation.find({participants: userId}).sort({'lastMessage.createdAt': -1}).populate('participants', 'username displayName avatar lastSeen');

        res.status(200).json(conversations);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const createConversation = async (req, res) => {
    try {
        const { fromUserId, toUsername } = req.body;

        const toUser = await User.findOne({ username: toUsername });
        if (!toUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const existing = await Conversation.findOne({
            participants: { $all: [fromUserId, toUser._id] }
        });
        if (existing) {
            return res.status(400).json({ error: 'Conversation already exists' });
        }
        
        const newConversation = new Conversation({
            participants: [
                new mongoose.Types.ObjectId(fromUserId),
                new mongoose.Types.ObjectId(toUser._id)
            ],
            title: toUser.displayName,
            avatar: toUser.avatar, 
            isGroup: false,
            lastMessage: ''
        });

        await newConversation.save();

        res.status(201).json(newConversation);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getConversationData = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const conversation = await Conversation.findById(conversationId).populate('participants');
        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};