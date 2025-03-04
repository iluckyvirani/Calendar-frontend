export const EventList = ({ date, events, onSelectTime }) => {
    return (
        <div className="w-3/4 p-6">
            <h2 className="text-2xl font-bold mb-4">{date.toDateString()}</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 8;
                    const period = hour < 12 ? "AM" : "PM";
                    const formattedHour = hour > 12 ? hour - 12 : hour;
                    const timeSlot = `${formattedHour}:00 ${period}`;

                    return (
                        <div
                            key={i}
                            className="border-b p-3 cursor-pointer hover:bg-blue-100 rounded-lg"
                            onClick={() => onSelectTime(timeSlot)}
                        >
                            <span className="font-semibold text-gray-700">{timeSlot}</span>
                            {events.filter(event =>
                                new Date(event.date).toDateString() === date.toDateString() &&
                                event.time === `${formattedHour}:00`
                            ).map((event, idx) => (
                                <div key={idx} className="bg-blue-500 text-white p-2 rounded mt-2">
                                    {event.title}
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

