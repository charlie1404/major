const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { infoLogger, errorLogger } = require('./middlewares');
const routes = require('./routes');

const app = express();

app.disable('x-powered-by');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(infoLogger());
app.use(errorLogger());
app.use(cookieParser());
app.use(helmet());
app.use(routes);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Dead End. Route not Found' });
});

module.exports = app;
