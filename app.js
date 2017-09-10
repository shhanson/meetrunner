const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '/../', 'node_modules')));

// Ask instructors what this means...
app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
}));

app.use('/api/users', require('./routes/users'));


app.use('*', (req, res, next) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
