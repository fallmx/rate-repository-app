import { Pressable, View, StyleSheet } from "react-native"
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  button: {
    height: 50,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Button = ({ text, onPress }) => {
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

export default Button;
