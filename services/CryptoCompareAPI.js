import axios from 'axios';

class CryptoCompareAPI {

    static getCurrencies(localCurrency, favorites) {
        return axios.get( this.getUrl(localCurrency, favorites ));
    }

    static getUrl(localCurrency, favorites){
        let fsysm = [];
        for(let i = 0; i < favorites.length; i++){
            fsysm.push(favorites[i].Symbol)
        }
        return `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${ fsysm.join() }&tsyms=${localCurrency}`;
    }
}

export default CryptoCompareAPI;