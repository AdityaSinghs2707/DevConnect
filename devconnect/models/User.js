const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name required hai'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email required hai'],
    unique: true,
    lowercase: true
  },
 password: {
  type: String,
  required: true,
  select: false  // ← Yeh hona chahiye
},
  bio: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);