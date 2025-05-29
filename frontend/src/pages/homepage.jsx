import StudentExperiences from '../components/homepage/Experiences';
import CTASection from '../components/homepage/CTAsection';
import HowItWorks from '../components/homepage/HowItWorks';


const Homepage = () => {
  return (
    <div>
     
      <section className="px-10 py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Text Content */}
          <div>
            <h1 className="text-4xl font-bold text-[#1d3557] mb-5">
              Lost Something at Air University?
            </h1>
            <p className="text-base text-gray-700 mb-6 leading-relaxed">
              A dedicated digital platform for Air University Islamabad students to report lost items, discover found belongings, and reclaim their possessions—conveniently and efficiently, without the hassle of visiting different departments.
            </p>
            <button className="px-6 py-3 text-white bg-[#004080] rounded-md font-medium hover:bg-[#002e5f] transition-colors duration-300">
              Get Started
            </button>
          </div>

          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK7O5qWaybITSWz0Dqd2qCsw1OIN6wQ7NoXw&s"
              alt="Lost and Found"
              className="w-full max-w-[500px] h-auto rounded-xl object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </section>
   <HowItWorks />
    <StudentExperiences />
    <CTASection />
    </div>
  );
};

export default Homepage;
