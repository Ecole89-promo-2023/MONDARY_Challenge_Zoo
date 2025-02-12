const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Auth Error' });

    try {
        const decoded = jwt.verify(token.split(" ")[1], process.env.PRIVATE_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }

}

module.exports = auth;