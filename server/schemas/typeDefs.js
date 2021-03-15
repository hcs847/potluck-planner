const { gql } = require('apollo-server-express');

const typeDefs = gql`

input DishInput {
  provider: String
  dishName: String
  dishType: String
  quantity: Int
  dishDiet: [String]
}

type User {
  _id: ID
  password: String
  firstName: String
  lastName: String
  email: String
  guestEvents: [Event]
  hostEvents: [Event]
  userDiet: [String]
}

type Dish {
  _id: ID
  provider: ID
  dishName: String
  dishType: String
  quantity: Int
  dishDiet: [String]
}

type Event {
  _id: ID
  eventName: String
  message: String
  date: String
  time: String
  location: String
  host: ID
  guests: [ID]
  guestCount: Int
  dishes: [ID]
}

type Auth {
  token: ID!
  user: User
}

type Query {

  me: User
  users: [User]
  events: [Event]
  dishes: [Dish]
  user(email: String!): User
  event(eventId: String!): Event
  dish(dishId: String): Dish
}

type Mutation {

  login(email: String!, password: String!): Auth

  addUser(
    email: String!,
    password: String!,
    firstName: String!,
    lastName: String!,
    userDiet: [String]
    ): Auth

  updateMe(
    email: String,
    firstName: String,
    lastName: String,
    userDiet: [String]
    ): User

  deleteMe: User

  addEvent(
    eventName: String!,
    message: String,
    date: String,
    time: String,
    location: String,
    guests: [String],
    dishes: [DishInput]
    ): Event

  updateEvent(
    eventId: String!,
    eventName: String,
    message: String,
    date: String,
    time: String,
    location: String,
    guests: [String],
    dishes: [DishInput]
    ): Event

  updateDish(
    dishId: String!,
    dishName: String!,
    dishType: String,
    quantity: Int,
    dishDiet: [String]
  ): Dish

  addGuest(eventId: ID!, email:String!): Event

  deleteEvent(eventId: ID!): Event
}
`;

module.exports = typeDefs;