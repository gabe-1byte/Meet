import React, { useState } from "react";

const Event = ({ event }) => {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="event">
            <h2 className="summary">{event.summary}</h2>
            <p className="start-time">Start time: {event.created}</p>
            <p className="location">Location: {event.location}</p>
            <button className="details-btn" aria-expanded={showDetails} aria-controls={`details-${event.id}`} onClick={() => setShowDetails(!showDetails)}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && (
                <div id={`details-${event.id}`} className="details">
                    <p className="description">{event.description}</p>
                </div>
            )}
        </div>
    );
}

export default Event;