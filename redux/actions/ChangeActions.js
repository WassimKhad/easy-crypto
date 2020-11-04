export const CHANGES_INIT = 'CHANGES_INIT';
export const CHANGES_ADD = 'CHANGES_ADD';
export const CHANGES_DELETE = 'CHANGES_DELETE';
export const CHANGES_LIST = 'CHANGES_LIST';
export const FAVORITES_INIT = 'FAVORITES_INIT';
export const FAVORITES_LIST = 'FAVORITES_LIST';
export const FAVORITES_SAVE = 'FAVORITES_SAVE';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const CURRENCY_INIT = 'CURRENCY_INIT';
export const CURRENCIES_INIT = 'CURRENCIES_INIT';

export const changeAdd = (change) => ({
    type: CHANGES_ADD,
    change: change
});

export const changeDelete = (change) => ({
    type: CHANGES_DELETE,
    change: change
});

export const changes = (data) => ({
    type: CHANGES_LIST,
    payload: data
});

export const favoritesInit = (data) => ({
    type: FAVORITES_INIT,
    payload: data
});

export const favoritesList = (data) => ({
    type: FAVORITES_LIST,
    payload: data
});

export const favoritesSave = (data) => ({
    type: FAVORITES_SAVE,
    data
});


export const DeleteFavorite = (symbol) => {
    return dispatch => {
        return dispatch({ type: DELETE_FAVORITE, payload: symbol });
    };
};

export const ToggleFavorite = (data) => {
    return dispatch => {
        return dispatch({ type: TOGGLE_FAVORITE, payload: data });
    };
};

export const currency_init = (data) => ({
    type: CURRENCY_INIT,
    payload :data
});

export const currencies_init = (data) => ({
    type: CURRENCIES_INIT,
    payload :data
});


