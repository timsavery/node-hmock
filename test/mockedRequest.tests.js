var events = require('events'),
		hmock = require('../index');

var MockedRequest = (process.env.HMOCK_COV) 
  ? require('../lib-cov/mockedRequest')
  : require('../lib/mockedRequest');

var MockedResponse = (process.env.HMOCK_COV) 
  ? require('../lib-cov/mockedResponse')
  : require('../lib/mockedResponse');

var RequestExpectation = (process.env.HMOCK_COV) 
  ? require('../lib-cov/requestExpectation')
  : require('../lib/requestExpectation');

describe('MockedRequest', function() {
	describe('#()', function() {
		it('should inherit from EventEmitter', function() {
			expect(new MockedRequest()).to.be.an.instanceof(events.EventEmitter);
		});
	});

	describe('#end()', function() {
		it('should pass a MockedResponse instance to the callback initialized with the expected headers and status code.', function(done) {
			var expectation = new RequestExpectation();

			expectation
				.get('http://somewhere/out/there')
				.respond()
				.withBody('body data')
				.withHeader('X-TEST', 'VALUE')
				.withStatusCode(200);

			var request = new MockedRequest({ method: 'GET', url: 'http://somewhere/out/there' }, expectation, function(res) {
				expect(res).to.be.an.instanceof(MockedResponse);
				expect(res.statusCode).to.equal(expectation.getResponse().getStatusCode());
				expect(res.headers).to.deep.equal(expectation.getResponse().getHeaders());

				res.on('data', function(data) {
					expect(data).to.equal(expectation.getResponse().getBody());

					done();
				});
			}).end();
		});

		it('should throw when the http methods of expected and actual do not match', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation().post(),
						request = new MockedRequest({ method: 'GET' }, expectation);

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /method/i);
		});

		it('should throw when the expected url does not match the actual url.', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation().get('http://somewhere/out/there'),
						request = new MockedRequest('http://somewhere/not/out/there', expectation);

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /url/i);
		});

		it('should throw when expected headers are defined, but the actual request contains no headers', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withHeader('X-TEST', 'VALUE');

				new MockedRequest('http://somewhere/out/there', expectation).end();
			}

			expect(shouldThrow).to.throw(Error, /header/i);
		});

		it('should throw when an expected header is not contained in the actual request', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withHeader('X-TEST', 'VALUE');

				var request = new MockedRequest({
					url: 'http://somewhere/out/there',
					headers: {
						'X-BLAH': 'VALUE'
					}
				}, expectation);

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /X-TEST/i);
		});

		it('should throw when an expected header value does not match the actual header value', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withHeader('X-TEST', 'VALUE');

				var request = new MockedRequest({
					url: 'http://somewhere/out/there',
					headers: {
						'X-TEST': 'XVALUE'
					}
				}, expectation);

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /X-TEST/i);
		});

		it('should throw when an expected body is specified, but the actual request does not contain one', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withBody('TEST');

				var request = new MockedRequest('http://somewhere/out/there', expectation, function() {});

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /actual request did not contain one/i);
		});

		it('should throw when an expected string body is specified, but the actual string body does not match', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withBody('TEST');

				var request = new MockedRequest('http://somewhere/out/there', expectation, function() {});
				request.write('FAIL');

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /did not contain the expected body/i);
		});

		it('should throw when an expected body object is specified, but the actual body object does not match', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withBody({ KEY: 'VALUE' });

				var request = new MockedRequest('http://somewhere/out/there', expectation, function() {});
				request.write(JSON.stringify({ KEY: 'FAIL' }));

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /does not equal the actual request body/i);
		});

		it('should throw when an expected body object is specified, but the actual body does is invalid JSON', function() {
			function shouldThrow() {
				var expectation = new RequestExpectation()
					.get('http://somewhere/out/there')
					.withBody({ KEY: 'VALUE' });

				var request = new MockedRequest('http://somewhere/out/there', expectation, function() {});
				request.write('some invalid JSON');

				request.end();
			};

			expect(shouldThrow).to.throw(Error, /some invalid JSON/i);
		});
	});
});