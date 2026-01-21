import Header from "@/components/sections/Header";
import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Problem from "@/components/sections/Problem";
import Demo from "@/components/sections/Demo";
import HowItWorks from "@/components/sections/HowItWorks";
import Results from "@/components/sections/Results";
import ValueByAudience from "@/components/sections/ValueByAudience";
import Comparison from "@/components/sections/Comparison";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <SocialProof />
      <Problem />
      <Demo />
      <HowItWorks />
      <Results />
      <ValueByAudience />
      <Comparison />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
