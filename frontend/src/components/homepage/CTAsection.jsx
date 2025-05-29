import React from 'react';
import { Link } from 'react-router-dom'; // import Link

const CTASection = () => {
  return (
    <section className="bg-blue-50 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700">
          Ready to find what you've lost at AU?
        </h2>
        <p className="mt-4 text-gray-700 text-lg">
          Join your fellow Air University Students who have successfully recovered their belongings through our platform. It's quick, easy, and completely free.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
          <Link
            to="/items/Lost"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-100 transition"
          >
            Browse Lost Items
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
