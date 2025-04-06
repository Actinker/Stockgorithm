import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import LatestNews from "../components/LatestNews";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
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
            <h1 className="text-5xl font-bold text-indigo-400 drop-shadow-lg animate-glow">
              StockGorithm
            </h1>
            <p className="text-lg mt-4 text-indigo-400 animate-glow">
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
          className="pb-24 md:pb-10"
        >
          <LatestNews />
        </motion.div>

        <Footer />
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
