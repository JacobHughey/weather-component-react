const lat
const long

// 1. Check to see if we can get the location, and if we can run showPosition
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setLocation)

    } else {
        let error = "Unable to locate you."
        alert(error)
    }
}


function setLocation(location) {
    lat = location.coords.latitude
    long = location.coords.longitude

    console.log('latitude is ' + lat)
}



export default geolocation