"use client";
import useStore from "@/lib/useStore";
import { useEffect } from "react";

const Home = () => {
  const { setNavbarConfig } = useStore();

  useEffect(() => {
    setNavbarConfig({
      title: "Dashboard",
    });
  }, []);

  return (
    <div className="flex flex-col h-full">
      <p className="text-white">Dashboard goes here</p>
    </div>
  );
};

export default Home;
