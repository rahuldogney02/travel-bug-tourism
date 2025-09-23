import Image from "next/image";
import HeroSection from "./components/layout/Sections/HeroSection";

export default function Home() {
  return (
    <div className="bg-gray-50">
      <HeroSection page="home" />
    </div>
  );
}
