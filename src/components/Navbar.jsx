import { useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi"; // lightweight icon package
import logo from "/logo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Add your search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900 px-4 py-3 flex items-center justify-between shadow-md">
        {/* Logo */}
        <Link to="/home">
          <img src={logo} alt="StockGorithm Logo" className="h-8" />
        </Link>

        {/* Search Input + Icon */}
        <div className="flex items-center ml-4 flex-1 bg-gray-800 rounded-lg overflow-hidden">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search stocks..."
            className="flex-1 px-4 py-2 text-white bg-transparent focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-3 py-2 text-indigo-400 hover:text-indigo-500 transition"
          >
            <FiSearch size={20} />
          </button>
        </div>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-gray-900 px-8 py-4 items-center justify-between shadow-lg">
        {/* Logo & Title */}
        <Link to="/home" className="flex items-center text-white">
          <img src={logo} alt="StockGorithm Logo" className="h-10 mr-3" />
          <h1 className="text-2xl font-bold text-indigo-500">StockGorithm</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="flex gap-6 text-white">
          <Link to="/home" className="hover:text-indigo-400">Home</Link>
          <Link to="/predict" className="hover:text-indigo-400">Predict</Link>
          <Link to="/news" className="hover:text-indigo-400">News</Link>
          <Link to="/insight" className="hover:text-indigo-400">Insights</Link>
        </div>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="pt-16"></div>
    </>
  );
};

export default Navbar;
