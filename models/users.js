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

model('Users', userSchema);
