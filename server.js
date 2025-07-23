// server.js
import express from 'express';
import cors from 'cors';
import { initDB } from './db.js';
import { fetchAndStoreNews } from './newsFetcher.js';
import { fetchAndStoreStockPrediction } from './stockFetcher.js';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' }); // Explicitly specify path

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Get latest 9 news articles
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

// Get latest stock prediction by symbol and optional model_id
app.get('/stock_prediction/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const { model_id } = req.query;

  try {
    const db = await initDB();

    if (!symbol) {
      return res.status(400).json({ error: "Stock symbol is required." });
    }

    let query = `SELECT * FROM stock_predictions WHERE stock_name = ?`;
    const params = [symbol.toUpperCase()];

    if (model_id) {
      query += ` AND model_id = ?`;
      params.push(Number(model_id));
    }

    query += ` ORDER BY fetched_at DESC LIMIT 10`;

    const predictions = await db.all(query, params);

    if (predictions.length) {
      console.log(`✅ Found ${predictions.length} predictions for ${symbol} using model ${model_id}`);
      res.json(predictions);
    } else {
      console.warn(`⚠️ No predictions found for ${symbol} using model ${model_id}`);
      res.status(404).json({ error: 'No predictions found.' });
    }
  } catch (error) {
    console.error('❌ Error fetching stock prediction:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ NEW: Get latest prediction per stock/model
app.get('/api/predictions', async (req, res) => {
  const db = await initDB();
  try {
    const predictions = await db.all(`
      SELECT * FROM stock_predictions
      WHERE fetched_at IN (
        SELECT MAX(fetched_at)
        FROM stock_predictions
        GROUP BY stock_name, model_id
      )
      ORDER BY stock_name ASC, model_id ASC
    `);
    res.json(predictions);
  } catch (error) {
    console.error('Error fetching predictions:', error.message);
    res.status(500).json({ error: 'Failed to fetch predictions' });
  }
});

// Proxy endpoint for /fetch_data
app.post('/fetch_data', async (req, res) => {
  try {
    const { stock_name } = req.body;
    if (!stock_name) {
      return res.status(400).json({ error: 'stock_name is required' });
    }
    // Proxy the request to the remote ngrok endpoint
    const remoteRes = await axios.post('https://28b041de021c.ngrok-free.app/fetch_data', { stock_name });
    res.json(remoteRes.data);
  } catch (error) {
    console.error('Error proxying /fetch_data:', error.message);
    res.status(502).json({ error: 'Bad gateway', details: error.message });
  }
});


// Auto-fetch on server startup
fetchAndStoreNews();
fetchAndStoreStockPrediction();

// Refresh news every hour, stocks every 5 mins
setInterval(fetchAndStoreNews, 60 * 60 * 1000);
setInterval(() => {
  console.log("⏳ Fetching new stock prediction...");
  fetchAndStoreStockPrediction();
}, 5 * 60 * 1000);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
