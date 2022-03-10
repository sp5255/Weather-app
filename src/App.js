import { Component } from "react";
import axios from "axios";
import "./App.css";
import Search from "./components/Search";
import { Provider } from "./context";
import CurrentDayWeather from "./components/CurrentDayWeather";
import DaywiseWeather from "./components/DaywiseWeather";

class App extends Component {
    #BASE_URL = "https://api.openweathermap.org/data/2.5/";
    #API = "ec5f111487430950db885da6b24296c5";
    
    constructor() {
        super();
        this.state = {
            data: "",            
            days: [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
            location: "",
            getWeather: this.fetchData,             // search component will call this 
        };

        this.source = axios.CancelToken.source();           // for cancelling API REQUEST
    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                this.fetchData(lat, long);

                // this.fetchLocalData(); // is this fine to use it here (becuse its using
                // setstate inside of it), is it fine to use setstae inside componentdidmount
            });
        } else {
            alert("could not get location");
        }
    }

    // fetchLocalData = async (_) => {
    //     const { data } = await axios.get("http://localhost:3000/data.json");
    //     this.setState({
    //         data,
    //     });
    // };

    
    //  this default loaction is helping us in retreiveing the location by the city name 
    // that is coming from search component

    fetchData = async (lat, long, location = null) => {
        console.log("base", this.#BASE_URL);
        if (!location) {
            location = await axios.get(
                `${
                    this.#BASE_URL
                }weather?lat=${lat}&lon=${long}&unit={metric}&appid=${
                    this.#API
                }`
            );

            location = location.data.name;      // getting location name from the object recived
        }
        // console.log(location.data.name);

        const weatherInfo = await axios.get(
            `${
                this.#BASE_URL
            }onecall?lat=${lat}&lon=${long}&unit={metric}&appid=${this.#API}`
        );

        const data = weatherInfo.data;          // weather data

        this.setState({
            data,
            location,
        });
    };

    componentWillUnmount() {
        if (this.source) {
            this.source.cancel("App Component got unmounted");
        }
    }

    render() {
        // console.log(this.state.data);
        return (
            <Provider value={this.state}>
                <div className="App">
                    <Search />
                    <CurrentDayWeather />
                    <DaywiseWeather />
                </div>
            </Provider>
        );
    }
}

export default App;
