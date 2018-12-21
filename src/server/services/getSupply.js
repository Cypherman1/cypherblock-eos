const axios = require('axios');
const TOKENS_PATH = __dirname + '/../db/tokens.json';
const TOKENS_SUPPLY_PATH = __dirname + '/../db/tokens_supply.json';
const NEWDEX_TICKERS_PATH = __dirname + '/../db/newdex_tickers.json';

const keys = require('../config/keys');

let fs = require('fs');
const other_exs = require('./other_exs.js');
let index = 0;

let tokens = [];
let mainObject = {data: []};
let promises = [];

const getSupply = () => {
  mainObject = {data: []};
  promises = [];

  tokens = JSON.parse(fs.readFileSync(TOKENS_PATH));

  // tokens.forEach((token, index) => {
  //   console.log(token);
  //   console.log(index);
  // });

  other_exs.map((ticker) => {
    index = tokens.findIndex((e) => e.symbol == ticker.symbol);

    if (index == -1) {
      tokens.push({
        symbol: ticker.symbol,
        contract: ticker.contract,
        currency: ticker.currency,
        supply: {
          current: 0,
          max: 0
        },
        last: 0,
        change: 0,
        amount: 0,
        volume: 0,
        exchanges: []
      });
    }
  });

  tokens.map((token) => {
    promises.push(
      axios
        .post('https://eos.greymass.com/v1/chain/get_table_rows', {
          json: 'true',
          code: token.contract,
          scope: token.currency.toUpperCase(),
          table: 'stat',
          limit: 10
        })
        .catch((err) => {
          process.stdout.write('Promises Fail!' + err);
        })
    );
  });

  axios
    .all(promises)
    .then((results) => {
      results.map((response) => {
        if (response && response.status == '200') {
          if (response.data && response.data.rows && response.data.rows[0] && JSON.parse(response.config.data)) {
            mainObject.data.push({
              symbol:
                JSON.parse(response.config.data).code +
                '-' +
                response.data.rows[0].supply.split(' ')[1].toLowerCase() +
                '-eos',
              currency: response.data.rows[0].supply.split(' ')[1],
              supply: response.data.rows[0].supply.split(' ')[0],
              max_supply: response.data.rows[0].max_supply.split(' ')[0],
              issuer: response.data.rows[0].issuer
            });
          }
        }
      });
      if (mainObject.data.length > 0)
        fs.writeFile(TOKENS_SUPPLY_PATH, JSON.stringify(mainObject), (err) => {
          if (err) process.stdout.write('Write tokens file fail!' + err);
        });
    })
    .catch((error) => {
      process.stdout.write('axios all error!' + error);
    });
};

module.exports = getSupply;
