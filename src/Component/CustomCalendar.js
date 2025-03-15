import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const CustomCalendar = ({ events, onSelectSlot, selectedDate, view }) => {
    const [currentDate, setCurrentDate] = useState(selectedDate);
    const [dragStart, setDragStart] = useState(null);
    const [dragEnd, setDragEnd] = useState(null);

    useEffect(() => {
        setCurrentDate(selectedDate);
    }, [selectedDate]);

    const renderHeader = () => (
        <div className="flex justify-between items-center mb-6">
            <button className="text-gray-600 hover:text-gray-800" onClick={() => setCurrentDate(moment(currentDate).subtract(1, view).toDate())}>
                <FaArrowLeft size={20} />
            </button>
            <h2 className="text-2xl font-semibold">
                {view === "day"
                    ? moment(currentDate).format("MMMM D, YYYY")
                    : view === "week"
                        ? `Week of ${moment(currentDate).startOf("week").format("MMMM D")}`
                        : moment(currentDate).format("MMMM YYYY")}
            </h2>
            <button className="text-gray-600 hover:text-gray-800" onClick={() => setCurrentDate(moment(currentDate).add(1, view).toDate())}>
                <FaArrowRight size={20} />
            </button>
        </div>
    );

    const handleMouseDown = (hour) => {
        const startTime = moment(currentDate).hour(hour).minute(0).toDate();
        setDragStart(startTime);
        setDragEnd(startTime);
    };

    const handleMouseMove = (hour) => {
        if (dragStart) {
            const endTime = moment(currentDate).hour(hour).minute(0).toDate();
            setDragEnd(endTime);
        }
    };

    const handleMouseUp = () => {
        if (dragStart && dragEnd) {
            onSelectSlot({ start: dragStart, end: dragEnd });
        }
        setDragStart(null);
        setDragEnd(null);
    };

    const isSlotSelected = (hour) => {
        if (!dragStart || !dragEnd) return false;

        const slotTime = moment(currentDate).hour(hour).minute(0).toDate();
        return slotTime >= dragStart && slotTime <= dragEnd;
    };

    const renderDayView = () => (
        <div className="h-screen overflow-y-auto" onMouseUp={handleMouseUp}>
            {Array.from({ length: 24 }, (_, i) => (
                <div
                    key={i}
                    className={`border-b p-4 cursor-pointer hover:bg-blue-100 ${isSlotSelected(i) ? "bg-blue-200" : ""
                        }`}
                    onMouseDown={() => handleMouseDown(i)}
                    onMouseMove={() => handleMouseMove(i)}
                >
                    <span className="font-semibold">{i}:00</span>
                    <div className="mt-2">
                        {events.filter(
                            (event) =>
                                moment(event.start).isSame(currentDate, "day") &&
                                moment(event.start).hour() === i
                        ).map((event) => (
                            <div
                                key={event.id}
                                className={`p-2 rounded mb-1 text-white ${event?.color ? `bg-${event.color}-500` : 'bg-gray-500'}`}
                            >
                                {event.title}({event.category})
                                <div className="text-sm text-white">
                                    {moment(event.start).format("h:mm A")} - {moment(event.end).format("h:mm A")}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderWeekView = () => {
        const startOfWeek = moment(currentDate).startOf("week");
        const days = Array.from({ length: 7 }, (_, i) => moment(startOfWeek).add(i, "days"));

        return (
            <div className="flex flex-col h-screen overflow-x-auto">
                <div className="flex">
                    <div className="w-16"></div>
                    {days.map((day, i) => {
                        const isToday = moment().isSame(day, 'day'); 
                        return (
                            <div
                                key={i}
                                className={`flex-1 text-center font-semibold border-b p-2 ${isToday ? "bg-blue-500 text-white" : "" 
                                    }`}
                            >
                                {day.format("ddd D")}
                            </div>
                        );
                    })}
                </div>

                <div className="flex">
                    <div className="w-16">
                        {Array.from({ length: 24 }, (_, hour) => (
                            <div key={hour} className="h-12 text-right pr-2 border-b">
                                {moment().hour(hour).format("h A")}
                            </div>
                        ))}
                    </div>

                    {days.map((day, i) => (
                        <div key={i} className="flex-1 border">
                            {Array.from({ length: 24 }, (_, hour) => (
                                <div
                                    key={hour}
                                    className={`h-12 p-2 border-b cursor-pointer overflow-auto`}
                                    onClick={() => {
                                        const startTime = moment(day).hour(hour).minute(0).toDate();
                                        const endTime = moment(day).hour(hour).minute(59).toDate();
                                        onSelectSlot({ start: startTime, end: endTime });
                                    }}
                                >
                                    {events.filter(
                                        (event) =>
                                            moment(event.start).isSame(day, "day") &&
                                            moment(event.start).hour() === hour
                                    ).map((event) => (
                                        <div
                                            key={event.id}
                                            className={`p-1 rounded mb-1 text-white ${event?.color ? `bg-${event.color}-500` : 'bg-gray-500'}`}
                                        >
                                            {event.title}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        const startOfMonth = moment(currentDate).startOf("month").startOf("week");
        const endOfMonth = moment(currentDate).endOf("month").endOf("week");
        const days = [];
        let day = startOfMonth.clone(); 

        while (day <= endOfMonth) {
            const dayDate = day.toDate(); 
            const isCurrentMonth = moment(day).isSame(currentDate, "month"); 
            const isToday = moment().isSame(day, 'day'); 

            days.push(
                <div
                    key={day.format('YYYY-MM-DD')} 
                    className={`h-24 overflow-auto border p-2 border-grey-300 cursor-pointer hover:bg-gray-400 hover:text-black ${!isCurrentMonth ? "bg-gray-200" : "" 
                        } ${isToday ? "bg-blue-500 text-white" : "" 
                        }`}
                    onClick={() => {
                        const startTime = moment(dayDate).startOf("day").toDate();
                        const endTime = moment(dayDate).endOf("day").toDate();
                        onSelectSlot({ start: startTime, end: endTime });
                    }}
                >
                    <span className="font-semibold">{day.format("D")}</span>
                    <div className="mt-2">
                        {events.filter((event) => moment(event.start).isSame(day, "day")).map((event) => (
                            <div
                                key={event.id}
                                className={`w-auto p-1 rounded mb-1 text-white ${event?.color ? `bg-${event.color}-500` : 'bg-red-500'}`}
                            >
                                {event.title}
                            </div>
                        ))}
                    </div>
                </div>
            );
            day = day.clone().add(1, "day"); 
        }
        
        return <div className="grid grid-cols-7 gap-1 h-screen overflow-y-auto">{days}</div>;
    };

    return (
        <div className="p-6 bg-white rounded-md shadow-md">
            {renderHeader()}
            {view === "day" && renderDayView()}
            {view === "week" && renderWeekView()}
            {view === "month" && renderMonthView()}
        </div>
    );
};

export default CustomCalendar;