import Navbar from "./Navbar";
import Footer from "./Footer";
import BottomNav from "./BottomNav"; // Import Bottom Navigation
import { Link } from "react-router-dom";
import LatestNews from "./LatestNews";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Home = () => {
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to([titleRef.current, textRef.current], {
      textShadow: "0px 0px 12px rgba(0, 102, 255, 0.6), 0px 0px 24px rgba(0, 102, 255, 0.4)",
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "power2.inOut"
    });
  }, []);

  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 left-0 w-[1920px] h-[1080px] object-cover opacity-50"
      >
        <source src="/gstock.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <header className="text-center py-16">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1
              ref={titleRef}
              className="text-5xl font-bold text-indigo-400 drop-shadow-lg"
            >
              StockGorithm
            </h1>
            <p ref={textRef} className="text-lg mt-4 text-indigo-400">
              AI-powered stock market predictions to help you invest smarter.
            </p>
            <Link to="/predict">
              <button className="mt-6 px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition duration-300">
                Get Predictions
              </button>
            </Link>
          </motion.div>
        </header>

        {/* Market Overview */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="text-center py-10 bg-gray-800 bg-opacity-75 mx-4 rounded-lg shadow-lg"
        >
          <h2 className="text-3xl font-bold text-gray-200">Market Overview</h2>
          <p className="mt-4 text-gray-400">Live stock trends will be displayed here.</p>
        </motion.section>

        {/* Latest News Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
          className="pb-24 md:pb-10" // ✅ Extra space at the bottom only for mobile
        >
          <LatestNews />
        </motion.div>

        <Footer />
        <BottomNav /> {/* ✅ Added Mobile Navigation */}
      </div>
    </div>
  );
};

export default Home;
