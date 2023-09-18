import React from "react";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import CurrentWeather from "./components/current-weather/current-weather";
import "./App.css";
// import Footer from "./components/footer/footer";

function App() {
  const [currentWeather, setCurrentWeather] = React.useState(null);
  console.log(currentWeather);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(console.log);
  };

  return (
    <>
      <div>
        <h1 className="h1">weather app</h1>
      </div>
      <div className="container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
      {/* <div>
        <Footer/>
      </div> */}
    </>
  );
}

export default App;
