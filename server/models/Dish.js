const mongoose = require('mongoose');
const { Schema } = mongoose;

const dishSchema = new Schema(
  {
    provider: {
      type: Schema.Types.ObjectId,
      ref: 'User'
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

    dishDiet: [
      {
        type: String,
        enum: ['None', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Dairy-free', 'Nut-free', 'Gluten-free'],
      }
    ]

  });

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
