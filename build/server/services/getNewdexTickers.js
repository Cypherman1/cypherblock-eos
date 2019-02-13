const axios = require('axios');
// const keys = require('../config/keys');
const NEWDEX_TICKERS_PATH = __dirname + '/../db/newdex_tickers.json';

let fs = require('fs');

const getNewdexTickers = () => {
  axios
    .get('https://api.newdex.io/v1/tickers')
    .then((res) => {
      if (res.status == '200' && res.data && res.data.code == '200') {
        fs.writeFile(NEWDEX_TICKERS_PATH, JSON.stringify(res.data.data), (err) => {
          if (err) process.stdout.write('Write tokens file fail!' + err);
        });
      }
    })
    .catch((error) => {
      process.stdout.write('getNewdexTickers fail!' + error);
    });
};

module.exports = getNewdexTickers;
