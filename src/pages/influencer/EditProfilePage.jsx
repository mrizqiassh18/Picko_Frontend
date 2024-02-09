// EditProfileForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import cityList from "../../data/cityList";
import categoryList from "../../data/categoryList";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar";
import { ColorRing } from 'react-loader-spinner'

const EditProfileForm = () => {
  const { id: influencerId } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useAuth();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    socialMediaLink: "",
    followers: "",
    email: "",
    password: "",
    profile_photo: null,
    category: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [lastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/influencers/${influencerId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const influencer = response.data.influencer;

        setFormData({
          name: influencer.name,
          address: influencer.address,
          phone: influencer.phone,
          socialMediaLink: influencer.socialMediaLink,
          followers: influencer.followers,
          email: influencer.email,
          password: "",
          profile_photo: null,
          category: influencer.category,
        });

        setProfilePhoto(influencer.profile_photo);

        const lastUpdateDate = new Date(influencer.updatedAt);
        setLastUpdate(
          `Last Update Profile: ${lastUpdateDate.toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
          })}`
        );
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchData();
  }, [influencerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, profile_photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      setLoading(true);
      await axios.put(
        `http://localhost:5000/api/influencers/update/${influencerId}`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage("Data berhasil diupdate");
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000); // Setelah 3 detik, pesan akan dihapus

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mx-auto mt-28">
        {successMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4">
            {successMessage}
          </div>
        )}
        <div className="flex">
          <div>
            <div className="mb-4">
              {profilePhoto && (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="rounded-full w-60 h-60 mx-auto mb-2 object-cover"
                />
              )}
            </div>
            {lastUpdate && <p className="text-black">{lastUpdate}</p>}
          </div>

          <form className="max-w-lg mx-auto" onSubmit={handleSubmit}>
            {/* Name Input */}
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

            {/* Address Input */}
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
                value={formData.address}
              >
                <option value="" disabled>
                  Select City
                </option>
                {cityList.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone Input */}
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

            {/* Social Media Link Input */}
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

            {/* Attach Photo Input */}
            <div className="mb-4">
              <label
                htmlFor="profile_photo"
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

            {/* Category Input */}
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
                value={formData.category}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {categoryList.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Email Input (readOnly) */}
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
                value={formData.email}
                readOnly
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

            <div className="mb-4">
              <button
                type="submit"
                className="bg-yellow hover:bg-dark-yellow text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                "Update Profile"
              )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
