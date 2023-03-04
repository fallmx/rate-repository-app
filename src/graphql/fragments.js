import { gql } from '@apollo/client';

export const CORE_REPOSITORY = gql`
  fragment CoreRepository on Repository {
    fullName
    id
    description
    language
    forksCount
    stargazersCount
    ratingAverage
    reviewCount
    ownerAvatarUrl
  }
`;

export const CORE_REVIEW = gql`
  fragment CoreReview on Review {
    id
    text
    rating
    createdAt
  }
`;
