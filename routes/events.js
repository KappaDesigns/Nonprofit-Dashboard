const express = require('express');
const router = express.Router();
const Event = require('./data/Events');

router.get('/event/', (req, res, next) => {
  Event.get((data) => {
    res.send(data);
  });
})

router.put('/event/', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Event [Edited]`,
      date: new Date().valueOf(),
      user: req.user
    }, (err, res) => {
      if (err) {
        res.status(500).send({
          message: 'Error Adding History'
        })
      }
    })
    Event.put(req.body, (data) => {
      res.send(data)
    });
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})


module.exports = router;
