import { Box, Flex, Heading, Text, Spacer, Link } from "@chakra-ui/react";

const HeaderBar = () => {
  return (
    <Flex
      w="100%"
      px="3rem"
      py="4rem"
      alignItems="center"
      boxShadow="rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px"
      fontSize={{ base: "1rem", md: "1.5rem" }}
    >
      <Box>
        <Heading>Where in the world?</Heading>
      </Box>
      <Spacer />
      <Link href="#">
        <Flex gap="1rem">
          <i className="bi bi-circle-half"></i>
          <Text fontWeight="bold">Dark Mode</Text>
        </Flex>
      </Link>
    </Flex>
  );
};

export default HeaderBar;
