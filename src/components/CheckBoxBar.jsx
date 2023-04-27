import { Checkbox } from "@chakra-ui/react";

function CheckBoxBar(props) {
  return (
    <Checkbox
      defaultChecked
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      px="1rem"
      size="lg"
      isChecked={props.isLandLockedActive}
      onChange={(e) => props.handelChange(e.target.checked)}
      border="0.5px solid teal"
      borderRadius="0.5rem"
    >
      {props.checkBoxValue}
    </Checkbox>
  );
}

export default CheckBoxBar;
