const Events = require('./data/Event');
const express = require('express');
const router = express.Router();

router.get('/event', (req, res, next) => {
    Events.getAll((err, events) => {
        if (err) {
            return next(err);
        }
        return res.json(events);
    })
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

router.post('/event/featured', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({
            success: false,
        })
    } else {
        let ids = req.body;
        Events.getAll((err, events) => {
            if (err) {
                return next(err);
            }
            events.forEach((event) => {
                if (ids.indexOf(event._id) != - 1) {
                    Events.update(event._id, { featured: true }, (err) => {
                        if (err) {
                            return next(err);
                        }
                    });
                } else {
                    console.log(ids.indexOf(event._id), event, ids);
                    Events.update(event._id, { featured: false }, (err) => {
                        if (err) {
                            return next(err);
                        }
                    });
                }
            });
            res.json({ success: true });
        })
    }
});

module.exports = router;
