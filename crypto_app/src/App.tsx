import './App.css'
import Header from './components/Header'
import CryptoList from './components/CryptoList'

function App() {
  return (
    <>
      <Header />
      <div className="main-content">
        <div>
          <CryptoList />
        </div>
      </div>
    </> 
  )
}

export default App;