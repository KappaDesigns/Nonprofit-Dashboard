const redis = require('redis');
const client = redis.createClient();
const ImageList = require('./ImageList');

client.on("error", function (err) {
    console.log("Error " + err);
});

class Carousel extends ImageList {
  constructor(key, images) {
    super("carousel", key, images)
  }
}

let carousel = new Carousel("basic",['a.png','b.png','z.png']);
setTimeout(function () {
	carousel.set('c.png',0);
}, 100);

setTimeout(function () {
  carousel.getAll((data) => {
    console.log(data);
    carousel.clear();
  });
}, 200);
