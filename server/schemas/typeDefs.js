const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {
  _id: ID
  firstName: String
  lastName: String
  email: String
  userDiet: [String]
}

type Dish {
  _id: ID
  dishName: String
  type: String
  price: Int
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
  host: User
  guests: [User]
  guestCount: Int
  dishes: [Dish]
}

type Auth {
  token: ID!
  user: User
}

type Query {

  me: User

  users: [User]

  events: [Event]

  user(email: String!): User

  event(_id: String): [Event]
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

  addEvent(
    eventName: String!,
    message: String,
    date: String,
    time: String,
    location: String,
    guests:[String],
    dishes:[String]
    ): Event

  addDish(
    eventId: ID!,
    dishName: String!,
    type: String,
    quantity: Int,
    dishDiet: [String]
  ): Event

  addGuest(eventId: ID!, email:String!): Event
}
`;

module.exports = typeDefs;