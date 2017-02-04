const express = require('express');
const router = express.Router();

router.get('/editor/', (req, res, next) => {
  res.send('get all editor');
})

router.get('/editor/:id', (req, res, next) => {
  res.send(`get editor with id ${req.params.id}`)
})

router.post('/editor/', (req, res, next) => {
  res.send('post editor');
})

router.put('/editor/:id', (req, res, next) => {
  res.send(`put editor with id ${req.params.id}`)
})

router.delete('/editor/:id', (req, res, next) => {
  res.send(`delete editor with id ${req.params.id}`)
})

module.exports = router;
