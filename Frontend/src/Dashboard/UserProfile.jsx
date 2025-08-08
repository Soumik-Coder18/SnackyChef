import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiLogOut } from 'react-icons/fi';
import { AuthContext } from '../context/AuthContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-hot-toast';

function UserProfile() {
  const [open, setOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <div className="fixed z-50">
      {/* Desktop: top-right */}
      <div className="hidden md:block fixed top-10 right-20">
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="w-10 h-10 rounded-full bg-[#FF7F50] flex items-center justify-center text-white shadow-lg"
          >
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FiUser className="text-xl" />
            )}
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#FFD6A5] rounded-lg shadow-lg py-2">
              <div className="px-4 py-3 border-b border-[#FFD6A5]/50">
                <p className="text-sm font-medium text-[#5C2C1E]">Signed in as</p>
                <p className="text-sm text-[#5C2C1E] truncate">{user.email}</p>
              </div>
              <a href="/UserDashboard" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Profile
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]"
                onClick={async () => {
                  try {
                    await axiosInstance.post('/logout');
                    localStorage.removeItem('accessToken'); // ✅ remove token
                    setOpen(false);
                    setUser(null);
                    toast.success("Logged out successfully");
                    navigate('/login');
                  } catch (err) {
                    toast.error("Logout failed");
                  }
                }}
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
            {user?.avatar?.url ? (
              <img
                src={user.avatar.url}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FiUser className="text-xl" />
            )}
          </button>
          {open && (
            <div className="absolute bottom-16 right-0 w-48 bg-white border border-[#FFD6A5] rounded-lg shadow-lg py-2">
              <div className="px-4 py-3 border-b border-[#FFD6A5]/50">
                <p className="text-xs text-[#5C2C1E]">Logged in as</p>
                <p className="text-sm font-medium text-[#5C2C1E] truncate">{user.username}</p>
              </div>
              <a href="/UserDashboard" className="block px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]">
                Profile
              </a>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#FFF2E2] text-sm text-[#5C2C1E]"
                onClick={async () => {
                  try {
                    await axiosInstance.post('/logout');
                    localStorage.removeItem('accessToken'); // ✅ remove token
                    setOpen(false);
                    setUser(null);
                    toast.success("Logged out successfully");
                    navigate('/login');
                  } catch (err) {
                    toast.error("Logout failed");
                  }
                }}
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
