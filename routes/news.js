const express = require('express');
const router = express.Router();

router.get('/news/', (req, res, next) => {
  res.send('get all news');
})

router.get('/news/:id', (req, res, next) => {
  res.send(`get news with id ${req.params.id}`)
})

router.post('/news/', (req, res, next) => {
  res.send('post news');
})

router.put('/news/:id', (req, res, next) => {
  res.send(`put news with id ${req.params.id}`)
})

router.delete('/news/:id', (req, res, next) => {
  res.send(`delete news with id ${req.params.id}`)
})

module.exports = router;
