import { useDisclosure } from "@chakra-ui/hooks";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import CreatePostModal from "../Post/Create/CreatePostModal";
import CreateReelModal from "../Create/CreateReel";

const Navbar = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useSelector((store) => store);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showFeaturesDropdown, setShowFeaturesDropdown] = useState(false);

  const menuItems = [
    { title: "Home" },
    { title: "Features" },
    { title: "Explore" },
    { title: "Notifications" },
    { title: "About Us" },
    
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setShowProfileDropdown(false);
    setShowFeaturesDropdown(false);

    switch (tab) {
      case "Profile":
        navigate(`/${user.reqUser?.username}`);
        break;
      case "Home":
        navigate("/");
        break;
      case "Create Post":
        onOpen();
        break;
      case "About Us":
        navigate("/about");
        break;
      case "Notifications":
        navigate("/notifications");
        break;
      case "Create Story":
        navigate("/create-story");
        break;
      case "Learning Plan":
        navigate("/learning_plan");
        break;
      case "Learning Progress":
        navigate("/learning-progress");
        break;
      
    }

    
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="fixed top-0 left-0 w-full h-16 bg-white dark:bg-gray-900 shadow z-50 flex items-center justify-between px-8 sm:px-10 md:px-16 lg:px-24">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            CV
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 ml-2">
            CodeVera
          </span>
        </div>

        {/* Nav Items */}
        <div className="flex items-center space-x-6">
          {menuItems.map((item) =>
            item.title === "Features" ? (
              <div key={item.title} className="relative">
                <button
                  onClick={() => setShowFeaturesDropdown(!showFeaturesDropdown)}
                  className={`px-3 py-1 rounded-md ${
                    activeTab === item.title
                      ? "text-blue-600 dark:text-purple-400"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                  }`}
                >
                  {item.title}
                </button>
                {showFeaturesDropdown && (
                  <div className="absolute left-0 mt-2 w-52 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-md shadow-lg z-10 p-2">
                    <button
                      onClick={() => handleTabClick("Create Post")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Create Post
                    </button>
                    <button
                      onClick={() => handleTabClick("Create Story")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Create Story
                    </button>
                    <button
                      onClick={() => handleTabClick("Learning Plan")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Learning Plan
                    </button>
                    <button
                      onClick={() => handleTabClick("Learning Progress")}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    >
                      Learning Progress
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                key={item.title}
                onClick={() => handleTabClick(item.title)}
                className={`px-3 py-1 rounded-md ${
                  activeTab === item.title
                    ? "text-blue-600 dark:text-purple-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
                }`}
              >
                {item.title}
              </button>
            )
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="text-gray-700 dark:text-gray-300 hover:text-blue-600 px-3 py-1 rounded-md"
            >
              Profile
            </button>
            {showProfileDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-md z-10 border dark:border-gray-700">
                <button
                  onClick={() => handleTabClick("Profile")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      

      {/* Modals */}
      <CreatePostModal onClose={onClose} isOpen={isOpen} onOpen={onOpen} />
      <CreateReelModal onClose={() => {}} isOpen={false} onOpen={() => {}} />
    </>
  );
};

export default Navbar;
