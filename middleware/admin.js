const admin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Auth Error: No user found' });
    }
    if (!req.user.isAdmin) {
        return res.status(401).json({ message: 'Unauthorized: Admin access required' });
    }
    next();
}

module.exports = admin;