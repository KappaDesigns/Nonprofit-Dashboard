const HtmlParser = require('htmlparser');
const redis = require("./redis");
const client = redis.client;

class MockDOM {
	constructor(html, path, next) {
		this.path = path;
		let handler = new HtmlParser.DefaultHandler((err, dom) => {
			if (err) {
				throw err;
			}
			this.setDOM(dom, next);
		}, { verbose: false, ignoreWhitespace: true })

		let parser = new HtmlParser.Parser(handler);
		parser.parseComplete(html);
	}

	setDOM(DOM, next) {
		client.incr('UUID', (err, val) => {
			if (err) {
				throw err;
			}
			this.id = val;
			next(this);
		})
		this.DOM = DOM
	}
}

module.exports = MockDOM;
