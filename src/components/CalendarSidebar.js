import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css";

const CalendarSidebar = ({ date, onDateChange }) => {
    return (
        <div className="w-1/4 p-2 bg-white shadow-lg rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Select Date</h2>
            <Calendar 
                onChange={onDateChange} 
                value={date} 
                className="custom-calendar"
            />
        </div>
    );
};

export default CalendarSidebar;
