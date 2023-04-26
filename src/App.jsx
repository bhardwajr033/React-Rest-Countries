import React from "react";
import "./App.css";
import SearchAndFilter from "./components/SearchAndFilter";
import HeaderBar from "./components/HeaderBar";
import MainSection from "./components/MainSection";

function App() {
  return (
    <React.Fragment>
      <HeaderBar />
      <SearchAndFilter />
      <MainSection/>
    </React.Fragment>
  );
}

export default App;
