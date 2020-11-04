import {CHANGES_ADD, CHANGES_DELETE, CHANGES_LIST, FAVORITES_INIT, FAVORITES_SAVE, DELETE_FAVORITE, TOGGLE_FAVORITE, FAVORITES_LIST, CURRENCIES_INIT} from '../actions/ChangeActions';
import {CURRENCY_INIT} from "../actions/servicesActions";
import { SaveFavorites } from '../actions/servicesActions'

const INITIAL_STATE = {
    changes: [],
    favorites: [],
    localCurrency: {
        change  : null,
        country : null,
        symbol : null,
    },
    cryptoCurrencies:[]
};

export default (state = INITIAL_STATE, action) => {
    let nextState;
    let favoriteIndex = -1;

    switch (action.type) {
        case CURRENCIES_INIT:
            nextState = {
                ...state,
                cryptoCurrencies: action.payload
            };
            return nextState;

        case CURRENCY_INIT:
            nextState = {
                ...state,
                localCurrency: action.payload
            };
            return nextState;

        case CHANGES_ADD:
            /*nextState = {
                ...state,
                changes: [...state.changes, action.changes ]
            };*/

            return state;

        case CHANGES_DELETE:
            alert('CHANGES_DELETE -> OK');
            break;
        case CHANGES_LIST:
            nextState = {
                ...state,
                changes: action.payload
            };
            return nextState;

        case FAVORITES_INIT:
            nextState = {
                ...state,
                favorites: action.payload
            };
            return nextState;

        case FAVORITES_LIST:
            console.log('FAVORITES_LIST')
            return state;

        case FAVORITES_SAVE:
            nextState = {
                ...state,
                favorites: action.data
            };
            return nextState;

        case DELETE_FAVORITE:

            favoriteIndex = state.favorites.findIndex(item => item.Symbol === action.payload);
            if (favoriteIndex !== -1) {
                nextState = {
                    ...state,
                    favorites: state.favorites.filter( (item, index) => index !== favoriteIndex)
                };
                return nextState;
            }
            return state;

        case TOGGLE_FAVORITE:

            console.log('action.payload', action.payload);
            favoriteIndex = state.favorites.findIndex(item => item.Symbol === action.payload.Symbol);
            console.log('favoriteIndex', favoriteIndex);
            if (favoriteIndex !== -1) {
                nextState = {
                    ...state,
                    favorites: state.favorites.filter( (item, index) => index !== favoriteIndex)
                };
                console.log('delete', nextState.favorites);
                return nextState;
            } else {
                nextState = {
                    ...state,
                    favorites: [ ...state.favorites, action.payload ]
                };
                console.log('Add', nextState.favorites);
                return nextState;
            }

        default:
            return state

    }
}
