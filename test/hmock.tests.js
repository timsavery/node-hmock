var http = require('http')
	, hmock = require('../index')
	, expect = require('chai').expect;

describe('hmock', function() {
	beforeEach(function() {
		hmock.reset();
	});

	it('should set the original request function to a "_request" property on the http module', function() {
		expect(typeof http._request).to.equal('function');
	});

	describe('#expect()', function() {
		it('should return a new RequestException instance', function() {
			var e = hmock.expect();

			expect(e).to.be.an.instanceof(hmock.RequestExpectation);
		});
	});

	describe('#verifyExpectations()', function() {
		it('should throw when at least one expectation is not satisfied', function() {
			hmock.expect();

			var shouldThrow = function() {
				hmock.verifyExpectations();
			};

			expect(shouldThrow).to.throw(Error, /not all/i);
		});
	});
});