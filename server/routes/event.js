const Events = require('./data/Event');
const express = require('express');
const router = express.Router();

router.get('/event', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({
            success: false,
        })
    } else {
        Events.getAll((err, events) => {
            if (err) {
                return next(err);
            }
            return res.json(events);
        })
    }
});

router.post('/event', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({
            success: false,
        })
    } else {
        Events.create(req.body, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
            });
        });
    }
});

router.put('/event/:id', (req, res, next) => {
    if (!req.isAuthenticated()) {
       res.send({
            success: false,
        })
    } else {
        Events.update(req.params.id, req.body, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
            });
        });
    }
});

router.delete('/event/:id', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({
            success: false,
        })
    } else {
        Events.delete(req.params.id, (err) => {
            if (err) {
                return next(err);
            }
            return res.json({
                success: true,
            });
        });
    }
});

router.put('/event/featured', (req, res, next) => {

});

router.get('/event/featured', (req, res, next) => {
    
})

module.exports = router;
