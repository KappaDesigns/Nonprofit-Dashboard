const Express = require('express');
const router = Express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./data/User');

passport.use(new LocalStrategy(
  (username, password, next) => {
    User.findUser(username, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false);
      }
      if (!user.validPassword(password)) {
        return next(null, false);
      } else {
        return next(null, user);
      }
    })
  }
))


router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send({"login": false});
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({"login": true});
    })
  })(req, res, next);
})

router.post('/authenticated', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send({
      isAuthenticated: true
    })
  } else {
    return res.send({
      isAuthenticated: false
    })
  }
})

router.put('/user/:username', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.updateUser(req.params.username, req.body, () => {
      return res.send({})
    })
  } else {
    return res.send({
      error: "error"
    })
  }
})

router.get('/user', (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.send({
      user: req.user
    })
  }
  return res.send({
    user: {}
  })
})

router.get('/exists/:username', (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.send({
      message: "forbidden"
    }).status(403);
  } else {
    User.findUser(req.params.username, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send({
          exists: false
        })
      } else {
        return res.send({
          exists: true
        })
      }
    })
  }
})

router.post('/user', (req, res, next) => {
  User.addUser(req.body, (err) => {
    if (err) {
      return next(err);
    }
    return res.send({
      message: "user created"
    });
  })
})

router.post('/logout', (req, res) => {
  req.logout();
  return res.send({"success": true}).status(201);
})

module.exports = router;
