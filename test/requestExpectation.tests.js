/*jshint expr: true*/

var hmock = require('../src/hmock');
var expect = require('chai').expect;
var RequestExpectation = require('../src/requestExpectation');
var ResponseExpectation = require('../src/responseExpectation');

describe('RequestExpectation', function () {
  describe('#get(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.get(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('GET ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#post(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.post(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('POST ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#del(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.del(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('DELETE ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#put(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.put(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('PUT ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#patch(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.patch(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('PATCH ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#head(href)', function () {
    var href = 'http://localhost:3000';
    var e = new RequestExpectation();
    var result = e.head(href);

    it('should set the href', function () {
      expect(e.getHref()).to.equal('HEAD ' + href);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#withHeader(key, value)', function () {
    var key = 'key';
    var value = 'value';
    var e = new RequestExpectation();
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
    var e = new RequestExpectation();
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
    var e = new RequestExpectation();
    var result = e.withBody(body);

    it('should set the body', function () {
      expect(e.getBody()).to.deep.equal(body);
    });

    it('should return a reference to itself', function () {
      expect(result).to.equal(e);
    });
  });

  describe('#respond()', function () {
    var r = new RequestExpectation().respond();

    it('should set the response', function () {
      expect(r).to.be.an.instanceof(ResponseExpectation);
    });
  });
});