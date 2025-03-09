import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventModal from "./EventModal.js";

const localizer = momentLocalizer(moment);

const CalendarView = ({ events, onSave, onDelete, selectedDate }) => {
    const [view, setView] = useState("day");
    const [date, setDate] = useState(selectedDate);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    React.useEffect(() => {
        setDate(selectedDate);
    }, [selectedDate]);

    const handleSelectSlot = (slotInfo) => {
        setSelectedEvent(null);
        setSelectedSlot(slotInfo);
        setModalOpen(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setSelectedSlot({ start: event.start, end: event.end });
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
        <div className="h-screen w-full p-5">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                view={view}
                onView={setView}
                date={date}
                onNavigate={(newDate) => setDate(newDate)}
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
                selectable
                style={{ height: "90vh" }}
                eventPropGetter={(event) => ({
                    style: {
                        backgroundColor: event.color,
                    },
                })}
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