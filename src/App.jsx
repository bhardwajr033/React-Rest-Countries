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
  const [lastFilterRegionValue, setLastFilterRegionValue] = useState(null);
  const [subRegions, setSubRegions] = useState([]);
  const [lastFilterSubRegionValue, setLastFilterSubRegionValue] = useState("");

  // Fetch Data
  useEffect(() => {
    (async () => {
      const data = await fetchCountryDetails();
      if (data) {
        setFetchedCountryData(data);
        setCountryData(data);
        setIsDataFetched(true);
        setLastFilterRegionValue("");
      }
    })();
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === lastSearchValue) {
      return;
    }

    setLastSearchValue(searchValue);

    const countriesDetails = Object.values(fetchedCountryData);
    const searchedCountries = countriesDetails
      .filter(
        (countryDetail) =>
          (countryDetail.name.toLowerCase().includes(searchValue) ||
            searchValue === "") &&
          (countryDetail.region === lastFilterRegionValue ||
            lastFilterRegionValue === "") &&
          (countryDetail.subregion === lastFilterSubRegionValue ||
            lastFilterSubRegionValue === "")
      )
      .reduce((acc, countryDetail) => {
        acc[countryDetail.name] = countryDetail;
        return acc;
      }, {});

    setCountryData(searchedCountries);
  };

  const handleFilterbyRegion = (event) => {
    const filterValue = event.target.value;

    if (filterValue === lastFilterRegionValue) {
      return;
    }

    setLastFilterRegionValue(filterValue);

    const countriesDetails = Object.values(fetchedCountryData);
    const filteredCountries = countriesDetails
      .filter(
        (countryDetail) =>
          (countryDetail.region === filterValue || filterValue === "") &&
          (countryDetail.name.toLowerCase().includes(lastSearchValue) ||
            lastSearchValue === "")
      )
      .reduce((acc, countryDetail) => {
        acc[countryDetail.name] = countryDetail;
        return acc;
      }, {});

    setCountryData(filteredCountries);
    setLastFilterSubRegionValue("");
  };

  // Update Sub-Region Values
  useEffect(() => {
    const subRegionsPresent = Object.values(fetchedCountryData)
      .filter(
        (countryData) =>
          countryData.region === lastFilterRegionValue ||
          lastFilterRegionValue === ""
      )
      .reduce((acc, countryDetail) => {
        const subregion = countryDetail.subregion;
        if (!acc.includes(subregion)) {
          acc.push(subregion);
        }
        return acc;
      }, []);
    setSubRegions(subRegionsPresent);
  }, [lastFilterRegionValue]);

  const handleFilterbySubregion = (event) => {
    const filterValue = event.target.value;

    if (filterValue === lastFilterSubRegionValue) {
      return;
    }

    setLastFilterSubRegionValue(filterValue);

    const countriesDetails = Object.values(fetchedCountryData);
    const filteredCountries = countriesDetails
      .filter(
        (countryDetail) =>
          (countryDetail.subregion === filterValue || filterValue === "") &&
          (countryDetail.name.toLowerCase().includes(lastSearchValue) ||
            lastSearchValue === "") &&
          (countryDetail.region === lastFilterRegionValue ||
            lastFilterRegionValue === "")
      )
      .reduce((acc, countryDetail) => {
        acc[countryDetail.name] = countryDetail;
        return acc;
      }, {});

    setCountryData(filteredCountries);
  };

  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter
        handleSearch={handleSearch}
        handleFilterbyRegion={handleFilterbyRegion}
        subRegions={subRegions}
        handleFilterbySubregion={handleFilterbySubregion}
      />
      <MainSection isDataFetched={isDataFetched} countryData={countryData} />
    </React.Fragment>
  );
}

export default App;
