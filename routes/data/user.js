const redis = require("redis");
const client = redis.createClient();

function create(id, data, next) {
	client.hmset(`user:${id}`, data, (err, res) => {
		if (err) {
			console.log(err);
		}
		next(res);
	})
}

function get(id, next) {
	client.hgetall(`user:${id}`, (err, res) => {
		if (err) {
			return console.log(err);
		}
		console.log(res);
		next(res)
	})
}

function getID(next) {
	client.incr(`uID`, (err, res) => {
		if (err) {
			return console.log(err);
		}
		next(res);
	})
}

function deleteUser(id, next) {
	client.del(`user:${id}`, (err, res) => {
		if (err) {
			console.log(err);
		}
		next(res);
	})
}

module.exports.create = create;
module.exports.get = get;
module.exports.getID = getID;
module.exports.delete = deleteUser;
module.exports.put = create;
