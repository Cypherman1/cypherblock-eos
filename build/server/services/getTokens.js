const axios = require('axios');
// const keys = require('../config/keys');
const TOKENS_PATH = __dirname + '/../db/tokens.json';

let fs = require('fs');

const getTokens = () => {
  axios
    .get('https://api.newdex.io/v1/ticker/all')
    .then((res) => {
      if (res.status == '200' && res.data && res.data.code == '200') {
        fs.writeFile(TOKENS_PATH, JSON.stringify(res.data.data), (err) => {
          if (err) process.stdout.write('Write tokens file fail!' + err);
        });
      }
    })
    .catch((error) => {
      process.stdout.write('Gettokens fail!' + error);
    });
};

module.exports = getTokens;
