const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { getHash } = require('@utils');

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
  password: { type: String, required: true },
  contact: String,
  gender: String,
  avatar: String,
});

userSchema.plugin(uniqueValidator, { message: 'is already taken.' });

userSchema.pre('save', async function preSave(next) {
  const { hash, salt } = await getHash();
  this.salt = salt;
  this.password = hash;
  this.updatedAt = Date.now();

  if (!this.createdAt) {
    this.createdAt = Date.now();
  }
  next();
});

module.exports = model('Users', userSchema);
