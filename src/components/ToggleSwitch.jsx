// ToggleSwitch.jsx
import React from 'react';
import '../layouts/ToggleSwitch.css';

const ToggleSwitch = ({ isOn, onToggle }) => {
  return (
    <div className="toggle-switch" onClick={onToggle}>
      {isOn ? 
      (<svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="24" rx="12" fill="#A729F5"/>
      <circle cx="12" cy="12" r="10" fill="white" stroke="#D1D5DB" stroke-width="2"/>
    </svg>) :
      (<svg width="44" height="24" viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="44" height="24" rx="12" fill="#A729F5"/>
      <circle cx="32" cy="12" r="10" fill="white" stroke="white" stroke-width="2"/>
    </svg>)
      }
    </div>
  );
};

export default ToggleSwitch;