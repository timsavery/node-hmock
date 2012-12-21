var util = require('util'),
		events = require('events');

/**
 * MockedResponse
 */
function MockedResponse(headers, statusCode) {
	events.EventEmitter.call(this);

	this.headers = headers || {};
	
	this.statusCode = statusCode;

	this.setEncoding = function() {};

	this.connection = new events.EventEmitter();
};

/**
 * Inherit from EventEmitter
 */
util.inherits(MockedResponse, events.EventEmitter);

/**
 * Expose
 */
module.exports = MockedResponse;