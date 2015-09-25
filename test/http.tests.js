/*jshint expr: true*/

var http = require('http');
var hmock = require('../src/hmock');
var expect = require('chai').expect;

function MyClass() {
  this.getSomethingByUrlString = function (callback) {
    var req = http.request('http://somewhere:3000/out/there', function(res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function (data) {
      callback(data);
    });

    req.end();
  };

  this.getSomething = function (callback) {
    var options = {
      hostname: 'somewhere',
      port: 3000,
      path: '/out/there'
    };

    var req = http.request(options, function (res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function (data) {
      callback(data);
    });

    req.end();
  };

  this.postSomething = function (callback) {
    var options = {
      hostname: 'somewhere',
      port: 3000,
      path: '/out/there',
      method: 'POST',
      headers: {
        'X-Custom': 'value'
      }
    };

    var req = http.request(options, function (res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function (data) {
      callback(data);
    });

    req.write(JSON.stringify({ key: 'value' }));
    req.end();
  };
}

describe('hmock.http', function () {
  
  before(hmock.mock);
  
  after(hmock.restore);
  
  describe('#getSomething', function () {
    it('should make a GET request and get a response', function (done) {
      var expectedResponse = { ok: true };

      // setup http expectations
      hmock.expect()
        .get('http://somewhere:3000/out/there')
        .respond()
        .withBody(expectedResponse);

      new MyClass().getSomething(function (err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify http expectations
        hmock.verify();

        done();
      });
    });
  });

  describe('#postSomething', function () {
    it('should make a POST request and get a response', function (done) {
      var expectedResponse = { ok: true };

      // setup http expectations
      hmock.expect()
        .post('http://somewhere:3000/out/there')
        .withHeader('X-Custom', 'value')
        .withBody({ key: 'value' })
        .respond()
        .withBody(expectedResponse);

      new MyClass().postSomething(function (err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify http expectations
        hmock.verify();

        done();
      });
    });
  });

  describe('#getSomethingByUrlString', function () {
    it('should make a GET request and get a response', function (done) {
      var expectedResponse = { ok: true };

      // setup http expectations
      hmock.expect()
        .get('http://somewhere:3000/out/there')
        .respond()
        .withBody(expectedResponse);

      new MyClass().getSomethingByUrlString(function (err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify http expectations
        hmock.verify();

        done();
      });
    });
  });
});