export const EventModal = ({ isOpen, onClose, onSave, event, setEvent, selectedTime }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-semibold mb-4">Add Event</h2>
                <input
                    type="text"
                    placeholder="Event Title"
                    className="border p-2 w-full rounded-lg"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                />
                <textarea
                    placeholder="Event Description"
                    className="border p-2 w-full rounded-lg mt-2"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
                <p className="mt-2 text-gray-600">Time: {selectedTime}</p>
                <div className="flex justify-end mt-4">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onSave}>
                        Save
                    </button>
                    <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
