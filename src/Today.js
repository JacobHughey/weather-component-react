import React, { Component } from 'react'
import $ from 'jquery'
import './weather-icons.min.css'
import Card from 'react-bootstrap/Card'
import night from '../img/night.jpg'
import day from '../img/day.jpg'


class Today extends Component {
    constructor() {
        super()
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            lat: 0,
            long: 0,
            temperature: "",
            summary: "",
            icon: "",
            night: false,
            bg: ""
        }
        //bind
        this.getLocation = this.getLocation.bind(this)
        this.saveLocation = this.saveLocation.bind(this)
        this.grabWeather = this.grabWeather.bind(this)
    }


    // 1. Check if we can get location, if yes run saveLocation(). If no, throw an error alert
    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.saveLocation)
        } else {
            let error = "Unable to locate you."
            alert(error)
        }
    }

    // 2. Runs right after getLocation(), updates state with latitude and longitude
    saveLocation(position) {
        const lat = position.coords.latitude
        const long = position.coords.longitude

        this.setState({
            lat: lat,
            long: long
        })
    }
    // 3. Runs after component mounts
    componentDidMount() {
        // Runs getLocation() on mount
        this.getLocation()
        // Grabs weather data from API
        $.getJSON(
            "https://api.darksky.net/forecast/8b3ee0ea19f3b6cb48e6f5c34cd4c69f/" +
            this.state.lat + ',' + this.state.long,
            // Runs grabWeather() after data has been fetched
            this.grabWeather
        );
    }

    // Runs at the end of componentDidMount()
    grabWeather(weather) {

        let currenlySummary = weather.currently.summary
        let currentlyTemp = Math.ceil(weather.currently.temperature) + " °F"
        let currentlyIcon = weather.currently.icon
        this.setState({
            isLoaded: true,
            summary: currenlySummary,
            temperature: currentlyTemp,
            icon: currentlyIcon
        })
        console.log(this.state.icon)

        let iconClassName
        switch (this.state.icon) {
            case "clear-day":
                iconClassName = "wi wi-day-sunny"
                break
            case "clear-night":
                iconClassName = "wi wi-night-clear"
                break
            case "rain":
                iconClassName = "wi wi-rain"
                break
            case "snow":
                iconClassName = "wi wi-snow"
                break
            case "sleet":
                iconClassName = "wi wi-sleet"
                break
            case "wind":
                iconClassName = "wi wi-windy"
                break
            case "fog":
                iconClassName = "wi wi-fog"
                break
            case "cloudy":
                iconClassName = "wi wi-cloudy"
                break
            case "partly-cloudy-day":
                iconClassName = "wi wi-day-cloudy"
                break
            case "partly-cloudy-night":
                iconClassName = "wi wi-night-alt-partly-cloudy"
                break
            default:
                console.log("error loading icon")
        }

        this.setState({
            iconClass: iconClassName,
            date: new Date().toDateString(),
            time: new Date().toLocaleTimeString('en-US')
        })

        if (Number(this.state.time.split(':')[0]) > 6 && this.state.time.split(' ')[1] === "PM") {
            this.setState({
                night: true,
                bg: night,
                text: 'text-white'
            })
        } else {
            this.setState({
                night: false,
                bg: day,
                text: ''
            })
        }

    }


    render() {
        return (
            <div className="Today text-center mt-4">
                <Card style={{ width: '50%' }} className="bg-dark">
                    <Card.Img src={this.state.bg} alt="Card image" />
                    <Card.ImgOverlay>
                        <Card.Body className={this.state.text}>
                            <Card.Title>Your daily local weather</Card.Title>
                            <Card.Text>
                                <p>{this.state.date}</p>
                                <h1>
                                    <i className={this.state.iconClass}></i>
                                </h1>
                                <h4 className="mb-4">{this.state.temperature}</h4>
                                <p className="mb-4">{this.state.summary}</p>

                            </Card.Text>
                        </Card.Body>
                    </Card.ImgOverlay>
                </Card>
            </div>
        );
    }
}

export default Today
