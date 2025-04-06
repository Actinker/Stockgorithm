// Insight.jsx
import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

const Insight = () => {
  const [insights, setInsights] = useState(null);
  const genAI = new GoogleGenerativeAI("AIzaSyDOe24XdnMYN_tGUvvYqoVPI7pOXESYWjA"); // Use env in prod

  useEffect(() => {
    const generateInsights = async () => {
      try {
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
        setInsights(null);
      }
    };

    generateInsights();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-gray-900 text-white min-h-screen overflow-hidden p-6 pb-24">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Stock Market Insights</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
        <BottomNav className="mt-12" />
      </div>
    </>
  );
};

export default Insight;
