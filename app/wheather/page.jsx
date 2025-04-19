"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [permissionPopup, setPermissionPopup] = useState(true);
  const [currentLocationData, setCurrentLocationData] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY = "7404528d20dc1170845bf2a784210ad7";

  // Ask for geolocation permission
  useEffect(() => {
    if (permissionPopup === false) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
          );
          const data = await res.json();
          setCurrentLocationData(data);
        });
      }
    }
  }, [permissionPopup]);

  // Search weather by city
  const fetchWeather = async () => {
    if (!city) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();
    setWeather(data);
  };

  // Fake suggestion (or you can use an API)
  const getSuggestions = (value) => {
    const cities = ["London", "Lahore", "Paris", "Tokyo", "Karachi", "New York"];
    setSuggestions(
      cities.filter((c) => c.toLowerCase().startsWith(value.toLowerCase()))
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Current Location Info */}
      {currentLocationData && (
        <div className="absolute top-4 left-4 bg-white/80 rounded-xl shadow-md px-4 py-2 text-sm">
          <strong>{currentLocationData.name}, {currentLocationData.sys?.country}</strong><br />
          Temp: {currentLocationData.main?.temp}°C
        </div>
      )}

      {/* Location Permission Popup */}
      {permissionPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <p className="mb-4 font-medium">Allow access to your current location?</p>
            <div className="space-x-4">
              <button
                onClick={() => setPermissionPopup(false)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Allow
              </button>
              <button
                onClick={() => setPermissionPopup("denied")}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Deny
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Weather App UI */}
      <div className="bg-white/80 rounded-2xl shadow-xl p-8 w-full max-w-md text-center space-y-4">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">🌤️ Weather App</h1>
        <input
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
          placeholder="Search city"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            getSuggestions(e.target.value);
          }}
        />
        {suggestions.length > 0 && (
          <div className="bg-blue-100 text-left w-full rounded-md shadow-inner max-h-40 overflow-y-auto p-2">
            {suggestions.map((sug, i) => (
              <div
                key={i}
                onClick={() => {
                  setCity(sug);
                  setSuggestions([]);
                }}
                className="cursor-pointer hover:bg-blue-200 px-2 py-1 rounded"
              >
                {sug}
              </div>
            ))}
          </div>
        )}

        <button
          onClick={fetchWeather}
          className="bg-blue-600 text-white px-6 py-2 rounded-md mt-2 hover:bg-blue-700"
        >
          Get Weather
        </button>

        {weather && weather.name ? (
          <div className="bg-white p-4 mt-4 rounded-xl shadow-inner">
            <h2 className="text-xl font-bold">{weather.name}, {weather.sys?.country}</h2>
            <p>🌡️ Temp: {weather.main?.temp}°C</p>
            <p>☁️ Condition: {weather.weather[0].main}</p>
            <p>💧 Humidity: {weather.main?.humidity}%</p>
            <p>🌬️ Wind: {weather.wind?.speed} m/s</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
