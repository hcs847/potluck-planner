const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Me {
  _id: ID
  firstName: String
  lastName: String
  email: String
  userDiet: [String]
  guestEvents: [Event]
  hostEvents: [Event]
}

type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  userDiet: [String]
}

input GuestInput {
  _id: ID
  firstName: String
  lastName: String
  email: String
  userDiet: [String]
}

type Dish {
  provider: String
  dishName: String
  dishType: String
  quantity: Int
  dishDiet: String
}

input DishInput {
  provider: String
  dishName: String
  dishType: String
  quantity: Int
  dishDiet: String
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
  dishes: [Dish]
}

type Auth {
  token: ID!
  user: User
}

type Query {

  me: Me
  users: [User]
  events: [Event]
  user(email: String!): User
  event(_id: String): Event
}

type Mutation {

  login(email: String!, password: String!): Auth

  addUser(
    email: String!,
    password: String!,
    firstName: String!,
    lastName: String!,
    userDiet: String
    ): Auth

  updateMe(
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    userDiet: String
    ): User

  deleteMe: User

  addEvent(
    eventName: String!,
    message: String,
    date: String,
    time: String,
    location: String,
    dishes: [DishInput]
    ): Event

  addDish(
    eventId: ID!,
    dishName: String!,
    type: String,
    quantity: Int,
    dishDiet: [String]
  ): Event

  addGuest(eventId: ID!, email:String!): Event

  deleteEvent(eventId: ID!): Event
}
`;

module.exports = typeDefs;