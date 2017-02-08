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

router.get('/user/:id', (req, res, next) => {
  console.log(req.user);
  User.get(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  })
})

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

router.post('/user', (req, res, next) => {
  User.getID((id) => {
    User.create(id, req.body, (err, data) => {
      if (err) {
        return next(err);
      }
      res.json(data);
    })
  })
})

router.put('/user/:id', (req, res, next) => {
  User.put(req.params.id, req.body, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data);
  })
})

router.delete('/user/:id', (req, res, next) => {
  User.delete(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data)
  });
})

module.exports = router;
