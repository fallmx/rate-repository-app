import { useMutation } from '@apollo/client';
import { AUTHENTICATE } from '../graphql/mutations';
import { useAuthStorage } from './useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const mutationResult = await mutate({
      variables: {
        credentials: {
          username,
          password
        }
      }
    });
    const token = mutationResult.data?.authenticate?.accessToken;
    if (token) {
      await authStorage.setAccessToken(token);
      apolloClient.resetStore();
    }
    return mutationResult;
  };

  return [signIn, result];
};

export default useSignIn;
