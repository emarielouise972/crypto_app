import { useEffect, useState } from 'react';
import { fetchCryptoList } from '../api/crypto_api';
import { Coin } from '../types/crypto';
import CryptoCard from './CryptoCard';

export default function CryptoList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]); // Nouvel état pour les favoris
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

  // Fonction pour ajouter ou retirer un favori
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prevFavorites) => 
      prevFavorites.includes(id) 
        ? prevFavorites.filter(favId => favId !== id) // Retire si déjà présent
        : [...prevFavorites, id] // Ajoute sinon
    );
  };

  if (isLoading) return <p>Chargement des cryptos...</p>;
  if (error) return <p>{error}</p>;

  // On isole les cryptos favorites pour la première liste
  const favoriteCoins = coins.filter(coin => favoriteIds.includes(coin.id));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '300px', borderRight: '1px solid white', paddingRight: '10px' }}>
      
      {/* Section Favoris */}
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

      {/* Section Toutes les cryptos */}
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
