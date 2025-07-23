import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaChartLine, FaNewspaper } from "react-icons/fa";
import { format } from "date-fns";

const LatestNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/news");
        setNews(response.data.slice(0, 4));
        setError(null);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="py-6 bg-gray-900 text-white min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-6 bg-gray-900 text-white min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <FaNewspaper className="text-4xl text-red-400 mx-auto mb-4" />
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-6 bg-gray-900 text-white min-h-[400px]"
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <FaChartLine className="text-2xl text-blue-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
            Latest News
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {news.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-32 h-32 flex-shrink-0">
                  <img
                    src={article.image || "/images/default.jpg"}
                    alt={article.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    onError={(e) => (e.target.src = "/images/default.jpg")}
                  />
                </div>

                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-blue-400 transition-colors duration-300">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">
                    {format(new Date(article.pubDate), "MMM d, yyyy")}
                  </p>
                  <a
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors duration-300"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/news">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm font-medium bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              View More News
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestNews;
