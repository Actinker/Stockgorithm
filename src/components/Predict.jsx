import { useState, useRef, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-date-fns";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";
import BASE_URL from "../config";
import zoomPlugin from "chartjs-plugin-zoom";
import axios from "axios";
import { FaArrowUp, FaArrowDown, FaInfoCircle, FaChartLine, FaHistory } from "react-icons/fa";
Chart.register(...registerables, zoomPlugin);

const Predict = () => {
  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [descriptions, setDescriptions] = useState({});
  const [yMin, setYMin] = useState(null);
  const [yMax, setYMax] = useState(null);
  const [chartType, setChartType] = useState("line");
  const [timeRange, setTimeRange] = useState("1d");
  const chartRef = useRef(null);

  const modelStocks = {
    1: "HDFCBANK",
    2: "SBIN",
    3: "INFY",
    4: "TATAMOTORS",
  };

  const fetchStockData = async (stockId) => {
    const stock = modelStocks[stockId];
    const stockNameWithNs = `${stock}.NS`;
    try {
      // Get prediction for this stock
      const predRes = await fetch(`http://localhost:5000/stock_prediction/${stock}?model_id=${stockId}`);
      if (!predRes.ok) throw new Error("No prediction data found");
      const predData = await predRes.json();
      if (!Array.isArray(predData) || predData.length === 0) throw new Error("Invalid prediction data format");
      const latest = predData[0];
      // Get candlestick data using axios
      const candleRes = await axios.post(`${BASE_URL}/fetch_data`, { stock_name: stockNameWithNs });
      const candleJson = candleRes.data;
      return {
        prediction: {
          stock: latest.stock_name,
          price: parseFloat(latest.predicted_close).toFixed(2),
          current: parseFloat(latest.current_close).toFixed(2),
          recommendation: (latest.predicted_close > latest.current_close) ? "BUY" : "SELL",
          data: predData,
          change: ((latest.predicted_close - latest.current_close) / latest.current_close * 100).toFixed(2)
        },
        description: candleJson.about,
        candleData: candleJson.stock_data
      };
    } catch (err) {
      console.error(`Error fetching ${stock}:`, err);
      return null;
    }
  };

  const updateAllStocks = async () => {
    setLoading(true);
    const newPredictions = {};
    const newDescriptions = {};
    for (const [id] of Object.entries(modelStocks)) {
      const data = await fetchStockData(Number(id));
      if (data) {
        newPredictions[id] = data.prediction;
        newDescriptions[id] = data.description;
      }
    }
    setPredictions(newPredictions);
    setDescriptions(newDescriptions);
    setLoading(false);
  };

  useEffect(() => {
    updateAllStocks();
    const interval = setInterval(updateAllStocks, 60000); // Update every 1 minute
    return () => clearInterval(interval);
  }, []);

  const handleStockSelect = async (stockId) => {
    setSelectedStock(stockId);
    try {
      const data = await fetchStockData(stockId);
      if (!data) return;
      const { prediction, candleData } = data;
      const candleTimes = candleData.map(item => {
        const time = new Date(item.Time);
        time.setHours(time.getHours(), time.getMinutes());
        return time;
      });
      const candleClose = candleData.map(item => item.Close);
      const candleHigh = candleData.map(item => item.High);
      const candleLow = candleData.map(item => item.Low);
      const predTimes = prediction.data.map(item => {
        const time = new Date(item.fetched_at);
        time.setHours(time.getHours(), time.getMinutes());
        return time;
      });
      const predictedClose = prediction.data.map(item => item.predicted_close);
      const actualClose = prediction.data.map(item => item.current_close);
      const allTimes = [...candleTimes, ...predTimes].map(t => t.getTime()).sort((a, b) => a - b).map(t => new Date(t));
      const alignedCandleClose = allTimes.map(time => candleTimes.find(t => t.getTime() === time.getTime()) ? candleClose[candleTimes.findIndex(t => t.getTime() === time.getTime())] : null);
      const alignedCandleHigh = allTimes.map(time => candleTimes.find(t => t.getTime() === time.getTime()) ? candleHigh[candleTimes.findIndex(t => t.getTime() === time.getTime())] : null);
      const alignedCandleLow = allTimes.map(time => candleTimes.find(t => t.getTime() === time.getTime()) ? candleLow[candleTimes.findIndex(t => t.getTime() === time.getTime())] : null);
      const alignedActualClose = allTimes.map(time => predTimes.find(t => t.getTime() === time.getTime()) ? actualClose[predTimes.findIndex(t => t.getTime() === time.getTime())] : null);
      const alignedPredictedClose = allTimes.map(time => predTimes.find(t => t.getTime() === time.getTime()) ? predictedClose[predTimes.findIndex(t => t.getTime() === time.getTime())] : null);
      const allClosePrices = [...alignedCandleClose, ...alignedActualClose, ...alignedPredictedClose].filter(p => p !== null);
      setYMin(Math.min(...allClosePrices));
      setYMax(Math.max(...allClosePrices));
      setChartData({
        labels: allTimes,
        datasets: [
          {
            label: "Actual Price",
            data: alignedCandleClose,
            borderColor: "#10B981",
            backgroundColor: "rgba(16, 185, 129, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "#10B981",
            pointRadius: 3,
          },
          {
            label: "Predicted Price",
            data: alignedPredictedClose,
            borderColor: "#6366F1",
            backgroundColor: "rgba(99, 102, 241, 0.1)",
            borderWidth: 2,
            tension: 0.4,
            pointBackgroundColor: "#6366F1",
            pointRadius: 3,
            borderDash: [5, 5],
          },
          {
            label: "High",
            data: alignedCandleHigh,
            borderColor: "#059669",
            backgroundColor: "rgba(5, 150, 105, 0.1)",
            borderWidth: 1,
            tension: 0.4,
            pointBackgroundColor: "#059669",
            pointRadius: 2,
          },
          {
            label: "Low",
            data: alignedCandleLow,
            borderColor: "#DC2626",
            backgroundColor: "rgba(220, 38, 38, 0.1)",
            borderWidth: 1,
            tension: 0.4,
            pointBackgroundColor: "#DC2626",
            pointRadius: 2,
          },
        ],
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  useEffect(() => {
    if (chartRef.current) chartRef.current.resetZoom();
    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [chartData]);

  return (
    <>
      <Navbar />
      <div className="relative bg-gray-900 text-gray-900 min-h-screen">
        <div className="relative z-10 flex flex-col items-center py-6 px-4 sm:px-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600 text-center">
            Stock Predictions
          </h1>
          <p className="text-gray-400 mt-2 text-sm sm:text-base text-center">
            Real-time predictions for all stocks. Updates every minute.
          </p>

          {loading && (
            <div className="mt-4 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
              <span className="ml-2 text-gray-400">Updating predictions...</span>
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            {Object.entries(modelStocks).map(([id, stock]) => {
              const prediction = predictions[id];
              return (
                <div
                  key={id}
                  onClick={() => handleStockSelect(Number(id))}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800">{stock}</h3>
                    <FaInfoCircle className="text-gray-400 hover:text-indigo-500" />
                  </div>
                  {prediction ? (
                    <>
                      <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Predicted Price
                        </p>
                        <span className="text-lg font-semibold text-indigo-600">₹{prediction.price}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Current Price
                        </p>
                        <span className="text-lg font-semibold text-gray-700">₹{prediction.current}</span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Change
                        </p>
                        <span className={`text-sm font-semibold flex items-center ${
                          parseFloat(prediction.change) >= 0 ? "text-green-500" : "text-red-500"
                        }`}>
                          {parseFloat(prediction.change) >= 0 ? <FaArrowUp className="mr-1" /> : <FaArrowDown className="mr-1" />}
                          {Math.abs(prediction.change)}%
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          Recommendation
                        </p>
                        <span className={`text-sm font-semibold ${
                          prediction.recommendation === "BUY" ? "text-green-500" : "text-red-500"
                        }`}>
                          {prediction.recommendation}
                        </span>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500 mt-2">Loading...</p>
                  )}
                </div>
              );
            })}
          </div>

          {selectedStock && predictions[selectedStock] && (
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md w-full">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {predictions[selectedStock].stock} Details
                  </h2>
                  <p className="text-sm text-gray-600 mt-2">
                    {descriptions[selectedStock]}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedStock(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  onClick={() => setChartType("line")}
                  className={`px-4 py-2 rounded-md ${
                    chartType === "line" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaChartLine className="inline mr-2" />
                  Line Chart
                </button>
                <button
                  onClick={() => setTimeRange("1d")}
                  className={`px-4 py-2 rounded-md ${
                    timeRange === "1d" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaHistory className="inline mr-2" />
                  1D
                </button>
              </div>

              {chartData && (
                <div className="mt-6 overflow-x-auto w-full">
                  <div className="w-full h-[400px]">
                    <Line
                      ref={chartRef}
                      data={chartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        interaction: {
                          mode: 'index',
                          intersect: false,
                        },
                        plugins: {
                          legend: {
                            position: "top",
                            labels: {
                              color: "#4B5563",
                              usePointStyle: true,
                              pointStyle: 'circle'
                            },
                          },
                          tooltip: {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            titleColor: '#1F2937',
                            bodyColor: '#4B5563',
                            borderColor: '#E5E7EB',
                            borderWidth: 1,
                            padding: 12,
                            boxPadding: 6,
                            usePointStyle: true,
                          },
                          zoom: {
                            pan: {
                              enabled: true,
                              mode: "xy",
                              modifierKey: "ctrl",
                            },
                            zoom: {
                              wheel: {
                                enabled: true,
                                modifierKey: "ctrl",
                              },
                              pinch: {
                                enabled: true,
                              },
                              drag: {
                                enabled: true,
                                borderColor: "rgba(225,225,225,0.3)",
                                borderWidth: 1,
                                backgroundColor: "rgba(225,225,225,0.1)",
                                animationDuration: 0,
                              },
                              mode: "xy",
                            },
                          },
                        },
                        scales: {
                          x: {
                            type: "time",
                            time: {
                              unit: "minute",
                              tooltipFormat: "HH:mm",
                              displayFormats: {
                                minute: "HH:mm",
                              },
                            },
                            min: new Date("2025-04-04T09:15:00").getTime(),
                            max: new Date("2025-04-04T15:30:00").getTime(),
                            ticks: {
                              color: "#4B5563",
                            },
                            grid: {
                              color: "#E5E7EB",
                            },
                          },
                          y: {
                            min: yMin,
                            max: yMax,
                            ticks: {
                              color: "#4B5563",
                            },
                            grid: {
                              color: "#E5E7EB",
                            },
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <BottomNav />
      </div>
    </>
  );
};

export default Predict;