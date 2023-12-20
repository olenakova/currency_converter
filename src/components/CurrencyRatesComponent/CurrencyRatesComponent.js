import React from "react";

const CurrencyRatesComponent = ({exchangeRatesDate, currencyRates}) => {
    const formatCurrency = (currencyCode, amount) => {
        const formatter = new Intl.NumberFormat('uk', {
            style: 'currency',
            currency: currencyCode,
            minimumFractionDigits: 2,
        });
        return formatter.format(amount);
    };

    return (
        <div className="actual">
            <h3>На {exchangeRatesDate}:</h3>
            <h3>1 USD = {formatCurrency('UAH', 1 / currencyRates['USD'])} |
                1 EUR = {formatCurrency('UAH', 1 / currencyRates['EUR'])}</h3>
        </div>
    );
};

export default CurrencyRatesComponent;
