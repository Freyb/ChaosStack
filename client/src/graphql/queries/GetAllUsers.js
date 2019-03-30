import { gql } from "apollo-boost";

export default gql`
  query GetAllTestQuestions {
    users {
      id
      username
    }
  }
`;
