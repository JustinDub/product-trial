const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

function verifyAdminToken(req, res, next) {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.user = decoded.user;
        if(!decoded.admin) res.status(401).json({ error: 'Unauthorized' });
        else next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = {
    verifyToken,
    verifyAdminToken
};