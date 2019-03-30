import { gql } from 'apollo-boost';

export default gql`
  mutation AddRecipe(
    $name: String!
  ) {
    createUser(
      data: {
        username: $name
      }
    ) {
      id
    }
  }
`;
