import React, { useState } from "react";

const EditStudent = ({ student, setStudents, setEditingStudent }) => {
  const [newName, setNewName] = useState(student.name);

  const handleSave = () => {
    setStudents((prev) =>
      prev.map((s) => (s.id === student.id ? { ...s, name: newName } : s))
    );
    setEditingStudent(null);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Student</h2>
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
          Save
        </button>
        <button onClick={() => setEditingStudent(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditStudent;
