import React, { useState } from 'react';
import '../styles/CustomSelect.css'; // Import your custom CSS for styling

const CustomSelect = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const options = [
    { value: '30 min', label: '30 min' },
    { value: '60 min', label: '60 min' },
  ];

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onSelect(selectedValue);
  };

  return (
    <div className="custom-select-container">
      <select
        className="custom-select"
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          Select an option
        </option>
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
