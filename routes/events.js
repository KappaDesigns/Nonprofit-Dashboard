const express = require('express');
const router = express.Router();
const Event = require('./data/Events');

router.get('/event/', (req, res, next) => {
  Event.get((data) => {
    res.send(data);
  });
})

router.put('/event/', (req, res, next) => {
  Event.put(req.body, (data) => {
    res.send(data)
  });
})


module.exports = router;
