const express = require('express');
const router = express.Router();
const ImageComponent = require('./data/ImageComponent');
const component = "carousel"

router.get('/carousel/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
    ImageComponent.getByID(component, req.params.id, (data) => {
      res.send(data);
    })
  } else {
    res.status(403).send({
      message: 'Forbidden'
    })
  }
})

router.post('/carousel/:id', (req, res, next) => {
  if (req.isAuthenticated()) {
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
