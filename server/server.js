const Express = require("express");
const app = Express();

const config = require('./config');

//routes
const page = require('./routes/page');

app.use('/api', page);

app.listen(config.port, () => {
	console.log(`App listening on port:${config.port}`);
	config.handleInit();
})
