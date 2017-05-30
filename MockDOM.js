const HtmlParser = require('htmlparser');
const redis = require("redis");
let client = require("redis").createClient("redis://redistogo:8b2186cfc25a6e2e59d0cf6af0daf7b9@greeneye.redistogo.com:10702/");

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
