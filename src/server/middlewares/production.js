const {resolve} = require('path');
//const express = require('express');
// const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const clientBuildPath = resolve(__dirname, '..', '..', 'client');
let fs = require('fs');

module.exports = function setup(app) {
  // app.use(compression());
  // app.get('*.js', function(req, res, next) {
  //   req.url += '.gz';
  //   res.set('Content-Encoding', 'gzip');
  //   res.set('Content-Type', 'text/javascript');
  //   next();
  // });

  // app.get('*.css', function(req, res, next) {
  //   req.url += '.gz';
  //   res.set('Content-Encoding', 'gzip');
  //   res.set('Content-Type', 'text/css');
  //   next();
  // });

  app.get('/', (req, res) => {
    const filePath = resolve(clientBuildPath, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price');
      data = data.replace(
        /\$OG_DESCRIPTION/g,
        'Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet'
      );
      data = data.replace(/\$OG_CANONICAL/g, 'https://www.cypherblock.io');
      res.send(data);
    });
  });

  app.get('/eosmarketcap', (req, res) => {
    const filePath = resolve(clientBuildPath, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'EOS Market cap | eos airdrop, Dapp, Project, Price, Ranking');
      data = data.replace(
        /\$OG_DESCRIPTION/g,
        'Cypherblock | EOS Market cap show Ranking, eos airdrop, Price, Volume, Supply, Value, Exchanges, Project, Dapp on EOSIO Blockchain mainnet'
      );
      data = data.replace(/\$OG_CANONICAL/g, 'https://www.cypherblock.io/eosmarketcap');
      res.send(data);
    });
  });

  app.get('/account/:account_name', (req, res) => {
    const filePath = resolve(clientBuildPath, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      data = data.replace(
        /\$OG_TITLE/g,
        req.params.account_name + ' | EOS Block Explorer |EOS Account, Airdrops, Price, Value'
      );
      data = data.replace(
        /\$OG_DESCRIPTION/g,
        'Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet'
      );
      data = data.replace(/\$OG_CANONICAL/g, 'https://www.cypherblock.io/account/' + req.params.account_name);
      res.send(data);
    });
  });

  app.get('/project/:symbol', (req, res) => {
    const filePath = resolve(clientBuildPath, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      data = data.replace(
        /\$OG_TITLE/g,
        req.params.symbol
          .substring(0, req.params.symbol.indexOf('-eos'))
          .toUpperCase()
          .replace('-', ' ') + ' | EOS Block Explorer |EOS Project, Airdrop, Dapp'
      );
      data = data.replace(
        /\$OG_DESCRIPTION/g,
        'Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet'
      );
      data = data.replace(/\$OG_CANONICAL/g, 'https://www.cypherblock.io/project/' + req.params.symbol);
      res.send(data);
    });
  });

  app.use('/', expressStaticGzip(clientBuildPath));

  app.get('*', (req, res) => {
    const filePath = resolve(clientBuildPath, 'index.html');
    fs.readFile(filePath, 'utf8', function(err, data) {
      if (err) {
        return console.log(err);
      }

      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'Cypherblock | EOS Block Explorer | Account, Token, Airdrop, Price');
      data = data.replace(
        /\$OG_DESCRIPTION/g,
        'Cypherblock | One of top EOS Block Explorer showing account, RAM, token, airdrop, price, voting, smart contract, transaction, dapp on EOSIO blockchain mainnet'
      );
      data = data.replace(/\$OG_CANONICAL/g, 'https://www.cypherblock.io');
      res.send(data);
    });
  });
};
