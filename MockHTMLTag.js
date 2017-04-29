class MockHTMLTag {
	constructor(htmlString) {
		this.parseHtml(htmlString);
	}

	getTag() {
		if (this.tag.includes("/")) {
			return this.tag.substring(1, this.tag.length);
		}
		return this.tag;
	}

	parseHtml(htmlString) {
		if (!htmlString.includes("<") && !htmlString.includes(">")) {
			return;
		}
		let data = htmlString.substring(1, htmlString.length - 1);
		this.children = [];
		this.attributes = [];
		this.listeners = [];
		this.tag = this.parseTag(data);
		this.id = this.parseID(data);
		this.src = this.parseSrc(data);
		this.alt = this.parseAlt(data);
		this.parseAttributes(data, this.attributes);
		this.parseListeners(data, this.listeners);
		this.classes = this.parseClasses(data);
	}

	parseHeadTag(data) {
		if (!data.includes("</") && data.includes("<")) {
			let tag = data.substring(1, data.length - 1).split(" ")[0];
			let map = {};
			let attributes = data.substring(1, data.length - 1).split(" ");
			for (let i = 1; i < attributes.length; i++) {
				if (attributes[i].includes("=\"")) {
					let parts = attributes[i].split("=\"");
					let key = parts[0];
					let value = "";
					for (let i = 1; i < parts.length; i++) {
						value += parts[i];
					}
					map[i - 1] = {
						key: key,
						value: value
					}
				} else {
					map[i - 2].value += " " + attributes[i];
				}
			}
			this.data = map;
		}
	}

	parseTag(data) {
		return data.split(" ")[0];
	}

	parseSrc(data) {
		return this.splitParse("src", data)[0];
	}

	parseAlt(data) {
		return this.splitParse("alt", data)[0];
	}

	parseID(data) {
		return this.splitParse("id", data)[0];
		return "";
	}

	parseClasses(data) {
		if (data.includes(" class=")) {
			return this.splitParse("class", data);
		}
		return [];
	}

	parseListeners(data, a) {
		this.recursiveParse("on", data, a);
	}

	parseAttributes(data, a) {
		this.recursiveParse("data-", data, a);
	}

	splitParse(key, data) {
		if (data.includes(key)) {
			let idIndex = data.indexOf(key);
			let dataString = data.substring(idIndex, data.length);
			let firstQuote = dataString.indexOf("\"");
			let quoteString = dataString.substring(firstQuote + 1, dataString.length);
			let secondQuoteIndex = quoteString.indexOf("\"");
			let idString = quoteString.substring(0, secondQuoteIndex);
			return idString.split(" ");
		}
		return [""];
	}

	recursiveParse(key, data, a) {
		if (data.includes(` ${key}`)) {
			let dataIndex = data.indexOf(key);
			let dataString = data.substring(dataIndex + key.length, data.length);
			let firstQuote = dataString.indexOf("\"");
			let keyString = dataString.substring(0, firstQuote - 1);
			let quoteString = dataString.substring(firstQuote + 1, dataString.length);
			let secondQuoteIndex = quoteString.indexOf("\"");
			let valueString = quoteString.substring(0, secondQuoteIndex);
			let newData = data.replace(this.formatOfKey(key, keyString, valueString), '');
			a.push({
				key: keyString,
				value: valueString
			})
			this.recursiveParse(key, newData, a);
		}
	}

	formatOfKey(key, keyString, valueString) {
		if (key == "on") {
			return `on${keyString}=\"${valueString}\"`
		} else {
			return `data-${keyString}=\"${valueString}\"`
		}
	}
}

module.exports = MockHTMLTag;
