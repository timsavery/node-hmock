function RequestExpectation() {
		var self = this;

		var method
			, headers = {}
			, body
			, res
			, href
			, expectedTimes = 1
			, actualTimes = 0;

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

		this.getExpectedTimes = function() {
			return expectedTimes;
		};

		this.getActualTimes = function() {
			return actualTimes;
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

		this.respond = function(data) {
			res = data;

			return self;
		};

		this.once = function() {
			self.times(1);
		};

		this.twice = function() {
			self.times(2);
		};

		this.thrice = function() {
			self.times(3);
		};

		this.times = function(num) {
			expectedTimes = num;
		};

		this.touch = function() {
			actualTimes++;
		};

		this.isSatisfied = function() {
			return actualTimes === expectedTimes;
		};
	}

	module.exports = RequestExpectation;