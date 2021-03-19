import gql from 'graphql-tag';

export const ADD_USER = gql`
mutation addUser( $email: String!, $password: String!, $firstName: String!,$lastName: String!) {
    addUser( email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ADD_EVENT = gql`
  mutation addEvent(
      $eventName: String!,
      $message: String,
      $date: String!,
      $time: String!,
      $location: String!,
      $guests: [String],
      $dishes: [DishInput]
     ) {
    addEvent(
        eventName: $eventName,
        message: $message,
        date: $date,
        time: $time,
        location: $location,
        guests: $guests,
        dishes: $dishes

      ) {
        _id
        eventName
        location
      
  } 
}
`;

export const UPDATE_EVENT = gql`
mutation updateEvent(
    $eventId: String!,
    $eventName: String,
    $message: String,
    $date: String,
    $time: String,
    $location: String,
    $guests: [String],
    $dishes: [DishInput]
  ){
      updateEvent(
        eventId: $eventId,
        eventName: $eventName,
        message: $message,
        date: $date,
        time: $time,
        location: $location,
        guests: $guests,
        dishes: $dishes

      ) {
        _id
        eventName
        location 
      }
  }`;


export const DELETE_EVENT = gql`
mutation deleteEvent(
    $eventId:ID!
    ) {
        deleteEvent(
            eventId: $eventId) {
      _id
      eventName
      
    }
  }
  `;

export const ASSIGN_DISH = gql`
  mutation updateDish(
      $dishId: String!,
      $dishName: String!
     ) {
        updateDish(
        dishId: $dishId,
        dishName: $dishName
      ) {
        _id
        provider
        dishName
        dishType
      }
}
`;
