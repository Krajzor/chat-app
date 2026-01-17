import express from 'express';
import cors from 'cors';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';

import { connectDatabase } from './config/db.js';

import messageRoutes from './routes/messagesRoutes.js';
import conversationRoutes from './routes/conversationsRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*', 
        methods: ['GET', 'POST']
    }
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cors());

connectDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

app.use(express.static(path.join(__dirname, '../frontend')));

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

io.on('connection', (socket) => {
    console.log('Socket connected:', socket.id);

    socket.on('joinConversation', (conversationId) => {
        socket.join(conversationId);
    });

    socket.on('sendMessage', (message) => {
        io.to(message.conversationId).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

const PORT = 5000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
