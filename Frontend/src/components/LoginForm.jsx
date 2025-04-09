import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PasswordInput from "./PasswordInput";
import { loginUser  } from "../utils/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser (username, password);

      const { role, token } = data["data"];

      localStorage.setItem("token", token);
      localStorage.setItem("name", data["data"].name);
      localStorage.setItem("username", data["data"].username);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", data["data"].id);

      const isExist= localStorage.getItem('isExamSubmitted');

      if(!isExist){
        localStorage.setItem('isExamSubmitted', "No");
      }
      
      

      navigate(role === "admin" ? "/dashboard" : "/studentDashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div>
        <input
          className="form-control rounded bg-transparent border-b-2 border-gray-300 mb-4 w-full p-2 text-gray-300 placeholder:text-gray-300 focus:outline-none focus:border-blue-500"
          placeholder="User Id"
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <PasswordInput password={password} setPassword={setPassword} />

      <button
        type="submit"
        disabled={loading}
        className="w-full p-2 rounded text-white mt-8 bg-gradient-to-r from-start to-middle hover:from-middle hover:to-start"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;