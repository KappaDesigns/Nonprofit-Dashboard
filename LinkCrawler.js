const http = require('http');
const fs = require('fs');
const MockDOM = require('./MockDOM');
const redis = require("./redis");
const client = redis.client;

class LinkCrawler {
	constructor(baseURL) {
		this.url = baseURL;
		this.recursed = new Set();
	}

	crawl() {
		this.downloadSite(this.url);
	}

	downloadSite(page) {
		this.recursed.add(page);
		let url = `http://${page}`;
		while(page.includes("/")) {
			page = page.replace("/", "_");
		}
		page = page.replace('.html', '');
		let path = `site/${page}.html`;
		fs.writeFile(path, "", err => {
			if (err) {
				throw err;
			}
			let file = fs.createWriteStream(path);
			let req = http.get(url, res => {
				res.pipe(file).on('finish', () => {
					this.readFile(path);
				})
			}).on('error', () => {
				file.end();
				fs.unlink(path, (err) => {
					if (err) {
						console.log(err);
					}
				})
			})
		})
	}

	readFile(path) {
		fs.readFile(path, 'utf8', (err, data) => {
			if (err) {
				throw err;
			}
			let DOM = new MockDOM(data, path, this.saveDOM);
			this.recurseDOM(this.getStartTag(DOM.DOM), 0);
		})
	}

	saveDOM(DOM) {
		DOM.path = DOM.path.replace('site/', '');
		DOM.path = DOM.path.replace('.html', '');
		let serial = JSON.stringify(DOM);
		client.hmset(`DomMap`, DOM.path, DOM.id, err => {
			if (err) {
				throw err;
			}
		})
		client.set(`page:${DOM.id}`, serial, err => {
			if (err) {
				throw err;
			}
		})
	}

	getStartTag(DOM) {
		for (let i = 0; i < DOM.length; i++) {
			if (DOM[i].type == "tag" && DOM[i].name == "html") {
				return DOM[i];
			}
		}
	}

	recurseDOM(current) {
		for (let i = 0; i < current.children.length; i++) {
			if (current.children[i].name == "a" && current.children[i].attribs.hasOwnProperty("href")) {
				let url = "";
				let path = current.children[i].attribs.href;
				if (!path.includes("http") && !path.startsWith("#")) {
					if (!path.includes(this.url)) {
						url = this.url + "/" + path;
					}
					url = url.toLowerCase();
					if (!this.recursed.has(url)) {
						this.downloadSite(url);
					}
				}
			}
			if (current.children[i].hasOwnProperty("children")) {
				this.recurseDOM(current.children[i]);
			}
		}
	}
}

module.exports = LinkCrawler;
