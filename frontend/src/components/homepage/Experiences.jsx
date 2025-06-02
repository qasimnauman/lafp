import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const testimonials = [
  {
    name: "Ayesha Khan",
    title: "BS Computer Science, Batch '23",
    message:
      "I misplaced my student ID during midterms. Thanks to the Lost & Found portal, I retrieved it within a day!",
  },
  {
    name: "Bilal Ahmed",
    title: "BBA, Batch '22",
    message:
      "Left my wallet in the cafeteria. A fellow student reported it, and the system notified me promptly.",
  },
  {
    name: "Sara Malik",
    title: "BS Avionics Engineering, Batch '24",
    message:
      "Lost my USB with important project files. Someone found it in the lab and reported it through the platform. Lifesaver!",
  },
  {
    name: "Usman Tariq",
    title: "BS Mechatronics Engineering, Batch '21",
    message:
      "Found a set of keys near the parking lot. Reported it, and the rightful owner claimed them the next day.",
  },
  {
    name: "Zainab Ali",
    title: "BS Physics, Batch '23",
    message:
      "The platform's notification system is efficient. Got an alert when someone found my lost notebook.",
  },
  {
    name: "Hamza Shah",
    title: "BS Mathematics, Batch '22",
    message:
      "Accidentally left my calculator in the library. Reported it lost, and it was returned within hours.",
  },
];

const StudentExperiences = () => {
  return (
    <div className="py-16 px-4 bg-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
        Student Experiences at Air University
      </h2>
      <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
        Discover how Air University Islamabad students have successfully utilized our Lost & Found platform to recover their belongings.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((t, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 text-left hover:shadow-md transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <FaUserGraduate />
              </div>
              <div className="ml-3">
                <h4 className="font-semibold text-gray-900">{t.name}</h4>
                <p className="text-sm text-gray-500">{t.title}</p>
              </div>
            </div>
            <p className="text-sm italic text-gray-600">"{t.message}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentExperiences;
