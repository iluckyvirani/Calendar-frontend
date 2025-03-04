import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "tailwindcss/tailwind.css";
const CalendarSidebar = ({ date, onDateChange }) => {
    return (
        <div className="w-1/4">
            <h2 className="text-lg font-semibold mb-4">Select Date</h2>
            <Calendar onChange={onDateChange} value={date}
                className="custom-calendar"
            />
        </div>
    );
};


export default CalendarSidebar