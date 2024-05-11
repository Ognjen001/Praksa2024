import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import ProfileInfo from "../../components/Cards/ProfileInfo";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearchNote, handleClearSearch }) => {
  const isToken = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [userData, setUserData] = useState(null);

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
    setSearchQuery("");
  };

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        const { title, fullName } = response.data.user;

        setUserData({ fullName: `${title} ${fullName}` });
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  // Prikazuje SearchBar samo na ruti /notes
  const showSearchBar = location.pathname === "/notes";

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-black py-2">ASSZS-Uzice</h2>

      {isToken && showSearchBar && (
        <SearchBar
          value={searchQuery}
          onChange={({ target }) => {
            setSearchQuery(target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={onClearSearch}
        />
      )}
      {isToken && (
        <ProfileInfo userInfo={userData} />
      )}
    </div>
  );
};

export default Navbar;
