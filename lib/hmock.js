var http = require('http'),
		MockedRequest = require('./mockedRequest'),
		RequestExpectation = require('./requestExpectation');

/**
 * hmock
 */
function hmock() {
	// expectation collection
	expectations = [];

	// save the original
	http._request = http.request;

	/**
	 * Override http.request
	 *
	 * DISCLAIMER: I know most people think this is a horrible
	 * 						 practice; I agree, but at the end of the day
	 * 						 this gets the job done and it is only meant 
	 * 						 to be used during unit testing anyway.
	 */
	http.request = function(options, callback) {
		return new MockedRequest(options, expectations.shift(), callback);
	};
	
	/**
	 * Creates and returns a new expectation to be configured.
	 *
	 * @api public
	 */
	this.expect = function() {
		var e = new RequestExpectation();

		expectations.push(e);

		return e;
	};

	/**
	 * Verifies that all defines expectations have been satisfied.
	 *
	 * @api public
	 */
	this.verifyExpectations = function() {
		var verified = expectations.length === 0;

		expectations = [];

		if (!verified) {
			throw new Error('Not all expectations were met during the test.');
		}
	};
};

/**
 * Expose
 */
module.exports = new hmock();