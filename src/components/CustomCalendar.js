import { useState, useEffect } from "react";
import axios from "axios";
import CalendarSidebar from "./CalendarSidebar.js";
import { EventList } from "./EventList.js";
import { EventModal } from "./EventModal.js";

const CustomCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [newEvent, setNewEvent] = useState({ title: "", description: "" });
    const [selectedTime, setSelectedTime] = useState("");
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);


    useEffect(() => {
        fetchEvents(); // Fetch events when the date changes
    }, [date]);

    const fetchEvents = async () => {
        try {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const formattedDate = localDate.toISOString().split("T")[0]; 

            const response = await axios.get(`http://localhost:5000/api/events?date=${formattedDate}`);
            setEvents(response.data);
        } catch (error) {
            console.log("Error fetching events:", error);
        }
    };


    const addEvent = async () => {
        if (!newEvent.title || !selectedTime) {
            alert("Please enter a title and select a time.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/add", {
                title: newEvent.title,
                description: newEvent.description || "No description",
                date: adjustedDate.toISOString().split("T")[0], 
                time: selectedTime,
            });

            fetchEvents(); // Re-fetch events after adding a new one

            setModalOpen(false);
            setNewEvent({ title: "", description: "" });
            setSelectedTime("");
        } catch (error) {
            console.log("Error adding event:", error);
        }
    };

    return (
        <div className="flex h-screen">
            <CalendarSidebar date={date} onDateChange={setDate} />
            <EventList date={date} events={events} onSelectTime={(time) => { setSelectedTime(time); setModalOpen(true); }} />
            <EventModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSave={addEvent} event={newEvent} setEvent={setNewEvent} selectedTime={selectedTime} />
        </div>
    );
};

export default CustomCalendar;
