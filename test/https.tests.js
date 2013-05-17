var https = require('https')
  , hmock = require('../index')
  , expect = require('chai').expect;

function MyClass() {
  this.getSomethingByUrlString = function(callback) {
    var req = https.request('https://somewhere:3000/out/there', function(res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function(data) {
      callback(data);
    });

    req.end();
  };

  this.getSomething = function(callback) {
  	var options = {
      protocol: 'https',
  	  hostname: 'somewhere',
      port: 3000,
      path: '/out/there'
  	};

    var req = https.request(options, function(res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function(data) {
      callback(data);
    });

    req.end();
  };

  this.postSomething = function(callback) {
  	var options = {
      protocol: 'https',
      hostname: 'somewhere',
      port: 3000,
      path: '/out/there',
      method: 'POST',
      headers: {
        'X-Custom': 'value'
      }
    };

    var req = https.request(options, function(res) {
      res.setEncoding('utf8');

      var data = '';
      res.on('data', function(chunk) {
        data += chunk;
      });

      res.on('end', function() {
        callback(null, JSON.parse(data));
      });
    });

    req.on('error', function(data) {
      callback(data);
    });

    req.write(JSON.stringify({ key: 'value' }));
    req.end();
  };
};

describe('hmock.https', function() {
  describe('#getSomething', function() {
    it('should make a GET request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // setup https expectations
      hmock.expect()
        .get('https://somewhere:3000/out/there')
        .respond()
        .withBody(expectedResponse);

      new MyClass().getSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify https expectations
        hmock.verifyExpectations();

        done();
      });
    });
  });

  describe('#postSomething', function() {
    it('should make a POST request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // setup https expectations
      hmock.expect()
        .post('https://somewhere:3000/out/there')
        .withHeader('X-Custom', 'value')
        .withBody({ key: 'value' })
        .respond()
        .withBody(expectedResponse);

      new MyClass().postSomething(function(err, result) {
      	expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify https expectations
        hmock.verifyExpectations();

        done();
      });
    });
  });

  describe('#getSomethingByUrlString', function() {
    it('should make a GET request and get a response', function(done) {
      var expectedResponse = { ok: true };

      // setup https expectations
      hmock.expect()
        .get('https://somewhere:3000/out/there')
        .respond()
        .withBody(expectedResponse);

      new MyClass().getSomethingByUrlString(function(err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResponse);

        // verify https expectations
        hmock.verifyExpectations();

        done();
      });
    });
  });
});