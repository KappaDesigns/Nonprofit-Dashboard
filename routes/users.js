const express = require('express');
const router = express.Router();

router.get('/user', (req, res, next) => {
  res.send('user get');
})

router.get('/user/:id', (req, res, next) => {
  res.send(req.params);
})

router.post('/user', (req, res, next) => {
  res.send('user post');
})

router.put('/user/:id', (req, res, next) => {
  res.send('user put')
})

router.delete('/user/:id', (req, res, next) => {
  res.send('user delete');
})

module.exports = router;
