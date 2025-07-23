import { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import BASE_URL from "../config";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === "success") {
        navigate("/otp-verification", { state: { email } }); // Redirect to OTP page
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-800 rounded-3xl shadow-2xl text-gray-100 w-full max-w-xs sm:max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Sign Up</h2>

      {error && <p className="text-red-500 text-sm text-center mb-3 sm:mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3 sm:mb-4">
          <label htmlFor="email" className="block text-sm sm:text-base font-medium text-gray-400">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
