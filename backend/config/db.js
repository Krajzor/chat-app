import mongoose from 'mongoose';

export const connectDatabase = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
    console.log('mongoDB connected');
}