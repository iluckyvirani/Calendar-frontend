import React, { useState } from "react";
import CustomCalendar from "./CustomCalendar.js";
import EventModal from "./EventModal.js";

const CalendarView = ({ events, onSave, onDelete, selectedDate, onTodayClick }) => {
    const [view, setView] = useState("day");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const handleSelectSlot = (slotInfo) => {
        setSelectedEvent(null);
        setSelectedSlot(slotInfo);
        setModalOpen(true);
    };


    const handleSaveEvent = (event) => {
        if (selectedEvent) {
            onSave({ ...event, id: selectedEvent.id });
        } else {
            onSave(event);
        }
        setModalOpen(false);
    };

    const handleDeleteEvent = () => {
        if (selectedEvent) {
            onDelete(selectedEvent.id);
            setModalOpen(false);
        }
    };

    return (
        <div className="h-screen w-full p-6 bg-gray-100">
            <div className="flex justify-between gap-1 items-center mb-6">
                <button
                    className="px-6 py-2 rounded-lg bg-[#2558d3] text-white hover:bg-blue-600 transition-all duration-300"
                    onClick={onTodayClick} 
                >
                    Today
                </button>

                <div className="flex gap-2">
                    {["day", "week", "month"].map((type) => (
                        <button
                            key={type}
                            className={`px-6 py-2 rounded-lg transition-all duration-300 ${view === type
                                ? "bg-gradient-to-r from-[#2558d3] to-indigo-500 text-white shadow-md"
                                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-200"
                                }`}
                            onClick={() => setView(type)}
                        >
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <CustomCalendar
                events={events}
                onSelectSlot={handleSelectSlot}
                selectedDate={selectedDate} 
                view={view}
            />

            {modalOpen && (
                <EventModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleSaveEvent}
                    onDelete={handleDeleteEvent}
                    selectedSlot={selectedSlot}
                    event={selectedEvent}
                    isEditing={!!selectedEvent}
                />
            )}
        </div>
    );
};

export default CalendarView;