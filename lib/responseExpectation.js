/**
 * ResponseExpectation
 */
function ResponseExpectation() {
	var self = this
		, headers = {}
		, body
		, statusCode;			

	/**
	 * Gets the body of this expectation.
	 */
	this.getBody = function() {
		return body;
	};

	/**
	 * Gets the headers of this expectation.
	 */
	this.getHeaders = function() {
		return headers;
	};

	/**
	 * Gets the status code of this expecation.
	 */
	this.getStatusCode = function() {
		return statusCode;
	};

	/**
	 * Sets the status code of this expecation.
	 *
	 * @param {Number} code
	 * @api public
	 */
	this.withStatusCode = function(code) {
		statusCode = code;
		return self;
	};

	/**
	 * Adds a header to this expectation.
	 *
	 * @param {String} key
	 * @param {String | Number} value
	 * @api public
	 */
	this.withHeader = function(key, value) {
		headers[key] = value;
		return self;
	};

	/**
	 * Adds a set of headers to this expectation.
	 *
	 * @param {Object} pairs
	 * @api public
	 */
	this.withHeaders = function(pairs) {
		for (var key in pairs) {
			headers[key] = pairs[key];
		}
		return self;
	};

	/**
	 * Sets the body of this expectation.
	 * 
	 * @param {Object} data
	 * @api public 
	 */
	this.withBody = function(data) {
		body = data;
		return self;
	};
};

/**
 * Export
 */
module.exports = ResponseExpectation;