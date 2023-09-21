import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useConfirmUser } from "../hooks/confirmUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useConfirmUser();
  const handleLogin_Out = async () => {
    try {
      if (!user) {
        navigate("/login");
      } else {
        await signOut(auth);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // console.log(displayName);

  return (
    <div className="py-3 border-b ">
      <div className="flex justify-between items-center container_lg">
        <h1 className="text-xl md:text-2xl font-semibold">Imagino</h1>
        <div className="flex gap-3 items-center">
          <span className="flex gap-3 items-center">
            <p className="uppercase text-sm font-semibold">
              {user?.displayName}
            </p>

            <span
              className={`cursor-pointer border text-sm px-2.5 py-1 font-bold ${
                user ? "text-red-300" : "text-green-300"
              }`}
              onClick={handleLogin_Out}
            >
              {user ? "sign-out" : "sign-in"}
            </span>
          </span>

          {/* <div className="bg-transparent border px-2 py-1 font-medium rounded-lg cursor-pointer flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-4 h-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
              />
            </svg>
            <span> Upload</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
