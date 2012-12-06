var hmock = require('../index')
	, expect = require('chai').expect;

describe('RequestExpectation', function() {
	describe('#()', function() {
		var e = new hmock.RequestExpectation();

		it('expected times should equal one', function() {
			expect(e.getExpectedTimes()).to.equal(1);
		});

		it('actual times should equal zero', function() {
			expect(e.getActualTimes()).to.equal(0);
		});
  });

  describe('#once()', function() {
  	it('should set the expected time to one', function() {
  		var e = new hmock.RequestExpectation();
  		e.once();

  		expect(e.getExpectedTimes()).to.be.equal(1);
  	});
  });

  describe('#twice()', function() {
  	it('should set the expected times to two', function() {
  		var e = new hmock.RequestExpectation();
  		e.twice();

  		expect(e.getExpectedTimes()).to.be.equal(2);
  	});
  });

  describe('#thrice()', function() {
  	it('should set the expected times to three', function() {
  		var e = new hmock.RequestExpectation();
  		e.thrice();

  		expect(e.getExpectedTimes()).to.be.equal(3);
  	});
  });

  describe('#times(num)', function() {
  	it('should set the expected times to the specified number', function() {
  		var e = new hmock.RequestExpectation();
  		e.times(5);

  		expect(e.getExpectedTimes()).to.be.equal(5);
  	});
  });

  describe('#touch()', function() {
  	it('should increment the actual times the expectation was met', function() {
  		var e = new hmock.RequestExpectation();

  		expect(e.getActualTimes()).to.be.equal(0);

  		e.touch();

  		expect(e.getActualTimes()).to.be.equal(1);
  	});
  });

  describe('#isSatisfied()', function() {
  	var e = new hmock.RequestExpectation();

  	it('should return false when expected times does not equal actual times', function() {
  		expect(e.isSatisfied()).to.be.false;
  	});

  	it('should return true when expected times equals actual times', function() {
  		e.touch();

  		expect(e.isSatisfied()).to.be.true;
  	});
  });

  describe('#get(href)', function() {
  	var href = 'http://localhost:3000'
  		, e = new hmock.RequestExpectation().get(href);

  	it('should set the method', function() {
  		expect(e.getMethod()).to.equal('GET');
  	});

  	it('should set the href', function() {
  		expect(e.getHref()).to.equal(href);
  	});
  });

  describe('#post(href)', function() {
  	var href = 'http://localhost:3000'
  		, e = new hmock.RequestExpectation().post(href);

  	it('should set the method', function() {
  		expect(e.getMethod()).to.equal('POST');
  	});

  	it('should set the href', function() {
  		expect(e.getHref()).to.equal(href);
  	});
  });

  describe('#withHeader', function() {
  	var key = 'key'
  		, value = 'value'
  		, e = new hmock.RequestExpectation().withHeader(key, value);

  	it('should create a new property on the headers object', function() {
  		expect(e.getHeaders()[key]).to.equal(value);
  	});
  });

  describe('#withHeaders', function() {
  	var key1 = 'key1'
  		, value1 = 'value1'
  		, key2 = 'key2'
  		, value2 = 'value2'
  		, e = new hmock.RequestExpectation().withHeaders({
  					key1: value1
  				, key2: value2
  			});

  	it('should create multiple new properties on the headers object', function() {
  		expect(e.getHeaders()[key1]).to.be.equal(value1);
  		expect(e.getHeaders()[key2]).to.be.equal(value2);
  	});
  });

  describe('#withBody', function() {
  	var body = {
	  			key: 'value'
	  		}
	  	,	e = new hmock.RequestExpectation().withBody(body);

	  it('should set the body', function() {
	  	expect(e.getBody()).to.deep.equal(body);
	  });
  });

  describe('#respond', function() {
  	var response = {
		  		ok: true
		  	}
		  , e = new hmock.RequestExpectation().respond(response);

		it('should set the response', function() {
			expect(e.getResponse()).to.deep.equal(response);
		});
  });
});