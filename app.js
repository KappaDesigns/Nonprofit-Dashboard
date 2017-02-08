//dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const client = require('redis').createClient();

//routes
const user = require('./routes/users');
const news = require('./routes/news');
const gallery = require('./routes/gallery');
const carousel = require('./routes/carousel');
const events = require('./routes/events');
const editor = require('./routes/editor');

//data
const User = require('./routes/data/User');

const app = express();

app.use(logger('dev'));
app.use(cookieParser('keyboard cat'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  store: new RedisStore({
    'client': client
  }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'build')));

passport.serializeUser((user, next) => {
  next(null, user.id);
})

passport.deserializeUser((id, next) => {
  console.log("here");
  User.get(id, (err, data) => {
    next(null, data)
  })
})

app.use('/api', user);
app.use('/api', news);
app.use('/api', gallery);
app.use('/api', carousel);
app.use('/api', events);
app.use('/api', editor);

app.use('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
})

module.exports = app;
