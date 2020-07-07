// import express from 'express';
// import config from '../config';
// import path from 'path';

const express = require('express');
const config = require('./server/config/config.host');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { sessionKey } = require('./server/config/keys');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
  })
);

require('./server/config/passport.js')(app);

app.use(express.static('public'));

app.set('views', path.join('./', 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send({ api: 'hola' });
  // res.render('index', {
  //   title: 'New Express App',
  //   face: ':)',
  // });
});

const googleOAuthRouter = require('./server/routes/googleOAuthRouter')();

app.use('/auth/google', googleOAuthRouter);

app.get('/user', (req, res) => {
  if (req.user) {
    res.send({
      user: req.user.id,
      name: req.user.name,
      email: req.user.emails[0].value,
      provider: req.user.provider,
    });
    console.log(req.user);
  } else {
    res.redirect('/');
  }
});

app.get('/logout', (req, res) => {
  if (req.user) {
    req.logout();
    console.log('logged out');
    res.redirect('/');
  } else {
    res.redirect('/');
  }
});

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!<br><a href="/">go back</a>');
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});
