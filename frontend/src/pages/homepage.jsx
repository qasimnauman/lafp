import StudentExperiences from "../components/homepage/Experiences";
import CTASection from "../components/homepage/CTAsection";
import HowItWorks from "../components/homepage/HowItWorks";
import WhyUs from "../components/homepage/WhyUs";

const Homepage = () => {
  return (
    <div>
      <div className="w-[90%] mx-auto px-10 py-16">
        <div className="flex flex-row gap-4 items-center">
          {/* Text Content */}
          <div className="w-[40%]">
            <h1 className="text-4xl font-bold text-[#1d3557]">
              Lost Something at Air University?
            </h1>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              A dedicated digital platform for Air University Islamabad students
              to report lost items, discover found belongings, and reclaim their
              possessions—conveniently and efficiently, without the hassle of
              visiting different departments.
            </p>
            <button className="px-6 py-3 text-white bg-[#004080] rounded-md font-medium hover:bg-[#002e5f] transition-colors duration-300">
              Get Started
            </button>
          </div>
          <div className="w-[60%]">
            {/* Image */}
            <div className="flex justify-center items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Air_University_Main_Campus%2C_Islamabad.jpg"
                alt="Lost and Found"
                className="w-full rounded-xl object-cover shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      <WhyUs />
      <HowItWorks />
      <StudentExperiences />
      <CTASection />
    </div>
  );
};

export default Homepage;
