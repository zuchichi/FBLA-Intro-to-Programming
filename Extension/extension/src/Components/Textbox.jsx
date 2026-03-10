import React, { useState } from 'react';

const Textbox = ({ label, value, onChange, placeholder, type = "text" }) => {
  const [focused, setFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: '10px',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '4px',
    paddingLeft: '2px',
    fontFamily: "'Segoe UI', sans-serif",
  };

  const inputStyle = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: '8px',
    border: focused ? '2px solid rgba(255,255,255,0.9)' : '2px solid rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    fontSize: '13px',
    fontFamily: "'Segoe UI', sans-serif",
    outline: 'none',
    backdropFilter: 'blur(4px)',
    boxSizing: 'border-box',
    transition: 'border 0.2s ease, background-color 0.2s ease',
    boxShadow: focused ? '0 0 0 3px rgba(255,255,255,0.1)' : 'none',
  };

  const placeholderHack = `
    .redpie-input::placeholder {
      color: rgba(255, 255, 255, 0.6);
    }
  `;

  return (
    <div style={containerStyle}>
      <style>{placeholderHack}</style>
      {label && <label style={labelStyle}>{label}</label>}
      <input
        className="redpie-input"
        type={type}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        style={inputStyle}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
};

export default Textbox;