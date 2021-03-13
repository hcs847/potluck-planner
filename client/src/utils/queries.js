import gql from 'graphql-tag';

export const QUERY_EVENTS = gql`
query events {
    events {
        eventName
        date
        time
        
    }
}
`;

