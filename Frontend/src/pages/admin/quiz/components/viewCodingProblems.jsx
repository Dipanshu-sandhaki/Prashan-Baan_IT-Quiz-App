import React from "react";
import { MdDeleteForever } from "react-icons/md";

export default function ProblemViewModal({ isOpen, onClose, problem, onDeleteTestCase }) {
    if (!isOpen || !problem) return null;

    const handleModalClick = (e) => e.stopPropagation();

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
            <div
                onClick={handleModalClick}
                className="bg-white rounded-2xl p-6 w-full max-w-3xl mx-4 shadow-2xl max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{problem.title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-900 text-lg"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-3 text-gray-700">
                    <p>
                        <strong className="text-gray-900">Description:</strong> {problem.description}
                    </p>
                    <p>
                        <strong className="text-gray-900">Marks:</strong> {problem.marks}
                    </p>
                    <p>
                        <strong className="text-gray-900">Negative Marks:</strong> {problem.negative_marks}
                    </p>
                </div>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-800">Test Cases</h3>
                    <ul className="space-y-4 max-h-60 overflow-y-auto pr-2">
                        {problem.testCases.map((tc, index) => (
                            <li
                                key={tc._id}
                                className="border rounded-lg p-4 flex justify-between items-start bg-gray-50"
                            >
                                <div className="text-sm">
                                    <p>
                                        <span className="font-semibold">Input:</span> {tc.input}
                                    </p>
                                    <p>
                                        <span className="font-semibold">Expected:</span> {tc.expected}
                                    </p>
                                </div>
                                <button
                                    onClick={() => onDeleteTestCase(problem._id, tc._id)}
                                    className="text-red-500 hover:text-red-700"
                                    title="Delete test case"
                                >
                                    <MdDeleteForever size={20} />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6 text-right">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
