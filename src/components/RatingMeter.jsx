import { View, StyleSheet } from "react-native";
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    width: 45,
    height: 45,
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 25,
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
});

const RatingMeter = ({ rating }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text} color="primary" fontSize="subheading" fontWeight="bold">{rating}</Text>
    </View>
  );
};

export default RatingMeter;
