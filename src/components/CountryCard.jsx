import React from "react";
import { Heading, Card, Image, Stack, Text, CardBody } from "@chakra-ui/react";

function CountryCard({ countryDetails }) {
  return (
    <Card
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      borderRadius="10px"
      width="100%"
      height="100%"
    >
      <CardBody p="0">
        <Image
          src={countryDetails.flag}
          alt=""
          width="100%"
          maxHeight="15rem"
          objectFit="cover"
          borderTopRightRadius="10px"
          borderTopLeftRadius="10px"
        />
        <Stack mt="6" spacing="3" p="2rem">
          <Heading size="lg">{countryDetails.name}</Heading>
          <Text as="b">
            Population:{" "}
            <span style={{ fontWeight: "400" }}>
              {countryDetails.populationString}
            </span>
          </Text>
          <Text as="b">
            Region:{" "}
            <span style={{ fontWeight: "400" }}>{countryDetails.region}</span>
          </Text>
          <Text as="b">
            Capital:{" "}
            <span style={{ fontWeight: "400" }}>{countryDetails.capital}</span>
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
}

export default CountryCard;
