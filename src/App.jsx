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
        landlocked: country.landlocked,
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
  const [isLandLockedActive, setIsLandLockedActive] = useState(false);
  const [Change, setChange] = useState(0);

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

  // Display Country Cards on change
  useEffect(() => {
    let countriesDetails = Object.values(fetchedCountryData);

    //filter search
    countriesDetails = countriesDetails.filter(
      (countryDetail) =>
        countryDetail.name.toLowerCase().includes(lastSearchValue) ||
        lastSearchValue === ""
    );

    //filter region
    countriesDetails = countriesDetails.filter(
      (countryDetail) =>
        countryDetail.region === lastFilterRegionValue ||
        lastFilterRegionValue === ""
    );

    //filter sub-region
    countriesDetails = countriesDetails.filter(
      (countryDetail) =>
        countryDetail.subregion === lastFilterSubRegionValue ||
        lastFilterSubRegionValue === ""
    );

    //filter landlocked
    if (isLandLockedActive) {
      countriesDetails = countriesDetails.filter(
        (countryDetail) => countryDetail.landlocked
      );
    }

    //sort by name(default) or population or total area
    if (isSortByPopulationActive) {
      countriesDetails = countriesDetails.sort((a, b) =>
        a.population > b.population ? -1 : 1
      );
    } else if (isSortByTotalAreaActive) {
      countriesDetails = countriesDetails.sort((a, b) =>
        a.area > b.area ? -1 : 1
      );
    } else {
      countriesDetails = countriesDetails.sort((a, b) =>
        a.name > b.name ? 1 : -1
      );
    }

    setCountryData(countriesDetails);
  }, [Change]);

  const handleSearch = (event) => {
    const searchValue = event.target.value.trim().toLowerCase();

    if (searchValue === lastSearchValue) {
      return;
    }

    setLastSearchValue(searchValue);

    setChange(Change + 1);
  };

  const handleFilterbyRegion = (event) => {
    const filterValue = event.target.value;

    if (filterValue === lastFilterRegionValue) {
      return;
    }

    setLastFilterSubRegionValue("");

    setLastFilterRegionValue(filterValue);

    setChange(Change + 1);
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

    setChange(Change + 1);
  };

  const handleSortByTotalArea = (isActive) => {
    setIsSortByTotalAreaActive(!isSortByTotalAreaActive);
    setIsSortByPopulationActive(false);

    setChange(Change + 1);
  };

  const handleSortByPopulation = (isActive) => {
    setIsSortByPopulationActive(!isSortByPopulationActive);
    setIsSortByTotalAreaActive(false);

    setChange(Change + 1);
  };

  const handleLandlockedCheckBox = (isActive) => {
    setIsLandLockedActive(!isLandLockedActive);

    setChange(Change + 1);
  };

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
        isLandLockedActive={isLandLockedActive}
        handleLandlockedCheckBox={handleLandlockedCheckBox}
      />
      <MainSection isDataFetched={isDataFetched} countryData={countryData} />
    </React.Fragment>
  );
}

export default App;
