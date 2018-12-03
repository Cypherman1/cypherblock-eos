let tokensModel = require('../models/tokensModel');

const getTokens = () => {
  tokensModel.insert([{symbol: 'eos', account: 'eosio'}, {symbol: 'cypher', account: 'cypherblocks'}], function(
    err,
    newDocs
  ) {
    console.log(newDocs);
  });
};

module.exports = getTokens;
