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
      lastName
      email
    }
    guests {
      firstName
    }
    dishes {
      dishName
    }
  }
  }
  
`;

