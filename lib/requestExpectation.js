var ResponseExpectation = require('./responseExpectation');

/**
 * RequestExpectation
 */
function RequestExpectation() {
	var self = this,
			method,
			headers = {},
			body,
			href,
			response;

	this.getMethod = function() {
		return method;
	};

	this.getHref = function() {
		return href;
	};

	this.getBody = function() {
		return body;
	};

	this.getHeaders = function() {
		return headers;
	};

	this.getResponse = function() {
		return response;
	};

	this.post = function(url) {
		href = url;
		method = 'POST';
		return self;
	};

	this.get = function(url) {
		href = url;
		method = 'GET';
		return self;
	};

	this.withHeader = function(key, value) {
		headers[key] = value;
		return self;
	};

	this.withHeaders = function(pairs) {
		for (var key in pairs) {
			headers[key] = pairs[key];
		}
		return self;
	};

	this.withBody = function(data) {
		body = data;
		return self;
	};

	this.respond = function() {
		response = new ResponseExpectation();
		return response;
	};
}

/**
 * Export
 */
module.exports = RequestExpectation;