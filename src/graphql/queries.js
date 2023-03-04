import { gql } from '@apollo/client';
import { CORE_REPOSITORY, CORE_REVIEW } from './fragments';

export const GET_REPOSITORIES = gql`
  ${CORE_REPOSITORY}
  query Repositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String) {
    repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword) {
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
  ${CORE_REVIEW}
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...CoreRepository
      url
      reviews {
        edges {
          node {
            ...CoreReview
            user {
              username
            }
          }
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  ${CORE_REVIEW}
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            ...CoreReview
            repository {
              fullName
            }
          }
        }
      }
    }
  }
`;
