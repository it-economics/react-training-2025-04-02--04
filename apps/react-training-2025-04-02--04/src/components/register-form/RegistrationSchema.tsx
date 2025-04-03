import { object, ref, string } from 'yup';

export const RegistrationSchema = object().shape({
  email: string().email('Not a valid email').required('Email is required'),
  password: string()
    .min(8, 'Password is too short')
    .required('Password is required'),
  repeatPassword: string()
    .oneOf(['', ref('password')], 'Passwords must match')
    .required('Repeat password is required')
});
