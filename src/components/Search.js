import axios from "axios";
import { Component } from "react";
import { appContext } from "../context";

class Search extends Component {
    #BASE_URL = "http://api.openweathermap.org/geo/1.0/direct?q=";
    #API_KEY = "ec5f111487430950db885da6b24296c5";
    constructor() {
        super();
        this.state = {
            cityName: "",
            city: {},
            found: true,
        };
    }

    fetchCity = async (cityName) => {
        console.log("fetching data ...", cityName);
        const { data: cities } = await axios.get(
            `${this.#BASE_URL}${cityName}&appid=${this.#API_KEY}`
        );

        console.log("cities", cities);
        if (cities.length <= 0) {
            this.setState({
                // city: {},
                found: false,
            });
            return;
        }
        const { name, lat, lon, state, country } = cities[0];
        const cityObj = {
            name,
            lat,
            lon,
            state,
            country,
        };

        this.setState({
            city: cityObj,
            found: true,
        });
    };

    handleInput = (e) => {
        const { value } = e.target;
        this.setState({
            cityName: value,
            found: true,
        });
    };

    handleSearch = async () => {
        this.setState(
            {
                city: {},
            },
            () => {
                this.fetchCity(this.state.cityName);
            }
        );
    };

    searchCityWeather = () => {
        console.log("search city weather function called");
        const { lat, lon } = this.state.city;
        const { name, state, country } = this.state.city;
        const cityName = `${name}, ${state}, ${country}`;

        this.context.getWeather(lat, lon, cityName);
        this.setState({
            cityName,
            city: {},
            found: true,
        });
    };

    render() {
        const { name, state, country } = this.state.city;
        const { cityName } = this.state;
        return (
            <div className="header--section">
                <input
                    type="search"
                    placeholder="search city"
                    onChange={this.handleInput}
                    value={cityName}
                />

                <button onClick={this.handleSearch}>
                    <i className="fa fa-search"></i>
                </button>

                {/*when city   found display the name below the search box*/}
                {name && (
                    <div
                        className="city--info"
                        onClick={this.searchCityWeather}
                    >
                        {name}, {state}, {country}
                    </div>
                )}

                {!this.state.found && this.state.cityName && (
                    <div className="city--info">
                        <label>City not found</label>
                    </div>
                )}
            </div>
        );
    }
}

Search.contextType = appContext;
export default Search;
