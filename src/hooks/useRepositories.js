import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (order) => {
  const orderSettings = {
    'latest': {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC'
    },
    'highestRating': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC'
    },
    'lowestRating': {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC'
    }
  };

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: orderSettings[order]
  });

  return { repositories: data?.repositories, error, loading };
};

export default useRepositories;
