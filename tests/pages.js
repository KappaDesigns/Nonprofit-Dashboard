const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

let type = {
  TXT: 'TXT',
  IMG: 'IMG'
}

const page = "home";
let html = {

}

function addElement(name, attribute, data, type) {
  client.hmset(`page:${name}`, attribute, `[${type.toUpperCase()}]:${data}`, (err, res) => {
    if (err) {
      console.log(err);
      process.exit();
    }
  })
}

function getPage(name, next) {
  client.hgetall(`page:${name}`, (err, res) => {
    if (err) {
      return next(err)
    }
    next(null, res);
  })
}

function setHtml(data) {
  for (let key in data) {
    let split = data[key].split(':');
    let prefix = split[0];
    let value = split[1];
    html[key] = {
      'type': prefix,
      'value': value
    }
  }
}

getPage(page, (err, data) => {
  if (err) {
    console.log(err);
    process.exit();
  }
  setHtml(data);
  console.log(html);
});
