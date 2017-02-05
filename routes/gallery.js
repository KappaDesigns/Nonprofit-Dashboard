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
  ImageComponent.post(component, req.params.id, req.body, (data) => {
    res.send(data);
  })
})

router.put('/gallery/:id', (req, res, next) => {
  ImageComponent.put(component, req.params.id, req.body, (data) => {
    res.send(data);
  })
})

router.delete('/gallery/:id', (req, res, next) => {
  ImageComponent.delete(component, req.params.id, (data) => {
    res.send(`${data}`);
  })
})

module.exports = router;
