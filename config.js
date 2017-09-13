const MockDOM = require('./MockDOM');
const Crawler = require('./LinkCrawler');

const index = "motley.kappadesigns.org";
const petTangoURL = "http://ws.petango.com/webservices/adoptablesearch/wsAdoptableAnimals.aspx?species=All&sex=A&agegroup=All&onhold=A&orderby=ID&colnum=3&AuthKey=4blm62x1v45atcg3s05c1f5jclaov1j8p6n50d85jve44b6bp8&css=http://motleyzoo.org/wp-content/themes/suffusion/style.css";

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
			if (!key) {
				client.set("petURL", petTangoURL);
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
