import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Footer from "../../../utils/Footer";
import Card from "../../../components/AddQuiz/Card";
import CardContent from "../../../components/AddQuiz/CardContent";
import showAlert from "../../../components/alertMessage/Alert";
import { allCodingQuestions, deleteCodingProblem, deleteTestCase } from "../../../apiCalls/adminApiManager";
import LoadingMenu from "../../../components/loader";
import { Link, useParams } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../../../components/modal";
import ProblemViewModal from "./components/viewCodingProblems";
import AddCoding from "./components/addCoding";
import Swal from "sweetalert2";
import EditCoding from "./components/editCoding";
import EditCodingProblem from "./components/editCoding";

const ViewAllCodingQuestions = () => {
    const [loading, setLoading] = useState(true);

    const [questions, setQuestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const limit = 10;

    const id = useParams();

    const allQuestion = async () => {
        try {
            setLoading(true);
            const data = await allCodingQuestions(page);
            setTotalPages(data.length);
            setQuestions(data.problem);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };


    useEffect(() => {
        allQuestion();
    }, [id.id, page, refresh]);

    const handleLogout = () => {
        window.location.href = "/login";
    };

    const openModal = () => {
        setIsOpen(true);
    }
    const handleDeleteTestCase = async (problemId, testCasesId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to delete this test case?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            if (!result.isConfirmed) return;

            const response = await deleteTestCase(problemId, testCasesId);
            if (response.success) {
                showAlert({ title: "success", message: "Test case deleted successfully.", icon: "success" });
                setQuestions((prev) => prev.filter((problem) => problem._id !== problemId));

                allQuestion();

                setSelectedProblem((prev) => ({
                    ...prev,
                    testCases: prev.testCases.filter(tc => tc._id !== testCasesId)
                }));
            }
        } catch (error) {
            console.error("Error deleting test case:", error);
            showAlert({ title: "error", message: "Error deleting test case. Something went wrong.", icon: "error" });
        }
    }

    const deleteProblem = async (problemId) => {
        try {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you really want to delete this test case?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Yes, delete it!",
            });

            const response = await deleteCodingProblem(problemId);

            if (response.success) {
                showAlert({ title: "success", message: "Question deleted successfully.", icon: "success" });
                setQuestions((prev) => prev.filter((q) => q._id !== problemId));
                setRefresh(prev => !prev);

            }
        } catch (error) {
            console.error("Error deleting problem:", error);
            showAlert({ title: "error", message: "Error deleting problem. Something went wrong.", icon: "error" });
        }
    }

    return (
        <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">
            {loading && <LoadingMenu />}

            <AddCoding isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setRefresh(prev => !prev); }}
                onSuccess={() => {
                    setIsModalOpen(false);
                    allQuestion();
                    setIsModalOpen(false);
                }} />

            <EditCodingProblem
                isOpen={isEditModalOpen}
                onClose={() => {setIsEditModalOpen(false);setRefresh(prev => !prev);}}
                problem={selectedProblem}
                onSuccess={() => {
                    setRefresh(prev => !prev); // triggers refresh of list
                }}
            />

            <ProblemViewModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                problem={selectedProblem}
                onDeleteTestCase={handleDeleteTestCase}
            />

            {/* Header */}
            <Header handleLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar (Fixed height, doesn't shrink) */}
                <Sidebar
                    // setActiveMenu={setActiveMenu}
                    className="h-full flex-shrink-0"
                />

                {/* Page Content (Expands properly) */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="container mx-auto p-4">
                        <div className="flex justify-between text-center mb-5">
                            <h2 className="text-2xl font-bold mb-4 text-center text-white">
                                Coding Questions
                            </h2>
                            <button className="flex justify-center items-center text-white bg-blue-500 rounded px-2 gap-3"
                                onClick={() => setIsModalOpen(true)}>
                                <IoIosAddCircleOutline size={20} />
                                <span>Add Question</span>
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-700 bg-gray-800 text-white rounded-lg">
                                <thead>
                                    <tr className="bg-gray-900 text-gray-200">
                                        <th className="p-3 border border-gray-700">ID</th>
                                        <th className="p-3 border border-gray-700">Question</th>
                                        <th className="p-3 border border-gray-700">Test Case</th>
                                        <th className="p-3 border border-gray-700">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {questions.map((question, index) => (
                                        <tr key={question._id} className="hover:bg-gray-700">
                                            <td className="p-3 border border-gray-700 text-center">
                                                {(page - 1) * limit + index + 1}
                                            </td>

                                            <td className="p-3 border border-gray-700 text-center">
                                                {question.title}
                                            </td>

                                            <td className="p-3 border border-gray-700 text-center">
                                                {question.testCases[0]?.input}
                                            </td>

                                            <td className="p-3 border border-gray-700">
                                                <div className="flex justify-center items-center gap-3">
                                                    <Link className="text-green-500"
                                                        onClick={() => {
                                                            setSelectedProblem(question);
                                                            setIsViewModalOpen(true);
                                                        }}>
                                                        <FaRegEye size={20} />
                                                    </Link>

                                                    <Link className="text-blue-500" onClick={() => {
                                                        setSelectedProblem(question);
                                                        setIsEditModalOpen(true);
                                                    }}>
                                                        <FaRegEdit size={20} />
                                                    </Link>
                                                    <Link className="text-red-500" onClick={() => deleteProblem(question._id)}>
                                                        <MdDeleteForever size={20} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {totalPages > 1 && (
                                <div className="flex justify-center mt-4 gap-2">
                                    <button
                                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={page === 1}
                                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <span className="text-white px-2">
                                        Page {page} of {totalPages}
                                    </span>
                                    <button
                                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>

            {/* Footer (Always at bottom) */}
            <Footer className="mt-auto" />
        </div>
    );
};

export default ViewAllCodingQuestions;
