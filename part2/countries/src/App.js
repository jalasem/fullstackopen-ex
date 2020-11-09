import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (query.trim().length) {
      axios(`https://restcountries.eu/rest/v2/name/${query}`)
        .then(({ data }) => setCountries(data))
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
        <div>
          <h2>{countries[0].name}</h2>
          <p>Capital {countries[0].capital}</p>
          <p>Population {countries[0].population.toLocaleString()}</p>
          <h3>Languages</h3>
          <ul>
            {countries[0].languages.map((lang, langIndex) => (
              <li key={`${countries[0].name}_lang-${langIndex}`}>{lang.name}</li>
            ))}
          </ul>
          <img src={countries[0].flag} alt={countries[0].name} width="100" />
        </div>
      ) : (
        countries.map((country) => (
          <p key={country.alpha3Code}>{country.name}</p>
        ))
      )}
    </div>
  );
}

export default App;
