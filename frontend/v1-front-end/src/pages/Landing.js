import Reveal from "../components/landing/Reveal";

// const Header = lazy(() => import("./ui/header"));
// const Main = lazy(() => import("./ui/main"));
// const HeroSection = lazy(() => import("./ui/hero"));
// const FeaturesSection = lazy(() => import("./ui/features"));
// const ZigzagSection = lazy(() => import("./ui/zigzag"));
// const Faq = lazy(() => import("./ui/faq"));
// const TestimonialsSection = lazy(() => import("./ui/testimonials"));
// const Newsletter = lazy(() => import("./ui/newsletter"));
// const Footer = lazy(() => import("./ui/footer"));

import Header from "../components/landing/ui/header";
import Main from "../components/landing/ui/main";
import HeroSection from "../components/landing/ui/hero";
import FeaturesSection from "../components/landing/ui/features";
import ZigzagSection from "../components/landing/ui/zigzag";
import Faq from "../components/landing/ui/faq";
import TestimonialsSection from "../components/landing/ui/testimonials";
import Newsletter from "../components/landing/ui/newsletter";
import Footer from "../components/landing/ui/footer";

// ... import other sections

function Landing() {
  return (
    <>
      <Header />
      <Main>
        <Reveal>
          <HeroSection />
        </Reveal>
        <Reveal>
          <FeaturesSection />
        </Reveal>
        <Reveal>
          <ZigzagSection />
        </Reveal>
        <Reveal>
          <Faq />
        </Reveal>
        <Reveal>
          <TestimonialsSection />
        </Reveal>
        <Reveal>
          <Newsletter />
        </Reveal>
      </Main>
      <Reveal>
        <Footer />
      </Reveal>
    </>
  );
}

export default Landing;
