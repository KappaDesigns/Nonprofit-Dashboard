const MockDOM = require('./MockDOM');
const Crawler = require('./LinkCrawler');

const index = "kappadesigns.org";

let client = require("redis").createClient("redis://redistogo:8b2186cfc25a6e2e59d0cf6af0daf7b9@greeneye.redistogo.com:10702/");
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
	client.del("DomMap");
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
