import React, { ChangeEvent } from "react";

interface ScoreInputProps {
  value: number;
  onChange: (value: number) => void;
}

export const ScoreInput: React.FC<ScoreInputProps> = ({ value, onChange }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(Number(event.target.value));
  };

  const getBackgroundColor = (value: number) => {
    if (value < 0) return "lightcoral";
    if (value > 0) return "lightgreen";
    return "lightgrey";
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Score</label>
      <select
        value={value}
        onChange={handleChange}
        className="block appearance-none w-full p-2 rounded border shadow"
        style={{ backgroundColor: getBackgroundColor(value) }}
      >
        <option value={2} style={{ backgroundColor: "lightgreen" }}>
          Positive(+2)
        </option>
        <option value={1} style={{ backgroundColor: "lightgreen" }}>
          Positive(+1)
        </option>
        <option value={0} style={{ backgroundColor: "lightgrey" }}>
          Neutral(0)
        </option>
        <option value={-1} style={{ backgroundColor: "lightcoral" }}>
          Negative(-1)
        </option>
        <option value={-2} style={{ backgroundColor: "lightcoral" }}>
          Negative(-2)
        </option>
      </select>
    </div>
  );
};
