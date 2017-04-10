const express = require('express');
const router = express.Router();
const ImageComponent = require('./data/ImageComponent');
const component = "gallery"

router.get('/gallery/:id', (req, res, next) => {
  ImageComponent.getByID(component, req.params.id, (data) => {
    res.send(data);
  })
})

router.post('/gallery/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Gallery [Add]`,
      date: new Date().getMilliseconds(),
      user: req.user
    }, (err, res) => {
      if (err) {
        res.status(500).send({
          message: 'Error Adding History'
        })
      }
    })
    ImageComponent.post(component, req.params.id, req.body, (data) => {
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

router.put('/gallery/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Carousel [Edited]`,
      date: new Date().getMilliseconds(),
      user: req.user
    }, (err, res) => {
      if (err) {
        res.status(500).send({
          message: 'Error Adding History'
        })
      }
    })
    ImageComponent.put(component, req.params.id, req.body, (data) => {
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

router.delete('/gallery/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Carousel [Delete]`,
      date: new Date().getMilliseconds(),
      user: req.user
    }, (err, res) => {
      if (err) {
        res.status(500).send({
          message: 'Error Adding History'
        })
      }
    })
    ImageComponent.delete(component, req.params.id, (data) => {
      res.send(`${data}`);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

module.exports = router;
