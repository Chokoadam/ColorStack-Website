import Hero from "../components/sections/Hero";
//import Joinus from "../components/sections/Joinus"
import Sponsor from "../components/sections/Sponsor";
import Navbar from "../components/layout/Navbar/Navbar"
import Footer from "../components/layout/Footer/Footer"
import Officers from "../components/sections/Officers";
import DynamicBar from "../components/sections/DynamicBar";
export default function Home() {
  return (<>
    <Navbar />
    <DynamicBar />
    <Hero />
    <Sponsor />
    <Officers />
    <Footer />
  </>
  );
}
