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

const Button = ({ text, onPress, ...props }) => {
  return (
    <View>
      <Pressable android_ripple={{ radius: 200, foreground: true }} onPress={onPress} {...props}>
        <View style={styles.button}>
          <Text color="textLight" fontSize="subheading" fontWeight="bold">{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
