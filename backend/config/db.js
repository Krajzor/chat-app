import mongoose from 'mongoose';

const serverAddress = 'mongodb://127.0.0.1:27017/chatApp'; // change as needed

export const connectDatabase = async () => {
    await mongoose.connect(serverAddress);
    console.log('mongoDB connected');
}