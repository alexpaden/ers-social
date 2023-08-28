import React, { useState } from "react";

const StoreSelection: React.FC = () => {
  const [formData, setFormData] = useState({
    receiverAddress: "",
    score: "",
  });

  const handleScoreClick = (e: React.MouseEvent<HTMLButtonElement>, score: string) => {
    e.preventDefault();
    setFormData({ ...formData, score });
  };

  const ratings = [
    { label: "Negative", value: "-2", color: "#FFCCCC" },
    { label: "Negative", value: "-1", color: "#FFDDDD" },
    { label: "Neutral", value: "0", color: "#DDDDDD" },
    { label: "Positive", value: "1", color: "#CCFFCC" },
    { label: "Positive", value: "2", color: "#BBFFBB" },
  ];

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl mb-4">Store Selection</h1>
      <div className="flex items-center mb-4">
        <div className="mr-4">
          Receiver:
          <input
            type="text"
            placeholder="Receiver Address"
            value={formData.receiverAddress}
            onChange={e => setFormData({ ...formData, receiverAddress: e.target.value })}
          />
        </div>
        <div className="btn-group">
          {ratings.map((rating, index) => (
            <button
              key={index}
              className={`btn rounded-md text-xs font-light ${formData.score === rating.value ? "selected" : ""}`}
              style={{ backgroundColor: formData.score === rating.value ? rating.color : "transparent" }}
              onClick={e => handleScoreClick(e, rating.value)}
            >
              <div className="text-xs text-gray-600">{rating.label}</div>
              <div className="text-xs">{rating.value}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreSelection;
