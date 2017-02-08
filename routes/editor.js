const express = require('express');
const router = express.Router();
const Editor = require('./data/Editor');

router.get('/editor/:page', (req, res, next) => {
  if (req.isAuthenticated()) {
    Editor.get(req.params.page, (data) => {
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

router.put('/editor/:page', (req, res, next) => {
  if (req.isAuthenticated()) {
    Editor.put(req.params.page, req.body, (data) => {
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

module.exports = router;
