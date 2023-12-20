import React from 'react';

const CurrencyInputComponent = ({
                                    amount,
                                    fromCurrency,
                                    handleAmountChange,
                                    handleCurrencyChange,
                                    label,
                                }) => {
    return (
        <div>
            <label htmlFor="given">{label}</label>
            <div className="input-container">
                <input
                    type="number"
                    value={amount}
                    id="given"
                    onChange={handleAmountChange}
                />
                <select value={fromCurrency} onChange={handleCurrencyChange}>
                    <option value="UAH">UAH</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                </select>
            </div>
        </div>
    );
};

export default CurrencyInputComponent;
