var util = require('util')
	, events = require('events');

/**
 * MockedResponse
 */
function MockedResponse(data) {
	events.EventEmitter.call(this);

	this.headers = {};

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