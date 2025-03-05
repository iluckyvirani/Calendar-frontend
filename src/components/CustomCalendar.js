import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CalendarSidebar from "./CalendarSidebar.js";
import { EventList } from "./EventList.js";
import { EventModal } from "./EventModal.js";

const CustomCalendar = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    // const [newEvent, setNewEvent] = useState({ title: "", description: "" });
    const [selectedTime, setSelectedTime] = useState("");
    const [currentEvent, setCurrentEvent] = useState({ title: "", description: "" });
    const [isEditing, setIsEditing] = useState(false);
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1);


   ;

    const fetchEvents =  useCallback( async () => {
        try {
            const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
            const formattedDate = localDate.toISOString().split("T")[0]; 

            const response = await axios.get(`http://localhost:5000/api/events?date=${formattedDate}`);
            setEvents(response.data);
        } catch (error) {
            console.log("Error fetching events:", error);
        }
    },[date])


    useEffect(() => {
        fetchEvents(); 
    }, [fetchEvents])

    const handleEventClick = (event) => {
        setCurrentEvent(event);
        setSelectedTime(event.time);
        setIsEditing(true);
        setModalOpen(true);
    };

    const handleAddEvent = async () => {
        if (!currentEvent.title || !selectedTime) {
            alert("Please enter a title and select a time.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/add", {
                title: currentEvent.title,
                description: currentEvent.description || "No description",
                date: adjustedDate.toISOString().split("T")[0], 
                time: selectedTime,
            });

            fetchEvents(); 

            setModalOpen(false);
            setCurrentEvent({ title: "", description: "" });
            setSelectedTime("");
        } catch (error) {
            console.log("Error adding event:", error);
        }
    };

    const handleUpdateEvent = async () => {
        if (!currentEvent._id) return;
        try {
            await axios.put(`http://localhost:5000/api/event/${currentEvent._id}`, currentEvent);
            fetchEvents();
            closeModal();
        } catch (error) {
            console.log("Error updating event:", error);
        }
    };

    const handleDeleteEvent = async () => {
        if (!currentEvent._id) return;
        try {
            await axios.delete(`http://localhost:5000/api/event/${currentEvent._id}`);
            fetchEvents();
            closeModal();
        } catch (error) {
            console.log("Error deleting event:", error);
        }
    };
    const closeModal = () => {
        setModalOpen(false);
        setIsEditing(false);
        setCurrentEvent({ title: "", description: "" });
        setSelectedTime("");
    };
    return (
        <div className="flex h-screen">
            <CalendarSidebar date={date} onDateChange={setDate} />
            <EventList 
                date={date} 
                events={events} 
                onSelectTime={(time) => {
                    setSelectedTime(time);
                    setIsEditing(false);
                    setModalOpen(true);
                }} 
                onEventClick={handleEventClick}
            />
            <EventModal 
                isOpen={modalOpen} 
                onClose={closeModal} 
                onSave={isEditing ? handleUpdateEvent : handleAddEvent} 
                onDelete={isEditing ? handleDeleteEvent : null} 
                event={currentEvent} 
                setEvent={setCurrentEvent} 
                selectedTime={selectedTime} 
                isEditing={isEditing} 
            />
        </div>
    );
};

export default CustomCalendar;
