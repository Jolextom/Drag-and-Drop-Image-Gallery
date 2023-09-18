import React from "react";

const Navbar = () => {
  return (
    <div className="py-3 border-b ">
      <div className="flex justify-between items-center container_lg">
        <h1 className="text-2xl font-semibold">Imagino</h1>
        <div className="bg-transparent border px-5 py-1 font-medium rounded-lg cursor-pointer">
          Upload
        </div>
      </div>
    </div>
  );
};

export default Navbar;
