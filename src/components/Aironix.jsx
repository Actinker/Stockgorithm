import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import BASE_URL from "../config";
import { FaChartLine, FaRobot, FaExchangeAlt, FaInfoCircle, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

const Aironix = () => {
  const [clientStock, setClientStock] = useState("RELIANCE");
  const [recommendedStock, setRecommendedStock] = useState(null);
  const [actionLog, setActionLog] = useState("");
  const [pendingAction, setPendingAction] = useState(""); // 'buy' or 'hold'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    const fetchAironixData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`${BASE_URL}/aironix_premium_feature`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({})
        });

        const contentType = res.headers.get("content-type");
        if (!res.ok || !contentType?.includes("application/json")) {
          const errorText = await res.text();
          throw new Error(`Unexpected response: ${errorText}`);
        }

        const data = await res.json();
        console.log("✅ Aironix Data:", data);

        const recommended = data.aironix_premium?.stock;
        setRecommendedStock(recommended);
        setLastUpdated(new Date());

        if (recommended && recommended !== clientStock) {
          setPendingAction("buy");
          setActionLog(`Recommended to switch from ${clientStock} to ${recommended}`);
        } else {
          setPendingAction("hold");
          setActionLog(`Holding ${clientStock}`);
        }
      } catch (err) {
        console.error("❌ Error fetching Aironix premium feature:", err.message);
        setError("Failed to fetch Aironix data. Please try again later.");
        setActionLog("Failed to fetch Aironix data");
      } finally {
        setLoading(false);
      }
    };

    fetchAironixData();
    const interval = setInterval(fetchAironixData, 300000); // every 5 minutes
    return () => clearInterval(interval);
  }, [clientStock]);

  const handleBuy = () => {
    if (recommendedStock && recommendedStock !== clientStock) {
      setActionLog(`Sold ${clientStock} → Bought ${recommendedStock}`);
      setClientStock(recommendedStock);
      setPendingAction("hold"); // reset action
    }
  };

  const formatTimeAgo = (date) => {
    if (!date) return '';
    const seconds = Math.floor((new Date() - date) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-20"
      >
        <source src="/gstock.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10">
        <Navbar />

        <header className="text-center py-10 px-4 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaRobot className="text-4xl text-indigo-400" />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-400 drop-shadow-md">
                Aironix Premium Strategy
              </h1>
            </div>
            <p className="mt-4 text-indigo-300 text-sm sm:text-base max-w-2xl mx-auto">
              AI-powered buy/sell signals for optimal stock switching. Our advanced algorithm analyzes market patterns to provide real-time recommendations.
            </p>
          </motion.div>
        </header>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="flex justify-center items-center px-4 mb-8"
        >
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 w-full max-w-full sm:max-w-2xl shadow-xl border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-indigo-300 flex items-center gap-2">
                <FaChartLine />
                Current Holdings
              </h2>
              {lastUpdated && (
                <div className="text-sm text-gray-400 flex items-center gap-1">
                  <FaClock className="text-xs" />
                  Updated {formatTimeAgo(lastUpdated)}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h3 className="text-sm text-gray-400 mb-2">Current Stock</h3>
                <p className="text-xl font-semibold text-white">{clientStock}</p>
              </div>
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700/50">
                <h3 className="text-sm text-gray-400 mb-2">Recommended Stock</h3>
                <p className="text-xl font-semibold text-white">
                  {loading ? (
                    <span className="text-gray-400">Analyzing...</span>
                  ) : recommendedStock ? (
                    recommendedStock
                  ) : (
                    <span className="text-gray-400">No recommendation</span>
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-6">
              <button
                onClick={handleBuy}
                className={`flex-1 px-6 py-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                  pendingAction === "buy"
                    ? "bg-green-500/20 text-green-400 border-green-500/50 hover:bg-green-500/30"
                    : "bg-gray-700/50 text-gray-400 border-gray-600/50"
                }`}
                disabled={pendingAction !== "buy"}
              >
                <FaExchangeAlt />
                Buy Recommended
              </button>
              <button
                className={`flex-1 px-6 py-3 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                  pendingAction === "hold"
                    ? "bg-blue-500/20 text-blue-400 border-blue-500/50"
                    : "bg-gray-700/50 text-gray-400 border-gray-600/50"
                }`}
                disabled
              >
                <FaCheckCircle />
                Hold Current
              </button>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={actionLog}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-xl ${
                  error
                    ? "bg-red-500/20 text-red-400 border border-red-500/50"
                    : pendingAction === "buy"
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-blue-500/20 text-blue-400 border border-blue-500/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  {error ? (
                    <FaExclamationTriangle />
                  ) : pendingAction === "buy" ? (
                    <FaExchangeAlt />
                  ) : (
                    <FaCheckCircle />
                  )}
                  <p className="font-medium">{actionLog}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {error && (
              <button
                onClick={() => window.location.reload()}
                className="mt-4 w-full px-6 py-3 bg-red-500/20 text-red-400 rounded-xl border border-red-500/50 hover:bg-red-500/30 transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </motion.div>

        <div className="max-w-2xl mx-auto px-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-indigo-300 mb-3 flex items-center gap-2">
              <FaInfoCircle />
              How It Works
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Aironix Premium Strategy uses advanced machine learning algorithms to analyze market patterns, 
              historical data, and real-time market conditions to provide optimal stock switching recommendations. 
              The system updates every 5 minutes to ensure you have the most current market insights.
            </p>
          </div>
        </div>

        <BottomNav />
      </div>
    </div>
  );
};

export default Aironix;
