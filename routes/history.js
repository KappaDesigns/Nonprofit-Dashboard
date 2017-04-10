const express = require('express');
const router = express.Router();
const History = require('./data/History');

router.get('/history/:count', (req, res, next) => {
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
	History.getHistory(req.params.count, (err, data) => {
		if (err) {
			return res.send(404).send({
				message:`No History Found at Count[${req.params.count}]`
			})
		}
		return res.json(data);
	})
})

module.exports = router;
