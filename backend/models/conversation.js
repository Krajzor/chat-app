import mongoose from 'mongoose';

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        default: null
    },
    avatar: {
        type: String,
        default: './assets/pfp/default.jpg'
    },
    participants: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    lastMessage: {
        text: String, 
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        createdAt: {
            type: Date, 
            default: Date.now
        }
    },
    isGroup: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Conversation", conversationSchema);