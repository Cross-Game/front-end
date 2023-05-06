import React, { useState } from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import './style.css';

function RangeBar(props) {
  const [values, setValues] = useState({ min: props.min, max: props.max });

  const handleChange = (newValues) => {
    setValues(newValues);
  };

  return (
    <div className="slider-container">
      <InputRange
        minValue={props.min}
        maxValue={props.max}
        value={values}
        onChange={handleChange}
        formatLabel={(value) => `${value}`}
      />
    </div>
  );
}

export default RangeBar;