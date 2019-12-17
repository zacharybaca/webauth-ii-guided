const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const sessions = require('express-session');

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');

const server = express();

const sessionConfiguration = {
  //session storage options
  name: 'chocolatechip', //default would be sid
  secret: 'keep it secret, keep it safe!', //used for encryption(must be in env file)
  saveUninitialized: true, //has implications with GDPR flaws
  resave: false,
  //cookie options
  cookie: {
    maxAge: 1000 * 60 * 10, //10 minutes
    secure: false, //if false the cookie is sent over http, if true only https
    httpOnly: true //if true JS cannot access the cookie
  }
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(sessions(sessionConfiguration)); // add a req.session object

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.json({ api: 'up' });
});

module.exports = server;
