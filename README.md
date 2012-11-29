`node-hmock`: Very simple http request/response mocking for Node.JS
===================================================================

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
  this.someMethod = function(callback) {
    request.get('http://somewhere:3000/out/there', function(err, res, body) {
      callback(err, body);
    });
  };
};

describe('MyClass', function() {
  describe('#someMethod', function() {
    it('should make an http call and get a response', function(done) {
      var expectedResponse = {
        ok: true
      };

      // mock the expected request
      new hmock().get('http://somewhere:3000/out/there', expectedResponse);

      var myClassInstance = new MyClass();

      myClassInstance.someMethod(function(err, result) {
        expect(err).to.be.null;
        expect(result).to.deep.equal(expectedResult);

        done();
      });
    });
  });
});
```

License
-------

           DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

            0. You just DO WHATEVER THE FUCK YOU WANT.