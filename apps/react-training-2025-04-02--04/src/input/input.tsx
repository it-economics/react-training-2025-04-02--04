interface InputProps {
  onInputChange: (value: string) => void;
}

export function Input(props: InputProps) {
  return (
    <label>
      Name-Input:
      <input
        name="name-input"
        onChange={(event) => props.onInputChange(event.target.value)}
      />
    </label>
  );
}

export default Input;
