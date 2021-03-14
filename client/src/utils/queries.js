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

export const QUERY_EVENT = gql`
query event($_id:String!) {
    event(_id: $_id){
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

