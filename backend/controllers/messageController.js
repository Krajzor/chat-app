import Message from '../models/message.js';
import Conversation from '../models/conversation.js';
import User from '../models/user.js';
import mongoose from 'mongoose';

export const getMessages = async (req, res) => {
    try {
        const { conversationId } = req.params;
        const messages = await Message.find({conversationId}).sort({createdAt: 1}).limit(50);

        res.status(200).json(messages);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
}

export const sendMessage = async (req, res) => {
    try {
        const {conversationId, senderId, text} = req.body 

        const newMessage = await Message.create({
            conversationId,
            senderId,
            text
        });

        await newMessage.save();

        await Conversation.findByIdAndUpdate(conversationId, {
            lastMessage: {
                text,
                senderId,
                createdAt: new Date()
            }
        });

        await User.findByIdAndUpdate(senderId, {
            lastSeen: new Date()
        });

        res.status(201).json(newMessage);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
    
}