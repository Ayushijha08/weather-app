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
        <div className="weather-details">
      <h3 className="weather-item ">Temperature: {weather?.main?.temp} °C</h3>
      {/* <h3 className="weather-item ">Country: {weather?.sys?.country}</h3> */}

      <h3 className="weather-item ">City: {weather?.name}</h3>
      <h3 className="weather-item ">Description: {weather?.weather?.[0]?.description}</h3>
      <h3 className="weather-item ">Humidity: {weather?.main?.humidity}%</h3>
<h3 className="weather-item ">Wind Speed: {weather?.wind?.speed} m/s</h3>
<h3 className="weather-item ">Wind Direction: {weather?.wind?.deg}°</h3>
<h3 className="weather-item ">Pressure: {weather?.main?.pressure} hPa</h3>
<h3 className="weather-item ">Latitude: {weather?.coord?.lat}</h3>
<h3 className="weather-item ">Longitude: {weather?.coord?.lon}</h3>

<h3 className="weather-item ">Sunrise:{sunrise}</h3>
<h3 className="weather-item ">Sunset:{sunset}</h3>
<h3 className="weather-item ">Visiblity:{weather?.visibility/1000}km</h3>

</div>
    </div>
    </div>
  );
};

export default Weather;
