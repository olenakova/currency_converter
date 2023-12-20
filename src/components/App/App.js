import React, { useState, useEffect } from 'react';
import { useHttp } from "../../hooks/http.hook";
import CurrencyRatesComponent from "../CurrencyRatesComponent/CurrencyRatesComponent";
import CurrencyInputComponent from "../CurrencyInputComponent/CurrencyInputComponent";
import './App.css';

const App = () => {
  const { currencyRates, exchangeRatesDate } = useHttp();
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleAmountAndCurrencyChange = (value, type) => {
    if (type === 'amount') {
      setAmount(value);
    } else if (type === 'fromCurrency') {
      setFromCurrency(value);
    } else if (type === 'toCurrency') {
      setToCurrency(value);
    }
  };

  const convertCurrency = () => {
    if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
      const converted = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
      setConvertedAmount(converted.toFixed(2));
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, currencyRates]);

  return (
      <div className="currency-converter">
        <h2>Конвертер валют</h2>
        <CurrencyRatesComponent exchangeRatesDate={exchangeRatesDate} currencyRates={currencyRates} />
        <div className="converter-container">
          <div>
            <CurrencyInputComponent
                amount={amount}
                fromCurrency={fromCurrency}
                handleAmountChange={(e) => handleAmountAndCurrencyChange(e.target.value, 'amount')}
                handleCurrencyChange={(e) => handleAmountAndCurrencyChange(e.target.value, 'fromCurrency')}
                label="Міняю"
            />
          </div>
          <div>
            <CurrencyInputComponent
                amount={convertedAmount}
                fromCurrency={toCurrency}
                handleAmountChange={() => {}}
                handleCurrencyChange={(e) => handleAmountAndCurrencyChange(e.target.value, 'toCurrency')}
                label="Отримую"
            />
          </div>
        </div>
      </div>
  );
};

export default App;
