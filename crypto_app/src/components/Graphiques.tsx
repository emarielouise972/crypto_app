// graphiques.tsx
import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// On importe la fonction et le type depuis notre fichier API
import { fetchCryptoHistory, ChartDataPoint } from '../api/crypto_api';

// On définit les types pour les props du composant
interface GraphiqueCryptoProps {
  coinId: string;
  days: number;
}

const GraphiqueCrypto: React.FC<GraphiqueCryptoProps> = ({ coinId, days }) => {
  // On indique à TypeScript que chartData sera un tableau de ChartDataPoint
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null); // On réinitialise l'erreur au cas où

      try {
        // On appelle notre fonction externe
        const data = await fetchCryptoHistory(coinId, days);
        setChartData(data);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [coinId, days]); // Se déclenche à chaque changement de crypto ou de durée

  if (loading) return <p>Chargement du graphique...</p>;
  if (error) return <p style={{ color: 'red' }}>Erreur : {error}</p>;

  return (
    <div style={{ width: '100%', height: 400, marginTop: '20px' }}>
      <h3 style={{ textTransform: 'capitalize', textAlign: 'center' }}>
        Évolution du {coinId} sur {days} jours
      </h3>
      
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" minTickGap={20} />
          <YAxis 
            domain={['auto', 'auto']} 
            tickFormatter={(value) => `${value.toLocaleString()} €`} 
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString()} €`, 'Prix']} 
            labelStyle={{ color: 'black' }}
          />
          <Line 
            type="monotone" 
            dataKey="prix" 
            stroke="#8884d8" 
            strokeWidth={2} 
            dot={false} 
            activeDot={{ r: 8 }} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphiqueCrypto;