/*jshint expr: true*/

var http = require('http');
var https = require('https');
var hmock = require('../src/hmock');
var expect = require('chai').expect;
var RequestExpectation = require('../src/requestExpectation');

describe('hmock', function () {
  describe('#()', function () {
    it('should not mock the request object until required to do so', function () {
      expect(http._request).to.not.exist;
      expect(https._request).to.not.exist;
    });
  });
  
  describe('#mock', function () {
    it('should mock the request object of both http and https', function () {
      hmock.mock();
      expect(http.request).to.be.an.instanceOf(Function);
      expect(http.request.name).to.eql('mockRequest');
      expect(https.request).to.be.an.instanceOf(Function);
      expect(https.request.name).to.eql('mockRequest');
    });
  });
  
  describe('#restore', function () {
    it('should restore the original request function to http and https.', function () {
      hmock.restore();
      expect(http.request.name).to.not.eql('mockRequest');
      expect(https.request.name).to.not.eql('mockRequest');
      expect(http._request).to.not.exist;
      expect(https._request).to.not.exist;
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