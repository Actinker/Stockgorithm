import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import logo from "/logo.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
  };

  const navItems = [
    { path: "/home", label: "Home" },
    { path: "/predict", label: "Predict" },
    { path: "/news", label: "News" },
    { path: "/insight", label: "Insights" },
    { path: "/aironix", label: "Aironix" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm px-4 py-3 flex items-center justify-between shadow-lg border-b border-gray-800">
        {/* Logo */}
        <Link to="/home" className="flex items-center">
          <img src={logo} alt="StockGorithm Logo" className="h-8" />
          <span className="ml-2 text-lg font-bold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text">
            StockGorithm
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 shadow-lg"
            >
              <div className="px-4 py-3">
                <div className="flex items-center mb-4 bg-gray-800 rounded-lg overflow-hidden">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search stocks..."
                    className="flex-1 px-4 py-2 text-white bg-transparent focus:outline-none"
                  />
                  <button
                    onClick={handleSearch}
                    className="px-3 py-2 text-indigo-400 hover:text-indigo-300 transition"
                  >
                    <FiSearch size={20} />
                  </button>
                </div>
                <nav className="flex flex-col space-y-3">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        isActive(item.path)
                          ? "bg-indigo-500/20 text-indigo-400"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-sm px-8 py-4 items-center justify-between shadow-lg border-b border-gray-800">
        {/* Logo & Title */}
        <Link to="/home" className="flex items-center group">
          <img src={logo} alt="StockGorithm Logo" className="h-10 mr-3 transition-transform group-hover:scale-105" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-500 text-transparent bg-clip-text">
            StockGorithm
          </h1>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stocks..."
              className="w-full px-4 py-2 pl-10 text-white bg-gray-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50 border border-gray-700"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-indigo-500/20 text-indigo-400"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer for fixed navbar */}
      <div className="h-16 md:h-20"></div>
    </>
  );
};

export default Navbar;
