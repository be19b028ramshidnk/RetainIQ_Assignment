import { useState } from "react";
import { MdCancel } from "react-icons/md";

export default function TagModal({
    tagsData,       
    setShowModal,
    onSelectTags
}) {
    const [selectedTags, setSelectedTags] = useState([]);

    // Function to handle tag selection
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            // If tag is already selected, remove it
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else if (selectedTags.length < 3) { // Limit selection to a maximum of 3 tags
            // Otherwise, add the tag
            setSelectedTags([...selectedTags, tag]);
        }
    };

    // Function to handle saving selected tags
    const handleSave = () => {
        onSelectTags(selectedTags); // Pass selected tags back
        setShowModal(false); // Close modal after saving
    };

    return (
        <div className="flex justify-center items-center fixed top-0 left-0 h-screen w-full bg-black bg-opacity-70 p-4 z-30">
            <div className="w-2/3 md:w-2/5 max-w-lg bg-white shadow rounded relative">
                <button
                    className="absolute right-4 top-4 cursor-pointer"
                    onClick={() => setShowModal(false)}
                >
                    <MdCancel />
                </button>
                <div className="p-4 border-b border-gray-200">Select Most Appropreate Tags </div>
                
                <div className="p-4 grid grid-cols-2 gap-3">
                    {tagsData && tagsData.length > 0 ? (
                        tagsData.map((tag, index) => (
                            <div
                                key={index}
                                className={`cursor-pointer p-2 border border-gray-300 rounded text-center ${selectedTags.includes(tag) ? 'bg-blue-500 text-white' : ''}`}
                                onClick={() => handleTagClick(tag)}
                            >
                                {tag}
                            </div>
                        ))
                    ) : (
                        <p>No tags available</p>  
                    )}
                </div>
                <div className="p-4">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                        onClick={handleSave}
                    >
                        Add Tags
                    </button>
                </div>
            </div>
        </div>
    );
}
