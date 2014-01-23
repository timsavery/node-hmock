/*jshint expr: true*/

var expect = require('chai').expect;
var ResponseExpectation = require('../src/responseExpectation');

describe('ResponseExpectation', function () {
  describe('#withHeader(key, value)', function () {
    var key = 'key';
    var value = 'value';
    var e = new ResponseExpectation();
    var result = e.withHeader(key, value);

    it('should create a new property on the headers object', function () {
      expect(e.getHeaders()[key]).to.equal(value);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#withHeaders(pairs)', function () {
    var key1 = 'key1';
    var value1 = 'value1';
    var key2 = 'key2';
    var value2 = 'value2';
    var e = new ResponseExpectation();
    var result = e.withHeaders({
      key1: value1,
      key2: value2
    });

    it('should create multiple new properties on the headers object', function () {
      expect(e.getHeaders()[key1]).to.be.equal(value1);
      expect(e.getHeaders()[key2]).to.be.equal(value2);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#withBody(data)', function () {
    var body = { key: 'value' };
    var e = new ResponseExpectation();
    var result = e.withBody(body);

    it('should set the body', function () {
      expect(e.getBody()).to.deep.equal(body);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#withStatusCode(code)', function () {
    var code = 500;
    var e = new ResponseExpectation();
    var result = e.withStatusCode(code);

    it('should set the status code', function () {
      expect(e.getStatusCode()).to.equal(code);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });
});