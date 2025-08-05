import React, { useState } from 'react';
import { FiUser, FiLogOut, FiSettings } from 'react-icons/fi';

function UserProfile() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed z-50">
      {/* Desktop: top-right */}
      <div className="hidden md:block fixed top-10 right-20">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-[#FF7F50] flex items-center justify-center text-white shadow-lg"
          >
            <FiUser />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#FFD6A5] rounded-lg shadow-lg py-2">
              <a href="/profile" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Profile
              </a>
              <a href="/settings" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Settings
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]"
                onClick={() => alert("Logged out")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: bottom-right */}
      <div className="md:hidden fixed bottom-12 right-8">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-12 h-12 rounded-full bg-[#FF7F50] flex items-center justify-center text-white shadow-lg"
          >
            <FiUser size={20} />
          </button>
          {open && (
            <div className="absolute bottom-16 right-0 w-48 bg-white border border-[#FFD6A5] rounded-lg shadow-lg py-2">
              <a href="/profile" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Profile
              </a>
              <a href="/settings" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Settings
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]"
                onClick={() => alert("Logged out")}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
