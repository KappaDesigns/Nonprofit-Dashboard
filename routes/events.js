const express = require('express');
const router = express.Router();

router.get('/event/', (req, res, next) => {
  res.send('get all event');
})

router.get('/event/:id', (req, res, next) => {
  res.send(`get event with id ${req.params.id}`)
})

router.post('/event/', (req, res, next) => {
  res.send('post event');
})

router.put('/event/:id', (req, res, next) => {
  res.send(`put event with id ${req.params.id}`)
})

router.delete('/event/:id', (req, res, next) => {
  res.send(`delete event with id ${req.params.id}`)
})

module.exports = router;
