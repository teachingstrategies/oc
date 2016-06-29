'use strict';

var psl = require('psl');
var url = require('url');

module.exports = function(baseUrl) {
  return function(req, res, next) {
    var origin = '*';

    if (req.get('Origin')) {
      var domain = psl.parse(url.parse(baseUrl).hostname).domain;
      var originDomain = psl.parse(url.parse(req.get('Origin')).hostname).domain;

      if (originDomain === domain) {
        origin = req.get('Origin');
      }
    }

    res.removeHeader('X-Powered-By');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS, PUT, POST');
    next();
  };
};
