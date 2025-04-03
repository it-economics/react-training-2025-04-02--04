import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { object, ref, string } from 'yup';
import { register } from '../../auth/auth-utils';
import { getErrors } from '../../utils/formik';

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
  <Box
    sx={(theme) => ({
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
    })}
  >
    <Paper
      sx={{ width: '80%', maxWidth: '500px', margin: 'auto', padding: '2rem' }}
    >
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

              <Button variant="contained" type="submit" loading={isSubmitting} disabled={!isValid || !dirty}>
                Register
              </Button>
              <Stack direction="row-reverse">
                <Link to="/login">Already have an account?</Link>
              </Stack>
            </Stack>
          </Form>
        )}
      </Formik>
    </Paper>
  </Box>
);

const RegistrationSchema = object().shape({
  email: string().email('Not a valid email').required('Email is required'),
  password: string()
    .min(8, 'Password is too short')
    .required('Password is required'),
  repeatPassword: string()
    .oneOf(['', ref('password')], 'Passwords must match')
    .required('Repeat password is required'),
});
