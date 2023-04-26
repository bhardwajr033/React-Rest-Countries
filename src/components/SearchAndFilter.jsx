import { Flex } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

function SearchAndFilter({
  handleSearch,
  handleFilterbyRegion,
  handleFilterbySubregion,
  subRegions
}) {
  return (
    <Flex
      px="1rem"
      py="2rem"
      gap={{ base: "1rem", md: "5rem" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <SearchBar handleSearch={handleSearch} />
      <FilterBar
        handleFilter={handleFilterbySubregion}
        placeHolder="Filter by Sub-Region"
        filterOptions={subRegions}
      />
      <FilterBar
        handleFilter={handleFilterbyRegion}
        placeHolder="Filter by Region"
        filterOptions={["Asia", "Americas", "Africa", "Europe", "Oceania"]}
      />
    </Flex>
  );
}

export default SearchAndFilter;
