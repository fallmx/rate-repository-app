import FormikTextInput from './FormikTextInput';
import { View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import Button from './Button';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

import theme from '../theme';

const initialValues = {
  owner: '',
  name: '',
  rating: '',
  review: '',
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

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
      />
      <Separator />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
      />
      <Separator />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        keyboardType="number-pad"
      />
      <Separator />
      <FormikTextInput
        name="text"
        placeholder="Review"
        multiline
      />
      <Separator />
      <Button
        text="Create a review"
        onPress={onSubmit}
      />
    </View>
  );
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .integer('Rating is invalid')
    .min(0, 'Rating is invalid')
    .max(100, 'Rating is invalid'),
  text: yup
    .string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, rating, repositoryName, text } = values;

    try {
      const result = await createReview({ ownerName, rating: Number(rating), repositoryName, text });
      navigate(`/repositories/${result.data.createReview.repositoryId}`);
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
        {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
      </Formik>
    </View>
  );
}

export default CreateReview;
