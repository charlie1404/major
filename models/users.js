module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(80),
      isAlpha: true,
      notNull: true,
    },
    email: {
      type: DataTypes.STRING(80),
      unique: true,
      isEmail: true,
      notNull: true,
    },
    username: {
      type: DataTypes.STRING(80),
      isAlphanumeric: true,
      notNull: true,
      unique: true,
    },
    contact: DataTypes.STRING(15),
    gender: DataTypes.STRING(1),
    password: DataTypes.STRING(150),
    salt: DataTypes.STRING(80),
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    avatar: DataTypes.STRING(80),
  });

  Users.associate = () => {};

  // Users.sync({force: true});

  return Users;
};


/*
  const { Schema, model } = require('mongoose');
  const uniqueValidator = require('mongoose-unique-validator');

  const userSchema = new Schema({
    name: String,
    username: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'can\'t be blank'],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'can\'t be blank'],
      match: [/\S+@\S+\.\S+/, 'is invalid'],
      index: true,
    },
    salt: { type: String, required: true },
    password: { type: String, required: true },
    contact: String,
    gender: String,
    avatar: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  });

  userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

  userSchema.pre('save', async function preSave(next) {
    this.updatedAt = Date.now();

    if (!this.createdAt) {
      this.createdAt = Date.now();
    }
    next();
  });

  module.exports = model('Users', userSchema);
*/
