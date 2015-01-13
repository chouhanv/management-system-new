var express = require('express')
  , poweredBy = require('connect-powered-by')
  , bodyParser = require('body-parser');

module.exports = function() {
  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  if ('development' == this.env) {
    this.use(express.logger());
  }

  this.use(poweredBy('Locomotive'));
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(express.json({limit: '50mb'}));
  // this.use(bodyParser.json({limit: '50mb'}));
  this.use(express.urlencoded({limit: '50mb'}));
  this.use(express.methodOverride());
  this.use(this.router);
  this.use(express.errorHandler());
}
