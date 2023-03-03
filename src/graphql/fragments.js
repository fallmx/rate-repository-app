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
