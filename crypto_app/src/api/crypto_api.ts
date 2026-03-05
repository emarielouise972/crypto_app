import { Coin } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

// Fonction pour récupérer la liste des cryptos (par défaut : en euros, top 10)
export const fetchCryptoList = async (currency: string = 'eur', limit: number = 10): Promise<Coin[]> => {
  try {
    const response = await fetch(
      `${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
    );
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data: Coin[] = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des cryptos :", error);
    throw error;
  }
};