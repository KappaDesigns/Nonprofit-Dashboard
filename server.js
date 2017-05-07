const Express = require("express");
const app = Express();
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session =  require('express-session');
const passport = require('passport');

//routes
const page = require('./server/routes/page');
const login = require('./server/routes/login');

const User = require('./server/routes/data/User')

app.use(logger('dev'));
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard dong',
	resave: false,
	saveUninitialized: true,
	cookie: {
		secure: true
	}
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, next) => {
	next(null, user);
})

passport.deserializeUser((id, next) => {
	User.getUserByID(id, (err, user) => {
		next(err, user);
	})
})

app.use(Express.static(path.join(__dirname, 'build')));

app.use('/api', page);
app.use('/api', login)

app.use('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

app.listen(config.port, () => {
	console.log(`App listening on port:${config.port}`);
	config.handleInit();
})
