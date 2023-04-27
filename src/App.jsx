import React, { useEffect, useState } from "react";
import SearchAndFilter from "./components/SearchAndFilter";
import HeaderBar from "./components/HeaderBar";
import MainSection from "./components/MainSection";

import fetchCountryDetails from "./components/FetchCountryDetails";

function App() {
  const [fetchedCountryData, setFetchedCountryData] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useState("");
  const [lastFilterRegionValue, setLastFilterRegionValue] = useState("");
  const [lastFilterSubRegionValue, setLastFilterSubRegionValue] = useState("");
  const [isSortByPopulationActive, setIsSortByPopulationActive] =
    useState(false);
  const [isSortByTotalAreaActive, setIsSortByTotalAreaActive] = useState(false);
  const [isLandLockedActive, setIsLandLockedActive] = useState(false);

  // Fetch Data
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCountryDetails();
        setFetchedCountryData(data);
        setIsDataFetched(true);
        setLastFilterRegionValue("");
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const countryData = Object.values(fetchedCountryData)
    .filter(
      (country) =>
        (lastSearchValue === "" ||
          country.name.toLowerCase().includes(lastSearchValue)) &&
        (lastFilterRegionValue === "" ||
          country.region === lastFilterRegionValue) &&
        (lastFilterSubRegionValue === "" ||
          country.subregion === lastFilterSubRegionValue) &&
        (!isLandLockedActive || country.landlocked)
    )
    .sort((a, b) => {
      if (isSortByPopulationActive) {
        return a.population > b.population ? -1 : 1;
      } else if (isSortByTotalAreaActive) {
        return a.area > b.area ? -1 : 1;
      } else {
        return a.name > b.name ? 1 : -1;
      }
    });

  const subRegionsObject = Object.values(fetchedCountryData).reduce(
    (acc, country) => {
      if (!acc.All.includes(country.subregion)) {
        acc.All.push(country.subregion);
      }
      if (acc[country.region]) {
        if (!acc[country.region].includes(country.subregion)) {
          acc[country.region].push(country.subregion);
        }
      } else {
        acc[country.region] = [country.subregion];
      }
      return acc;
    },
    { All: [] }
  );

  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter
        handleSearch={(event) => {
          setLastSearchValue(event.target.value.toLowerCase());
        }}
        handleFilterbyRegion={(event) => {
          setLastFilterRegionValue(event.target.value);
          setLastFilterSubRegionValue("");
        }}
        handleFilterbySubregion={(event) => {
          setLastFilterSubRegionValue(event.target.value);
        }}
        handleLandlockedCheckBox={() => {
          setIsLandLockedActive(!isLandLockedActive);
        }}
        handleSortByTotalArea={() => {
          setIsSortByTotalAreaActive(!isSortByTotalAreaActive);
          setIsSortByPopulationActive(false);
        }}
        handleSortByPopulation={() => {
          setIsSortByTotalAreaActive(false);
          setIsSortByPopulationActive(!isSortByPopulationActive);
        }}
        isSortByTotalAreaActive={isSortByTotalAreaActive}
        isSortByPopulationActive={isSortByPopulationActive}
        isLandLockedActive={isLandLockedActive}
        subRegions={
          lastFilterRegionValue === ""
            ? subRegionsObject.All
            : subRegionsObject[lastFilterRegionValue]
        }
      />
      <MainSection isDataFetched={isDataFetched} countryData={countryData} />
    </React.Fragment>
  );
}

export default App;
