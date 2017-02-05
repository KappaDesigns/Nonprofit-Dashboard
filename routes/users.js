const express = require('express');
const router = express.Router();
const User = require('./data/User');

router.get('/user/:id', (req, res, next) => {
  User.get(req.params.id, (data) => {
    res.send(data);
  })
})

router.post('/user', (req, res, next) => {
  User.getID((id) => {
    User.create(id, req.body, (data) => {
      res.send(data);
    })
  })
})

router.put('/user/:id', (req, res, next) => {
  User.put(req.params.id, req.body, (data) => {
    res.send(data);
  })
})

router.delete('/user/:id', (req, res, next) => {
  User.delete(req.params.id, (data) => {
    res.send(data)
  });
})

module.exports = router;
