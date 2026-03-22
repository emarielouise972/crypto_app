import { Coin } from '../types/crypto';

interface CryptoCardProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClick: (coin: Coin) => void; // NOUVEAU : On ajoute la fonction au typage
}

export default function CryptoCard({ coin, isFavorite, onToggleFavorite, onClick }: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div 
      onClick={() => onClick(coin)} // NOUVEAU : Rend la carte cliquable
      style={{ 
        display: 'grid', 
        gridTemplateColumns: '40px 1fr 100px 80px 40px', 
        alignItems: 'center', 
        gap: '15px', 
        padding: '10px 15px', 
        border: '1px solid #444', 
        borderRadius: '8px', 
        marginBottom: '10px',
        width: '100%',
        boxSizing: 'border-box',
        cursor: 'pointer' // NOUVEAU : Change la souris en main
      }}>
      
      {/* 1ère colonne : Image */}
      <img src={coin.image} alt={coin.name} width={30} height={30} />
      
      {/* 2ème colonne : Nom */}
      <div style={{ textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        <strong>{coin.name}</strong> <span style={{fontSize: '0.8em', color: '#aaa'}}>({coin.symbol.toUpperCase()})</span>
      </div>
      
      {/* 3ème colonne : Prix */}
      <div style={{ textAlign: 'right' }}>
        <strong>{coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
      </div>
      
      {/* 4ème colonne : Pourcentage */}
      <div style={{ textAlign: 'right', color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
      </div>

      {/* 5ème colonne : Bouton */}
      <div style={{ textAlign: 'right' }}>
        <button 
          onClick={(e) => {
            e.stopPropagation(); // TRÈS IMPORTANT : Empêche d'activer le clic de la carte quand on clique sur le bouton
            onToggleFavorite(coin.id);
          }}
          style={{ 
            cursor: 'pointer', 
            padding: '5px', 
            width: '35px',
            height: '35px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {isFavorite ? '-' : '+'}
        </button>
      </div>

    </div>
  );
}