import React, { useState } from "react";
import moment from "moment";
import img from '../assests/plus.svg';
import { MdDelete, MdEdit } from "react-icons/md";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sidebar = ({ onAddEvent, events, selectedDate, onDateChange, onDeleteEvent, onEditEvent }) => {
    const [smallCalendarDate, setSmallCalendarDate] = useState(selectedDate);

    const handleDateSelect = (date) => {
        const newDate = moment(date).toDate();
        setSmallCalendarDate(newDate); 
        onDateChange(newDate); 
    };

    const handleNavigate = (action) => {
        let newDate = moment(smallCalendarDate);
        if (action === "prev") newDate.subtract(1, "month");
        if (action === "next") newDate.add(1, "month");

        setSmallCalendarDate(newDate.toDate()); 
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

    const renderCustomCalendar = () => {
        const startOfMonth = moment(smallCalendarDate).startOf("month").startOf("week");
        const endOfMonth = moment(smallCalendarDate).endOf("month").endOf("week");
        const days = [];
        let day = startOfMonth.clone(); 
    
        while (day <= endOfMonth) {
            const dayDate = day.toDate(); 
            const isCurrentMonth = moment(day).isSame(smallCalendarDate, "month");
            const isSelectedDate = moment(day).isSame(selectedDate, "day");
            const isToday = moment(day).isSame(moment(), "day");
    
            days.push(
                <div
                    key={day.format('YYYY-MM-DD')} 
                    className={`text-center pt-[2px] font-semibold cursor-pointer  w-[30px] h-[30px] rounded-full
                        ${!isCurrentMonth ? "text-gray-400" : ""} 
                        ${isSelectedDate ? "bg-[#aed6f1] text-black" : ""}
                        ${isToday ? "bg-[#2558d3] text-white" : ""}
                        hover:bg-gray-300`}
                    onClick={() => handleDateSelect(dayDate)} 
                >
                    {day.format("D")}
                </div>
            );
            day = day.clone().add(1, "day"); 
        }
    
        return (
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
                <div className="grid grid-cols-7 gap-1">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                        <div key={day} className="text-center font-semibold text-sm text-gray-600">
                            {day}
                        </div>
                    ))}
                    {days}
                </div>
            </div>
        );
    };
    

    return (
        <div className="w-full md:w-[35%] bg-grey-100 p-4 border-r h-full">
            <button onClick={onAddEvent} className="border p-2 rounded-full flex items-center shadow-md hover:shadow-2xl mb-4 bg-white">
                <img src={img} alt="create_event" className="w-7 h-7" />
                <span className="pl-3 pr-7"> Create</span>
            </button>

            {renderCustomCalendar()}

            <h2 className="text-xl font-bold mb-2 pb-3">Events</h2>
            <div>
                <ul>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map((event) => (
                            <li key={event.id}
                                className={`mb-2 p-2 w-[80%] rounded-lg shadow-sm flex justify-between items-center ${event?.color ? `bg-${event.color}-500` : 'bg-red-500'}`}>
                                <div>
                                    <div className="font-[400] text-white">{event.title} ({event.category})</div>
                                    <div className="text-sm text-white">
                                        {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => onEditEvent(event)} className="text-white hover:text-blue-700">
                                        <MdEdit className="w-5 h-5" />
                                    </button>
                                    <button onClick={() => handleDelete(event.id)} className="text-white hover:text-red-700">
                                        <MdDelete className="w-5 h-5" />
                                    </button>
                                </div>
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