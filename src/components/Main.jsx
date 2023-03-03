import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import { StatusBar } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import theme from '../theme';
import RepositoryView from './RepositoryView';
import CreateReview from './CreateReview';
import CreateUser from './CreateUser';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.background,
  },
});

const Main = () => {
  StatusBar.setBarStyle('light-content')
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/repositories/:id" element={<RepositoryView />} exact />
        <Route path="/createreview" element={<CreateReview />} exact />
        <Route path="/signup" element={<CreateUser />} exact />
      </Routes>
    </View>
  );
};

export default Main;
