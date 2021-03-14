const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  provider: {
    type: String,
    required: true
  },
  dishName: {
    type: String,
    trim: true
  },
  dishType: {
    type: String
  },
  quantity: {
    type: Number,
    min: 1,
    default: 1
  },
  dishDiet: {
    type: String
  }
});

module.exports = dishSchema;
