import React, { useState, useEffect } from "react";
import axios from "axios";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Component/Sidebar.js";
import CalendarView from "./Component/CalendarView.js";
import EventModal from "./Component/EventModal.js";

const App = () => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());

    const baseurl = process.env.REACT_APP_BASE_URL;

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/events`);
            const formattedEvents = response.data.map((event) => ({
                id: event._id,
                title: event.title,
                description: event.description,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                category: event.category,
                color: event.color,
            }));
            setEvents(formattedEvents);
        } catch (error) {
            toast.error("Failed to fetch events");
        }
    };

    const handleSaveEvent = async (event) => {
        try {
            if (event.id) {
                // Update existing event
                await axios.put(`http://localhost:5000/api/event/${event.id}`, event);
                toast.success("Event updated successfully");
            } else {
                // Add new event
                await axios.post(`http://localhost:5000/api/add`, event);
                toast.success("Event added successfully");
            }
            fetchEvents();
        } catch (error) {
            toast.error("Failed to save event");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await axios.delete(`${baseurl}api/event/${eventId}`);
            toast.success("Event deleted successfully");
            fetchEvents();
        } catch (error) {
            toast.error("Failed to delete event");
        }
    };



    return (
        <>
            <div className="flex flex-col md:flex-row h-screen">
                <Sidebar
                    onAddEvent={() => setModalOpen(true)}
                    events={events}
                    selectedDate={selectedDate}
                    onDateChange={(newDate) => setSelectedDate(newDate)}
                    onDeleteEvent={handleDeleteEvent}
                />
                <CalendarView
                    events={events}
                    selectedDate={selectedDate}
                    onSelectEvent={(event) => {
                    }}
                    onSave={handleSaveEvent}
                    onDelete={handleDeleteEvent}
                />
                {modalOpen && (
                    <EventModal
                        isOpen={modalOpen}
                        onClose={() => setModalOpen(false)}
                        onSave={handleSaveEvent}
                    />
                )}
            </div>
        </>
    );
};

export default App;