const { User, Event, Dish } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const { events } = require('../models/User');

const resolvers = {

  Query: {

    me: async (obj, args, context) => {
      if (context.user) {
        return await User.findOne({ _id: context.user._id })
          .select('-__v -password');
      }

      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      return User.find()
        .select('-__v -password');
    },

    events: async () => {
      return Event.find().sort({ date: -1 })
        .populate('host dishes');
    },

    user: async (obj, { userId }) => {
      return User.findOne({ _id: userId })
        .select('-__v -password');
    },

    event: async (obj, { eventId }) => {
      return await Event.findOne({ _id: eventId })
        .populate('host dishes');
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

        // add event to guestEvents for each guest
        args.guests.forEach(async guest => {
          await User.findOneAndUpdate(
            { email: guest },
            { $push: { guestEvents: event._id } }
          );
        });

        // add event to hostEvents for the host
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $push: { hostEvents: event._id } }
        );

        return event;
      }

      throw new AuthenticationError('You need to be logged in!');
    },

    updateEvent: async (obj, args, context) => {
      if (context.user) {
        const hostEvent = await Event.findOne({ _id: args.eventId });

        if (hostEvent.host == context.user._id) {
          await Dish.deleteMany({ _id: hostEvent.dishes });
          await Event.findOneAndUpdate(
            { _id: args.eventId },
            { $set: { dishes: [] } }
          );
          // create new dishes
          const dishes = await Dish.insertMany(args.dishes);
          // create new array of dishIds
          const dishIds = dishes.map(dish => dish._id);
          // update Event with current args
          const event = await Event.findOneAndUpdate(
            { _id: args.eventId },
            {
              eventName: args.eventName,
              message: args.message,
              date: args.date,
              time: args.time,
              location: args.location,
              guests: args.guests,
              dishes: dishIds
            },
            { new: true }
          );
          return event;
        }

        throw new AuthenticationError('You must be the event host to update event!')
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
      const eventHostCheck = await Event.findOne({ _id: args.eventId });
      if (context.user) {
        if (eventHostCheck.host == context.user._id) {
          const deletedEvent = await Event.findOneAndDelete(
            { _id: args.eventId }
          );
          return deletedEvent;
        }

        throw new AuthenticationError('Only the event host can delete this event!')
      }

      throw new AuthenticationError('You need to be logged in!');
    }

  }
};

module.exports = resolvers;