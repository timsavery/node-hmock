/*jshint expr: true*/

var hmock = require('../src/hmock');
var request = require('request');
var expect = require('chai').expect;

function MyClass() {
  var self = this;

  this.getSomething = function (callback) {
    var options = {
      json: true,
      url: 'http://somewhere:3000/out/there'
    };

    request.get(options, function (err, res, body) {
      callback(err, body);
    });
  };

  this.postSomething = function (callback) {
    var options = {
      json: { key: 'value' },
      url: 'http://somewhere:3000/out/there',
      headers: {
        'X-Custom': 'value'
      }
    };

    request.post(options, function (err, res, body) {
      callback(err, body);
    });
  };
}

describe('hmock.request', function () {
  
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
});