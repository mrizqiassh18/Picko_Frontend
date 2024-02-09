// RegisterForm.js
import React from "react";
import axios from "axios";
import cityList from "../data/cityList";
import categoryList from "../data/categoryList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ColorRing } from 'react-loader-spinner'

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    socialMediaLink: "",
    followers: "",
    category: "",
    email: "",
    password: "",
    profile_photo: null,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    address: "",
    phone: "",
    socialMediaLink: "",
    followers: "",
    category: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Memeriksa tipe file
      const fileType = file.type;
      if (!["image/jpeg", "image/jpg", "image/png"].includes(fileType)) {
        alert("Hanya file dengan tipe JPG, JPEG, dan PNG yang diizinkan.");
        return;
      }

      // Memeriksa ukuran file
      const fileSize = file.size / 1024 / 1024; // Ukuran dalam MB
      const maxSize = 1; // Ukuran maksimal dalam MB
      if (fileSize > maxSize) {
        alert(`Ukuran file melebihi batas maksimal ${maxSize} MB.`);
        return;
      }
      setFormData((prevData) => ({ ...prevData, profile_photo: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (hasErrors(errors)) {
      setFormErrors(errors);
      console.log("Form validation failed:", errors);
      return;
    }

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    // Tambahkan log ini
    console.log("Data to be sent:", formData);

    // You need to replace 'URL_REGISTER_ENDPOINT' with your actual backend endpoint
    try {
      setLoading(true);

      const response = await axios.post(
        "https://picko-backend-k2drcy8zj-mrizqiassh18.vercel.app/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);
      setLoading(false);

      setRegistrationStatus("success");

      setTimeout(() => {
        navigate("/"); // Ganti dengan rute halaman landing Anda
      }, 3000);
    } catch (error) {
      console.error("Error registering:", error);
      setLoading(false);

      setRegistrationStatus("error");
      if (error.response && error.response.data) {
        console.log("Server response data:", error.response.data);
      }
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const key in formData) {
      if (!formData[key]) {
        errors[key] = `${
          key.charAt(0).toUpperCase() + key.slice(1)
        } is required`;
      }
    }
    return errors;
  };

  const hasErrors = (errors) => {
    for (const key in errors) {
      if (errors[key]) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="container mx-auto">
      <div className="logo flex justify-center mb-10">
        <img src="/logo/logo.png" alt="logo" />
      </div>

      <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        {formErrors.name && (
          <p className="text-red-500 text-sm">{formErrors.name}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            City
          </label>
          <select
            id="address"
            name="address"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            defaultValue={formData.address}
          >
            <option value="" disabled selected>
              Select City
            </option>
            {cityList.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {formErrors.city && (
          <p className="text-red-500 text-sm">{formErrors.city}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Phone"
            onChange={handleChange}
            value={formData.phone}
          />
          <p className="text-sm text-yellow-500 font-bold mt-1">
            (Pastikan nomor telepon sama seperti di bio social media agar mudah
            dalam pengecekan)
          </p>
        </div>

        {formErrors.phone && (
          <p className="text-red-500 text-sm">{formErrors.phone}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="socialMediaLink"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Social Media Link
          </label>
          <input
            type="text"
            id="socialMediaLink"
            name="socialMediaLink"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Social Media Link"
            onChange={handleChange}
            value={formData.socialMediaLink}
          />
        </div>

        {formErrors.socialMediaLink && (
          <p className="text-red-500 text-sm">{formErrors.socialMediaLink}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="followers"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Followers
          </label>
          <input
            type="number"
            id="followers"
            name="followers"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Number of Followers"
            onChange={handleChange}
            value={formData.followers}
          />
        </div>

        {formErrors.followers && (
          <p className="text-red-500 text-sm">{formErrors.followers}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="photo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Attach Photo
          </label>
          <input
            type="file"
            id="profile_photo"
            name="profile_photo"
            accept=".jpg, .jpeg, .png"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
          <p className="text-sm text-yellow-500 font-bold mt-1">
            (Max size photo : 1MB)
          </p>
        </div>

        {formErrors.profile_photo && (
          <p className="text-red-500 text-sm">{formErrors.profile_photo}</p>
        )}

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleChange}
            defaultValue={formData.category}
          >
            <option value="" disabled selected>
              Select Category
            </option>
            {categoryList.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {formErrors.category && (
          <p className="text-red-500 text-sm">{formErrors.category}</p>
        )}

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

        {formErrors.email && (
          <p className="text-red-500 text-sm">{formErrors.email}</p>
        )}

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

        {formErrors.password && (
          <p className="text-red-500 text-sm">{formErrors.password}</p>
        )}

        {registrationStatus === "success" && (
          <div className="text-green-500">
            Registrasi berhasil. Menunggu persetujuan admin.
          </div>
        )}
        {registrationStatus === "error" && (
          <div className="text-red-500">
            Registrasi gagal. Silakan coba lagi.
          </div>
        )}
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
                colors={['#ffffff']}
                />
              ) : (
                "Register"
              )}
            </button>
          </div>
          <div className="backto-landingpage hover:bg-dark-yellow hover:text-grey bg-yellow w-52 h-10 rounded flex justify-center items-center">
            <p className="text-white font-medium">
              <Link to="/">Back to Landing Page</Link>
            </p>
          </div>
        </div>
        <div className="login-button hover:underline hover:text-grey">
          <p>
            <Link to="/login">Already have an account? Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
