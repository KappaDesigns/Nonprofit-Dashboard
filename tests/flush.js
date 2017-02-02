const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

client.flushall((err, res) => {
	console.log(res);
	process.exit();
});
