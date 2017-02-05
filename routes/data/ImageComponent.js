const redis = require('redis');
const client = redis.createClient();

function getByID(component, key, next) {
  client.hgetall(`${component}:${key}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function post(component, key, data, next) {
  client.hmset(`${component}:${key}`, data, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function put(component, key, data, next) {
  client.hmset(`${component}:${key}`, data, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function remove(component, key, next) {
  client.del(`${component}:${key}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res)
  })
}

module.exports.getByID = getByID;
module.exports.post = post;
module.exports.put = put;
module.exports.delete = remove;
