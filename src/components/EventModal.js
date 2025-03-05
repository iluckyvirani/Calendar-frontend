import { IoClose, IoCheckmarkCircle, IoTrash } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export const EventModal = ({ 
    isOpen, onClose, onSave, onDelete, event, setEvent, selectedTime, isEditing 
}) => {

    if (!isOpen) return null;

    const handleSave = () => {
        if (!event.title.trim()) {
            toast.error("⚠️ Event title cannot be empty!", { autoClose: 2000 });
            return;
        }
        onSave();
        toast.success(isEditing ? "✅ Event updated successfully!" : "✅ Event added successfully!", { autoClose: 2000 });
        onClose(); 
    };

    const handleDelete = () => {
        onDelete();
        toast.success("🗑️ Event deleted successfully!", { autoClose: 2000 });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm transition-all duration-300">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md transform scale-100 transition-all duration-300">
                
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-700">
                        {isEditing ? "Edit Event" : "Add Event"}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
                        <IoClose />
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Event Title"
                    className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-blue-400"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                />
                <textarea
                    placeholder="Event Description"
                    className="border p-2 w-full rounded-lg mt-3 focus:ring-2 focus:ring-blue-400"
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
                <p className="mt-2 text-gray-500 text-sm">⏰ Time: {selectedTime}</p>

                <div className="flex justify-between mt-6 items-center">
                    {isEditing && (
                        <button
                            className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                            onClick={handleDelete}
                        >
                            <IoTrash /> Delete
                        </button>
                    )}
                    <div className="flex gap-3">
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                            onClick={handleSave}
                        >
                            <IoCheckmarkCircle /> {isEditing ? "Update" : "Save"}
                        </button>
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
