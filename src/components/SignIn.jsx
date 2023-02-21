import FormikTextInput from './FormikTextInput';
import { View } from 'react-native';
import { Formik } from 'formik';
import { StyleSheet } from 'react-native';
import Button from './Button';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
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
      <Button
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

const SignIn = () => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
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

export default SignIn;
