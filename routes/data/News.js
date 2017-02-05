const redis = require('redis');
const client = redis.createClient();

function create(key, data, next) {
  client.lpush(`news`, key);
  client.hmset(`news:${key}`, data, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function generateData(ids, next) {
  let news = {};
  let completed = 0;
  ids.forEach((id) => {
    getByID(id, (data) => {
      news[id] = data;
      if (++completed === ids.length) {
        console.log(news);
        next(news);
      }
    })
  })
}

function getRange(start, end, next) {
  client.lrange(`news`, start, end, (err, res) => {
    if (err) {
      console.log(err);
    }
    if (res.length != 0) {
      generateData(res, next);
    }
    next("No News Articles Found")
  })
}

function getByID(key, next) {
  client.hgetall(`news:${key}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function put(key, data, next) {
  create(key, data, next);
}

function remove(key, next) {
  client.del(`news:${key}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

module.exports.create = create;
module.exports.getRange = getRange;
module.exports.getByID = getByID;
module.exports.put = put;
module.exports.delete = remove;
