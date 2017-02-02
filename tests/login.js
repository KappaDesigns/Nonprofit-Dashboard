const redis = require('redis');
const client = redis.createClient();
const TaskQueue = require('./TaskQueue');
const taskQueue = new TaskQueue(1);

client.on("error", function (err) {
    console.log("Error " + err);
});

const PASS = 'test';
const USER = 'test'

function getAllUserIDS(next) {
  client.smembers('users', (err, res) => {
    if (err) {
      return next(err);
    }
    next(null, res)
  })
}

// Gets all user ids stored in DB. This is stored in a hashset
// Dont use the list of keys for login. Create a queue in redis
// to store all ids trying to login. From there authenticate thru
// passport.
getAllIDS((err, res) => {
	if (err) {
		console.log(err);
		process.exit();
	}
	let completed = 0;
	res.forEach(id => {
		taskQueue.pushTask(
			testUser(id, USER, PASS, (err) => {
				if (err) {
					console.log(err);
					process.exit();
				}
			})
		);
	})
})

// Tests user up against the inputed user and password
function testUser(id, username, password, next) {
	client.hgetall(`user:${id}`, (err, user) => {
		if (err) {
			return next(err);
		}
		// Implement Passport Strategy
		if (username === user.username) {
			if (password === user.password) {
				console.log(`valid user ${id}`);
			}
		}
	})
}
