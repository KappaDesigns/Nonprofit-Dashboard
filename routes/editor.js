const express = require('express');
const router = express.Router();
const Editor = require('./data/Editor');

router.get('/editor/:page', (req, res, next) => {
  Editor.get(req.params.page, (data) => {
    res.send(data);
  })
})

router.put('/editor/:page', (req, res, next) => {
  Editor.put(req.params.page, req.body, (data) => {
    res.send(data);
  })
})

module.exports = router;
