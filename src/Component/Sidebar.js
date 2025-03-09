import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import img from '../assests/plus.svg';
import { MdDelete } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const localizer = momentLocalizer(moment);

const Sidebar = ({ onAddEvent, events, selectedDate, onDateChange, onDeleteEvent }) => {
    const [smallCalendarDate, setSmallCalendarDate] = useState(selectedDate);

    const handleDateSelect = (date) => {
        setSmallCalendarDate(date);
        onDateChange(date);
    };

    const dayPropGetter = (date) => {
        if (moment(date).isSame(smallCalendarDate, "day")) {
            return { className: "rbc-selected-date" };
        }
        return {};
    };

    const handleNavigate = (action) => {
        let newDate = new Date(smallCalendarDate);
        if (action === "prev") newDate.setMonth(newDate.getMonth() - 1);
        if (action === "next") newDate.setMonth(newDate.getMonth() + 1);

        setSmallCalendarDate(newDate);
        onDateChange(newDate);
    };

    const filteredEvents = events.filter(event =>
        moment(event.start).isSame(selectedDate, "day") ||
        moment(event.end).isSame(selectedDate, "day")
    );

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            onDeleteEvent(id);
        }
    };

    return (
        <div className="w-full md:w-[35%] bg-grey-100 p-4 border-r h-full">
            <button onClick={onAddEvent} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl mb-4">
                <img src={img} alt="create_event" className="w-7 h-7" />
                <span className="pl-3 pr-7"> Create</span>
            </button>

            <div className="mb-6 bg-white rounded-lg shadow-sm p-3">
                <div className="flex justify-between items-center mb-2">
                    <button onClick={() => handleNavigate("prev")} className="text-gray-600 hover:text-gray-800">
                        <FaArrowLeft size={18} />
                    </button>
                    <span className="font-semibold text-lg">{moment(smallCalendarDate).format("MMMM YYYY")}</span>
                    <button onClick={() => handleNavigate("next")} className="text-gray-600 hover:text-gray-800">
                        <FaArrowRight size={18} />
                    </button>
                </div>
                <Calendar
                    localizer={localizer}
                    defaultView="month"
                    views={["month"]}
                    date={smallCalendarDate}
                    selectable
                    onSelectSlot={(slotInfo) => handleDateSelect(slotInfo.start)}
                    onSelectEvent={(event) => handleDateSelect(event.start)}
                    events={[]}
                    toolbar={false}
                    style={{ height: 300 }}
                    dayPropGetter={dayPropGetter}
                />
            </div>

            <h2 className="text-xl font-bold mb-2 pb-3">Events</h2>
            <div>
                <ul>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <li key={event.id}
                                className="mb-2 p-2 w-[80%] rounded-lg shadow-sm flex justify-between items-center"
                                style={{ backgroundColor: `${event.color}` }}>
                                <div>
                                    <div className="font-[400] text-white">{event.title} ({event.category})</div>
                                    <div className="text-sm text-white">
                                        {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
                                    </div>
                                </div>
                                <button onClick={() => handleDelete(event.id)} className="text-white hover:text-red-700">
                                    <MdDelete className="w-5 h-5" />
                                </button>
                            </li>
                        ))
                    ) : (
                        <li className="text-gray-500">No events for this day.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
