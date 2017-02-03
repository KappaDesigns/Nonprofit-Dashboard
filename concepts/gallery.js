const redis = require('redis');
const client = redis.createClient();
const ImageList = require('./ImageList');

client.on("error", function (err) {
    console.log("Error " + err);
});

class Gallery extends ImageList {
  constructor(key, images) {
    super("gallery", key, images)
  }
}

let gallery = new Gallery("basic",['a.png','b.png','z.png']);
setTimeout(function () {
	gallery.set('c.png',0);
}, 50);

setTimeout(function () {
  gallery.getAll((data) => {
    console.log(data);
    gallery.clear();
  });
}, 100);
