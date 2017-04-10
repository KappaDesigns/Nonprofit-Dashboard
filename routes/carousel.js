const express = require('express');
const router = express.Router();
const ImageComponent = require('./data/ImageComponent');
const History = require('./data/History')
const component = "carousel"

router.get('/carousel/:id', (req, res, next) => {
  ImageComponent.getByID(component, req.params.id, (data) => {
    res.send(data);
  })
})

router.post('/carousel/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Carousel [Add]`,
      date: new Date().valueOf(),
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

router.put('/carousel/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Carousel [Edited]`,
      date: new Date().valueOf(),
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

router.delete('/carousel/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    History.addHistory({
      type: `Carousel [Delete]`,
      date: new Date().valueOf(),
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
