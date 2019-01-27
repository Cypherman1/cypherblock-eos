const axios = require('axios');
// const keys = require('../config/keys');
const CMC_PATH = __dirname + '/../db/cmc.json';

let fs = require('fs');

const getCMC = () => {
  axios
    .get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=EOS', {
      headers: {'X-CMC_PRO_API_KEY': 'a94407d8-772d-43c3-819f-47bb6160a49c'}
    })
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
