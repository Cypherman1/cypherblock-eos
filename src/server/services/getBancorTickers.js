//Getting bancor tickers from bancor's APIs

// const axios = require('axios');
// const BANCOR_TICKERS_PATH = __dirname + '/../db/bancor_tickers.json';

// let fs = require('fs');
// let result = {rows: []};

// const getBancorTickers = () => {
//   result = {rows: []};
//   return axios
//     .get('https://api.bancor.network/0.1/volume')
//     .then((res) => {
//       if (res.status == '200') {
//         res.data.data.rows.map((item) => {
//           if (item.from_token_code != 'EOS' && item.from_token_code != 'BNT') result.rows.push(item);
//         });
//         fs.writeFile(BANCOR_TICKERS_PATH, JSON.stringify(result), (err) => {
//           if (err) process.stdout.write('Write getBancorTickers file fail!' + err);
//         });
//       }
//     })
//     .catch((error) => {
//       process.stdout.write('getBancorTickers fail!' + error);
//     });
// };

// module.exports = getBancorTickers;
