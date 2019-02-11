/* eslint-disable no-console */

const mongoose = require('mongoose');
const http = require('http');
require('dotenv').config('../.env');
require('module-alias/register');

const app = require('../app');
const config = require('../config');

const {
  DB_USERNAME = 'username',
  DB_PASSWORD = 'password',
  DB_HOST = 'localhost',
  DB_PORT = 27017,
  DB_NAME = 'notes',
  PORT: port = '3000',
} = process.env;

mongoose.connect(`mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, config.mongodbConfig)
  .then(() => {
    console.log('Connection established with database.');
    const server = http.createServer(app);
    app.set('port', port);
    server.listen(port, () => {
      process.send('ready');
      console.log(`App is ready on port: ${port}.`);
    });
    server.on('error', (error) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      console.error('http server Error', error);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.log('Connection cannot be established with database.');
    console.log(err);
    process.exit(1);
  });
