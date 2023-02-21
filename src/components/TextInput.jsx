import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textSecondary,
  },
  error: {
    borderColor: theme.colors.error,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [
    styles.textInput,
    error && styles.error,
    style,
  ];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
