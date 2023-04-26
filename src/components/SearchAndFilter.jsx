import { Flex } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import SortButton from "./SortButton";

function SearchAndFilter(props) {
  return (
    <Flex
      px="1rem"
      py="2rem"
      gap={{ base: "1.5rem", md: "5rem" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <SearchBar handleSearch={props.handleSearch} />
      <SortButton
        handleClick={props.handleSortByPopulation}
        isActive={props.isSortByPopulationActive}
        buttonText="Sort by population"
      />
      <SortButton
        handleClick={props.handleSortByTotalArea}
        isActive={props.isSortByTotalAreaActive}
        buttonText="Sort by Total Area"
      />
      <FilterBar
        handleFilter={props.handleFilterbySubregion}
        placeHolder="Filter by Sub-Region"
        filterOptions={props.subRegions}
      />
      <FilterBar
        handleFilter={props.handleFilterbyRegion}
        placeHolder="Filter by Region"
        filterOptions={["Asia", "Americas", "Africa", "Europe", "Oceania"]}
      />
    </Flex>
  );
}

export default SearchAndFilter;
