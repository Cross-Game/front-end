import React from 'react';
import "./style.css";

const Button = ({ text, icon }) => {
  return (
    <button className="button">
      <span className="text">{text}</span>
      {icon && <span className="icon">{icon}</span>}
    </button>
  );
};

export default Button;