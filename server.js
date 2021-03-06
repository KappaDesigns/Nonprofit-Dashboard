const http = require("http");
const Express = require("express");
const app = Express();
const path = require('path');
const config = require('./config');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session =  require('express-session');
const passport = require('passport');
const favicon = require('serve-favicon')
const server = http.createServer(app);
const io = require("socket.io")(server);

//redis
const redis = require("./redis");
const client = redis.client;

//Websocket Consts
const domMap = new Map();
initializeDomMap();

//routes
const page = require('./server/routes/page');
const login = require('./server/routes/login');
const events = require('./server/routes/event');

const User = require('./server/routes/data/User');

//Allow cross domain
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};

app.use(allowCrossDomain);
app.use(logger('dev'));
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
}))
app.use(Express.static(path.join(__dirname, 'build')));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, next) => {
	next(null, user.id);
})

passport.deserializeUser((id, next) => {
	User.getUserByID(id, (err, user) => {
		next(err, user);
	})
})

app.use('/api', page);
app.use('/api', login);
app.use('/api', events);

app.use('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
})

// Websocket
io.on('connection', function (socket) {
	socket.on('getID', data => {
		socket.emit('sendID', {
			id: socket.id
		})
	})

	socket.on('getDOM', data => {
		let val = domMap.get(config.index);
		if (data.page.length !== 0) {
			let it = domMap.values();
			let node = it.next();
			while(!node.done) {
				if (node.value.id == data.page) {
					val = domMap.get(node.value.path)
				}
				node = it.next();
			}
		}
		socket.emit('setDOM', {
			dom: val,
			index: config.index
		})
	})

  socket.on('updateDOM', data => {
		domMap.set(data.dom.path, data.dom);
		saveDOM(data.dom.id, data.dom);
		io.emit('updateDOM', data);
  })

	socket.on('disconnect', () => {
		let it = domMap.keys();
		let node = it.next();
		while (!node.done) {
			let dom = domMap.get(node.value);
			saveDOM(dom.id, dom);
			node = it.next();
		}
	})
})

// End Websocket

server.listen(process.env.PORT || config.port, () => {
	console.log(`App listening on port:${config.port}`);
	config.handleInit();
})

function initializeDomMap() {
	client.hgetall(`DomMap`, (err, data) => {
		if (data) {
			let keys = Object.keys(data);
			for (let i = 0; i < keys.length; i++) {
				let id = data[keys[i]]
				client.get(`page:${id}`, (err, data) => {

					domMap.set(keys[i], JSON.parse(data));
				})
			}
		}
	})
}

function saveDOM(id, data) {
	client.set(`page:${id}`, JSON.stringify(data));
}