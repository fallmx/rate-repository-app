import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: 'lightGray',
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style, styles.textInput];

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;
