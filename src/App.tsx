import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [shares, setShares] = useState<number[]>([]);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [netPresentValue, setNetPresentValue] = useState<number>(0);

  useEffect(() => {
    // Calculate Net Present Value whenever input values change
    let npv = 0;
    for (let i = 0; i < shares.length; i++) {
      npv += shares[i] / Math.pow(1 + discountRate, i + 1);
    }
    setNetPresentValue(-1 * totalAmount + npv);
  }, [totalAmount, shares, discountRate]);

  const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalAmount(parseInt(event.target.value));
  };

  const handleSharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newShares = [];
    for (let i = 0; i < parseInt(event.target.value); i++) {
      newShares.push(0);
    }
    setShares(newShares);
  };

  const handleDiscountRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(parseInt(event.target.value));
  };

  const handleShareAmountChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newShares = [...shares];
    newShares[index] = parseInt(event.target.value);
    setShares(newShares);
  };


  return (

    <div>
      <h1>Net Present Value Calculator</h1>
      <form>
        <label>Total Amount:</label>
        <input type="number" value={totalAmount} onChange={handleTotalAmountChange} />
        <br />
        <label>Number of Shares:</label>
        <input type="number" value={shares.length} onChange={handleSharesChange} />
        <br />
        <label>Discount Rate:</label>
        <input type="number" value={discountRate} onChange={handleDiscountRateChange} />
        <br />
        {shares.map((share, index) => (
          <div key={index}>
            <label>Share {index + 1}:</label>
            <input type="number" value={share} onChange={(event) => handleShareAmountChange(event, index)} />
          </div>
        ))}
        <br />
        <button type="button">Calculate</button>
      </form>
      <div>
        <h2>Net Present Value: {netPresentValue}</h2>
      </div>
    </div>
      
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
  );
}

export default App;
