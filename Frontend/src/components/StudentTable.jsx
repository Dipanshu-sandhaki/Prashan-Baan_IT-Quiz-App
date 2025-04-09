import React from "react";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-secondary">
          <th className="border p-2 text-white">ERP ID</th>
          <th className="border p-2 text-white">Student Name</th>
          <th className="border p-2 text-white">Student DOB</th>
          <th className="border p-2 text-white">Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id} className="text-center border">
            <td className="border text-white p-2">{student.username}</td>
            <td className="border text-white p-2">{student.name}</td>
            <td className="border text-white p-2">
              {new Date(student.dob).toLocaleDateString("en-GB")}
            </td>
            <td className="border p-2">
              <button
                onClick={() => onEdit(student)}
                className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(student.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;
