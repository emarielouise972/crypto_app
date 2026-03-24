import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { fetchCryptoHistory, ChartDataPoint } from '../api/crypto_api';
import '../styles/Graphiques.css';

interface GraphiqueCryptoProps {
  coinId: string;
  days: number;
}

const GraphiqueCrypto: React.FC<GraphiqueCryptoProps> = ({ coinId, days }) => {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Met à jour les données du graphique au changement d'actif ou de période
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCryptoHistory(coinId, days);
        setChartData(data);
      } catch (err: any) {
        setError(err.message || "Une erreur est survenue");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [coinId, days]); 

  if (loading) return <p className="chart-loading">Chargement du graphique...</p>;
  if (error) return <p className="chart-error">Erreur : {error}</p>;

  return (
    <div className="chart-visual">
      <ResponsiveContainer>
        <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="date" 
            minTickGap={20} 
            className="chart-axis-x" 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            tickFormatter={(value) => `${value.toLocaleString()} €`} 
            className="chart-axis-y"
          />
          <Tooltip 
            formatter={(value: number) => [`${value.toLocaleString()} €`, 'Prix']} 
          />
          <Line 
            type="monotone" 
            dataKey="prix" 
            dot={false} 
            activeDot={{ r: 8 }} 
            className="chart-area-line" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphiqueCrypto;