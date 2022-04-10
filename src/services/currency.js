const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Host': 'exchangerate-api.p.rapidapi.com',
        'X-RapidAPI-Key': 'ad11cd880dmshd74729d3bb71f70p1c7e75jsndf2df7009d7f'
    }
};

export const currencyConverter = (currency = 'AMD') => fetch(`https://exchangerate-api.p.rapidapi.com/rapid/latest/${currency}`, options)