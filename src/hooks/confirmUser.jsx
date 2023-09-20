import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useGlobalContext } from "../context";

export const useConfirmUser = () => {
  const { user, setUser } = useGlobalContext();
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
  return { user };
};
