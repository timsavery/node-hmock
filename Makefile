test: lint
	./node_modules/.bin/mocha --recursive

test-cov: lint
	rm -f coverage.html
	./node_modules/.bin/mocha --recursive --require blanket --reporter html-cov > coverage.html
	open coverage.html	

lint:
	./node_modules/.bin/jshint test/*.js 
	./node_modules/.bin/jshint src/*.js

.PHONY: test lint