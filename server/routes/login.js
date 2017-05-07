const Express = require('express');
const router = Express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./data/user');

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
      return res.send({"message":"user fail"});
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send({"login": "fail"});
    })
  })(req, res, next);
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})

module.exports = router;
