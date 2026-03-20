import { Coin } from '../types/crypto';

interface CryptoCardProps {
  coin: Coin;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export default function CryptoCard({ coin, isFavorite, onToggleFavorite }: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div style={{ 
      display: 'grid', 
      /* On remplace les 'auto' par 100px et 70px pour forcer l'alignement vertical */
      gridTemplateColumns: '30px 1fr 100px 70px 30px', 
      alignItems: 'center', 
      gap: '10px', 
      padding: '10px', 
      border: '1px solid #444', 
      borderRadius: '8px', 
      marginBottom: '10px',
      width: '100%',
      boxSizing: 'border-box' 
    }}>
      
      {/* 1ère colonne : Image */}
      <img src={coin.image} alt={coin.name} width={30} height={30} />
      
      {/* 2ème colonne : Nom et Symbole */}
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', paddingRight: '5px', overflow: 'hidden' }}>
        <strong style={{ fontSize: '0.95em', lineHeight: '1.2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {coin.name}
        </strong>
        <span style={{ fontSize: '0.8em', color: '#aaa', textTransform: 'uppercase' }}>
          {coin.symbol}
        </span>
      </div>
      
      {/* 3ème colonne : Prix */}
      <div style={{ textAlign: 'right', fontSize: '0.9em' }}>
        <strong>{coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
      </div>
      
      {/* 4ème colonne : Pourcentage */}
      <div style={{ textAlign: 'right', fontSize: '0.9em', color: isPositive ? '#4caf50' : '#f44336', fontWeight: 'bold' }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h?.toFixed(2)}%
      </div>

      {/* 5ème colonne : Bouton */}
      <button 
        onClick={() => onToggleFavorite(coin.id)}
        style={{ 
          cursor: 'pointer', 
          padding: '0', 
          width: '28px', 
          height: '28px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: 'auto'
        }}
      >
        {isFavorite ? '-' : '+'}
      </button>

    </div>
  );
}