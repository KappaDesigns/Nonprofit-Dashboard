const fs = require('fs');
const MockDOM = require('./MockDOM');

module.exports.getDOM = function (next) {
	fs.readFile(`site/mundanewebsitename.me.html`, 'utf-8', (err, data) => {
		if (err) {
			throw (err);
		}
		DOM = new MockDOM(data);
		next(DOM);
	})
};
