import React, { useState } from "react";
import { addNewQuestion } from "../apiCalls/adminApiManager";
import { useParams } from "react-router";
import showAlert from "./alertMessage/Alert";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null; // If modal is closed, return nothing

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    number: "",
  });

  const id= useParams();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

  };

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);
try {

    const response = await addNewQuestion(id.id,formData);
    showAlert({title:"Success",text:"Question added successfully", icon:"success"})
} catch (error) {
    console.error(error);
    showAlert({title:"Error",text:"Something went wrong", icon:"error"})
}
    // onSubmit(formData); 
    onClose(); // Close modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-[50rem] p-6 transform transition-all scale-95">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Add New Question</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-xl"
          >
            &times;
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="py-4 space-y-3">
          {/* Category Dropdown */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="">Select Category</option>
              <option value="C Programming">C Programming</option>
              <option value="DBMS">DBMS</option>
              <option value="Networking">Networking</option>
              <option value="Computer Fundamental">Computer Fundamental</option>
            </select>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-sm font-medium">Question</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Options */}
          <div className="grid grid-cols-2 gap-4">
            {["option1", "option2", "option3", "option4"].map((opt, idx) => (
              <div key={idx}>
                <label className="block text-sm font-medium">
                  Option {idx + 1}
                </label>
                <input
                  type="text"
                  name={opt}
                  value={formData[opt]}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            ))}
          </div>

          {/* Answer Input */}
          <div>
            <label className="block text-sm font-medium">Correct Answer</label>
            <input
              type="text"
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Number Input */}
          <div>
            <label className="block text-sm font-medium">Question Number</label>
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>

          {/* Modal Footer - Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
