import React, { useEffect, useState } from "react";
import "./App.css";
import SearchAndFilter from "./components/SearchAndFilter";
import HeaderBar from "./components/HeaderBar";
import MainSection from "./components/MainSection";

async function fetchCountryDetails() {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    const countryData = await response.json();
    const countryCodes = countryData.reduce((acc, country) => {
      acc[country.cca3] = country.name.common;
      return acc;
    }, {});
    const countriesDetails = countryData.reduce((acc, country) => {
      acc[country.name.common] = {
        name: country.name.common,
        population: country.population.toLocaleString("en-US"),
        region: country.region,
        capital: (country.capital || ["Not Found"])[0],
        flag: country.flags.svg,
        //for detail page
        nativeName: Object.values(
          country.name.nativeName || { common: "Not Found" }
        )[0].common,
        subregion: country.subregion,
        topLevelDomain: (country.tld || ["Not Found"])[0],
        currencies: Object.values(
          country.currencies || { name: "Not Found" }
        ).reduce((acc, currency) => {
          acc.push(currency.name);
          return acc;
        }, []),
        languages: Object.values(country.languages || {}) || ["Not Found"],
        borderCountries: (country.borders || [])
          .reduce((acc, countryCode) => {
            acc.push(countryCodes[countryCode]);
            return acc;
          }, [])
          .filter((country) => country),
      };
      return acc;
    }, {});

    return countriesDetails;
  } catch (error) {
    return {};
  }
}

function App() {
  const [fetchedCountryData, setFetchedCountryData] = useState({});
  const [countryData, setCountryData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      const data = await fetchCountryDetails();
      if (data) {
        setFetchedCountryData(data);
        setCountryData(data);
        setIsDataFetched(true);
      }
    })();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === lastSearchValue) {
      return;
    }

    setLastSearchValue(searchValue);

    if (searchValue === "") {
      setCountryData(fetchedCountryData);
    }

    const countriesDetails = Object.values(fetchedCountryData);
    const searchedCountries = countriesDetails
      .filter((countryDetail) =>
        countryDetail.name.toLowerCase().includes(searchValue)
      )
      .reduce((acc, countryDetail) => {
        acc[countryDetail.name] = countryDetail;
        return acc;
      }, {});

    setCountryData(searchedCountries);
  };

  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter handleSearch={handleSearch} />
      <MainSection isDataFetched={isDataFetched} countryData={countryData} />
    </React.Fragment>
  );
}

export default App;
