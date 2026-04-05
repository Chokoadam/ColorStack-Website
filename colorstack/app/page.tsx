import Hero from "../components/sections/Hero";
//import Joinus from "../components/sections/Joinus"
import Sponsor from "../components/sections/Sponsor";
import Navbar from "../components/layout/Navbar/Navbar"
import Footer from "../components/layout/Footer/Footer"
export default function Home() {
  return (<>
    <Navbar />
    <Hero />
    <Sponsor />
    <h1 className="flex h-screen items-center justify-center">ColorStack is awesome!</h1>
    <Footer />
  </>
  );
}