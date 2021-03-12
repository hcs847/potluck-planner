const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {

    me: async (obj, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password');
    },

    events: async () => {
      return Event.find().sort({ date: -1 });
    },

    user: async (obj, { email }) => {
      return User.findOne({ email })
        .select('-__v -password');
    },

    event: async (obj, { _id }) => {
      return Event.findOne({ _id });
    }
  },

  Mutation: {

    login: async (obj, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },

    addUser: async (obj, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    addEvent: async (obj, args, context) => {
      if (context.user) {
        const event = await Event.create({ ...args, host: context.user.email });

        return event;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addDish: async (obj, {
      eventId,
      dishName,
      type,
      quantity,
      dishDiet }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          {
            $push: {
              dishes: {
                dishName,
                provider: context.user._id,
                type,
                quantity,
                dishDiet
              }
            }
          },
          { new: true, runValidators: true }
        );

        return updatedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addGuest: async (obj, { eventId, email }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $addToSet: { guests: { email } } },
          { new: true });

        return updatedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    }
  }
};

module.exports = resolvers;