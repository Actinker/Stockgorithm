import { Link } from "react-router-dom";
import { FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa"; // Import icons
import logo1 from "/logo1.png"; // Import your logo

const Footer = () => {
  return (
    <footer className="relative text-gray-300 mt-10 hidden md:block"> {/* 🚀 Footer Hidden on Mobile */}
      {/* Gradient Background for Better Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900 to-transparent opacity-90"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-8">
          
          {/* Left Section - Brand Name */}
          <div>
            <h2 className="text-2xl font-bold text-white">StockGorithm</h2>
            <p className="text-sm text-gray-400 mt-2">
              Predict. Invest. Succeed.
            </p>
            <img src={logo1} alt="StockGorithm Logo" className="w-32" /> 
          </div>

          {/* Middle Section - Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
            <div className="flex flex-col space-y-1">
              <Link to="/" className="hover:text-indigo-400 transition">Home</Link>
              <Link to="/predict" className="hover:text-indigo-400 transition">Predict</Link>
              <Link to="/news" className="hover:text-indigo-400 transition">News</Link>
              <Link to="/contact" className="hover:text-indigo-400 transition">Contact</Link>
            </div>
          </div>

          {/* Right Section - Social Media Icons */}
          <div className="text-right">
            <h3 className="text-lg font-semibold text-white mb-2">Follow Us</h3>
            <div className="flex justify-end space-x-4 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer">
                <FaTwitter size={18} className="text-blue-400" />
                <span>Twitter</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer">
                <FaLinkedin size={18} className="text-blue-500" />
                <span>LinkedIn</span>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-md hover:bg-indigo-600 transition cursor-pointer">
                <FaFacebook size={18} className="text-blue-600" />
                <span>Facebook</span>
              </a>
            </div>
          </div>

        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} StockGorithm. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
