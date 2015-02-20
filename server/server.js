'use strict';

var express = require('express');
var chalk = require('chalk');
var config = require('./config/environment');
var Parse = require('parse').Parse;

var app = express();
var server = require('http').createServer(app);

require('./config/express')(app);
require('./routes')(app);

Parse.initialize("fyGznOdbVw6Ft3w9UyIFSOF1EMtXPFMoOt4121Om", "9ljI7KJwp5i6DXrEJoMVH7rFDmaGZs6XgsLOZF0q");

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('\nExpress server listening on port ') +
    chalk.yellow('%d') +
    chalk.red(', in ') +
    chalk.yellow('%s') +
    chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

  if (config.env === 'development') {
    require('fs').writeFileSync('.bangular-refresh', 'done');
  }

});

module.exports = server;
