var expect = require('chai').expect;

var ResponseExpectation = (process.env._COV) 
  ? require('../lib-cov/responseExpectation')
  : require('../lib/responseExpectation');

describe('ResponseExpectation', function() {
  describe('#withHeader(key, value)', function() {
    var key = 'key',
        value = 'value',
        e = new ResponseExpectation(),
        result = e.withHeader(key, value);

    it('should create a new property on the headers object', function() {
      expect(e.getHeaders()[key]).to.equal(value);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#withHeaders(pairs)', function() {
    var key1 = 'key1',
        value1 = 'value1',
        key2 = 'key2',
        value2 = 'value2',
        e = new ResponseExpectation(),
        result = e.withHeaders({
            key1: value1
          , key2: value2
        });

    it('should create multiple new properties on the headers object', function() {
      expect(e.getHeaders()[key1]).to.be.equal(value1);
      expect(e.getHeaders()[key2]).to.be.equal(value2);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#withBody(data)', function() {
    var body = {
          key: 'value'
        },
        e = new ResponseExpectation(),
        result = e.withBody(body);

    it('should set the body', function() {
      expect(e.getBody()).to.deep.equal(body);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#withStatusCode(code)', function() {
    var code = 500,
        e = new ResponseExpectation(),
        result = e.withStatusCode(code);

    it('should set the status code', function() {
      expect(e.getStatusCode()).to.equal(code);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });
});