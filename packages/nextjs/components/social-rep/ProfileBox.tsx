import React, { useState } from "react";
import ContractWrite from "./ContractWrite";
import "daisyui/dist/full.css";

const ProfileBox = ({ address }: { address: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const containerStyle = {
    height: showDropdown ? "auto" : "100px", // Replace 100px with the height you want when the form is closed
  };

  return (
    <div style={containerStyle} className="p-[5%] w-full mx-auto relative">
      <div className="bg-white p-4 bg-opacity-850 rounded-lg shadow-lg z-10 relative">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://via.placeholder.com/50" alt="Profile" className="rounded-md" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">ENS Username</h2>
              <p className="text-sm text-gray-500">@farcaster</p>
            </div>
          </div>
          <button
            onClick={toggleDropdown}
            className="flex items-center bg-gray-100 text-gray-700 font-bold border border-gray-600 px-4 py-2 gradient-button"
            style={{ borderRadius: "0" }}
          >
            Mint New Rep
            <div className="border-l-2 border-gray-600 h-4 mx-2"></div>
            <span>{showDropdown ? "▼" : "◄"}</span>
          </button>
        </div>
        {showDropdown && <ContractWrite address={address} />}
      </div>
    </div>
  );
};

export default ProfileBox;
