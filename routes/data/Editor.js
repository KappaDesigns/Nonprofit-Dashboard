const redis = require('redis');
const client = redis.createClient();

function get(page, next) {
  client.hgetall(`page:${page}`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function put(page, data, next) {
  client.hmset(`page:${page}`, data, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

module.exports.get = get;
module.exports.put = put;
