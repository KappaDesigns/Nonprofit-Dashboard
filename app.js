//dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');

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

app.use(express.static(path.join(__dirname, 'build')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  (username, password, next) => {
    User.getUsername(username, (err, user) => {
      console.log(username);
      if (err) {
        return next(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    })
  }
))

passport.serializeUser((user, next) => {
  next(null, user.id);
})

passport.deserializeUser((id, next) => {
  User.get(id, (err, data) => {
    next(null, user)
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
