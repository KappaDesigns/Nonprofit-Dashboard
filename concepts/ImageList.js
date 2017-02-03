const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

class RedisImageList {
	constructor(key, name, imgs) {
		this.name = name;
    this.key = key
		client.exists(`${this.key}:${this.name}`, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			if (res == 1) {
				return console.log("imagelist already exists");
			}
			for (let img in imgs) {
				this.add(imgs[img]);
			}
		})
	}

	add(value) {
		client.rpush(`${this.key}:${this.name}`, value, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			console.log(`{${this.key}:${this.name}}: added '${value}' to end of list`);
		})
	}

	addIndex(value, index) {
		client.lindex(`${this.key}:${this.name}`, index, (err, res) => {
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
			client.linsert(`${this.key}:${self.name}`, 'Before', prevVal, val, (err, res) => {
				if (err) {
					console.log(err);
					process.exit();
				}
				console.log(`{${this.key}:${this.name}}: added '${value}' at index:${index}`);
			})
		}
	}

	getAll(next) {
		client.lrange(`${this.key}:${this.name}`, 0, -1, (err, res) => {
			if (err) {
				console.log(err);
				process.eixt();
			}
			console.log(`{${this.key}:${this.name}}: got all data`);
			next(res);
		})
	}

	set(value, index) {
		client.lset(`${this.key}:${this.name}`, index, value, (err, res) => {
			if (err) {
				console.log(err);
				process.exit();
			}
			console.log(`{${this.key}:${this.name}}: set '${value}' at index:${index}`);
		})
	}

	clear() {
		client.del(`${this.key}:${this.name}`, (err, res) => {
			if (err) {
				console.log(err);
			}
			console.log(`{${this.key}:${this.name}}: cleared`);
			process.exit();
		})
	}
}

module.exports = RedisImageList;
