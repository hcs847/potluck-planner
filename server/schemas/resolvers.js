const { User, Event, Dish } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { events } = require('../models/User');

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
      return User.findOne({ email: email })
        .select('-__v -password');
    },

    event: async (obj, { _id }, context) => {
      const event = Event.findOne({ _id: _id });
      if (event.guests.includes(context.user.email) || event.host === context.user._id) {
        return event;
      }
    },

    dishes: async () => {
      return Dish.find();
    },

    dish: async (obj, { _id }) => {
      return Dish.findOne({ _id: _id });
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
          args,
          { new: true }
        ).select('-__v -password');
        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    deleteMe: async (obj, args, context) => {
      if (context.user) {
        const deletedUser = await User.findOneAndDelete(
          { _id: context.user._id }
        ).select('-__v -password');
        return deletedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addEvent: async (obj, args, context) => {
      if (context.user) {
        const dishes = await Dish.insertMany(args.dishes);
        const dishIds = dishes.map(dish => dish._id);
        const event = await Event.create({
          eventName: args.eventName,
          message: args.message,
          date: args.date,
          time: args.time,
          location: args.location,
          guests: args.guests,
          dishes: dishIds,
          host: context.user._id
        });
        return event;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    updateDish: async (obj, args, context) => {
      if (context.user) {
        const updatedDish = await Dish.findOneAndUpdate(
          { _id: args.dishId },
          { ...args, provider: context.user._id },
          { new: true });

        return updatedDish;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    addGuest: async (obj, { eventId, email }, context) => {
      if (context.user) {
        const guest = await User.findOne({ email: email }).select('-__v -password');
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