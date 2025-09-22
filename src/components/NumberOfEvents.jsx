import React, { useState } from 'react';

const NumberOfEvents = ({ onNumberChanged, setErrorAlert }) => {
    const [value, setValue] = useState(32);

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onNumberChanged?.(newValue);

        if (newValue <= 0 || isNaN(Number(newValue))) {
            setErrorAlert("Please enter a valid number");
        } else {
            setErrorAlert("");
        }
    };

    return (
        <div id="number-of-events">
            <input type="text" className="number-of-events-input" value={value} onChange={handleChange} />
        </div>
    );
};

export default NumberOfEvents;