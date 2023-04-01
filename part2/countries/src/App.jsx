import { useEffect, useState } from "react";
import "./App.css";
import countryService from "./services/countries";
import weatherService from "./services/weather";

const Country = ({ country }) => {
  const [nowcast, setNowcast] = useState(null);

  useEffect(() => {
    if (!country.capital) return;
    const capitalName = country.capital?.[0];
    const countryCode = country.cca2;
    weatherService
      .getByCityName(capitalName, countryCode)
      .then((returnedNowcast) => {
        setNowcast(returnedNowcast);
      });
  }, []);

  return (
    <div>
      <h2>{country.name?.common}</h2>
      <div>capital {country.capital?.join(", ")}</div>
      <div>area {country.area}</div>
      <strong>languages:</strong>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags?.png} alt={country.flags?.alt} width={150} />

      {nowcast && (
        <div>
          <h3>Weather in {country.capital?.[0]}</h3>
          <div>temperature {nowcast.main?.temp} Celsius</div>
          {nowcast.weather?.map((weather) => (
            <img
              key={weather.id}
              src={weatherService.getIconUrl(weather.icon)}
              alt={weather.description}
            />
          ))}
          <div>wind {nowcast.wind?.speed} m/s</div>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [filter, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    countryService.getAll().then((returnedCountries) => {
      setCountries(returnedCountries);
    });
  }, []);

  const changeFilter = (event) => {
    const newFilter = event.target.value;
    setSearch(newFilter);
    const newFiltered = countries
      .filter((country) =>
        country.name.common.toLowerCase().includes(newFilter.toLowerCase())
      )
      .map((country) => ({ ...country, isShown: false }));
    setFiltered(newFiltered);
  };

  const toggleShow = (name) => {
    const newFiltered = filtered.map((country) =>
      country.name.common !== name
        ? country
        : { ...country, isShown: !country.isShown }
    );
    setFiltered(newFiltered);
  };

  return (
    <div>
      <div>
        find countries <input value={filter} onChange={changeFilter} />
      </div>

      {filtered.length > 10 && "Too many matches, specify another filter"}
      {filtered.length > 1 &&
        filtered.length <= 10 &&
        filtered.map((country) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => toggleShow(country.name.common)}>
              {country.isShown ? "hide" : "show"}
            </button>
            {country.isShown && <Country country={country} />}
          </div>
        ))}
      {filtered.length === 1 && <Country country={filtered[0]} />}
    </div>
  );
};

export default App;
