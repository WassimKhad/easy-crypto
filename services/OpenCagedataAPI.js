import axios from 'axios';

class OpenCagedataAPI {

    static getCurrencyByPossition(latitude, longitude) {
        return axios.get( this.getUrl(latitude, longitude) ).then((resp) => {

            // Default value
            let response = {
                change  : 'USD',
                country : 'USA',
                symbol : '$',
            };

            if(resp.data.status.code == '200'){
                response = {
                    change  : resp.data.results[0].annotations.currency.iso_code,
                    country : resp.data.results[0].components.country_code,
                    symbol : resp.data.results[0].annotations.currency.symbol,
                };
            }

            return response;
        });
    }

    static getUrl(latitude, longitude){
        let key = 'b5294974e03340b9928aebd1810b03f8';
        return `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${key}&language=fr&pretty=1`;
    }

}

export default OpenCagedataAPI;