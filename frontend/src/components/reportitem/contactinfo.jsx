// ContactInfo.js - Enhanced with better visual design and information hierarchy
import { Info, Mail, Phone } from "lucide-react";

const ContactInfo = () => (
  <div className="mb-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
    <div className="flex items-center gap-2 mb-4">
      <div className="bg-blue-100 rounded-full p-2">
        <Mail size={16} className="text-blue-600" />
      </div>
      <h3 className="text-sm font-semibold text-gray-700">
        Contact Information
      </h3>
    </div>
    
    <div className="relative mb-4">
      <input
        type="text"
        className="w-full border-2 border-gray-200 rounded-lg p-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 pl-10"
        placeholder="Your email or phone number"
      />
      <Phone size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
    
    <div className="bg-blue-100 rounded-lg p-3">
      <div className="flex items-start gap-3">
        <div className="bg-blue-200 rounded-full p-1 mt-0.5">
          <Info size={12} className="text-blue-700" />
        </div>
        <p className="text-xs text-blue-700 leading-relaxed">
          Your contact information will only be shared with verified staff or the item owner for coordination purposes.
        </p>
      </div>
    </div>
  </div>
);

export default ContactInfo;