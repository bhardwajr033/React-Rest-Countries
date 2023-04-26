import { Text, Flex, Spinner, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";
import CountryCard from "./CountryCard";

function MainSection({ countryData, isDataFetched }) {
  if (countryData.length === 0) {
    if (isDataFetched) {
      return (
        <Flex align="center" justify="center" h="10rem">
          <Text as="b" fontSize="2rem">
            "No Countries Found!"
          </Text>
        </Flex>
      );
    }
    return (
      <Flex align="center" justify="center" h="10rem">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const countryCards = countryData.map((countryCard) => {
    return (
      <WrapItem key={countryCard.name} width={{ base: "100%", md: "22%" }}>
        <CountryCard countryDetails={countryCard} />
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
