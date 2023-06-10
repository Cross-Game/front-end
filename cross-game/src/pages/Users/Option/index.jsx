import React, { useState } from 'react';
import "../Option/style.css"

const Option = ({ backgroundColor: color }) => {
  const [hovered, setHovered] = useState(false);
  const [selected, setSelected] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const bgColor = selected
    ? lightenDarkenColor(color, 15)
    : hovered
    ? lightenDarkenColor(color, 15)
    : color;

  return (
    <div
      className={`option ${selected ? 'selected' : ''}`}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setSelected(!selected)}
    />
  );
};

function lightenDarkenColor(color, amount) {
  var usePound = false;
  if (color[0] == '#') {
    color = color.slice(1);
    usePound = true;
  }

  var num = parseInt(color, 16);

  var r = (num >> 16) + amount;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  var b = ((num >> 8) & 0x00ff) + amount;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  var g = (num & 0x0000ff) + amount;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export default Option;