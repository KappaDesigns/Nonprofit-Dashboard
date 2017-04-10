const express = require('express');
const router = express.Router();
const History = require('./data/History');

router.get('/history/:count', (req, res, next) => {
	History.getHistory(req.params.count, (err, data) => {
		if (err) {
			res.send(404).send({
				message:`No History Found at Count[${req.params.count}]`
			})
		}
	})
})
