import express from "express";
import axios from "axios";
import cors from "cors";
import { parseString } from "xml2js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static("public")); // Serve static files

// Define the path to the images directory
const imagesDir = path.join(__dirname, "public/images");
console.log("📂 Looking for images in:", imagesDir); // Debugging log

let stockImages = [];

const loadImages = () => {
  if (fs.existsSync(imagesDir)) {
    fs.readdir(imagesDir, (err, files) => {
      if (err) {
        console.error("❌ Error reading images directory:", err);
      } else {
        stockImages = files.map(file => `/images/${file}`);
        console.log("✅ Images loaded:", stockImages);
      }
    });
  } else {
    console.warn("⚠️ Warning: 'public/images' folder not found.");
  }
};

// Load images once at startup
loadImages();

let imageIndex = 0;

// Fetch stock market news
app.get("/news", async (req, res) => {
  try {
    const rssUrl = "https://news.google.com/rss/search?q=stock+market";
    const response = await axios.get(rssUrl);

    parseString(response.data, (err, result) => {
      if (err) {
        return res.status(500).json({ error: "❌ Failed to parse RSS feed" });
      }

      let articles = result.rss.channel[0].item.slice(0, 9);

      const newsData = articles.map(article => {
        const image = stockImages.length > 0 ? stockImages[imageIndex % stockImages.length] : "/images/default.jpg";
        imageIndex++;

        return {
          title: article.title[0],
          link: article.link[0],
          pubDate: article.pubDate[0],
          image: image,
        };
      });

      res.json(newsData);
    });
  } catch (error) {
    console.error("❌ Error fetching news:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
