var hmock = require('../index')
    expect = require('chai').expect;

var ResponseExpectation = (process.env._COV) 
  ? require('../lib-cov/responseExpectation')
  : require('../lib/responseExpectation');

var RequestExpectation = (process.env._COV) 
  ? require('../lib-cov/requestExpectation')
  : require('../lib/requestExpectation');

describe('RequestExpectation', function() {
	describe('#get(href)', function() {
  	var href = 'http://localhost:3000',
  		  e = new RequestExpectation(),
        result = e.get(href);

  	it('should set the method', function() {
  		expect(e.getMethod()).to.equal('GET');
  	});

  	it('should set the href', function() {
  		expect(e.getHref()).to.equal(href);
  	});

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#post(href)', function() {
  	var href = 'http://localhost:3000',
    		e = new RequestExpectation(),
        result = e.post(href);

  	it('should set the method', function() {
  		expect(e.getMethod()).to.equal('POST');
  	});

  	it('should set the href', function() {
  		expect(e.getHref()).to.equal(href);
  	});

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#del(href)', function() {
    var href = 'http://localhost:3000',
        e = new RequestExpectation(),
        result = e.del(href);

    it('should set the method', function() {
      expect(e.getMethod()).to.equal('DELETE');
    });

    it('should set the href', function() {
      expect(e.getHref()).to.equal(href);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#put(href)', function() {
    var href = 'http://localhost:3000',
        e = new RequestExpectation(),
        result = e.put(href);

    it('should set the method', function() {
      expect(e.getMethod()).to.equal('PUT');
    });

    it('should set the href', function() {
      expect(e.getHref()).to.equal(href);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#patch(href)', function() {
    var href = 'http://localhost:3000',
        e = new RequestExpectation(),
        result = e.patch(href);

    it('should set the method', function() {
      expect(e.getMethod()).to.equal('PATCH');
    });

    it('should set the href', function() {
      expect(e.getHref()).to.equal(href);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#head(href)', function() {
    var href = 'http://localhost:3000',
        e = new RequestExpectation(),
        result = e.head(href);

    it('should set the method', function() {
      expect(e.getMethod()).to.equal('HEAD');
    });

    it('should set the href', function() {
      expect(e.getHref()).to.equal(href);
    });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#withHeader(key, value)', function() {
  	var key = 'key',
  		  value = 'value',
  		  e = new RequestExpectation(),
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
  		  e = new RequestExpectation(),
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
	  	  e = new RequestExpectation(),
        result = e.withBody(body);

	  it('should set the body', function() {
	  	expect(e.getBody()).to.deep.equal(body);
	  });

    it('should return a reference to itself', function() {
      expect(result).to.equal(e);
    });
  });

  describe('#respond()', function() {
  	var r = new RequestExpectation().respond();

		it('should set the response', function() {
			expect(r).to.be.an.instanceof(ResponseExpectation);
		});
  });
});