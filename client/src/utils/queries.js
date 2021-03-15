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
   host
    guests
    dishes 
  }
  }
  
`;

export const QUERY_EVENT = gql`
query event($eventId: String!) {
    event(eventId: $eventId){
    _id
    eventName
    message
    date
    time
    location
    host
    guests
    dishes
  }
  }
  
`;

