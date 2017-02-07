const express = require('express');
const router = express.Router();
const User = require('./data/User');

router.get('/user/:id', (req, res, next) => {
  User.get(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    }
    res.json(data);
  })
})

router.get('/login/:username', (req, res, next) => {
  User.getUsername(req.params.username, (err, data) => {
    if (err) {
      return next(err);
    }
    res.send(data);
  })
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
