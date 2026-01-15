import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';
import { Server } from 'socket.io';
import { createServer } from 'http';

import messageRoutes from './routes/messagesRoutes.js';
import conversationRoutes from './routes/conversationsRoutes.js'
import authRoutes from './routes/authRoutes.js';


const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/auth', authRoutes);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
        console.log(`Socket ${socket.id} joined ${conversationId}`);
    });

    socket.on('sendMessage', (message) => {
        io.to(message.conversationId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });

});

httpServer.listen(5000, () => {
    console.log('Server running on port 5000');
})