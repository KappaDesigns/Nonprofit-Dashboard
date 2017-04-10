const express = require('express');
const router = express.Router();
const Editor = require('./data/Editor');
const History = require('./data/History');

router.get('/editor/:page', (req, res, next) => {
  Editor.get(req.params.page, (data) => {
    res.send(data);
  })
})

router.put('/editor/:page', (req, res, next) => {
  if (req.isAuthenticated()) {
    Editor.put(req.params.page, req.body, (data) => {
      History.addHistory({
        type: `Page [${req.params.page}]`,
        date: new Date().valueOf(),
        user: req.user
      }, (err, res) => {
        if (err) {
          res.status(500).send({
            message: 'Error Adding History'
          })
        }
      })
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

module.exports = router;
