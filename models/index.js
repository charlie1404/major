const Sequelize = require('sequelize');

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME,
} = process.env;

const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: false,
  pool: {
    max: 2,
    min: 0,
    acquire: 10000,
    idle: 6000000,
  },
});

const Users = sequelize.import('./users');

const db = {
  Users,
  sequelize,
  Sequelize,
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
