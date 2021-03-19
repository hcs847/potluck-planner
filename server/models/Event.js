const mongoose = require('mongoose');
const { Schema } = mongoose;

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
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
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

    guests: [
      {
        type: String,
        match: [/.+@.+\..+/, 'Must match an email address!']
      }
    ],

    dishes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Dish'
      }
    ]

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
