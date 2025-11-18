// компоненти
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
// import OurTravellers from "@/components/OurTravellers/OurTravellers";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";
import Header from "@/components/Header/Header";

export default function Home() {
  return (
    // <main>
    <>
      <Header isHome />
      <Hero />
      <About />
      <Popular />
      {/* <OurTravellers /> */}
      <Join />
    </>
    // </main>
  );
}
