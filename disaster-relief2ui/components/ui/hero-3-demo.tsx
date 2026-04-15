import { HeroSection } from "@/components/ui/hero-3";
import { Header } from "@/components/ui/header-3";

export default function DemoOne() {
  return (
    <div className="flex w-full flex-col">
      <Header />
      <main className="grow">
        <HeroSection />
      </main>
    </div>
  );
}
