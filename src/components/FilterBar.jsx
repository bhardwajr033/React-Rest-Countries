import { Select } from "@chakra-ui/react";
import React from "react";

function FilterBar(props) {
  const options = props.filterOptions.map((option, index) => {
    return (
      <option key={"option" + index.toString()} value={option}>
        {option}
      </option>
    );
  });
  return (
    <Select
      onChange={props.handleFilter}
      placeholder={props.placeHolder + " - All"}
      size="lg"
      border="0.5px solid teal"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
    >
      {options}
    </Select>
  );
}

export default FilterBar;
