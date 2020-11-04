import Geolocation from "../../services/Geolocation";
import OpenCagedataAPI from "../../services/OpenCagedataAPI";
import CryptoCompareAPI from "../../services/CryptoCompareAPI";

const INITIAL_STATE = {
    Geolocation: new Geolocation,
    OpenCagedataAPI: new OpenCagedataAPI,
    CryptoCompareAPI: new CryptoCompareAPI(),
};

export default (state = INITIAL_STATE, action) => {
    return state;
};