import React from "react";
import "./App.css";
import { Spinner } from "@chakra-ui/react";

function App() {
  return (
    <>
      <div>Hello from App</div>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </>
  );
}

export default App;
