import gql from 'graphql-tag';

export const QUERY_EVENTS = gql`
query events {
     _id
    eventName
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
  
`;

