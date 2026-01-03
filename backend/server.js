import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/db.js';

import messageRoutes from './routes/messagesRoutes.js';
import conversationRoutes from './routes/conversationsRoutes.js'
import authRoutes from './routes/authRoutes.js';


const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

app.use('/api/messages', messageRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('User hit the server');
});


app.listen(5000, () => {
    console.log('Server running on port 5000');
})