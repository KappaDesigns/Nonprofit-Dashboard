const redis = require("redis");
const client = redis.createClient();

function create(id, data, next) {
	userExists(data.username, (err, res) => {
		if (err) {
			return next(err);
		}
		getID((err, id) => {
			console.log(id, data);
			client.sadd(`users`, id);
			client.hmset(`user:${id}`, 'id', id);
			client.hmset(`user:${id}`, data, (err, res) => {
				if (err) {
					return next(err);
				}
				return next(null, res);
			})
		})
	})
}

function userExists(username, next) {
	getUsername(username, (err, res) => {
		if (res === undefined) {
			next(null, res)
		} else {
			return next({
				error: "User exists",
				status: 404
			});
		}
	})
}

function get(id, next) {
	client.hgetall(`user:${id}`, (err, res) => {
		if (err) {
			return next(err);
		}
		return next(null, res)
	})
}

function getUsername(username, next) {
	getUsers((ids) => {
		if (ids.length > 0) {
			return searchUser(username, ids, next);
		}
		return next({
			err: "User not found",
			status: 404
		});
	})
}

function getUsers(next) {
	client.smembers(`users`, (err, res) => {
		if (err) {
			console.log(err);
		}
		return next(res);
	})
}

function searchUser(username, res, next) {
	let data = {}
	let completed = 0;
	res.forEach((id) => {
		client.hgetall(`user:${id}`, (err, user) => {
			data[user.username] = user;
			if (++completed === res.length) {
				if (data.hasOwnProperty(username)) {
					return next(null, data[username]);
				}
				return next(null, {});
			}
		})
	})
}

function getID(next) {
	client.incr(`uID`, (err, res) => {
		if (err) {
			return next(err);
		}
		return next(null, res);
	})
}

function deleteUser(id, next) {
	client.srem(`user`, id);
	client.del(`user:${id}`, (err, res) => {
		if (err) {
			return next(err)
		}
		return next(null, res);
	})
}

module.exports.create = create;
module.exports.get = get;
module.exports.getUsername = getUsername;
module.exports.getID = getID;
module.exports.delete = deleteUser;
module.exports.put = create;
