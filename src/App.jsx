import React, { useEffect, useState } from "react";
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
        population: country.population,
        populationString: country.population.toLocaleString("en-US"),
        area: country.area,
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
  const [countryData, setCountryData] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState("");
  const [lastFilterRegionValue, setLastFilterRegionValue] = useState(null);
  const [subRegions, setSubRegions] = useState([]);
  const [lastFilterSubRegionValue, setLastFilterSubRegionValue] = useState("");
  const [isSortByPopulationActive, setIsSortByPopulationActive] =
    useState(false);
  const [isSortByTotalAreaActive, setIsSortByTotalAreaActive] = useState(false);

  // Fetch Data
  useEffect(() => {
    (async () => {
      const data = await fetchCountryDetails();
      if (data) {
        setFetchedCountryData(data);
        setCountryData(
          Object.values(data).sort((a, b) => (a.name > b.name ? 1 : -1))
        );
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

    let searchedCountries = Object.values(fetchedCountryData).filter(
      (countryDetail) =>
        (countryDetail.name.toLowerCase().includes(searchValue) ||
          searchValue === "") &&
        (countryDetail.region === lastFilterRegionValue ||
          lastFilterRegionValue === "") &&
        (countryDetail.subregion === lastFilterSubRegionValue ||
          lastFilterSubRegionValue === "")
    );

    if (isSortByPopulationActive) {
      searchedCountries = sortCountryCardsByKey(
        searchedCountries,
        "population",
        false
      );
    } else if (isSortByTotalAreaActive) {
      searchedCountries = sortCountryCardsByKey(
        searchedCountries,
        "area",
        false
      );
    } else {
      searchedCountries = sortCountryCardsByKey(
        searchedCountries,
        "area",
        true
      );
    }

    setCountryData(searchedCountries);
  };

  const handleFilterbyRegion = (event) => {
    const filterValue = event.target.value;

    if (filterValue === lastFilterRegionValue) {
      return;
    }

    setLastFilterRegionValue(filterValue);

    let filteredCountries = Object.values(fetchedCountryData).filter(
      (countryDetail) =>
        (countryDetail.region === filterValue || filterValue === "") &&
        (countryDetail.name.toLowerCase().includes(lastSearchValue) ||
          lastSearchValue === "")
    );

    if (isSortByPopulationActive) {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "population",
        false
      );
    } else if (isSortByTotalAreaActive) {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "area",
        false
      );
    } else {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "area",
        true
      );
    }

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

    let filteredCountries = Object.values(fetchedCountryData).filter(
      (countryDetail) =>
        (countryDetail.subregion === filterValue || filterValue === "") &&
        (countryDetail.name.toLowerCase().includes(lastSearchValue) ||
          lastSearchValue === "") &&
        (countryDetail.region === lastFilterRegionValue ||
          lastFilterRegionValue === "")
    );

    if (isSortByPopulationActive) {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "population",
        false
      );
    } else if (isSortByTotalAreaActive) {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "area",
        false
      );
    } else {
      filteredCountries = sortCountryCardsByKey(
        filteredCountries,
        "area",
        true
      );
    }

    setCountryData(filteredCountries);
  };

  const handleSortByTotalArea = (isActive) => {
    setIsSortByTotalAreaActive(!isSortByTotalAreaActive);
    setIsSortByPopulationActive(false);

    let sortedData = [];

    if (isActive) {
      sortedData = sortCountryCardsByKey(countryData, "area", false);
    } else {
      sortedData = sortCountryCardsByKey(countryData, "name", true);
    }

    setCountryData(sortedData);
  };

  const handleSortByPopulation = (isActive) => {
    setIsSortByPopulationActive(!isSortByPopulationActive);
    setIsSortByTotalAreaActive(false);
    let sortedData = [];

    if (isActive) {
      sortedData = sortCountryCardsByKey(countryData, "population", false);
    } else {
      sortedData = sortCountryCardsByKey(countryData, "name", true);
    }

    setCountryData(sortedData);
  };

  function sortCountryCardsByKey(data, key, ascending) {
    return data.sort((a, b) =>
      a[key] > b[key] ? (ascending ? 1 : -1) : ascending ? -1 : 1
    );
  }

  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter
        handleSearch={handleSearch}
        handleFilterbyRegion={handleFilterbyRegion}
        subRegions={subRegions}
        handleFilterbySubregion={handleFilterbySubregion}
        handleSortByTotalArea={handleSortByTotalArea}
        handleSortByPopulation={handleSortByPopulation}
        isSortByTotalAreaActive={isSortByTotalAreaActive}
        isSortByPopulationActive={isSortByPopulationActive}
      />
      <MainSection isDataFetched={isDataFetched} countryData={countryData} />
    </React.Fragment>
  );
}

export default App;
