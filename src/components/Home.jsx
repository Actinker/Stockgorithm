import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";
import LatestNews from "../components/LatestNews";
import MarketOverview from "../components/MarketOverview";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Enhanced Dynamic Stock Market Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-gray-900 to-green-900">
        {/* Animated Stock Chart Lines - Reduced on mobile */}
        <div className="absolute inset-0 opacity-10 hidden md:block">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M0,50 Q10,40 20,60 T40,40 T60,70 T80,30 T100,50"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.path
              d="M0,30 Q10,20 20,40 T40,20 T60,50 T80,10 T100,30"
              stroke="white"
              strokeWidth="0.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
            />
          </svg>
        </div>

        {/* Floating Stock Numbers - Reduced count on mobile */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(window.innerWidth < 768 ? 10 : 20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-white/10 text-lg md:text-2xl font-mono"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            >
              {Math.random() > 0.5 ? "+" : "-"}
              {(Math.random() * 100).toFixed(2)}%
            </motion.div>
          ))}
        </div>

        {/* Market Color Overlays - Simplified on mobile */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-500/10 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: "1s" }}></div>
          <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: "2s" }}></div>
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-12 md:py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-center"
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-red-500 text-transparent bg-clip-text drop-shadow-lg"
                animate={{
                  backgroundPosition: ["0%", "100%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                style={{
                  backgroundSize: "200% auto",
                }}
              >
                StockGorithm
              </motion.h1>
              <p className="text-base md:text-xl mt-4 md:mt-6 text-gray-300 max-w-2xl mx-auto px-4">
                AI-powered stock market predictions to help you invest smarter and make data-driven decisions.
              </p>
              <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
                <Link to="/predict" className="w-full sm:w-auto">
                  <motion.button 
                    className="w-full px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-semibold shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Predictions
                  </motion.button>
                </Link>
                <Link to="/learn" className="w-full sm:w-auto">
                  <motion.button 
                    className="w-full px-6 md:px-8 py-3 md:py-4 bg-gray-800/50 backdrop-blur-sm rounded-lg text-white font-semibold border border-gray-700"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Market Overview Section */}
        <section className="py-12 md:py-16 px-4 bg-gray-900/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Market Overview
            </motion.h2>
            <div className="px-2 md:px-0">
              <MarketOverview />
            </div>
          </div>
        </section>

        {/* Latest News Section */}
        <section className="py-12 md:py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.h2 
                className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Latest Market News
              </motion.h2>
              <div className="px-2 md:px-0">
                <LatestNews />
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
        <BottomNav />
      </div>
    </div>
  );
};

export default Home;
