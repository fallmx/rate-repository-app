import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import theme from '../theme';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import ItemSeparator from './ItemSeparator';
import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import TextInput from './TextInput';
import { useDebouncedCallback } from 'use-debounce';

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

const RepositoryListHeader = ({ order, setOrder, setSearch }) => {
  const debounced = useDebouncedCallback(
    value => setSearch(value),
    500
  );

  return (
    <View style={styles.picker}>
      <TextInput
        placeholder="🔍 Search"
        onChangeText={(text) => debounced(text)}
      />
      <ItemSeparator></ItemSeparator>
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
}

export class RepositoryListContainer extends React.Component {
  renderHeader(props) {
    const { order, setOrder, setSearch } = props;

    return (
      <RepositoryListHeader
        order={order}
        setOrder={setOrder}
        setSearch={setSearch}
      />
    );
  }

  render() {
    const { repositories, navigate } = this.props

    const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        style={styles.container}
        data={repositoryNodes}
        ListHeaderComponent={this.renderHeader(this.props)}
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
  }
}

const RepositoryList = () => {
  const [search, setSearch] = useState('');
  const [order, setOrder] = useState('latest')
  const { repositories } = useRepositories(order, search);
  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      order={order}
      setOrder={setOrder}
      setSearch={setSearch}
    />
  );
}

export default RepositoryList;
