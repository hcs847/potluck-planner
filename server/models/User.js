const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must match an email address!']
    },

    password: {
      type: String,
      required: true,
      minlength: 5
    },

    firstName: {
      type: String,
      required: true,
      trim: true
    },

    lastName: {
      type: String,
      required: true,
      trim: true
    },

    userDiet: [
      {
        type: String,
        enum: ['None', 'Vegan', 'Vegetarian', 'Kosher', 'Halal', 'Dairy-free', 'Nut-free', 'Gluten-free'],
      }
    ],

    guestEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ],

    hostEvents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]

  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

// hash and salt passwords with bcrypt
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// decrypt with bcrypt
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
