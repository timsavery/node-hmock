var uuid = require('node-uuid');

function RequestExpectation() {
		var self = this
			, id = uuid.v4();

		var method
			, headers = {}
			, body
			, res
			, href;

		this.getId = function() {
			return id;
		};

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
			return res;
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
			if (typeof key !== 'string')
				throw new TypeError('Expected a {String} for parameter "key"');

			headers[key] = value;

			return self;
		};

		this.withHeaders = function(pairs) {
			if (typeof pairs !== 'object')
				throw new TypeError('Expected an {Object} for parameter "pairs"');

			for (var key in Object.keys(pairs))
				headers[key] = pairs[key];

			return self;
		};

		this.withBody = function(data) {
			body = data;

			return self;
		};

		this.respond = function(data) {
			res = data;
		};
	}

	module.exports = RequestExpectation;