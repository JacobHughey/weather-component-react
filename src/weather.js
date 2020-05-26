function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition)
    } else {
        let error = "Unable to locate you."
        document.getElementById("data").innerHTML = error;
    }
}

function getPosition(position) {
    var lat = position.coords.latitude
    var long = position.coords.longitude

    

    $.ajax({
        url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + long + '&sensor=true',
        success: function (data) {
            var l = document.getElementById("location")
            l.innerHTML = data.results[1].formatted_address;
        }
    })
    $.getJSON(
        "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/8b3ee0ea19f3b6cb48e6f5c34cd4c69f/" +
        lat +
        "," +
        long,
        grabWeather
    );
}
