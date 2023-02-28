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

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  }

  const loggedIn = loading === false && data.me;

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" onPress={() => navigate('/')} />
        {loggedIn
          ? <AppBarTab text="Sign out" onPress={signOut} />
          : <AppBarTab text="Sign in" onPress={() => navigate('/signin')} />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
