import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const SetCredentials = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Email passed from OTP verification

  const handleSetCredentials = async (e) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup_user_details`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.status === "success") {
        navigate("/"); // Redirect to login page after successful registration
      } else {
        setError("Username already taken. Choose a different one.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-800 rounded-3xl shadow-2xl text-gray-100 w-full max-w-xs sm:max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Set Credentials</h2>

      {error && <p className="text-red-500 text-sm text-center mb-3 sm:mb-4">{error}</p>}

      <form onSubmit={handleSetCredentials}>
        <div className="mb-3 sm:mb-4">
          <label htmlFor="username" className="block text-sm sm:text-base font-medium text-gray-400">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="w-full mt-1 p-2 sm:p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div className="mb-3 sm:mb-4">
          <label htmlFor="password" className="block text-sm sm:text-base font-medium text-gray-400">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full mt-1 p-2 sm:p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 sm:py-3 rounded-lg font-semibold transition-all duration-200 ${
            loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {loading ? "Setting up..." : "Set Credentials"}
        </button>
      </form>
    </div>
  );
};

export default SetCredentials;
