import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email; // Email passed from Signup page

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");
    setResendMessage("");

    if (!otp) {
      setError("OTP is required.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}signup_otp_verification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });

      const data = await response.json();
      if (data.status === "success") {
        navigate("/set-credentials", { state: { email } });
      } else {
        setError("Invalid OTP or OTP expired. Try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setLoading(false);
  };

  const handleResendOTP = async () => {
    setError("");
    setResendMessage("");
    setResendLoading(true);

    try {
      const response = await fetch(`${BASE_URL}signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setResendMessage("A new OTP has been sent to your email.");
      } else {
        setError("Failed to resend OTP. Try again.");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }

    setResendLoading(false);
  };

  return (
    <div className="p-6 sm:p-8 bg-gray-800 rounded-3xl shadow-2xl text-gray-100 w-full max-w-xs sm:max-w-sm">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">Verify OTP</h2>

      {error && <p className="text-red-500 text-sm text-center mb-3 sm:mb-4">{error}</p>}
      {resendMessage && <p className="text-green-500 text-sm text-center mb-3 sm:mb-4">{resendMessage}</p>}

      <form onSubmit={handleVerifyOTP}>
        <div className="mb-3 sm:mb-4">
          <label htmlFor="otp" className="block text-sm sm:text-base font-medium text-gray-400">
            Enter OTP
          </label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
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
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </form>

      <div className="mt-3 sm:mt-4 text-center">
        <button
          onClick={handleResendOTP}
          disabled={resendLoading}
          className="text-sm sm:text-base text-indigo-400 hover:underline"
        >
          {resendLoading ? "Resending OTP..." : "Resend OTP"}
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
