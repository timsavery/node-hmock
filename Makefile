
REPORTER= spec

check: test

test: test-unit

test-unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --reporter $(REPORTER) --recursive

test-cov: lib-cov
	@_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov: clean
	@jscoverage lib lib-cov

clean:
	rm -f coverage.html
	rm -fr lib-cov
