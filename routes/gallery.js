const express = require('express');
const router = express.Router();

router.get('/gallery/', (req, res, next) => {
  res.send('get all gallery');
})

router.get('/gallery/:id', (req, res, next) => {
  res.send(`get gallery with id ${req.params.id}`)
})

router.post('/gallery/', (req, res, next) => {
  res.send('post gallery');
})

router.put('/gallery/:id', (req, res, next) => {
  res.send(`put gallery with id ${req.params.id}`)
})

router.delete('/gallery/:id', (req, res, next) => {
  res.send(`delete gallery with id ${req.params.id}`)
})

module.exports = router;
