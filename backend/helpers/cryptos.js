const axios = require('axios');

const getCryptos = async () => {
    const apiKey = process.env.API_KEY;
    const { data: { Data } } = await axios.get(`https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD&api_key=${ apiKey }`);

    let cryptos = {};

    Data.forEach( crypto => {
        const { Name, FullName } = crypto.CoinInfo;
        const { PRICE } = crypto.RAW.USD;
        cryptos[Name] = {
            name: Name,
            fullname: FullName,
            priceUsd: PRICE
        }
    });

    return cryptos;
}

module.exports = {
    getCryptos
}