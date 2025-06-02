import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setMessage('');

    // Simulate OTP check
    if (otp === '123456') {
      setMessage('Code verified successfully!');
      setIsSuccess(true);
    } else {
      setMessage(' Please try again.');
      setIsSuccess(false);
    }
  };

  return (
    <div className="max-w-sm mx-auto text-center">
      
      <div className="mb-5">
        <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-3">
          <Mail className="text-blue-600" size={20} />
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Check Your Inbox</h2>
        <p className="text-sm text-gray-600">We’ve emailed a 6-digit code to</p>
        <p className="text-sm font-medium text-gray-800">{email}</p>
      </div>

      {/* OTP Form */}
      <form onSubmit={handleOtpSubmit} className="space-y-3">
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          placeholder="Enter code"
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        {message && (
          <div className={`text-sm p-2 rounded-md ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {isSuccess ? <CheckCircle size={14} className="inline mr-1" /> : <AlertCircle size={14} className="inline mr-1" />}
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={otp.length !== 6}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          Verify Code
        </button>
      </form>
    </div>
  );
};

export default OtpVerification;
