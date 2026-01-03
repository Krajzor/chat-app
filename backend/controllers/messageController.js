import Message from '../models/message.js';

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

        res.status(201).json(newMessage);
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
    
}