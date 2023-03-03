import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import ItemSeparator from './ItemSeparator';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  itemContainer: {
    backgroundColor: theme.colors.panel,
    padding: 15,
  },
});

export const RepositoryListContainer = ({ repositories, navigate }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => {
        return (
          <Pressable
            android_ripple={{ radius: 250, foreground: true }}
            onPress={() => navigate(`/repositories/${item.id}`)}
          >
            <View style={styles.itemContainer}>
              <RepositoryItem key={item.id} item={item} />
            </View>     
          </Pressable>
        );
      }}
    />
  );
};

const RepositoryList = () => {
  const { repositories } = useRepositories();
  const navigate = useNavigate();

  return <RepositoryListContainer repositories={repositories} navigate={navigate} />;
}

export default RepositoryList;
