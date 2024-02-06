// RegisterForm.js
import React from "react";
import axios from "axios";
import cityList from "../data/CityList";
import categoryList from "../data/CategoryList";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    socialMediaLink: "",
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
    category: "",
    email: "",
    password: "",
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_photo: file }));
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
      const response = await axios.post(
        "http://localhost:5000/register",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Registration successful:", response.data);

      setRegistrationStatus("success");

      setTimeout(() => {
        navigate("/"); // Ganti dengan rute halaman landing Anda
      }, 3000);
    } catch (error) {
      console.error("Error registering:", error);

      setRegistrationStatus("error");
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
    <div className="container mx-auto mt-10">
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
            htmlFor="photo"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Attach Photo
          </label>
          <input
            type="file"
            id="profile_photo"
            name="profile_photo"
            accept="image/*"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={handleFileChange}
          />
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

        <div className="mb-4">
          <button
            type="submit"
            className="bg-yellow hover:bg-dark-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
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
