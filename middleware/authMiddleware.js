const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../api/secrets');

function generateToken(user) {
    const secret = jwtSecret;
    const options = {
        expiresIn: '1d'
    };

    const payload = {
        subject:user.id,
        username: user.username,
        department: user.department
    };

 

    return jwt.sign(payload, secret, options)
};

function authMiddleware (req, res, next) {
    const token = req.headers.authorization;
    const secret = jwtSecret;

    if (token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({message: 'error message'})
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(401).json({message: "Please provide credentials"})
    }
};

module.exports = { generateToken, authMiddleware }