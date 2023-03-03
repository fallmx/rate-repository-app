import { View, StyleSheet, Image } from 'react-native';
import Text from './Text';
import theme from '../theme';
import RepositoryStatistic from './RepositoryStatistic';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.panel,
  },
  descriptionContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  description: {
    paddingLeft: 15,
    flexShrink: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
    marginRight: 'auto',
  },
  statisticContainer: {
    paddingTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

const RepositoryItem = ({item}) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.descriptionContainer}>
        <View>
          <Image
            style={styles.avatar}
            source={{ uri: item.ownerAvatarUrl }}
          />
        </View>
        <View style={styles.description}>
          <Text fontSize="subheading" fontWeight="bold">{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text color="textLight">{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.statisticContainer}>
        <RepositoryStatistic number={item.stargazersCount} text="Stars" />
        <RepositoryStatistic number={item.forksCount} text="Forks" />
        <RepositoryStatistic number={item.reviewCount} text="Reviews" />
        <RepositoryStatistic number={item.ratingAverage} text="Rating" />
      </View>
    </View>
  )
};

export default RepositoryItem;
