import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import CalculatorTeaser from "@/components/CalculatorTeaser";
import DiscoverMore from "@/components/DiscoverMore";
import Faq from "@/components/Faq";
import NeedMoreAnswers from "@/components/NeedMoreAnswers";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import { WalletModalProvider } from "@/components/WalletModal";

export default function Home() {
  return (
    <WalletModalProvider>
      <Header />
      <main id="top">
        <Hero />
        <HowItWorks />
        <Benefits />
        <CalculatorTeaser />
        <DiscoverMore />
        <Faq />
        <NeedMoreAnswers />
      </main>
      <Footer />
      <StickyCta />
    </WalletModalProvider>
  );
}
