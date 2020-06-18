const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const usersRouter = require('../users/users-router');
const authRouter = require('../auth/auth-router');
const { authMiddleware } = require('../middleware/authMiddleware');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('api/users', authMiddleware, usersRouter);
server.use('api/auth', authRouter);

server.get('/', (req, res) => {
    res.json({ api: 'up' });
});

module.exports = server;