import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View, StyleSheet } from "react-native";
import Button from "./Button";
import { useParams } from "react-router-native";
import theme from "../theme";
import { openURL } from 'expo-linking';
import RepositoryReview from "./RepositoryReview";
import ItemSeparator from "./ItemSeparator";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  panelContainer: {
    padding: 15,
    backgroundColor: theme.colors.panel,
  },
  separator: {
    height: 15,
  },
});

const Separator = () => <View style={styles.separator} />;

const RepositoryViewHeader = ({ repository }) => {
  return (
    <View>
      <View style={styles.panelContainer}>
        <RepositoryItem item={repository} />
        <Separator />
        <Button text="Open in GitHub" onPress={() => openURL(repository.url)} />
      </View>
      <ItemSeparator />
    </View>
  );
}

const RepositoryView = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);

  if (error || loading) {
    return null;
  }

  const reviewNodes = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      style={styles.container}
      data={reviewNodes}
      ListHeaderComponent={<RepositoryViewHeader repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View style={styles.panelContainer}>
            <RepositoryReview key={item.id} review={item} title={item.user.username}/>
          </View>
        );
      }}
    />
  );
};

export default RepositoryView;
