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