import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL, apiKey } from "./../../api";
import "./search.css";
import LoadingBar from "react-top-loading-bar";
import gif from "./l.gif";

const Search = ({ onSearchChange }) => {
  // Initialize state variables
  const [search, setSearch] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [searchTime, setSearchTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const loadingBarRef = React.useRef(null);

  // Function to load city options
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  // Function to fetch current time
  const fetchCurrentTime = (timezone) => {
    const currentTime = new Date().toLocaleString("en-US", {
      timeZone: timezone,
    });
    return currentTime;
  };

  // Function to fetch time zone
  const fetchTimeZone = (latitude, longitude) => {
    const apiUrl = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${latitude}&lng=${longitude}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "OK") {
          return data.zoneName;
        } else {
          throw new Error("Failed to fetch time zone data");
        }
      });
  };

  // Function to handle search change
  const handleOnChange = async (searchData) => {
    setSearch(searchData);
    setIsLoading(true); // Set loading to true when fetching data
    loadingBarRef.current.continuousStart(); // Start the loading bar

    // Assuming the selected value is in the format "latitude longitude"
    const [latitude, longitude] = searchData.value.split(" ");
    try {
      const timezone = await fetchTimeZone(latitude, longitude);
      const currentTime = await fetchCurrentTime(timezone);
      setSearchTime(currentTime);
      onSearchChange(searchData);
    } catch (error) {
      console.error("Error fetching time data:", error);
    } finally {
      setIsLoading(false); // Set loading back to false after fetching data
      loadingBarRef.current.complete(); // Complete the loading bar
    }
  };

  // Function to handle online status change
  const handleOnlineStatusChange = () => {
    setIsOnline(navigator.onLine);
  };

  React.useEffect(() => {
    window.addEventListener("online", handleOnlineStatusChange);
    window.addEventListener("offline", handleOnlineStatusChange);

    return () => {
      window.removeEventListener("online", handleOnlineStatusChange);
      window.removeEventListener("offline", handleOnlineStatusChange);
    };
  }, []);

  return (
    <>
      {!isOnline && (
        <p style={{ textAlign: "center", marginTop: "0px" }}>No Internet</p>
      )}
      {searchTime && (
        <p className="time-info">
          Time in {search.label}: {searchTime}
        </p>
      )}
      <AsyncPaginate
        className="input"
        placeholder="Search for city"
        debounceTimeout={600}
        value={search}
        onChange={handleOnChange}
        loadOptions={loadOptions}
        isDisabled={!isOnline}
      />
      {isLoading && (
        
        <div className="loading-indicator">
          <div >
          <img  src={gif} alt="loader" />
          <p>Fetching data...</p>
          </div>
        </div>
      )}
      <LoadingBar ref={loadingBarRef} color="green" height={4} />
    </>
  );
};

export default Search;
