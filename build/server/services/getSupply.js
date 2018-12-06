const axios = require('axios');
const TOKENS_PATH = __dirname + '/../db/tokens.json';
const TOKENS_SUPPLY_PATH = __dirname + '/../db/tokens_supply.json';

const keys = require('../config/keys');

let fs = require('fs');

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
        if (response && response.status == 200) {
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
      fs.writeFile(TOKENS_SUPPLY_PATH, JSON.stringify(mainObject), (err) => {
        if (err) process.stdout.write('Write tokens file fail!' + err);
      });
    })
    .catch((error) => {
      process.stdout.write('axios all error!' + error);
    });
};

module.exports = getSupply;
