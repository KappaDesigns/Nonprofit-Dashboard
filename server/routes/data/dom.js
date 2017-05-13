const redis = require("redis");
const client = redis.createClient();

module.exports.getDomID = function (url, next) {
  client.hmget(`DomMap`, url, (err , data) => {
    if (err) {
      return next(err);
    }
    return next(null, data);
  })
};

module.exports.getDOM = function (id, next) {
  client.get(`page:${id}`, (err, data) => {
    if (err) {
      return next(err);
    }
    return next(null, data);
  })
};

module.exports.setDOM = function (DOM, next) {
  client.set(`page:${DOM.id}`, JSON.stringify(DOM), err => {
    if (err) {
      return next(err);
    }
  })
}

module.exports.getPages = function (next) {
  client.hgetall(`DomMap`, (err, data) => {
    if (err) {
      return next(err);
    }
    next(null, data);
  })
}
