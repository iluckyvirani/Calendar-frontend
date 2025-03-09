import React from "react";

const EventList = ({ events }) => {
    return (
        <div className="w-1/4 bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Events</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id} className="mb-2">
                        {event.title} - {event.start.toLocaleTimeString()}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventList;