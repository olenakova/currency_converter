import {useState, useEffect} from "react";

export const useHttp = () => {
    const [currencyRates, setCurrencyRates] = useState({});
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

    const formatDate = date => {
        const formatter = new Intl.DateTimeFormat('uk', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
        return formatter.format(date);
    };

    return {currencyRates, exchangeRatesDate};
}
