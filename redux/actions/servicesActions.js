import Geolocation from "../../services/Geolocation";
import OpenCagedataAPI from "../../services/OpenCagedataAPI";
import CryptoCompareAPI from '../../services/CryptoCompareAPI';
import Storage from '../../services/Storage';

import {CHANGES_LIST, FAVORITES_INIT,CURRENCIES_INIT } from "./ChangeActions";

export const POSITION_INIT = 'POSITION_INIT';
export const CURRENCY_INIT = 'CURRENCY_INIT';


export const setCurrency = (favorites) => {
    return dispatch => {
        Geolocation.getCurrentPosition().then( (position) => {
            OpenCagedataAPI.getCurrencyByPossition(position.coords.latitude, position.coords.longitude).then((resp) => {
                dispatch({ type: CURRENCY_INIT, payload: resp });
                Storage.getDataFromStorage().then((data) => {
                    favorites = JSON.parse(data);
                    CryptoCompareAPI.getCurrencies(resp.change, favorites).then((response) => {
                        let data = [];
                        let i = 0;
                        for (let key in response.data.RAW) {
                            let fa = favorites.find(item => item.Symbol === key );
                            let change = {
                                COINNAME: fa.CoinName,
                                SYMBOL : key,
                                CHANGE24HOUR: (parseInt(response.data.RAW[favorites[i].Symbol][resp.change].CHANGE24HOUR, 10) / 100).toFixed(2),
                                OPEN24HOUR: response.data.RAW[favorites[i].Symbol][resp.change].OPEN24HOUR + ' ' + resp.symbol,
                                LASTUPDATE: response.data.RAW[favorites[i].Symbol][resp.change].LASTUPDATE,
                                PRICE: response.data.RAW[favorites[i].Symbol][resp.change].PRICE + ' ' + resp.symbol,
                                LOW24HOUR: response.data.RAW[favorites[i].Symbol][resp.change].LOW24HOUR + ' ' + resp.symbol,
                                HIGH24HOUR: response.data.RAW[favorites[i].Symbol][resp.change].HIGH24HOUR + ' ' + resp.symbol,
                                IMAGEURL: 'https://www.cryptocompare.com' + response.data.RAW[favorites[i].Symbol][resp.change].IMAGEURL
                            };
                            data.push(change);
                            i++;
                        }
                        return dispatch({ type: CHANGES_LIST, payload: data });
                    })

                });

            });
        });
    };
};

export const getFavorites = (msg) => {
    return dispatch => {
        Storage.getDataFromStorage().then((data) => {
            if( data == null ) {
                let favoritesData = require('../../assets/Favorites');
                Storage.setDataInStorage('favorites', JSON.stringify(favoritesData)).then(() => {
                    dispatch({ type: FAVORITES_INIT, payload: favoritesData });
                })
            } else {
                dispatch({ type: FAVORITES_INIT, payload: JSON.parse(data) });
            }
        })
    }
};

export const SaveFavorites = (favorites) => {
    return dispatch => {
        Storage.setDataInStorage('favorites', JSON.stringify(favorites)).then(() => {
            dispatch({ type: FAVORITES_INIT, payload: favorites });
        })
    }
};

export const AddToFavorites = (favorites) => {
    return dispatch => {
        Storage.setDataInStorage('favorites', JSON.stringify(favorites)).then(() => {
            dispatch({ type: FAVORITES_INIT, payload: favorites });
        })
    }
};

export const CurrenciesInit = () => {
    return dispatch => {
        let cryptoCurrencies = require('../../assets/cryptoCurrencies');
        dispatch({ type: CURRENCIES_INIT, payload: cryptoCurrencies });
    }
};
