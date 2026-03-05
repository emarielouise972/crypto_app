import CryptoList from './components/CryptoList';
import './App.css';

function App() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Dashboard Crypto 🚀</h1>
      
      {/* On appelle simplement notre composant liste ici */}
      <CryptoList />
      
    </div>
  );
}

export default App;