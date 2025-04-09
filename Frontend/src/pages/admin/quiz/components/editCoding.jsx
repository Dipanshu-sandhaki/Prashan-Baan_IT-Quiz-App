import React, { useEffect, useState } from "react";
import { updateCodingProblem } from "../../../../apiCalls/adminApiManager";
import showAlert from "../../../../components/alertMessage/Alert";

function CodingQuestionForm({ isOpen, onClose, problem, onSuccess }) {
    const [formData, setFormData] = useState({
        question: "",
        description: "",
        marks: "",
        negative_marks: "",
        testCases: [{ input: "", expected: "" }],
    });

    // Prefill formData when editing
    useEffect(() => {
        if (problem) {
            setFormData({
                question: problem.title || "",
                description: problem.description || "",
                marks: problem.marks || "",
                negative_marks: problem.negative_marks || "",
                testCases: problem.testCases || [{ input: "", expected: "" }],
            });
        }
    }, [problem]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTestCaseChange = (index, field, value) => {
        const updated = [...formData.testCases];
        updated[index][field] = value;
        setFormData((prev) => ({ ...prev, testCases: updated }));
    };

    const addTestCase = () => {
        setFormData((prev) => ({
            ...prev,
            testCases: [...prev.testCases, { input: "", expected: "" }],
        }));
    };

    const handleFormSubmit = async(e) => {
        e.preventDefault();

        const dataToSubmit = {
            title: formData.question,
            description: formData.description,
            marks: Number(formData.marks),
            negative_marks: Number(formData.negative_marks),
            testCases: formData.testCases,
        };

        // Optional: include `_id` if editing
        if (problem?._id) dataToSubmit._id = problem._id;

        try {
            const response = await updateCodingProblem(problem._id, dataToSubmit);
            if(response.status === 200) {
                onClose();
                onSuccess();
                showAlert({title: "Success", message: "Coding question updated successfully", icon: "success"});
            }
        } catch (error) {
            console.error("Error while submitting form:", error);
            
        }

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="p-8 backdrop-blur-md bg-gray-900/60 border border-white/20 rounded-lg w-[500px]">
                <h2 className="text-lg text-white font-semibold mb-4">
                    {problem ? "Edit Coding Question" : "Add Coding Question"}
                </h2>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CodingQuestionForm;
