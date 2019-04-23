// const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
// const setupApiRoutes = require('./middlewares/api');
const logger = require('./logger');

const models = require('./models');
const expressGraphQL = require('express-graphql');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./services/auth');
//const MongoStore = require('connect-mongo')(session);
const schema = require('./schema/schema');
const keys = require('./config/keys');

// const {readTokens} = require('./models/tokensModel');
const getTokens = require('./services/getTokens');
const getSupply = require('./services/getSupply');
const getBlocksenceTickers = require('./services/getBlocksenceTickers');
const getBigoneTickers = require('./services/getBigoneTickers');
const getBancorTickers = require('./services/getBancorTickers');
const getBitfinexTickers = require('./services/getBitfinexTickers');
const getNewdexTickers = require('./services/getNewdexTickers');
const calEOSMarketcap = require('./services/calEOSMarketcap');
const getCMC = require('./services/getCMC');
const getChainceTickers = require('./services/getChainceTickers');
const getVoters = require('./services/getVoters');
var schedule = require('node-schedule');

const PORT = process.env.PORT || 3000;

const setupAppRoutes =
  process.env.NODE_ENV === 'production' ? require('./middlewares/production') : require('./middlewares/development');

const app = express();

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

try {
  getCMC();
  getTokens();
  getBigoneTickers();
  getNewdexTickers();
  getBitfinexTickers();
  getBancorTickers();
  getChainceTickers();
  getSupply();
  calEOSMarketcap();
} catch (err) {
  logger.info('Init Fail!' + err);
}

if (process.env.NODE_ENV === 'production') {
  var j = schedule.scheduleJob('42 * * * * *', function() {
    try {
      getTokens();
    } catch (err) {
      logger.info('getTokens Fail index!' + err);
    }
  });
  var j1 = schedule.scheduleJob('52 * * * * *', function() {
    try {
      getSupply();
    } catch (err) {
      process.stdout.write('getTokensSupply Fail! index ' + err);
    }
  });

  var j3 = schedule.scheduleJob('16 * * * * *', function() {
    try {
      getBigoneTickers();
    } catch (err) {
      process.stdout.write('getBigoneTickers Fail! index ' + err);
    }
  });

  var j4 = schedule.scheduleJob('17 * * * * *', function() {
    try {
      getNewdexTickers();
    } catch (err) {
      process.stdout.write('getNewdexTickers Fail! index ' + err);
    }
  });

  // var j5 = schedule.scheduleJob('18 * * * * *', function() {
  //   try {
  //     getBlocksenceTickers();
  //   } catch (err) {
  //     process.stdout.write('getBlocksenceTickers Fail! index ' + err);
  //   }
  // });

  var j6 = schedule.scheduleJob('19 * * * * *', function() {
    try {
      getBitfinexTickers();
    } catch (err) {
      process.stdout.write('getBigoneTickers Fail! index ' + err);
    }
  });

  var j9 = schedule.scheduleJob('20 * * * * *', function() {
    try {
      getBancorTickers();
    } catch (err) {
      process.stdout.write('getBigoneTickers Fail! index ' + err);
    }
  });

  var j7 = schedule.scheduleJob('*/5 * * * *', function() {
    try {
      getCMC();
    } catch (err) {
      process.stdout.write('getCMC Fail! index ' + err);
    }
  });

  var j8 = schedule.scheduleJob('33 * * * * *', function() {
    try {
      calEOSMarketcap();
    } catch (err) {
      process.stdout.write('calEOSMarketcap Fail! index ' + err);
    }
  });

  var j9 = schedule.scheduleJob('33 * * * * *', function() {
    try {
      getChainceTickers();
    } catch (err) {
      process.stdout.write('getChainceTickers Fail! index ' + err);
    }
  });
}

// application routes
//setupApiRoutes(app);
setupAppRoutes(app);

app.listen(PORT, () => {
  process.stdout.write(`HTTP server is now running on http://localhost:${PORT}`);
  logger.info(`HTTP server is now running on http://localhost:${PORT}`);
});
