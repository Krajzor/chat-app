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
    }
});

export default mongoose.model("User", userSchema);