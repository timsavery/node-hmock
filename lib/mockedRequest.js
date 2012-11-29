var util = require('util')
	, events = require('events')
	, MockedResponse = require('./mockedResponse');

/**
 * MockedRequest
 */
function MockedRequest(response, callback) {
	events.EventEmitter.call(this);

	var self = this
		, response = response;

	this.end = function() {
		var res = new MockedResponse(response);

		callback(res);

		res.emit('data', JSON.stringify(response));
		res.emit('end');
	};

	this.write = function() {};
};

/**
 * Inherit from EventEmitter
 */
util.inherits(MockedRequest, events.EventEmitter);

/**
 * Expose
 */
module.exports = MockedRequest;