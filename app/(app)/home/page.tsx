import AppButton from "@components/AppButton";
import React from "react";
import HeroSection from "./HeroSection";
import { getServerSession } from "next-auth";

const App = async () => {
  const session = await getServerSession();

  return (
    <>
      {!session && <HeroSection />}
      <div className="mx-[5rem] my-10 grid grid-cols-12 gap-4 max-md:block">
        <section className="col-span-8">
          {Array.from({ length: 20 }).map((a, b) => (
            <div key={b} className="h-[5rem] bg-green-300 my-4"></div>
          ))}
        </section>
        <aside className="col-span-4 bg-green-700">
          <div className="sticky top-[6rem]">discover</div>
        </aside>
      </div>
    </>
  );
};

export default App;
