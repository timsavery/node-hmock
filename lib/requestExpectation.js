var ResponseExpectation = require('./responseExpectation');

/**
 * RequestExpectation
 */
function RequestExpectation() {
  var self = this,
      method,
      headers = {},
      body,
      href,
      response = new ResponseExpectation();

  this.getMethod = function() {
    return method;
  };

  this.getHref = function() {
    return href;
  };

  this.getBody = function() {
    return body;
  };

  this.getHeaders = function() {
    return headers;
  };

  this.getResponse = function() {
    return response;
  };

  this.post = function(url) {
    href = url;
    method = 'POST';
    return self;
  };

  this.get = function(url) {
    href = url;
    method = 'GET';
    return self;
  };

  this.del = function(url) {
    href = url;
    method = 'DELETE';
    return self;
  };

  this.put = function(url) {
    href = url;
    method = 'PUT';
    return self;
  };

  this.patch = function(url) {
    href = url;
    method = 'PATCH';
    return self;
  };

  this.head = function(url) {
    href = url;
    method = 'HEAD';
    return self;
  };

  this.withHeader = function(key, value) {
    headers[key] = value;
    return self;
  };

  this.withHeaders = function(pairs) {
    for (var key in pairs) {
      headers[key] = pairs[key];
    }
    return self;
  };

  this.withBody = function(data) {
    body = data;
    return self;
  };

  this.respond = function() {
    return response;
  };
}

/**
 * Export
 */
module.exports = RequestExpectation;