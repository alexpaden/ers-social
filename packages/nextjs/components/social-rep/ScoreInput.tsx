import { useCallback } from "react";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";

// Adjust the path as needed

export const ScoreInput = ({ value, onChange, name, placeholder, disabled }: CommonInputProps<number>) => {
  const handleInputChange = (newValue: string) => {
    const numericValue = parseInt(newValue, 10);
    if (!isNaN(numericValue) && numericValue >= -2 && numericValue <= 2) {
      onChange(numericValue);
    }
  };

  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={e => handleInputChange(e.target.value)}
      disabled={disabled}
      type="number"
      min={-2}
      max={2}
    />
  );
};
