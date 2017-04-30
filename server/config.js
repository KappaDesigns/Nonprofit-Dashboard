const redis = require('redis');
const MockDOM = require('../MockDOM');
const Crawler = require('../LinkCrawler');

const index = "mundanewebsitename.me";

const client = redis.createClient();
const crawler = new Crawler(index);

module.exports = {
	index: index,
	port: 3000,
	handleInit: function handleInit() {
		client.get("initialized", (err, key) => {
			if (err) {
				throw err;
			}
			if (!key) {
				setInit();
			}
		})
	},
};

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
