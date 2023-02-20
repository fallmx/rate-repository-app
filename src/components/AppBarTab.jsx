import { Pressable } from "react-native"
import { View, StyleSheet } from 'react-native';
import Text from "./Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 20
  }
})

const AppBarTab = ({ text, navigateTo }) => {
  const navigate = useNavigate();

  return (
    <View>
      <Pressable android_ripple={{ radius: 100 }} onPress={() => navigate(navigateTo)}>
        <View style={styles.button}>
          <Text color="textLight" fontSize="subheading" fontWeight="bold">{text}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default AppBarTab;
