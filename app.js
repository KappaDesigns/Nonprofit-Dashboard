//dependencies
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//routes
const user = require('./routes/users');
const news = require('./routes/news');
const gallery = require('./routes/gallery');
const carousel = require('./routes/carousel');
const events = require('./routes/events');
const editor = require('./routes/editor');

const app = express();

app.use(express.static(path.join(__dirname, 'build')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', user);
app.use('/api', news);
app.use('/api', gallery);
app.use('/api', carousel);
app.use('/api', events);
app.use('/api', editor);

app.use('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000!');
})
