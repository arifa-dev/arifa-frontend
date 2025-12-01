import "./index.scss";
import { Header, Hero, Features, Pricing, FAQ, Footer } from "../../components";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
};
