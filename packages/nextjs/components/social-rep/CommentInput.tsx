import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

export const CommentInput = ({ value, onChange, name, placeholder, disabled }: CommonInputProps<string>) => {
  const handleChange = (newValue: string) => {
    if (Buffer.from(newValue).length <= 320) {
      onChange(newValue);
    }
  };

  return (
    <InputBase<string>
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};
