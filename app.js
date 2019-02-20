const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const { jwtSecret, corsOptions } = require('./config');
const { infoLogger, errorLogger } = require('./middlewares');
const routes = require('./routes');

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cookieParser(jwtSecret.toString()));
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(infoLogger());
app.use(errorLogger());
app.use(routes);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'Dead End. Route not Found' });
});

module.exports = app;
