const redis = require('redis');
const client = redis.createClient();

client.on("error", function (err) {
    console.log("Error " + err);
});

const ID_LENG = 15;

// Creates a random string to be used as a UID for users
function createUID() {
  let UID = "";
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < ID_LENG; i++ ) {
    UID += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return UID;
}

// Creates a hashmap with passed user:userID as the key inorder to set the data
// for a user.
function addUser(uID, userData, next) {
  // establish unique user key inorder to access from database
  client.hsetnx(`user:${uID}`, 'username', '', (err,res) => {
   if (err) {
     return next(err);
   }
   if (res === 0) {
     uID = createUID();
     addUser(uID);
   }
   addUserHelper(uID, userData, next);
  });
}

// crates actual user within the isntantiated
function addUserHelper(uID, userData, next) {
  addIDToList(uID);
  client.hmset(`user:${uID}`, userData, (err, res) => {
    if (err) {
      return next(err);
    }
    next();
  })
}

// adds ID to list of user keys stored in DB
function addIDToList(uID) {
  client.sadd(['users',uID], (err, res) => {
    console.log(res);
  })
}

// Gets all data from hash with specified unique id.
function getUser(uID) {
  client.hgetall(`user:${uID}`, (err, res) => {
    if (err) {
      return err;
    }
    console.log(`user:${uID}`);
    console.log(res);
  })
}

// client
// ________________________
let uID = createUID();
addUser(uID,
  {
    'username':'bark',
    'password':'bark',
  },
  (err) => {
    if (err) {
      console.log(err);
      return process.exit();
    }
    getUser(uID);
  }
);

module.exports.addUser = addUser;
module.exports.getUser = getUser;
module.exports.getAllIDS = getAllUserIDS;
