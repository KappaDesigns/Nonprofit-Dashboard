const Queue = require('./Queue');
const Stack = require('./Stack');
const MockHTMLTag = require('./MockHTMLTag');

class MockDOM {
	constructor(domString) {
		this.parseDOM(domString);
	}

	parseDOM(DOM) {
		let parsedTags = this.parseTags(DOM);
		this.head = this.parseHead(parsedTags);
		this.body = this.parseBody(parsedTags);
	}

	parseTags(DOM) {
		let a = []
		let parse = DOM.split(/\r?\n|\r/g);
		if (parse[0].includes("!")) {
			parse.splice(0, 1);
		}
		for (let i = 0; i < parse.length; i++) {
			parse[i] = parse[i].trim();
		}
		for (let i = 0; i < parse.length - 1; i++) {
			let parts = parse[i].split(" ");
			let tag = parts[0].substring(1, parts[0].length);
			if (tag[i] != tag[i + 1]) {

			}
		}
		return parse;
	}

	parseHead(parsedTags) {
		let headIndex = this.indexOfTag("<head>", parsedTags);
		let closeIndex = this.indexOfTag("</head>", parsedTags);
		let headTags = this.splitArray(headIndex, closeIndex, parsedTags);
		let mockHeadTags = [];
		for (let i = 0; i < headTags.length; i++) {
			let tag = new MockHTMLTag(headTags[i]);
			if (!headTags[i].includes("title")) {
				tag.parseHeadTag(headTags[i]);
			} else {
				tag.title = headTags[i + 1];
				i += 2;
			}
			mockHeadTags.push(tag);
		}
		return mockHeadTags;
	}

	parseBody(parsedTags) {
		let bodyIndex = this.indexOfTag("<body>", parsedTags);
		let closeIndex = this.indexOfTag("</body>", parsedTags);
		let bodyTags = this.splitArray(bodyIndex, closeIndex, parsedTags);
		let stack = new Stack();
		let body = new MockHTMLTag(bodyTags[0]);
		let current = new MockHTMLTag(bodyTags[1]);
		let parent = body;
		parent.children.push(current);
		for (let i = 2; i < bodyTags.length; i++) {
			let newTag = new MockHTMLTag(bodyTags[i]);
			if (this.openTag(bodyTags[i])) {
				current.children.push(newTag);
				stack.push(parent);
				parent = current;
				current = newTag;
			} else if (this.closeTag(bodyTags[i])) {
				current = parent;
				parent = stack.pop();
			} else {
				current.text = bodyTags[i];
			}
		}
		return body;
	}

	splitArray(start, end, a) {
		let newA = [];
		for (let i = start; i <= end; i++) {
			newA.push(a[i]);
		}
		return newA;
	}

	indexOfTag(tag, a) {
		for (let i = 0; i < a.length; i++) {
			if (a[i] == tag) {
				return i;
			}
		}
		return -1;
	}

	openTag(tag) {
		return !tag.includes("</") && tag.includes("<")
	}

	closeTag(tag) {
		return tag.includes("</")
	}

	print() {
		console.log(this);
	}
}

module.exports = MockDOM;
