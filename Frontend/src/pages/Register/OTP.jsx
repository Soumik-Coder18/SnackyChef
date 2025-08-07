import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';
import { toast } from 'react-toastify';

function OTP({ onComplete }) {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    // Auto-submit if all fields are filled
    if (newOtp.every(digit => digit !== '')) {
      onComplete(newOtp.join(''));
      return;
    }

    // Focus next input
    if (element.value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (/^\d+$/.test(pasteData)) {
      const newOtp = [...otp];
      pasteData.split('').forEach((char, i) => {
        if (i < 6) newOtp[i] = char;
      });
      setOtp(newOtp);
      if (pasteData.length === 6) {
        onComplete(pasteData);
      } else if (pasteData.length < 6) {
        inputRefs.current[pasteData.length].focus();
      }
    }
  };

  const handleVerify = async () => {
    try {
      const response = await axiosInstance.post('/verify-email', {
        userId,
        otp: otp.join('')
      });
      toast.success(response.data.message || 'Email verified successfully');
      navigate('/login');
    } catch (error) {
      const message = error.response?.data?.message || 'Verification failed';
      toast.error(message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-8 shadow-xl w-full max-w-md animate-fade-in">
        <div className="flex justify-center mb-6">
          <svg 
            width="48" 
            height="48" 
            viewBox="0 0 64 64" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="32" cy="32" r="30" fill="#FF7F50" stroke="#FFF7ED" strokeWidth="2"/>
            <rect x="18" y="28" width="28" height="14" rx="3" fill="#FFF7ED" stroke="#FF7F50" strokeWidth="2"/>
            <rect x="24" y="20" width="16" height="4" rx="2" fill="#FFF7ED"/>
            <path d="M42 28L48 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
            <path d="M22 28L16 22" stroke="#FFF7ED" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-semibold text-[#5C2C1E] mb-2 text-center">Verify your account</h2>
        <p className="text-[#7B4B2A] text-center mb-6">Enter the 6-digit code sent to your email</p>
        
        <div className="flex justify-center space-x-3 mb-8">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={value}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              className="w-14 h-14 text-center border-2 border-[#FFD6A5] rounded-lg text-2xl text-[#5C2C1E] 
                        focus:outline-none focus:border-[#FF7F50] focus:ring-2 focus:ring-[#FF7F50]/30
                        transition-all duration-200"
              autoFocus={index === 0}
            />
          ))}
        </div>
        
        <button 
          className="w-full py-3 bg-[#FF7F50] hover:bg-[#E07A5F] text-white font-medium rounded-lg
                    transition-colors duration-200 shadow-md hover:shadow-[#FFD6A5]/50"
          onClick={handleVerify}
          disabled={otp.some(digit => digit === '')}
        >
          Verify Account
        </button>
        
      </div>
    </div>
  );
}

export default OTP;