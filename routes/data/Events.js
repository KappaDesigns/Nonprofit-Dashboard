const redis = require('redis');
const client = redis.createClient();

function put(data, next) {
  client.hmset(`event`, data, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res);
  })
}

function get(next) {
  client.hgetall(`event`, (err, res) => {
    if (err) {
      console.log(err);
    }
    next(res)
  })
}

module.exports.put = put;
module.exports.get = get;
