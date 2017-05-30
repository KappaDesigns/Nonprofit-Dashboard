let client = require("redis").createClient("redis://redistogo:8b2186cfc25a6e2e59d0cf6af0daf7b9@greeneye.redistogo.com:10702/");

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
