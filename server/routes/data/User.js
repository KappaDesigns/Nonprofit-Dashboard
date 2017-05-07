const redis = require('redis');
const client = redis.createClient();

module.exports.addUser = (body, next) => {
  client.incr('userID', (err, id) => {
    if (err) {
      return next(err);
    }
    client.hmset(`user:${id}`, body, (err, data) => {
      if (err) {
        return next(err);
      }
    })
  })
}

module.exports.removeUser = (id, next) => {
  client.del(`user:${id}`)
}

module.exports.findUser = (username, next) => {
  client.get('userID', (err, id) => {
    if (err) {
      return next(err);
    }
    id = parseInt(id);
    for (let i = 0; i < id; i++) {
      client.hgetall(`user:${i}`, (err, user) => {
        if (err) {
          return next(err);
        }
        if (user && user.username == username) {
          user.validPassword = (password) => {
            return user.password == password;
          }
          return next(null, user);
        }
      })
    }
    return next(null, null);
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
