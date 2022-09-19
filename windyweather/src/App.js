import React, { useState } from "react";
import axios from "axios";
import NewsList from "./components/NewsList";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}&units=metric`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="place">{data.name}</p>
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="minmaxtemp">
            {data.main ? <h3>Min: {data.main.temp_min.toFixed()}°C</h3> : null}
            {data.main ? <h3>Max: {data.main.temp_max.toFixed()}°C</h3> : null}
          </div>
        </div>
        <div className="headlines">News and Weather...</div>
        <div className="scroll">
          <br></br>
          <NewsList className="news" />
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              <p>Feels Like</p>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
            </div>
            <br></br>
            <div className="humidity">
              <p>Humidity &#128167;</p>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <br></br>
            <div className="wind">
              <p>Wind &#128168;</p>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()}km/h</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
