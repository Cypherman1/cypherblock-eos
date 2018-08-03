const {resolve} = require('path');
const express = require('express');

const clientBuildPath = resolve(__dirname, '..', '..', 'client');

module.exports = function setup(app) {
  app.get('*.js', function(req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
  });

  app.get('*.css', function(req, res, next) {
    req.url += '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/css');
    next();
  });

  app.use('/', express.static(clientBuildPath));

  // all other requests be handled by UI itself
  app.get('*', (req, res) => res.sendFile(resolve(clientBuildPath, 'index.html')));
};
