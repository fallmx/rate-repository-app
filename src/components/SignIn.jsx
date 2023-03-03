import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.panel,
  },
  separator: {
    height: 15,
  },
});

const Separator = () => <View style={styles.separator} />;

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        testID="usernameField"
        name="username"
        placeholder="Username"
      />
      <Separator />
      <FormikTextInput
        testID="passwordField"
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Separator />
      <Button
        testID="signInButton"
        text="Sign in"
        onPress={onSubmit}
      />
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

export const SignInHandler = ({ signIn, navigate }) => {
  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  return (
    <SignInHandler signIn={signIn} navigate={navigate} />
  );
}

export default SignIn;
