// компоненти
import Hero from "@/components/Hero/Hero";
import Popular from "@/components/Popular/Popular";
// import OurTravellers from "@/components/OurTravellers/OurTravellers";
import About from "@/components/About/About";
import Join from "@/components/Join/Join";

export default function Home() {
  return (
    // <main>
    <>
      <Hero />
      <About />
      <Popular mobPerPage={3} paginationShow={true} />
      {/* <OurTravellers /> */}
      <Join />
    </>
    // </main>
  );
}
