import gql from 'graphql-tag';

export const MESSAGE_SUBSCRIPTION = gql`
  subscription addtodos{
    todo{
        mutation
        data{
            id
            name
            priority
        }
    }
  }
`;
