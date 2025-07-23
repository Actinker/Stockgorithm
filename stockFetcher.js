// stockFetcher.js
import axios from 'axios';
import { initDB } from './db.js';
import BASE_URL from './src/config.js';

const MODELS = [
  { path: '/aironix/model_1_prediction', stock_name: 'HDFCBANK', model_id: 1 },
  { path: '/aironix/model_2_prediction', stock_name: 'SBIN', model_id: 2 },
  { path: '/aironix/model_3_prediction', stock_name: 'INFY', model_id: 3 },
  { path: '/aironix/model_4_prediction', stock_name: 'TATAMOTORS', model_id: 4 }
];

export async function fetchAndStoreStockPrediction() {
  try {
    const db = await initDB();

    for (const model of MODELS) {
      const response = await axios.post(`${BASE_URL}${model.path}`, {
        stock_name: model.stock_name,
        model_id: model.model_id
      });

      const data = response.data;
      
      const fetchedAt = data.datetime; // Use the datetime from API

      await db.run(
        `INSERT INTO stock_predictions (stock_name, model_id, current_close, predicted_close, status, fetched_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [data.stock_name, data.model_id, data.current_close, data.predicted_close, data.status, fetchedAt]
      );
      

      console.log(`✅ Stored prediction for ${data.stock_name} (Model ${data.model_id})`);
    }
  } catch (error) {
    console.error('❌ Error fetching stock predictions:', error.message);
  }
}
