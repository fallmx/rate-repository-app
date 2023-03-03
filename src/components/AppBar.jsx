import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { ME } from '../graphql/queries';
import { useQuery, useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data, loading } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const loggedIn = loading === false && data.me;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  const WhenLoggedIn = () => (
    <>
      <AppBarTab text="Create a review" onPress={() => navigate('/createreview')} />
      <AppBarTab text="Sign out" onPress={signOut} />
    </>
  );

  const WhenNotLoggedIn = () => (
    <>
      <AppBarTab text="Sign in" onPress={() => navigate('/signin')} />
      <AppBarTab text="Sign up" onPress={() => navigate('/signup')} />
    </>
  );

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" onPress={() => navigate('/')} />
        {loggedIn
          ? <WhenLoggedIn />
          : <WhenNotLoggedIn />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
