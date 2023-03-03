import { gql } from '@apollo/client';
import { CORE_REPOSITORY } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY}
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
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
      reviews {
        edges {
          node {
            text
            user {
              username
            }
            createdAt
            rating
            id
          }
        }
      }
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
