import React, { useState } from "react";
import "../styles/CustomSelect.css";

const CustomSelect = ({ selectedDuration, setSelectedDuration }) => {
  const options = [
    { value: "60", label: "60 min" },
    { value: "30", label: "30 min" },
  ];

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDuration(selectedValue);
  };

  return (
    <div className="custom-select-container">
      <select
        className="custom-select"
        value={selectedDuration}
        onChange={handleSelectChange}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
