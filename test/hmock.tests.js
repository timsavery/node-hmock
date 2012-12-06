var http = require('http')
	, hmock = require('../index')
	, expect = require('chai').expect;

describe('hmock', function() {
	beforeEach(function() {
		hmock.reset();
	});

	it('should create a "_expectations" property on the http module', function() {
		expect(http._expectations).to.be.an.instanceof(Array);
		expect(http._expectations.length).to.equal(0);
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

	describe('#reset()', function() {
		it('should clear the expectations array when called', function() {
			hmock.expect();

			expect(http._expectations.length).to.equal(1);

			hmock.reset();

			expect(http._expectations.length).to.equal(0);
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