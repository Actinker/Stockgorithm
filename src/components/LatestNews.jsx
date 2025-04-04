import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LatestNews = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/news");
        setNews(response.data.slice(0, 4)); // Get the latest 4 news articles
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-6 bg-gray-900 text-white min-h-[400px]" // Fixed height to prevent shifts
    >
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-gray-200 text-center">Latest News</h2>

        <div className="mt-4 space-y-4">
          {news.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg flex items-center"
            >
              {/* Fixed Size News Image */}
              <div className="w-24 h-24 flex-shrink-0 aspect-square">
                <img
                  src={article.image}
                  alt="News"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
                />
              </div>

              {/* News Content */}
              <div className="flex-1 p-3">
                <h3 className="text-sm font-semibold line-clamp-1">{article.title}</h3>
                <p className="text-xs text-gray-400">{new Date(article.pubDate).toDateString()}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:underline"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-4">
          <Link to="/news">
            <button className="px-4 py-2 text-sm bg-indigo-600 rounded-lg hover:bg-indigo-700">
              View More News
            </button>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default LatestNews;
