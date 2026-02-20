import { HeroSection } from "@/components/home/HeroSection";
import { CollabGrid } from "@/components/home/CollabGrid";
import { FeaturedAnime } from "@/components/home/FeaturedAnime";
import { AboutSection } from "@/components/home/AboutSection";
import { TeamSection } from "@/components/home/TeamSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CollabGrid />
      <FeaturedAnime />
      <AboutSection />
      <TeamSection />
    </>
  );
}
