const { User, Event } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {

  Query: {

    me: async (obj, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password');
        const gEvents = await Event.find({ guests: { _id: context.user._id } });
        const hEvents = await Event.find({ host: { _id: context.user._id } });


        return { ...userData, guestEvents: gEvents, hostEvents: hEvents };
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

    updateMe: async (obj, args, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { ...args },
          { new: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    deleteMe: async (obj, args, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete(
          { _id: context.user._id }
        );
        return deletedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addEvent: async (obj, args, context) => {
      if (context.user) {
        const guestEmails = args.dishes.map(provider => provider.provider);
        const guests = await User.find({ email: guestEmails });
        const guestIds = guests.map(guest => guest._id);

        const event = await Event.create({ ...args, guests: guestIds, host: context.user._id });

        return event;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addDish: async (obj, args, context) => {
      console.log(args);
      if (context.user) {
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: args.eventId },
          { $push: { dishes: { ...args } } },
          { new: true }
        );

        return updatedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addGuest: async (obj, { eventId, email }, context) => {
      if (context.user) {
        const guest = await User.findOne({ email: email })
        const updatedEvent = await Event.findOneAndUpdate(
          { _id: eventId },
          { $addToSet: { guests: guest._id } },
          { new: true });

        return updatedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    deleteEvent: async (obj, args, context) => {
      if (context.user) {
        const deletedEvent = await Event.findOneAndDelete(
          { _id: args.eventId }
        );
        return deletedEvent;
      }

      throw new AuthenticationError('You need to be logged in!');
    }

  }
};

module.exports = resolvers;