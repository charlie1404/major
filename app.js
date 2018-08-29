const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const Logger = require('./utils/logger');

const app = express();

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(Logger.infoLogger());
app.use(Logger.errorLogger());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

app.all('/test', (req, res) => {
  res.status(200).json({
    test: 'salmon',
  });
});

app.post('/', (req, res) => {
  res.status(200).json({
    name: 'post',
  });
});
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'get',
  });
});

module.exports = app;
