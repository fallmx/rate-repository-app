import { FlatList, View, StyleSheet } from "react-native";
import theme from "../theme";
import RepositoryReview from "./RepositoryReview";
import ItemSeparator from "./ItemSeparator";
import useCurrentUser from "../hooks/useCurrentUser";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  panelContainer: {
    padding: 15,
    backgroundColor: theme.colors.panel,
  },
});

const MyReviews = () => {
  const { user, loading } = useCurrentUser(true);

  if (loading || !user) {
    return null;
  }

  const reviewNodes = user.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      style={styles.container}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <View style={styles.panelContainer}>
            <RepositoryReview key={item.id} review={item} title={item.repository.fullName}/>
          </View>
        );
      }}
    />
  );
};

export default MyReviews;
