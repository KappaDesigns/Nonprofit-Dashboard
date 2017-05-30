const MockDOM = require('./MockDOM');
const Crawler = require('./LinkCrawler');

const index = "kappadesigns.org";

const redis = require("./redis");
const client = redis.client;
const crawler = new Crawler(index);

module.exports = {
	index: index,
	port: 3000,
	handleInit: function handleInit() {
		client.get("initialized", (err, key) => {
			if (err) {
				throw err;
			}
			if (key) {
				console.log("initializing ["+index+"]....");
				setInit();
			}
		})
	},
};

function setInit() {
	client.del("DomMap");
	client.set("initialized", true, err => {
		if (err) {
			throw err;
		}
	})
	setupSite();
}

function setupSite() {
	console.log("Crawling through ["+index+"]...");
	crawler.crawl();
}
