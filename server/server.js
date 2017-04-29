const http = require('http');
const port = 3000;
const util = require('../index');
const conf = require('./config');
const fs = require('fs');
const redis = require('redis');

const MockDOM = require('../MockDOM');
const Crawler = require('../LinkCrawler');
const client = redis.createClient();

const crawler = new Crawler(conf.index);

const requestHandler = (req, res) => {
	util.getDOM((DOM) => {
		res.end(JSON.stringify(DOM));
	});
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
	if (err) {
		return console.error(err);
	}
	handleInit();
	console.log(`Server is listening on port ${port}`);
})

function handleInit() {
	client.get("initialized", (err, key) => {
		if (err) {
			throw err;
		}
		if (key) {
			setInit();
		}
	})
}

function setInit() {
	client.set("initialized", true, err => {
		if (err) {
			throw err;
		}
	})
	setupSite();
}

function setupSite() {
	downloadSite(conf.index)
}

function downloadSite(page) {
	let path = `site/${page}.html`;
	let url = `http://${page}`;
	fs.writeFile(path, "", err => {
		if (err) {
			throw err;
		}
		let file = fs.createWriteStream(path);
		let req = http.get(url, res => {
			res.pipe(file).on('finish', () => {
				readFile(path);
			});

		})
	})
}

function readFile(path) {
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			throw err;
		}
		let DOM = new MockDOM(data);
		saveDOM(path, DOM);
		recurseDOM(DOM.body, 0);
	})
}

function saveDOM(path, DOM) {
	path = path.replace('site/', '');
	path = path.replace('.html', '');
	console.log(path);
	let serial = JSON.stringify(DOM);
	client.set(`page:${path}`, serial, err => {
		if (err) {
			throw err;
		}
	})
}

function recurseDOM(current, nesting) {
	for (let i = 0; i < current.children.length; i++) {
		let str = "";
		for (let i = 0; i < nesting; i++) {
			str += '\t';
		}
		recurseDOM(current.children[i], nesting + 1);
	}
}
