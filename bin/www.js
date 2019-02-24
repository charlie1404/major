/* eslint-disable no-console */

const http = require('http');
require('dotenv').config('../.env');
require('module-alias/register');

const app = require('../app');
const { sequelize } = require('../models');

const port = process.env.PORT || 3000;

sequelize
  .authenticate()
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
