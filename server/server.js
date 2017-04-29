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
	crawler.crawl();
}
