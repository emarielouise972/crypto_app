import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import CryptoList from './components/CryptoList'
import GraphiqueCrypto from './components/Graphiques'

function App() {
  return (
    <>
      <Header />
      <CryptoList />
      <GraphiqueCrypto coinId="bitcoin" days={7} />
    </> 
  )
}

export default App;