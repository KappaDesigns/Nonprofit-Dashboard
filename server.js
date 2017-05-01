const Express = require("express");
const app = Express();
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//routes
const page = require('./server/routes/page');

app.use(logger('dev'));
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(Express.static(path.join(__dirname, 'build')));

app.use('/api', page);

app.use('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(config.port, () => {
	console.log(`App listening on port:${config.port}`);
	config.handleInit();
})
