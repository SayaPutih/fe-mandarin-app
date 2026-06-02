"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans  bg-white h-full w-full p-8 rounded-3xl">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16   sm:items-start">
        <div className="font-bold text-xs underline break-all">Home World {token}</div>
      </main>
    </div>
  );
}
