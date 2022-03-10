import sunriseImg from "../images/sunrise.svg";
import sunsetImg from "../images/sunset.svg";
import humidityImg from "../images/humidity.svg";
import barometerImg from "../images/barometer.svg";
import windImg from "../images/wind.svg";
import uvImg from "../images/uv-index.svg";
import thermometer from "../images/thermometer-celsius.svg";
import DetailsIconCard from "./DetailsIconCard";


// converting a time-stamp  into a date
function convert_to_Date(dt) {
    return new Date(dt * 1000);
}

function Details(props) {
    if (!props.current) return "";

    const { humidity, pressure, wind_speed, uvi, weather } = props?.current;
    const { description } = weather[0];

    let { sunrise, sunset, feels_like } = props?.current;
    sunrise = convert_to_Date(sunrise).toLocaleString().split(" ")[1];
    sunset = convert_to_Date(sunset).toLocaleString().split(" ")[1];

    feels_like = parseInt(feels_like.day) - 273;
    // let date = convert_to_Date(dt)
    let date = new Date();
    let hrs = date.getHours();
    let min = date.getMinutes();
    min = min < 10 ? min + "0" : min;

    const ampm = hrs >= 12 ? "pm" : "am";
    hrs = hrs % 12;
    hrs = hrs ? hrs : 12; // the hour '0' should be '12'

    date = date.toDateString();

    return (
        <>
            <label>{`${date} ${hrs}:${min} ${ampm}`}</label>
            <div>
                <label>{description}</label>
                <DetailsIconCard
                    icon={thermometer}
                    info={feels_like}
                    unit={true}
                />
            </div>
            <div>
                <DetailsIconCard icon={sunriseImg} info={sunrise} />
                <DetailsIconCard icon={sunsetImg} info={sunset} />
                <DetailsIconCard icon={windImg} info={wind_speed} />
            </div>
            <div>
                <DetailsIconCard icon={humidityImg} info={`${humidity}%`} />
                <DetailsIconCard icon={barometerImg} info={pressure} />
                <DetailsIconCard icon={uvImg} info={uvi} />
            </div>
        </>
    );
}

export default Details;
