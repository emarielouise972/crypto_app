import { useEffect, useState } from 'react';
import { fetchCryptoList } from '../api/crypto_api';
import { Coin } from '../types/crypto';
import CryptoCard from './CryptoCard';
import GraphiqueCrypto from './Graphiques';

export default function CryptoList() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  
  // NOUVEAU : État pour stocker la période sélectionnée (en jours)
  const [timeframe, setTimeframe] = useState<number>(7); 
  
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

  const favoriteCoins = coins.filter(coin => favoriteIds.includes(coin.id));

  // Tableau des périodes que l'on souhaite afficher
  const timeframes = [7, 30, 180, 365];

  return (
    <div style={{ display: 'flex', width: '100%', gap: '20px' }}>
      
      {/* COLONNE GAUCHE : La liste */}
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

      {/* COLONNE DROITE : La zone du graphique */}
      <div style={{ flex: 1, padding: '20px', display: 'flex', flexDirection: 'column' }}>
        {selectedCoin ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2>Graphique pour {selectedCoin.name}</h2>
                <p>Prix actuel : {selectedCoin.current_price} €</p>
              </div>
              
              {/* NOUVEAU : Les boutons de sélection de période */}
              <div style={{ display: 'flex', gap: '10px' }}>
                {timeframes.map((days) => (
                  <button
                    key={days}
                    onClick={() => setTimeframe(days)}
                    style={{
                      padding: '8px 15px',
                      cursor: 'pointer',
                      // Style conditionnel : bleu si actif, gris si inactif
                      backgroundColor: timeframe === days ? '#007bff' : '#333',
                      color: 'white',
                      border: 'none',
                      borderRadius: '5px',
                      fontWeight: 'bold',
                      transition: 'background-color 0.2s'
                    }}
                  >
                    {days}J
                  </button>
                ))}
              </div>
            </div>
            
            
            <div style={{ height: '40%', width: '100%', border: '1px dashed #667', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px', borderRadius: '8px' }}>
              <GraphiqueCrypto coinId={selectedCoin.id} days={timeframe} />
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
            <p>Cliquez sur une cryptomonnaie pour afficher son graphique.</p>
          </div>
        )}
      </div>

    </div>
  );
}