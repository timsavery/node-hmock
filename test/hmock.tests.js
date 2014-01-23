/*jshint expr: true*/

var http = require('http');
var hmock = require('../src/hmock');
var expect = require('chai').expect;
var RequestExpectation = require('../src/requestExpectation');

describe('hmock', function () {
  describe('#()', function () {
    it('should set the original request function to a "_request" property on the http module', function () {
      expect(http._request).to.be.defined;
    });
  });

  describe('#expect()', function () {
    it('should return a new RequestException instance', function () {
      var e = hmock.expect();

      expect(e).to.be.an.instanceof(RequestExpectation);
    });
  });

  describe('#verifyExpectations()', function () {
    it('should throw when at least one expectation is not satisfied', function () {
      hmock.expect();

      var shouldThrow = function () {
        hmock.verify();
      };

      expect(shouldThrow).to.throw(Error, /not all/i);
    });
  });
});