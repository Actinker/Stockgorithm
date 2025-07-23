/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import SetCredentials from "./components/SetCredentials";
import OTPVerification from "./components/OTPVerification";
import Home from "./components/Home";
import Predict from "./components/Predict"; 
import News from "./components/News";
import Insight from "./components/Insight";
import Aironix from "./components/Aironix"; // Assuming you have an Aironix component

const MainScreen = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-900 flex flex-col items-center justify-center px-6 sm:px-10">
      {/* Opening Animation */}
      {!showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-6xl font-extrabold text-indigo-500">StockGorithm</h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-300">Predict. Invest. Succeed.</p>
        </motion.div>
      )}

      {/* Show Sign In / Sign Up Buttons */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="p-6 sm:p-8 bg-gray-800 rounded-3xl shadow-2xl text-gray-100 w-full max-w-xs sm:max-w-sm text-center"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Welcome to StockGorithm</h2>
          <p className="mb-4 text-gray-300 text-sm sm:text-base">Choose an option to continue:</p>

          <div className="flex flex-col gap-3 sm:gap-4">
            <Link to="/signin" className="px-4 py-2 text-sm sm:text-lg bg-indigo-500 rounded-lg hover:bg-indigo-600">
              Sign In
            </Link>
            <Link to="/signup" className="px-4 py-2 text-sm sm:text-lg bg-green-500 rounded-lg hover:bg-green-600">
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/set-credentials" element={<SetCredentialsPage />} />
        <Route path="/otp-verification" element={<OTPVerificationPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/predict" element={<Predict />} />
        <Route path="/news" element={<News/>}/>
        <Route path="/insight" element={<Insight/>}/>
        <Route path="/aironix" element={<Aironix/>}/>
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

const SigninPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <Signin />
    </div>
  );
};

const SignupPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <Signup />
    </div>
  );
};

const OTPVerificationPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <OTPVerification />
    </div>
  );
};

const SetCredentialsPage = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gray-900">
      <SetCredentials />
    </div>
  );
};

export default App;
