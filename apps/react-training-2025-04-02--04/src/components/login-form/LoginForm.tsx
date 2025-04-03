import { Button, Stack, TextField, Typography } from '@mui/material';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { getErrors } from '../../utils/formik';
import { useAuthContext } from '../../auth/components/AuthContext';
import { AuthPageLayout } from '../../auth/components/AuthPageLayout';
import { LoginSchema } from './LoginSchema';

interface LoginFormState {
  email: string;
  password: string;
}

const initialValues: LoginFormState = {
  email: '',
  password: '',
};

export const LoginForm = () => {
  const { login } = useAuthContext();

  return (
    <AuthPageLayout>
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setSubmitting(true);
          login(values.email, values.password)
            .then(() => console.log('Login successful'))
            .catch(() => console.error('Login failed :('))
            .finally(() => setSubmitting(false));
        }}
      >
        {({ isValid, isSubmitting, dirty }) => (
          <Form>
            <Stack spacing={3}>
              <Typography variant="h2">Login</Typography>
              <Field name="email">
                {({ field, form }: FieldProps<string>) => (
                  <TextField
                    {...field}
                    label="E-Mail"
                    type="email"
                    error={!!getErrors(field.name, form)}
                    helperText={getErrors(field.name, form)}
                  />
                )}
              </Field>
              <Field name="password">
                {({ field, form }: FieldProps<string>) => (
                  <TextField
                    {...field}
                    label="Password"
                    type="password"
                    error={!!getErrors(field.name, form)}
                    helperText={getErrors(field.name, form)}
                  />
                )}
              </Field>
              <Button
                variant="contained"
                type="submit"
                loading={isSubmitting}
                disabled={!isValid || !dirty}
              >
                Login
              </Button>
              <Stack direction="row-reverse">
                <Link to="/register">Don't have an account yet?</Link>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </AuthPageLayout>
  );
};
