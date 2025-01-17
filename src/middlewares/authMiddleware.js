const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(403).json({ error: 'No token provided' });
    }
};

module.exports = authenticate;
