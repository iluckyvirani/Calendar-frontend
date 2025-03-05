import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css";

const CalendarSidebar = ({ date, onDateChange }) => {
    return (
        <div className="w-full md:w-1/4 p-4 md:p-2 bg-white shadow-lg rounded-xl">
            <h2 className="text-lg md:text-xl font-semibold mb-4 text-gray-700 text-center md:text-left">
                Select Date
            </h2>
            <Calendar
                onChange={onDateChange}
                value={date}
                className="custom-calendar w-full"
            />
        </div>
    );
};

export default CalendarSidebar;
