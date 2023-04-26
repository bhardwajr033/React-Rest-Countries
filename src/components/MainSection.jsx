import { Flex } from "@chakra-ui/react";
import React from "react";
import CountryCard from "./CountryCard";

const countryDetails = {
  name: "India",
  population: "1,400,000,000",
  region: "Asia",
  capital: "New Delhi",
  flag: "src/assets/images/No_flag.svg",
};

function MainSection() {
  return (
    <Flex p="1rem">
      <CountryCard countryDetails={countryDetails} />
    </Flex>
  );
}

export default MainSection;
