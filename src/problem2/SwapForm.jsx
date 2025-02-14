import React from "react";
import { useState, useEffect } from "react";
const SwapForm = () => {
  const [prices, setPrices] = useState([]);
  const [fromToken, setFromToken] = useState("");
  const [toToken, setToToken] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => setPrices(data))
      .catch((err) => console.error("Error fetching prices:", err));
  }, []);

  const handleSwap = () => {
    if (!fromToken || !toToken || !amount) {
      setError("Please select currency and enter valid amount.");
      return;
    }

    const fromPrice = prices.find((token) => token.currency === fromToken)?.price;
    console.log(fromPrice)
    const toPrice = prices.find((token) => token.currency === toToken)?.price;
    
    if (!fromPrice || !toPrice) {
      setError("One of the two currencies has no value.");
      return;
    }

    const rate = fromPrice / toPrice;
    setResult(amount * rate);
    setError("");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Currency Swap</h2>
      <div className="mb-4">
        <label className="block mb-1">Amount:</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">From Currency:</label>
        <select
          className="w-full p-2 border rounded"
          value={fromToken}
          onChange={(e) => setFromToken(e.target.value)}
        >
          <option value="">Select currency</option>
          {prices.map((token) => (
            <option key={token} value={token.currency}>{token.currency}</option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1">To Currency:</label>
        <select
          className="w-full p-2 border rounded"
          value={toToken}
          onChange={(e) => setToToken(e.target.value)}
        >
          <option value="">Chọn loại tiền</option>
          {prices.map((token) => (
            <option key={token.currency} value={token.currency}>{token.currency}</option>
          ))}
        </select>
      </div>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <button
        className="w-full bg-blue-500 text-white p-2 rounded"
        onClick={handleSwap}
      >
        Swap
      </button>
      {result && (
        <p className="mt-4 text-lg font-semibold">
          Will receive: {result.toFixed(6)} {toToken}
        </p>
      )}
    </div>
  );
};

export default SwapForm;