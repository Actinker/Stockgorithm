import { useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav"; // Import Bottom Navigation

// Register Chart.js components
Chart.register(...registerables);

const Predict = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState(null);

  const generateRandomPrices = () => {
    const prices = Array.from({ length: 10 }, () => (Math.random() * 1000).toFixed(2));
    return prices;
  };

  const handlePredict = async () => {
    if (!stockSymbol) return alert("Please enter a stock symbol!");

    setLoading(true);
    setTimeout(() => {
      const predictedPrice = (Math.random() * 1000).toFixed(2);
      const recommendation = Math.random() > 0.5 ? "BUY" : "SELL";
      const trendData = generateRandomPrices();

      setPrediction({
        stock: stockSymbol.toUpperCase(),
        price: predictedPrice,
        recommendation: recommendation,
      });

      setChartData({
        labels: ["T-9", "T-8", "T-7", "T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "Today"],
        datasets: [
          {
            label: `${stockSymbol.toUpperCase()} Price Trend`,
            data: trendData,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
          },
        ],
      });

      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <Navbar/>
    <div className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      >
        <source src="/predict.mp4" type="video/mp4" />
      </video>
      <div className="relative z-10 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold text-indigo-500">Stock Prediction</h1>
        <p className="text-gray-400 mt-2">Enter a stock symbol to get predictions.</p>

        <div className="mt-6 flex gap-3">
          <input
            type="text"
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value)}
            placeholder="e.g. AAPL, TSLA"
            className="px-4 py-2 rounded-md text-black"
          />
          <button
            onClick={handlePredict}
            className="px-6 py-2 bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Predict
          </button>
        </div>

        {loading && <p className="text-gray-300 mt-4">Predicting...</p>}

        {prediction && (
          <div className="mt-6 bg-gray-800 p-4 rounded-md shadow-md w-2/3">
            <h2 className="text-xl font-bold text-gray-300">Prediction for {prediction.stock}</h2>
            <p className="text-lg mt-2">
              Predicted Price: <span className="text-indigo-400">${prediction.price}</span>
            </p>
            <p
              className={`text-lg font-bold mt-2 ${
                prediction.recommendation === "BUY" ? "text-green-400" : "text-red-400"
              }`}
            >
              Recommendation: {prediction.recommendation}
            </p>

            {chartData && (
              <div className="mt-6">
                <h3 className="text-lg text-gray-300">Price Trend</h3>
                <Line data={chartData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
    <BottomNav /> {/* ✅ Added Mobile Navigation */}
    </>
  );
};

export default Predict;