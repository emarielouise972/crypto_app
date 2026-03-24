import { useEffect, useState } from 'react';
import { fetchCryptoList } from '../api/crypto_api';
import { Coin } from '../types/crypto';
import CryptoCard from './CryptoCard';
import '../styles/CryptoList.css';
import GraphiqueCrypto from './Graphiques';

export default function CryptoList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [timeframe, setTimeframe] = useState<number>(7); 
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Périodes de filtrage disponibles pour le graphique (en jours)
  const timeframes = [7, 30, 180, 365];

  // Chargement initial des données du marché
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

  // Ajoute ou retire une cryptomonnaie du tableau des favoris
  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prevFavorites) => 
      prevFavorites.includes(id) 
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    );
  };

  if (isLoading) return <p>Chargement des cryptos...</p>;
  if (error) return <p>{error}</p>;

  const favoriteCoins = coins.filter(coin => favoriteIds.includes(coin.id));

  return (
    <div className="crypto-list-container">
      
      <div className="crypto-sidebar">
        <div className="favorites-section">
          <h2>Favoris</h2>
          {favoriteCoins.length === 0 ? <p>Aucun favori.</p> : null}
          {favoriteCoins.map((coin) => (
            <CryptoCard 
              key={`fav-${coin.id}`} 
              coin={coin} 
              isFavorite={true} 
              onToggleFavorite={handleToggleFavorite} 
              onClick={setSelectedCoin} 
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
              onClick={setSelectedCoin} 
            />
          ))}
        </div>
      </div>

      <div className="crypto-main">
        {selectedCoin ? (
          <div>
            <div className="crypto-header-actions">
              <div>
                <h2>Graphique pour {selectedCoin.name}</h2>
                <p>Prix actuel : {selectedCoin.current_price} €</p>
              </div>
              
              <div className="timeframe-buttons">
                {timeframes.map((days) => (
                  <button
                    key={days}
                    onClick={() => setTimeframe(days)}
                    className={`timeframe-btn ${timeframe === days ? 'active' : ''}`}
                  >
                    {days}J
                  </button>
                ))}
              </div>
            </div>
            
            <div className="crypto-chart-wrapper">
              <GraphiqueCrypto coinId={selectedCoin.id} days={timeframe} />
            </div>
          </div>
        ) : (
          <div className="crypto-placeholder">
            <p>Cliquez sur une cryptomonnaie pour afficher son graphique.</p>
          </div>
        )}
      </div>
    </div>
  );
}