const user = require('../Schemas/UserSchema')

exports.register = async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const newUser = new user({ username, password });
        await newUser.save();
        res.json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Failed to register user' });
    }
}