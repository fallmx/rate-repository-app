import { Pressable, View, StyleSheet } from "react-native"
import Text from "./Text";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 20
  }
})

const AppBarTab = ({ text, onPress }) => {
  return (
    <View>
      <Pressable android_ripple={{ radius: 100 }} onPress={onPress}>
        <View style={styles.button}>
          <Text color="textLight" fontSize="subheading" fontWeight="bold">{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
