"use client";

import { useEffect, useState } from "react";
import InitiatePage from "@/components/(student)/initiate/InitiatePage";

export default function Home() {

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const storedToken = window.localStorage.getItem("token");

  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  return (
    <InitiatePage />
  );
}
