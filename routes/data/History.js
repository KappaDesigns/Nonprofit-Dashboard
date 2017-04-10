const redis = require('redis');
const client = redis.createClient();

function addHistory(data, next) {
	let jsonString = JSON.stringify(data);
	client.lpush(`history`, jsonString, (err, res) => {
		if (err) {
			return next(err);
		}
		return next(null, res);
	})
}

function getHistory(page, next) {
	let end = page * 10;
	let start = end - 10;
	client.lrange(`history`, start, end, (err, res) => {
		if (err) {
			return next(err);
		}
		return next(null, res);
	})
}

module.exports.getHistory = getHistory;
module.exports.addHistory = addHistory;
