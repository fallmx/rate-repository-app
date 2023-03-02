import Text from "./Text";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  }
});

export const formatNumber = (number) => {
  if (number >= 1000) {
    const rounded = Math.round(number / 100) / 10;
    return rounded + 'k';
  } else {
    return number;
  }
};

const RepositoryStatistic = ({ number, text }) => {
  return (
    <View style={styles.container}>
      <Text fontWeight="bold" style={styles.text}>{formatNumber(number)}</Text>
      <Text color="textSecondary" style={styles.text}>{text}</Text>
    </View>
  )
};

export default RepositoryStatistic;
