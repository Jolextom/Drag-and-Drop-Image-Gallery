import React from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import Upload from "../components/Upload";
import ImageGrid from "../components/ImageGrid";

const Home = () => {
  return (
    <div className="font-Inter">
      <Navbar />
      <Search />
      <ImageGrid />
      <Upload />
    </div>
  );
};

export default Home;
