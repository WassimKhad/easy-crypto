import { combineReducers } from "redux";
import ChangeReducer from './ChangeReducer';
import ServicesReducer from './ServicesReducer';

export default combineReducers({
    changeReducer: ChangeReducer,
    servicesReducer: ServicesReducer
});