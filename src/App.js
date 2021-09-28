import React, { useState } from "react";

import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const API = {
    KEY: "5d11ddc647b43cf9fadde6be37e94f79",
    URL: `https://api.openweathermap.org/data/2.5/`,
    // https://api.openweathermap.org/data/2.5/weather?q=bangkok&units=metric&appid=5d11ddc647b43cf9fadde6be37e94f79
  };

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let date = new Date();
  let dayName = dayNames[date.getDay()];
  let monthName = monthNames[date.getMonth()];

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${API.URL}weather?q=${query}&units=metric&appid=${API.KEY}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setWeather(data);
          setQuery("");
        });
    }
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? Math.floor(weather.main.temp) > 16
            ? "app"
            : "app night"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="City..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name} {weather.sys.country}
              </div>
              <div className="date">{`${dayName}, ${monthName} ${date.getDate()} ${date.getFullYear()}`}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{`${Math.floor(weather.main.temp)}°C`}</div>
              <div className="weather-icon">
                <img
                  src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
                  alt="icon"
                />
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
      <div className="credit">Created by Sorawit Phattharakundilok.</div>
    </div>
  );
};

export default App;
