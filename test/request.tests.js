var hmock = require('../index')
  , expect = require('chai').expect
  , request = require('request');

function MyClass() {
  this.getSomething = function(callback) {
  	var options = {
	  		json: true
  		, url: 'http://somewhere:3000/out/there'
  	};

    request.get(options, function(err, res, body) {
      callback(err, body);
    });
  };

  this.postSomething = function(callback) {
  	var options = {
	  		json: { key: 'value' }
  		, url: 'http://somewhere:3000/out/there'
  	};

    request.post(options, function(err, res, body) {
      callback(err, body);
    });
  };
};

describe('MyClass', function() {
  describe('#getSomething', function() {
    it('should make a GET request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // mock the expected request/response
      new hmock().get('http://somewhere:3000/out/there', expectedResponse);

      new MyClass().getSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        done();
      });
    });
  });

  describe('#postSomething', function() {
    it('should make a POST request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // mock the expected request/response
      new hmock().post('http://somewhere:3000/out/there', expectedResponse);

      new MyClass().postSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        done();
      });
    });
  });
});