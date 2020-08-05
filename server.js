const express = require('express');
const config = require('./server/config/config.host');
const debug = require('debug')('server');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const { sessionKey } = require('./server/config/keys');
const modelConnection = require('./server/services/modelConection.service');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

const sessionStore = new MongoStore({
  mongooseConnection: modelConnection,
  collection: 'sessions',
});

app.use(
  session({
    secret: sessionKey,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
    },
    store: sessionStore,
  })
);

require('./server/config/passport.js')(app);

if (process.env.NODE_ENV !== 'production') {
  app.get('/', (req, res) => {
    res.send({ api: 'hola' });
    debug(req.user);
  });
}

const googleOAuthRouter = require('./server/routes/googleOAuthRouter')();
app.use('/auth/google', googleOAuthRouter);

const apiRouter = require('./server/routes/apiRouter')();
app.use('/api', apiRouter);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('/*', (req, res) => {
    res.sendFile(path(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res) => {
  res.status(404).send('Sorry cant find that!<br><a href="/">go back</a>');
});

app.listen(config.port, () => {
  debug(`Running on port ${config.port}...`);
});
