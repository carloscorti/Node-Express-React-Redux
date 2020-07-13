const mongoose = require('mongoose');
const debug = require('debug')('server:mongo.service');

const connection = (connectionString) => {
  return mongoose.createConnection(
    connectionString,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => {
      if (err) {
        debug(err);
      } else {
        debug('conection created');
      }
    }
  );
};

// const connection = async (connectionString) => {
//   let mongoConnection;
//   try {
//     mongoConnection = await mongoose.createConnection(connectionString, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     debug('conection created');
//   } catch (err) {
//     debug(err);
//   }
//   return mongoConnection;
// };

module.exports = connection;
