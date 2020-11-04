import {AsyncStorage} from 'react-native';

class Storage {

    static getDataFromStorage() {
        return AsyncStorage.getItem('favorites');
    }

    static setDataInStorage(itemName, data) {
        return AsyncStorage.setItem(itemName, data);
    }

}

export default Storage;