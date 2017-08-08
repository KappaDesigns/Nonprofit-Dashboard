const crypto = require('crypto');
const User = require('./server/routes/data/User');

crypto.pbkdf2('test', 'TbQnjk6BCH', 100, 512, 'sha512', (err, key) => {
    let pass = key.toString("hex");
    User.addUser({
        username: "test",
        password: pass,
    }, () => {
        console.log('User added?');
    })
})