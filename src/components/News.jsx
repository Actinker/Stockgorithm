import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import BottomNav from "./BottomNav";
import { FaNewspaper, FaClock, FaExternalLinkAlt, FaSearch, FaTimes, FaBookmark, FaShare } from "react-icons/fa";

const News = () => {
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("latest");
  const [bookmarkedArticles, setBookmarkedArticles] = useState(new Set());
  const [error, setError] = useState(null);

  const categories = [
    { id: "all", name: "All News" },
    { id: "market", name: "Market Updates" },
    { id: "company", name: "Company News" },
    { id: "economy", name: "Economy" },
    { id: "technology", name: "Technology" },
  ];

  const sortOptions = [
    { id: "latest", name: "Latest" },
    { id: "oldest", name: "Oldest" },
    { id: "popular", name: "Most Popular" },
  ];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get("http://localhost:5000/news");
        
        // Validate and clean the data with more lenient checks
        const validNews = response.data.filter(article => 
          article && 
          typeof article === 'object' && 
          (article.title || article.description) // Only require either title or description
        ).map(article => ({
          ...article,
          title: article.title || "Untitled Article",
          description: article.description || "No description available",
          category: article.category || "general",
          source: article.source || "Unknown Source",
          pubDate: article.pubDate || new Date().toISOString(),
          image: article.image || "/images/default.jpg"
        }));

        console.log("Total news articles:", validNews.length); // Debug log
        const sortedNews = sortNews(validNews, sortBy);
        setNews(sortedNews);
        setFilteredNews(sortedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to fetch news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
    const interval = setInterval(fetchNews, 300000); // Refresh every 5 minutes
    return () => clearInterval(interval);
  }, [sortBy]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sortNews = (newsData, sortType) => {
    if (!Array.isArray(newsData)) return [];
    
    return [...newsData].sort((a, b) => {
      const dateA = new Date(a.pubDate || 0);
      const dateB = new Date(b.pubDate || 0);
      
      switch (sortType) {
        case "latest":
          return dateB - dateA;
        case "oldest":
          return dateA - dateB;
        case "popular":
          return (b.views || 0) - (a.views || 0);
        default:
          return dateB - dateA;
      }
    });
  };

  useEffect(() => {
    if (!Array.isArray(news)) return;

    let filtered = news;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(article => {
        if (!article) return false;
        
        const title = (article.title || '').toLowerCase();
        const description = (article.description || '').toLowerCase();
        const source = (article.source || '').toLowerCase();
        const category = (article.category || '').toLowerCase();
        
        return title.includes(query) ||
               description.includes(query) ||
               source.includes(query) ||
               category.includes(query);
      });
    }
    
    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(article => {
        if (!article) return false;
        return (article.category || '').toLowerCase() === selectedCategory.toLowerCase();
      });
    }
    
    console.log("Filtered news count:", filtered.length); // Debug log
    setFilteredNews(filtered);
  }, [searchQuery, selectedCategory, news]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
      
      if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const toggleBookmark = (articleId) => {
    if (!articleId) return;
    
    setBookmarkedArticles(prev => {
      const newSet = new Set(prev);
      if (newSet.has(articleId)) {
        newSet.delete(articleId);
      } else {
        newSet.add(articleId);
      }
      return newSet;
    });
  };

  const shareArticle = async (article) => {
    if (!article || !article.link) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: article.title || 'Check out this article',
          text: article.description || '',
          url: article.link
        });
      } else {
        await navigator.clipboard.writeText(article.link);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share article. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-900 text-white pb-24">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold mb-3 text-center text-white">
              Latest Stock Market News
            </h2>
            <p className="text-center text-indigo-100 text-lg">
              Stay updated with the latest market trends and company news
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search news by title, description, source, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-center py-8">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          )}

          {/* News Grid */}
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <AnimatePresence>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((article, index) => (
                  <motion.article
                    key={article.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="relative group">
                      <img
                        src={article.image || "/images/default.jpg"}
                        alt={article.title || "News article"}
                        loading="lazy"
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/images/default.jpg";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {article.category && (
                        <span className="absolute top-4 right-4 px-3 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                          {article.category}
                        </span>
                      )}
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={() => toggleBookmark(article.id)}
                          className={`p-2 rounded-full ${
                            bookmarkedArticles.has(article.id)
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-800/80 text-gray-300 hover:bg-gray-700"
                          }`}
                        >
                          <FaBookmark />
                        </button>
                        <button
                          onClick={() => shareArticle(article)}
                          className="p-2 rounded-full bg-gray-800/80 text-gray-300 hover:bg-gray-700"
                        >
                          <FaShare />
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-400 mb-3">
                        <FaClock className="mr-2" />
                        <span>{formatDate(article.pubDate)}</span>
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                        {article.title || "Untitled Article"}
                      </h3>
                      
                      <p className="text-gray-300 line-clamp-3 mb-4">
                        {article.description || "No description available"}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                          Read More
                          <FaExternalLinkAlt className="ml-2" />
                        </a>
                        {article.source && (
                          <span className="text-sm text-gray-400">
                            {article.source}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </AnimatePresence>
          )}

          {!loading && !error && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <FaNewspaper className="mx-auto text-6xl text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-400">
                No news articles found
              </h3>
              <p className="text-gray-500 mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
};

export default News;
