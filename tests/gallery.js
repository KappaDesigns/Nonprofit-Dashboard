const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

class Gallery {
	constructor(galleryName, imgs) {
		this.name = galleryName;
		client.exists(`gallery:${this.name}`, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			if (res == 1) {
				return console.log("gallery already exists");
			}
			for (let img in imgs) {
				this.add(imgs[img]);
			}
		})
	}

	add(value) {
		client.rpush(`gallery:${this.name}`, value, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			console.log(`{gallery:${this.name}}: added '${value}' to end of list`);
		})
	}

	addIndex(value, index) {
		client.lindex(`gallery:${this.name}`, index, (err, res) => {
			if (err) {
				console.log(err);
				process.eixt();
			}
			if (res === null) {
				return this.add(value);
			} else {
				addIndexHelper(value, res);
			}
		})
		let self = this;
		function addIndexHelper(val, prevVal) {
			client.linsert(`gallery:${self.name}`, 'Before', prevVal, val, (err, res) => {
				if (err) {
					console.log(err);
					process.exit();
				}
				console.log(`{gallery:${this.name}}: added '${value}' at index:${index}`);
			})
		}
	}

	getAll(next) {
		client.lrange(`gallery:${this.name}`, 0, -1, (err, res) => {
			if (err) {
				console.log(err);
				process.eixt();
			}
			console.log(`{gallery:${this.name}}: got all data`);
			next(res);
		})
	}

	set(value, index) {
		client.lset(`gallery:${this.name}`, index, value, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			console.log(`{gallery:${this.name}}: set '${value}' at index:${index}`);
		})
	}

	clear() {
		client.del(`gallery:${this.name}`, (err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(`{gallery:${this.name}}: cleared`);
			process.exit();
		})
	}


}

let gallery = new Gallery("basic",['a.png','b.png','z.png']);
setTimeout(function () {
	gallery.set('c.png',0);
	setTimeout(function () {
		gallery.getAll((data) => {
			console.log(data);
			gallery.clear();
		});
	}, 1000);
}, 100);
