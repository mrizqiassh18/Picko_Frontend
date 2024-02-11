// LoginForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://picko-backend.vercel.app/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );

      const { userId, token, role, name, status } = response.data;
      setLoading(false);
      // Dispatch aksi LOGIN untuk menyimpan informasi pengguna ke dalam konteks
      dispatch({
        type: "LOGIN",
        payload: { userId, token, role, name, status },
      });

      // Simpan token di localStorage
      localStorage.setItem("token", token);

      // Redirect ke halaman yang sesuai dengan peran (role)
      if (role === "admin") {
        navigate("/admin/account-control");
      } else {
        // Redirect ke halaman influencer atau lainnya
        navigate(`/influencer/edit-data/${userId}`);
      }
    } catch (error) {
      // Handle error
      console.error("Login error:", error);
      setLoading(false);

      if (error.response && error.response.status === 401) {
        setErrorMessage("Email atau password salah. Coba lagi.");
      }

      if (error.response && error.response.status === 403) {
        // Influencer masih menunggu persetujuan admin
        setErrorMessage(
          "Akun Anda belum disetujui atau dinonaktifkan oleh admin. Harap hubungi admin di mrizqiassh18@gmail.com"
        );
        return;
      }
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="logo flex justify-center mb-16">
        <img src="/logo/logo.png" alt="logo" />
      </div>

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
        <div className="flex gap-3">
          <div className="mb-4">
            <button
              type="submit"
              className="bg-yellow hover:bg-dark-yellow text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <ColorRing
                  visible={true}
                  height="25"
                  width="20"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["#ffffff"]}
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
          <div className="backto-landingpage hover:bg-dark-yellow hover:text-grey bg-yellow w-52 h-10 rounded flex justify-center items-center">
            <p className="text-white font-medium">
              <Link to="/">Back to Influencers List</Link>
            </p>
          </div>
        </div>
        <div className="register-button hover:underline hover:text-grey">
          <p>
            <Link to="/register">Don't have account? Register</Link>
          </p>
        </div>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default LoginForm;
