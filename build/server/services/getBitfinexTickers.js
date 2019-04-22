const axios = require('axios');
// const keys = require('../config/keys');
const BITFINEX_TICKERS_PATH = __dirname + '/../db/bitfinex_tickers.json';

let fs = require('fs');

const getBitfinexTickers = () => {
  return axios
    .get('https://api.bitfinex.com/v2/tickers?symbols=tIQXEOS')
    .then((res) => {
      if (res.status == 200)
        fs.writeFile(BITFINEX_TICKERS_PATH, JSON.stringify(res.data), (err) => {
          if (err) process.stdout.write('Write BitfinexTickers file fail!' + err);
        });
    })
    .catch((error) => {
      process.stdout.write('getBitfinexTickers fail!' + error);
    });
};

module.exports = getBitfinexTickers;
