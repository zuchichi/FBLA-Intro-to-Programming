import React from 'react';

const TextBox = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="input-group">
      {label && <label>{label}</label>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="custom-input"
      />
    </div>
  );
};

export default TextBox;