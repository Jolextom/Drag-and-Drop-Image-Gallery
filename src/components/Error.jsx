import React from "react";

const Error = (error) => {
  return (
    <div className="">
      <div
        class={` absolute top-0  w-full flex  justify-center px-3 py-4 mx-auto items-center p-4 mb-4 text-sm text-${error.color}-800 rounded-lg bg-${error.color}-50 dark:bg-gray-800 dark:text-${error.color}-400`}
        role="alert"
      >
        {console.log(error.color)}
        <svg
          class="flex-shrink-0 inline w-4 h-4 mr-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
        </svg>
        <div>{error.message}</div>
      </div>
    </div>
  );
};

export default Error;
