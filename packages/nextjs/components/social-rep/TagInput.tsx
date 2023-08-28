import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

export const TagInput = ({ value, onChange, name, placeholder, disabled }: CommonInputProps<string>) => {
  const handleChange = (newValue: string) => {
    if (Buffer.from(newValue).length <= 32) {
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
