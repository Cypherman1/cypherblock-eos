const axios = require('axios');
// const keys = require('../config/keys');
const CHAINCE_TICKERS_PATH = __dirname + '/../db/chaince_tickers.json';

let fs = require('fs');

const getChainceTickers = () => {
  axios
    .get('https://api.chaince.com/tickers')
    .then((res) => {
      if (res.status == '200')
        fs.writeFile(CHAINCE_TICKERS_PATH, JSON.stringify(res.data), (err) => {
          if (err) process.stdout.write('Write tokens file fail!' + err);
        });
    })
    .catch((error) => {
      process.stdout.write('getChainceTickers fail!' + error);
    });
};

module.exports = getChainceTickers;
