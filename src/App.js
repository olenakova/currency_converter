import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [currencyRates, setCurrencyRates] = useState({});
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [exchangeRatesDate, setExchangeRatesDate] = useState('');

  useEffect(() => {
    fetch('https://api.exchangerate-api.com/v4/latest/UAH')
        .then(response => response.json())
        .then(data => {
          setCurrencyRates(data.rates);
          setExchangeRatesDate(formatDate(new Date(data.date)));
        })
        .catch(error => {
          console.error('Помилка при отриманні курсу валют:', error);
        });
  }, []);

  useEffect(() => {
    if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
      const converted = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
      setConvertedAmount(converted);
    }
  }, [amount, fromCurrency, toCurrency, currencyRates]);

  const formatDate = date => {
    const formatter = new Intl.DateTimeFormat('uk', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formatter.format(date);
  };

  const formatCurrency = (currencyCode, amount) => {
    const formatter = new Intl.NumberFormat('uk', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
    });
    return formatter.format(amount);
  };

  const handleFromAmountChange = e => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value);
  };

  return (
      <div className="currency-converter">

        <h2>Конвертер валют</h2>

        <div className="actual">
          <h3>На {exchangeRatesDate}:</h3>
          <h3>1 USD = {formatCurrency('UAH', 1 / currencyRates['USD'])} |
            1 EUR = {formatCurrency('UAH', 1 / currencyRates['EUR'])}</h3>
        </div>

        <div className="converter-container">
          <div>
            <label form="given">Міняю</label>
            <div className="input-container">
              <input type="number" value={amount} id="given" onChange={handleFromAmountChange} />
              <select value={fromCurrency} onChange={handleFromCurrencyChange}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>

          <div>
            <label form="received">Отримую</label>
            <div className="input-container">
              <input type="text" value={convertedAmount.toFixed(2)}  id="received" readOnly />
              <select value={toCurrency} onChange={handleToCurrencyChange}>
                <option value="UAH">UAH</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
