`node-hmock`
------------

Very simple http request/response mocking for Node.JS

[![Build Status](https://secure.travis-ci.org/timsavery/node-hmock.png)](http://travis-ci.org/timsavery/node-hmock)

Installation
------------

`npm install hmock`

Usage
-----

```javascript
var hmock = require('hmock')
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
      , headers: {
          'X-Custom': 'value'
        }
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
});
```

License
-------

```text
            DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

            0. You just DO WHATEVER THE FUCK YOU WANT.
```