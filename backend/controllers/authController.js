import User from "../models/user.js";

export const signIn = async (req, res) => {
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
}

export const signUp = async (req, res) => {
    try {
        const {username, displayName, password} = req.body;

        if (!username || !password) {
            return res.status(400).json({error: 'Username and password are required'});
        }

        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).json({error: 'Username already exists'});
        }

        const newUser = new User({
            username,
            displayName: displayName || username,
            password,
            avatar: 'default.jpg'
        })

        await newUser.save();

        res.status(201).json({
            userId: newUser._id,
            username: newUser.username,
            displayName: newUser.displayName,
            avatar: newUser.avatar
        });
    }   catch (err) {
        res.status(500).json({error: err.message});
    }
}