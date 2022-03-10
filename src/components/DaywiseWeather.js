import { Component } from "react";
import { appContext } from "../context";
import Card from "./Card";

class DaywiseWeather extends Component {
    render() {
        const { daily } = this.context.data;        // using the context
                
        return (
            <div className="card--container">

                {/* day wise cards */}
                {/* if daily object exist show the days card otherwise show nothing (empty) */}

                {daily
                    ? daily.map((day, ind) => {
                          if (ind > 0) {
                              return <Card key={ind} current={day} />;
                          }
                          return "";
                      })
                    : ""}
            </div>
        );
    }
}

DaywiseWeather.contextType = appContext;        // pointing to the context that is provided by Provider (defined in context file) from App coomponent
export default DaywiseWeather;
