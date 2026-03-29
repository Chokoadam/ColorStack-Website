import Hero from "../components/sections/Hero";
import Navbar from "../components/layout/Navbar/Navbar"
import Footer from "../components/layout/Footer/Footer"
export default function Home() {
  return (<>
    <Navbar />
    <Hero />
    <h1 className="flex h-screen items-center justify-center">ColorStack is awesome!</h1>
    <Footer />
  </>
  );
}
