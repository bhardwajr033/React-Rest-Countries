import { Select } from "@chakra-ui/react";

function FilterBar(props) {
  const options = props.filterOptions.map((option, index) => {
    return (
      <option key={"option" + index.toString()} value={option}>
        {option}
      </option>
    );
  });
  return (
    <Select placeholder={props.placeHolder} size="lg" className="select-bar">
      {options}
    </Select>
  );
}

export default FilterBar;
