import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberChanged }) => {
    const [value, setValue] = useState(32);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onNumberChanged?.(newValue);
    };

    return (
        <div id="number-of-events">
            <input type="text" className="number-of-events-input" value={value} onChange={handleChange} />
        </div>
    );
};

export default NumberOfEvents;