const Queue = require('./Queue');
const Stack = require('./Stack');
const HtmlParser = require('htmlparser');

class MockDOM {
	constructor(html) {
		let handler = new HtmlParser.DefaultHandler((err, dom) => {
			if (err) {
				throw err;
			}
			this.setDOM(dom);
		})

		let parser = new HtmlParser.Parser(handler);
		parser.parseComplete(html);
	}

	setDOM(DOM) {
		this.DOM = DOM
	}
}

module.exports = MockDOM;
