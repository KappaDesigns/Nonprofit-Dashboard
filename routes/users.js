const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./data/User');

passport.use(new LocalStrategy(
  (username, password, next) => {
    User.getUsername(username, (err, user) => {

      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return next(null, false, { message: 'Incorrect password.' });
      }
      return next(null, user);
    })
  }
));

router.post('/login/', (req, res, next) => {
  passport.authenticate('local', {session: true}, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).send({ message: 'Failed To Login', success: false });
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send({
        message:'Success',
        success: true,
      });
    })
  })(req,res,next)
})

router.get('/logout/', (req, res, next) => {
  req.logout();
  res.status(200).send({
    message:'logged out'
  })
  res.redirect('/');
})

router.get('/user/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.get(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    })
  } else {
    res.status(403).send({
      message:'Forbidden'
    })
  }
})

router.post('/user', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.getID((id) => {
      User.create(id, req.body, (err, data) => {
        if (err) {
          return next(err);
        }
        res.json(data);
      })
    })
  } else {
    res.status(403).send({
      message:'Forbidden'
    })
  }
})

router.put('/user/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.put(req.params.id, req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      res.send(data);
    })
  } else {
    res.status(403).send({
      message:'Forbidden'
    })
  }
})

router.delete('/user/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    User.delete(req.params.id, (err, data) => {
      if (err) {
        return next(err);
      }
      res.send(data)
    });
  } else {
    res.status(403).send({
      message:'Forbidden'
    })
  }
})

module.exports = router;
