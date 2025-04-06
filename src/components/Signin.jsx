import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic Validation
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    setError(""); // Clear previous errors

    // Simulating Login Logic (Replace with API call)
    console.log("Logging in with:", { username, password });

    // Redirect to /home after successful login
    navigate("/home");
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-800 rounded-3xl shadow-2xl text-gray-100 w-full max-w-xs sm:max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Welcome Back</h2>

      {/* Error Message */}
      {error && <p className="text-red-500 text-sm text-center mb-3 sm:mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Username Input */}
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

        {/* Password Input */}
        <div className="mb-4 sm:mb-6">
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

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 sm:py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Signin;
