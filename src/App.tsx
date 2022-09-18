import { FormEvent, useEffect, useState } from "react";
import { WeatherContainer } from "./components/WeatherContainer";
import { getWeatherByCoords, getWeatherBySearch } from "./api/fetchWeather";
import { SearchBox } from "./components/SearchBox";

function App() {
  const [fetchedData, setFetchedData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const LAT = position.coords.latitude;
      const LON = position.coords.longitude;

      try {
        const data = await getWeatherByCoords(LAT, LON);
        setFetchedData(data);
      } catch (err) {
        setError("Por favor revise su conexión a internet 💻");
      }
    });
  }, []);

  const handleSearch = async (e: FormEvent<HTMLFormElement>, CITY: string) => {
    e.preventDefault();
    setError("");

    try {
      const data = await getWeatherBySearch(CITY);

      if (data === "404") {
        setError("No se encontró la ciudad 🌆");
      } else if (data === "400") {
        setError("Por favor ingrese una ciudad 🌆");
      } else {
        setFetchedData(data);
        console.log(data);
      }
    } catch (err) {
      setError("Por favor revise su conexión a internet 💻");
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <SearchBox handleSearch={handleSearch} />
      <WeatherContainer fetchedData={fetchedData} error={error} />
    </div>
  );
}

export default App;
