import React from "react";
import { Player } from "./Player";
import AppButton from "@components/AppButton";
import animation from "./animation.json";

const HeroSection = () => {
  return (
    <section className="bg-yellow-hero relative overflow-hidden px-[5rem]">
      <div className="hidden md:block absolute w-[45rem] self-end -right-[6rem]">
        <Player src={animation} autoplay loop />
      </div>
      <div
        style={{ backdropFilter: "blur(10px) saturate(100%)" }}
        className="max-w-[40rem] py-[6rem]"
      >
        <h1 className="md:text-[6rem] max-md:text-[4.5rem] max-sm:text-[4rem] font-serif font-medium leading-[5rem]">
          Stay curious.
        </h1>
        <p className="my-6 text-neutral-800 text-xl max-sm:text-lg max-w-[30rem]">
          Discover stories, thinking, and expertise from writers on any topic.
        </p>
        <AppButton
          variant="black"
          title="Start Reading"
          className="px-8 py-2"
        />
      </div>
    </section>
  );
};

export default HeroSection;
