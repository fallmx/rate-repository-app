import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import ItemSeparator from './ItemSeparator';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
  itemContainer: {
    backgroundColor: theme.colors.panel,
    padding: 15,
  },
  picker: {
    padding: 10,
  },
});

export const RepositoryListContainer = ({ repositories, navigate, order, setOrder }) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const header = () => (
    <View style={styles.picker}>
      <Picker
        prompt="Order by..."
        selectedValue={order}
        onValueChange={setOrder}
      >
        <Picker.Item label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highestRating" />
        <Picker.Item label="Lowest rated repositories" value="lowestRating" />
      </Picker>
    </View>
  );

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ListHeaderComponent={header}
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
  const [order, setOrder] = useState('latest')
  const { repositories } = useRepositories(order);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
    />
  );
}

export default RepositoryList;
