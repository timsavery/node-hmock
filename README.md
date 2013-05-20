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
describe('#getSomething', function() {
  it('should make a GET request and get a response', function(done) {
    var expectedResponse = { 
      ok: true 
    };

    hmock.expect()
      .get('http://somewhere:3000/out/there')
      .respond()
      .withBody(expectedResponse);

    new MyClass().getSomething(function(err, result) {
      assert.equal(null, err);
      assert.deepEqual(expectedResponse, result);

      hmock.verify();
      
      done();
    });
  });
});
```

*See test/http.tests.js and/or test/https.tests.js for more detailed examples.*

License
-------

```text
            DO WHATEVER THE FUCK YOU WANT, PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

            0. You just DO WHATEVER THE FUCK YOU WANT.
```