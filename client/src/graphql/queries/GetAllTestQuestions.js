import { gql } from "apollo-boost";

export default gql`
  query GetAllTestQuestions {
    tests {
      questions {
        id
        text
      }
    }
  }
`;
