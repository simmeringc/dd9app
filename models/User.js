const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const md5 = require('md5');
const validator = require('validator');
const passportLocalMongoose = require('passport-local-mongoose');
const mongooseErrorHanlder = require('mongoose-mongodb-errors');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  _id: {
    type: mongoose.Schema.ObjectId,
    auto: true
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company'
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please supply an email address'
  },
  signInCount: {
    type: Number,
  },
  lastSignInAt: {
    type: Date
  },
  lastSignInIP: {
    type: String
  },
  firstName: {
    type: String,
    required: 'Please supply a first name',
    trim: true
  },
  lastName: {
    type: String,
    required: 'Please supply a last name',
    trim: true
  },
  role: {
    type: String,
    default: 'staff'
  },
  permissions: {
    type: Array,
    default: [{
      "admin": false
    }],
  },
  active: {
    type: Boolean,
    default: true
  },
  hourLogEmail: {
    type: String,
    default: 'none'
  },
  memo: {
    type: String,
    default: ''
  }
},
  {
    timestamps: true
  }
);

// Rather than storing all the data, we can generate it on the fly
userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

// Compound index as text
userSchema.index({
  email: 1,
  firstName: 1,
  lastName: 1
});

// Serialize and deserialize sessions
userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

// PrettyPrint MongoDB errors if they're thrown by the server
userSchema.plugin(mongooseErrorHanlder);

// Depricated Mongo function required by Passport
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);