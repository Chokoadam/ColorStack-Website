import Image from "next/image";
import "@fontsource/inter";
import Hero from "../components/sections/Hero";
//import Joinus from "../components/sections/Joinus"
import Sponsor from "../components/sections/Sponsor";
import Navbar from "../components/layout/Navbar/Navbar"
export default function Home() {
  return (<>
    <Navbar />
    <Hero />
    <Sponsor />
    <h1 className="flex h-screen items-center justify-center">ColorStack is awesome!</h1>
  </>
  );
}