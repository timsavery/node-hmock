var hmock = require('../index')
  , expect = require('chai').expect
  , request = require('request');

function MyClass() {
  var self = this;

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
      , headers: {
          'X-Custom': 'value'
        }
  	};

    request.post(options, function(err, res, body) {
      callback(err, body);
    });
  };

  this.postSomethingTwice = function(callback) {
    var results = [];

    self.postSomething(function(err, result) {
      if (err) return callback(err);

      results.push(result);

      self.postSomething(function(err, result) {
        if (err) return callback(err);

        results.push(result);

        callback(err, results);
      });
    });
  };
};

describe('hmock', function() {
  beforeEach(function() {
    hmock.reset();
  });

  describe('#getSomething', function() {
    it('should make a GET request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // setup http expectations
      hmock.expect()
        .get('http://somewhere:3000/out/there')
        .respond(expectedResponse);

      new MyClass().getSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify http expectations
        hmock.verifyExpectations();

        done();
      });
    });
  });

  describe('#postSomething', function() {
    it('should make a POST request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // setup http expectations
      hmock.expect()
        .post('http://somewhere:3000/out/there')
        .withHeader('X-Custom', 'value')
        .withBody({ key: 'value' })
        .respond(expectedResponse);

      new MyClass().postSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify http expectations
        hmock.verifyExpectations();

        done();
      });
    });
  });

  describe('#postSomethingTwice', function() {
    it('should make two POST requests and get two responses', function(done) {
      var expectedResponse = { ok: true };

      hmock.expect()
        .post('http://somewhere:3000/out/there')
        .withHeader('X-Custom', 'value')
        .withBody({ key: 'value' })
        .respond(expectedResponse)
        .twice();

      new MyClass().postSomethingTwice(function(err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal([expectedResponse, expectedResponse]);

        hmock.verifyExpectations();

        done();
      });
    });
  });
});