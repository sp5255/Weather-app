import { Component } from "react";
import { appContext } from "../context";
import Card from "./Card";
import Details from "./Details";

class CurrentDayWeather extends Component {
    render() {
        const { data, location = "" } = this.context;   
        let current_day = data?.daily ? data.daily[0] : "";     // getting current day weather info object

        return (
            <div className="details--section">
                <div>
                    <label>{location}</label>
                    <Card current={current_day} />
                </div>
                <div className="current--details">
                    <Details current={current_day} />
                </div>
            </div>
        );
    }
}
CurrentDayWeather.contextType = appContext;
export default CurrentDayWeather;
