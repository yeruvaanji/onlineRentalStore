const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema({
  place: String,
  area: Number,
  bedrooms: Number,
  bathrooms: Number,
  hospitals: String,
  colleges: String
});

module.exports = mongoose.model('Property', propertySchema);
