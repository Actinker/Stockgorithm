// Insight.jsx
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import { motion, AnimatePresence } from "framer-motion";
import { FaChartLine, FaLightbulb, FaMoneyBillWave, FaExchangeAlt, FaIndustry, FaExclamationTriangle, FaGlobe, FaChartBar, FaRobot } from "react-icons/fa";

const Insight = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const categoryIcons = {
    "Current Trends": FaChartLine,
    "Key Insights": FaLightbulb,
    "What to Invest In?": FaMoneyBillWave,
    "Buy/Sell Recommendations": FaExchangeAlt,
    "Sector Performances": FaIndustry,
    "Risk Factors": FaExclamationTriangle,
    "Global Market Influence": FaGlobe,
    "Top Gainers & Losers": FaChartBar,
    "Current Market Prediction": FaRobot
  };

  useEffect(() => {
    const generateInsights = async () => {
      try {
        setLoading(true);
        setError(null);
        const newsResponse = await fetch("http://localhost:5000/news");
        const newsData = await newsResponse.json();

        const headlines = newsData
          .slice(0, 10)
          .map((item) => `- ${item.title}`)
          .join("\n");

        const prompt = `
Analyze the current Indian stock market using the latest news headlines below and provide a structured summary in JSON format.

Latest Headlines:
${headlines}

The response should strictly follow this format without additional text or code blocks:
{
  "Current Trends": "...",
  "Key Insights": "...",
  "What to Invest In?": "...",
  "Buy/Sell Recommendations": "...",
  "Sector Performances": "...",
  "Risk Factors": "...",
  "Global Market Influence": "...",
  "Top Gainers & Losers": "...",
  "Current Market Prediction": "..."
}
Do NOT include \`\`\`json or any extra text. ONLY return raw JSON.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();

        text = text.trim().replace(/```json|```/g, "");
        const insightsJSON = JSON.parse(text);
        setInsights(insightsJSON);
      } catch (error) {
        console.error("Error generating insights:", error);
        setError("Failed to generate insights. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    generateInsights();
  }, []);

  const renderInsightCard = (category, text, index) => {
    const Icon = categoryIcons[category] || FaLightbulb;
    
    return (
      <motion.div
        key={category}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl shadow-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Icon className="text-2xl text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-blue-400">{category}</h3>
        </div>
        <p className="text-gray-300 leading-relaxed">{text}</p>
      </motion.div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen overflow-hidden pb-24">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center text-white">
              Market Insights
            </h2>
            <p className="text-center text-blue-100 text-lg">
              AI-powered analysis of current market trends and opportunities
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-400 text-lg">Generating market insights...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-400 text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-semibold text-red-400 mb-2">Error</h3>
              <p className="text-gray-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {insights && Object.entries(insights).map(([category, text], index) => 
                  renderInsightCard(category, text, index)
                )}
              </div>
            </AnimatePresence>
          )}

          {/* Last Updated */}
          {insights && (
            <div className="text-center mt-8 text-gray-500 text-sm">
              Last updated: {new Date().toLocaleString()}
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default Insight;
