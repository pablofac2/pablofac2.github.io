import React, { useState } from 'react';
import './App.css';

interface NPVBlock {
  id: number;
  totalAmount: number;
  monthlyShares: number;
  discountRate: number;
  netPresentValue?: number;
}

interface DiscountRateBlock {
  id: number;
  originalCost: number;
  monthlyShares: number;
  shareCost: number;
  discountRate?: number;
}

interface Props {}

const App: React.FC<Props> = () => {
  const [npvBlocks, setNPVBlocks] = useState<NPVBlock[]>([]);
  const [discountRateBlocks, setDiscountRateBlocks] = useState<DiscountRateBlock[]>([]);

  const handleAddNPVBlock = () => {
    const newBlock: NPVBlock = {
      id: Date.now(),
      totalAmount: 0,
      monthlyShares: 0,
      discountRate: 0,
    };
    setNPVBlocks([...npvBlocks, newBlock]);
  };

  const handleAddDiscountRateBlock = () => {
    const newBlock: DiscountRateBlock = {
      id: Date.now(),
      originalCost: 0,
      monthlyShares: 0,
      shareCost: 0,
    };
    setDiscountRateBlocks([...discountRateBlocks, newBlock]);
  };

  const handleNPVBlockChange = (id: number, fieldName: string, value: number) => {
    const updatedBlocks = npvBlocks.map((block) =>
      block.id === id ? { ...block, [fieldName]: value } : block
    );
    setNPVBlocks(updatedBlocks);
  };

  const handleDiscountRateBlockChange = (id: number, fieldName: string, value: number) => {
    const updatedBlocks = discountRateBlocks.map((block) =>
      block.id === id ? { ...block, [fieldName]: value } : block
    );
    setDiscountRateBlocks(updatedBlocks);
  };

  const calculateNPV = (block: NPVBlock) => {
    const presentValue = block.totalAmount / block.monthlyShares;
    let npv = presentValue;
    for (let i = 1; i <= block.monthlyShares; i++) {
      npv += presentValue / Math.pow(1 + block.discountRate / 12, i);
    }
    return npv;
  };

  const calculateDiscountRate = (block: DiscountRateBlock) => {
    const presentValue = block.originalCost / block.monthlyShares;
    const futureValue = block.shareCost;
    const periods = block.monthlyShares;
    const discountRate = (Math.pow(futureValue / presentValue, 1 / periods) - 1) * 12;
    return discountRate;
  };

  const handleCalculateNPV = (id: number) => {
    const updatedBlocks = npvBlocks.map((block) =>
      block.id === id ? { ...block, netPresentValue: calculateNPV(block) } : block
    );
    setNPVBlocks(updatedBlocks);
  };

  const handleCalculateDiscountRate = (id: number) => {
    const updatedBlocks = discountRateBlocks.map((block) =>
      block.id === id ? { ...block, discountRate: calculateDiscountRate(block) } : block
    );
    setDiscountRateBlocks(updatedBlocks);
  };

  return (
    <div className={'block-container'}>
      <button onClick={handleAddNPVBlock}>Add NPV Calculation Block</button>
      <button onClick={handleAddDiscountRateBlock}>Add Discount Rate Calculation Block</button>

      {npvBlocks.map((block) => (
        <div key={block.id} className={'block-container'}>
          <h3>NPV Calculation Block</h3>
          <label>
            Total Amount:
            <input
              type="number"
              value={block.totalAmount}
              onChange={(e) => handleNPVBlockChange(block.id, 'totalAmount', +e.target.value)}
            />
          </label>
          <br />
          <label>
            Monthly Shares:
            <input
              type="number"
              value={block.monthlyShares}
              onChange={(e) => handleNPVBlockChange(block.id, 'monthlyShares', +e.target.value)}
            />
          </label>
          <br />
          <label>
            Discount Rate:
            <input
              type="number"
              value={block.discountRate}
              onChange={(e) => handleNPVBlockChange(block.id, 'discountRate', +e.target.value)}
            />
          </label>
          <br />
          <button onClick={() => handleCalculateNPV(block.id)}>Calculate NPV</button>
          {block.netPresentValue && <p>Net Present Value: {block.netPresentValue.toFixed(2)}</p>}
        </div>
      ))}

      {discountRateBlocks.map((block) => (
        <div key={block.id} className={'block-container'}>
          <h3>Discount Rate Calculation Block</h3>
          <label>
            Original Cost:
            <input
              type="number"
              value={block.originalCost}
              onChange={(e) =>
                handleDiscountRateBlockChange(block.id, 'originalCost', +e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Monthly Shares:
            <input
              type="number"
              value={block.monthlyShares}
              onChange={(e) =>
                handleDiscountRateBlockChange(block.id, 'monthlyShares', +e.target.value)
              }
            />
          </label>
          <br />
          <label>
            Share Cost:
            <input
              type="number"
              value={block.shareCost}
              onChange={(e) =>
                handleDiscountRateBlockChange(block.id, 'shareCost', +e.target.value)
              }
            />
          </label>
          <br />
          <button onClick={() => handleCalculateDiscountRate(block.id)}>Calculate Discount Rate</button>
          {block.discountRate && <p>Discount Rate: {(block.discountRate * 100).toFixed(2)}%</p>}
        </div>
      ))}
    </div>
  );
}

export default App;



/*
import React, { useState } from 'react';

interface CalculationBlock {
  id: number;
  totalAmount: number;
  monthlyShares: number;
  discountRate: number;
  netPresentValue?: number;
}

interface Props {}

const App: React.FC<Props> = () => {
  const [blocks, setBlocks] = useState<CalculationBlock[]>([]);

  const handleAddBlock = () => {
    const newBlock: CalculationBlock = {
      id: Date.now(),
      totalAmount: 0,
      monthlyShares: 0,
      discountRate: 0,
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockChange = (id: number, fieldName: string, value: number) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, [fieldName]: value } : block
    );
    setBlocks(updatedBlocks);
  };

  const calculateNPV = (block: CalculationBlock) => {
    const presentValue = block.totalAmount / block.monthlyShares;
    let npv = presentValue;
    for (let i = 1; i <= block.monthlyShares; i++) {
      npv += presentValue / Math.pow(1 + block.discountRate / 12, i);
    }
    return npv;
  };

  const handleCalculate = (id: number) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, netPresentValue: calculateNPV(block) } : block
    );
    setBlocks(updatedBlocks);
  };

  return (
    <div>
      <button onClick={handleAddBlock}>Add Calculation Block</button>
      {blocks.map((block) => (
        <div key={block.id}>
          <label>Total Amount:</label>
          <input
            type="number"
            value={block.totalAmount}
            onChange={(event) => handleBlockChange(block.id, 'totalAmount', Number(event.target.value))}
          />
          <br />
          <label>Monthly Shares:</label>
          <input
            type="number"
            value={block.monthlyShares}
            onChange={(event) => handleBlockChange(block.id, 'monthlyShares', Number(event.target.value))}
          />
          <br />
          <label>Discount Rate:</label>
          <input
            type="number"
            value={block.discountRate}
            onChange={(event) => handleBlockChange(block.id, 'discountRate', Number(event.target.value))}
          />
          <br />
          <button onClick={() => handleCalculate(block.id)}>Calculate NPV</button>
          {block.netPresentValue !== undefined && (
            <p>Net Present Value: {block.netPresentValue.toFixed(2)}</p>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default App;

*/






/*import React, { useState } from 'react';

interface NPVProps {}

const NPV: React.FC<NPVProps> = () => {
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [monthlyShares, setMonthlyShares] = useState<number>(0);
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [netPresentValue, setNetPresentValue] = useState<number | undefined>(
    undefined
  );

  const handleTotalAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTotalAmount(Number(event.target.value));
  };

  const handleMonthlySharesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMonthlyShares(Number(event.target.value));
  };

  const handleDiscountRateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDiscountRate(Number(event.target.value));
  };

  const calculateNPV = () => {
    const presentValue = totalAmount / monthlyShares;
    let npv = presentValue;
    for (let i = 1; i <= monthlyShares; i++) {
      npv += presentValue / Math.pow(1 + discountRate / 12, i);
    }
    setNetPresentValue(npv);
  };

  return (
    <div>
      <label>Total Amount:</label>
      <input type="number" value={totalAmount} onChange={handleTotalAmountChange} step="0.01"/>
      <br />
      <label>Monthly Shares:</label>
      <input type="number" value={monthlyShares} onChange={handleMonthlySharesChange} />
      <br />
      <label>Discount Rate:</label>
      <input type="number" value={discountRate} onChange={handleDiscountRateChange} step="0.01"/>
      <br />
      <button onClick={calculateNPV}>Calculate NPV</button>
      <br />
      {netPresentValue !== undefined && <p>Net Present Value: {netPresentValue.toFixed(2)}</p>}
    </div>
  );
};

export default NPV;
*/






/*
import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {*/

  /*
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
      */
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


/*
  );
}

export default App;*/
