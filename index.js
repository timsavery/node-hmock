module.exports = process.env.HMOCK_COV
	? require('./lib-cov/hmock')
	: require('./lib/hmock');