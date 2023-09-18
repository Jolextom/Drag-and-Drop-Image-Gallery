import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Upload from "./components/Upload";

function App() {
  return (
    <div className="font-Inter">
      <Navbar />
      <Search />
      <Upload />
    </div>
  );
}

export default App;
