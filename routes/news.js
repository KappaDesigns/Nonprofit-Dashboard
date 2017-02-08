const express = require('express');
const router = express.Router();
const News = require('./data/News');

router.get('/news/:start/:end', (req, res, next) => {
  News.getRange(req.params.start, req.params.end, (data) => {
    res.send(data)
  })
})

router.get('/news/:id', (req, res, next) => {
  News.getByID(req.params.id, (data) => {
    res.send(data);
  })
})

router.post('/news/:id', (req, res, next) => {
  News.create(req.params.id, req.body, data => {
    res.send(data);
  })
})

router.put('/news/:id', (req, res, next) => {
  News.put(req.params.id, req.body, (data) => {
    res.send(data);
  })
})

router.delete('/news/:id', (req, res, next) => {
  News.delete(req.params.id, (data) => {
    res.send(data);
  })
})

module.exports = router;
