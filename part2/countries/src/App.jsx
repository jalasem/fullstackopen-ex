import { useEffect, useState } from "react";
import axios from "axios";

const weatherstackKey = process.env.REACT_APP_WEATHERSTACK_KEY;

const CountryInfo = ({ country }) => (
  <div>
    <h2>{country.name}</h2>
    <p>Capital {country.capital}</p>
    <p>Population {country.population.toLocaleString()}</p>
    <h3>Languages</h3>
    <ul>
      {country.languages.map((lang, langIndex) => (
        <li key={`${country.alpha3Code}_lang-${langIndex}`}>{lang.name}</li>
      ))}
    </ul>
    <img src={country.flag} alt={country.name} width="100" />
    <WeatherInfo data={country.weather} city={country.capital} />
  </div>
);

const WeatherInfo = ({ data, city }) =>
  data &&
  data.current ? (
    <div>
      <h3>Weather in {city}</h3>
      <p>
        teperature: {data.current.temperature}
        <sup>o</sup> Celcius
      </p>
      <img src={data.current.weather_icons} alt="Weather info" />
      <p><b>Wind: {data.current.wind_speed} mph direction {data.current.wind_dir}</b></p>
    </div>
  ) : <p></p>

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [weather, setWeather] = useState({});

  const showCountry = (alpha3Code) => {
    setCountries((countries) =>
      countries.map((country) => {
        if (country.alpha3Code === alpha3Code) country.shown = true;
        return country;
      })
    );
  };

  useEffect(() => {
    if (query.trim().length) {
      axios(`https://restcountries.eu/rest/v2/name/${query}`)
        .then(({ data: countriez }) => {
          setCountries(
            countriez.map((country) => {
              country.shown = false;
              return country;
            })
          );
        })
        .catch((err) => console.error({ err }));
    }
  }, [query]);

  useEffect(() => {
    if (countries.length === 1) {
      axios(
        `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${countries[0].capital}`
      )
        .then(({ data }) => {
          setWeather(data);
        })
        .catch((err) => console.err({ err }));
    }
  }, [countries]);

  return (
    <div className="App">
      <p>
        find countries{" "}
        <input value={query} onInput={(e) => setQuery(e.target.value)} />
      </p>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <CountryInfo
          country={{
            ...countries[0],
            weather,
          }}
        />
      ) : (
        countries.map((country) =>
          country.shown ? (
            <CountryInfo key={country.alpha3Code} country={country} />
          ) : (
            <p key={country.alpha3Code}>
              {country.name}{" "}
              <button onClick={() => showCountry(country.alpha3Code)}>
                Show
              </button>
            </p>
          )
        )
      )}
    </div>
  );
}

export default App;
