// server.js
import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import { fetchAndStoreNews } from './newsFetcher.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/news', async (req, res) => {
  try {
    const db = await initDB();
    const news = await db.all(`SELECT * FROM news ORDER BY pubDate DESC LIMIT 9`);
    res.json(news);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch on startup
fetchAndStoreNews();

// Refresh news every hour
setInterval(fetchAndStoreNews, 60 * 60 * 1000); // 1 hour

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
