import { TextField, TextFieldProps } from '@mui/material';
import { FC, useState } from 'react';

interface InputProps {
  onInputChange: (value: string) => void;
}

export function Input(props: InputProps) {
  return (
    <MyTextField
      label="Name-Input"
      onChange={(event) => props.onInputChange(event.target.value)}
    />
  );
}

const MyTextField: FC<Omit<TextFieldProps, 'helperText'>> = (props) => {
  const [helperText, setHelperText] = useState('');

  return (
    <TextField
      {...props}
      helperText={helperText}
      onChange={(evt) => {
        props.onChange?.(evt);
        setHelperText(`Text: ${evt.target.value}`);
      }}
    />
  );
};

export default Input;
