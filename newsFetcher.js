// newsFetcher.js
import axios from 'axios';
import { initDB } from './db.js';

export async function fetchAndStoreNews() {
  const API_URL = 'https://newsdata.io/api/1/news?apikey=pub_7858689edf401fa65596e3ddbe7ed5ecb0b5f&q=stock%20market&country=in&language=en&category=business';

  const response = await axios.get(API_URL);
  const newsItems = response.data.results || [];

  const db = await initDB();

  for (const item of newsItems.slice(0, 10)) {
    const { title, description, pubDate, link, image_url } = item;

    const exists = await db.get(`SELECT id FROM news WHERE title = ?`, [title]);
    if (!exists) {
      await db.run(
        `INSERT INTO news (title, description, pubDate, link, image) VALUES (?, ?, ?, ?, ?)`,
        [title, description, pubDate, link, image_url || '']
      );
    }
  }

  // Optional: Keep only the latest 20 entries
  await db.run(`DELETE FROM news WHERE id NOT IN (SELECT id FROM news ORDER BY pubDate DESC LIMIT 20)`);
}
