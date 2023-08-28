import React, { useEffect, useRef, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { useAddress } from "../AddressContext";

interface ContractWriteProps {
  address?: string | string[]; // Added the address prop
}

const ContractWrite = ({address}) => {
  const [customTag, setCustomTag] = useState("");
  const { address: contextAddress, setAddress } = useAddress();
  const [formData, setFormData] = useState({
    score: "1",
    tag: "🔵 Default",
    comment: "Thanks for always being there for me, and the small loan😉",
  });
  const [submitTimer, setSubmitTimer] = useState<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const tagDropdownRef = useRef(null);

  const tagOptions = [
    { label: "🔵 Default" },
    { label: "🎨 Design" },
    { label: "🚀 Startups" },
    { label: "🟪 Farcaster" },
  ];

  const ratings = [
    { label: "Negative", value: "-2", color: "#FFCCCC", emoji: "😡" },
    { label: "Negative", value: "-1", color: "#FFDDDD", emoji: "😞" },
    { label: "Neutral", value: "0", color: "#DDDDDD", emoji: "😐" },
    { label: "Positive", value: "1", color: "#CCFFCC", emoji: "😊" },
    { label: "Positive", value: "2", color: "#BBFFBB", emoji: "😃" },
  ];

  const { writeAsync, isLoading } = useScaffoldContractWrite({
    contractName: "ReputationServiceMachine",
    functionName: "setReputation",
    args: [address, BigInt(formData.score), formData.tag, formData.comment],
    value: "0.01",
    onBlockConfirmation: txnReceipt => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      window.location.reload();
    },
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagDropdownRef.current && !tagDropdownRef.current.contains(event.target)) {
        setShowTagDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      console.log("Form submitted");
      handleSubmit(); // Call the handleSubmit function
      setProgress(0); // Reset progress
      if (submitTimer) {
        clearInterval(submitTimer); // Clear the timer
      }
      setSubmitTimer(null); // Reset the timer state
    }
  }, [progress]);

  const handleTagClick = tag => {
    setFormData({ ...formData, tag });
    setShowTagDropdown(false);
  };

  const handleCustomTag = e => {
    if (e.key === "Enter") {
      setFormData({ ...formData, tag: customTag });
      setShowTagDropdown(false);
    }
  };

  const handleSubmit = async () => {
    try {
      await writeAsync({
        args: [address, BigInt(formData.score), formData.tag, formData.comment],
      });
      console.log("Transaction initiated.");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleScoreClick = (e, score) => {
    e.preventDefault();
    setFormData({ ...formData, score });
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMouseDown = e => {
    e.preventDefault();
    const timer = setInterval(() => {
      setProgress(prevProgress => Math.min(prevProgress + 10, 100));
    }, 100);
    setSubmitTimer(timer);
  };

  const handleMouseUp = e => {
    e.preventDefault();
    if (submitTimer) {
      clearInterval(submitTimer);
    }
    setSubmitTimer(null);
    setProgress(0);
  };

  const handleMouseLeave = () => {
    if (submitTimer) {
      clearInterval(submitTimer);
    }
    setSubmitTimer(null);
    setProgress(0);
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <div className="title-div">
        <h3 className="text-xl font-semibold mb-1 text-center">Set Reputation Options</h3>
        <div className="mt-1 flex gap-2 items-start text-center justify-center">
          <div className="badge badge-warning text-xs font-normal" style={{ fontSize: "0.6rem" }}>
            Cost: 0.01 ETH + Gas
          </div>
        </div>
        <hr className="my-2" />
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex justify-center">
          {ratings.map((rating, index) => (
            <div
              key={index}
              className={`relative flex flex-col items-center justify-center px-2 mx-1 hover:shadow-lg hover:rounded ${
                formData.score === rating.value ? "shadow-lg rounded" : ""
              }`}
              style={{
                minHeight: "9rem",
                minWidth: "9rem",
                backgroundColor:
                  formData.score === rating.value
                    ? rating.color
                    : rating.value === "0" && formData.score === ""
                    ? "#DDDDDD"
                    : "transparent",
              }}
              onClick={e => handleScoreClick(e, rating.value)}
            >
              <div
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  fontSize: "6.25rem",
                  opacity: 0.2,
                  zIndex: 1,
                  pointerEvents: "none",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {rating.emoji}
              </div>
              <div className="relative z-10 flex flex-col items-center justify-end h-full font-mono mt-24">
                <span className="block text-center text-sm font-extrabold opacity-90">
                  {`${rating.label}(${rating.value > 0 ? "+" : ""}${rating.value})`}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center border rounded-sm">
          <div className="relative flex flex-col items-center justify-center w-3/12 p-4">
            <button
              type="button"
              onClick={() => setShowTagDropdown(!showTagDropdown)}
              className="text-2xl font-bold opacity-80 flex items-center justify-center"
            >
              {formData.tag || "Select Tag"} <span className="ml-2">▼</span>
            </button>
            {showTagDropdown && (
              <div
                ref={tagDropdownRef}
                className="absolute z-10 mt-2 w-1/2 bg-white border rounded"
                onBlur={() => setShowTagDropdown(false)}
              >
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowTagDropdown(false)}
                    className="text-red-600 font-bold p-2 border rounded-full"
                  >
                    X
                  </button>
                </div>
                {tagOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleTagClick(option.label)}
                    className="cursor-pointer hover:bg-gray-200 p-2"
                  >
                    {option.label}
                  </div>
                ))}

                <div className="p-2">
                  <input
                    type="text"
                    placeholder="➕ Other"
                    className="w-full bg-white"
                    onChange={e => setCustomTag(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === "Enter") {
                        handleCustomTag(e);
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col w-9/12 p-4">
            <textarea
              name="comment"
              placeholder="Commentary"
              className="textarea textarea-bordered w-full h-32"
              style={{
                resize: "none",
                overflowY: "auto",
                borderRadius: "0.125rem",
                fontSize: "1.2rem",
                fontWeight: "bold",
                color: "#333",
              }}
              onChange={handleChange}
              value={formData.comment}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="btn flex items-center bg-white border border-gray-600 px-8 py-2 relative"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
          >
            <span className="mr-2">🕒</span> Cool Submit
            <div
              className="absolute left-0 bottom-0 bg-gray-600"
              style={{ width: `${progress}%`, height: "4px" }}
            ></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractWrite;
