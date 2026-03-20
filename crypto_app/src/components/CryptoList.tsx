import { useEffect, useState } from 'react';
import { fetchCryptoList } from '../api/crypto_api';
import { Coin } from '../types/crypto';
import CryptoCard from './CryptoCard';

export default function CryptoList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
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

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  };

  if (isLoading) return <p>Chargement des cryptos...</p>;
  if (error) return <p>{error}</p>;

  // On isole les cryptos favorites pour la première liste
  const favoriteCoins = coins.filter(coin => favoriteIds.includes(coin.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '400px', borderRight: '1px solid white', paddingRight: '10px' }}>

      <div style={{ marginBottom: '20px' }}>
        <h2>Favoris</h2>
        {favoriteCoins.length === 0 ? <p>Aucun favori.</p> : null}
        {favoriteCoins.map((coin) => (
          <CryptoCard
            key={`fav-${coin.id}`}
            coin={coin}
            isFavorite={true}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>

      <hr />

      <div>
        <h2>Toutes cryptos</h2>
        {coins.map((coin) => (
          <CryptoCard
            key={`all-${coin.id}`}
            coin={coin}
            isFavorite={favoriteIds.includes(coin.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
