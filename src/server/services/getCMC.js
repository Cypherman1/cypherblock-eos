const axios = require('axios');
// const keys = require('../config/keys');
const CMC_PATH = __dirname + '/../db/cmc.json';

let fs = require('fs');

const getCMC = () => {
  axios
    .get('https://api.coinmarketcap.com/v2/ticker/1765/')
    .then((res) => {
      if (res.status == '200')
        fs.writeFile(CMC_PATH, JSON.stringify(res.data), (err) => {
          if (err) process.stdout.write('Write CMC fail!' + err);
        });
    })
    .catch((error) => {
      process.stdout.write('getCMC fail!' + error);
    });
};

module.exports = getCMC;
