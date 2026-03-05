import { Coin } from '../types/crypto';

interface CryptoCardProps {
  coin: Coin;
}

export default function CryptoCard({ coin }: CryptoCardProps) {
  const isPositive = coin.price_change_percentage_24h > 0;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '10px', border: '1px solid #444', borderRadius: '8px', marginBottom: '10px' }}>
      <img src={coin.image} alt={coin.name} width={30} height={30} />
      
      <div style={{ flex: 1, textAlign: 'left' }}>
        <strong>{coin.name}</strong> ({coin.symbol.toUpperCase()})
      </div>
      
      <div>
        <strong>{coin.current_price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })}</strong>
      </div>
      
      <div style={{ color: isPositive ? 'green' : 'red', fontWeight: 'bold' }}>
        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
      </div>
    </div>
  );
}