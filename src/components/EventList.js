export const EventList = ({ date, events, onSelectTime, onEventClick, }) => {
    return (
        <div className="w-full md:w-3/4 md:pl-6 pl-0 pt-4 md:pt-0">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">{date.toDateString()}</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 8;
                    const period = hour < 12 ? "AM" : "PM";
                    const formattedHour = hour > 12 ? hour - 12 : hour;
                    const timeSlot = `${formattedHour}:00 ${period}`;

                    const slotEvents = events.filter(event => event.time === timeSlot);

                    return (
                        <div
                            key={i}
                            className="relative border-b p-3 rounded-lg cursor-pointer transition-all duration-200 ease-in-out group hover:bg-blue-100"
                            onClick={(e) => {
                                if (!e.target.closest('.event-box')) {
                                    onSelectTime(timeSlot);
                                }
                            }}
                        >
                            <div className="flex justify-between items-center">
                                <span className="font-semibold text-gray-700">{timeSlot}</span>
                                <span className="text-gray-500 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity">
                                    Click to add event
                                </span>
                            </div>

                            {/* Events List (Clickable for Editing) */}
                            <div className="mt-2 flex flex-wrap gap-2">
                                {slotEvents.length > 0 && (
                                    slotEvents.map((event) => (
                                        <div
                                            key={event._id}
                                            className="event-box bg-blue-500 text-white px-3 py-2 rounded shadow-md cursor-pointer hover:bg-blue-600 transition"
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent parent div from opening add modal
                                                onEventClick(event);
                                            }}
                                        >
                                            {event.title}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
