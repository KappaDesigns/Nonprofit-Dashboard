const redis = require("redis");
const client = redis.createClient();

class User {
	constructor(uID, data) {
		console.log(uID);
		this.id = uID;
		for (let key in data) {
			this.add(data[key]);
		}
	}

	add(data) {
		client.hmset(`user:${this.uID}`, data, (err, res) => {
			if (err) {
				return console.log(err);
			}
			console.log(`{user:${this.uID}}: ${res}`);
		})
	}
}

module.exports = User;
