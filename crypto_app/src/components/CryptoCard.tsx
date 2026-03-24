import { Coin } from '../types/crypto';
import '../styles/CryptoCard.css';

interface CryptoCardProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (coin: Coin) => void;
}

export default function CryptoCard({ coin, isFavorite, onToggleFavorite, onClick }: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    // La carte entière est cliquable pour afficher le graphique détaillé
    <div className="crypto-card" onClick={() => onClick(coin)}>
      
      <img src={coin.image} alt={coin.name} width={30} height={30} />
      
      <div className="crypto-card-name">
        <strong>{coin.name}</strong> <span className="crypto-card-symbol">({coin.symbol.toUpperCase()})</span>
      </div>
      
      <div className="crypto-card-price">
        <strong>{coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
      </div>
      
      <div className={`crypto-card-percentage ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>  

      <div className="crypto-card-action">
        <button 
          className="crypto-card-btn"
          onClick={(e) => {
            // Empêche le clic sur le bouton d'interférer avec le onClick de la carte globale
            e.stopPropagation();
            onToggleFavorite(coin.id);
          }}
        >
          {isFavorite ? '-' : '+'}
        </button>
      </div>
    </div>
  );
}