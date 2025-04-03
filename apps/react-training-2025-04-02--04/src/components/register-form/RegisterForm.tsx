import { Button, Stack, TextField, Typography } from '@mui/material';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { register } from '../../auth/auth-utils';
import { getErrors } from '../../utils/formik';
import { AuthPageLayout } from '../auth/AuthPageLayout';
import { RegistrationSchema } from './RegistrationSchema';

interface RegisterFormState {
  email: string;
  password: string;
  repeatPassword: string;
}

const initialValues: RegisterFormState = {
  email: '',
  password: '',
  repeatPassword: '',
};

export const RegisterForm = () => (
  <AuthPageLayout>
    <Formik
      initialValues={initialValues}
      validationSchema={RegistrationSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(true);
        register(values.email, values.password)
          .then(() => console.log('Registration successful'))
          .catch(() => console.error('Registration failed :('))
          .finally(() => setSubmitting(false));
      }}
    >
      {({ isValid, isSubmitting, dirty }) => (
        <Form>
          <Stack spacing={3}>
            <Typography variant="h2">Registration</Typography>
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
            <Field name="repeatPassword">
              {({ field, form }: FieldProps<string>) => (
                <TextField
                  {...field}
                  label="Repeat password"
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
              Register
            </Button>
            <Stack direction="row-reverse">
              <Link to="/login">Already have an account?</Link>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  </AuthPageLayout>
);
