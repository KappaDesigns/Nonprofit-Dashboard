const Express = require('express');
const router = Express.Router();
const DOM = require('./data/dom');
const config = require('../../config');

router.get('/*', (req, res, next) => {
  getPageID(req, (err, id) => {
    if (err) {
      throw err;
    }
    if (id === null) {
      return res.send("DOM does not exist").status(404);
    }
    DOM.getDOM(id, (err, dom) => {
      if (err) {
        throw err;
      }
      return res.send(dom);
    })
  })
})

router.post('/', (req, res, next) => {
  DOM.setDOM(req.body);
})

function getPageID(req, next) {
  let path = `${config.index}`
  if (req.originalUrl !== "/api/") {
    path = path.replace("api", "");
    path += req.originalUrl;
    while (path.includes("/")) {
      path = path.replace("/", "_");
    }
  }
  console.log(path);
  DOM.getDomID(path, (err, id) => {
    if (err) {
      return next(err)
    }
    return next(null, id[0]);
  })
}

module.exports = router;
