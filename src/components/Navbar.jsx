import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useGlobalContext } from "../context";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const { user, setUser } = useGlobalContext();

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setUser(user);
      } else {
        // User is signed out or authentication state not initialized
        console.log("User signed out or authentication state not initialized");
        setUser(null);
      }
    });

    return () => {
      // Unsubscribe from the auth state listener when the component unmounts
      unsubscribe();
    };
  }, [auth]);

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
              className={`text-sm cursor-pointer ${
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
