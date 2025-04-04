import { FaHome, FaSearch, FaNewspaper, FaChartLine } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation(); // Get current route to highlight active tab

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-800 bg-opacity-90 text-white shadow-lg border-t border-gray-700 md:hidden">
      <div className="flex justify-around py-3">
        <Link to="/home" className={`flex flex-col items-center ${location.pathname === "/home" ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"}`}>
          <FaHome size={22} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/predict" className={`flex flex-col items-center ${location.pathname === "/predict" ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"}`}>
          <FaSearch size={22} />
          <span className="text-xs">Search</span>
        </Link>
        <Link to="/news" className={`flex flex-col items-center ${location.pathname === "/news" ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"}`}>
          <FaNewspaper size={22} />
          <span className="text-xs">News</span>
        </Link>
        <Link to="/insight" className={`flex flex-col items-center ${location.pathname === "/insight" ? "text-indigo-400" : "text-gray-400 hover:text-indigo-300"}`}>
          <FaChartLine size={22} />
          <span className="text-xs">Insights</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;
