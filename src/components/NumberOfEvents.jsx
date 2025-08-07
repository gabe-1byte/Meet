import React, { useState } from 'react';

const NumberOfEvents = () => {
    const [value, setValue] = useState(32);
    return (
        <div id="number-of-events">
            <input className="number-of-events-input" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
};

export default NumberOfEvents;