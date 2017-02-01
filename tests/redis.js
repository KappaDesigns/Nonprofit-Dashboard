const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

client.set("foo","bar", redis.print);

client.get("foo", function (err, res) {
  if (err) {
    console.log(err);
  }
  console.log(res);
  process.exit();
});
