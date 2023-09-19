import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Upload from "../components/Upload";

const Home = () => {
  return (
    <div className="font-Inter">
      <Navbar />
      <Search />
      <Upload />
    </div>
  );
};

export default Home;
