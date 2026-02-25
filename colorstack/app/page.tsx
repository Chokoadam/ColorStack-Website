import Image from "next/image";
import Mission from "../components/sections/Mission";

export default function Home() {
  return (
    <main>
      <h1 className="flex h-screen items-center justify-center">ColorStack is awesome!</h1>
      <Mission />
    </main>
  );
}
