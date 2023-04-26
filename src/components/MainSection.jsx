import { Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import CountryCard from "./CountryCard";

function MainSection({ countryData, isDataFetched }) {
  if (Object.values(countryData).length === 0) {
    return (
      <Text as="b" size="lg" px="40%" py="4rem">
        {isDataFetched ? "No Countries Found" : "Countries Loading..."}
      </Text>
    );
  }

  const countryCards = Object.values(countryData).map((countryCard) => {
    return (
      <WrapItem key={countryCard.name} width={{ base: "100%", md: "22%" }}>
        <CountryCard countryDetails={countryCard} />;
      </WrapItem>
    );
  });

  return (
    <Wrap p="1rem" spacing="3%">
      {countryCards}
    </Wrap>
  );
}

export default MainSection;
