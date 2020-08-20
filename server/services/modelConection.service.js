const { mongoConnectionString } = require('../config/keys');
const debug = require('debug')('server:modelConection.service');
const fs = require('fs');
const path = require('path');

const modelConnection = require('./mongo.service')(mongoConnectionString);

const modelFiles = fs.readdirSync(
  path.join(__dirname, '..', 'models', 'dbModels')
);

modelFiles.forEach((model) => {
  const { name, schema } = require(`../models/dbModels/${model}`);
  if (name) {
    modelConnection.model(name, schema);
    debug(`setted ${name} schema`);
  }
});

// let modelConnection;

// (async () => {
//   modelConnection = await require('./mongo.service')(mongoConnectionString);

//   const modelFiles = fs.readdirSync(path.join(__dirname, '..', 'models'));

//   modelFiles.forEach((model) => {
//     const { name, schema } = require(`../models/${model}`);
//     modelConnection.model(name, schema);
//     debug(`setted ${name} schema`);
//   });
// })();

module.exports = modelConnection;
