import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/Sidebar";
import Header from "../../../components/Header";
import Footer from "../../../utils/Footer";
import Card from "../../../components/AddQuiz/Card";
import CardContent from "../../../components/AddQuiz/CardContent";
import showAlert from "../../../components/alertMessage/Alert";
import { quizAllQuestions } from "../../../apiCalls/adminApiManager";
import LoadingMenu from "../../../components/loader";
import { Link, useParams } from "react-router";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../../../components/modal";

const ViewAllQuestions = () => {
  const [loading, setLoading] = useState(true);

  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const id = useParams();

  useEffect(() => {
    const allQuestion = async () => {
      try {
        setLoading(true);
        const data = await quizAllQuestions(id.id, page);
        setTotalPages(data.data["data"].totalPages);
        setQuestions(data.data["data"].data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    };

    allQuestion();
  }, [id.id, page]);

  const handleLogout = () => {
    window.location.href = "/login";
  };

  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-start via-middle to-end">
      {loading && <LoadingMenu />}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

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
                Questions
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
                    <th className="p-3 border border-gray-700">
                      Question Category
                    </th>
                    <th className="p-3 border border-gray-700">Question</th>
                    <th className="p-3 border border-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question, index) => (
                    <tr key={question._id} className="hover:bg-gray-700">
                      <td className="p-3 border border-gray-700 text-center">
                        {(page - 1) * limit + index + 1}
                      </td>

                      <td className="p-3 border border-gray-700">
                        {question.category}
                      </td>

                      <td className="p-3 border border-gray-700">
                        {question.question}
                      </td>

                      <td className="p-3 border border-gray-700">
                        <div className="flex justify-center items-center gap-3">
                          <Link className="text-green-500">
                            <FaRegEye size={20} />
                          </Link>

                          <Link className="text-blue-500">
                            <FaRegEdit size={20} />
                          </Link>
                          <Link className="text-red-500">
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

export default ViewAllQuestions;
