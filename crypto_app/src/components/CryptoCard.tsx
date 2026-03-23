import { Coin } from '../types/crypto';
import '../styles/CryptoCard.css'; // Import du fichier CSS

interface CryptoCardProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (coin: Coin) => void;
}

export default function CryptoCard({ coin, isFavorite, onToggleFavorite, onClick }: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div className="crypto-card" onClick={() => onClick(coin)}>
      
      {/* 1ère colonne : Image */}
      <img src={coin.image} alt={coin.name} width={30} height={30} />
      
      {/* 2ème colonne : Nom */}
      <div className="crypto-card-name">
        <strong>{coin.name}</strong> <span className="crypto-card-symbol">({coin.symbol.toUpperCase()})</span>
      </div>
      
      {/* 3ème colonne : Prix */}
      <div className="crypto-card-price">
        <strong>{coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
      </div>
      
      {/* 4ème colonne : Pourcentage */}
      <div className={`crypto-card-percentage ${isPositive ? 'positive' : 'negative'}`}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>  

      {/* 5ème colonne : Bouton */}
      <div className="crypto-card-action">
        <button 
          className="crypto-card-btn"
          onClick={(e) => {
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