import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { useApolloClient } from '@apollo/client';
import { useAuthStorage } from '../hooks/useAuthStorage';
import { useNavigate } from "react-router-native";
import useCurrentUser from '../hooks/useCurrentUser';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { user, loading } = useCurrentUser(false);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const loggedIn = loading === false && user;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  }

  const WhenLoggedIn = () => (
    <>
      <AppBarTab text="Create a review" onPress={() => navigate('/createreview')} />
      <AppBarTab text="My reviews" onPress={() => navigate('/myreviews')} />
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
