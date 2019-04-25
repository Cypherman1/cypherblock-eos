//Getting Chaince tickers from Blocksence's APIs
const axios = require('axios');
const BLOCKSENCE_TICKERS_PATH = __dirname + '/../db/blocksence_tickers.json';

let fs = require('fs');

const getBlocksenceTickers = () => {
  axios
    .get('https://blocksense.one/api/token.json')
    .then((res) => {
      if (res.status == '200')
        fs.writeFile(BLOCKSENCE_TICKERS_PATH, JSON.stringify(res.data), (err) => {
          if (err) process.stdout.write('Write tokens file fail!' + err);
        });
    })
    .catch((error) => {
      process.stdout.write('getBlocksenceTickers fail!' + error);
    });
};

module.exports = getBlocksenceTickers;
