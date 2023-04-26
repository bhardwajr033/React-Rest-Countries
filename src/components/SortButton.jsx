import { Button } from "@chakra-ui/react";

function SortButton(props) {
  return (
    <Button
      onClick={() => props.handleClick(!props.isActive)}
      colorScheme="teal"
      variant={props.isActive ? "solid" : "outline"}
      width="100%"
      size="lg"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
    >
      {props.buttonText}
    </Button>
  );
}

export default SortButton;
