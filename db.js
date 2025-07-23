// db.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function clearStockPredictions() {
  const db = await initDB();
  await db.run(`DELETE FROM stock_predictions;`);
  console.log("Cleared stock_predictions table.");
}

export async function initDB() {
  const db = await open({
    filename: path.join(__dirname, 'news.sqlite'),
    driver: sqlite3.Database,
  });


  await db.exec(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      pubDate TEXT,
      link TEXT,
      image TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS stock_predictions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stock_name TEXT,
      model_id INTEGER,
      current_close REAL,
      predicted_close REAL,
      status TEXT,
      fetched_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
}
