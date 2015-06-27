var ResponseExpectation = require('./responseExpectation');

/**
 * RequestExpectation
 */
function RequestExpectation() {

  var self = this;

  var headers = {};
  var body;
  var href;
  var response = new ResponseExpectation();

  this.getHref = function () {
    return href;
  };

  this.getBody = function () {
    return body;
  };

  this.getHeaders = function () {
    return headers;
  };

  this.getResponse = function () {
    return response;
  };

  this.post = function (url) {
    href = 'POST ' + url;
    return self;
  };

  this.get = function (url) {
    href = 'GET ' + url;
    return self;
  };

  this.del = function (url) {
    href = 'DELETE ' + url;
    return self;
  };

  this.put = function (url) {
    href = 'PUT ' + url;
    return self;
  };

  this.patch = function (url) {
    href = 'PATCH ' + url;
    return self;
  };

  this.head = function (url) {
    href = 'HEAD ' + url;
    return self;
  };

  this.withHeader = function (key, value) {
    headers[key] = value;
    return self;
  };

  this.withHeaders = function (pairs) {
    for (var key in pairs) {
      headers[key] = pairs[key];
    }
    return self;
  };

  this.withBody = function (data) {
    body = data;
    return self;
  };

  this.respond = function () {
    return response;
  };

}

/**
 * Export
 */
module.exports = RequestExpectation;