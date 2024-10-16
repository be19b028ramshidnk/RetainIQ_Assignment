import { FaPlus } from "react-icons/fa";


export const AddButton = ({ onClick }) => {
    return (
        <button onClick={onClick} className="flex m-4 p-2 bg-white rounded-lg shadow-md items-center">
        <FaPlus className="inline" />
        </button>
    );
};

