import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import CryptoList from './components/CryptoList'
import GraphiqueCrypto from './components/Graphiques'

function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex', gap: '20px', padding: '20px', marginTop: '100px' }}>
        
        <div>
          <CryptoList />
        </div>

        <div style={{ flex: 1 }}>
        </div>
        
      </div>
    </> 
  )
}

export default App;