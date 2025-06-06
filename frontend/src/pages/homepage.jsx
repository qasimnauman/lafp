import StudentExperiences from "../components/homepage/Experiences";
import CTASection from "../components/homepage/CTAsection";
import HowItWorks from "../components/homepage/HowItWorks";
import WhyUs from "../components/homepage/WhyUs";
import Home from "../components/homepage/Home";

const Homepage = () => {
  return (
    <>
      <Home />
      <WhyUs />
      <HowItWorks />
      <StudentExperiences />
      <CTASection />
    </>
  );
};

export default Homepage;
