import React, { useEffect, useState } from "react";
import axios from "axios";
import './weather.css'
const Weather = () => {
  const [searchquery, setSearchQuery] = useState("");
  const [weather, setWeather] = useState({});
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`,
        )
        .then((res) => {
          console.log(res.data, "response");
          setWeather(res.data);
        })
        .catch((err) => console.log("err", err));
    });
  }, []);
  function handleSearch() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchquery}&appid=${API_KEY}&units=metric`,
      )
      .then((res) => setWeather(res.data))
      .catch((err) => console.log(err, "err"));
  }
  const sunrise = new Date(weather?.sys?.sunrise * 1000)
  .toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
});
console.log('sunrise',sunrise);

const sunset = new Date(weather?.sys?.sunset * 1000).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
});
const currentTime = Date.now();
const rise = weather?.sys?.sunrise * 1000;
const set = weather?.sys?.sunset * 1000;

const isDay = currentTime >= rise && currentTime <set;

  return (
    <div className={`weather-container ${isDay ? "" : "night"}`}>

      { isDay ? <div className="sun-sticker"></div>: <div className="moon"></div>}
        <div className="weather-card">
      <input
        placeholder="enter city name"
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchquery}
      />
      <button onClick={handleSearch}>search </button>
      <h3>Temp: {weather?.main?.temp} °C</h3>
      <h3>city Name:{weather?.name}</h3>
      <h3>Description:{weather?.weather?.[0]?.description}</h3>
      <h3>Humidity: {weather?.main?.humidity}%</h3>
<h3>Wind: {weather?.wind?.speed} m/s</h3>
<h3>Pressure: {weather?.main?.pressure} hPa</h3>
<h3>sunrise:{sunrise}</h3>
<h3>sunset:{sunset}</h3>

      </div>
    </div>
  );
};

export default Weather;
