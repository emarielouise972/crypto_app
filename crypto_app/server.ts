// server.ts
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors()); // Supprime l'erreur CORS que tu vois dans la console

app.get('/api/chart/:coinId', async (req, res) => {
  try {
    const { coinId } = req.params;
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=7&interval=daily`);
    const data = await response.json();

    const formatted = data.prices.map(([timestamp, price]: [number, number]) => ({
      date: new Date(timestamp).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      price: Number(price.toFixed(2))
    }));

    res.json(formatted);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération" });
  }
});

// Ajoute aussi la liste pour éviter le CORS sur CryptoList.tsx
app.get('/api/coins', async (req, res) => {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=1');
    const data = await response.json();
    res.json(data);
});

app.listen(3001, () => console.log("🚀 Backend prêt sur le port 3001"));