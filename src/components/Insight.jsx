import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "./Navbar";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min"; // Import Vanta Globe
import BottomNav from "./BottomNav"; // Import Bottom Navigation

const Insight = () => {
  const [insights, setInsights] = useState(null);
  const vantaRef = useRef(null);

  // Initialize Gemini AI
  const GEMINI_API_KEY = "AIzaSyDOe24XdnMYN_tGUvvYqoVPI7pOXESYWjA"; // Replace with environment variable in production
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  useEffect(() => {
    const generateInsights = async () => {
      try {
        const prompt = `
        Analyze the current Indian stock market and provide a structured summary in JSON format.
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

        // ✅ Clean the AI response before parsing
        text = text.trim();
        text = text.replace(/```json/g, "").replace(/```/g, ""); // Remove code block formatting

        const insightsJSON = JSON.parse(text); // Convert to JSON
        setInsights(insightsJSON);
      } catch (error) {
        console.error("Error generating insights:", error);
        setInsights(null);
      }
    };

    generateInsights();
  }, []);

  // Initialize Vanta.js Globe effect
  useEffect(() => {
    if (!vantaRef.current) return;

    const vantaEffect = GLOBE({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x007bff, // Blue color
      size: 1.5,
      backgroundColor: 0x151c3c, // Dark blue background
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy(); // Cleanup on unmount
    };
  }, []);

  return (
    <>
      <Navbar />
      <div ref={vantaRef} className="relative bg-gray-900 text-white min-h-screen overflow-hidden p-6">
        <h2 className="text-3xl font-bold mb-6 text-center">Stock Market Insights</h2>

        {/* Insights Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {insights ? (
            Object.entries(insights).map(([category, text]) => (
              <div
                key={category}
                className="bg-gray-800 p-6 rounded-lg shadow-md border border-blue-500/50 transform hover:scale-105 transition duration-300 hover:border-blue-400"
              >
                <h3 className="text-xl font-semibold text-blue-400">{category}</h3>
                <p className="text-gray-300 mt-2">{text}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-3">Generating insights...</p>
          )}
          <div></div><div></div>
          <BottomNav /> {/* ✅ Added Mobile Navigation */}
        </div>
      </div>
    </>
  );
};

export default Insight;
