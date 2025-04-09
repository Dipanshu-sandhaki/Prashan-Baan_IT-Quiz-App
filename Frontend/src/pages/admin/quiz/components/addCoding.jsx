import React, { useState } from "react";
import { addNewCodingProblem } from "../../../../apiCalls/adminApiManager";
import showAlert from "../../../../components/alertMessage/Alert";

const AddCoding = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    question: "",
    description: "",
    testCases: [{ input: "", expected: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTestCaseChange = (index, field, value) => {
    const updatedTestCases = formData.testCases.map((tc, i) =>
      i === index ? { ...tc, [field]: value } : tc
    );
    setFormData({ ...formData, testCases: updatedTestCases });
  };

  const addTestCase = () => {
    setFormData({
      ...formData,
      testCases: [...formData.testCases, { input: "", expected: "" }],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const data = {
      title: formData.question,
      description: formData.description,
      marks: formData.marks,
      negative_marks: formData.negative_marks,
      testCases: formData.testCases,
    };


    const response = await addNewCodingProblem(data);


    if (response.status === 201) {
      showAlert({ title: "success", message: "Question added successfully!", icon: "success" });
      onClose();
      if (onSuccess) onSuccess();
    } else {
      showAlert({ title: "error", message: "Failed to add question", icon: "error" });
    }

    setFormData({
      question: "",
      description: "",
      testCases: [{ input: "", expected: "" }],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="p-8 backdrop-blur-md bg-gray-900/60 border border-white/20 rounded-lg w-[500px]">
        <h2 className="text-lg text-white font-semibold mb-4">Add Coding Question</h2>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter Question"
            value={formData.question}
            onChange={handleChange}
            className="w-full text-white p-2 border rounded mb-2 bg-transparent placeholder-gray-500 focus:outline-none"
            required
          />
          <textarea
            name="description"
            placeholder="Enter Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 text-white border rounded mb-2 bg-transparent placeholder-gray-500 focus:outline-none"
            required
          ></textarea>



          <input
            type="number"
            name="marks"
            placeholder="Enter Marks"
            value={formData.marks}
            onChange={handleChange}
            className="w-full text-white p-2 border rounded mb-2 bg-transparent placeholder-gray-500 focus:outline-none"
            required
          />

          <input
            type="number"
            name="negative_marks"
            placeholder="Enter Negative Marks"
            value={formData.negative_marks}
            onChange={handleChange}
            className="w-full text-white p-2 border rounded mb-2 bg-transparent placeholder-gray-500 focus:outline-none"
            required
          />

          <h3 className="text-sm font-semibold text-white">Test Cases:</h3>
          {formData.testCases.map((testCase, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Input"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, "input", e.target.value)
                }
                className="w-full p-2 border text-white rounded mb-1 bg-transparent placeholder-gray-500 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Output"
                value={testCase.expected}
                onChange={(e) =>
                  handleTestCaseChange(index, "expected", e.target.value)
                }
                className="w-full p-2 border text-white rounded bg-transparent placeholder-gray-500 focus:outline-none"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addTestCase}
            className="px-4 py-1 bg-blue-400 text-white rounded-lg hover:bg-blue-500 mb-2"
          >
            + Add Test Case
          </button>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoding;
