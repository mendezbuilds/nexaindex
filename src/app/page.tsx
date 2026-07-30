import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { WhatWeDo } from "@/components/WhatWeDo";
import { Benefits } from "@/components/Benefits";
import { Tokenomics } from "@/components/Tokenomics";
import { Roadmap } from "@/components/Roadmap";
import { Team } from "@/components/Team";
import { FinalCta } from "@/components/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhatWeDo />
      <Benefits />
      <Tokenomics />
      <Roadmap />
      <Team />
      <FinalCta />
    </>
  );
}
