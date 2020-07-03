// import express from 'express';
// import config from '../config';
// import path from 'path';

const express = require('express');
const config = require('./config/config.host');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

const initRouter = require('./server/routes/initRouter')();

app.use('/init', initRouter);

app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!<br><a href="/">go back</a>');
});

app.listen(config.port, () => {
  console.info(`Running on port ${config.port}...`);
});
