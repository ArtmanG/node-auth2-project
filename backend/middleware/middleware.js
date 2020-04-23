const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../api/secrets')

function generateToken(user) {
    const payload = {
        subject: user.id, //sub
        username: user.username,
        department: user.department
    };
    const secret = process.env.JWT_SECRET || jwtSecret;
    const options = {
        expiresIn: '1d'
    };

    return jwt.sign(payload, secret, options)
};

function authMiddleware (req, res, next) {
    const token =  req.headers.authorization
    const secret = process.env.JWT_SECRET || jwtSecret
    
    if(token) {
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({message: "error message"})
            } else {
                req.decodedToken = decodedToken
                next();
            }
        })
    } else {
        res.status(401).json({message: "Gotta Sign in"})
    }
};

module.exports = { generateToken, authMiddleware}


