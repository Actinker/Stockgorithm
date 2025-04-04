import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { motion } from "framer-motion";
import BottomNav from "./BottomNav"; // Import Bottom Navigation

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("http://localhost:5000/news");
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6 bg-gray-900 text-white min-h-screen pb-24">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-500">Latest Stock Market News</h2>

        {/* News Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition transform duration-300 ease-in-out hover:bg-gray-700"
            >
              {/* Image Container */}
              <div className="w-full h-48">
                <img
                  src={article.image}
                  alt="News"
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                />
              </div>

              {/* News Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">{article.title}</h3>
                <p className="text-sm text-gray-400">{new Date(article.pubDate).toDateString()}</p>
                <p className="mt-2 text-gray-300 line-clamp-3">{article.description}</p>
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-indigo-400 hover:text-indigo-600 hover:underline"
                >
                  Read More
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ✅ Fixed Bottom Navigation */}
      <BottomNav className="fixed bottom-0 left-0 w-full bg-gray-900 shadow-lg z-50" />
    </>
  );
};

export default News;
