import Hero from "@/components/hero";
import Teams from "@/components/teams";
import Stats from "@/components/stats";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import Faq from "@/components/faq";
import Footer from "@/components/footer";
import Services from "@/components/services";

export default function Home() {
  return (
    <main className="flex flex-col min-h-dvh">
      <Hero />
      <Services />
      <Teams />
      <Testimonials />
      <Stats />
      <Pricing />
      <Faq />
      <Footer />
    </main>
  );
}
