import Image from "next/image";
import "@fontsource/inter";
//import Joinus from "../components/sections/Joinus"
import Navbar from "../components/layout/Navbar/Navbar"
export default function Home() {
  return (<>
    <Navbar />
    <h1 className="flex h-screen items-center justify-center">ColorStack is awesome!</h1>
  </>
  );
}
