import { FaFacebookF, FaLinkedinIn, FaInstagram, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo and Description */}
        <div>
          <h2 className="text-xl font-bold text-blue-700">AIR University L&F</h2>
          <p className="mt-2 text-sm">
            Helping Air University Islamabad students reconnect with their lost belongings via a secure digital platform.
          </p>
          <div className="flex space-x-4 mt-4 text-xl text-gray-600">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaLinkedinIn /></a>
            <a href="#"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-sm">
            <li><a href="#">Home</a></li>
            <li><a href="#">Report Lost Item</a></li>
            <li><a href="#">Report Found Item</a></li>
            <li><a href="#">Browse Lost Items</a></li>
            <li><a href="#">Browse Found Items</a></li>
            <li><a href="#">Community Forum</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-semibold text-lg">Contact Us</h3>
          <ul className="mt-2 space-y-3 text-sm">
            <li className="flex items-start"><FaMapMarkerAlt className="text-blue-600 mr-2 mt-1" /> Air University, PAF Complex E-9, Islamabad</li>
            <li className="flex items-center"><FaEnvelope className="text-blue-600 mr-2" /> lostfound@au.edu.pk</li>
            <li className="flex items-center"><FaPhone className="text-blue-600 mr-2" /> 051-9262557</li>
          </ul>
        </div>

        {/* Hours of Operation */}
        <div>
          <h3 className="font-semibold text-lg">Hours of Operation</h3>
          <ul className="mt-2 text-sm space-y-1">
            <li className="flex justify-between"><span>Monday - Friday</span><span>9AM - 5PM</span></li>
            <li className="flex justify-between"><span>Saturday</span><span>9AM - 1PM</span></li>
            <li className="flex justify-between text-red-600"><span>Sunday</span><span>Closed</span></li>
          </ul>
          <div className="mt-4 bg-purple-100 p-3 rounded text-sm">
            Need urgent help? Contact AU Security at extension <strong>3000</strong>.
          </div>
        </div>
      </div>

      <div className="mt-10 border-t pt-5 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 Air University Lost & Found. All rights reserved.</p>
        <p className="mt-2 md:mt-0">Made with <span className="text-red-500">♥</span> by AU students</p>
        <div className="flex space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
