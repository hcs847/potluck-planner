import gql from 'graphql-tag';

export const QUERY_EVENTS = gql`
query events {
    events{
        _id
    eventName
      message
      date
      time
    location
   host {
       firstName
   }
    guests
    dishes {
        dishType
    }
  }
  }
`;

export const QUERY_EVENT = gql`
query event($eventId: ID!) {
    event(eventId: $eventId){
    _id
    eventName
    message
    date
    time
    location
    host {
        firstName
        lastName
    }
    guests
    dishes {
        _id
        dishType
        dishName
        provider
    }
  }
  } 
`;

export const QUERY_DISH = gql`
query dish($dishId: String!) {
    dish(dishId: $dishId){
    _id
    provider
    dishName
    dishType
  }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(userId: $userId) {
    _id
    firstName
    lastName
    email
      
    }
  }
`;


