import { Flex } from "@chakra-ui/react";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";

function SearchAndFilter() {
  return (
    <Flex
      px="1rem"
      py="2rem"
      gap={{ base: "1rem", md: "5rem" }}
      flexDirection={{ base: "column", md: "row" }}
    >
      <SearchBar />
      <FilterBar
        placeHolder="Filter by Sub-Region"
        filterOptions={[
          "All",
          "Asia",
          "Americas",
          "Africa",
          "Europe",
          "Oceania",
        ]}
      />
      <FilterBar
        placeHolder="Filter by Region"
        filterOptions={[
          "All",
          "Asia",
          "Americas",
          "Africa",
          "Europe",
          "Oceania",
        ]}
      />
    </Flex>
  );
}

export default SearchAndFilter;
