// LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {

    e.preventDefault();
    
    try {
      // Lakukan permintaan login ke backend
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        password: formData.password,
      });

      // Dapatkan token dari respons
      const token = response.data.token;

      // Simpan token di localStorage
      localStorage.setItem("token", token);

      const influencerId = response.data.userId;

      // Setelah berhasil login, mungkin Anda ingin melakukan navigasi atau tindakan lainnya
      // ...
      navigate(`/influencer/edit-data/${influencerId}`);
    } catch (error) {
      // Handle error
      console.error("Login error:", error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form className="max-w-lg mx-auto" onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Email"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Password"
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        {/* Submit Button */}
        <div className="mb-4">
          <button
            type="submit"
            className="bg-yellow hover:bg-dark-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        </div>
        <div className="register-button hover:underline hover:text-grey">
          <p>
            <Link to="/register">Don't have account? Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
