import React from "react";
import "./App.css";
import SearchAndFilter from "./components/SearchAndFilter";
import HeaderBar from "./components/HeaderBar";

function App() {
  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter />
    </React.Fragment>
  );
}

export default App;
