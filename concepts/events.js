const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

class Event {
  constructor(key, opt) {
    this.key = key;
    client.hmset(`event:${this.key}`, opt, (err, res) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      console.log(res);
    })
  }

  get(next) {
    client.hgetall(`event:${this.key}`, (err, res) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      next(res);
    })
  }

  set(opt) {
    client.hmset(`event:${this.key}`, opt, (err, res) => {
      if (err) {
        console.log(err);
        process.exit();
      }
      console.log(res);
    })
  }
}

let event = new Event('basic', {
  'title':'title',
  'date': new Date().valueOf(),
  'text': 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
})

event.get((data) => {
  console.log(data);
});
