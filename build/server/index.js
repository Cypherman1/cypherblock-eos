// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const setupApiRoutes = require('./middlewares/api');
const logger = require('./logger');

const models = require('./models');
const expressGraphQL = require('express-graphql');
//const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
//const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const keys = require('./config/keys');

// const {readTokens} = require('./models/tokensModel');
const getTokens = require('./services/getTokens');
const GetTokensSupply = require('./services/GetTokensSupply');
var schedule = require('node-schedule');

//process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 3000;

// process.on('unhandledRejection', onUnhandledError);
// process.on('uncaughtException', onUnhandledError);

// getTokens();

// console.log(readTokens());

const setupAppRoutes =
  process.env.NODE_ENV === 'production' ? require('./middlewares/production') : require('./middlewares/development');

const app = express();

// function onUnhandledError(err) {
//   try {
//     logger.error(err);
//   } catch (e) {
//     console.log('LOGGER ERROR:', e); //eslint-disable-line no-console
//     console.log('APPLICATION ERROR:', err); //eslint-disable-line no-console
//   }
//   process.exit(1);
// }

// const MONGO_URI = keys.mongoURI;

// const options = {
//   server: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}},
//   replset: {socketOptions: {keepAlive: 300000, connectTimeoutMS: 30000}}
// };

// // Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
// mongoose.Promise = global.Promise;

// // Connect to the mongoDB instance and log a message
// // on success or failure
// mongoose.connect(
//   MONGO_URI,
//   options
// );
// mongoose.connection
//   .once('open', () => console.log('Connected to MongoLab instance.'))
//   .on('error', (error) => console.log('Error connecting to MongoLab:', error));

// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: keys.cookieKey
    // store: new MongoStore({
    //   url: MONGO_URI,
    //   autoReconnect: true
    // })
  })
);

// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport.initialize());
app.use(passport.session());

// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true
  })
);

//app.set('env', process.env.NODE_ENV);
logger.info(`Application env: ${process.env.NODE_ENV}`);

app.use(logger.expressMiddleware);
app.use(bodyParser.json());

var j = schedule.scheduleJob('42 * * * * *', function() {
  try {
    getTokens();
  } catch (err) {
    logger.info('getTokens Fail!' + err);
  }
});
var j1 = schedule.scheduleJob('52 * * * * *', function() {
  try {
    GetTokensSupply();
  } catch (err) {
    logger.info('getTokensSupply Fail!' + err);
  }
});

// application routes
//setupApiRoutes(app);
setupAppRoutes(app);

app.listen(PORT, () => {
  logger.info(`HTTP server is now running on http://localhost:${PORT}`);
});
