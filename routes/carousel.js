const express = require('express');
const router = express.Router();

router.get('/carousel/', (req, res, next) => {
  res.send('get all carousel');
})

router.get('/carousel/:id', (req, res, next) => {
  res.send(`get carousel with id ${req.params.id}`)
})

router.post('/carousel/', (req, res, next) => {
  res.send('post carousel');
})

router.put('/carousel/:id', (req, res, next) => {
  res.send(`put carousel with id ${req.params.id}`)
})

router.delete('/carousel/:id', (req, res, next) => {
  res.send(`delete carousel with id ${req.params.id}`)
})

module.exports = router;
