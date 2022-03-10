import { useContext } from "react";
import { appContext } from "../context";

const to_Day = (current, days) => {
    let dt = current?.dt;
    if (dt) {
        let day = new Date(dt * 1000);        
        return days[day.getDay()];  // getDay will return the index of the day
    }
    return "";
};

function Card(props) {
    const contextStore = useContext(appContext);
    const { current, header } = props;

    //icon
    const img_base_url = "http://openweathermap.org/img/w/";
    const icon = current ? `${img_base_url}${current.weather[0].icon}.png` : "";

    //getting the days A. T.   the indexes
    const day = to_Day(current, contextStore.days);

    //temperature
    let temp = header ? current?.temp : current?.temp?.day;
    temp = parseInt(temp) - 273;

    const main = current ? current.weather[0].main : ""; // desc like clear, cloud etc

    return (
        <div className="card">
            <img src={icon} alt="weather--icon" />
            <label>{day}</label>
            <label>{main}</label>
            <label className="temperature">
                {temp}
                <span>&#8451;</span>{" "}
            </label>
        </div>
    );
}

export default Card;
