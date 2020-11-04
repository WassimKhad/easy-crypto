
class Geolocation {

    static getCurrentPosition () {
        if (navigator.geolocation) {
            return new Promise(
                (resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject)
            )
        } else {
            return new Promise(
                resolve => resolve({})
            )
        }
    };

}
export default Geolocation;