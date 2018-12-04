const axios = require('axios');
const TOKENS_PATH = __dirname + '/../db/tokens.json';
const TOKENS_SUPPLY_PATH = __dirname + '/../db/tokens_supply.json';

const keys = require('../config/keys');

let fs = require('fs');

let tokens = [];
let mainObject = {data: []};
let promises = [];

function GetTokensSupply() {
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
        .post(keys.chainURL + '/v1/chain/get_table_rows', {
          json: 'true',
          code: token.contract,
          scope: token.currency.toUpperCase(),
          table: 'stat',
          limit: 10
        })
        .catch((err) => {})
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
      fs.writeFileSync(TOKENS_SUPPLY_PATH, JSON.stringify(mainObject));
    })
    .catch((error) => {});
}

module.exports = GetTokensSupply;
