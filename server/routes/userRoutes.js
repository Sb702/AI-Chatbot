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

exports.login = async function (req, res) {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const existingUser = await user.findOne({ username });

        if (!existingUser) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (existingUser.password !== password) {
            return res.status(400).json({ error: 'Invalid password' });
        }


// give a status code back to the client
        // res.json({ message: 'User logged in successfully' });
        res.status(200).json({ message: 'User logged in successfully', user: existingUser });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ error: 'Failed to log in user' });
    }
}