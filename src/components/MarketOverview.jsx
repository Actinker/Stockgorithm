import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaMinus, FaChartLine, FaRupeeSign } from "react-icons/fa";

const statusStyles = {
  POSITIVE: {
    bg: "linear-gradient(135deg, rgba(34, 197, 94, 0.95), rgba(16, 185, 129, 0.95))",
    border: "border-green-500",
    icon: <FaArrowUp className="text-green-100 text-sm ml-1" />,
    shadow: "shadow-lg shadow-green-500/20",
    trend: "text-green-100",
  },
  NEGATIVE: {
    bg: "linear-gradient(135deg, rgba(239, 68, 68, 0.95), rgba(220, 38, 38, 0.95))",
    border: "border-red-500",
    icon: <FaArrowDown className="text-red-100 text-sm ml-1" />,
    shadow: "shadow-lg shadow-red-500/20",
    trend: "text-red-100",
  },
  NEUTRAL: {
    bg: "linear-gradient(135deg, rgba(234, 179, 8, 0.95), rgba(202, 138, 4, 0.95))",
    border: "border-yellow-500",
    icon: <FaMinus className="text-yellow-100 text-sm ml-1" />,
    shadow: "shadow-lg shadow-yellow-500/20",
    trend: "text-yellow-100",
  },
};

const MarketOverview = () => {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("http://localhost:5000/api/predictions");
  
        const uniqueByModel = Object.values(
          response.data.reduce((acc, item) => {
            // Calculate status
            let status = "NEUTRAL";
            if (item.predicted_close > item.current_close) status = "POSITIVE";
            else if (item.predicted_close < item.current_close) status = "NEGATIVE";
            // Attach status to item
            acc[item.model_id] = { ...item, status };
            return acc;
          }, {})
        );
  
        setPredictions(uniqueByModel);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchPredictions();
  }, []);  

  const calculateChange = (current, predicted) => {
    return ((predicted - current) / current * 100).toFixed(2);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
      className="relative py-8 px-4 bg-gray-900/50 backdrop-blur-sm rounded-xl shadow-2xl max-w-6xl mx-auto border border-gray-700/50"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-green-500/5 rounded-xl" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaChartLine className="text-2xl text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Market Overview
          </h2>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <AnimatePresence>
                {predictions.map((item, index) => {
                  const style = statusStyles[item.status] || statusStyles.NEUTRAL;
                  const change = calculateChange(item.current_close, item.predicted_close);

                  return (
                    <motion.div
                      key={`${item.stock_name}_${item.model_id}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`relative min-h-[160px] w-full max-w-[280px] mx-auto
                        flex flex-col justify-between
                        rounded-xl text-white
                        border-2 ${style.border} ${style.shadow}
                        p-4 transform-gpu backdrop-blur-sm
                        hover:scale-[1.02] transition-all duration-300
                        hover:shadow-xl`}
                      style={{
                        background: style.bg,
                      }}
                    >
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-bold truncate pr-3" title={item.stock_name}>
                            {item.stock_name}
                          </h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${style.trend} bg-white/10 whitespace-nowrap`}>
                            {item.status}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${style.trend}`}>
                            {change}%
                          </span>
                          {style.icon}
                        </div>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-200">Current</span>
                          <span className="font-medium flex items-center">
                            <FaRupeeSign className="text-xs mr-1" />
                            {item.current_close.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-200">Predicted</span>
                          <span className="font-medium flex items-center">
                            <FaRupeeSign className="text-xs mr-1" />
                            {item.predicted_close.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default MarketOverview;
