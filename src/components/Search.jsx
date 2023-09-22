import React from "react";
import { useGlobalContext } from "../context";

const Search = () => {
  const { searchInput, setSearchInput } = useGlobalContext();
  return (
    <div className="container_lg py-5 h-fit border-b">
      <div className="flex">
        <div className="flex flex-1 p-3 border rounded-s-2xl bg-gray-50">
          <div className="flex items-center w-full gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <form className="w-full">
              <input
                type="text"
                name="image search"
                className=" w-full bg-transparent font-medium text-2xl outline-none"
                placeholder="search here..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </form>
          </div>

          <div className="self-center " onClick={() => setSearchInput("")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
        {/* <div className="flex justify-between flex-1 items-center p-3 px-4 border border-l-0 rounded-e-2xl">
          <div className="grid place-items-center bg-slate-800 text-white py-1 px-3 rounded-xl font-bold">
            <h4>Projects</h4>
          </div>
          <div className="grid place-items-center bg-transparent text-black border py-1 px-3 rounded-xl font-bold">
            <h4>Projects</h4>
          </div>
          <div className="grid place-items-center bg-transparent text-black border py-1 px-3 rounded-xl font-bold">
            <h4>Projects</h4>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Search;
