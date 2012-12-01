var url = require('url')
	, http = require('http')
	, util = require('util')
	, events = require('events')
	, deepEqual = require('deep-equal')
	, MockedResponse = require('./mockedResponse');

/**
 * MockedRequest
 */
function MockedRequest(options, callback) {
	events.EventEmitter.call(this);

	if (typeof options === 'string')
		options = url.parse(options);

	var self = this
		, writtenData = ''
		, options = options;

	/**
	 * Overrides ClientRequest.end to try and find a matching
	 * expectation for the request and issue the expected response.
	 *
	 * @api public
	 */
	this.end = function() {
		var e = findExpectation();

		self.emit('hit', e.getId());

		var res = new MockedResponse();

		callback(res);

		res.emit('data', JSON.stringify(e.getResponse()));
		res.emit('end');
	};

	/**
	 * Overrides ClientRequest.write to capture the request body.
	 *
	 * @param {String} data
	 *
	 * @api public
	 */
	this.write = function(data) {
		writtenData += data;
	};

	/**
	 * Finds an expectation that matches the current request.
	 *
	 * @api private
	 */
	function findExpectation() {
		var hostname = ((options.hostname || options.host) || 'localhost')
			, port = options.port || 80
			, path = options.path || '/'
			, method = (options.method ? options.method : 'GET').toLowerCase();

		var href = 'http://'.concat(hostname).concat(':').concat(port).concat(path).toLowerCase();

		for (var i = 0; i < http._expectations.length; i++) {
			var eBody = http._expectations[i].getBody()
				, eHeaders = http._expectations[i].getHeaders()
				, eHref = http._expectations[i].getHref().toLowerCase()
				, eMethod = http._expectations[i].getMethod().toLowerCase();

			// same http method?
			if (eMethod == method) {
				// do the actual url strings match?
				if (eHref == href) {
					// assume a match unless we prove otherwise
					var isMatch = true;

					// if expected headers were specified, then 
					// need to confirm that the expected headers
					// are in the actual headers of the request
					if (eHeaders && eHeaders.length > 0) {
						if (!options.headers)
							isMatch = false;
						else {
							for (var key in Object.keys(eHeaders)) {
								if (!options.headers[key] || options.headers[key] != eHeaders[key]) {
									isMatch = false;
									break; // an expected header was not found in the request headers collection
								}
							}	
						}
					}

					// if expected body was specified, then
					// need to confirm that the expected body
					// matches the actual body of the request
					if (eBody) {
						if (writtenData) {
							if (typeof eBody === 'string')
								isMatch = writtenData == eBody;
							else if (typeof eBody === 'object')
								isMatch = deepEqual(JSON.parse(writtenData), eBody)
							else 
								isMatch = false;
						} else {
							isMatch = false; // not body data received, but a body was expected
						}
					}

					if (isMatch)
						return http._expectations[i];
				}
			}
		}

		// no expectation found this request
		self.emit('unexpected', {
				method: method
			, href: href
		});
	};
};

/**
 * Inherit from EventEmitter
 */
util.inherits(MockedRequest, events.EventEmitter);

/**
 * Expose
 */
module.exports = MockedRequest;