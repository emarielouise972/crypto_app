import { useEffect, useState } from 'react';
import { fetchCryptoList } from '../api/crypto_api';
import { Coin } from '../types/crypto';
import CryptoCard from './CryptoCard';

export default function CryptoList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCryptoList('eur', 10);
        setCoins(data);
      } catch (err) {
        setError("Impossible de charger les données de CoinGecko.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {coins.map((coin) => (
        <CryptoCard key={coin.id} coin={coin} />
      ))}
    </div>
  );
}