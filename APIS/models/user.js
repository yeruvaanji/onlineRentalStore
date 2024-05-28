const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password:{ type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  userType: { type: String, required: true },
});

module.exports = mongoose.model('User', UserSchema);
