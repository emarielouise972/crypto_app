import { Coin } from '../types/crypto';

const BASE_URL = 'https://api.coingecko.com/api/v3';

interface ChartData {
  prices: number[][];
};
interface FormattedData {
  date: string;
  price: number;
}
const LOCAL_SERVER_URL = 'http://localhost:3001/api';
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

export interface ChartDataPoint {
  date: string;
  prix: number;
}

export const fetchCryptoHistory = async (
  coinId: string, 
  days: number
): Promise<ChartDataPoint[]> => {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=eur&days=${days}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Erreur lors de la récupération des données pour ${coinId}`);
  }

  const data = await response.json();

  // CoinGecko renvoie un tableau de tableaux de nombres : [[timestamp, prix], [timestamp, prix], ...]
  // On type 'item' explicitement comme un tuple de deux nombres
  const formattedData: ChartDataPoint[] = data.prices.map((item: [number, number]) => {
    const date = new Date(item[0]);
    return {
      date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' }),
      prix: item[1]
    };
  });

  return formattedData;
};


