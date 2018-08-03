const {resolve} = require('path');
//const express = require('express');
// const compression = require('compression');
const expressStaticGzip = require('express-static-gzip');

const clientBuildPath = resolve(__dirname, '..', '..', 'client');

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

  app.use('/', expressStaticGzip(clientBuildPath));

  // all other requests be handled by UI itself
  app.get('*', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));
};
