"use client";

import { useEffect, useState } from "react";
import HomePage from "@/components/(student)/home/HomePage";

export default function Home() {

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const storedToken = window.localStorage.getItem("token");

  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  return (
    <HomePage />
  );
}
