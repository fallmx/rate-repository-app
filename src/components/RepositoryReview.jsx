import Text from "./Text";
import { View, StyleSheet } from "react-native";
import theme from "../theme";
import RatingMeter from "./RatingMeter";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.panel,
    display: 'flex',
    flexDirection: 'row'
  },
  content: {
    paddingLeft: 15,
    flexShrink: 1,
  },
  text: {
    paddingTop: 5,
  }
});

const RepositoryReview = ({ review }) => {
  return (
    <View style={styles.container}>
      <View>
        <RatingMeter rating={review.rating} />
      </View>
      <View style={styles.content}>
        <Text fontSize="subheading" fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary" >{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        <Text style={styles.text} >{review.text}</Text>
      </View>
    </View>
  );
};

export default RepositoryReview;
