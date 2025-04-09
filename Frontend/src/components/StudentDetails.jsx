import React, { useState, useEffect, useMemo } from "react";
import StudentTable from "./StudentTable";
import AddStudent from "./Button/AddStudents";
import EditStudent from "./Button/EditStudent";
import { getAllStudent } from "../apiCalls/adminApiManager";
import { deleteStudent } from "../utils/api"; // Import API functions
import showAlert from "./alertMessage/Alert";
import LoadingMenu from "./loader";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import AddNewStudent from "./Button/AddStudents";

const StudentDetails = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [rowsLimit] = useState(10);
  const [rowsToShow, setRowsToShow] = useState([]);
  const [customPagination, setCustomPagination] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10;

  const [total, setTotal] = useState(0);
  const totalPages = Math.ceil(total / limit);


  const loadStudents = async (currentPage) => {
    try {
      setLoading(true);
      const res = await getAllStudent(currentPage, limit); // updated API call
      setStudents(res.data || []);
      setTotal(res.total || 0);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      setLoading(false);
      showAlert({
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        icon: "error",
      });
    }
  };
  useEffect(() => {
    loadStudents(page);
  }, [page,showAddPopup]);

  useEffect(() => {
    setRowsToShow(students.slice(0, rowsLimit));
    setCustomPagination(
      Array(Math.ceil(students.length / rowsLimit)).fill(null)
    );
  }, [students, rowsLimit]); // ✅ Ensures rowsToShow updates when students change

  const totalPage = Math.ceil(students.length / rowsLimit);

  const changePage = (value) => {
    const startIndex = value * rowsLimit;
    const endIndex = startIndex + rowsLimit;
    setRowsToShow(students.slice(startIndex, endIndex));
    setCurrentPage(value);
  };

  const nextPage = () => {
    if (currentPage < totalPage - 1) {
      changePage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      changePage(currentPage - 1);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    const isDeleted = await deleteStudent(id);
    if (isDeleted) {
      setStudents(students.filter((student) => student.id !== id));
    }
  };

  const handleAddStudent = () => {
    setShowAddPopup(true);
  };

  return (
    <div className="flex items-start justify-center pt-10 pb-14 bg-gray-900 min-h-screen">
      <div className="w-full max-w-6xl px-4">

        {showAddPopup ?<AddNewStudent setShowAddPopup={setShowAddPopup} loadStudents={loadStudents} onClose={()=>setShowAddPopup(false)}/> : null} 
        
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 mb-6">
          <h1 className="text-white text-xl font-bold">Students List</h1>
          <div className="text-end"> <button onClick={handleAddStudent} className="btn bg-blue-500 text-white w-fit px-2 py-2 rounded">Add Student</button></div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <table className="min-w-full text-sm text-left text-gray-700 font-inter">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-4 px-6 text-center font-semibold">ID</th>
                <th className="py-4 px-6 text-center font-semibold">Name</th>
                <th className="py-4 px-6 text-center font-semibold">Email</th>
                <th className="py-4 px-6 text-center font-semibold">DOB</th>
                <th className="py-4 px-6 text-center font-semibold">Action</th>
              </tr>
            </thead>
            {loading ? <LoadingMenu /> : (
              <tbody>
                {students?.map((data, index) => (
                  <tr
                    key={data._id}
                    className={`hover:bg-gray-100 transition-all ${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                  >
                    <td className="py-3 px-6 text-center border-t">{data._id}</td>
                    <td className="py-3 px-6 text-center border-t">{data.name}</td>
                    <td className="py-3 px-6 text-center border-t">{data.email}</td>
                    <td className="py-3 px-6 text-center border-t">
                      {new Date(data.dob).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="py-3 px-6 text-center border-t space-x-2">
                      <button
                        onClick={() => handleEdit(data)}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1.5 px-4 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(data._id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm py-1.5 px-4 rounded-md transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>)}
          </table>
        </div>

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
  );

};

export default StudentDetails;
