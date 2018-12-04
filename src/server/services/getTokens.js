const axios = require('axios');
// const keys = require('../config/keys');
const TOKENS_PATH = __dirname + '/../db/tokens.json';

let fs = require('fs');

const getTokens = () => {
  axios
    .get('https://api.newdex.io/v1/ticker/all')
    .then((res) => {
      if (res.data && res.data.code == '200') {
        fs.writeFileSync(TOKENS_PATH, JSON.stringify(res.data.data));
      }
    })
    .catch((error) => {});
};

module.exports = getTokens;
