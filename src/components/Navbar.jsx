import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useConfirmUser } from "../hooks/confirmUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useConfirmUser();
  console.log(user);
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
        <h1 className="text-2xl font-semibold">Imagino</h1>
        <div className="flex gap-3 items-center">
          <span className="flex gap-3 items-center">
            <p className="uppercase text-sm font-semibold">
              {user?.displayName}
            </p>

            <span
              className={`ccursor-pointer ${
                user ? "text-red-300" : "text-green-300"
              }`}
              onClick={handleLogin_Out}
            >
              [ {user ? "sign-out" : "sign-in"} ]
            </span>
          </span>
          <div className="bg-transparent border px-5 py-1 font-medium rounded-lg cursor-pointer">
            Upload
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
