import { FaHome, FaSearch, FaNewspaper, FaChartLine, FaRobot } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { path: "/home", icon: FaHome, label: "Home" },
    { path: "/predict", icon: FaSearch, label: "Search" },
    { path: "/aironix", icon: FaRobot, label: "Aironix" },
    { path: "/news", icon: FaNewspaper, label: "News" },
    { path: "/insight", icon: FaChartLine, label: "Insights" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gray-900/95 backdrop-blur-sm text-white shadow-lg border-t border-gray-800 md:hidden z-50">
      <div className="flex justify-around items-center px-1 py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center px-2 py-1.5"
            >
              <div
                className={`relative flex flex-col items-center transition-colors duration-200 ${
                  isActive ? "text-indigo-400" : "text-gray-400"
                }`}
              >
                <Icon
                  size={20}
                  className={`transition-colors duration-200 ${
                    isActive ? "text-indigo-400" : "text-gray-400"
                  }`}
                />
                <span
                  className={`text-[10px] mt-0.5 font-medium transition-colors duration-200 ${
                    isActive ? "text-indigo-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-400 rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Safe Area Spacer for iOS */}
      <div className="h-safe-area bg-gray-900/95 backdrop-blur-sm" />
    </nav>
  );
};

export default BottomNav;
