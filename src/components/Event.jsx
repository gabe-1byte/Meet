import React, { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div>
            <h2>{event.summary}</h2>
            <p>Start time: {event.created}</p>
            <p>Location: {event.location}</p>
            <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <p>{event.description}</p>
            )}
        </div>
    );
}

export default Event;