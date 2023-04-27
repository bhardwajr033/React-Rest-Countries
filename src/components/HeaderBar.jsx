import {
  Box,
  Flex,
  Heading,
  Text,
  Spacer,
  useColorMode,
  Button,
} from "@chakra-ui/react";

const HeaderBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
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
      <Flex gap="1rem">
        <Button
          onClick={toggleColorMode}
          colorScheme="teal"
          variant="outline"
          width="100%"
          size="lg"
        >
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeaderBar;
