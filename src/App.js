// Import useState and useEffect hooks from React
import React, { useState, useEffect } from 'react'

// Import the API category from AWS Amplify
import { API } from 'aws-amplify'
import './App.css';
import { GitHubBorn } from './githubborn';

function App() {
  // Create coins variable and set to empty array
  const [coins, updateCoins] = useState([])
  const [input, updateInput] = useState({ limit: 5, start: 0 })
  const [loading, updateLoading] = useState (true);

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  async function fetchCoins() {
    updateLoading(true);
    const { limit, start } = input
    const data = await API.get('cryptoapi', `/coins?limit=${limit}&start=${start}`)
    updateCoins(data.coins)
    updateLoading(false);
  }

  // Define function to all API

  // Call fetchCoins function when component loads
  useEffect(() => {
    fetchCoins()
  }, [])

  return (
    <div className="App">
      <input
  onChange={e => updateInputValues('limit', e.target.value)}
  placeholder="limit"
/>
<input
  placeholder="start"
  onChange={e => updateInputValues('start', e.target.value)}
/>

<button onClick={fetchCoins}>Fetch Coins</button>
      {loading && <h2> Loading... </h2>}
      {
        !loading && coins.map((coin, index) => (
          <div key={index}>
            <h2>{coin.name} - {coin.symbol}</h2>
            <h5>${coin.price_usd}</h5>
          </div>
          
        ))
        
      }
      <GitHubBorn />
    </div>
  );
}

export default App