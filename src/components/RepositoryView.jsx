import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { View } from "react-native";
import Button from "./Button";
import { useParams } from "react-router-native";
import { StyleSheet } from 'react-native';
import theme from "../theme";
import { openURL } from 'expo-linking';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.panel,
  },
  separator: {
    height: 15,
  },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);

  if (error || loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <RepositoryItem item={repository} />
      <Separator />
      <Button text="Open in GitHub" onPress={() => openURL(repository.url)} />
    </View>
  );
};

export default RepositoryView;
