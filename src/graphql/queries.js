import { gql } from '@apollo/client';
import { CORE_REPOSITORY } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY}
  query {
    repositories {
      edges {
        node {
          ...CoreRepository
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  ${CORE_REPOSITORY}
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepository
      url
    }
  }
`;

export const ME = gql`
  query {
    me {
      id
      username
    }
  }
`
