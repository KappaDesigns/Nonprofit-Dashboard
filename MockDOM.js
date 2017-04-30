const HtmlParser = require('htmlparser');
const redis = require("redis");
const client = redis.createClient();

class MockDOM {
	constructor(html, path, next) {
		this.path = path;
		let handler = new HtmlParser.DefaultHandler((err, dom) => {
			if (err) {
				throw err;
			}
			this.setDOM(dom, next);
		})

		let parser = new HtmlParser.Parser(handler);
		parser.parseComplete(html);
	}

	setDOM(DOM, next) {
		client.incr('UUID', (err, val) => {
			if (err) {
				throw err;
			}
			this.id = val;
			console.log(this.id);
			next(this);
		})
		this.DOM = DOM
	}
}

module.exports = MockDOM;
