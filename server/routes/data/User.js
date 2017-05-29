client = require("redis").createClient();
const crypto = require('crypto');

if (process.env.REDISTOGO_URL) {
	var rtg = require("url").parse(process.env.REDISTOGO_URL);
	client = require("redis").createClient(rtg.port, rtg.hostname);
	redis.auth(rtg.auth.split(":")[1]);
}

module.exports.addUser = (body, next) => {
  client.incr('userID', (err, id) => {
    if (err) {
      return next(err);
    }
    client.hmset(`usernamelist`, body.username, id, (err, data) => {
      if (err) {
        return next(err);
      }
    })
    client.hmset(`user:${id}`, body, (err, data) => {
      if (err) {
        return next(err);
      }
    })
  })
}

module.exports.updateUser = (username, data, next) => {
  module.exports.findUser(username, (err, user) => {
    client.hdel(`usernamelist`, user.username, (err) => {
      if (err) {
        return next(err);
      }
      client.hmset(`usernamelist`, data.username, user.id);
      client.hmset(`user:${user.id}`, data);
      return next(null);
    })
  })
}

module.exports.removeUser = (id, next) => {
  client.del(`user:${id}`)
}

module.exports.findUser = (username, next) => {
  client.get('userID', (err, id) => {
    client.hmget('usernamelist', username, (err, id) => {
      if (err) {
        return next(err);
      }
      if (!id) {
        return next(null, false);
      }
      client.hgetall(`user:${id}`, (err, data) => {
        if (err) {
          return next(err);
        }
        if (!data) {
          return next(null, false);
        }
        data.validPassword = password => {
          return password === data.password
        }
        data.id = id[0]
        return next(null, data);
      })
    })
  })
}

module.exports.getUserByID = (id, next) => {
  client.hgetall(`user:${id}`, (err, data) => {
    if (err) {
      return next(err);
    }
    return next(null, data);
  })
}
