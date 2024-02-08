import React, { useEffect, useState } from "react";
import axios from "axios";
import InfluencerCard from "../../components/InfluencerCard";
import { useNavigate } from "react-router-dom";
import cityList from "../../data/cityList.js";
import categoryList from "../../data/categoryList.js";

const InfluencerList = () => {
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  // Daftar gambar background
  const backgroundImages = ["bg-1.jpg", "bg-2.jpg", "bg-3.jpg", "bg-4.jpg"];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Ganti gambar background setiap beberapa detik (misalnya, setiap 5 detik)
      setBackgroundIndex(
        (prevIndex) => (prevIndex + 1) % backgroundImages.length
      );
    }, 5000);

    // Membersihkan interval setelah komponen dilepas (unmounted)
    return () => clearInterval(intervalId);
  }, []);

  const [influencers, setInfluencers] = useState([]);
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    city: "",
    category: "",
    minFollowers: "",
  });
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filterParams = { ...filter, searchTerm };

        // Hapus properti dengan nilai falsy (undefined, null, atau "")
        Object.keys(filterParams).forEach((key) => {
          if (!filterParams[key]) {
            delete filterParams[key];
          }
        });

        const response = await axios.get("http://localhost:5000/home", {
          params: filterParams,
        });
        setInfluencers(response.data.influencers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Panggil fungsi fetchData saat komponen Home dipasang dan setiap kali filter berubah
    fetchData();
  }, [filter, searchTerm]);

  const filteredInfluencers = influencers.filter((influencer) => {
    const matchCity = influencer.address
      .toLowerCase()
      .includes(filter.city.toLowerCase());
    const matchCategory = influencer.category
      .toLowerCase()
      .includes(filter.category.toLowerCase());
    const matchFollowers = influencer.followers >= filter.minFollowers;
    const matchName = influencer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return matchCity && matchCategory && matchFollowers && matchName;
  });

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector("nav");
      const jumbotron = document.querySelector(".jumbotron");

      if (navbar && jumbotron) {
        const jumbotronBottom = jumbotron.getBoundingClientRect().bottom;

        if (jumbotronBottom <= 0) {
          navbar.classList.add("bg-white", "shadow-md");
        } else {
          navbar.classList.remove("bg-white", "shadow-md");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className="bg-yellow p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-50 p-4 transition-all">
        <div className="container mx-auto">
          {/* Tambahkan logo di sini */}
          <span className="logo text-white font-bold text-lg text-4xl">
            Pick'O
          </span>
        </div>
        <div>
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-dark-grey py-2 px-4 rounded focus:outline-none focus:shadow-outline font-medium"
          >
            Back to Landing Page
          </button>
        </div>
      </nav>

      <div
        className="jumbotron h-96 flex items-center justify-center bg-cover bg-center transition-background-opacity duration-1000 mt-16"
        style={{
          backgroundImage: `url(/images/${backgroundImages[backgroundIndex]})`,
        }}
      >
        <div className="overlay bg-black bg-opacity-50 w-full h-96 flex items-center justify-center py-10">
          <div className="content text-white text-center">
            <div className="title text-6xl mb-4">Mudahnya Promosi</div>
            <div className="motto text-lg mb-8">
              Dengan Pick'O mencari influencer untuk promosi menjadi mudah
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-10 bg-white p-4">
        <div className="flex items-center space-x-4 mb-4 mt-2 ml-2">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by name"
            className="border p-2 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* City Dropdown */}
          <select
            className="border p-2 rounded"
            value={filter.city}
            onChange={(e) => setFilter({ ...filter, city: e.target.value })}
          >
            <option value="">All Cities</option>
            {cityList.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {/* Category Dropdown */}
          <select
            className="border p-2 rounded"
            value={filter.category}
            onChange={(e) => setFilter({ ...filter, category: e.target.value })}
          >
            <option value="">All Categories</option>
            {categoryList.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Min Followers Input */}
          <input
            type="number"
            placeholder="Min Followers"
            className="border p-2 rounded"
            value={filter.minFollowers}
            onChange={(e) =>
              setFilter({ ...filter, minFollowers: e.target.value })
            }
          />
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8">
        {filteredInfluencers.map((influencer) => (
          <InfluencerCard key={influencer._id} influencer={influencer} />
        ))}
      </div>
    </>
  );
};

export default InfluencerList;
