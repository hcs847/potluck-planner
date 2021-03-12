const mongoose = require('mongoose');
const { Schema } = mongoose;
const dishSchema = require('./Dish');

const eventSchema = new Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true
    },
    message: {
      type: String,
      required: false,
      trim: true
    },
    date: {
      type: Date,
      required: true,
      default: new Date()
    },
    time: {
      type: Date,
      required: true,
      default: new Date()
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    host: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    guests: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }],
    dishes: [dishSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

eventSchema.virtual('guestCount').get(function () {
  return this.guests.length;
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
