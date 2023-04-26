import { Input } from "@chakra-ui/react";

function SearchBar({ handleSearch }) {
  return (
    <Input
      onKeyUp={handleSearch}
      placeholder="Search Countries"
      size="lg"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
    />
  );
}

export default SearchBar;
