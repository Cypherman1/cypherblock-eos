const axios = require('axios');
// const keys = require('../config/keys');
const BIGONE_TICKERS_PATH = __dirname + '/../db/bigone_tickers.json';

let fs = require('fs');

let result = {data: []};

const getBigoneTickers = () => {
  result = {data: []};
  return axios
    .get('https://big.one/api/v2/tickers')
    .then((res) => {
      if (res.status == '200') {
        res.data.data.map((item) => {
          if (item.market_id.match(/-EOS/g)) result.data.push(item);
        });
        fs.writeFile(BIGONE_TICKERS_PATH, JSON.stringify(result), (err) => {
          if (err) process.stdout.write('Write getBigoneTickers file fail!' + err);
        });
      }
    })
    .catch((error) => {
      process.stdout.write('getBigoneTickers fail!' + error);
    });
};

module.exports = getBigoneTickers;
