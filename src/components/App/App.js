import React, { useState, useEffect } from 'react';
import {useHttp} from "../../hooks/http.hook";
import CurrencyRatesComponent from "../CurrencyRatesComponent/CurrencyRatesComponent";
import CurrencyInputComponent from "../CurrencyInputComponent/CurrencyInputComponent";
import './App.css';

const App = () => {
  const { currencyRates, exchangeRatesDate } = useHttp();
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [toCurrency, setToCurrency] = useState('USD');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleFromAmountChange = e => {
    setAmount(e.target.value);
  };

  const handleFromCurrencyChange = e => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencyChange = e => {
    setToCurrency(e.target.value);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const convertCurrency = () => {
    if (currencyRates[fromCurrency] && currencyRates[toCurrency]) {
      const converted = (amount / currencyRates[fromCurrency]) * currencyRates[toCurrency];
      setConvertedAmount(converted.toFixed(2));
    }
  };

  useEffect(() => {
    convertCurrency();
  }, [amount, fromCurrency, toCurrency, currencyRates, convertCurrency]);

  return (
      <div className="currency-converter">
        <h2>Конвертер валют</h2>
        <CurrencyRatesComponent exchangeRatesDate={exchangeRatesDate} currencyRates={currencyRates} />
        <div className="converter-container">
          <div>
            <CurrencyInputComponent
                amount={amount}
                fromCurrency={fromCurrency}
                handleAmountChange={handleFromAmountChange}
                handleCurrencyChange={handleFromCurrencyChange}
                label="Міняю"
            />
          </div>
          <div>
            <CurrencyInputComponent
                amount={convertedAmount}
                fromCurrency={toCurrency}
                handleAmountChange={() => {}}
                handleCurrencyChange={handleToCurrencyChange}
                label="Отримую"
            />
          </div>
        </div>
      </div>
  );
};

export default App;

