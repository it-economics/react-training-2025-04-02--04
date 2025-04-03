import { object, string } from 'yup';

export const LoginSchema = object().shape({
  email: string().email('Not a valid email').required('Email is required'),
  password: string()
    .min(8, 'Password is too short')
    .required('Password is required')
});
