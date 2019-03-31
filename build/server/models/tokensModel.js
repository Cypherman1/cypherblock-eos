// var Datastore = require('nedb');

// var tokensDb = new Datastore({
//   filename: __dirname + '/../db/tokens.db',
//   autoload: true
// });

// module.exports = tokensDb;

const TOKENS_PATH = __dirname + '/../db/tokens.json';

let fs = require('fs');

const readTokens = () => {
  return JSON.parse(fs.readFileSync(TOKENS_PATH));
};

const saveTokens = (tokens) => {
  fs.writeFileSync(TOKENS_PATH, JSON.stringify(tokens), (err) => {});
};

module.exports = {readTokens, saveTokens};
