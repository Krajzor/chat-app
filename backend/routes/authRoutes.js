import express from 'express';
import User from '../models/user.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({message: 'Invalid credentials'});
        }

        res.status(200).json({
            userId: user._id,
            username: user.username
        });
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
});

export default router;