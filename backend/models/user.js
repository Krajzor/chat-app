import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    displayName: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String,
        default: 'default.jpg'
    }
});

export default mongoose.model("User", userSchema);