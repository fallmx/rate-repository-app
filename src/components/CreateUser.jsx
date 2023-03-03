import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import useCreateUser from '../hooks/useCreateUser';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

const initialValues = {
  username: '',
  password: '',
  passwordConfirm: '',
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

const CreateUserForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="username"
        placeholder="Username"
      />
      <Separator />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
      />
      <Separator />
      <FormikTextInput
        name="passwordConfirm"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Separator />
      <Button
        text="Sign up"
        onPress={onSubmit}
      />
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(1, 'Username must be between 1 and 30 letters')
    .max(30, 'Username must be between 1 and 30 letters'),
  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 letters')
    .max(50, 'Password must be between 5 and 50 letters'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('Password confirmation is required'),
});

const CreateUser = () => {
  const [createUser] = useCreateUser();
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ username, password });
      await signIn({ username, password });
      navigate(`/`);
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
        {({ handleSubmit }) => <CreateUserForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}

export default CreateUser;
