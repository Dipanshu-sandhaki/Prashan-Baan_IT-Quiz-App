import React, { useState } from "react";
import { addNewStudent } from "../../apiCalls/adminApiManager";
import showAlert from "../alertMessage/Alert";
import LoadingMenu from "../loader";

const AddNewStudent = ({ setStudents, setShowAddPopup,onClose }) => {
  const [form, setForm] = useState({
      name: "",
      username: "",
      number: "",
      password: "",
    });
     
    const[loading,setLoading] = useState(false);
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      const response= await addNewStudent(form.username,form.name,form.number,form.password);
      setLoading(true);
      if (response.status === 201) {
        setLoading(false);
        showAlert({
          title: "Success",
          text: response.data.message,
          icon: "success",
        });
        setForm({ name: "", username: "", number: "", password: "" });
        onClose();
      } else {
        setLoading(false);
        showAlert({
          title: "Error",
          text: response.data.message,
          icon: "error",
        });
      }
    };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4 text-center">Add New User</h2>
        {loading && <LoadingMenu />}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="username"
          placeholder="Email"
          value={form.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          name="number"
          placeholder="Phone Number"
          value={form.number}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
          >
            Add Student
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default AddNewStudent;
