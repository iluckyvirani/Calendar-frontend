import React, { useState } from "react";
import moment from "moment";
import { LuCheck } from "react-icons/lu";

const labelsClasses = [
    // "indigo",
    "gray",
    // "green",
    "blue",
    "red",
    "purple",
];


const EventModal = ({ isOpen, onClose, onSave, selectedSlot, event, isEditing }) => {
    const [selectedLabel, setSelectedLabel] = useState(labelsClasses[0]);

    const [formData, setFormData] = useState({
        title: event?.title || "",
        startTime: selectedSlot?.start || new Date(), 
        endTime: selectedSlot?.end || new Date(),
        description: event?.description || "",
        category: event?.category || "Others",
        color: event?.color || labelsClasses[0],
        recurrence: event?.recurrence || { frequency: null, interval: 1, daysOfWeek: [], endDate: null },
        notifications: event?.notifications || { emailReminder: false, webReminder: false, reminderMinutesBefore: 30 },
    });

    const handleSave = () => {
        if (!formData.title) {
            alert("Please fill in the event title.");
            return;
        }

        const payload = {
            ...formData,
            startTime: new Date(formData.startTime).toISOString(),
            endTime: new Date(formData.endTime).toISOString(),
        };

        onSave(payload); 
        onClose();
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">{isEditing ? "Edit Event" : "Add Event"}</h2>

                <div className="mb-4">
                    <p className="text-gray-700">
                        <span className="font-semibold">Start:</span>{" "}
                        {moment(formData.startTime).format("MMMM Do YYYY, h:mm a")}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-semibold">End:</span>{" "}
                        {moment(formData.endTime).format("MMMM Do YYYY, h:mm a")}
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Event Title"
                    className="border p-2 w-full rounded-lg mb-3"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <textarea
                    placeholder="Event Description"
                    className="border p-2 w-full rounded-lg mb-3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />

                <select
                    className="border p-2 w-full rounded-lg mb-3"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Meetings">Meetings</option>
                    <option value="Others">Others</option>
                </select>

                <div className="flex gap-x-2 mb-3">
                    {labelsClasses.map((lblClass, i) => (
                        <span
                            key={i}
                            onClick={() => {
                                setSelectedLabel(lblClass);
                                setFormData({ ...formData, color: lblClass });
                            }}
                            className={`bg-${lblClass}-500 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer`}
                        >
                            {selectedLabel === lblClass && (
                                <span className="text-white text-sm">
                                <LuCheck />
                                </span>
                            )}
                        </span>
                    ))}
                </div>

                <div className="flex justify-between mt-6">
                    <div className="flex gap-3">
                        <button
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                        >
                            {isEditing ? "Update" : "Save"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventModal;