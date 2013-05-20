module.exports = process.env._COV
  ? require('./lib-cov/hmock')
  : require('./lib/hmock');