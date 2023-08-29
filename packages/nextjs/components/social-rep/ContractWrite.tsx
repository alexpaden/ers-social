import React, { useEffect, useRef, useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const ContractWrite = ({ address }: { address: string }) => {
  const [customTag, setCustomTag] = useState("");
  const [formData, setFormData] = useState({
    score: "1",
    tag: "🔵 Default",
    comment: "Thanks for always being there for me, and the small loan😉",
  });
  const [submitTimer, setSubmitTimer] = useState<NodeJS.Timeout | null>(null);
  const [progress, setProgress] = useState(0);
  const tagDropdownRef = useRef<HTMLDivElement | null>(null);
  const [showTagDropdown, setShowTagDropdown] = useState(false);

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

  const { writeAsync } = useScaffoldContractWrite({
    contractName: "ReputationServiceMachine",
    functionName: "setReputation",
    args: [address, BigInt(formData.score), formData.tag, formData.comment],
    value: "0.01",
    onBlockConfirmation: (txnReceipt: { blockHash: any }) => {
      console.log("📦 Transaction blockHash", txnReceipt.blockHash);
      window.location.reload();
    },
  });

  useEffect(() => {
    function handleClickOutside(event: Event) {
      const target = event.target as Node;
      if (tagDropdownRef.current) {
        if (!tagDropdownRef.current.contains(target)) {
          setShowTagDropdown(false);
        }
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
      handleSubmit();
      setProgress(0);
      if (submitTimer) {
        clearInterval(submitTimer);
      }
      setSubmitTimer(null);
    }
  }, [progress]);

  const handleTagClick = (tag: string) => {
    setFormData({ ...formData, tag });
    setShowTagDropdown(false);
  };

  const handleCustomTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
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

  const handleScoreClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, score: string) => {
    e.preventDefault();
    setFormData({ ...formData, score });
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const timer = setInterval(() => {
      setProgress(prevProgress => Math.min(prevProgress + 10, 100));
    }, 100);
    setSubmitTimer(timer);
  };

  const handleMouseUp = (e: { preventDefault: () => void }) => {
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

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleMouseDown(e as any);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleMouseUp(e as any);
  };

  const handleTouchCancel = () => {
    handleMouseLeave();
  };

  return (
    <div className="mt-4 p-4 border rounded-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col sm:flex-row justify-center overflow-x-auto">
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
                className="absolute sm:text-6xl text-3xl"
                style={{
                  top: "50%",
                  left: "50%",
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
                  {`${rating.label}(${parseInt(rating.value, 10) > 0 ? "+" : ""}${rating.value})`}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center border rounded-sm">
          <div className="relative flex flex-col items-center justify-center w-full sm:w-3/12 p-4">
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
          <div className="flex flex-col w-full sm:w-9/12 p-4">
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
                backgroundColor: "#f2f2f2",
              }}
              onChange={handleChange}
              value={formData.comment}
            ></textarea>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="button"
            className="btn flex items-center relative"
            style={{
              background: "linear-gradient(to right, red, orange)",
              border: "none",
              boxShadow: "none",
              color: "black",
            }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            <span className="mr-2" style={{ color: "black" }}>
              🕒
            </span>{" "}
            {/* Font color set to black */}
            Mint (press and hold)
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
