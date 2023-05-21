import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './style.css';

function RangeBar(props) {
  const { min, max, values, onChange } = props;

  const handleChange = (newValues) => {
    if (onChange) {
      onChange(newValues);
    }
  };

  return (
    <div className="slider-container">
      <InputRange
        minValue={min}
        maxValue={max}
        value={values}
        onChange={handleChange}
        formatLabel={(value) => `${value}`}
      />
    </div>
  );
}

export default RangeBar;