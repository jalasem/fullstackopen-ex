import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ country }) => (<div>
  <h2>{country.name}</h2>
  <p>Capital {country.capital}</p>
  <p>Population {country.population.toLocaleString()}</p>
  <h3>Languages</h3>
  <ul>
    {country.languages.map((lang, langIndex) => (
      <li key={`${country.name}_lang-${langIndex}`}>
        {lang.name}
      </li>
    ))}
  </ul>
  <img src={country.flag} alt={country.name} width="100" />
</div>)

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  const showCountry = (alpha3Code) => {
    setCountries(countries => countries.map(country => {
      if (country.alpha3Code === alpha3Code) country.shown = true
      return country
    }))
  }

  useEffect(() => {
    if (query.trim().length) {
      axios(`https://restcountries.eu/rest/v2/name/${query}`)
        .then(({ data }) =>
          setCountries(
            data.map((country) => {
              country.shown = false;
              return country;
            })
          )
        )
        .catch((err) => console.error({ err }));
    }
  }, [query]);

  return (
    <div className="App">
      <p>
        find countries{" "}
        <input value={query} onInput={(e) => setQuery(e.target.value)} />
      </p>
      {countries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : countries.length === 1 ? (
        <CountryInfo country={countries[0]} />
      ) : (
        countries.map((country) =>
          country.shown ? (
            <CountryInfo country={country} />
          ) : (
            <p key={country.alpha3Code}>{country.name} <button onClick={() => showCountry(country.alpha3Code)}>Show</button></p>
          )
        )
      )}
    </div>
  );
}

export default App;
