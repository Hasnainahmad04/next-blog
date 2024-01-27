import AppButton from "@components/AppButton";
import React from "react";
import HeroSection from "./HeroSection";
import { getServerSession } from "next-auth";

const App = async () => {
  const session = await getServerSession();

  return (
    <>
      {!session && <HeroSection />}
      <div className="h-[50rem]"></div>
    </>
  );
};

export default App;
