const mongoose = require('mongoose');

const { Schema } = mongoose;

const dishSchema = new Schema({
  provider: {
    type: Schema.Types.ObjectId,
    required: true
  },
  dishName: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['Main dish', 'Dessert', '']
  },
  quantity: {
    type: Number,
    min: 0,
    default: 0
  },
  dishDiet: [{
    type: String,
    enum: ['None', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Dairy-free', 'Nut-free', 'Gluten-free']
  }]
});

module.exports = dishSchema;
